import uniqeid from 'uniqid';

export class SnapList {
  constructor() {
    this.snaps = [];
    this.activeSnap = {};
  }

  addSnap (name, parentId, color = '#91a5b9', fontSize = '18', size = '1x1', frontContent = '', backContent = '') {
    const snap = {
      name: name,
      parentId: parentId,
      id: uniqeid(),
      color: color,
      colorPicked: false,
      fontSize: fontSize,
      size: size,
      frontContent: frontContent,
      backContent: backContent
    }

    this.snaps.push(snap);
    return snap.id;
  }

  deleteSnap() {
    this.snaps = this.snaps.filter(snap => snap.id !== this.activeSnap.id)
  }

  setActiveSnap(id) {
    this.activeSnap = this.snaps.find(snap => snap.id === id);
  }

  setNoActiveSnap() {
    this.activeSnap = {};
  }

  updateSnapData(formValues) {
    const updatedSnaps = this.snaps.map(snap => {
      if (snap.id === this.activeSnap.id) {
        snap = {...snap, ...formValues};
      }
      return snap;
    });
    this.snaps = updatedSnaps;
  }

  updateColorPicked() {
    const updatedSnaps = this.snaps.map(snap => {
      if (snap.id === this.activeSnap.id) {
        snap.colorPicked = true;
      }
      return snap;
    });
    this.snaps = updatedSnaps;
  }
}