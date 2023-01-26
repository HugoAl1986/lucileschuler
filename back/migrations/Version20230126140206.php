<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230126140206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE prestation (id INT AUTO_INCREMENT NOT NULL, cheval_id_id INT NOT NULL, adresse_prestation_id_id INT DEFAULT NULL, prix_id_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_51C88FAD6E902F5D (cheval_id_id), INDEX IDX_51C88FADB3C20B3F (adresse_prestation_id_id), INDEX IDX_51C88FAD9F0BF009 (prix_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD6E902F5D FOREIGN KEY (cheval_id_id) REFERENCES cheval (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FADB3C20B3F FOREIGN KEY (adresse_prestation_id_id) REFERENCES adresse_prestation (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD9F0BF009 FOREIGN KEY (prix_id_id) REFERENCES prix (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD6E902F5D');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FADB3C20B3F');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD9F0BF009');
        $this->addSql('DROP TABLE prestation');
    }
}
