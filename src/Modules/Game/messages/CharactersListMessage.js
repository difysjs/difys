import { accountsList } from "../../../Config";
import store from "../../Store";
import slices from "../../Store/reducers/slices";

const { setSelectedCharacter, setStatus } = slices.accounts.actions;

export default function CharactersListMessage(payload) {
	const { socket, data } = payload;
	const characters = data.characters;
	const username = socket.account.username;

	store.dispatch(setStatus({ username, status: "SELECTING CHARACTER" }));

	const account = accountsList[username];
	const character = account.directLogin
		? characters[0]
		: characters.find(c => c.name === account.character);

	store.dispatch(
		setSelectedCharacter({
			username,
			selectedCharacter: {
				id: character.id,
				breed: character.breed,
				characterName: character.name,
				level: character.level,
				look: character.entityLook,
				sex: character.sex
			}
		})
	);
	store.dispatch(setStatus({ username, status: "INITIATING GAME" }));

	socket.sendMessage("CharacterSelectionMessage", {
		id: character.id
	});
}
