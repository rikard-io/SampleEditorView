/**
 * @Author: Rikard Lindstrom <code@rikard.io>
 * @Filename: LoopMarker.js
 */

import CanvasUI from './CanvasUI';

const defaultProperties = {
  height: 10,
  color: '#222'
};

class LoopMarker extends CanvasUI {

  constructor(props) {

    super(defaultProperties, props);

  }

  render() {
    let ctx = this.ctx;

    // full clear and width / height set
    let w = this.props.width;
    let h = this.props.height;

    ctx.fillStyle = this.props.color;
    ctx.fillRect(0, 0, w, h);

    return this;
  }

}

export default LoopMarker;
