/**
 * @Author: Rikard Lindstrom <hi@rikard.io>
 * @Filename: LineMarker.js
 */

import CanvasUI from './CanvasUI';

const defaultProperties = {
  background: '#999',
  color: '#222',
  width: 10,
  dir: 1
};

class LineMarker extends CanvasUI {

  constructor(props) {

    super(defaultProperties, props);

  }

  render() {

    let ctx = this.ctx;

    // full clear and width / height set
    let w = this.props.width;
    let h = this.props.height;

    ctx.fillStyle = this.props.background;
    ctx.strokeStyle = this.props.color;

    ctx.beginPath();

    let triH = h / 64;
    let triH2 = triH * 2;

    if (this.props.dir === 1) {
      ctx.lineTo(w, triH);
      ctx.lineTo(0, triH2);
      ctx.lineTo(0, 0);
      ctx.lineTo(w, triH);
      ctx.fill();
      ctx.stroke();
      ctx.strokeRect(0, 0, 1, h);
    } else {
      ctx.moveTo(w, 0);
      ctx.lineTo(0, triH);
      ctx.lineTo(w, triH2);
      ctx.lineTo(w, 0);
      ctx.lineTo(0, triH);
      ctx.fill();
      ctx.stroke();
      ctx.strokeRect(w, 0, 1, h);
    }

    return this;
  }

}

export default LineMarker;
