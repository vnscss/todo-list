<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo PHP</title>
    <script src="./js/index.js"></script>
    <link rel="stylesheet" href="./style/styles.css">
    <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
<body>
  <menu>
      <button 
        hx-get="/htmx/index.php" 
        hx-target="main" 
        hx-swap="innerHTML"
        hx-trigger="load,click"
        >
        Tarefas
      </button>

      <button 
        hx-get="/htmx/doneTasks.php" 
        hx-target="main" 
        hx-swap="innerHTML"
        >
        Lixeira
      </button>
  </menu>

  <main>

  </main>
</body>
</html>