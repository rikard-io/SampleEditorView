/**
 * "Magic" Properties with bindings to react to changes
 * @Author: Rikard Lindstrom <hi@rikard.io>
 * @Filename: Props.js
 */

import eventMixin from './eventMixin';

class Props {

  constructor(...props) {

    props = props.filter(p => !!p);

    let propsObject = props.reduce((a, p) => { return Object.assign(a, p); }, {});

    Object.keys(propsObject).forEach(k => {
      Object.defineProperty(this, k, {
        get() {
          return propsObject[ k ];
        },
        set(v) {
          let oldV = propsObject[ k ];

          propsObject[ k ] = v;
          this.$triggerDeferedChange();
          this.$trigger('change', k, v);
          this.$trigger(`change:${k}`, v, oldV);
        }
      });
    });
    this.$changeBatchTimer = null;
    this.$privateProps = propsObject;
    this.$keys = Object.keys(propsObject);
  }

  $triggerDeferedChange() {
  // change is triggered on the next heartbeat to avoid mass triggering
  // when changing multiple props at once
    if (this.$changeBatchTimer === null) {
      this.$changeBatchTimer = setTimeout(()=>{
        this.$trigger('defered_change');
        this.$changeBatchTimer = null;
      }, 50);
    }
  }

  $observe(key, cb, ctx = this) {
    if (Array.isArray(key)) {
      key.forEach(k => this.$observe(k, cb, ctx));
      return this;
    }
    if (this.$privateProps[ key ] === undefined) throw new Error('Can\' observe undefined prop ' + key);
    cb.call(ctx, this.$privateProps[ key ]);
    this.$on(`change:${key}`, cb, ctx);
    return this;
  }

  $unobserve(key, cb, ctx) {
    if (Array.isArray(key)) {
      key.forEach(k => this.$unobserve(k, cb, ctx));
      return this;
    }
    this.$off(`change:${key}`, cb, ctx);
    return this;
  }

  $bind(ctx, ...keys) {
    keys.forEach(k => {
      this.$observe(k, function (v) {
        ctx[ k ] = v;
      });
    });

    return this;

  }

  $unbind(ctx, ...keys) {
    if (keys && keys.length) {
      keys.forEach(k => { this.$unobserve(k, null, ctx); });
    } else {
      this.$off(null, null, ctx);
    }

    return this;

  }

  $map(otherProps, map) {
    Object.keys(map).forEach(k => {
      otherProps.$observe(k, v => {
        this[ k ] = map[ k ](v);
      });
    });

    return this;

  }

  $link(otherProps, keys = null) {
    keys = keys || Object.keys(this.$privateProps).filter(k => otherProps.$privateProps[ k ] !== undefined);
    otherProps.$bind(this, ...keys);
    return this;
  }

  $unlink(otherProps, keys = null) {
    keys = keys || Object.keys(this.$privateProps).filter(k => otherProps.$privateProps[ k ] !== undefined);
    otherProps.$unbind(this, ...Object.keys(this.$privateProps));
    return this;
  }
}

Object.assign(Props.prototype, eventMixin);

export default Props;
