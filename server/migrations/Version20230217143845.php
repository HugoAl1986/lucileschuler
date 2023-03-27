<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230217143845 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD76B275AD FOREIGN KEY (horse_id) REFERENCES horse (id)');
        $this->addSql('CREATE INDEX IDX_51C88FAD76B275AD ON prestation (horse_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD76B275AD');
        $this->addSql('DROP INDEX IDX_51C88FAD76B275AD ON prestation');
    }
}
