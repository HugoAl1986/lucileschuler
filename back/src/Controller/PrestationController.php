<?php

namespace App\Controller;

use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Prestation;
use App\Services\PrestationService;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PrestationController extends AbstractController
{

    public function __construct(private Serialization $serialization, private PrestationService $prestationService)
    {

    }

    #[Route('/api/admin/create_prestation/{id_cheval}/{id_prix}', name: 'api_create_prestation')]
    public function createPrestation(Request $request, int $id_cheval,int $id_prix): JsonResponse
    {
        $payload = $request -> getContent();
        $prestation = $this -> serialization -> deserializeJson($payload,Prestation::class);
        $response = $this -> prestationService ->createPrestation($prestation, $id_cheval,$id_prix);


        return $this -> json([$response["content"]], $response["status_code"],[], [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object){
            return $object->getId();
        }]);;
    }
}
