<?php

namespace App\Controller;

use App\Repository\ReferenceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ReferenceController extends AbstractController
{
    private ReferenceRepository $referenceRepository;

    public function __construct(ReferenceRepository $referenceRepository)
    {
        $this->referenceRepository = $referenceRepository;
    }

    #[Route('/api/reference/ingredients', name: 'api_reference_ingredients', methods: ['GET'])]
    public function getIngredients(SessionInterface $session): JsonResponse
    {

        $userId = $session->get('user_id');

        if (!$userId) {
            return new JsonResponse(['message' => 'User not logged in'], 401);
        }

        $ingredients = $this->referenceRepository->findAllIngredients();
        $response = new JsonResponse($ingredients, 200);
        $response->setEncodingOptions(JSON_UNESCAPED_UNICODE);

        return $response;
    }

    #[Route('/api/reference/units', name: 'api_reference_units', methods: ['GET'])]
    public function getUnits(SessionInterface $session): JsonResponse
    {

        $userId = $session->get('user_id');

        if (!$userId) {
            return new JsonResponse(['message' => 'User not logged in'], 401);
        }

        $units = $this->referenceRepository->findAllUnits();

        return new JsonResponse($units, 200);
    }
}