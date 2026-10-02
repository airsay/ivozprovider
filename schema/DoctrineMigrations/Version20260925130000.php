<?php

declare(strict_types=1);

namespace Application\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Ivoz\Core\Infrastructure\Persistence\Doctrine\LoggableMigration;

/**
 * Tervian One rebrand: the platform portal seeded by initial.sql.
 *
 * initial.sql creates WebPortal #1 (god) with klearTheme 'redmond', so
 * Version20231214112518 gives it the Klear colour '#70A8D2' instead of the
 * god stock colour, and Version20260925120000 keeps it as a customised
 * colour. It is the seed default, not a choice, so move it to Emerald too.
 *
 * Only that row, and only while it still has the seed theme and colour.
 */
final class Version20260925130000 extends LoggableMigration
{
    public function getDescription(): string
    {
        return 'Move the seeded platform WebPortal from its Klear default colour to Tervian Emerald';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(
            "UPDATE WebPortals SET color = '#087F6D' WHERE id = 1 AND urlType = 'god' AND klearTheme = 'redmond' AND UPPER(color) = '#70A8D2'"
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(
            "UPDATE WebPortals SET color = '#70A8D2' WHERE id = 1 AND urlType = 'god' AND klearTheme = 'redmond' AND UPPER(color) = '#087F6D'"
        );
    }
}
