<div id="mainDivTaks" class="tasks">
</div>

<div id="addTask" class="taksContainer">

    <h1 contenteditable="true" class="taskH1" data-placeholder="Nome da task"></h1>
    <div class="taskDesc" contenteditable="true" data-placeholder="Descrição"></div>
    <input class="taskDate" type="datetime-local" name="" id="" >

    <button onclick="cancelarTask()">Cancelar</button>
    <button onclick="addTask()">Adicionar Tarefa</button>
</div>


<script>
    getAllTasks();
</script>