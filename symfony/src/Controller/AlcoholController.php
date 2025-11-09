<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\AlcoholRepository;

class AlcoholController extends AbstractController
{
    #[Route('/api/alcohols', name: 'api_alcohols', methods: ['GET'])]
    public function alcohols(SessionInterface $session, AlcoholRepository $alcoholRepository): JsonResponse
    {
        $userId = $session->get('user_id');

        if (!$userId) {
            return new JsonResponse(['message' => 'User not logged in'], 401);
        }

        $alcohols = $alcoholRepository->findBy([], ['id_alcohol' => 'ASC']);

        if (empty($alcohols)) {
            return new JsonResponse(['message' => 'No alcohols found'], 404);
        }

        $data = array_map(fn($alcohol) => [
            'id' => $alcohol->getId(),
            'name' => $alcohol->getName(),
            'image' => $alcohol->getImage(),
        ], $alcohols);

        $response = new JsonResponse($data, 200);
        $response->setEncodingOptions(JSON_UNESCAPED_UNICODE);

        return $response;
    }
}
