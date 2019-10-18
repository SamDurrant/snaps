import { DOM } from '../base';

// CREATES BOARD NODE
export const renderBoard = (activeBoard) => {
  // create board div
  const div = document.createElement('div');
  div.className = 'board-card';
  div.setAttribute('data-card-id', activeBoard.id);
  const textNode = document.createTextNode(activeBoard.name);
  const heading = document.createElement('h2');

  // append board together
  heading.append(textNode);
  div.append(heading);
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