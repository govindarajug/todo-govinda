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

const redrawScreen = () => {
  xhrGet('/', (x) => { });
};

const addNewTODO = () => {
  xhrPost('/addList', null, null, getFormData('.newTODO'));
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
  if (list.title) {
    const listEle = document.createElement('article');
    listEle.className = 'todoList';
    listEle.appendChild(createElement(['div', 'title', list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    listContainer.appendChild(listEle);
  }
  return;
};

const addTODOs = (xhr) => {
  const container = document.querySelector('.listContainer');
  const userToDo = JSON.parse(xhr.response);
  userToDo.lists.forEach(list => {
    drawList(list, container);
  });
  return;
};

const main = () => {
  const addTODOElement = document.querySelector('#save');
  addTODOElement.addEventListener('click', addNewTODO);
  xhrGet('/api/to-do', addTODOs);
  return;
};

window.onload = main;
