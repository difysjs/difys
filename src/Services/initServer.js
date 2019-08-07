import express from "express";
import bodyParser from "body-parser";
import { logger } from "../Libs";
import store from "../Modules/Store";

const initServer = (port, password) => {
	const server = express();
	server.set("Secret", password);
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));
	server.listen(port, () => {
		logger.info(`Difys server running on port ${port}`);
	});
	server.get("/", (_req, res) => {
		res.status(301).redirect("https://difys.now.sh/");
	});
	server.post("/api", (req, res) => {
		if (req.body.password === password) {
			let response = {};
			switch (req.body.type) {
				case "all":
					response = store.getState();
					break;
				case "account":
					const state = store.getState();
					if (state.accounts.hasOwnProperty(req.body.account))
						response = store.getState().accounts[req.body.account];
					else response = { message: "Bad request" };
					break;
				default:
					response = { message: "Bad request" };
			}
			res.json(response);
		} else {
			res.json({ message: "Wrong password" });
		}
	});
	server.get("/api", (_req, res) => {
		res.status(301).redirect("https://difys.now.sh/");
	});

	return server;
};

export default initServer;
