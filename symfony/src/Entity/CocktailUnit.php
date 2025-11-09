<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "units")]
class CocktailUnit

{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_unit", type: "integer")]
    private ?int $id_unit = null;

    #[ORM\Column(name: "name_unit", type: "string", length: 50)]
    private string $name_unit;

    public function getId(): ?int
    {
        return $this->id_unit;
    }

    public function getName(): string
    {
        return $this->name_unit;
    }

    public function setName(string $name_unit): self
    {
        $this->name_unit = $name_unit;
        return $this;
    }
}
