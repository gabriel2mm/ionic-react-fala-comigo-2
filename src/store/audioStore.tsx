import React, { Dispatch, ReactNode, SetStateAction } from "react"

interface stateType {
    audioState : boolean
    togglePlay : Function,
}

interface providerType {
    children? : ReactNode
}

const INITIAL_STATE : stateType = { 
    audioState: false,
    togglePlay: ()=> {}
}

export const AudioContext : React.Context<stateType> = React.createContext(INITIAL_STATE)


export const AudioContextProvider : React.FC<providerType>= ({children}) => {
    const [ audioState, setAudioState] : [ boolean, Dispatch<SetStateAction<boolean>>]  = React.useState(false);

    const togglePlay : Function = (state : boolean = false) : void => {
        setAudioState(state);
    }

    return (
        <AudioContext.Provider value={{audioState, togglePlay}}>
            {children}
        </AudioContext.Provider>
    )

}