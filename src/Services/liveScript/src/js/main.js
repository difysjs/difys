function App(data) {
	// EDITOR
	const editorElement = document.getElementById("scriptCode");
	const scriptSection = document.querySelector("section#client");
	const editor = ace.edit("scriptCode");
	var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
	editor.session.setMode(new JavaScriptMode());
	editor.setTheme("ace/theme/chrome");
	editorElement.style.height =
		(document.body.offsetHeight - scriptSection.offsetHeight) / 1.5 + "px";

	const clientSection = document.querySelector("section#client");
	const scriptContent = clientSection.querySelector("div.row#script");
	const commandContent = clientSection.querySelector("div.row#command");
	const switchSection = clientSection.querySelector(".switchSection");
	const accountList = clientSection.querySelectorAll("select#usernames");
	const pluginList = clientSection.querySelector("select#plugins");
	const methodList = clientSection.querySelector("ul#methods");
	const runCommandButton = clientSection.querySelector("button#runCommand");
	const sendScriptButton = clientSection.querySelector("button#sendScript");
	const storeDataPassword = clientSection.querySelector(
		"input#storagePassword"
	);
	const commandData = clientSection.querySelectorAll("input#data");
	const commandDataContainer = commandData[0].parentElement;
	const commandDataElement = commandData[0].cloneNode(true);
	commandDataElement.value = "";

	const loadMethods = list => {
		while (methodList.firstChild) {
			methodList.firstChild.remove();
		}
		for (const method of list) {
			const li = document.createElement("li");
			li.className = "list-group-item";
			li.innerHTML = `<strong>${
				method.name
			}</strong>(${method.arguments.join(", ")})`;
			li.addEventListener("click", () => {
				for (const child of Array.from(li.parentElement.children)) {
					if (child.classList.contains("active")) {
						child.classList.remove("active");
					}
				}
				li.classList.add("active");
				const dataElement = commandDataElement.cloneNode(true);

				while (commandDataContainer.firstChild) {
					commandDataContainer.firstChild.remove();
				}
				for (const argument of method.arguments) {
					dataElement.placeholder = argument;
					commandDataContainer.appendChild(
						dataElement.cloneNode(true)
					);
				}
			});
			methodList.appendChild(li);
		}
	};

	for (const username of data.accountsName) {
		const option = document.createElement("option");
		option.textContent = username;

		accountList[0].appendChild(option);
		accountList[1].appendChild(option.cloneNode(true));
	}
	for (const pluginName in data.plugins) {
		const option = document.createElement("option");
		option.textContent = pluginName;
		pluginList.appendChild(option);
	}
	pluginList.addEventListener("change", () => {
		const plugin = pluginList.value;
		loadMethods(data.plugins[plugin]);
		methodList.firstChild.classList.add("active");
	});
	accountList[0].selectedIndex = "0";
	accountList[1].selectedIndex = "0";
	pluginList.selectedIndex = "0";
	loadMethods(data.plugins[pluginList.value]);
	methodList.firstChild.classList.add("active");

	switchSection.addEventListener("click", () => {
		if (switchSection.textContent.includes("Envoyer une commande")) {
			switchSection.innerHTML =
				"Exécuter un script " + '<i class="fas fa-angle-double-right">';
			scriptContent.parentElement.style.display = "none";
			commandContent.parentElement.style.display = "block";
		} else {
			switchSection.innerHTML =
				"Envoyer une commande " +
				'<i class="fas fa-angle-double-right">';
			scriptContent.parentElement.style.display = "block";
			commandContent.parentElement.style.display = "none";
		}
	});
	sendScriptButton.addEventListener("click", () => {
		const username = clientSection.querySelector(
			"div.row#script select#usernames"
		);
		sendRequest({
			username: username.value,
			code: editor.getValue()
		}).catch(console.log);
	});
	runCommandButton.addEventListener("click", () => {
		const username = clientSection.querySelector(
			"div.row#command select#usernames"
		);
		sendRequest({
			username: username.value,
			plugin: pluginList.value,
			method: Array.from(methodList.children).find(
				el => el.classList.contains("active").textContent
			),
			data: JSON.parse(
				Array.from(clientSection.querySelectorAll("input#data")).map(
					el => el.value
				)
			)
		}).catch(console.log);
	});
}

function fetchStoreData(password, slice = "accounts") {
	fetch("/store", {
		method: "POST",
		headers: new Headers({
			Authorization: "Basic " + window.btoa("admin:" + password),
			"Content-Type": "application/json"
		}),
		body: JSON.stringify({ slice })
	})
		.then(response => response.json())
		.then(console.log);
}

function sendRequest(body, responseType = "text") {
	return fetch("/", {
		method: "POST",
		headers: new Headers({
			Authorization,
			"Content-Type": "application/json"
		}),
		body: JSON.stringify(body)
	}).then(response => response[responseType]());
}
