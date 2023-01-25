<?php

namespace App\Controller;

use App\Entity\User;
use App\Services\UserService;
use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{

    public function __construct(private Serialization $serialialization, private UserService $service)
    {
        
    }
    
    #[Route('/create_user', name: 'api_create_user')]
    public function createUser(Request $request): JsonResponse
    {
        $payload = $request -> getContent();
        $user = $this -> serialialization -> deserializeJson($payload,User::class);
        $response = $this -> service -> saveUser($user);
        return $this->json([$response["content"]],$response["status_code"]);
    }
}
