/**
 * @Author: Rikard Lindstrom <code@rikard.io>
 * @Filename: Waveform.js
 */

import CanvasUI from './CanvasUI';

const defaultProperties = {
  vZoom: 1,
  offset: 0,
  background: '#ddd',
  color: '#222',
  selectColor: '#ddd',
  selectBackground: '#222',
  width: 640,
  height: 320,
  selectStart: 0,
  selectEnd: 0,
  channel: 0,
  resolution: 1
};

function avarage(data, from, to, interval = 1, abs = false, q) {

  interval = Math.max(1, interval);
  to = Math.min(data.length, to);
  to = Math.min(from + 100, to);

  let tot = 0;

  for (let i = from; i < to; i += interval) {
    tot += abs ? Math.abs(data[ i ]) : data[ i ];

  }
  let len = to - from;
  let avg = (tot / len) * interval;

  return avg;

}

class Waveform extends CanvasUI {

  constructor(props) {

    super(defaultProperties, props);

  }

  render() {

    let buffer = this.props.buffer;

    if (!buffer) return this;

    let w = this.props.width;
    let h = this.props.height;

    let ctx = this.ctx;

    ctx.fillStyle = this.props.background;
    ctx.fillRect(0, 0, w, h);

    let data = buffer.getChannelData(this.props.channel);
    let displayLength = data.length / this.props.hZoom;
    let pointsToDraw = Math.min(w / this.props.resolution, displayLength);
    let bufferStepLen = displayLength / pointsToDraw ;
    let pointDistance = w / pointsToDraw ;

    let halfHeight = h / 2;

    let offsetSamples = this.props.offset * buffer.sampleRate;

    ctx.fillStyle = this.props.color;

    let drawSymetric = bufferStepLen > pointDistance;

    ctx.beginPath();
    ctx.moveTo(0, halfHeight);
    ctx.lineTo(w, halfHeight);
    ctx.stroke();

    ctx.moveTo(0, halfHeight);

    // internal render function to be able to divide the rendering on selection
    let draw = (from, to, color, background) => {

      from = Math.max(0, Math.min(from, pointsToDraw));
      to = Math.max(0, Math.min(to, pointsToDraw));

      let lastDataIndex = 0;
      let pointsDrawn = [];

      ctx.beginPath();

      let x = from * pointDistance;

      if (background) {
        let len = (to - from) * pointDistance;

        ctx.fillStyle = background;
        ctx.fillRect(x, 0, len, h);
      }

      for (let i = from; i < to; i++) {

        let j = Math.floor((i + 1) * bufferStepLen + offsetSamples);

        if (drawSymetric) {
          // avarage with abs
          let v = j >= 0 ? avarage(data, lastDataIndex, j, 1, true) : 0;

          if (v >= 0) {
            let y = v * this.props.vZoom * halfHeight;

            if (i === from) {
              ctx.moveTo(x, halfHeight - y);
            }
            ctx.lineTo(x, halfHeight - y);
            pointsDrawn.push(x, y);
          }

        } else {
          // avarage without abs
          let v = j >= 0 ? avarage(data, lastDataIndex, j, 1, false) : 0;
          let y = v * this.props.vZoom * halfHeight;

          if (i === from) {
            ctx.moveTo(0, halfHeight - y);
          }
          ctx.lineTo(x, halfHeight - y);

        }

        x += pointDistance;

        lastDataIndex = j;
      }

      // fill in the flip side if we should do a symetrical waveform
      if (drawSymetric) {
        for (let i = pointsDrawn.length - 1; i > 0; i -= 2) {
          let x = pointsDrawn[ i - 1 ];
          let y = pointsDrawn[ i ];

          ctx.lineTo(x, halfHeight + y);
        }

        ctx.fillStyle = color;
        ctx.fill();

      } else {
        ctx.strokeStyle = color;
        ctx.stroke();
      }

    };

    if (this.props.selectStart !== this.props.selectEnd) {
      let timePerPoint = (this.duration / this.props.hZoom) / pointsToDraw ;
      let relStartTime = this.props.selectStart - this.props.offset;
      let startPoint = Math.floor(relStartTime / timePerPoint);
      let relEndtTime = this.props.selectEnd - this.props.offset;
      let endPoint = Math.floor(relEndtTime / timePerPoint);

      if (endPoint > 0 && startPoint < pointsToDraw) {
        if (startPoint > 0) {
          draw(0, startPoint, this.props.color, this.props.background);
        }

        draw(Math.max(0, startPoint), Math.min(pointsToDraw, endPoint),
          this.props.selectColor, this.props.selectBackground);

        if (endPoint < pointsToDraw) {
          draw(endPoint, pointsToDraw, this.props.color, this.props.background);
        }
      } else {
        draw(0, pointsToDraw, this.props.color, this.props.background);
      }

    } else {
      draw(0, pointsToDraw, this.props.color, this.props.background);
    }

    return this;

  }

}

export default Waveform;
