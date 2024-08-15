export const decodeHtml = (txt) => {
  const textarea = document.createElement('textarea');
  textarea.innerHtml = txt;
  console.log(txt);
  console.log(textarea.textContent);
  return textarea.value;
};
