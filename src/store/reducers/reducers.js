import { toast } from "react-toastify";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  FAV_RESET,
} from "../actions/action";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("s10g4", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const favs = [...state.favs, action.payload];
      writeFavsToLocalStorage(favs);
      toast("Favori başarıyla eklendi!")
      return {...state, favs };

    case FAV_REMOVE:
      const favs2 = state.favs.filter((f) => f != action.payload);
      writeFavsToLocalStorage(favs2);
      toast("Favori başarıyla silindi!")
      return {...state, favs: favs2 };

    case FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload };

    case FETCH_LOADING:
      return { ...state, loading: true };

    case FETCH_ERROR:
      return { ...state, loading: false, current: null, error: action.payload };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() || [] };

    case FAV_RESET:
      writeFavsToLocalStorage([]);
      toast("Favoriler başarıyla sıfırlandı!")
      return {...state, favs: []};

    default:
      return state;
  }
}
