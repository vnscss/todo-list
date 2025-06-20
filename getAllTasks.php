<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo "Hello";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $clientHash = $_POST['a'] ?? '';

    try {
        $myPDO = new PDO('sqlite:./data.db');
        $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $myPDO->prepare("SELECT id ,name, descricao, done, data FROM tarefas WHERE user = :userHash  AND done = 0 ORDER BY data ASC;");
        $stmt->bindParam(':userHash', $clientHash, PDO::PARAM_STR);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);

    } catch (PDOException $e) {
        echo "Erro ao consultar: " . $e->getMessage();
    }
}
?>