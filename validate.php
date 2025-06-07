<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo "Hello";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $clientHash = $_POST['a'] ?? '';

    try {
        $myPDO = new PDO('sqlite:./data.db');
        $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $myPDO->prepare("SELECT hash FROM hashes WHERE hash = :hash");
        $stmt->bindParam(':hash', $clientHash, PDO::PARAM_STR);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $hash = $result[0]['hash'];
    } catch (PDOException $e) {
        echo "Erro: " . $e->getMessage();
    }

    if($hash == $clientHash){
        echo 1;
    }
    else{
        echo 0;
    }
}
?>