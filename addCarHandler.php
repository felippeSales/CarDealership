<?php

require_once 'database.php';

$database = RegularDB::getInstance();

$year = $_POST['new-car-year'];
$name = $_POST['new-car-name'];
$mileage = $_POST['new-car-mileage'];
$speed = $_POST['new-car-max-speed'];
$desc = $_POST['new-car-desc'];
$sold = $_POST['new-car-sold'];

$columnsValues = array("model_name" => $name, "year_built" => $year, "mileage" => $mileage, "max_speed" => $speed
    , "description" => $desc, "sold_date" => $sold);

$database->insertIntoTable("car", $columnsValues);

