import React, { Dispatch, ReactNode, SetStateAction } from "react"

interface stateType {
    texts : Array<string> 
    addText : Function
}

interface providerType {
    children? : ReactNode
}

const INITIAL_STATE : stateType = { 
    texts: [],
    addText: ()=> {},
}

export const ListOfTextContext : React.Context<stateType> = React.createContext(INITIAL_STATE)

export const ListOfTextContextProvider : React.FC<providerType>= ({children}) => {

    const [ texts, setTexts] : [Array<string>, Dispatch<SetStateAction<Array<string>>>] = React.useState(INITIAL_STATE.texts);

    const addText : Function = (text : string) => {
        if(!text || texts.includes(text))
            return;

        if(texts.length >= 5)
            setTexts([...texts.slice(1,5), text]);
        else
            setTexts([...texts, text]);
    }

    return (
        <ListOfTextContext.Provider value={{ texts, addText}}>
            {children}
        </ListOfTextContext.Provider>
    )
}