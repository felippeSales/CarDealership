<?php

require_once 'database.php';

$database = RegularDB::getInstance();

function getCars(){
    return $GLOBALS['database']->selectFromTable("car", "*", array());
}

function newCar($values){
    $GLOBALS['database']->insertIntoTable("car", $values);
}