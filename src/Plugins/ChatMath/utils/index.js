import { logger } from "../../../Libs";
import got from "got";

/**
 * The ChatBot plugin logger
 * @param {String} message
 */
const myLogger = {
	debug: message => logger.debug(`[ChatMath] ${message}`),
	info: message => logger.info(`[ChatMath] ${message}`),
	warn: message => logger.warn(`[ChatMath] ${message}`),
	error: error => logger.error(new Error(`[ChatMath] ${error}`))
};

/**
 * Evaluates a math expression using an api, because using eval() is bad!
 * @param {String} mathExp
 */
const evaluateMath = async mathExp => {
	const encodedMathExp = encodeURIComponent(mathExp);
	const url = `http://api.mathjs.org/v4/?expr=${encodedMathExp}`;
	const response = await got(url);
	return response.body;
};

export { myLogger, evaluateMath };
