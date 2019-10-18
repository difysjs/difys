import fs from "fs";
import path from "path";
import express from "express";
import { general } from "../../Config";
import { logger } from "../../Libs";

const config = {
	name: "Data API",
	port: general.api.data.port
};
const routePath = path.join(__dirname, "routes");
const routes = fs.readdirSync(routePath);

export default function() {
	return new Promise(resolve => {
		const app = express();
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		for (const filename of routes) {
			const Route = require(path.join(routePath, filename));
			Route.default(app);
		}
		app.listen(config.port, () => {
			logger.info(
				`${config.name} | Server listening on localhost:${config.port}`
			);
			resolve();
		});
	});
}
