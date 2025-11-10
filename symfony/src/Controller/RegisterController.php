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

        if ($name === null || trim($name) === '') {
            $errors['name'] = 'To pole nie może być puste';
        }

        if ($surname === null || trim($surname) === '') {
            $errors['surname'] = 'To pole nie może być puste';
        }

        if ($email === null || trim($email) === '') {
            $errors['email'] = 'To pole nie może być puste';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Podaj poprawny adres email';
        } elseif ($userRepository->findOneBy(['email' => $email])) {
            $errors['email'] = 'Podany adres email już istnieje';
        }

        if ($username === null || trim($username) === '') {
            $errors['username'] = 'To pole nie może być puste';
        } else if ($userRepository->findOneBy(['username' => $username])) {
            $errors['username'] = 'Podana nazwa użytkownika  już istnieje';
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

        $connection = $em->getConnection();
        $connection->insert('users_roles', [
            'id_user' => $user->getId(),
            'id_role' => 2
        ]);

        return new JsonResponse(['message' => 'User registered successfully'], 201);
    }
}
