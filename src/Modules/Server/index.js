import { logger } from "../../Libs";
import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

export default class Server {
	constructor(port, password) {
		this.connections = {};

		// ********* Express Setup ********* //
		this.server = express();
		this.server.use(bodyParser.json());
		this.server.use(bodyParser.urlencoded({ extended: true }));
		// this.server.use(this.auth);
		this.server.use(
			"/",
			graphqlHTTP({
				schema: schema,
				rootValue: root,
				graphiql: true
			})
		);
		this.server.listen(port, () => {
			logger.info(`SERVER | Difys server running on port ${port}`);
		});
	}

	mount(connections) {
		this.connections = connections;

		logger.info(
			"SERVER | You can now send API actions to the difys server."
		);
	}

	auth(req, res, next) {
		if (req.query.password === this.password) {
			next();
		} else {
			res.json({ status: 403, message: "Wrong password!" });
		}
	}
}
