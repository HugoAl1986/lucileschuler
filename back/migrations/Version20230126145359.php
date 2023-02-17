<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230126145359 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD6E902F5D');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD9F0BF009');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FADB3C20B3F');
        $this->addSql('DROP INDEX IDX_51C88FAD6E902F5D ON prestation');
        $this->addSql('DROP INDEX IDX_51C88FAD9F0BF009 ON prestation');
        $this->addSql('DROP INDEX IDX_51C88FADB3C20B3F ON prestation');
        $this->addSql('ALTER TABLE prestation ADD adresse_prestation_id INT DEFAULT NULL, ADD prix_id INT DEFAULT NULL, DROP adresse_prestation_id_id, DROP prix_id_id, CHANGE horse_id_id horse_id INT NOT NULL');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FADC8BE953B FOREIGN KEY (horse_id) REFERENCES horse (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD83C2AEC1 FOREIGN KEY (adresse_prestation_id) REFERENCES adresse_prestation (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD944722F2 FOREIGN KEY (prix_id) REFERENCES prix (id)');
        $this->addSql('CREATE INDEX IDX_51C88FADC8BE953B ON prestation (horse_id)');
        $this->addSql('CREATE INDEX IDX_51C88FAD83C2AEC1 ON prestation (adresse_prestation_id)');
        $this->addSql('CREATE INDEX IDX_51C88FAD944722F2 ON prestation (prix_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FADC8BE953B');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD83C2AEC1');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD944722F2');
        $this->addSql('DROP INDEX IDX_51C88FADC8BE953B ON prestation');
        $this->addSql('DROP INDEX IDX_51C88FAD83C2AEC1 ON prestation');
        $this->addSql('DROP INDEX IDX_51C88FAD944722F2 ON prestation');
        $this->addSql('ALTER TABLE prestation ADD adresse_prestation_id_id INT DEFAULT NULL, ADD prix_id_id INT DEFAULT NULL, DROP adresse_prestation_id, DROP prix_id, CHANGE horse_id horse_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD6E902F5D FOREIGN KEY (horse_id_id) REFERENCES horse (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD9F0BF009 FOREIGN KEY (prix_id_id) REFERENCES prix (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FADB3C20B3F FOREIGN KEY (adresse_prestation_id_id) REFERENCES adresse_prestation (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_51C88FAD6E902F5D ON prestation (horse_id_id)');
        $this->addSql('CREATE INDEX IDX_51C88FAD9F0BF009 ON prestation (prix_id_id)');
        $this->addSql('CREATE INDEX IDX_51C88FADB3C20B3F ON prestation (adresse_prestation_id_id)');
    }
}
