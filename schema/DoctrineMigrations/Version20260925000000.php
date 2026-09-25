<?php

declare(strict_types=1);

namespace Application\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Ivoz\Core\Infrastructure\Persistence\Doctrine\LoggableMigration;

/**
 * Tervian One rebrand: new default product name for web portals.
 *
 * up() changes the column default and renames only the portals that still
 * carry an old default name. Portals with a custom product name are left
 * as they are.
 *
 * down() restores the previous column default ('Ivoz Provider', set by
 * Version20250708090202) and sets portals named 'Tervian One' back to
 * 'Ivoz Provider'. It cannot tell which of those were 'Axion Communications
 * Platform' before up(), or which were named 'Tervian One' on purpose later.
 */
final class Version20260925000000 extends LoggableMigration
{
    public function getDescription(): string
    {
        return 'Set WebPortals productName default to "Tervian One" and rename portals still using an old default';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE WebPortals ALTER productName SET DEFAULT \'Tervian One\'');
        $this->addSql('UPDATE WebPortals SET productName = \'Tervian One\' WHERE productName IN (\'Ivoz Provider\', \'Axion Communications Platform\')');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('UPDATE WebPortals SET productName = \'Ivoz Provider\' WHERE productName = \'Tervian One\'');
        $this->addSql('ALTER TABLE WebPortals ALTER productName SET DEFAULT \'Ivoz Provider\'');
    }
}
