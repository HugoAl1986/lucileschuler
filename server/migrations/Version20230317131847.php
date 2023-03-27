<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230317131847 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact_mail_response DROP FOREIGN KEY FK_C2348934BB068D08');
        $this->addSql('DROP INDEX UNIQ_C2348934BB068D08 ON contact_mail_response');
        $this->addSql('ALTER TABLE contact_mail_response CHANGE id_contact_mail_id contact_mail_id INT NOT NULL');
        $this->addSql('ALTER TABLE contact_mail_response ADD CONSTRAINT FK_C234893452584E80 FOREIGN KEY (contact_mail_id) REFERENCES contact_mail (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C234893452584E80 ON contact_mail_response (contact_mail_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact_mail_response DROP FOREIGN KEY FK_C234893452584E80');
        $this->addSql('DROP INDEX UNIQ_C234893452584E80 ON contact_mail_response');
        $this->addSql('ALTER TABLE contact_mail_response CHANGE contact_mail_id id_contact_mail_id INT NOT NULL');
        $this->addSql('ALTER TABLE contact_mail_response ADD CONSTRAINT FK_C2348934BB068D08 FOREIGN KEY (id_contact_mail_id) REFERENCES contact_mail (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C2348934BB068D08 ON contact_mail_response (id_contact_mail_id)');
    }
}
