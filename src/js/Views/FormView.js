import { DOM } from '../base';

export const getInput = input => input.value.trim();
export const clearInput = input => input.value = '';

export const toggleSettings = (e) => {
  const icon = e.target.closest('.js-menu-icon');
  const menu = icon.parentNode.nextElementSibling;
  menu.classList.toggle('hidden');
  menu.classList.toggle('visuallyhidden');
  icon.classList.toggle('btn-dropdown--active');
}

export const changeDisplayColor = (e) => {
  e.target.parentNode.style.backgroundColor = e.target.value;
}

export const clearForm = (form) => {
  form.reset();
  if (form === DOM.snapSettingsForm) {
    DOM.snapColor.value = '#91B0C7';
    DOM.snapColor.parentNode.style.backgroundColor = '#91B0C7';
  }
}

export const getBoardSettings = () => {
  return {
    name: DOM.boardName.value
  };
}

export const setBoardSettings = (activeBoard) => {
  DOM.boardName.value = activeBoard.name;
}

export const getSnapSettings = (activeSnap) => {
  if (!activeSnap.colorPicked) {
    DOM.snapColor.value = '#91B0C7';
  }
  return {
    name: DOM.snapName.value,
    color: DOM.snapColor.value,
    fontSize: DOM.snapFont.value,
    frontContent: DOM.snapFront.value,
    backContent: DOM.snapBack.value,
    size: DOM.snapSize.value
  }
}

export const setSnapSettings = (activeSnap) => {
  DOM.snapName.value = activeSnap.name;
  DOM.snapColor.value = activeSnap.color;
  DOM.snapColor.parentNode.style.backgroundColor = activeSnap.color;
  DOM.snapFont.value = activeSnap.fontSize;
  DOM.snapFront.value = activeSnap.frontContent;
  DOM.snapBack.value = activeSnap.backContent;
  DOM.snapSize.value = activeSnap.size;
}