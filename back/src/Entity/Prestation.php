<?php

namespace App\Entity;

use App\Repository\PrestationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: PrestationRepository::class)]
class Prestation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $start = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    //#[Context([DateTimeNormalizer::FORMAT_KEY => 'd-m-Y H:i:s'])]
    private ?\DateTimeInterface $end = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Horse $horse = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    private ?AdressePrestation $adresse_prestation = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    private ?Prix $prix = null;

    #[ORM\OneToOne(mappedBy: 'prestation', cascade: ['persist', 'remove'])]
    private ?Report $report = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

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

    public function getReport(): ?Report
    {
        return $this->report;
    }

    public function setReport(Report $report): self
    {
        // set the owning side of the relation if necessary
        if ($report->getPrestation() !== $this) {
            $report->setPrestation($this);
        }

        $this->report = $report;

        return $this;
    }
}
