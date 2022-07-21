const createElementTree = ([tag, attributes, children]) => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([attr, value]) => {
    element[attr] = value;
  });

  if (Array.isArray(children)) {
    children.forEach(child => {
      element.appendChild(createElementTree(child));
    });
    return element;
  }
  element.innerText = children;
  return element;
};
