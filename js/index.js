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

    debounceMap.set(jsid, debounce(curl, 5000));
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
    let arr = JSON.parse(data);
    arr.forEach(element => {
        let mainDivTaks = document.getElementById("mainDivTaks");
        let checkbox ;

        if(element.done == 1){
            checkbox = `<input class="taskCheck" type="checkbox" name="" id="" checked>`;
        }
        else{
            checkbox = `<input class="taskCheck" type="checkbox" name="" id="">`;
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
        if (event.target.classList.contains('taskCheck')) return;
        colectAndUpdate(event.target.closest('#singleTask').getAttribute('jsid'));
    }
  });
}


