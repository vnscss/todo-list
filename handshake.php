<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo hash('sha256', 'a');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $clientUnix = $_POST['a'];
    $randon = $_POST['b'];
    $salt = "hadcodedsalt";

    $hash = $clientUnix . $salt . $randon . rand();
    echo hash('sha256', $hash);
}
?>