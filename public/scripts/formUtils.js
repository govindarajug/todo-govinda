const getFormData = (selector) => {
  const form = document.querySelector(selector);
  const formData = new FormData(form);
  const bodyParams = new URLSearchParams(formData).toString();
  form.reset();
  return bodyParams;
};
