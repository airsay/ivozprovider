<?php

declare(strict_types=1);

namespace Application\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Ivoz\Core\Infrastructure\Persistence\Doctrine\LoggableMigration;

/**
 * Tervian One rebrand: Emerald (#087F6D) becomes the default web portal
 * colour.
 *
 * up() changes the column default and moves portals whose colour was never
 * customised to Emerald:
 *  - '#000000', the column default since Version20231214112518;
 *  - the stock colour that migration gave each portal type (god #2D333B,
 *    brand #248475, admin #0277BD, user #BF360C).
 * Colours carried over from Klear themes, and any other colour, are kept.
 *
 * down() restores the '#000000' default and gives Emerald portals their
 * type's stock colour back. It cannot tell which of them were '#000000'
 * before up(), or set to Emerald on purpose later; those get the stock
 * colour too.
 */
final class Version20260925120000 extends LoggableMigration
{
    private const STOCK_COLORS = [
        'god' => '#2D333B',
        'brand' => '#248475',
        'admin' => '#0277BD',
        'user' => '#BF360C',
    ];

    public function getDescription(): string
    {
        return 'Set WebPortals color default to Tervian Emerald and move portals with a non-customised colour to it';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE WebPortals ALTER color SET DEFAULT \'#087F6D\'');

        $stockColorConditions = [];
        foreach (self::STOCK_COLORS as $urlType => $color) {
            $stockColorConditions[] = "(urlType = '$urlType' AND UPPER(color) = '$color')";
        }

        $this->addSql(
            "UPDATE WebPortals SET color = '#087F6D' WHERE color = '#000000' OR "
            . implode(' OR ', $stockColorConditions)
        );
    }

    public function down(Schema $schema): void
    {
        $cases = '';
        foreach (self::STOCK_COLORS as $urlType => $color) {
            $cases .= " WHEN '$urlType' THEN '$color'";
        }

        $this->addSql(
            "UPDATE WebPortals SET color = CASE urlType$cases ELSE '#000000' END WHERE UPPER(color) = '#087F6D'"
        );
        $this->addSql('ALTER TABLE WebPortals ALTER color SET DEFAULT \'#000000\'');
    }
}
