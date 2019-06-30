/* eslint-disable prettier/prettier */
import { createLogger, format, transports, addColors } from "winston";
import { logsConfig } from "../Config/config";
import chalk from "chalk";
import moment from 'moment';

/* Handling date */
const time = () => chalk.grey.italic(`[${moment().format('hh:mm:ss')}]`)
let date = new Date();

let currentDate = (date.toLocaleString('en-US', {
	month: "2-digit",
	day: "2-digit"
})).replace("/","-");

/* Difys custom logging config */
const loggerLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		verbose: 3,
		debug: 4,
	},
	colors: {
		error: 'bold red',
		warn: 'bold yellow',
		info: 'bold blue',
		verbose: 'bold green',
		debug: 'bold cyan',
	}
}
addColors(loggerLevels.colors);

/* Create the logger */
const { combine, errors, colorize, printf } = format;
const { Console, File } = transports;

const reg = /(warn)|(error)|(info)|(verbose)|(debug)/g
const formatLevel = level => level.replace(reg, e => e.toUpperCase());

const logger = createLogger(
	{
		level: "debug",
		format: combine(
			colorize({ colors: loggerLevels.colors }),
			printf(({ level, message }) => `${time()} ${formatLevel(level)} ${message}`),
			errors({ stack: true })
		),
		transports: [
			new Console({ levels: loggerLevels.levels }),
			new File({
				filename: `${logsConfig.path}/log-${currentDate}.log`,
			}),
			new File({
				filename: `${logsConfig.path}/errors/${currentDate}.log`,
				level: 'error'
			})
		]
	}
);

export default logger;
