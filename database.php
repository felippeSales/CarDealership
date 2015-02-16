<?php

class RegularDB extends mysqli {

    // single instance of self shared among all instances
    private static $instance = null;
    // db connection config vars
    private $user = "***";
    private $pass = "***";
    private $dbName = "****";
    private $dbHost = "****";

    //This method must be static, and must return an instance of the object if the object
    //does not already exist.
    public static function getInstance() {
        if (!self::$instance instanceof self) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    // The clone and wakeup methods prevents external instantiation of copies of the Singleton class,
    // thus eliminating the possibility of duplicate objects.
    public function __clone() {
        trigger_error('Clone is not allowed.', E_USER_ERROR);
    }

    public function __wakeup() {
        trigger_error('Deserializing is not allowed.', E_USER_ERROR);
    }

    /**
     * Constructor for the RealtyDB class
     */
    private function __construct() {
        parent::__construct($this->dbHost, $this->user, $this->pass, $this->dbName);
        if (mysqli_connect_error()) {
            $errno = mysqli_connect_errno();
            $error = mysqli_connect_error();
            exit("Connect Error ({$errno}) {$error}");
        }
        parent::set_charset('utf-8');
    }

    /**
     * select data from a table exactly like that in the $whereArray
     * 
     * @param string $table name of table
     * @param string $selectString string of comma separated column names or *
     * @param array $whereArray associative array of parameters for the selection
     * 
     * @return array array of rows with the data requested or NULL if none found
     */
    public function selectFromTable($table, $selectString, $whereArray) {
//        $selectString = $this->real_escape_string($selectString);
        $whereString = $this->_whereString($whereArray);

        $selection = array();
        if (strlen($selectString) > 0) {
            $result = $this->query("SELECT {$selectString} FROM {$table} {$whereString};");

            if ($result) {
                while ($row = mysqli_fetch_array($result)) {
                    $selection[] = $row;
                }
                mysqli_free_result($result);
            }
        }
        return $selection;
    }

    /**
     * select data from a table similar to that in the $whereArray
     * 
     * @param string $table name of table
     * @param string $selectString string of comma separated column names or *
     * @param array $whereArray associative array of parameters for the selection
     * 
     * @return array array of rows with the data requested or NULL if none found
     */
    public function selectSimilarFromTable($table, $selectString, $whereArray) {
//        $selectString = $this->real_escape_string($selectString);
        $whereString = $this->_whereLikeString($whereArray);

        $selection = array();
        if (strlen($selectString) > 0) {
            $result = $this->query("SELECT {$selectString} FROM {$table} {$whereString};");

            if ($result) {
                while ($row = mysqli_fetch_array($result)) {
                    $selection[] = $row;
                }
                mysqli_free_result($result);
            }
            return $selection;
        }
        return $selection;
    }

    /**
     * update a table with new data
     * 
     * @param string $table name of table
     * @param array $setArray associative array of the columns and their new values
     * @param array $whereArray associative array of the parameters of the selection
     * 
     * @return
     */
    public function updateTable($table, $setArray, $whereArray) {
        $setString = $this->_setString($setArray);
        $whereString = $this->_whereString($whereArray);
        if (strlen($whereString) > 0 && strlen($setString) > 0) {
            $this->query("UPDATE {$table} {$setString} {$whereString};");
        }
    }

    /**
     * insert data into table
     * 
     * @param string $table name of table
     * @param array $valuesArray associative array of the columns and their values
     * 
     * @return integer
     *  id of the item inserted
     */
    public function insertIntoTable($table, $valuesArray) {
        $valuesString = $this->_valuesString($valuesArray);
//        echo "<p>{$valuesString}</p>";
        if (strlen($valuesString) > 0) {
            $this->query("INSERT INTO {$table} {$valuesString};");
            return $this->insert_id;
        }
        return false;
    }

    /**
     * delete rows from table
     * 
     * @param string $table name of table
     * @param array $whereArray associative array of parameters for the selection
     * 
     * @return
     */
    public function deleteFromTable($table, $whereArray) {
        $whereString = $this->_whereString($whereArray);
        if (strlen($whereString) > 0) {
            $this->query("DELETE FROM {$table} {$whereString};");
        }
    }

    /**
     * Creates the WHERE string of an sql query from an array
     * 
     * Accepts arrays with key => value pairs where the keys are strings and the 
     * values are numeric values, strings, or 2 member arrays
     * ["city" => "San Francisco", "zip" => 94132, "price" => [100, 200]]
     * "WHERE city='San Francisco' AND zip=94132 AND (price BETWEEN 100 AND 200)"
     * 
     * @param array $inputArray associative array of key, value pairs
     * 
     * @return string of the elements of the list added to WHERE or the empty string
     */
    private function _whereString($inputArray) {
        $whereString = "";
        foreach ($inputArray as $key => $value) {
            $key = $this->real_escape_string($key);
            if (strlen($key) > 0) {
                if (is_numeric($value)) {
                    $value = $this->real_escape_string($value);
                    $whereString .= " {$key}={$value} AND";
                } else if (is_string($value) && strlen($value) > 0) {
                    $value = $this->real_escape_string($value);
                    $whereString .= " {$key}='{$value}' AND";
                } else if (is_array($value) && count($value) == 2) {
                    $value1 = $this->real_escape_string($value[0]);
                    $value2 = $this->real_escape_string($value[1]);
                    if (is_numeric($value1) && is_numeric($value2)) {
                        $whereString .= " ({$key} BETWEEN {$value1} AND {$value2}) AND";
                    } else {
                        $whereString .= " ({$key} BETWEEN '{$value1}' AND '{$value2}') AND";
                    }
                } else if ($value === null) {
                    $whereString .= " {$key} IS NULL AND";
                }
            }
        }
        if (strlen($whereString) > 0) {
            $whereString = 'WHERE' . substr($whereString, 0, strlen($whereString) - 4);
        }
        return $whereString;
    }

    /**
     * Creates the WHERE string of an sql query from an array
     * 
     * Accepts arrays with key => value pairs where the keys are strings and the 
     * values are numeric values, strings, or 2 member arrays
     * ["city" => "San Francisco", "zip" => 94132, "price" => [100, 200]]
     * "WHERE city LIKE '%San Francisco%' AND zip=94132 AND (price BETWEEN 100 AND 200)"
     * 
     * @param array $inputArray associative array of key, value pairs
     * 
     * @return string of the elements of the list added to WHERE or the empty string
     */
    private function _whereLikeString($inputArray) {
        $whereString = "";
        foreach ($inputArray as $key => $value) {
            $key = $this->real_escape_string($key);
            if (strlen($key) > 0) {
                if (is_numeric($value)) {
                    $value = $this->real_escape_string($value);
                    $whereString .= " {$key}={$value} AND";
                } else if (is_string($value) && strlen($value) > 0) {
                    $value = $this->real_escape_string($value);
                    $whereString .= " {$key} LIKE '%{$value}%' AND";
                } else if (is_array($value) && count($value) == 2) {
                    $value1 = $this->real_escape_string($value[0]);
                    $value2 = $this->real_escape_string($value[1]);
                    if (is_numeric($value1) && is_numeric($value2)) {
                        $whereString .= " ({$key} BETWEEN {$value1} AND {$value2}) AND";
                    } else {
                        $whereString .= " ({$key} BETWEEN '{$value1}' AND '{$value2}') AND";
                    }
                } else if ($value === null) {
                    $whereString .= " {$key} IS NULL AND";
                }
            }
        }
        if (strlen($whereString) > 0) {
            $whereString = 'WHERE' . substr($whereString, 0, strlen($whereString) - 4);
        }
        return $whereString;
    }

    /**
     * creates the SET string of an sql query from an array
     * 
     * Accepts arrays with key => value pairs where the keys are strings and the 
     * values are numeric values or strings
     * ['city' => 'San Francisco', 'zip' => 94132]
     * "SET city='San Francisco', zip=94132"
     * 
     * @param array $inputArray associative array of key, value pairs
     * 
     * @return string of the elements of the list added to a SET or the empty string
     */
    private function _setString($inputArray) {
        $setString = "";
        foreach ($inputArray as $key => $value) {
            $key = $this->real_escape_string($key);
            if (strlen($key) > 0) {
                $value = $this->real_escape_string($value);
                if (is_numeric($value)) {
                    $setString .= " {$key}={$value},";
                } else if (is_string($value) && strlen($value) > 0) {
                    $setString .= " {$key}='{$value}',";
                }
            }
        }
        if (strlen($setString) > 0) {
            $setString = 'SET' . substr($setString, 0, strlen($setString) - 1);
        }
        return $setString;
    }

    /**
     * creates the VALUES string of an sql query from an array
     * 
     * Accepts arrays with key => value pairs where the keys are strings and the 
     * values are numeric values or strings
     * ["city" => "San Francisco", "zip" => 94132]
     * "(city zip) VALUES ('San Francisco','94132')"
     * 
     * @param array $inputArray associative array of key, value pairs
     * 
     * @return string of the elements of the list added to a VALUES or the empty string
     */
    private function _valuesString($inputArray) {
        $keyString = "";
        $valueString = "";
        $valuesString = "";
        foreach ($inputArray as $key => $value) {
            $key = $this->real_escape_string($key);
            $value = $this->real_escape_string($value);
            if (strlen($key) > 0 && strlen($value) > 0) {
                $keyString .= "{$key}, ";
                $valueString .= "'{$value}',";
            }
        }
        if (strlen($keyString) > 0 && strlen($valueString) > 0) {
            $keyString = substr($keyString, 0, strlen($keyString) - 2);
            $valueString = substr($valueString, 0, strlen($valueString) - 1);
            $valuesString = "({$keyString}) VALUES ({$valueString})";
        }
        return $valuesString;
    }

}
