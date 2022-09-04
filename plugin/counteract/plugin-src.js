const Plugin = () => {

	const startCounting = function (deck, options) {

		const debugLog = function (text) {
			if (options.debug) console.log(text);
		}

		if (window.Promise) {

			debugLog("Promise supported");

			return new Promise(function (resolve) {

				let counters = options.counters;

				if (counters) {
					counters.forEach(counter => {

						let resets = counter.reset ? deck.getRevealElement().querySelectorAll(counter.reset) : deck.getRevealElement().querySelectorAll(".slides");

						resets.forEach(reset => {

							let nr = 0;

							if (counter.increment) {

								let increments = reset.querySelectorAll(counter.increment);

								increments.forEach(increment => {

									if (!increment.closest("[data-visibility=hidden]")) {
										nr = nr + 1;
									}

									if (counter.selector) {
										let selectors = increment.querySelectorAll(counter.selector);

										selectors.forEach(selector => {
											selector.setAttribute(`data-count-${counter.name}`, nr);
										});
									} else {
										console.log("No selector defined.")
									}
								});
							} else {
								let selectors = reset.querySelectorAll(counter.selector);
								selectors.forEach(selector => {
									if (!selector.closest("[data-visibility=hidden]")) {
										nr = nr + 1;
									}
									selector.setAttribute(`data-count-${counter.name}`, nr);
								});
							}
						});
					});
				} else {
					console.log("There are no counters defined.");
				}

				if (options.counterstyles) {
					let style = document.createElement('style');
					style.innerHTML = options.counterstyles;
					document.head.appendChild(style);
				}

				resolve();
			});

		} else {
			console.log("Promise not supported");
		}
	};

	const init = function (deck) {

		let defaultOptions = {
			debug: false,
			counters: null
		};

		const defaults = function (options, defaultOptions) {
			for (let i in defaultOptions) {
				if (!options.hasOwnProperty(i)) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig().counteract || {};

		defaults(options, defaultOptions);
		startCounting(deck, options);
	};

	return {
		id: 'counteract',
		init: init
	};
};

export default Plugin;