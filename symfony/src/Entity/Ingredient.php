<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "ingredients")]
class Ingredient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_ingredient", type: "integer")]
    private ?int $id_ingredient = null;

    #[ORM\Column(name: "name_ingredient", type: "string", length: 255)]
    private string $name_ingredient;

    public function getId(): ?int
    {
        return $this->id_ingredient;
    }

    public function getName(): string
    {
        return $this->name_ingredient;
    }

    public function setName(string $name_ingredient): self
    {
        $this->name_ingredient = $name_ingredient;
        return $this;
    }
}
