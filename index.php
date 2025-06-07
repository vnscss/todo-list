<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo PHP</title>
    <script src="./js/index.js"></script>
</head>
<body>
    <div id="mainDivTaks" class="tasks">
    </div>

    <div id="addTask" class="taksContainer">

        <h1 contenteditable="true" class="taskH1" data-placeholder="Nome da task"></h1>
        <div class="taskDesc" contenteditable="true" data-placeholder="Descrição"></div>
        <input class="taskDate" type="datetime-local" name="" id="" >

        <button onclick="cancelarTask()">Cancelar</button>
        <button onclick="addTask()">Adicionar Tarefa</button>
    </div>

    <style>
  [contenteditable]:empty:before {
    content: attr(data-placeholder);
    color: #aaa;
    pointer-events: none;
  }

</style>
</body>
</html>