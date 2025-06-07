<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo hash('sha256', 'a');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $clientUnix = $_POST['a'];
    $randon = $_POST['b'];
    $salt = "hadcodedsalt";

    $hash = $clientUnix . $salt . $randon . rand();
    $hash = hash('sha256', $hash);

    try {
        $myPDO = new PDO('sqlite:./data.db');
        $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $myPDO->prepare("INSERT INTO hashes (hash) VALUES (:hash)");
        $stmt->execute([
            ':hash' => $hash
        ]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
        echo "Erro" . $e->getMessage();
    }

    echo $hash;
}
?>