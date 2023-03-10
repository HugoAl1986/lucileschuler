<?php

namespace App\Services;

use App\Repository\ReportRepository;
use App\Repository\PrestationRepository;
use App\Utils\Functions;
use App\Entity\Report;
use DateTimeImmutable;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Contracts\Cache\ItemInterface;

class ReportService {

    public function __construct(private Functions $functions, private ReportRepository $reportRepository, private PrestationRepository $prestationRepository){

    }

    public function createReport(int $id_intervention) : array{

        $numberReport = $this->createNumberReport();
        $prestation = $this->prestationRepository->find($id_intervention);

        if(empty($prestation)){
            return ["content" => "Aucune prestation n'exite pour cet Id", "status_code" => 404];
        }

        $report = new Report();
        $report -> setCreatedAt(new \DateTimeImmutable());
        $report -> setPrestation($prestation);
        $report -> setNumber($numberReport);
        $report -> setUrl('../assets/reports/' . $numberReport . '.pdf');
    
        try{
            $this->reportRepository->save($report);
        } catch(\Exception $e){
            throw new \Exception ("erreur : " . $e->getMessage());
        }
        
        return ["content" =>$report,"status_code" => 200];

    }

    public function createNumberReport() : string{
        $cache = new FilesystemAdapter();
        $dataFromCache = $cache->get('number_last_report', function(ItemInterface $itemInterface){
            return null;
        });

        $date = new DateTimeImmutable();
        $formattedDate = $date->format('Y-m');

        if(empty($dataFromCache)){    
            return 'R-' . $formattedDate . '-001';
        }

        if($dataFromCache){
            if(str_contains($dataFromCache,$formattedDate)){
                $tok = strtok($dataFromCache,'-');
                dd($tok);
            }
        }

    }
}