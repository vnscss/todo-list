<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo "Hello";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
# type = 1 -> create
# type = 2 -> update
# type = 3 -> delete
# type = 4 -> mark as done

    $type = $_POST['a'];
    $clientHash = $_POST['b'] ?? '';
    $task = $_POST['c'];

    $data = json_decode($task, true); // true para array associativo
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "JSON inválido.";
        exit;
    }

    $id = $data['id'];
    $name = $data['name'];
    $descricao = $data['descricao'] ?? null;
    $dataUnix = $data['data'];


    switch ($type) {
        case 1:
            try {
                $myPDO = new PDO('sqlite:./data.db');
                $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $stmt = $myPDO->prepare("INSERT INTO tarefas (name, descricao, done, data, user) VALUES (:name, :descricao, 0, :data, :user)");
                $stmt->execute([
                    ':name' => $name,
                    ':descricao' => $descricao,
                    ':data' => $dataUnix,
                    ':user' => $clientHash
                ]);

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);

            } catch (PDOException $e) {
                echo "Erro: " . $e->getMessage();
            }
            break;

        case 2:
            try {
                $myPDO = new PDO('sqlite:./data.db');
                $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $stmt = $myPDO->prepare(" UPDATE tarefas SET name = :name, descricao = :descricao, data = :data WHERE id = :id AND user = :user");
                $stmt->execute([
                    ':name' => $name,
                    ':descricao' => $descricao,
                    ':data' => $dataUnix,
                    ':id' => $id,
                    ':user' => $clientHash
                ]);

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);

            } catch (PDOException $e) {
                echo "Erro: " . $e->getMessage();
            }
            break;

        case 3:
            try {
                $myPDO = new PDO('sqlite:./data.db');
                $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


                $stmt = $myPDO->prepare("DELETE FROM tarefas WHERE id = :id AND user = :user");
                $stmt->execute([
                    ':id' => $id,
                    ':user' => $clientHash
                ]);

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);

            } catch (PDOException $e) {
                echo "Erro: " . $e->getMessage();
            }
            break;

        case 4:
            try {
                $myPDO = new PDO('sqlite:./data.db');
                $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


                $stmt = $myPDO->prepare("UPDATE tarefas SET done = 1 WHERE id = :id AND user = :user");
                $stmt->execute([
                    ':id' => $id,
                    ':user' => $clientHash
                ]);

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);

            } catch (PDOException $e) {
                echo "Erro: " . $e->getMessage();
            }
            break;

        default:
            echo "error";
            break;
    }
}
?>