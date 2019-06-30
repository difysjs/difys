import Core from "./src/Core/Core";
import logger from "./src/Tools/Logger";
import Checker from "./src/Tools/Checker";

logger.info("Difys - Headless dofus touch botting client");

/* Checking process */
logger.info("Beginning the checking process...");
const checker = new Checker();
if (!checker.init()) {
	process.exit(1);
}

/* Entry */
logger.info("Initiating Difys' core");
const core = new Core();
core.init();
