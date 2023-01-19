<?php

namespace App\Utils;

class Functions {

    public function messageErreur(\Exception $e, $message) : array{
        return ["content" => $message.' '. $e -> getMessage(),  "status_code" => 500];
    }
    
}