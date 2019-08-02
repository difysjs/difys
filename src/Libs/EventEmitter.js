export default class EventEmitter {
	constructor() {
		this.scope = this;
		this.backLog = true;
		this.events = {};
		this.backLogs = [];
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
			for (let funcArgs of args[0]) {
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
		let index = this.on(
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
			for (let instance of key) {
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
	 * Execute callbacks emitted when their key didn't exist
	 */
	executeBackLog() {
		var promises = [];

		for (let event of this.backLogs) {
			let params = [...event];
			params.splice(0, 2);
			let callback = event[1].call(event[0], ...params);

			if (callback instanceof Promise) {
				promises.push(callback);
			}
		}
		this.backLogs = [];
		return Promise.all(promises);
	}

	/**
	 * Execute every callbacks on a specific key
	 *
	 * @param {String} key
	 * @param  {Array|Object} data the data sent to callbacks
	 */
	emit(key, data) {
		if (key in this.events) {
			for (let event of this.events[key]) {
				if (this.backLog) {
					try {
						event.callback.call(event.scope, data);
					} catch (e) {
						console.log(e);
						this.backLogs.push([event.scope, event.callback, data]);
					}
				} else {
					event.callback.call(event.scope, data);
				}
			}
			for (let [key, index] of this.emittedEvents) {
				this.off(key, index);
			}
			this.emittedEvents = [];
		}
	}
}
