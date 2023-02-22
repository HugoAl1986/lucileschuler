<?php

namespace App\Controller;

use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Horse;
use App\Services\HorseService;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class HorseController extends AbstractController
{

    public function __construct(private Serialization $serialization, private HorseService $cs)
    {
    }

    #[Route('/api/admin/get_horses', name: 'get_horses')]
    public function getHorses(): JsonResponse
    {
        $response = $this->cs->getHorses();
        return $this->json(
            $response["content"],
            $response["status_code"],
            [],
            [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }, AbstractNormalizer::ATTRIBUTES => (["id", "nom", "age", "client" => ["id", "nom", "prenom"], "prestations"])
        ]);
    }

    #[Route('/api/admin/create_horse/{client_id}', name: 'create_horse')]
    public function createHorse(Request $req, int $client_id): JsonResponse
    {
        $payload = $req->getContent();
        $horse =  $this->serialization->deserializeJson($payload, Horse::class);

        $response = $this->cs->saveHorse($horse, $client_id);

        return $this->json(
            $response["content"],
            $response["status_code"],
            [],
            [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }, AbstractNormalizer::ATTRIBUTES => (["id", "nom","age", "client" => ["id", "nom", "prenom"], "prestations"])
        ]);
    }

    #[Route('/api/admin/update_horse/{id}', name: 'update_horse')]
    public function updateHorse(Request $req, int $id): JsonResponse
    {
        $payload = $req->getContent();
        $horse = $this->serialization->deserializeJson($payload, Horse::class);
        $response = $this->cs->updateHorse($horse, $id);

        return $this->json(["message" => $response["content"]], $response["status_code"]);
    }
}
