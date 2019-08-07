import {
	getAppVersion,
	getBuildVersion,
	getAssetsVersion
} from "./getMetadata";
import logger from "./logger";
import EventEmitter from "./EventEmitter";
import generateString from "./generateString";
import handleProxy from "./handleProxy";

export {
	logger,
	getAppVersion,
	getBuildVersion,
	getAssetsVersion,
	EventEmitter,
	generateString,
	handleProxy
};
