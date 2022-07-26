const onEnter = (event) => {
  const itemId = event.target.parentNode.id;
  const listId = document.getElementById(itemId).parentNode.parentNode.id;
  if (event.key === 'Enter') {
    event.preventDefault();
    const listEle = document.getElementById(itemId);
    const newDesc = listEle.childNodes[0].value;
    xhrPost(`/edit/${listId}/${itemId}`, updateScreen, '', `newDesc=${newDesc}`);
  };
};

const drawInput = (event) => {
  const listId = event.target.parentNode.parentNode.id;
  const listEle = document.getElementById(listId);
  const itemEle = listEle.childNodes[0];
  const inputEle = createElementTree(['input',
    { type: 'text', id: 'edit', name: 'newDesc', value: itemEle.childNodes[1].innerText }, '']);
  itemEle.replaceWith(inputEle);
  inputEle.focus();
  inputEle.onkeydown = onEnter;
};

const createItems = (items) => {
  const itemsElement = createElementTree(['div', { className: 'items' }, []]);
  items.forEach(item => {
    const itemEle = createElementTree(
      ['div', { id: item.id, className: 'item' }, [['div', {}, [
        ['input', { type: 'checkbox', checked: item.done, className: 'itemStatus' }, ''],
        ['label', { for: item.description }, item.description]]], [
        'div', { className: 'icons' }, [
          ['span', { className: 'material-icons edit' }, 'edit'],
          ['span', { className: 'material-icons delete' }, 'delete']
        ],
      ]
      ]]);
    itemEle.querySelector('.delete').onclick = deleteItem;
    itemEle.querySelector('.itemStatus').onclick = markItem;
    itemEle.querySelector('.edit').onclick = drawInput;
    itemsElement.appendChild(itemEle);
  });
  return itemsElement;
};

const drawList = (list, listContainer, task) => {
  if (list.title) {
    const listEle = createElementTree(
      ['article', { className: 'todoList view', id: list.id }, []]);
    listEle.appendChild(createElementTree(
      ['h2', { className: 'title' }, list.title]));
    if (list.items) {
      listEle.appendChild(createItems(list.items));
    }
    listEle.appendChild(createElementTree(
      ['form', { className: 'addItem' },
        [['input', { type: 'text', name: 'newItem', id: 'newItem', placeholder: 'Add item', required: 'required' }, '']
        ]]));
    listContainer[task](listEle);
  }
  return;
};

const markItem = (event) => {
  const itemId = event.target.parentElement.id;
  const listId = event.target.parentNode.parentNode.parentNode.id;
  xhrPost(`/mark/${listId}/${itemId}`, updateScreen);
};

const deleteItem = (event) => {
  console.log(event.target);
  const itemId = event.target.parentNode.parentNode.id;
  const listId = document.getElementById(itemId).parentNode.parentNode.id;
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