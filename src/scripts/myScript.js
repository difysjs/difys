const CONFIG = {

};

function* start(username) {
	yield Plugin.Chat.sendMsg(username);
	yield Plugin.Chat.sendMsg(username);

	yield Plugin.Map.goToMap(0, 12);
	// or
	yield Plugin.Map.goToArea("Astrub");
	// or
	yield Plugin.Map.goToSubArea("Cité d'astrub");

	// detailed move actions
	yield Plugin.Map.interact("Door");
	// A LOT
}

// In ScriptLoader somewhere

for (let textCode of scripts) {
	(function() {
		const Plugin = PluginLoader.plugins;
		eval(textCode);
		const generator = start(username);
		generator.next();
	})();
}
