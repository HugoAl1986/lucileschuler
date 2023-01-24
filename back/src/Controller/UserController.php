<?php

namespace App\Controller;

use App\Entity\User;
use App\Services\UserService;
use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class UserController extends AbstractController
{

    public function __construct(private Serialization $serialialization, private UserService $service)
    {
        
    }

    #[Route('/login', name: 'api_login')]
    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        if (null === $user) {
            return $this->json([
            'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'message' => 'Vous avez bien été authentitifié',
            'user'  => $user->getUserIdentifier(),
            'token' => null,
        ]);
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
