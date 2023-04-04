<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230217150510 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE horse ADD client_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE horse ADD CONSTRAINT FK_629A2F1819EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('CREATE INDEX IDX_629A2F1819EB6921 ON horse (client_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE horse DROP FOREIGN KEY FK_629A2F1819EB6921');
        $this->addSql('DROP INDEX IDX_629A2F1819EB6921 ON horse');
        $this->addSql('ALTER TABLE horse DROP client_id');
    }
}
