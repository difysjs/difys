import shell from "shelljs";

function exec(command) {
	return new Promise(resolve =>
		shell.exec(command, {}, (code, value, error) => {
			if (error) {
				console.log(error);
				process.exit(1);
			}
			resolve({ code, value });
		})
	);
}

function yarn(command, ...args) {
	return exec(`yarn ${command} ${args.join(" ")}`);
}

function add(packages, isDev = false) {
	if (packages.length == 0) {
		return false;
	}
	isDev = isDev ? "--dev" : "";
	return yarn("add", packages.join(" "), isDev);
}

function remove(packages, isDev = false) {
	if (packages.length == 0) {
		return false;
	}
	isDev = isDev ? "--dev" : "";
	return yarn("remove", packages.join(" "), isDev);
}

function upgrade(packages, isDev = false) {
	if (packages.length == 0) {
		return false;
	}
	isDev = isDev ? "--dev" : "";
	return yarn("upgrade", packages.join(" "), isDev);
}

function install() {
	return yarn("install");
}

export default {
	add,
	remove,
	upgrade,
	install
};
