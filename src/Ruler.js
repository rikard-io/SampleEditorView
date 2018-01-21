/**
 * @Author: Rikard Lindstrom <code@rikard.io>
 * @Filename: Ruler.js
 */

import CanvasUI from './CanvasUI';

const defaultProperties = {
  vZoom: 1,
  offset: 0,
  background: '#AAA',
  color: '#222',
  interval: 'auto',
  unit: 's',
  duration: 'auto',
  quantize: 0,
  height: 40
};

class Ruler extends CanvasUI {

  constructor(props) {

    super(defaultProperties, props);

  }

  render() {

    let ctx = this.ctx;

    let w = this.props.width;
    let h = this.props.height;

    ctx.fillStyle = this.props.background;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = ctx.fillStyle = this.props.color;
    ctx.lineWidth = 0.5;

    let displayDuration = this.displayDuration;
    let secondsPerPixel = displayDuration / w;

    let interval = this.props.interval;

    if (interval === 'auto') {
      interval = this.quantizeRuler(displayDuration);
    }

    interval = Math.max(0.001, interval);

    let precision = Math.max(2, Math.min(3, Math.round(1 / interval)));
    let pixelsPerInterval = (1 / secondsPerPixel) * interval;
    let drawPoints = w / pixelsPerInterval;

    let markerInterval = 5;// Math.max(1, Math.round(interval * 4));

    let x = -((this.props.offset / interval) % markerInterval) *
      pixelsPerInterval;

    let startTime = this.props.offset;

    for (let i = 0; i < drawPoints + markerInterval; i++) {
      let isMarker = i % markerInterval === 0;

      ctx.beginPath();
      if (isMarker) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      } else {
        ctx.moveTo(x, h);
        ctx.lineTo(x, h * 0.63);
      }
      ctx.stroke();

      if (isMarker) {
        let fontSize = this.props.width / 71;

        ctx.font = `${fontSize}px Arial`;
        ctx.fillText((startTime + (x / pixelsPerInterval) *
          interval).toFixed(precision) + this.props.unit, x + 5, fontSize);
      }

      x += pixelsPerInterval;

    }

    return this;

  }

  quantizeRuler(d) {
    const MAX_PIXEL_W = 20;
    const MIN_PIXEL_W = 60;

    let pixelsPerSecond = this.props.width / d;
    let r = 5 / pixelsPerSecond;
    let oct = -Math.floor(Math.log(r) / Math.log(10) + 1);
    let dec = (Math.pow(10, oct));

    let q;

    if (!this.props.quantize) {
      let c = [1, 2, 5][Math.round(r * dec * 2)];

      q = c / dec;

    } else {
      q = this.props.quantize;
      while (q * pixelsPerSecond < MAX_PIXEL_W) q += this.props.quantize;
      while (q * pixelsPerSecond > MIN_PIXEL_W) q /= 5;

    }
    return q;
  }

}

export default Ruler;
