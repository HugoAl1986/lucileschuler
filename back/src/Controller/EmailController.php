<?php

namespace App\Controller;

use App\Services\EmailService;
use App\Utils\Serialization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;

class EmailController extends AbstractController
{

    public function __construct(private MailerInterface $mailer, private EmailService $es, private Serialization $serialization)
    {
        
    }
    #[Route('/contact_email', name: 'contact_email')]
    public function sendContactEmail(Request $req): JsonResponse
    {
        $payload = $req -> getContent();
        $contact = $this -> serialization ->deserializeEmailContactJson($payload);
        $this -> es -> saveContact($contact);
        $response = $this -> es -> sendContactMail($contact);
        return $this -> json(["message" => $response["content"]], $response["status_code"]);

    }

    #[Route('/get_contactsEmail', name:'get_contacts_email')]
    public function getContactsEmail()
    {  
        $response = $this -> es -> getContactsEmail();
        return $this -> json([$response["content"]], $response["status_code"]);
    }
}
