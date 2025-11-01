<?php
// src/Entity/User.php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: "App\Repository\UserRepository")]
#[ORM\Table(name: "users")]
class User implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_user", type: "integer")]
    private ?int $id = null;

    // #[ORM\Column(name: "name", type: "string", length: 255)]
    // private string $name;

    // #[ORM\Column(type: "string", length: 255)]
    // private string $surname;

    #[ORM\Column(type: "string", length: 180, unique: true)]
    private string $username;

    #[ORM\Column(type: "string", length: 180, unique: true)]
    private string $email;

    #[ORM\Column(type: "string")]
    private string $password;

    // #[ORM\Column(type: "json")]
    // private array $roles = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    // public function getName(): string
    // {
    //     return $this->name;
    // }
    // public function setName(string $name): self
    // {
    //     $this->name = $name;
    //     return $this;
    // }

    // public function getSurname(): string
    // {
    //     return $this->surname;
    // }
    // public function setSurname(string $surname): self
    // {
    //     $this->surname = $surname;
    //     return $this;
    // }

    public function getUsername(): string
    {
        return $this->username;
    }
    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    // public function getRoles(): array
    // {
    //     return array_unique(array_merge($this->roles, ['ROLE_USER']));
    // }
    // public function setRoles(array $roles): self
    // {
    //     $this->roles = $roles;
    //     return $this;
    // }
}
