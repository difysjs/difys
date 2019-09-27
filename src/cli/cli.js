// import readline from "readline";
import plugin from "./plugin";
import packageJSON from "../../package.json";

const commands = {
	plugin: {
		alias: ["p"],
		call: args => {
			const execAction = plugin[args[0]] || plugin.help();
			return execAction ? execAction(args.slice(1)) : false;
		}
	},
	help: {
		alias: ["h", "--help"],
		call: getHelp
	},
	version: {
		alias: ["v", "-v", "--version"],
		call: () => console.log("v" + packageJSON.version)
	},
	config: {
		alias: ["c", "conf"],
		call: () => console.log("Not implemented yet :(")
	}
};

function getHelp() {
	const commandList = getCommandList()
		.map((c, i) => ((i + 1) % 7 === 0 ? "\n    " + c : c))
		.join(", ");

	console.log(
		`\n\nUsage: difys <command>\n\nWhere <command> is one of:\n    ${commandList}\n\n`
	);
}

function getCommandList() {
	let list = [];

	for (let command in commands) {
		list.push(command);
		list = list.concat(commands[command].alias);
	}
	return list;
}

function getCommandName(name) {
	for (let command in commands) {
		if (command === name || commands[command].alias.includes(name)) {
			return command;
		}
	}
	return false;
}

/*
function question(text, callback) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question(text, answer => {
		callback(answer);
		rl.close();
	});
}
*/

export async function cli(args) {
	args = args.slice(2);
	const command = getCommandName(args[0]);
	const data = args.slice(1);

	if (!command) {
		return commands.help.call();
	}
	await commands[command].call(data);
}
