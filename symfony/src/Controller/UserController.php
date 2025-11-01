<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;


class UserController extends AbstractController
{
    #[Route('/api/user', name: 'api_user', methods: ['GET'])]
    public function index(SessionInterface $session): JsonResponse
    {
        $user = $session->get('user');

        if (!$user) {
            return new JsonResponse(['message' => 'User not logged in'], 401);
        }

        return new JsonResponse([
            'id' => $user->getId(),
            'username' => $user->getUserName(),
            'email' => $user->getEmail(),
        ]);
    }
}
