import React from "react"
import { ConfigurationContext } from "../store/configurationStore";

interface stateType {
    idioma: string,
    volume: number,
    rate: number,
    pitch: number,
    voice: number,
    saveConfigs: Function,
    loadConfigs: Function
}

export const useConfiguration  = () : stateType => {
    return React.useContext(ConfigurationContext);
}