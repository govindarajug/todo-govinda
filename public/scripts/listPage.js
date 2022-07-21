const createItems = (items) => {
  const itemsElement = createElementTree(['div', { className: 'items' }, []]);
  items.forEach(item => {
    itemsElement.appendChild(createElementTree(
      ['div', { id: item.id }, [
        ['input', { type: 'checkbox', checked: item.done }, ''],
        ['label', { for: item.description }, item.description]]
      ])
    );
  });
  return itemsElement;
};

const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElementTree(['article', { className: 'todoList', id: list.id }, []]);
    listEle.appendChild(createElementTree(['div', { className: 'title' }, list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    listContainer.appendChild(listEle);
  }
  return;
};

const main = () => {
  const container = document.querySelector('.listContainer');
  const url = new URL(document.location.href).pathname;

  xhrGet(`/api/to-do${url}`, (list) => drawList(JSON.parse(list), container));
};

window.onload = main;