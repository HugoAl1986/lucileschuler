<?php

namespace App\Services;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Utils\Functions;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService {

    public function __construct(private UserRepository $rep, private Functions $functions,private UserPasswordHasherInterface $userPasswordHasherInterface)
    {

    }

    public function saveUser(User $user) : array
    {

        $hashedPassword = $this -> userPasswordHasherInterface ->hashPassword($user,$user -> getPassword());
        $user -> setPassword($hashedPassword);
        try
        {
            $this ->rep -> save($user, true);
        }
        catch(\Exception $e)
        {
            $this -> functions ->messageErreur($e, "Un problême est survenu lors de l'enregistrement en base");
        }

        return ["content" => "l'utilisateur " . $user -> getEmail() . " a bien été enregistré en base !", "status_code" => 201];
    }
    }