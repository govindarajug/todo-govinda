const addNewTODO = () => {
  const newToDo = document.querySelector('.newToDo');
  const article = document.createElement('article');
  article.className = 'todoList';
  newToDo.after(article);
  return;
};

const main = () => {
  const addTODOElement = document.querySelector('.newToDo');
  addTODOElement.addEventListener('click', addNewTODO);
};

window.onload = () => main();
