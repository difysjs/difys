import generateNickname from "../Libs/nicknameGenerator";

for (let i = 0; i < 50; i++) {
	let nickname = generateNickname();

	while (nickname.length > 29) {
		nickname = generateNickname();
	}
	console.log(nickname);
}
