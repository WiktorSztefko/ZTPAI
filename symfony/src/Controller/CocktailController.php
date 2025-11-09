<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CocktailRepository;

class CocktailController extends AbstractController
{
    #[Route('/api/cocktails', name: 'api_cocktails', methods: ['GET'])]
    public function cocktails(CocktailRepository $cocktailRepository): JsonResponse
    {
        $cocktails = $cocktailRepository->findBy([], ['id_cocktail' => 'ASC']);

        if (empty($cocktails)) {
            return new JsonResponse(
                ['message' => 'No cocktails found'],
                404
            );
        }

        $data = array_map(fn($cocktail) => [
            'name' => $cocktail->getName(),
            'image' => $cocktail->getImage(),
        ], $cocktails);

        return new JsonResponse(
            $data,
            200
        );
    }

    #[Route('/api/cocktails/{slug}', name: 'api_cocktail_detail', methods: ['GET'])]
    public function cocktail(string $slug, CocktailRepository $cocktailRepository): JsonResponse
    {
        $name = str_replace('-', ' ', $slug);

        $cocktail = $cocktailRepository->createQueryBuilder('c')
            ->where('LOWER(c.name) = LOWER(:name)')
            ->setParameter('name', $name)
            ->getQuery()
            ->getOneOrNullResult();

        if (!$cocktail) {
            return new JsonResponse(
                ['message' => 'Cocktail not found'],
                404
            );
        }

        $ingredientsData = array_map(fn($ci) => [
            'name' => $ci->getIngredient()->getName(),
            'quantity' => $ci->getQuantity(),
            'unit' => $ci->getUnit()?->getName()
        ], $cocktail->getIngredients()->toArray());

        $data = [
            'id_cocktail' => $cocktail->getId(),
            'name' => $cocktail->getName(),
            'description' => $cocktail->getDescription(),
            'fun_fact' => $cocktail->getFunFact(),
            'image' => $cocktail->getImage(),
            'difficulty_level' => $cocktail->getDifficultyLevel(),
            'preparation_instruction' => $cocktail->getPreparationInstruction(),
            'ingredients' => $ingredientsData,
        ];

        $response = new JsonResponse($data, 200);
        $response->setEncodingOptions(JSON_UNESCAPED_UNICODE);

        return $response;
    }
}
