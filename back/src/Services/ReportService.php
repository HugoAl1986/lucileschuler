<?php

namespace App\Services;

use App\Repository\ReportRepository;
use App\Repository\PrestationRepository;
use App\Utils\Functions;
use App\Entity\Report;
use DateTimeImmutable;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Contracts\Cache\ItemInterface;

class ReportService
{

    public function __construct(private Functions $functions, private ReportRepository $reportRepository, private PrestationRepository $prestationRepository)
    {
    }

    public function createReport(int $id_intervention): array
    {

        $numberReport = $this->createNumberReport();
        $prestation = $this->prestationRepository->find($id_intervention);

        if (empty($prestation)) {
            return ["content" => "Aucune prestation n'exite pour cet Id", "status_code" => 404];
        }
        $report = new Report();
        $report->setCreatedAt(new \DateTimeImmutable('now', new \DateTimeZone('Europe/Paris')));
        $report->setPrestation($prestation);
        $report->setNumber($numberReport);
        $report->setUrl('C:/Users/hugoa/Dev/shiatsu-lulu/front/src/assets/reports/' . $numberReport . '.pdf');

        try {
            $this->reportRepository->save($report, true);
        } catch (\Exception $e) {
            throw new \Exception("erreur : " . $e->getMessage());
        }

        return ["content" => $report, "status_code" => 200];
    }

    public function createNumberReport(): string
    {
        $cache = new FilesystemAdapter();
        $numberFromCache = $cache->getItem('number_last_report');
        $date = new DateTimeImmutable();
        $formattedDate = $date->format('Y-m');
        if (!$numberFromCache->isHit()) {
            $numberReport = 'R-' . $formattedDate . '-001';
            $numberFromCache->set($numberReport);
            $cache->save($numberFromCache);
            return $numberReport;
        }
        if ($cache->hasItem('number_last_report')) {
            if (str_contains($numberFromCache->get(), $formattedDate)) {
                $array = explode('-', $numberFromCache->get());
                $number = (int) end($array);
                $newNumber = $number + 1 ;
                $numberCached = '';
                if (strlen($newNumber) == 1) {
                    $numberCached = 'R-' . $formattedDate . '-00' . $newNumber;
                }
                if (strlen($newNumber) == 2) {
                    $numberCached = 'R-' . $formattedDate . '-0' . $newNumber;
                }
                if (strlen($newNumber) == 3) {
                    $numberCached = 'R-' . $formattedDate . '-' . $newNumber;
                }
                $numberFromCache->set($numberCached);
                $cache->save($numberFromCache);
                return $numberCached;
            }
        }
    }
}
