<?php

namespace App\Services;

use App\Entity\ContactMail;
use App\Repository\ContactMailRepository;
use App\Utils\Functions;
use DateTimeImmutable;
use DateTimeZone;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class EmailService
{

    public function __construct(private MailerInterface $mailer, private ManagerRegistry $managerRegistry, private Functions $functions, private ContactMailRepository $rep)
    {
    }

    public function saveContact(ContactMail $contact)
    {
        $date = new DateTimeImmutable("now", new DateTimeZone("Europe/Paris"));
        $date->format("d-m-Y H:i:s");
        $contact->setDate($date);

        $em = $this->managerRegistry->getManager();

        try {
            $em->persist($contact);
            $em->flush();
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, "Une erreur est survenue lors de l'enregistrement en base !");
        }
    }

    public function sendContactMail(ContactMail $contact): array
    {

        $email = new TemplatedEmail();
        $email->subject($contact->getTitre())
            ->text($contact->getMessage())
            ->htmlTemplate('email_contact.html.twig')
            ->context([
                'nom' => $contact->getNom(),
                'prenom' => $contact->getPrenom(),
                'mail' => $contact->getEmail(),
                'message' => $contact->getMessage()
            ]);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            return ["content" => "une erreur est survenue lors de l'envoi de l'email : " . $e->getDebug(), "status_code" => 500];
        }

        return ["content" => "Votre demande de contact a bien été envoyé", "status_code" => 200];
    }

    public function getContactsEmail(): array
    {
        try {
            $contacts = $this->rep->findBy([], ["date" => "DESC"]);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, 'Erreur lors de la récupération des données');
        }

        return ["content" => $contacts, "status_code" => 200];
    }
}
