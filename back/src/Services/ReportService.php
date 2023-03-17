<?php

namespace App\Services;

use App\Repository\ReportRepository;
use App\Repository\PrestationRepository;
use App\Utils\Functions;
use App\Entity\Report;
use App\Repository\ClientRepository;
use DateTimeImmutable;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\Mime\Part\File;

class ReportService
{

    public function __construct(private MailerInterface $mailer, private Functions $functions, private ReportRepository $reportRepository, private PrestationRepository $prestationRepository, private ClientRepository $clientRepository)
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
        $report->setSent(false);
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
                $newNumber = $number + 1;
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

    public function sendReport($id_intervention)
    {

        $prestation = $this->prestationRepository->find($id_intervention);
        if (empty($prestation)) {
            return ["content" => "Aucune intervention n'exite pour cet Id", "status_code" => 404];
        }

        $date = $prestation->getStart()->format('d/m/Y');
        $email = new TemplatedEmail();
        $email->subject("Compte-rendu de la séance de shiatsu du " . $date . ".")
            ->htmlTemplate('send_report.html.twig')
            ->from('lucile.schuler@bien-etre-equin.com')
            ->to($prestation->getHorse()->getClient()->getEmail())
            ->attachFromPath($prestation->getReport()->getUrl(),$prestation->getReport()->getNumber(),'application/pdf')
            ->context([
                'prenom' => $prestation->getHorse()->getClient()->getPrenom(),
                'date' => $date,
                'nom_cheval' => $prestation->getHorse()->getNom()
            ]);

        try {
            $this->mailer->send($email);
            
            
        } catch (TransportExceptionInterface $e) {
            return ["content" => "une erreur est survenue lors de l'envoi de l'email : " . $e->getDebug(), "status_code" => 500];
        }

        $prestation->getReport()->setSent(true);

        try{
            $this->prestationRepository->save($prestation,true);
        }catch(\Exception $e){
            return ["content" => "Une erreur est survenue lors de la modification du rapport en base : " . $e->getMessage(), "status_code" =>500];
        }

        return ["content" => "Le rapport a bien été envoyé", "status_code" => 200];
    }
}
