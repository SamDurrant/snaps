import 'core-js/stable';
import "regenerator-runtime/runtime";
import '../sass/main.scss';
import { DOM } from './base';
import { BoardList } from './Models/BoardList';
import { SnapList } from './Models/SnapList';
import * as boardView from './Views/BoardView';
import * as snapView from './Views/SnapView';
import * as formView from './Views/FormView';
import * as demo from './demo';

// ----- create -----

// CREATE STATE
const state = {};

// CREATE BOARDLIST FOR STORAGE ON DOCUMENT LOAD
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('boardList')) {
    state.boardList = BoardList.fromJSON(JSON.parse(localStorage.getItem('boardList')));
    state.boardList.cards.forEach(board => {
      board.snaps = SnapList.fromJSON(board.snaps);
    })
    renderData();
  } else {
    state.boardList = new BoardList();
    addDemo();
  }
})


// ----- add -----

// ENTER KEY ON ADD TRIGGERS BTN CLICK
DOM.addBoardInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    DOM.addBoardBtn.click();
  }
})

DOM.addSnapInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    DOM.addSnapBtn.click();
  }
})

// BTN CLICK RETRIEVES INPUT VALUE AND CREATES NEW CARD
DOM.addBoardBtn.addEventListener('click', () => {
  const query = formView.getInput(DOM.addBoardInput);
  formView.clearInput(DOM.addBoardInput);
  handleBoardAdd(query);
})

DOM.addSnapBtn.addEventListener('click', () => {
    const query = formView.getInput(DOM.addSnapInput);
    formView.clearInput(DOM.addSnapInput);
    handleSnapAdd(query);
})


// ----- listen for click activation -----

// LISTEN FOR CLICK EVENT IN CONTAINER
DOM.snapContainer.addEventListener('click', (e) => {
  const snap = e.target.closest('.snap-card');
  handleSnapClick(snap);
})

DOM.boardContainer.addEventListener('click', (e) => {
  const board = e.target.closest('.board-card');
  handleBoardClick(board);
})


// ----- update -----

// RETRIEVE VALUES FROM FORM AND UPDATE DATA, RESET ACTIVE CARD WITH CORRECT VALUES, UPDATE CARD AND FORM ACCORDINGLY
DOM.boardSettingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (state.boardList.activeCard.id) {
    const boardFormValues = formView.getBoardSettings();
    handleBoardUpdate(boardFormValues);
  }
})

DOM.snapSettingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const snaps = state.boardList.activeCard.snaps;
  if (snaps.activeCard.id) {
    const snapFormValues = formView.getSnapSettings(snaps.activeCard);
    handleSnapUpdate(snapFormValues);
  }
})


// ----- deletion -----
DOM.deleteBoard.addEventListener('click', handleBoardDelete);

DOM.deleteSnap.addEventListener('click', handleSnapDelete);


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
  state.boardList.activeCard.snaps.updateColorPicked();
});

// REMOVE ACTIVE CLASS ON BOARD AND TOGGLES ITS SNAP VISIBILITY
function removeActiveUI() {
  if (state.boardList.activeCard) {
    boardView.removeActiveClass(state.boardList.activeCard);
    if (state.boardList.activeCard.snaps) {
      snapView.removeActiveClass(state.boardList.activeCard.snaps.activeCard);
      snapView.toggleVisibility(state.boardList.activeCard.id);
    }
  }
}

// RENDER DATA ON LOAD
function renderData() {
  state.boardList.setNoActiveCard();
  state.boardList.cards.forEach(board => {
    boardView.renderBoard(board);
    board.snaps.setNoActiveCard();
    board.snaps.cards.forEach(snap => {
      snapView.renderSnap(snap);
      snapView.hideSnap();
    })
  })
}

// ADD DEMO BOARD ON FIRST LOAD
function addDemo() {
  handleBoardAdd(demo.board.name);
  demo.snaps.forEach(snap => {
    handleSnapAdd(snap.name);
    handleSnapUpdate(snap);
  })
  removeActiveUI();
}

// SET VH TO MATCH INNER WINDOW HEIGHT
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})


// ----- handle event listeners -----

function handleBoardAdd(query) {
  if (query) {
    removeActiveUI();
    const id = state.boardList.addBoard(query, new SnapList());
    state.boardList.setActiveCard(id);
    boardView.renderBoard(state.boardList.activeCard);
    boardView.setActiveClass(state.boardList.activeCard);
    formView.setBoardSettings(state.boardList.activeCard);
    formView.clearForm(DOM.snapSettingsForm);
    localStorage.setItem('boardList', JSON.stringify(state.boardList));
  }
}

function handleSnapAdd(query) {
  if (query && state.boardList.activeCard.id) {
    const snaps = state.boardList.activeCard.snaps;
    const id = snaps.addSnap(query, state.boardList.activeCard.id);
    snaps.setActiveCard(id);
    snapView.renderSnap(snaps.activeCard);
    snapView.setActiveClass(snaps.activeCard);
    formView.setSnapSettings(snaps.activeCard);
    localStorage.setItem('boardList', JSON.stringify(state.boardList));
  }
}

function handleBoardClick(board) {
  if (board) {
    removeActiveUI();
    state.boardList.setActiveCard(board.getAttribute('data-card-id'));
    boardView.setActiveClass(state.boardList.activeCard);
    snapView.toggleVisibility(state.boardList.activeCard.id);
    formView.setBoardSettings(state.boardList.activeCard);
    formView.clearForm(DOM.snapSettingsForm);
  }
}

function handleSnapClick(snap) {
  if (snap) {
    const snaps = state.boardList.activeCard.snaps;
    snaps.setActiveCard(snap.getAttribute('data-card-id'));
    snapView.setActiveClass(snaps.activeCard);
    formView.setSnapSettings(snaps.activeCard);
  }
}

function handleBoardUpdate(boardFormValues) {
  state.boardList.updateCardData(boardFormValues);
  state.boardList.setActiveCard(state.boardList.activeCard.id);
  boardView.updateBoard(state.boardList.activeCard);
  formView.setBoardSettings(state.boardList.activeCard);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
  
}

function handleSnapUpdate(snapFormValues) {
  const snaps = state.boardList.activeCard.snaps;
  snaps.updateCardData(snapFormValues);
  snaps.setActiveCard(snaps.activeCard.id);
  snapView.updateSnap(snaps.activeCard);
  formView.setSnapSettings(snaps.activeCard);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
}

function handleBoardDelete() {
  state.boardList.deleteCard();
  boardView.removeBoard(state.boardList.activeCard);
  state.boardList.activeCard.snaps.cards.forEach(snap => {
    snapView.removeSnap(snap);
  })
  state.boardList.setNoActiveCard();
  formView.clearForm(DOM.boardSettingsForm);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
}

function handleSnapDelete() {
  state.boardList.activeCard.snaps.deleteCard();
  snapView.removeSnap(state.boardList.activeCard.snaps.activeCard);
  state.boardList.activeCard.snaps.setNoActiveCard();
  formView.clearForm(DOM.snapSettingsForm);
  localStorage.setItem('boardList', JSON.stringify(state.boardList));
}