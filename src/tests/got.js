import got from "got";
import queryString from "query-string";
import PRIVATE from "./PRIVATE";

(async () => {
	const account = {
		login: PRIVATE.username,
		password: PRIVATE.password,
		long_life_token: false
	};
	try {
		const query = queryString.stringify(account);
		const url = "https://haapi.ankama.com/json/Ankama/v2/Api/CreateApiKey";
		const response = await got.post(url, {
			query,
			body: {
				login: account.login,
				password: account.password
			}
		});
		console.log(response);
	} catch (err) {
		console.error(err);
	}
})();
