<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;

class UserController extends AbstractController
{
    #[Route('/api/user', name: 'api_user', methods: ['GET'])]
    public function index(SessionInterface $session, UserRepository $userRepository): JsonResponse
    {
        $userId = $session->get('user_id');

        if (!$userId) {
            return new JsonResponse(['message' => 'User not logged in'], 401);
        }

        // Pobieramy użytkownika z bazy z eager loading dla details i roles
        $user = $userRepository->createQueryBuilder('u')
            ->leftJoin('u.details', 'd')
            ->addSelect('d')
            ->leftJoin('u.roles', 'r')
            ->addSelect('r')
            ->where('u.id_user = :id')
            ->setParameter('id', $userId)
            ->getQuery()
            ->getOneOrNullResult();

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        $roles = $user->getRoles()->map(fn($role) => $role->getNameRole())->toArray();

        return new JsonResponse([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'name' => $user->getDetails()?->getName(),
            'surname' => $user->getDetails()?->getSurname(),
            'roles' => $roles,
        ]);
    }

}
