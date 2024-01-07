import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FAV_RESET,
  addFav,
  fetchAnother,
  getFavsFromLocalStorage,
  removeFav,
} from "./store/actions/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const loading = false;
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);
  const dispatch = useDispatch();

  function addToFavs() {
    if (favs.find((f) => f == current)) {
      dispatch(removeFav(current));
    } else {
      dispatch(addFav(current));
    }
  }

  useEffect(() => {
    dispatch(fetchAnother());
    dispatch(getFavsFromLocalStorage());
    toast("Uygulama başarıyla yüklendi!");
  }, []);

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              onClick={() => {
                dispatch(fetchAnother());
              }}
            >
              Başka bir tane
            </button>
            <button
              onClick={addToFavs}
              disabled={!current} //|| favs.find((f) => f == current)}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              {favs.find((f) => f == current)
                ? "Favorilerden Çıkar"
                : "Favorilere ekle"}
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                dispatch({ type: FAV_RESET });
              }}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorileri sıfırla!
            </button>
            {favs.length > 0 ? (
              favs.map((item) => <FavItem key={item} id={item} imgURL={item} />)
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
      <ToastContainer />
    </div>
  );
}

//  ToastContainer her zaman switch in altında ve çalışması için her zaman ekranda olması gerekir.
