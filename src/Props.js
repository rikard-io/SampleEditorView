/**
 * "Magic" Properties with bindings to react to changes
 * @Author: Rikard Lindstrom <code@rikard.io>
 * @Filename: Props.js
 */

import eventMixin from './eventMixin';

class Props {

  /**
  * @constructor
  * @param {Object[]]} props - Properties that will  me merged right to left.
  */
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
          this.$triggerDeferred('defered_change');
          this.$trigger('change', k, v);
          this.$trigger(`change:${k}`, v, oldV);
        }
      });
    });

    this.$privateProps = propsObject;
    this.$keys = Object.keys(propsObject);
  }

  /**
  * Observe a value for changes, much like .$on but also initializes the callback
  * with current value
  * @param {string|string[]]} key - Key or keys to observe
  * @param {function} cb - Callback
  * @param {Object} ctx - Context for callback
  */
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

  /**
  * Unobserve a value for changes
  * @param {string|string[]]} key - Key or keys to observe
  * @param {function} cb - Callback
  * @param {Object} ctx - Context for callback
  */
  $unobserve(key, cb, ctx) {
    if (Array.isArray(key)) {
      key.forEach(k => this.$unobserve(k, cb, ctx));
      return this;
    }
    this.$off(`change:${key}`, cb, ctx);
    return this;
  }

  /**
  * Wrapper for $observe, sets the properties on the target instead of using a callback
  * @param {Object} target - Target context
  * @param {string|string[]]} key - Key or keys to observe
  */
  $bind(target, ...keys) {
    keys.forEach(k => {
      this.$observe(k, function (v) {
        target[ k ] = v;
      });
    });

    return this;
  }

  /**
  * Wrapper for $unobserve
  * @param {Object} target - Target context
  * @param {string|string[]]} key - Key or keys to observe
  */
  $unbind(target, ...keys) {
    if (keys && keys.length) {
      keys.forEach(k => { this.$unobserve(k, null, target); });
    } else {
      this.$off(null, null, target);
    }

    return this;
  }

  /**
  * Reversed $bind:ing between Props objects with filters.
  * @param {Props} otherProps - Another instance of Props
  * @param {Object} map - Mapping specification in the form of {propName: filterFn}
  */
  $map(otherProps, map) {
    Object.keys(map).forEach(k => {
      otherProps.$observe(k, v => {
        this[ k ] = map[ k ](v);
      });
    });

    return this;
  }

  /**
  * Reversed $bind:ing between Props objects.
  * @param {Props} otherProps - Another instance of Props
  * @param {string[]]} keys - Keys to observe
  */
  $link(otherProps, keys = null) {
    keys = keys || Object.keys(this.$privateProps).filter(k => otherProps.$privateProps[ k ] !== undefined);
    otherProps.$bind(this, ...keys);
    return this;
  }

  /**
  * Reversed $unbind:ing between Props objects with filters.
  * @param {Props} otherProps - Another instance of Props
  * @param {string[]]} keys - Keys to stop observing
  */
  $unlink(otherProps, keys = null) {
    keys = keys || Object.keys(this.$privateProps).filter(k => otherProps.$privateProps[ k ] !== undefined);
    otherProps.$unbind(this, ...Object.keys(this.$privateProps));
    return this;
  }
}

Object.assign(Props.prototype, eventMixin);

export default Props;
