<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\AlcoholRepository;

class AlcoholController extends AbstractController
{
    #[Route('/api/alcohols', name: 'api_alcohols', methods: ['GET'])]
    public function index(AlcoholRepository $alcoholRepository): JsonResponse
    {
        $alcohols = $alcoholRepository->findAll();

        if (empty($alcohols)) {
            return new JsonResponse(['message' => 'No alcohols found'], 404);
        }

        $data = array_map(fn($alcohol) => [
            'id' => $alcohol->getId(),
            'name' => $alcohol->getName(),
            'image' => $alcohol->getImage(),
        ], $alcohols);

        return new JsonResponse($data);
    }
}
