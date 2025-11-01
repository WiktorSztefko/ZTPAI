<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: "roles")]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_role", type: "integer")]
    private ?int $id_role = null;

    #[ORM\Column(name: "name_role", type: "string", length: 255)]
    private string $name_role;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: "roles")]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id_role;
    }

    public function getNameRole(): string
    {
        return $this->name_role;
    }

    public function setNameRole(string $name_role): self
    {
        $this->name_role = $name_role;
        return $this;
    }

    public function getUsers(): Collection
    {
        return $this->users;
    }
}
