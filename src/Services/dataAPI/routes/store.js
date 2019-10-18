import * as store from "../controllers/storeController";

export default function(app) {
	app.route("/store")
		.put(store.callAction)
		.post(store.getState);
}
