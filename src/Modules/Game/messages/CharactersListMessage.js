import { accountsList } from "../../../Config";
import store from "../../Store";
import { accounts } from "../../Store/reducers/slices";

export default function CharactersListMessage(payload) {
	const { socket, data } = payload;
	const characters = data.characters;
	const username = socket.account.username;
	const { setSelectedCharacter, setStatus } = accounts.actions;

	store.dispatch(setStatus({ username, status: "SELECTING CHARACTER" }));

	let selectedCharacter;
	if (!accountsList[username].directLogin) {
		for (let charIndex = 0; charIndex < characters.length; charIndex++) {
			if (characters[charIndex].name === accountsList[username].character)
				selectedCharacter = characters[charIndex];
			break;
		}
	} else {
		selectedCharacter = characters[0];
	}
	selectedCharacter = {
		breed: selectedCharacter.breed,
		characterName: selectedCharacter.name,
		level: selectedCharacter.level,
		id: selectedCharacter.id,
		look: selectedCharacter.entityLook,
		sex: selectedCharacter.sex
	};

	store.dispatch(
		setSelectedCharacter({
			username,
			selectedCharacter
		})
	);

	store.dispatch(setStatus({ username, status: "INITIATING GAME" }));

	socket.sendMessage("CharacterSelectionMessage", {
		id: selectedCharacter.id
	});
}
