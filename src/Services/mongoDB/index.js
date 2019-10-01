import mongoose from "mongoose";
import fs from "fs";
import path from "path";

function connect() {
	return new Promise(async (resolve, reject) => {
		mongoose.connect("mongodb://localhost:27017/gamedata", {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const db = mongoose.connection;
		db.on("error", reject);
		db.once("open", () => {
			console.log(
				`\x1b[44m Service \x1b[0m MongoDB - \x1b[32mConnected\x1b[0m`
			);
			resolve();
		});
	});
}

function loadSchemas() {
	return new Promise((resolve, reject) => {
		const schemaPath = path.join(__dirname, "/schema");

		fs.readdir(schemaPath, (error, files) => {
			if (!error) {
				for (let fileName of files) {
					require(path.join(schemaPath, fileName));
				}
				resolve();
			} else {
				reject(error);
			}
		});
	});
}

export default { connect, loadSchemas };
