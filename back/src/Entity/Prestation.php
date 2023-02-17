<?php

namespace App\Entity;

use App\Repository\PrestationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ORM\Entity(repositoryClass: PrestationRepository::class)]
class Prestation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'd-m-Y H:i:s'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Horse $horse = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    private ?AdressePrestation $adresse_prestation = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    private ?Prix $prix = null;

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

    public function getHorse(): ?horse
    {
        return $this->horse;
    }

    public function setHorse(?horse $horse): self
    {
        $this->horse = $horse;

        return $this;
    }

    public function getAdressePrestation(): ?AdressePrestation
    {
        return $this->adresse_prestation;
    }

    public function setAdressePrestation(?AdressePrestation $adresse_prestation): self
    {
        $this->adresse_prestation = $adresse_prestation;

        return $this;
    }

    public function getPrix(): ?Prix
    {
        return $this->prix;
    }

    public function setPrix(?Prix $prix): self
    {
        $this->prix = $prix;

        return $this;
    }
}
