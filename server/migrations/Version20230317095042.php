<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230317095042 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE contact_mail_response (id INT AUTO_INCREMENT NOT NULL, id_contact_mail_id INT NOT NULL, object VARCHAR(255) NOT NULL, response LONGTEXT NOT NULL, UNIQUE INDEX UNIQ_C2348934BB068D08 (id_contact_mail_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contact_mail_response ADD CONSTRAINT FK_C2348934BB068D08 FOREIGN KEY (id_contact_mail_id) REFERENCES contact_mail (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact_mail_response DROP FOREIGN KEY FK_C2348934BB068D08');
        $this->addSql('DROP TABLE contact_mail_response');
    }
}
