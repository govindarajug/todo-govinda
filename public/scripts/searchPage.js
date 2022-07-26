const drawList = (list, listContainer) => {
  if (list.title) {
    const listEle = createElementTree(['article',
      { className: 'item', id: list.id }, [
        ['a', { className: 'clickable', href: `/lists/${list.id}` }, [
          ['div', { className: 'title' }, list.title]]]
      ]]);
    listContainer.appendChild(listEle);
  };
  return;
};

const drawLists = (lists, query) => {
  const container = document.querySelector('.listContainer');
  const searchMsg = `search results for : ${query}`;
  container.prepend(createElementTree(['div', { className: 'searchMsg' }, searchMsg]));
  lists.forEach(list => {
    drawList(list, container);
  });
  return;
};

const filterList = (todo, query) => {
  const matches = todo.lists.filter((list) =>
    list.title.includes(query));
  if (matches.length) {
    drawLists(matches, query);
    return;
  }
  const searchError = createElementTree(['h3', {}, 'no search results found']);
  document.querySelector('.listContainer').replaceChildren(searchError);
};

const filterItems = (todo, query) => {
  const matches = todo.lists.filter((list) =>
    list.items.some(item =>
      item.description.includes(query)));

  if (matches.length) {
    drawLists(matches, query);
    return;
  }
  const searchError = createElementTree(['h3', {}, 'no search results found']);
  document.querySelector('.listContainer').replaceChildren(searchError);
};

const main = () => {
  const url = new URL(document.location.href);
  const query = url.searchParams.get('query');
  const filter = url.searchParams.get('filter');

  if (filter === 'item') {
    xhrGet('/api/to-do', (todo) => filterItems(JSON.parse(todo), query));
    return;
  }
  xhrGet('/api/to-do', (todo) => filterList(JSON.parse(todo), query));
};

window.onload = main;
