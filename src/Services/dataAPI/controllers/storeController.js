import store from "../../../Modules/Store";
import slices from "../../../Modules/Store/reducers/slices";
import auth from "../utils/auth";

export function callAction(req, res) {
	if (auth(req) === false) {
		return res.status(401).send("Invalid user");
	}
	if (typeof req.body.slice === "undefined") {
		return res.status(400).send("Property 'slice' not found in body");
	}
	if (typeof req.body.action === "undefined") {
		return res.status(400).send("Property 'action' not found in body");
	}
	if (typeof req.body.data === "undefined") {
		return res.status(400).send("Property 'data' not found in body");
	}
	const slice = req.body.slice;

	if (!(slice in slices)) {
		return res.status(400).send(`Slice '${slice}' not found`);
	}
	const actions = slices[slice].actions;
	const action = req.body.action;

	if (!(action in actions)) {
		return res.status(400).send(`Action '${action}' not found`);
	}
	store.dispatch(actions[action](req.body.data));
	res.sendStatus(200).end();
}

export function getState(req, res) {
	if (auth(req) === false) {
		return res.status(401).send("Invalid user");
	}
	if (typeof req.body.slice === "undefined") {
		return res.status(400).send("Property 'slice' not found in body");
	}
	const state = store.getState();
	const slice = req.body.slice;

	if (!(slice in state)) {
		return res.status(400).send(`Slice '${slice}' not found`);
	}
	let data = state[slice];

	if (typeof req.body.data !== "undefined") {
		for (const key of req.body.data) {
			if (!(key in data)) {
				return res.status(400).send(`Key '${key}' doesn't exist`);
			}
			data = data[key];
		}
	}
	res.send(data);
}
