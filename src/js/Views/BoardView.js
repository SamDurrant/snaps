import { DOM } from '../base';

// CREATES BOARD NODE
export const renderBoard = (activeBoard) => {
    // create div
  const div = document.createElement('div');
    // add class
  div.className = 'board-card';
    // set data attribute
  div.setAttribute('data-card-id', activeBoard.id);
    // create name text node
  const textNode = document.createTextNode(activeBoard.name);
    // create heading element
  const heading = document.createElement('h2');
    // append text to heading
  heading.append(textNode);
    // append heading to div
  div.append(heading);
    // append div to boardContainer
  DOM.boardContainer.appendChild(div);
}

export const updateBoard = (activeBoard) => {
  const boardToUpdate = findActiveBoardNode(activeBoard);
  boardToUpdate.firstChild.textContent = activeBoard.name;
}

export const removeBoard = (activeBoard) => {
  const boardToDelete = findActiveBoardNode(activeBoard);
  DOM.boardContainer.removeChild(boardToDelete);
}

export const setActiveClass = (activeBoard) => {
  DOM.boardContainer.childNodes.forEach(board => {
    if (board.dataset) {
      if (board.dataset.cardId === activeBoard.id) {
        board.classList.add('active-board');
      } else {
        board.classList.remove('active-board');
      }
    }
  })
}

export const removeActiveClass = (activeBoard) => {
  DOM.boardContainer.childNodes.forEach(board => {
    if (board.dataset) {
      if (board.dataset.cardId === activeBoard.id) {
        board.classList.remove('active-board');
      }
    }
  })
}

const findActiveBoardNode = (activeBoard) => {
  const board = Array.from(DOM.boardContainer.childNodes).filter(board => { 
    if (board.dataset) {
      return board.dataset.cardId === activeBoard.id
    }
  });
  return board[0];
}