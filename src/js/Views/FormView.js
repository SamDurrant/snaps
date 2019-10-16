import { DOM } from '../base';

export const getInput = input => input.value.trim();
export const clearInput = input => input.value = '';

export const toggleSettings = (e) => {
  const icon = e.target.closest('.js-menu-icon');
  const menu = icon.nextElementSibling;
  menu.classList.toggle('hidden');
  menu.classList.toggle('visuallyhidden');
  icon.classList.toggle('btn-dropdown--active');
}

export const changeDisplayColor = (e) => {
  e.target.parentNode.style.backgroundColor = e.target.value;
}


export const getBoardSettings = () => {
  return {
    name: DOM.boardName.value,
    rotate: DOM.boardTransform.checked
  };
}

export const setBoardSettings = (activeBoard) => {
  DOM.boardName.value = activeBoard.name;
  DOM.boardTransform.checked = activeBoard.rotate;
}

export const getSnapSettings = () => {
  if (DOM.snapColor.value === "#000000") {
    DOM.snapColor.value = '#91a5b9';
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
