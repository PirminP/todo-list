//5 Adicione um botão com id="criar-tarefa" e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
//6 Ordene os itens da lista de tarefas por ordem de criação
let itemButton = document.querySelector('#criar-tarefa');
let itemInput = document.querySelector('#texto-tarefa');
let itemList = document.querySelector('#lista-tarefas');
let deleteAllButton = document.querySelector('#apaga-tudo'); //10
let deleteButton = document.querySelector('#remover-finalizados') //11
let saveButton = document.querySelector('#salvar-tarefas'); //12
let upButton = document.querySelector('#mover-cima'); //13
let downButton = document.querySelector('#mover-baixo'); //13
let deleteSelectedButton = document.querySelector('#remover-selecionado') //14

window.onload = function() { //12
  loadItemList()             //12
}                            //12

itemButton.addEventListener('click', addItem);
deleteAllButton.addEventListener('click', deleteList); //10
deleteButton.addEventListener('click', deleteFinishedItem); //11
saveButton.addEventListener('click', saveList); //12
upButton.addEventListener('click', moveUp); //13
downButton.addEventListener('click', moveDown); //13
deleteSelectedButton.addEventListener('click', removeSelected); //14

function addItem() {
  let list = document.createElement('li');
  list.innerHTML = itemInput.value;
  itemList.appendChild(list);
  itemInput.value = '';
  addClick(list); //7
  addDbClick(list); //9
}

//7 Clicar em um item da lista deve alterar a cor de fundo do item para cinza
function addClick(element) {
  element.addEventListener('click', function() {
    addColor(element);
  })
}

function addColor(element) {
  let taskItems = document.querySelectorAll('ol li');
  for (let setCol of taskItems) { //8
    setCol.style.background = 'darkgray' //8
    setCol.classList.remove('selected') //13
  } //8
  element.style.background = 'gray';
  element.classList.add('selected'); //13
}

//8 Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo

//9 Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completo. Deve ser possível desfazer essa ação clicando novamente duas vezes no item
function addDbClick(element) {
  element.addEventListener('dblclick', function() {
    addLineThrough(element);
  })
}

function addLineThrough(element) {
  let compStyle = window.getComputedStyle(element).textDecoration;
  if (element.classList.contains('completed') || compStyle === 'line-through solid black') {
    element.classList.remove('completed');
  }
  else {element.classList.add('completed');
  }
}

//10
function deleteList() {
  let taskItems = document.querySelectorAll('ol li');
  for (let allItems of taskItems) {
    allItems.remove();
  }
}

//11
function deleteFinishedItem () {
  let taskItems = document.querySelectorAll('ol li');
  for (let item of taskItems) {
    if (item.classList.contains('completed')) {
      item.remove();
    }
  }
}

//12
function saveList () {
  let listText = [];
  let listClass = [];
  let taskItems = document.querySelectorAll('ol li');
  for (let item of taskItems) {
    listText.push(item.innerText);
    listClass.push(item.className);
  }
  localStorage.setItem('savedList', JSON.stringify(listText));
  localStorage.setItem('savedClass', JSON.stringify(listClass));
}
function loadItemList () {
  if (localStorage.getItem('savedList') == null) {
    return
  } else {
    let listText = JSON.parse(localStorage.getItem('savedList'));
    let listClass = JSON.parse(localStorage.getItem('savedClass'));
    for (let i = 0; i < listText.length; i += 1) {
      let list = document.createElement('li');
      list.innerText = listText[i];
      list.className = listClass[i];
      itemList.appendChild(list);
      addClick(list);
      addDbClick(list);
    }
  }
}

//13
function moveUp() {
  let taskItems = document.querySelectorAll("ol li")
  let position = 0;
  let textUp = '';
  let classUp = '';
  let styleUp = '';
  if (taskItems.length <= 1 || taskItems[0].classList.contains("selected")){
    return;
  }
  else {
    for (let i = 0; i < taskItems.length; i += 1){
      if (taskItems[i].classList.contains("selected")){
        textUp = taskItems[i].innerHTML;
        classUp = taskItems[i].className;
        styleUp = taskItems[i].style.background;
        position = i;
      }
    }
    
    if (textUp == ''){
      return;
      }
    else {
      taskItems[position].innerHTML = taskItems[position-1].innerHTML;
      taskItems[position].className = taskItems[position-1].className;
      taskItems[position].style.background = taskItems[position-1].style.background;
      taskItems[position-1].innerHTML = textUp;
      taskItems[position-1].className = classUp;
      taskItems[position-1].style.background = styleUp;
      }
    }
}
function moveDown() {
  let taskItems = document.querySelectorAll("ol li");
  let position = 0;
  let textDown = '';
  let classDown = '';
  let styleDown = '';
  if (taskItems.length <= 1 || taskItems[taskItems.length-1].classList.contains("selected")){
    return;
  }
  else {
    for (let i = 0; i < taskItems.length; i += 1){
      if (taskItems[i].classList.contains("selected")){
        textDown = taskItems[i].innerHTML;
        classDown = taskItems[i].className;
        styleDown = taskItems[i].style.background;
        position = i;
      }
    }
    if (textDown == ''){
      return;
    }
    else {
      taskItems[position].innerHTML = taskItems[position+1].innerHTML;
      taskItems[position].className = taskItems[position+1].className;
      taskItems[position].style.background = taskItems[position+1].style.background;
      taskItems[position+1].innerHTML = textDown;
      taskItems[position+1].className = classDown;
      taskItems[position+1].style.background = styleDown;
    }
  }
}

//14
function removeSelected(){
  let taskItems = document.querySelectorAll('ol li');
  for (let item of taskItems) {
    if (item.classList.contains ('selected')) {
      item.remove();
    }
  }
}



