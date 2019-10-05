import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { logger } from "../../../Libs";

const { setExtra } = slices.accounts.actions;

export default function IdentificationSuccessMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;
	const extra = {
		nickname: data.nickname,
		accountSessionId: data.login,
		subscribtionEndDate: data.subscriptionEndDate
	};
	if (extra.subscribtionEndDate === 0) {
		logger.warn(`${username} is not subscribed`);
	}
	store.dispatch(setExtra({ username, extra }));
}
