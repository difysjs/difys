import fs from "fs";
import general from "./general.json";
import constants from "./constants";
import modules from "./modules";
import status from "./status";

if (!fs.existsSync("./src/Config/accounts.json")) {
	console.log(
		"Config/accounts.json file doesn't exist\nPlease read the documentation to setup your accounts at\nhttps://difysjs.github.io/introduction/configuration#accounts"
	);
	process.exit();
}
const accountsList = require("./accounts.json");

export { general, accountsList, modules, constants, status };
