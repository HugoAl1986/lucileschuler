<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Client;
use App\Services\ClientService;
use App\Utils\Serialization;

class ClientController extends AbstractController
{

    public function __construct(private SerializerInterface $serializer, private Serialization  $serialization, private ClientService $cs)
    {
        
    }
    
    #[Route('/admin/create_client', name: 'create_client')]
    public function createClient(Request $request): JsonResponse
    {
       
        $datas = $request -> getContent();
        $client = $this->serialization->deserializeJson($datas, Client::class);
        $response = $this -> cs -> saveClient($client);

        return $this -> json($response["content"], $response["status_code"]);
    }

    #[Route('/admin/clients', name : 'clients')]
    public function getClients() : JsonResponse
    {
        $response = $this -> cs ->getClients();
        return $this -> json ($response["content"], $response["status_code"]);
    }

    #[Route('/admin/update_client/{id}', name : "update_client")]
    public function updateClient(Request $req, int $id) : JsonResponse
    {

        $datas = $req -> getContent();
        $client = $this->serialization->deserializeJson($datas, Client::class);
        $response = $this -> cs -> editClient($client,$id);

        return $this -> json ($response["content"], $response["status_code"]);

    }
}
