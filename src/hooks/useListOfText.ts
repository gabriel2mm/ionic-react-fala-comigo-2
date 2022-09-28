import { useContext } from "react";
import { ListOfTextContext } from "../store/listTexts";

export const useListOfContext = () => {
    return useContext(ListOfTextContext);
}