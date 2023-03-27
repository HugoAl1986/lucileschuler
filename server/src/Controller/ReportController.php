<?php

namespace App\Controller;

use App\Services\ReportService;
use App\Utils\ReportPdf;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class ReportController extends AbstractController
{

    #[Route('/api/admin/create_report/{id_intervention}', name: 'api_create_report')]
    public function makePdf(Request $request, ReportService $reportService, int $id_intervention): JsonResponse
    {
        $horseInfos = $request->get("horse_infos");
        $lifestyle = $request->get("lifestyle");
        $food = $request->get("food");
        $activities = $request->get("activities");
        $dateIntervention = $request->get("date_intervention");
        $placeIntervention = $request->get("place_intervention");
        $owner = $request->get("owner");
        $reasonsForSession = $request->get("reasons_for_session");
        $goalsOfSession = $request->get("goals_of_session");
        $attitudeOfHorse = $request->get("attitude_of_horse");
        $advice = $request->get("advice");
        $observations = $request->get('goals_of_session');

        $datas = $reportService->createReport($id_intervention);
        $urlReport = $datas['content']->getUrl();

        $report = new ReportPdf($horseInfos, $lifestyle, $food, $activities, $dateIntervention, $placeIntervention, $owner, $reasonsForSession, $observations, $goalsOfSession, $attitudeOfHorse, $advice, $urlReport);
        $report->createPdf();
        return $this->json($datas["content"], $datas["status_code"], [], [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
            return $object->getId();
        }]);;
    }

    #[Route('/api/admin/send_report/{id_intervention}', name: 'api_send_report')]
    public function sendReport(int $id_intervention, ReportService $reportService): JsonResponse
    {
        $response = $reportService->sendReport($id_intervention);
        return $this->json($response['content'], $response['status_code']);
    }
}
