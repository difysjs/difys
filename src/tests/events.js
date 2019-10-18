import livescript from "../Services/liveScript";
import dataAPI from "../Services/dataAPI";
import store from "../Modules/Store";

(async function() {
	dataAPI();
	livescript();
})();
