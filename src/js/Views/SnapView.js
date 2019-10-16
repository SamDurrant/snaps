import { DOM } from '../base';

// CREATES SNAP NODE
export const renderSnap = (activeSnap) => {
    // create div
  const div = document.createElement('div');
    // add class
  div.className = 'snap-card';
    // set data attribute
  div.setAttribute('data-card-id', activeSnap.id);
  div.setAttribute('data-parent-id', activeSnap.parentId);

    // create front div
  const front = document.createElement('div');
    // add class to front
  front.className = 'snap-card__side snap-card__side-front';
  front.style.backgroundColor = activeSnap.color;
    // create front textNode
  const frontTextNode = document.createTextNode(activeSnap.frontContent);
    // create paragraph element
  const frontParagraph = document.createElement('p');
    // append textNode to paragraph
  frontParagraph.append(frontTextNode);
    // append paragraph to front div
  front.append(frontParagraph);

    // create back div
  const back = document.createElement('div');
    // add class to back
  back.className = 'snap-card__side snap-card__side-back';
    // create back textNode
  const backTextNode = document.createTextNode(activeSnap.backContent);
    // create paragraph element
  const backParagraph = document.createElement('p');
    // append textNode to paragraph
  backParagraph.append(backTextNode);
    // append paragraph to back div
  back.append(backParagraph);

    // append both front and back to div
  div.append(front, back);
    // append div to snapContainer
  DOM.snapContainer.appendChild(div);
}

export const updateSnap = (activeSnap) => {
  const snapToUpdate = findActiveSnapNode(activeSnap);

  snapToUpdate.childNodes.forEach(side => {
    if (side.classList.contains('snap-card__side-front')) {
      side.textContent = activeSnap.frontContent;
    } else if (side.classList.contains('snap-card__side-back')) {
      side.textContent = activeSnap.backContent;
    }
    side.style.fontSize = activeSnap.fontSize + 'px';
    side.style.backgroundColor = activeSnap.color;
  })

  if (backgroundIsLight(activeSnap.color)) {
    snapToUpdate.style.color = 'rgb(65, 60, 94)';
  } else {
    snapToUpdate.style.color = 'rgb(249, 245, 242)';
  }
  
  changeSnapSize(snapToUpdate, activeSnap.size);
}

export const removeSnap = (activeSnap) => {
  const snapToDelete = findActiveSnapNode(activeSnap);
  DOM.snapContainer.removeChild(snapToDelete);
}

export const setActiveClass = (activeSnap) => {
  DOM.snapContainer.childNodes.forEach(snap => {
    if (snap.dataset) {
      if (snap.dataset.cardId === activeSnap.id) {
        snap.classList.add('active-snap');
      } else {
        snap.classList.remove('active-snap');
      }
    }
  })
}

export const removeActiveClass = (activeSnap) => {
  DOM.snapContainer.childNodes.forEach(snap => {
    if (snap.dataset) {
      if (snap.dataset.cardId === activeSnap.id) {
        snap.classList.remove('active-snap');
      }
    }
  })
}

export const toggleVisibility = (id) => {
  DOM.snapContainer.childNodes.forEach(snap => {
    if (snap.dataset) {
      if (snap.dataset.parentId === id) {
        snap.classList.toggle('hidden');
        snap.classList.toggle('visuallyhidden');
      }
    }
  })
}

export const rotateSnap = (e) => {
  const snap = e.target.closest('.snap-card');
  if (snap) {
    snap.classList.toggle('rotated');
  }
}


const changeSnapSize = (snap, newSize) => {
  const sizes = ['1x1', '1x2', '1x3', '2x1', '2x2', '2x3', '3x1', '3x2', '3x3'];
  sizes.forEach(size => {
    if (size === newSize) {
      snap.classList.add(`snap-${newSize}`);
    } else {
      snap.classList.remove(`snap-${size}`);
    }
  })
}

const backgroundIsLight = (background) => {
  if (background[0] === '#') {
    background = background.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
  }
  return background.reduce((a, b) => a + b) > 127 * 3;
}

const findActiveSnapNode = (activeSnap) => {
  const snap = Array.from(DOM.snapContainer.childNodes).filter(snap => {
    if (snap.dataset) {
      return snap.dataset.cardId === activeSnap.id;
    }
  });
  return snap[0];
}