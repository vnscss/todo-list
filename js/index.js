const baseUrl = window.location.origin

function saveUser(string){
    localStorage.setItem("user", string);
}


const debounceMap = new Map();

function debounce(fn, delay) {
  let timeoutId;

  return function(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function colectAndUpdate(jsid) {
  if (!debounceMap.has(jsid)) {
    // Cria e armazena o debounce apenas uma vez por jsid
    const curl = () => {
      const target = document.querySelector(`[jsid="${jsid}"]`);

      const task = JSON.stringify({
        name: target.querySelector(".taskH1").innerHTML,
        descricao: target.querySelector(".taskDesc").innerHTML,
        data: target.querySelector(".taskDate").value,
        id: target.getAttribute('jsid')
      });

      const formData = new URLSearchParams();
      formData.append('a', 2);
      formData.append('b', localStorage.getItem("hash"));
      formData.append('c', task);

      fetch(`${baseUrl}/crud.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
      .then(response => response.text())
      .then(data => {
        console.log("update...");
      })
      .catch(error => {
        alert("Algo deu errado...");
        window.location.reload();
      });
    };

    debounceMap.set(jsid, debounce(curl, 2000));
  }

  // Usa o debounce correspondente ao jsid
  debounceMap.get(jsid)();
}


if(localStorage.getItem("hash") === null){

    const formData = new URLSearchParams();
    formData.append('a', Date.now());
    formData.append('b', Math.random());



    fetch(`${baseUrl}/handshake.php`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
    })
    .then(response => response.text())
    .then(data => {
        localStorage.setItem("hash", data);
    })
    .catch(error => {
        alert("Algo deu errado... ")
        window.location.reload();
    });

}
else{
    const validate = new URLSearchParams();
    validate.append('a', localStorage.getItem("hash"));


    fetch(`${baseUrl}/validate.php`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: validate.toString()
    })
    .then(response => response.text())
    .then(data => {
        if(data == 0){
            localStorage.removeItem("hash");
            alert("Hash inválido");
            window.location.reload();
        }
    })
    .catch(error => {
        alert("Algo deu errado... ")
        window.location.reload();
    });
}


function getAllTasks(){
let getAllTasksObjt = new URLSearchParams();
getAllTasksObjt.append('a', localStorage.getItem("hash"));

fetch(`${baseUrl}/getAllTasks.php`, {
method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
},
body: getAllTasksObjt.toString()
})
.then(response => response.text())
.then(data => {
    let mainDivTaks = document.getElementById("mainDivTaks");
    mainDivTaks.innerHTML = ""
    let arr = JSON.parse(data);
    arr.forEach(element => {
        let mainDivTaks = document.getElementById("mainDivTaks");
        let checkbox ;

        if(element.done == 1){
            checkbox = `<input onchange="playSound()" class="taskCheck" type="checkbox" name="" id="" checked>`;
        }
        else{
            checkbox = `<input onchange="playSound()" class="taskCheck" type="checkbox" name="" id="">`;
        }
        
        let htmlString = `
        <div id="singleTask" jsid="${element.id}" class="taksContainer">

            <h1 contenteditable="true" class="taskH1">${element.name}</h1>
            <div class="taskDesc" contenteditable="true">${element.descricao}</div>
            ${checkbox}
            <input class="taskDate" type="datetime-local" name="" id="" value="${element.data}">

        </div>`

        mainDivTaks.innerHTML += htmlString;
    });

    listen();
})
.catch(error => {
      alert(error)
      window.location.reload();
});
}




function getDoneTasks(){
let getAllTasksObjt = new URLSearchParams();
getAllTasksObjt.append('a', localStorage.getItem("hash"));

fetch(`${baseUrl}/doneTasks.php`, {
method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
},
body: getAllTasksObjt.toString()
})
.then(response => response.text())
.then(data => {
    let mainDivTaks = document.getElementById("mainDivTaks");
    mainDivTaks.innerHTML = ""
    let arr = JSON.parse(data);
    arr.forEach(element => {
        let mainDivTaks = document.getElementById("mainDivTaks");
        let checkbox ;

        if(element.done == 1){
            checkbox = `<input class="taskCheck" type="checkbox" name="" id="" checked disabled>`;
        }
        else{
            checkbox = `<input class="taskCheck" type="checkbox" name="" id="" disabled>`;
        }
        
        let htmlString = `
        <div id="singleTask" jsid="${element.id}" class="taksContainer">

            <h1 contenteditable="false" class="taskH1">${element.name}</h1>
            <div class="taskDesc" contenteditable="false">${element.descricao}</div>
            ${checkbox}
            <input class="taskDate" type="datetime-local" name="" id="" value="${element.data}" disabled>

        </div>`

        mainDivTaks.innerHTML += htmlString;
    });

    listen();
})
.catch(error => {
      alert(error)
      window.location.reload();
});

}

function listen(){
  const targetNode = document.getElementById('mainDivTaks');

  const config = {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  };

const callback = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    let target = mutation.target;

    // Se for um nó de texto, sobe para o elemento pai
    if (target.nodeType === Node.TEXT_NODE) {
      target = target.parentElement;
    }

    // Verifica se é um elemento válido para usar .closest()
    if (target instanceof Element) {
      const container = target.closest('#singleTask');
      const jsid = container?.getAttribute('jsid');

      if (jsid) {
        colectAndUpdate(jsid);
      }
    }
  }
};


  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);

  targetNode.addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT') {
        if (event.target.classList.contains('taskCheck')){
            
                let id = JSON.stringify({
                    id: event.target.closest('#singleTask').getAttribute('jsid')
                });

                const formData = new URLSearchParams();
                formData.append('a', 4);
                formData.append('b', localStorage.getItem("hash"));
                formData.append('c', id);

                    fetch(`${baseUrl}/crud.php`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                })
                .then(response => response.text())
                .then(data => {
                    console.log("marcando como done...");
                    getAllTasks();
                })
                .catch(error => {
                    alert("Algo deu errado...");
                    window.location.reload();
                });
                return
        };
        colectAndUpdate(event.target.closest('#singleTask').getAttribute('jsid'));
    }
  });
}



function addTask(){
    let addTaskDiv = document.getElementById("addTask");

    let name = addTaskDiv.querySelector(".taskH1").innerHTML
    let descricao = addTaskDiv.querySelector(".taskDesc").innerHTML
    let data = addTaskDiv.querySelector(".taskDate").value


    if( !(data === "") && !(name === "") && !(descricao === "")){

        let task = JSON.stringify({
        name: name,
        descricao: descricao,
        data: data
        });


        let formData = new URLSearchParams();
        formData.append('a', 1);
        formData.append('b', localStorage.getItem("hash"));
        formData.append('c', task);

        fetch(`${baseUrl}/crud.php`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
        .then(response => response.text())
        .then(data => {
            console.log("create...");
        })
        .catch(error => {
            alert("Algo deu errado...");
            window.location.reload();
        });

        getAllTasks();
        addTaskDiv.querySelector(".taskH1").innerHTML = ""
        addTaskDiv.querySelector(".taskDesc").innerHTML = ""
        addTaskDiv.querySelector(".taskDate").value = ""

    }
    else{
        alert("Preencha todos os dados")
    }
}

function cancelarTask(){
    let addTaskDiv = document.getElementById("addTask");
    addTaskDiv.querySelector(".taskH1").innerHTML = ""
    addTaskDiv.querySelector(".taskDesc").innerHTML = ""
    addTaskDiv.querySelector(".taskDate").value = ""
}


function styleClick(button){
  buttons = document.querySelectorAll("menu button")

  buttons.forEach(element => {
    element.classList.remove("clicked");
  });

  button.classList.add("clicked")
}

function playSound() {
  const audio = new Audio('audio/bubble.mp3');
  audio.play();
}