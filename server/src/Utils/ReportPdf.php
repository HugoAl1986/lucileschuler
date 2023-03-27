<?php

namespace App\Utils;

use DateTime;
use Fpdf\Fpdf;

class ReportPdf extends Fpdf
{

    private string $sizeDefaultTabInfos;
    private const DATE = "Date";
    private const PLACE = "Lieu";
    private const OWNER = "Propriétaire";
    private const HORSE = "Cheval";
    private const LIFESTYLE = "Mode de vie";
    private const FOOD = "Alimentation";
    private const ACTIVITIES = "Discipline";
    private const REASONS_FOR_SESSION = "Motifs de la séance";
    private const OBSERVATIONS_INFORMATIONS = "Observations/Informations";
    private const GOALS_OF_SESSION = "Objectifs de la séance";
    private const ATTITUDE_OF_HORSE = "Attitude du cheval";
    private const ADVICE = "Conseils";

    public function __construct(private string $horseInfos, private string $lifestyle, private string $food, private string $activities, private string $dateIntervention, private string $placeIntervention, private string $owner, private string $reasonsForSession, private string $observations, private string $goalsOfSession, private string $attitudeOfHorse, private string $advice, private string $url)
    {
        parent::__construct();
        $this->SetFont('Arial', '', 8);
        $this->SetTextColor(0, 0, 0);
        $this->SetMargins(25, 10, 25);
        $this->sizeDefaultTabInfos = 60;
        $this->transformDate($dateIntervention);
    
    }

    public function transformDate(string $dateIntervention){
        
        $date = new DateTime($dateIntervention);
        $this->dateIntervention= $date -> format('d/m/Y');
    }

    public function createArrayForTabWithInfos(): array
    {
        return [self::DATE => $this->dateIntervention, self::PLACE => $this->placeIntervention, self::OWNER => $this->owner];
    }

    public function createArrayForTabHorseInfos()
    {
        return [self::HORSE => $this->horseInfos, self::LIFESTYLE => $this->lifestyle, self::FOOD => $this->food, self::ACTIVITIES => $this->activities];
    }

    public function createArrayForMain()
    {
        return [self::REASONS_FOR_SESSION => $this->reasonsForSession, self::OBSERVATIONS_INFORMATIONS => $this->observations, self::GOALS_OF_SESSION => $this->goalsOfSession, self::ATTITUDE_OF_HORSE => $this->attitudeOfHorse, self::ADVICE => $this->advice];
    }

    public function decodeUTF8(string $string) : string
    
    {
        setlocale(LC_ALL, 'fr_FR');
        return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $string);
    }

    public function header()
    {
        $this->setY(10);
        $this->SetFillColor(197, 233, 223);
        $this->SetLineWidth(0.1);
        $this->SetFont('Arial', 'B', 12);
        $this->cell(100, 15, $this->decodeUTF8("Compte rendu de la séance de shiatsu"), 1, 0, 'C', true);
        $this->setX(-75);
        $this->setFont('Arial', '', 8);
        $this->cell(50, 15, '', 0, 2, 'R', false);
        $this->setY(10);
        $this->setX(-25 - $this->GetStringWidth("N° SIRET : 87854236400012"));
        $this->cell($this->GetStringWidth("N° SIRET : 87854236400012"), 5, "shiatsu.lucile@gmail.com", 0, 2, 'R', false);
        $this->cell($this->GetStringWidth("N° SIRET : 87854236400012"), 5, "06.98.16.43.83", 0, 2, 'R', false);
        $this->SetFillColor(197, 233, 223);
        $this->cell($this->GetStringWidth("N° SIRET : 87854236400012"), 5, $this->decodeUTF8("N° SIRET : 87854236400012"), 0, 1, 'R', true);
        $this->ln(10);
    }

    public function sizeCellsTab(): array
    {
        $sizeAvailable = 210 - 50 - $this->sizeDefaultTabInfos - 5;
        if ($sizeAvailable - $this->maxStringSizeTabInfosHorse() >= 0) {
            return ["sizeTabInfos" => $this->sizeDefaultTabInfos, "sizeTabHorseInfos" => $sizeAvailable];
        } else {
            $sizeAvailableForInfos = 210 - (2 * 25) - 5 - $this->maxStringSizeTabInfosHorse();

            return ["sizeTabInfos" => $sizeAvailableForInfos, "sizeTabHorseInfos" => $this->maxStringSizeTabInfosHorse()];
        };
    }

    public function tabInfos()
    {
        $datasSizeTab = $this->sizeCellsTab();
        $arrayInfo = $this->createArrayForTabWithInfos();

        $this->setY(35);
        $this->SetFillColor(241, 241, 241);
        $this->SetLineWidth(0.1);
        $this->cell($datasSizeTab['sizeTabInfos'], 40, '', 1, 1, '', true);
        $this->setY(37);

        foreach ($arrayInfo as $key => $value) {
            $this->setX(27);
            $this->SetFont('Arial', 'BU', 8);
            $this->cell($this->GetStringWidth($this->decodeUTF8($key)), 5, $this->decodeUTF8($key), 0, 0, '', false);
            $this->SetFont('Arial', '', 8);
            $this->cell($this->GetStringWidth($this->decodeUTF8($value)), 5, $this->decodeUTF8(' : ' . $value), 0, $key !== self::OWNER ? 1 : 2, '', false);
            $key !== self::OWNER && $this->ln(5);
        }
        $this->ln(10);
    }

    public function tabInfoHorse()
    {

        $sizeTabhorseInfos = $this->sizeCellsTab();
        $arrayInfo = $this->createArrayForTabHorseInfos();
        $xContainer = 25 + $sizeTabhorseInfos['sizeTabInfos'] + 5;

        $this->setY(35);
        $this->setX($xContainer);
        $this->SetFillColor(241, 241, 241);
        $this->SetLineWidth(0.1);
        $this->cell($sizeTabhorseInfos['sizeTabHorseInfos'], 40, '', 1, 1, '', true);
        $this->setY(37);
        foreach ($arrayInfo as $key => $value) {
            $this->setX($xContainer + 2);
            $this->SetFont('Arial', 'BU', 8);
            $this->cell($this->GetStringWidth($key), 5, $key, 0, 0, '', false);
            $this->SetFont('Arial', '', 8);
            $this->cell($this->GetStringWidth($value), 5, ' : ' . $this->decodeUTF8($value), 0, 1, '', false);
            $key !== self::ACTIVITIES && $this->ln(5);
        }
        $this->ln(10);
    }

    public function maxStringSizeTabInfosHorse(): int
    {

        $horse = "cheval : " . $this->horseInfos;
        $lifestyle = 'mode de vie :' . $this->lifestyle;
        $food = 'alimentation : ' . $this->food;
        $activities = 'discipline : ' . $this->activities;

        $array = [];
        array_push($array, $horse, $lifestyle, $food, $activities);

        usort($array, function ($firstvalue, $secondValue) {
            if (strlen($firstvalue) == strlen($secondValue)) {
                return 0;
            };
            return strlen($firstvalue) < strlen($secondValue) ? 1 : -1;
        });
        return $this->GetStringWidth($array[0]) + 6;
    }

    public function main()
    {
        $array = $this->createArrayForMain();
        $this->setX(24);
        foreach ($array as $key => $value) {
           
            if ($key == self::REASONS_FOR_SESSION) { 
                $this->setFont('Arial', 'BUI', 8);
                $this->Cell($this->GetStringWidth($this->decodeUTF8($key)), 5, $this->decodeUTF8($key), 0, 0, '', false);
                $this->setFont('Arial', '', 8);
                $this->MultiCell(0,5,' : ' . $this->decodeUTF8($value),0,'J', false);
            }
            if ($key !== self::REASONS_FOR_SESSION) {
                $this->setX(24);
                $this->setFont('Arial', 'BUI', 8);
                $this->Cell($this->GetStringWidth($this->decodeUTF8($key)), 5, $this->decodeUTF8($key), 0, 0, '', false);  
                $this->setFont('Arial', '', 8);
                $this->Cell($this->GetStringWidth(' : '), 5, ' : ', 0, 1, '', false);  
                $this->setX(35);
                $this->multicell(0, 5,$this->decodeUTF8($value), 0, 'J', false);
            }
            $this->ln(5);
        }
    }

    public function createPdf() : void
    {
        $this->AddPage();
        $this->header();
        $this->tabInfos();
        $this->tabInfoHorse();
        $this->main();
        $this->Output('F', $this->url);          
    }
}
