<?php

namespace App\Utils;

use App\Entity\ContactMail;
use App\Entity\Horse;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class Serialization
{
    public function __construct(private SerializerInterface $serializer)
    {
    }

    public function deserializeJson($datas, $clazz)
    {
        return $this->serializer->deserialize($datas, $clazz, 'json');
    }

    public function deserializeEmailContactJson($datas)
    {

        $context = new ObjectNormalizerContextBuilder();
        $context->withGroups(['when_post'])
            ->toArray();

        return $this->serializer->deserialize($datas, ContactMail::class, 'json', [ObjectNormalizer::GROUPS => 'when_post']);
    }
}
