<?php

namespace App\Controller;

use App\Entity\AdressePrestation;
use App\Services\AdressePrestationService;
use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class AdressePrestationController extends AbstractController
{

    public function __construct(private Serialization $serialization, private AdressePrestationService $adressePrestationService)
    {
    }

    #[Route('/api/admin/create_adresse_prestation/{id_prestation}', name: 'api_create_adresse_prestation')]
    public function createAdressePrestation(Request $request, int $id_prestation): JsonResponse
    {
        $payload = $request->getContent();
        $adressePrestation = $this->serialization->deserializeJson($payload, AdressePrestation::class);
        $response = $this->adressePrestationService->createAdressePrestation($adressePrestation, $id_prestation);

        return $this->json([$response["content"]], $response["status_code"],[], [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
            return $object->getId();
        },AbstractNormalizer::ATTRIBUTES => ["id","nomEcurie","numeroRue","rue","ville", "codePostal","complement", "prestations" =>["id"]]]);
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
