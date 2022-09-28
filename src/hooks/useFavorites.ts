import { useContext } from "react";
import { FavoritesContext } from "../store/favoriteStore";

export const useFavorites = () => {
    return useContext(FavoritesContext);
}