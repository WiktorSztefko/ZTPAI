<?php

namespace App\Repository;

use App\Entity\Cocktail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CocktailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cocktail::class);
    }

    public function findBySearch(?string $search): array
    {
        $qb = $this->createQueryBuilder('c')
            ->leftJoin('c.ingredients', 'ci')
            ->leftJoin('ci.ingredient', 'i')
            ->addSelect('ci')
            ->addSelect('i')
            ->distinct()
            ->orderBy('c.id_cocktail', 'ASC');

        if ($search !== null && trim($search) !== '') {
            $searchParam = '%' . mb_strtolower(trim($search)) . '%';

            $qb->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->like('LOWER(c.name)', ':search'),
                    $qb->expr()->like('LOWER(c.preparation_instruction)', ':search'),
                    $qb->expr()->like('LOWER(i.name_ingredient)', ':search')
                )
            )
                ->setParameter('search', $searchParam);
        }

        return $qb->getQuery()->getResult();
    }
}
