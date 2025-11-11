<?php

namespace App\Controller;

use App\Entity\Cocktail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UploadController extends AbstractController
{
    #[Route('/api/upload/cocktail', name: 'api_upload_cocktail', methods: ['POST'])]
    public function uploadCocktail(SessionInterface $session, Request $request, EntityManagerInterface $em): JsonResponse
    {

        $userId = $session->get('user_id');

        if (!$userId) {
            return new JsonResponse(['message' => 'User not logged in'], 401);
        }

        $name = trim($request->request->get('name', ''));
        $description = trim($request->request->get('description', ''));
        $instruction = trim($request->request->get('preparationInstruction', ''));
        $funFact = trim($request->request->get('funFact', ''));
        $difficultyLevel = (int) $request->request->get('difficultyLevel', 0);
        $file = $request->files->get('file');

        $ingredients = $request->request->all('ingredients');

        if (!$name || !$description || !$instruction || !$difficultyLevel) {
            return new JsonResponse(['message' => 'Wszystkie wymagane pola muszą być uzupełnione'], 400);
        }

        if (empty($ingredients)) {
            return new JsonResponse(['message' => 'Koktajl musi mieć co najmniej jeden składnik'], 400);
        }

        $existing = $em->getRepository(Cocktail::class)
            ->createQueryBuilder('c')
            ->where('LOWER(c.name) = LOWER(:name)')
            ->setParameter('name', $name)
            ->getQuery()
            ->getOneOrNullResult();

        if ($existing) {
            return new JsonResponse(['message' => 'Koktajl o tej nazwie już istnieje'], 409);
        }

        if ($file) {
            $uploadsDir = $this->getParameter('kernel.project_dir') . '/public/images/cocktails';
            $fileName = $file->getClientOriginalName();

            try {
                $file->move($uploadsDir, $fileName);
            } catch (\Exception $e) {
                return new JsonResponse([
                    'message' => 'Nie udało się zapisać pliku: ' . $e->getMessage()
                ], 500);
            }
        } else {
            return new JsonResponse(['error' => 'Brak pliku zdjęcia'], 400);
        }

        $em->getConnection()->beginTransaction();

        try {
            $connection = $em->getConnection();

            $sql = "INSERT INTO cocktails 
                    (name, description, preparation_instruction, fun_fact, difficulty_level, image, id_assigned_by) 
                    VALUES (:name, :description, :instruction, :fun_fact, :difficulty_level, :image, :id_assigned_by))";

            $stmt = $connection->prepare($sql);
            $stmt->bindValue('name', $name);
            $stmt->bindValue('description', $description);
            $stmt->bindValue('instruction', $instruction);
            $stmt->bindValue('fun_fact', $funFact);
            $stmt->bindValue('difficulty_level', $difficultyLevel);
            $stmt->bindValue('image', $fileName);
            $stmt->bindValue('id_assigned_by)', $userId);

            $stmt->executeStatement();
            $id = $connection->lastInsertId();

            $connection = $em->getConnection();

            $sql = "INSERT INTO cocktails_ingredients 
                    (id_cocktail, id_ingredient, quantity, id_unit) 
                    VALUES (:cocktailId, :ingredientId, :quantity, :unitId)";

            $stmt = $connection->prepare($sql);

            foreach ($ingredients as $item) {
                $id_ingredient = $item['id_ingredient'] ?? null;
                $quantity = $item['quantity'] ?? null;
                $id_unit = $item['id_unit'] ?? null;

                $stmt->bindValue('cocktailId', $id);
                $stmt->bindValue('ingredientId', $id_ingredient);
                $stmt->bindValue('quantity', (float) $quantity);
                $stmt->bindValue('unitId', $id_unit);

                $stmt->executeStatement();
            }

            $em->flush();
            $em->getConnection()->commit();

            return new JsonResponse(['message' => 'Koktajl dodany pomyślnie!'], 201);
        } catch (\Throwable $e) {
            $em->getConnection()->rollBack();
            return new JsonResponse(['message' => $e->getMessage()], 500);
        }
    }
}