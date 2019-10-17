/*

	Code taken from @Tanuki's Github (https://github.com/dofus-remote/client/blob/dev/src/libs/helper.ts)
	and slightly modified by Zirpoo

*/

/**
 * Generate a checksum (original codee from DT's sources)
 *
 * @param {String} string String to transform
 */
function checksum(string) {
	let r = 0;

	for (let i = 0; i < string.length; i++) {
		r += string.charCodeAt(i) % 16;
	}
	return (r % 16).toString(16).toUpperCase();
}

/**
 * Generate one random character
 * (80% letters and 20% numbers)
 *
 * @returns {String}
 */
function getRandomChar() {
	const n = Math.ceil(Math.random() * 100);

	if (n <= 80) {
		const lettersRandomIndex = Math.floor(Math.random() * 26);
		const randomLetterCase = n <= 40 ? 65 : 97; // 40% UpperCase
		return String.fromCharCode(lettersRandomIndex + randomLetterCase);
	}
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

/**
 * Generate a string of random characters
 *
 * @param {Number} length Number of characters to generate
 *
 * @returns {String} Example: O6FBjgAe3KaKyqL2XSu5B
 */
export default function generateString(length = 10) {
	let key = "";
	for (let i = 0; i < length; i++) {
		key += getRandomChar();
	}
	return key + checksum(key);
}
