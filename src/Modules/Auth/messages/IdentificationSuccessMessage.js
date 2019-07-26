import store from "../../Store";
import { accounts } from "../../Store/reducers/slices";
import { logger } from "../../../Libs";

export default function IdentificationSuccessMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const extra = {
		nickname: data.nickname,
		accountSessionId: data.login,
		subscribtionEndDate: data.subscriptionEndDate
	};
	store.dispatch(accounts.actions.setExtra({ username, extra }));
	if (extra.subscribtionEndDate === 0)
		logger.warn(`${username} is not subscribed`);
}
