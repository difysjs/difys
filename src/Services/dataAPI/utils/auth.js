import { general } from "../../../Config";

export default function(req) {
	const authorization = req.headers.authorization;

	if (typeof authorization != "string") {
		return false;
	}
	const auth = authorization.split(" ");

	if (typeof auth[1] != "string") {
		return false;
	}
	const AuthType = auth[0];
	const user = Buffer.from(auth[1], "base64")
		.toString()
		.split(":");

	if (user.length != 2) {
		return false;
	}
	const username = user[0];
	const password = user[1];

	switch (AuthType) {
		case "Basic":
			return username == "admin" && password == general.api.data.password;
		default:
			return false;
	}
}
