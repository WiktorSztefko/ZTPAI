<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: "App\Repository\CocktailRepository")]
#[ORM\Table(name: "cocktails")]
class Cocktail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_cocktail", type: "integer")]
    private ?int $id_cocktail = null;

    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\Column(type: "text")]
    private ?string $description = null;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $fun_fact = null;

    #[ORM\Column(type: "string", length: 255)]
    private string $image;

    #[ORM\Column(type: "string", length: 50)]
    private string $difficulty_level;

    #[ORM\Column(type: "text")]
    private string $preparation_instruction;

    #[ORM\OneToMany(mappedBy: "cocktail", targetEntity: CocktailIngredient::class)]
    private Collection $ingredients;

    public function __construct()
    {
        $this->ingredients = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id_cocktail;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getFunFact(): ?string
    {
        return $this->fun_fact;
    }

    public function setFunFact(?string $fun_fact): self
    {
        $this->fun_fact = $fun_fact;
        return $this;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;
        return $this;
    }

    public function getDifficultyLevel(): string
    {
        return $this->difficulty_level;
    }

    public function setDifficultyLevel(string $difficulty_level): self
    {
        $this->difficulty_level = $difficulty_level;
        return $this;
    }

    public function getPreparationInstruction(): string
    {
        return $this->preparation_instruction;
    }

    public function setPreparationInstruction(string $preparation_instruction): self
    {
        $this->preparation_instruction = $preparation_instruction;
        return $this;
    }

    public function getIngredients(): Collection
    {
        return $this->ingredients;
    }
}
