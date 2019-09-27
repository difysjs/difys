import fs from "fs";
import general from "./general.json";
import constants from "./constants";
import modules from "./modules";
import status from "./status";
var accountsList = [];

if (!fs.existsSync("./src/Config/accounts.json")) {
	console.log(
		"Config/accounts.js file doesn't exist\nPlease read the documentation to setup your accounts at\nhttps://difysjs.github.io/introduction/configuration#accounts"
	);
	process.exit();
} else {
	accountsList = require("./accounts.json");
}

export { general, accountsList, modules, constants, status };
