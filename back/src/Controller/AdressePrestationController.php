<?php

namespace App\Controller;

use App\Entity\AdressePrestation;
use App\Services\AdressePrestationService;
use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdressePrestationController extends AbstractController
{

    public function __construct(private Serialization $serialization, private AdressePrestationService $adressePrestationService)
    {
    }

    #[Route('/api/admin/create_adresse_prestation', name: 'api_create_adresse_prestation')]
    public function createAdressePrestation(Request $request): JsonResponse
    {
        $payload = $request->getContent();
        $adressePrestation = $this->serialization->deserializeJson($payload, AdressePrestation::class);
        $response = $this->adressePrestationService->createAdressePrestation($adressePrestation);

        return $this->json([$response["content"]], $response["status_code"]);
    }

    #[Route('/api/admin/update_adresse_prestation/{id}', name: 'api_update_adresse_prestation')]
    public function updateAdressePrestation(Request $request, int $id): JsonResponse
    {
        $payload = $request->getContent();
        $adressePrestation = $this->serialization->deserializeJson($payload, AdressePrestation::class);
        $response = $this->adressePrestationService->updateAdressePrestation($adressePrestation, $id);

        return $this->json(["message" => $response["content"]], $response["status_code"]);
    }
}
