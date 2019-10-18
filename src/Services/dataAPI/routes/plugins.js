import * as plugins from "../controllers/pluginsController";

export default function(app) {
	app.route("/plugins").get(plugins.getAll);
}
