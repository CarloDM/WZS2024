import Phaser from "phaser";
import dat from 'dat.gui';

export default class SelectionRect {
  constructor(scene, tank) {
    this.scene = scene;
    this.tank = tank;
      /** @type {Phaser.GameObjects.Rectangle} */
    this.selectionRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);
    this.selection = scene.add.rectangle(0, 0, 0, 0, 0x1d7196, 0.5);
    scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
    scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);
    scene.input.on(Phaser.Input.Events.POINTER_UP, this.handlePointerUp, this);
  }

  handlePointerDown(pointer, currentlyOver) {
    this.selection.x = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).x;
    this.selection.y = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).y;
  }

  handlePointerMove(pointer, currentlyOver) {
    if (!pointer.isDown) {
      return;
    }

    const dx = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).x -
      this.scene.cameras.main.getWorldPoint(pointer.prevPosition.x, pointer.prevPosition.y).x;
    const dy = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).y -
      this.scene.cameras.main.getWorldPoint(pointer.prevPosition.x, pointer.prevPosition.y).y;

    this.selection.width += dx;
    this.selection.height += dy;

    this.selectionRect.x = this.selection.x;
    this.selectionRect.y = this.selection.y;
    this.selectionRect.width = this.selection.width;
    this.selectionRect.height = this.selection.height;

    if (this.selectionRect.width < 0) {
      this.selectionRect.x += this.selectionRect.width;
      this.selectionRect.width *= -1;
    }
    if (this.selectionRect.height < 0) {
      this.selectionRect.y += this.selectionRect.height;
      this.selectionRect.height *= -1;
    }
  }

  handlePointerUp(pointer, currentlyOver) {
    const selected = this.scene.physics.overlapRect(
      this.selectionRect.x,
      this.selectionRect.y,
      this.selectionRect.width,
      this.selectionRect.height
    );

    if (selected.length > 0) {
      this.tank.setTankSelected();
    }

    this.selection.width = 0;
    this.selection.height = 0;
    this.selectionRect.x = 0;
    this.selectionRect.y = 0;
    this.selectionRect.width = 0;
    this.selectionRect.height = 0;
  }




}