import { SAVE_INDEX_OF_ROW } from "./actionTypes";
import { SAVE_ROW_ID } from "./actionTypes";
import { SAVE_ROW } from "./actionTypes";
import {SAVE_ROW_COLAPSE} from "./actionTypes";
import {SAVE_ROWS_SEARCH} from "./actionTypes"
export const saveIndexAction = (payload) => {
  return {
    type: SAVE_INDEX_OF_ROW,
    payload: payload,
  };
};

export const saveRowIdAction = (payload) => {
  return { type: SAVE_ROW_ID, payload: payload };
};
export const saveRow = (payload) => {
  return { type: SAVE_ROW, payload: payload };
};
export const savecolapserow= (payload) => {
  return { type: SAVE_ROW_COLAPSE, payload: payload };
};
export const saverowsearch= (payload) => {
  return { type: SAVE_ROWS_SEARCH, payload: payload };
};
