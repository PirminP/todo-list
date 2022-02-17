//5 Adicione um botão com id="criar-tarefa" e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
//6 Ordene os itens da lista de tarefas por ordem de criação
let itemButton = document.querySelector('#criar-tarefa');
let itemInput = document.querySelector('#texto-tarefa');
let itemList = document.querySelector('#lista-tarefas');
let deleteAllButton = document.querySelector('#apaga-tudo'); //10
let deleteButton = document.querySelector('#remover-finalizados') //11
let saveButton = document.querySelector('#salvar-tarefas'); //12

window.onload = function() { //12
  loadItemList()             //12
}                            //12

itemButton.addEventListener('click', addItem);
deleteAllButton.addEventListener('click', deleteList); //10
deleteButton.addEventListener('click', deleteFinishedItem); //11
saveButton.addEventListener('click', saveList); //12

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
  } //8
  element.style.background = 'gray';
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
  if (element.className === 'completed' || compStyle === 'line-through solid black') {
    element.className = '';
  }
  else {element.className = 'completed';
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
    if (item.className === 'completed') {
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
