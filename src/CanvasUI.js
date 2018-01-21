/**
* Base class for all ui
* @Author: Rikard Lindstrom <hi@rikard.io>
* @Filename: CanvasUI.js
*/

import Props from './props';

const defaultProperties = {
  width: 640,
  height: 320,
  hZoom: 1,
  visible: true,
  duration: 'auto',
  color: '#fff',
  background: '#333',
  buffer: null
};

class CanvasUI {

  constructor(defaults, props) {
    this.props = new Props(defaultProperties, defaults, props);
    this.props.$on('change', _ => { this.dirty = true; });
    this.dirty = true;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  }

  renderIfDirty() {
    if (!this.dirty) return this;
    this.clear();
    if (!this.props.visible) return this;
    return this.render();
  }

  clear() {
    // clear canvas and update width / height
    this.canvas.width = this.props.width;
    this.canvas.height = this.props.height;
  }

  get duration() {
    return this.props.duration === 'auto' ? (this.props.buffer ? this.props.buffer.duration : 0) : this.props.duration;
  }

  get displayDuration() {
    return this.duration / this.props.hZoom;
  }
}

export default CanvasUI;
