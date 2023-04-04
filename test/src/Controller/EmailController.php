<?php

namespace App\Controller;

use App\Entity\ContactMail;
use App\Services\EmailService;
use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Routing\Annotation\Route;

class EmailController extends AbstractController
{

    public function __construct(private MailerInterface $mailer, private EmailService $es, private Serialization $serialization)
    {
    }
    #[Route('/api/contact_email', name: 'contact_email')]
    public function sendContactEmail(Request $req): JsonResponse
    {
        $payload = $req->getContent();
        $contact = $this->serialization->deserializeJson($payload,ContactMail::class);
        $this->es->saveContact($contact);
        $response = $this->es->sendContactMail($contact);
        return $this->json(["message" => $response["content"]], $response["status_code"], [], [AbstractNormalizer::ATTRIBUTES => ["id", "date", "email", "titre","message","messageLu", "nom", "prenom", "contactMailResponse" => ["id"]]]);
    }

    #[Route('/api/admin/get_contacts_email', name: 'get_contacts_email')]
    public function getContactsEmail()
    {
        $response = $this->es->getContactsEmail();
        return $this->json($response["content"], $response["status_code"],[],[ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
            return $object->getId();
        },AbstractNormalizer::ATTRIBUTES => ["id", "date", "email", "titre","message","messageLu", "nom", "prenom", "contactMailResponse" => ["id", "response"]]]);
    }

    #[Route('/api/admin/set_read_contact_mail/{id_contact_mail}', name: 'app_set_message_lu_contact_mail')]
    public function setContactMailToRead(int $id_contact_mail): JsonResponse
    {
        $response = $this->es->setContactMailToRead($id_contact_mail);
        return $this->json($response["content"], $response["status_code"]);
    }
    
}
