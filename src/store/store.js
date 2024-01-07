import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { myReducer } from "./reducers/reducers";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

//  thunk yapısının yanına logger eklersek hangi action ın ne zaman tetiklendiğini neticesinde ne olduğunu da görebiliriz. "npm i redux-logger"
export const store = createStore(myReducer, applyMiddleware(thunk, logger));