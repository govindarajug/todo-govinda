const deleteList = (event) => {
  const listId = event.target.parentNode.id;
  xhrPost(`/delete/${listId}`, addTODOs);
};

const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElementTree(['article', { className: 'item', id: list.id }, [
      ['a', { className: 'clickable', href: `/lists/${list.id}` }, [
        ['div', { className: 'title' }, list.title]]],
      ['span', { className: 'material-icons delete' }, 'delete']
    ]]);

    listEle.querySelector('.delete').onclick = deleteList;
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
