const deleteList = (event) => {
  const listId = event.target.parentNode.parentNode.id;
  xhrPost(`/delete/${listId}`, drawResponse);
};

const checkKey = (event) => {
  const listId = event.target.parentNode.id;
  if (event.key === 'Enter') {
    event.preventDefault();
    const listEle = document.getElementById(listId);
    const newTitle = listEle.firstChild.value;
    xhrPost(`/edit/${listId}`, drawResponse, '', `newTitle=${newTitle}`);
  };
};

const drawInput = (event) => {
  const listId = event.target.parentNode.parentNode.id;
  const listEle = document.getElementById(listId);
  const inputEle = createElementTree(['input',
    { type: 'text', id: 'edit', name: 'newTitle', value: listEle.firstChild.firstChild.innerText }, '']);
  listEle.firstChild.replaceWith(inputEle);
  inputEle.focus();
  inputEle.onkeydown = checkKey;
};

const main = () => {
  xhrGet('/api/to-do', drawResponse);
};

window.onload = main;
