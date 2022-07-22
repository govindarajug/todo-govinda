const createItems = (items) => {
  const itemsElement = createElementTree(['div', { className: 'items' }, []]);
  items.forEach(item => {
    const itemEle = createElementTree(
      ['div', { id: item.id, className: 'item' }, [
        ['input', { type: 'checkbox', checked: item.done }, ''],
        ['label', { for: item.description }, item.description],
        ['div', { className: 'deleteItem' }, 'X']]
      ]);
    itemEle.querySelector('.deleteItem').onclick = deleteItem;
    itemsElement.appendChild(itemEle);
  });
  return itemsElement;
};

const drawList = (list, listContainer, task) => {
  if (list.title) {
    const listEle = createElementTree(
      ['article', { className: 'todoList', id: list.id }, []]);
    listEle.appendChild(createElementTree(
      ['div', { className: 'title' }, list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    listEle.appendChild(createElementTree(
      ['form', { className: 'addItem' },
        [['div', {}, [
          ['label', { for: 'newItem' }, ''],
          ['input', { type: 'text', name: 'newItem', id: 'newItem', placeholder: 'Add item' }, '']
        ]]]]));
    listContainer[task](listEle);
  }
  return;
};

const deleteItem = (event) => {
  const itemId = event.target.parentElement.id;
  const listId = event.target.parentNode.parentNode.parentNode.id;
  xhrPost(`/delete/${listId}/${itemId}`, updateScreen);
};

const checkKey = (event) => {
  const url = new URL(document.location.href).pathname;
  if (event.key === 'Enter') {
    event.preventDefault();
    xhrPost(`${url}/addItem`, updateScreen, '', getFormData('form'));
  };
};

const updateScreen = () => {
  const container = document.querySelector('.listContainer');
  const url = new URL(document.location.href).pathname;
  xhrGet(`/api/to-do${url}`, (list) => {
    drawList(JSON.parse(list), container, 'replaceChildren');
    document.querySelector('#newItem').onkeydown = checkKey;
  });
};

const main = () => {
  const container = document.querySelector('.listContainer');
  const url = new URL(document.location.href).pathname;

  xhrGet(`/api/to-do${url}`, (list) => {
    drawList(JSON.parse(list), container, 'appendChild');
    document.querySelector('#newItem').onkeydown = checkKey;
  });
};

window.onload = main;