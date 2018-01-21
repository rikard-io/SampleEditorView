/**
*   Simple event $triggering and listening mixin, somewhat borrowed from Backbone
*   @author Rikard Lindstrom
*   @mixin
*/
'use strict';

export default {

  /**
  *   Register a listener
  */
  $on: function (name, callback, context) {
  /** @member */
    this._events = this._events || {};

    let events = this._events[ name ] || (this._events[ name ] = []);

    events.push({
      callback: callback,
      ctxArg: context,
      context: context || this
    });

    return this;
  },

  /**
  *   Unregister a listener
  */
  $off: function (name, callback, context) {
    let i, len, listener, retain;

    if (!this._events || !this._events[ name ]) {
      return this;
    }

    if (!name && !callback && !context) {
      this._events = {};
    }

    let eventListeners = this._events[ name ];

    if (eventListeners) {
      retain = [];
      // silly redundancy optimization, might be better to keep it DRY
      if (callback && context) {
        for (i = 0, len = eventListeners.length; i < len; i++) {
          listener = eventListeners[ i ];
          if (callback !== listener.callback && context !== listener.ctxArg) {
            retain.push(eventListeners[ i ]);
          }
        }
      } else if (callback) {
        for (i = 0, len = eventListeners.length; i < len; i++) {
          listener = eventListeners[ i ];
          if (callback !== listener.callback) {
            retain.push(eventListeners[ i ]);
          }
        }
      } else if (context) {
        for (i = 0, len = eventListeners.length; i < len; i++) {
          listener = eventListeners[ i ];
          if (context !== listener.ctxArg) {
            retain.push(eventListeners[ i ]);
          }
        }
      }

      this._events[ name ] = retain;
    } else if (context || callback) {
      Object.keys(this._events).forEach((k) => {
        this.$off(k, callback, context);
      });
    }

    if (!this._events[ name ].length) {
      delete this._events[ name ];
    }

    return this;
  },

  /**
  *   $trigger an event
  */
  $trigger: function (name) {
    if (!this._events || !this._events[ name ]) {
      return this;
    }

    let i, args, binding, listeners;

    listeners = this._events[ name ];

    args = [].splice.call(arguments, 1);
    for (i = listeners.length - 1; i >= 0; i--) {
      binding = listeners[ i ];
      binding.callback.apply(binding.context, args);
    }

    return this;
  },

  /**
  * Triggered on the next heartbeat to avoid mass triggering
  * when changing multiple props at once
  */
  $triggerDeferred(event) {
    this._changeBatchTimers = this._changeBatchTimers || {};
    if (this._changeBatchTimers[ event ] == null) {
      this._changeBatchTimers[ event ] = setTimeout(()=>{
        this.$trigger(event);
        this._changeBatchTimers[ event ] = null;
      }, 50);
    }
  }

};
