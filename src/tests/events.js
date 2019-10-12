import livescript from "../Services/liveScript";
import storeAPI from "../Services/storeAPI";
import store from "../Modules/Store";

(async function() {
	storeAPI();
	livescript();
})();
