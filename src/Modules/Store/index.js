import Store from "./Store";
import Dispatcher from "./Dispatcher";

const store = new Store(new Dispatcher());

export default store;
