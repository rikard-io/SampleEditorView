/**
 * Main program, compiles everything onto one canvas and handles interaction
 * @Author: Rikard Lindstrom <hi@rikard.io>
 * @Filename: SampleEditor.js
 */

import CanvasUI from './CanvasUI';
import Waveform from './Waveform';
import Ruler from './Ruler';
import LineMarker from './LineMarker';
import LoopMarker from './LoopMarker';

const defaultProperties = {
  hZoom: 1,
  vZoom: 2,
  offset: 0,
  background: '#ddd',
  color: '#222',
  selectColor: '#ddd',
  selectBackground: '#222',
  width: 640,
  height: 320,
  channel: 0,
  resolution: 1,
  startPosition: 42.1,
  uiZoomStickiness: 0.1,
  duration: 'auto',
  visible: true,
  loop: true,
  loopStart: 0,
  loopEnd: 1,
  selectStart: 0,
  selectEnd: 0,
  quantize: 0.0125,
  buffer: null
};

class SampleEditor extends CanvasUI {

  constructor(props) {

    super(defaultProperties, props);

    this.waveForm = new Waveform({});
    this.ruler = new Ruler({});
    this.startMarker = new LineMarker({});
    this.zoomMarker = new LineMarker({visible: false});
    this.loopLengthMarker = new LoopMarker({visible: true});
    this.loopStartMarker = new LineMarker({visible: true});
    this.loopEndMarker = new LineMarker({dir: -1, visible: true});

    this.waveForm.props.$link(this.props);
    this.ruler.props.$link(this.props, ['hZoom', 'width', 'offset', 'quantize',
      'buffer' ]).$map(this.props, { height: v => v / 16 });
    this.zoomMarker.props.$link(this.props, ['height']);
    this.loopEndMarker.props.$link(this.props, ['height'])
      .$map(this.props, { width: v => v / 64 });
    this.loopStartMarker.props.$link(this.props, ['height'])
      .$map(this.props, { width: v => v / 64 });
    this.loopLengthMarker.props.$map(this.props, {
      height: v => v / 32
    });

    this.startMarker.props.$link(this.props, ['height'])
      .$map(this.props, { width: v => v / 64 });

    this.render = this.render.bind(this);

    this._setupUI();

    this.props.$on('defered_change', this.renderIfDirty, this);

    this.zoomMarker.props.$observe('visible', this.renderIfDirty, this);

    this.canvas.classList.add('SampleEditor');
  }

  render() {
    let ctx = this.ctx;

    ctx.drawImage(this.waveForm.renderIfDirty().canvas, 0, 0);
    ctx.drawImage(this.zoomMarker.renderIfDirty().canvas,
      this.zoomMarker.position, 0);

    ctx.drawImage(this.ruler.renderIfDirty().canvas, 0, 0);

    ctx.drawImage(this.startMarker.renderIfDirty().canvas,
      this._timeToPixel(this.props.startPosition), 10);

    this.loopLengthMarker.props.width = this._timeToPixel(this.props.loopEnd) -
      this._timeToPixel(this.props.loopStart);

    ctx.drawImage(this.loopLengthMarker.renderIfDirty().canvas,
      this._timeToPixel(this.props.loopStart), 20);
    ctx.drawImage(this.loopStartMarker.renderIfDirty().canvas,
      this._timeToPixel(this.props.loopStart), 20);
    ctx.drawImage(this.loopEndMarker.renderIfDirty().canvas,
      this._timeToPixel(this.props.loopEnd) - this.loopEndMarker.props.width, 20);

  }

  _timeToPixel(time) {
    time -= this.props.offset;
    let px = (time / this.displayDuration) * this.props.width;

    return Math.round(px);
  }

  _pixelToTime(pixel) {
    return (pixel / this.props.width) * this.displayDuration;
  }

  _getLoopRect() {
    return {
      x1: this._timeToPixel(this.props.loopStart),
      y1: 20,
      x2: this._timeToPixel(this.props.loopEnd),
      y2: this.props.height - 20
    };
  }

  // a pretty crude hittest to find target from a relative mouse position
  _hitTest(point) {

    if (point.y < this.ruler.props.height) {

      if (this.props.loop) {
        let loopRect = this._getLoopRect();

        if (point.y >= loopRect.y1 && point.y < loopRect.y2) {
          if (Math.abs(point.x - loopRect.x1) < 5) {
            return this.loopStartMarker;
          } else if (Math.abs(point.x - loopRect.x2) < 5) {
            return this.loopEndMarker;
          } else if (point.x >= loopRect.x1 && point.x < loopRect.x2) {
            return this.loopLengthMarker;
          }
        }
      }

      if (point.x) {return this.ruler;}
    }
    return this.waveForm;
  }

  // update mouse cursor to reflect active target
  _updateCursor(hitTarget, e) {
    if (hitTarget === this.ruler) {
      this.canvas.style.cursor = 'pointer';
    } else if (hitTarget === this.loopStartMarker) {
      this.canvas.style.cursor = 'e-resize';
    } else if (hitTarget === this.loopEndMarker) {
      this.canvas.style.cursor = 'w-resize';
    } else if (hitTarget === this.loopLengthMarker) {
      this.canvas.style.cursor = 'move';
    } else if (hitTarget === this.waveForm && e.altKey) {
      this.canvas.style.cursor = 'zoom-in';
    } else {
      this.canvas.style.cursor = 'auto';
    }
  }

  // almost fully self contained ui interaction
  _setupUI() {
    let mouseDown = false;
    let lastY = 0;
    let zoomThresh = 0;
    let canvasTarget = null;
    let doZoom = false;
    let lastMousePos = { x: 0, y: 0 };
    let startXTime = 0;

    const toRelativeMovement = (e) => {
      let rect = this.canvas.getBoundingClientRect();
      let pixelRatio = this.pixelRatio;

      let x = (e.pageX - rect.left) * pixelRatio.x;
      let y = (e.pageY - rect.top) * pixelRatio.y;

      let movementX = e.movementX ? e.movementX * pixelRatio.x : 0;
      let movementY = e.movementY ? e.movementY * pixelRatio.y : 0;

      return {
        rect,
        x,
        y,
        movementX,
        movementY
      };
    };

    const quantizePosition = ({ x, y }) => {

      if (!this.props.quantize) return { x, y };

      let offsetPx = (this.props.offset / this.displayDuration) * this.props.width;
      let pxQuant = (this.props.quantize / this.displayDuration) * this.props.width;

      x += offsetPx;
      x = Math.round(x / pxQuant) * pxQuant;
      x -= offsetPx;
      return { x, y };
    };

    this.canvas.addEventListener('mousedown', (e)=>{
      mouseDown = true;
      lastY = null;
      zoomThresh = 0;
      doZoom = false;

      let pos = toRelativeMovement(e);

      canvasTarget = this._hitTest(pos);

      this._updateCursor(canvasTarget, e);

      if (canvasTarget === this.waveForm) {
        if (e.altKey) {
          doZoom = true;
          this.zoomMarker.position = pos.x;
          this.zoomMarker.props.visible = true;
          this.canvas.requestPointerLock();
        }
      }
      if (!doZoom) {
        pos = quantizePosition(pos);
      }
      startXTime = this._pixelToTime(pos.x) + this.props.offset;
      !doZoom && (this.props.selectEnd = this.props.selectStart = startXTime);
      lastMousePos = pos;

    });

    document.addEventListener('mouseup', ()=>{
      mouseDown = false;
      if (doZoom) {
        this.zoomMarker.props.visible = false;
        document.exitPointerLock();
        doZoom = false;
      }
    });

    document.addEventListener('mousemove', (e)=>{

      if (mouseDown) {

        let { x, y, movementX, movementY, rect } = toRelativeMovement(e);
        let p = { x, y };

        if (!doZoom) {

          // keep p within boarders of canvas
          p.x = Math.max(0, Math.min(this.props.width, p.x));
          p = quantizePosition(p);

          if (canvasTarget === this.ruler) {
            this.updateStartPos(p.x);
          }

        }

        let deltaX = (doZoom && movementX !== undefined ? movementX : (p.x - lastMousePos.x)) / rect.width;
        let deltaY = (doZoom && movementY !== undefined ? movementY : (p.y - lastMousePos.y)) / rect.height;

        let xTime = this._pixelToTime(p.x) + this.props.offset;
        let deltaTime = this._pixelToTime(deltaX) * this.props.width / this.pixelRatio.x;

        Object.assign(lastMousePos, p);

        if (doZoom) {

          if (lastY === null) lastY = p.y;

          lastY = p.y;

          zoomThresh += Math.abs(deltaY);
          let hZoom = Math.max(1, this.props.hZoom + deltaY * this.props.hZoom);

          if (zoomThresh > this.props.uiZoomStickiness) {

            let zoomDelta = hZoom - this.props.hZoom;

            if (zoomDelta !== 0 && hZoom >= 0.5) {

              let zoomPerc = zoomDelta / this.props.hZoom;
              let posRatio = p.x / (rect.width * this.pixelRatio.x);

              this.props.hZoom = hZoom;
              this.offset += zoomPerc * posRatio * this.displayDuration;

            }

          }

          this.offset -= (deltaX * 10) / hZoom;

        } else if (canvasTarget === this.waveForm) {

          if (xTime < startXTime) {
            this.updateSelection(this.props.selectStart + deltaTime, startXTime);
          } else {
            this.updateSelection(startXTime, this.props.selectEnd + deltaTime);
          }

        } else if (canvasTarget === this.ruler) {
          if (p.x >= 0 && p.x < rect.width) {
            this.updateStartPos(p.x);
          } else {
            if (p.x < 0) {
              this.offset = Math.max(0, this.props.offset - Math.abs(p.x * 0.1));
            } else {
              this.offset = Math.min(this.duration, this.props.offset + (p.x - rect.width) * 0.1);
            }
          }
        } else if (canvasTarget === this.loopLengthMarker) {

          this.updateLoopPos(this.props.loopStart + deltaTime, this.props.loopEnd + deltaTime);

        } else if (canvasTarget === this.loopStartMarker) {

          if (xTime <= this.props.loopEnd) {
            this.updateLoopPos(this.props.loopStart + deltaTime, this.props.loopEnd);
          } else {
            this.updateLoopPos(this.props.loopEnd, this.props.loopEnd);
          }

        } else if (canvasTarget === this.loopEndMarker) {

          if (xTime >= this.props.loopStart) {
            this.updateLoopPos(this.props.loopStart, this.props.loopEnd + deltaTime);
          } else {
            this.updateLoopPos(this.props.loopStart, this.props.loopStart);
          }

        }

      } else {
        this._updateCursor(this._hitTest(toRelativeMovement(e)), e);
      }
    });
  }

  updateSelection(start, end) {

    start = Math.max(0, start);
    end = Math.min(this.duration, end);

    this.props.selectStart = start;
    this.props.selectEnd = end;

  }

  updateLoopPos(start, end) {

    if (start < 0) {
      let d = Math.abs(start);

      end = Math.min(this.duration, end + d);
      start += d;

    }
    if (end > this.duration) {
      let d = this.duration - end;

      start = Math.max(0, start + d);
      end += d;
    }

    if (start > end) {
      start = end;
    }

    if (start >= 0 && end <= this.duration) {
      this.props.loopStart = start;
      this.props.loopEnd = end;
    }

  }

  updateStartPos(px) {
    let startPos = ((px / this.canvas.width) * this.duration / this.props.hZoom) + this.props.offset;

    this.props.startPosition = startPos;
  }

  get offset() {
    return this.props.offset;
  }

  set offset(v) {
    this.props.offset = Math.max(0, Math.min(this.duration - this.displayDuration, v));
  }

  get buffer() {
    return this.props.buffer;
  }

  set buffer(buffer) {
    this.props.buffer = buffer;
  }

  get pixelRatio() {

    let rect = this.canvas.getBoundingClientRect();
    let pixelRatio = { x: this.props.width / rect.width, y: this.props.height / rect.height };

    return pixelRatio;

  }
}

export default SampleEditor;
