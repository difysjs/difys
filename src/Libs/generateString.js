// Code taken from @Tanuki's https://github.com/dofus-remote/client/blob/dev/src/libs/helper.js
// No specified license

/**
 * Generate a checksum (original codee from DT's sources)
 * @param {string} str String to transform
 */
const checksum = str => {
	let r = 0;
	for (let i = 0; i < str.length; i++) {
		r += str.charCodeAt(i) % 16;
	}
	return (r % 16).toString(16).toUpperCase();
};

/**
 * Generate one random character
 *
 * @returns {string}
 */
const getRandomChar = () => {
	const n = Math.ceil(Math.random() * 100);
	if (n <= 40) {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Uppercase
	}
	if (n <= 80) {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Lowercase
	}
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // Number
};

/**
 * Generate string of <length> characters, Example : "O6FBjgAe3KaKyqL2XSu5B"
 *
 * @param {number} length Length of characters to generate
 *
 * @returns {string}
 */
const generateString = (length = 10) => {
	let key = "";
	for (let i = 0; i < length; i++) {
		key += getRandomChar();
	}
	return key + checksum(key);
};

export default generateString;
