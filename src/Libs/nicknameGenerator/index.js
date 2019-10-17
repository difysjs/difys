import words from "./words.json";
import nouns from "./nouns.json";
import verbs from "./verbs.json";

const numbers = "1234567890";

function randomIndex(array) {
	return Math.floor(Math.random() * (array.length - 0) + 0);
}

function randomValue(array) {
	return array[Math.floor(Math.random() * (array.length - 0) + 0)];
}

function getRandomNumbers(min, max) {
	let string = "";
	const digitCount = Math.round(Math.random() * (max - min) + min);

	for (let i = 0; i < digitCount; i++) {
		const index = Math.round(Math.random() * 9);
		string += numbers[index];
	}
	return string;
}

export default function generateNickname() {
	var string = "";
	const containMiddleNumbers = Math.floor(Math.random() * 20) > 15;
	const containNumbers = Math.floor(Math.random() * 20) > 8;
	const combination = [
		randomValue(words),
		randomValue(nouns),
		randomValue(verbs)
	];
	const j = randomIndex(combination);
	string += combination[j];
	combination.splice(j, 1);

	if (containMiddleNumbers) {
		string += getRandomNumbers(1, Math.floor(Math.random() * 2) + 1);
	}
	string += randomValue(combination);

	return containNumbers ? string : string + getRandomNumbers(1, 4);
}
