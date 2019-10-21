import { DOM } from '../base';

// CREATES SNAP NODE
export const renderSnap = (activeSnap) => {
  // create snap div
  const div = document.createElement('div');
  div.className = 'snap-card';
  div.setAttribute('data-card-id', activeSnap.id);
  div.setAttribute('data-parent-id', activeSnap.parentId);

  // create front of snap
  const front = document.createElement('div');
  front.className = 'snap-card__side snap-card__side-front';
  const frontParagraph = document.createElement('p');
  front.append(frontParagraph);

  // create back of snap
  const back = document.createElement('div');
  back.className = 'snap-card__side snap-card__side-back';
  const backParagraph = document.createElement('p');
  back.append(backParagraph);

  // append snap together
  div.append(front, back);
  DOM.snapContainer.appendChild(div);

  // finish updating with snap data
  updateSnap(activeSnap);
}

export const updateSnap = (activeSnap) => {
  const snapToUpdate = findActiveSnapNode(activeSnap);

  snapToUpdate.childNodes.forEach(side => {
    if (side.classList.contains('snap-card__side-front')) {
      side.firstChild.textContent = activeSnap.frontContent;
    } else if (side.classList.contains('snap-card__side-back')) {
      side.firstChild.textContent = activeSnap.backContent;
    }
    side.style.fontSize = activeSnap.fontSize + 'px';
    side.style.backgroundColor = activeSnap.color;
  })

  changeSnapFontColor(snapToUpdate, activeSnap.color);
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

export const hideSnap = () => {
  DOM.snapContainer.childNodes.forEach(snap => {
    snap.classList.add('hidden');
    snap.classList.add('visuallyhidden');
    
  })
}

export const rotateSnap = (snap) => {
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

const changeSnapFontColor = (snap, color) => {
  if (backgroundIsLight(color)) {
    snap.style.color = 'rgb(65, 60, 94)';
  } else {
    snap.style.color = 'rgb(249, 245, 242)';
  }
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