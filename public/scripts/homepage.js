const deleteList = (event) => {
  const listId = event.target.parentNode.parentNode.id;
  xhrPost(`/delete/${listId}`, addTODOs);
};

const checkKey = (event) => {
  const listId = event.target.parentNode.id;
  if (event.key === 'Enter') {
    event.preventDefault();
    const listEle = document.getElementById(listId);
    const newTitle = listEle.firstChild.value;
    xhrPost(`/edit/${listId}`, addTODOs, '', `newTitle=${newTitle}`);
  };
};

const drawInput = (event) => {
  const listId = event.target.parentNode.parentNode.id;
  const listEle = document.getElementById(listId);
  const inputEle = createElementTree(['input',
    { type: 'text', id: 'edit', name: 'newTitle', value: listEle.firstChild.innerText }, '']);
  listEle.firstChild.replaceWith(inputEle);
  inputEle.focus();
  inputEle.onkeydown = checkKey;
};

const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElementTree(['article',
      { className: 'item', id: list.id }, [
        ['a', { className: 'clickable', href: `/lists/${list.id}` }, [
          ['div', { className: 'title' }, list.title]]], [
          'div', { className: 'icons' }, [
            ['span', { className: 'material-icons edit' }, 'edit'],
            ['span', { className: 'material-icons delete' }, 'delete']
          ]
        ]
      ]]);

    listEle.querySelector('.delete').onclick = deleteList;
    listEle.querySelector('.edit').onclick = drawInput;
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
