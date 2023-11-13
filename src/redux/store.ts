import { legacy_createStore as createStore } from "redux";
import postsReducer from "./reducers";

const store = createStore(postsReducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
