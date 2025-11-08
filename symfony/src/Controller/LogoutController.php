<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Exception\SessionNotFoundException;

class LogoutController extends AbstractController
{
    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(SessionInterface $session): JsonResponse
    {
        $userId = $session->get('user_id');
        if (!$userId) {
            return new JsonResponse([
                'message' => 'No user is currently logged in.'
            ], 401);
        }

        try {
            $session->invalidate();

        } catch (SessionNotFoundException $e) {
            return new JsonResponse([
                'message' => 'Session not found or already invalidated.'
            ], 500);

        } catch (\Throwable $e) {
            return new JsonResponse([
                'message' => $e->getMessage()
            ], 500);
        }

        return new JsonResponse([
            'message' => 'Logout successful'
        ], 200);
    }
}
