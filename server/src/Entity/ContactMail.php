<?php

namespace App\Entity;

use App\Repository\ContactMailRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ORM\Entity(repositoryClass: ContactMailRepository::class)]
class ContactMail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

   
    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type:"text")]
    private ?string $message = null;

    #[ORM\Column()]
    private ?bool $messageLu = false;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\OneToOne(mappedBy: 'contactMail', cascade: ['persist', 'remove'])]
    private ?ContactMailResponse $contactMailResponse = null;

    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function isMessageLu(): ?bool
    {
        return $this->messageLu;
    }

    public function setMessageLu(bool $messageLu): self
    {
        $this->messageLu = $messageLu;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getContactMailResponse(): ?ContactMailResponse
    {
        return $this->contactMailResponse;
    }

    public function setContactMailResponse(ContactMailResponse $contactMailResponse): self
    {
        // set the owning side of the relation if necessary
        if ($contactMailResponse->getContactMail() !== $this) {
            $contactMailResponse->setContactMail($this);
        }

        $this->contactMailResponse = $contactMailResponse;

        return $this;
    }

   
}
