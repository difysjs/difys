import store from "../../Store";
import slices from "../../Store/reducers/slices";
import { logger } from "../../../Libs";

const {
	setNickname,
	setAccountSessionId,
	setSubscribtionEndDate
} = slices.accounts.actions;

export default function IdentificationSuccessMessage(payload) {
	const { socket, data } = payload;
	const username = socket.account.username;

	if (data.subscriptionEndDate === 0) {
		logger.warn(`${username} is not subscribed`);
	}
	store.dispatch(setNickname({ username, nickname: data.nickname }));
	store.dispatch(setAccountSessionId({ username, sessionId: data.login }));
	store.dispatch(
		setSubscribtionEndDate({ username, date: data.subscriptionEndDate })
	);
}
