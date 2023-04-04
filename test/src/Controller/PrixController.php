<?php

namespace App\Controller;

use App\Services\PrixService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Utils\Serialization;
use App\Entity\Prix;

class PrixController extends AbstractController
{

    public function __construct(private PrixService $ps, private Serialization $serialization)
    {
    }

    #[Route('/api/admin/get_prix', name: 'api_get_prix')]
    public function getPrix(): JsonResponse
    {

        $response = $this->ps->get_prix();

        return $this->json($response["content"], $response["status_code"]);
    }

    #[Route('/api/admin/create_prix', name: 'api_create_prix')]
    public function createPrix(Request $request): JsonResponse
    {

        $payload = $request->getContent();
        $prix = $this->serialization->deserializeJson($payload, Prix::class);

        $response = $this->ps->create_prix($prix);

        return $this->json($response["content"], $response["status_code"]);
    }

    #[Route('/api/admin/update_prix/{id}', name: 'api_update_prix')]
    public function updatePrix(Request $request, int $id): JsonResponse
    {

        $payload = $request->getContent();
        $prix = $this->serialization->deserializeJson($payload, Prix::class);

        $response = $this->ps->update_prix($prix, $id);

        return $this->json(["message" => $response["content"]], $response["status_code"]);
    }
}
