<?php

namespace App\Controller;

use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Cheval;
use App\Services\ChevalService;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class ChevalController extends AbstractController
{

    public function __construct(private Serialization $serialization, private ChevalService $cs ) 
    {

    }

    #[Route('/admin/create_cheval/{client_id}', name: 'create_cheval')]
    public function createCheval(Request $req, int $client_id): JsonResponse
    {
        $payload = $req -> getContent();
        $cheval =  $this -> serialization ->deserializeJson($payload,Cheval::class);
       
        $response = $this -> cs -> saveCheval($cheval, $client_id);
        
        return $this->json(["message" => $response["content"]], $response["status_code"], [], [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object){
            return $object->getId();
            }]
        );
    }

    #[Route('/admin/update_cheval/{id}', name : 'update_cheval')]
    public function updateCheval(Request $req, int $id) :JsonResponse 
    {
        $payload = $req -> getContent();
        $cheval = $this -> serialization -> deserializeJson($payload, Cheval::class);
        $response = $this -> cs -> updateCheval($cheval, $id);

        return $this -> json (["message" => $response["content"]], $response["status_code"]);
    }
}
