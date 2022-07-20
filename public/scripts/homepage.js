const createElement = ([tag, className = '', text = '']) => {
  const element = document.createElement(tag);
  element.className = className;
  if (Array.isArray(text)) {
    element.appendChild(createElement(text));
    return element;
  }
  element.innerText = text;
  return element;
};

const addNewTODO = () => {
  const newToDo = document.querySelector('.newToDo');
  const article = document.createElement('article');
  article.className = 'todoList';
  newToDo.after(article);
  return;
};

const createItems = (items) => {
  const itemsElement = createElement(['div', 'items']);
  items.forEach(item => {
    itemsElement.appendChild(createElement(['div', '', item.description]));
  });
  return itemsElement;
};

const drawList = (list, listContainer) => {
  const listEle = document.createElement('article');
  listEle.className = 'todoList';
  listEle.appendChild(createElement(['div', 'title', list.title]));

  listEle.appendChild(createItems(list.items));
  listContainer.appendChild(listEle);
  return;
};

const addTODOs = (xhr) => {
  const container = document.querySelector('.listContainer');
  const userToDo = JSON.parse(xhr.response);
  userToDo.lists.forEach(list => {
    drawList(list, container);
  });
};

const main = () => {
  const addTODOElement = document.querySelector('.newToDo');
  addTODOElement.addEventListener('click', addNewTODO);
  xhrGet('/api/to-do', addTODOs);
};

window.onload = main;
