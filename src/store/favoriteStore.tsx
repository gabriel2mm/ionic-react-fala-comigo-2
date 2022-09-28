import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react"

interface stateType {
    favorites : Array<string> 
    addFavorites : Function,
    removeFavorites : Function
}

interface providerType {
    children? : ReactNode
}

const INITIAL_STATE : stateType = { 
    favorites: [],
    addFavorites: ()=> {},
    removeFavorites: () => {}
}


export const FavoritesContext : React.Context<stateType> = React.createContext(INITIAL_STATE)


export const FavoritesContextProvider : React.FC<providerType>= ({children}) => {

    const [ favorites, setFavorites] : [Array<string>, Dispatch<SetStateAction<Array<string>>>] = React.useState(INITIAL_STATE.favorites);

    useEffect(() => {
        if(favorites.length > 0)
            localStorage.setItem("fc.favorites", JSON.stringify(favorites));
    }, [favorites])

    useEffect(() => {
        if(favorites.length <= 0 && localStorage.getItem("fc.favorites"))
            setFavorites(JSON.parse(localStorage.getItem("fc.favorites")!))
    }, [])


    const addFavorites : Function = (text : string) => {
        if(!text || favorites.includes(text))
            return;
        
        setFavorites([...favorites, text.trim()]);
    }

    const removeFavorites : Function = (text : string) => {
        setFavorites(favorites.filter( item => item !== text));
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorites, removeFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}