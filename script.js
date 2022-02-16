//5 Adicione um botão com id="criar-tarefa" e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
//6 Ordene os itens da lista de tarefas por ordem de criação
let itemButton = document.querySelector('#criar-tarefa');
let itemInput = document.querySelector('#texto-tarefa');
let itemList = document.querySelector('#lista-tarefas');

itemButton.addEventListener('click', addItem);

function addItem() {
  let list = document.createElement('li');
  list.innerHTML = itemInput.value;
  itemList.appendChild(list);
  itemInput.value = '';
  addClick(list); //7
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

