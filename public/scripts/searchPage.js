const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElementTree(['article',
      { className: 'item', id: list.id }, [
        ['a', { className: 'clickable', href: `/lists/${list.id}` }, [
          ['div', { className: 'title' }, list.title]]], [
          'div', { className: 'icons' }, [
          ]
        ]
      ]]);

    listContainer.appendChild(listEle);
  };
  return;
};

const addTODOs = (lists) => {
  const container = document.querySelector('.listContainer');
  lists.forEach(list => {
    drawList(list, container);
  });
  return;
};

const filterList = (todo, query) => {
  const matches = todo.lists.filter((list) =>
    list.title.includes(query));
  if (matches.length) {
    addTODOs(matches);
    return;
  }
  const searchError = createElementTree(['h3', {}, 'no search results found']);
  document.querySelector('.listContainer').replaceChildren(searchError);
};

const main = () => {
  const url = new URL(document.location.href);
  const query = url.searchParams.get('query');

  xhrGet('/api/to-do', (todo) => filterList(JSON.parse(todo), query));
};

window.onload = main;
