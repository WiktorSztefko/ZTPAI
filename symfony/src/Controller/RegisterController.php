<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserDetails;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $name = $data['name'] ?? null;
        $surname = $data['surname'] ?? null;

        $errors = [];

        if ($userRepository->findOneBy(['email' => $email])) {
            $errors['email'] = 'Podany email już istnieje';
        }

        if ($userRepository->findOneBy(['username' => $username])) {
            $errors['username'] = 'Podana nazwa użytkownika istnieje';
        }

        if (!empty($errors)) {
            return new JsonResponse(['errors' => $errors], 400);
        }

        $userDetails = new UserDetails();
        $userDetails->setName($name)->setSurname($surname);

        $user = new User();
        $user->setUsername($username)
            ->setEmail($email)
            ->setPassword($passwordHasher->hashPassword($user, $password))
            ->setDetails($userDetails);

        $em->persist($userDetails);
        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'User registered successfully'], 201);
    }
}
