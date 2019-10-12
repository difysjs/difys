export default class EventEmitter {
	constructor() {
		this.scope = this;
		this.executingEvent = false;
		this.events = {};
		this.waitingEvents = [];
		this.emittedEvents = [];
	}

	/**
	 * Register an event to the event list
	 *
	 * @param {String} key
	 * @param {Function} callback
	 * @param {Object} scope Reference class or object
	 * @param {String} arrayMethod Push or unshift
	 *
	 * @returns {undefined|null|Number} Depends on the arrayMethod param
	 */
	on(...args) {
		if (args[0] instanceof Function) {
			for (let i = args.length; i--; ) {
				args[i + 1] = args[i];
			}
			args[0] = args[1].name;
		}
		if (args[0] instanceof Array) {
			for (const funcArgs of args[0]) {
				let nextArgs = funcArgs;
				if (!(nextArgs instanceof Array)) {
					nextArgs = [nextArgs];
				}
				if (args[1]) {
					nextArgs.push(args[1]);
				}
				this.on(...nextArgs);
			}
			return;
		}
		if (!this.events[args[0]]) {
			this.events[args[0]] = [];
		}
		let arrayMethod = args.slice(-1);
		if (typeof arrayMethod !== "string") {
			arrayMethod = "push";
		}
		return this.events[args[0]][arrayMethod]({
			scope: args[2] ? args[2] : this.scope,
			callback: args[1]
		});
	}

	/**
	 * Register an event to the list and execute it once
	 *
	 * @param {String} key
	 * @param {Function} callback
	 * @param {Object} scope Reference class or object
	 */
	once(key, callback, scope) {
		const index = this.on(
			key,
			data => {
				this.emittedEvents.push([key, index]);
				if (scope) {
					scope = this.scope;
				}
				callback.call(scope, data);
			},
			scope
		);
	}

	/**
	 * Test if the event key exist
	 *
	 * @param {String} key
	 *
	 * @returns {Array|Boolean}
	 */
	exist(key) {
		return key in this.events ? this.events[key] : false;
	}

	/**
	 * Delete an event to the event list
	 *
	 * @param {String} key
	 * @param {Number} index
	 */
	off(key, index = 0) {
		if (key instanceof Array) {
			for (const instance of key) {
				this.off(instance);
			}
			return;
		}
		if (typeof index === "function") {
			for (let i = 0; i < this.events[key].length; i++) {
				if (this.events[key][i].toString() === index.toString()) {
					this.events[key].splice(i, 1);
				}
			}
		} else {
			if (this.events[key].length > 1) {
				this.events[key].splice(index - 1, 1);
			} else {
				delete this.events[key];
			}
		}
	}

	/**
	 * Execute every callbacks on a specific key
	 *
	 * @param {String} key
	 * @param  {Array|Object} data the data sent to callbacks
	 */
	emit(key, data) {
		if (key in this.events) {
			for (const event of this.events[key]) {
				if (this.executingEvent) {
					this.waitingEvents.push({ ...event, data });
				} else {
					this.executingEvent = true;
					event.callback.call(event.scope, data);

					let waitingEventsLength = this.waitingEvents.length;

					while (waitingEventsLength) {
						const waitingEvents = this.waitingEvents.slice(0);
						this.waitingEvents.splice(0, waitingEventsLength);
						let next = waitingEvents[0].callback.call(
							waitingEvents[0].scope,
							waitingEvents[0].data
						);
						for (let i = 1; i < waitingEventsLength; i++) {
							next = next.then(() =>
								waitingEvents[i].callback.call(
									waitingEvents[i].scope,
									waitingEvents[i].data
								)
							);
						}
						next.then(() => {
							waitingEventsLength = this.waitingEvents.length;
						});
					}
					this.executingEvent = false;
				}
			}
			for (const [key, index] of this.emittedEvents) {
				this.off(key, index);
			}
			this.emittedEvents = [];
		}
	}
}
