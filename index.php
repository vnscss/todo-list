<?php
    $myPDO = new PDO('sqlite:./data.db');
    $result = $myPDO->query("SELECT lastname FROM employees");

    foreach($result as $row)
    {
        print $row['lastname'] . "\n";
    }
?>
