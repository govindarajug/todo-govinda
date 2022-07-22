const createItems = (items) => {
  const itemsElement = createElementTree(['div', { className: 'items' }, []]);
  items.forEach(item => {
    itemsElement.appendChild(createElementTree(
      ['div', { id: item.id, className: 'item' }, [
        ['div', { className: 'status' }, item.done ? '✅' : '❌'],
        ['div', {}, item.description]]
      ])
    );
  });
  return itemsElement;
};

const deleteList = (event) => {
  const listId = event.target.id;
  xhrPost(`/delete/${listId}`, addTODOs);
};

const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElementTree(['article', { className: 'todoList', id: list.id }, []]);
    const link = createElementTree(['a',
      { className: 'clickable', href: `/lists/${list.id}` }, []]);
    listEle.appendChild(link);

    const deleteListEle = createElementTree(['div',
      { className: 'deleteList', id: list.id }, 'X']);
    deleteListEle.onclick = deleteList;
    listEle.appendChild(deleteListEle);

    listEle.appendChild(createElementTree(
      ['div', { className: 'title' }, list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    listContainer.appendChild(listEle);
  };
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
};

window.onload = main;
