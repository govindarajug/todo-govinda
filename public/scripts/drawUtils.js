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

const addTODOs = (lists) => {
  const container = document.querySelector('.listContainer');
  const newToDo = document.querySelector('.newTODO');
  container.replaceChildren(newToDo);
  lists.forEach(list => {
    drawList(list, container);
  });
  return;
};

const drawResponse = (response) => {
  const userToDo = JSON.parse(response);
  addTODOs(userToDo.lists);
};
