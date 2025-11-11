<?php

namespace App\Repository;

use App\Entity\Ingredient;
use App\Entity\CocktailUnit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ReferenceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ingredient::class);
    }

    public function findAllIngredients(): array
    {
        $ingredients = $this->getEntityManager()
            ->getRepository(Ingredient::class)
            ->findAll();

        return array_map(fn(Ingredient $ingredient) => [
            'id_ingredient' => $ingredient->getId(),
            'name' => $ingredient->getName(),
        ], $ingredients);
    }

    public function findAllUnits(): array
    {
        $units = $this->getEntityManager()
            ->getRepository(CocktailUnit::class)
            ->findAll();

        return array_map(fn(CocktailUnit $unit) => [
            'id_unit' => $unit->getId(),
            'name' => $unit->getName(),
        ], $units);
    }
}
