
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * CounterAct.js for Reveal.js 
 * Version 1.0.0
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/


var Plugin = function Plugin() {
  var startCounting = function startCounting(deck, options) {
    var debugLog = function debugLog(text) {
      if (options.debug) console.log(text);
    };

    if (window.Promise) {
      debugLog("Promise supported");
      return new Promise(function (resolve) {
        var counters = options.counters;

        if (counters) {
          counters.forEach(function (counter) {
            var resets = counter.reset ? deck.getRevealElement().querySelectorAll(counter.reset) : deck.getRevealElement().querySelectorAll(".slides");
            resets.forEach(function (reset) {
              var nr = 0;

              if (counter.increment) {
                var increments = reset.querySelectorAll(counter.increment);
                increments.forEach(function (increment) {
                  if (!increment.closest("[data-visibility=hidden]")) {
                    nr = nr + 1;
                  }

                  if (counter.selector) {
                    var selectors = increment.querySelectorAll(counter.selector);
                    selectors.forEach(function (selector) {
                      selector.setAttribute("data-count-".concat(counter.name), nr);
                    });
                  } else {
                    console.log("No selector defined.");
                  }
                });
              } else {
                var selectors = reset.querySelectorAll(counter.selector);
                selectors.forEach(function (selector) {
                  if (!selector.closest("[data-visibility=hidden]")) {
                    nr = nr + 1;
                  }

                  selector.setAttribute("data-count-".concat(counter.name), nr);
                });
              }
            });
          });
        } else {
          console.log("There are no counters defined.");
        }

        if (options.counterstyles) {
          var style = document.createElement('style');
          style.innerHTML = options.counterstyles;
          document.head.appendChild(style);
        }

        resolve();
      });
    } else {
      console.log("Promise not supported");
    }
  };

  var init = function init(deck) {
    var defaultOptions = {
      debug: false,
      counters: null
    };

    var defaults = function defaults(options, defaultOptions) {
      for (var i in defaultOptions) {
        if (!options.hasOwnProperty(i)) {
          options[i] = defaultOptions[i];
        }
      }
    };

    var options = deck.getConfig().counteract || {};
    defaults(options, defaultOptions);
    startCounting(deck, options);
  };

  return {
    id: 'counteract',
    init: init
  };
};

export { Plugin as default };
