<?php

namespace App\Controller;

use App\Entity\ContactMailResponse;
use App\Services\ContactMailResponseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Utils\Serialization;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class ContactMailResponseController extends AbstractController
{

    public function __construct( private Serialization $serialization, private ContactMailResponseService $contactMailResponseService){

    }
    #[Route('/api/admin/contact_mail_response/{id_contact_mail}', name: 'app_contact_mail_response')]
    public function sendContactMailResponse(Request $request, int $id_contact_mail): JsonResponse
    {
        $payload = $request->getContent();
        $contactMailResponse = $this->serialization->deserializeJson($payload,ContactMailResponse::class);
        $response = $this->contactMailResponseService->sendResponse($id_contact_mail, $contactMailResponse);
        return $this->json($response["content"], $response["status_code"]);
    }

    #[Route('api/admin/get_contact_mail_response', name : 'app_get_contact_mail_response')]
    public function getContactMailResponse():JsonResponse{
        $response = $this->contactMailResponseService->getContactMailResponse();
        return $this->json($response["content"], $response["status_code"],[], [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
            return $object->getId();
        }, AbstractNormalizer::ATTRIBUTES => ["id", "object","createdAt","response","contactMail" => ["id","date","email","message","messageLu","nom","prenom","titre"]]]);
    }
}
