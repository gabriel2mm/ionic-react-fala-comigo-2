import React, { Dispatch, ReactNode, useEffect } from "react"

interface stateType {
    idioma: string,
    volume: number,
    rate: number,
    pitch: number,
    voice: number,
    saveConfigs: Function,
    loadConfigs: Function
}

interface providerType {
    children?: ReactNode
}

const INITIAL_STATE: stateType = {
    idioma: "pt-BR",
    volume: 1,
    rate: 1,
    pitch: 1,
    voice: 1,
    saveConfigs: () => { },
    loadConfigs: () => { },
}

export const ConfigurationContext: React.Context<stateType> = React.createContext(INITIAL_STATE)


export const ConfigurationContextProvider: React.FC<providerType> = ({ children }) => {
    const [idioma, setIdioma]: [string, Dispatch<React.SetStateAction<string>>] = React.useState("pt-BR");
    const [volume, setVolume]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [rate, setRate]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [pitch, setPitch]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [voice, setVoice]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);

    const saveConfigs = (idioma: string, volume: number, rate: number, pitch: number, voice: number): void => {
        setIdioma(idioma);
        setVolume(volume);
        setRate(rate);
        setPitch(pitch);
        setVoice(voice);

        const strJson = JSON.stringify({ idioma, volume, rate, pitch, voice });
        localStorage.setItem("fc.configs", strJson);
    }

    const loadConfigs = (): void => {
        if(!localStorage.getItem("fc.configs"))
            return;

        const json = JSON.parse(localStorage.getItem("fc.configs")!)
        setIdioma(json.idioma);
        setVolume(json.volume);
        setRate(json.rate);
        setPitch(json.pitch);
        setVoice(json.voice)
    }

    useEffect(() => loadConfigs(), []);

    return (
        <ConfigurationContext.Provider value={{ idioma, volume, rate, pitch, voice, saveConfigs, loadConfigs }}>
            {children}
        </ConfigurationContext.Provider>
    )

}