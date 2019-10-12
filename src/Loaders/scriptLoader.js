/* eslint-disable no-eval */
/* eslint-disable no-undef */
import fs from "fs";
import store from "../Modules/Store";
import { accountsList } from "../Config";
import { logger } from "../Libs";

export default class ScriptLoader {
	async mount(moduleLoader) {
		this.connections = moduleLoader.connections;

		for (const username in accountsList) {
			const account = accountsList[username];
			const scriptName = account.script;

			if (
				scriptName &&
				(!("disabled" in account) || account.disabled === false)
			) {
				const unSubscribe = store.subscribe(() => {
					if (store.getState().accounts[username].status == "IDLE") {
						this.runScript(username, scriptName);
						unSubscribe();
					}
				});
			}
		}
	}

	async runScript(username, scriptName) {
		let textCode;
		try {
			textCode = await this.getScriptFile(scriptName);
		} catch (error) {
			logger.warn(`Script ${scriptName} not found`);
			return false;
		}
		Object.defineProperty(global, "Account", {
			get: () => {
				return store.getState().accounts[username];
			},
			enumerable: true
		});
		this.executeScript(username, scriptName, textCode);
	}

	async executeScript(username, scriptName, textCode) {
		const connection = this.connections[username];
		const onDisconnect = payload => payload.socket.account.reconnect();
		connection.eventEmitter.on("serverDisconnecting", onDisconnect);
		try {
			eval.call(global, textCode);
		} catch (error) {
			return logger.error(error);
		}
		const generator = start();
		logger.info(`Script ${scriptName} executed`);
		let s = 1;
		let nextValue;

		while (true) {
			const next = generator.next(nextValue);
			nextValue = undefined;

			if (this.isGeneratorFunction(next.value)) {
				const generator2 = next.value;

				while (true) {
					const next2 = await generator2.next(username);
					nextValue = await next2.value;

					if (next2.done == true) {
						break;
					}
				}
			}
			if (next.done === true) {
				logger.info(`Script ${scriptName} ended`);
				connection.eventEmitter.off(
					"serverDisconnecting",
					onDisconnect
				);
				break;
			}
			if (s == 5000) {
				logger.error("Infinite loop detected in script " + scriptName);
				break;
			}
			s++;
		}
	}

	isGeneratorFunction(fn) {
		try {
			const name = fn.toString();
			if (
				name == "[object Generator]" ||
				name == "[object AsyncGenerator]"
			) {
				return true;
			}
		} catch (error) {}

		return false;
	}

	getScriptFile(fileName) {
		return new Promise((resolve, reject) => {
			fs.readFile(`./src/Scripts/${fileName}.js`, (error, data) =>
				error ? reject(error) : resolve(data.toString())
			);
		});
	}
}
