<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo PHP</title>
    <script src="./js/index.js"></script>
    <link rel="stylesheet" href="./style/styles.css">
    <script src="https://unpkg.com/htmx.org@2.0.4"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <style>
        .material-symbols-outlined {
          font-variation-settings:
          'FILL' 0,
          'wght' 400,
          'GRAD' 0,
          'opsz' 24
        }
    </style>
</head>
<body>
  <div class="nameDiv">
    <input type="text" placeholder="Qual seu nome?">
    <button onclick="getName()" class="btn" style="background-color: var(--mainColoridinho); color: white;">Confirmar</button>
  </div>
  <menu>
      <user>

      </user>
      <div class="menugap"></div>
      <button 
        class="clicked"
        hx-get="/htmx/index.php" 
        hx-target="main" 
        hx-swap="innerHTML"
        hx-trigger="load,click"
        hx-indicator="#spinner"
        onclick="styleClick(this)"
        >
        <i class="material-icons icon">list_alt</i>
        <p>Atividades</p>
      </button>

      <button 
        hx-get="/htmx/doneTasks.php" 
        hx-target="main" 
        hx-swap="innerHTML"
        hx-indicator="#spinner"
        onclick="styleClick(this)"
        >
        <i class="material-icons icon">delete</i>
        <p>Lixeira</p>
      </button>
  </menu>
  <main>
  </main>
</body>
</html>