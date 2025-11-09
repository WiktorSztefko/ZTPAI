<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "cocktails_ingredients")]
class CocktailIngredient
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: "Cocktail", inversedBy: "ingredients")]
    #[ORM\JoinColumn(name: "id_cocktail", referencedColumnName: "id_cocktail", onDelete: "CASCADE")]
    private ?Cocktail $cocktail = null;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: "Ingredient")]
    #[ORM\JoinColumn(name: "id_ingredient", referencedColumnName: "id_ingredient")]
    private ?Ingredient $ingredient = null;

    #[ORM\Column(type: "float")]
    private float $quantity;

    #[ORM\ManyToOne(targetEntity: "Unit")]
    #[ORM\JoinColumn(name: "id_unit", referencedColumnName: "id_unit", nullable: true)]
    private ?Unit $unit = null;

    public function getCocktail(): ?Cocktail
    {
        return $this->cocktail;
    }

    public function setCocktail(?Cocktail $cocktail): self
    {
        $this->cocktail = $cocktail;
        return $this;
    }

    public function getIngredient(): ?Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient(?Ingredient $ingredient): self
    {
        $this->ingredient = $ingredient;
        return $this;
    }

    public function getQuantity(): float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): self
    {
        $this->quantity = $quantity;
        return $this;
    }

    public function getUnit(): ?Unit
    {
        return $this->unit;
    }

    public function setUnit(?Unit $unit): self
    {
        $this->unit = $unit;
        return $this;
    }
}
