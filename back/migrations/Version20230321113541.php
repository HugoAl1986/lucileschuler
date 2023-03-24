<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230321113541 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact_mail ADD contact_mail_response_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE contact_mail ADD CONSTRAINT FK_79D92EB78ED65F09 FOREIGN KEY (contact_mail_response_id) REFERENCES contact_mail_response (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_79D92EB78ED65F09 ON contact_mail (contact_mail_response_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact_mail DROP FOREIGN KEY FK_79D92EB78ED65F09');
        $this->addSql('DROP INDEX UNIQ_79D92EB78ED65F09 ON contact_mail');
        $this->addSql('ALTER TABLE contact_mail DROP contact_mail_response_id');
    }
}
