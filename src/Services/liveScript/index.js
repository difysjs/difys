import express from "express";
import got from "got";
import path from "path";
import { general, accountsList } from "../../Config";
import { logger, pluginPaths } from "../../Libs";
import ScriptLoader from "../../Loaders/scriptLoader";

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
	var fnStr = func.toString().replace(STRIP_COMMENTS, "");
	var result = fnStr
		.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
		.match(ARGUMENT_NAMES);
	if (result === null) result = [];
	return result;
}

export default function() {
	const config = general.api.livescript;
	const app = express();
	const index = "index.html";
	const assetsPath = "/src";

	app.use(express.static(path.join(__dirname, assetsPath)));
	app.use(express.json());
	app.get("/", (req, res) =>
		res.sendFile(path.join(__dirname, assetsPath, index))
	);
	app.get("/plugins", (req, res) => {
		const plugins = {};

		for (const pluginPath of pluginPaths) {
			const Instance = require(pluginPath).default;
			const Plugin = new Instance();
			const pluginName = pluginPath.split(path.sep).pop();
			const methods = Object.getOwnPropertyNames(
				Object.getPrototypeOf(Plugin)
			).slice(1);
			plugins[pluginName] = [];

			for (const methodName of methods) {
				const methodLength = plugins[pluginName].push({
					name: methodName,
					arguments: []
				});
				const pluginData = plugins[pluginName][methodLength - 1];
				const args = getParamNames(Plugin[pluginData.name]);
				var defaultParam = args.indexOf("=");

				while (defaultParam > -1) {
					args.splice(defaultParam, 2);
					defaultParam = args.indexOf("=");
				}
				pluginData.arguments = args;
			}
		}
		res.send({
			plugins,
			accountsName: Object.keys(accountsList)
		});
	});
	app.post("/store", async (req, res) => {
		if (!("authorization" in req.headers)) {
			logger.error("LiveScript | Unauthorized request");
			return res.sendStatus(401).end();
		}
		const storeConfig = general.api.store;
		const auth = Buffer.from(
			req.headers.authorization.split(" ")[1],
			"base64"
		)
			.toString("utf8")
			.split(":");

		if (auth[1] !== storeConfig.password) {
			logger.error("LiveScript | Unauthorized request");
			return res.sendStatus(401).end();
		}
		try {
			const response = await got.post(
				"http://localhost:" + storeConfig.port,
				{
					headers: {
						Authorization: req.headers.authorization
					},
					json: true,
					body: req.body
				}
			);
			res.send(response.body);
		} catch (error) {
			res.sendStatus(500).end();
		}
	});
	app.post("/", (req, res) => {
		if (!("authorization" in req.headers)) {
			logger.error("LiveScript | Unauthorized request");
			return res.sendStatus(401).end();
		}
		const auth = Buffer.from(
			req.headers.authorization.split(" ")[1],
			"base64"
		)
			.toString("utf8")
			.split(":");

		if (auth[1] !== config.password) {
			logger.error("LiveScript | Unauthorized request");
			return res.sendStatus(401).end();
		}
		if (Object.keys(req.body).length == 0) {
			return res.end();
		}
		if (typeof req.body.username == "undefined") {
			logger.error(
				"LiveScript | Required 'username' parameter not found"
			);
			return res.sendStatus(400).end();
		}
		if ("code" in req.body) {
			const scriptLoader = new ScriptLoader();
			scriptLoader.executeScript(
				req.body.username,
				"LiveScript",
				req.body.code
			);
			res.end();
		} else {
			if (typeof req.body.plugin == "undefined") {
				logger.error(
					"LiveScript | Required 'plugin' parameter not found"
				);
				return res.sendStatus(400).end();
			}
			if (typeof req.body.method == "undefined") {
				logger.error(
					"LiveScript | Required 'method' parameter not found"
				);
				return res.sendStatus(400).end();
			}
			if (typeof req.body.data == "undefined") {
				logger.error(
					"LiveScript | Required 'data' parameter not found"
				);
				return res.sendStatus(400).end();
			}
			(async () => {
				try {
					const generator = global.Plugin[req.body.plugin][
						req.body.method
					](...req.body.data);

					while (true) {
						const next = await generator.next(req.body.username);
						await next.value;

						if (next.done == true) {
							break;
						}
					}
				} catch (error) {
					logger.error("LiveScript | " + error);
				}
			})();
			res.end();
		}
	});
	app.listen(config.port, () =>
		logger.info("LiveScript | Server listening on localhost:" + config.port)
	);
}
