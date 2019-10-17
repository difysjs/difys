import express from "express";
import basicAuth from "express-basic-auth";
import store from "../../Modules/Store";
import slices from "../../Modules/Store/reducers/slices";
import { general } from "../../Config";
import { logger } from "../../Libs";

export default function() {
	const config = general.api.data;

	if (!config.enabled) {
		return;
	}
	const app = express();

	app.use(basicAuth({ users: { admin: config.password } }));
	app.use(express.json());
	app.put("/store", (req, res) => {
		if (typeof req.body.slice === "undefined") {
			res.write("Property 'slice' not found");
			return res.sendStatus(400).end();
		}
		if (typeof req.body.action === "undefined") {
			res.write("Property 'action' not found");
			return res.sendStatus(400).end();
		}
		if (typeof req.body.data === "undefined") {
			res.write("Property 'data' not found");
			return res.sendStatus(400).end();
		}
		const action = slices[req.body.slice].actions[req.body.action];
		store.dispatch(action(req.body.data));
		res.sendStatus(200).end();
	});
	app.post("/store", (req, res) => {
		if (typeof req.body.slice === "undefined") {
			res.write("Property 'slice' not found");
			return res.sendStatus(400).end();
		}
		let data = store.getState()[req.body.slice];

		if (typeof req.body.data !== "undefined") {
			for (const key of req.body.data) {
				data = data[key];
			}
		}
		res.send(data);
	});
	return new Promise(resolve => {
		app.listen(config.port, () => {
			logger.info(
				"DataAPI | Service listening on localhost:" + config.port
			);
			resolve();
		});
	});
}
