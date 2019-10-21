import 'core-js/stable';
import "regenerator-runtime/runtime";
import '../sass/main.scss';
import { DOM } from './base';
import { BoardList } from './Models/BoardList';
import { SnapList } from './Models/SnapList';
import * as boardView from './Views/BoardView';
import * as snapView from './Views/SnapView';
import * as formView from './Views/FormView';

// ----- create -----

// CREATE STATE
const state = {};

// CREATE BOARDLIST FOR STORAGE ON DOCUMENT LOAD
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('boardList')) {
    state.boardList = BoardList.fromJSON(JSON.parse(localStorage.getItem('boardList')));
    state.boardList.boards.forEach(board => {
      board.snaps = SnapList.fromJSON(board.snaps);
    })
    renderData();
  } else {
    state.boardList = new BoardList();
  }
})


// ----- add -----

// ENTER KEY ON ADD BOARD TRIGGERS BTN CLICK
DOM.addBoardInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    DOM.addBoardBtn.click();
  }
})

// BTN CLICK RETRIEVES INPUT VALUE AND CREATES NEW BOARD
DOM.addBoardBtn.addEventListener('click', () => {
  const query = formView.getInput(DOM.addBoardInput);
  formView.clearInput(DOM.addBoardInput);

  if (query) {
    removeActiveUI();
    const id = state.boardList.addBoard(query, new SnapList());
    state.boardList.setActiveBoard(id);
    boardView.renderBoard(state.boardList.activeBoard);
    boardView.setActiveClass(state.boardList.activeBoard);
    formView.setBoardSettings(state.boardList.activeBoard);
    formView.clearForm(DOM.snapSettingsForm);
    localStorage.setItem('boardList', JSON.stringify(state.boardList));
  }
})

// ENTER KEY ON ADD SNAP TRIGGERS BTN CLICK
DOM.addSnapInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    DOM.addSnapBtn.click();
  }
})

// BTN CLICK RETRIEVES INPUT VALUE AND CREATES NEW SNAP
DOM.addSnapBtn.addEventListener('click', () => {
  if (Object.keys(state.boardList.activeBoard).length !== 0) {
    const query = formView.getInput(DOM.addSnapInput);
    formView.clearInput(DOM.addSnapInput);

    if (query) {
      const snaps = state.boardList.activeBoard.snaps;
      const id = snaps.addSnap(query, state.boardList.activeBoard.id);
      snaps.setActiveSnap(id);
      snapView.renderSnap(snaps.activeSnap);
      snapView.setActiveClass(snaps.activeSnap);
      formView.setSnapSettings(snaps.activeSnap);
      localStorage.setItem('boardList', JSON.stringify(state.boardList));
    }
  }
})


// ----- listen for click activation -----

// LISTEN FOR CLICK EVENT IN SNAP CONTAINER
DOM.snapContainer.addEventListener('click', (e) => {
  const snap = e.target.closest('.snap-card');
  const snaps = state.boardList.activeBoard.snaps;
  
  if (snap) {
    if (snaps) {
      snaps.setActiveSnap(snap.getAttribute('data-card-id'));
      snapView.setActiveClass(snaps.activeSnap);
      formView.setSnapSettings(snaps.activeSnap);
    }
  }
})

// LISTEN FOR CLICK EVENT IN BOARD CONTAINER
DOM.boardContainer.addEventListener('click', (e) => {
  const board = e.target.closest('.board-card');

  if (board) {
    removeActiveUI();
    state.boardList.setActiveBoard(board.getAttribute('data-card-id'));
    boardView.setActiveClass(state.boardList.activeBoard);
    snapView.toggleVisibility(state.boardList.activeBoard.id);
    formView.setBoardSettings(state.boardList.activeBoard);
    formView.clearForm(DOM.snapSettingsForm);
  }
})

// CHECKS FOR AN ACTIVE BOARD BEFORE REMOVING ACTIVE CLASS ON BOARD AND ITS SNAPS AND TOGGLES SNAP VISIBILITY
function removeActiveUI() {
  if (state.boardList.activeBoard) {
    boardView.removeActiveClass(state.boardList.activeBoard);
    if (state.boardList.activeBoard.snaps) {
      snapView.removeActiveClass(state.boardList.activeBoard.snaps.activeSnap);
      snapView.toggleVisibility(state.boardList.activeBoard.id);
    }
  }
}


// ----- update -----

// RETRIEVES VALUES FROM BOARD FORM AND UPDATES DATA, RESETS ACTIVE BOARD WITH CORRECT VALUES, UPDATES BOARD AND FORM ACCORDINGLY
DOM.boardSettingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const boardFormValues = formView.getBoardSettings();
  state.boardList.updateBoardData(boardFormValues);
  state.boardList.setActiveBoard(state.boardList.activeBoard.id);
  boardView.updateBoard(state.boardList.activeBoard);
  formView.setBoardSettings(state.boardList.activeBoard);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
})

DOM.snapSettingsForm.addEventListener('submit', (e) => {
  let snaps = state.boardList.activeBoard.snaps;
  e.preventDefault();
  const snapFormValues = formView.getSnapSettings(snaps.activeSnap);
  snaps.updateSnapData(snapFormValues);
  snaps.setActiveSnap(snaps.activeSnap.id);
  snapView.updateSnap(snaps.activeSnap);
  formView.setSnapSettings(snaps.activeSnap);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
})


// ----- deletion -----
DOM.deleteBoard.addEventListener('click', () => {
  state.boardList.deleteBoard();
  boardView.removeBoard(state.boardList.activeBoard);
  state.boardList.activeBoard.snaps.snaps.forEach(snap => {
    snapView.removeSnap(snap);
  })
  state.boardList.setNoActiveBoard();
  formView.clearForm(DOM.boardSettingsForm);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
})

DOM.deleteSnap.addEventListener('click', () => {
  state.boardList.activeBoard.snaps.deleteSnap();
  snapView.removeSnap(state.boardList.activeBoard.snaps.activeSnap);
  state.boardList.activeBoard.snaps.setNoActiveSnap();
  formView.clearForm(DOM.snapSettingsForm);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
})


// ----- utilities -----

// LISTEN FOR DOUBLE CLICK EVENT TO ROTATE SNAP
DOM.snapContainer.addEventListener('dblclick', e => {
  const snap = e.target.closest('.snap-card');
  snapView.rotateSnap(snap);
});

// ALLOWS TRIPLE TAP ON MOBILE TO ROTATE SNAP
let tappedTime = 0;
let tappedSnap;
DOM.snapContainer.addEventListener('touchstart', e => {
  const snap = e.target.closest('.snap-card');

  if (snap) {
    let now = +(new Date());
    if (tappedTime + 500 > now && tappedSnap === snap) {
      e.preventDefault();
      snapView.rotateSnap(tappedSnap);
    }
    tappedTime = now;
    tappedSnap = snap;
  }
})

// TOGGLE SETTINGS MENUS
DOM.menuToggle.forEach(icon => {
  icon.addEventListener('click', (e) => formView.toggleSettings(e));
})

// CHANGE COLOR DISPLAY TO RESPOND TO COLOR INPUT
DOM.snapColor.addEventListener('change', (e) => {
  formView.changeDisplayColor(e);
  state.boardList.activeBoard.snaps.updateColorPicked();
});

function renderData() {
  state.boardList.setNoActiveBoard();
  state.boardList.boards.forEach(board => {
    boardView.renderBoard(board);
    board.snaps.setNoActiveSnap();
    board.snaps.snaps.forEach(snap => {
      snapView.renderSnap(snap);
      snapView.hideSnap();
    })
  })
}

// SET VH TO MATCH INNER WINDOW HEIGHT
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})