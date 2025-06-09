<div id="mainDivTaks" class="tasks">
</div>

<div id="addTask" class="taksContainer">

    <h1 contenteditable="true" class="taskH1" data-placeholder="Nome da atividade"></h1>
    <div class="taskDesc" contenteditable="true" data-placeholder="Descrição"></div>
    <input class="taskDate" type="datetime-local" name="" id="" >

    <button onclick="cancelarTask()" class="btn btn-danger">Cancelar</button>
    <button onclick="addTask()" class="btn" style="background-color: var(--mainColoridinho); color: white;">Adicionar Tarefa</button>
</div>


<script>
    getAllTasks();
</script>