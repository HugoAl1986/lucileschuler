<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Horse::class, orphanRemoval: true)]
    private Collection $horses;

    public function __construct()
    {
        $this->horses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Horse>
     */
    public function getHorses(): Collection
    {
        return $this->horses;
    }

    public function addHorse(Horse $Horse): self
    {
        if (!$this->horses->contains($Horse)) {
            $this->horses->add($Horse);
            $Horse->setClient($this);
        }

        return $this;
    }

    public function removeHorse(Horse $horse): self
    {
        if ($this->horses->removeElement($horse)) {
            // set the owning side to null (unless already changed)
            if ($horse->getClient() === $this) {
                $horse->setClient(null);
            }
        }

        return $this;
    }
}
