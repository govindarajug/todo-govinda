const createElement = ([tag, className = '', text = '', id = '']) => {
  const element = document.createElement(tag);
  element.className = className;
  if (id) {
    element.id = id;
  }
  if (Array.isArray(text)) {
    element.appendChild(createElement(text));
    return element;
  }
  element.innerText = text;
  return element;
};

const createItems = (items) => {
  const itemsElement = createElement(['div', 'items']);
  items.forEach(item => {
    itemsElement.appendChild(createElement(['div', '', item.description, item.id]));
  });
  return itemsElement;
};

const deleteList = (event) => {
  const listId = event.target.id;
  xhrPost(`/delete/${listId}`, addTODOs);
};

const drawListView = (response) => {
  const list = JSON.parse(response);
  const container = document.querySelector('.listContainer');
  if (list.title) {
    const listEle = createElement(['article', 'todoList', '', list.id]);
    const deleteListEle = createElement(['div', 'deleteList', 'X', list.id]);
    deleteListEle.onclick = deleteList;
    listEle.appendChild(deleteListEle);
    listEle.onclick = viewList;
    listEle.appendChild(createElement(['div', 'title', list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    const backButton = createElement(['a', '', 'back']);
    backButton['href'] = '/';
    container.replaceChildren(listEle, backButton);
  };
};

const viewList = (event) => {
  const listId = event.target.id;
  xhrGet(`/api/to-do/lists/${listId}`, drawListView);
};

const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElement(['article', 'todoList', '', list.id]);
    const deleteListEle = createElement(['div', 'deleteList', 'X', list.id]);
    deleteListEle.onclick = deleteList;
    listEle.appendChild(deleteListEle);
    listEle.onclick = viewList;
    listEle.appendChild(createElement(['div', 'title', list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    listContainer.appendChild(listEle);
  }
  return;
};

const addTODOs = (response) => {
  const container = document.querySelector('.listContainer');
  const newToDo = document.querySelector('.newTODO');
  container.replaceChildren(newToDo);
  const userToDo = JSON.parse(response);
  userToDo.lists.forEach(list => {
    drawList(list, container);
  });
  return;
};

const main = () => {
  xhrGet('/api/to-do', addTODOs);
  return;
};

window.onload = main;
