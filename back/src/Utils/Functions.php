<?php

namespace App\Utils;


use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class Functions {

    public function messageErreur(\Exception $e, $message) : array{
        return ["content" => $message.' '. $e -> getMessage(),  "status_code" => 500];
    }
    
}