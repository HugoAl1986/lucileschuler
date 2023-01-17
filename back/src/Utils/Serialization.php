<?php

namespace App\Utils;

use Symfony\Component\Serializer\SerializerInterface;

class Serialization {

    public function __construct(private SerializerInterface $serializer)
    {
        
    }

    public function deserializeJson($datas,$clazz){
        return $this->serializer->deserialize($datas,$clazz,'json');
    }

}