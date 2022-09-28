import React, { useEffect } from "react";
import { IonChip } from "@ionic/react";

import { useTTS } from "../../hooks/useTts";
import { useListOfContext } from "../../hooks/useListOfText";

import "./styles.css"
import { useConfiguration } from "../../hooks/useConfiguration";

const ChipComponent : React.FC<{}> = () => {

    const LIMITE_STRING_LENGHT = 10;
    const { texts } = useListOfContext();   
    const {idioma, volume, rate, pitch, voice, loadConfigs} = useConfiguration();

    const _playTTS : Function = async (text : string) => {
        await useTTS(text, idioma, volume, rate, pitch, voice);
    }

    useEffect(() => loadConfigs(), [loadConfigs])

    return (
        <div className="container-chips">
            {texts.map((text : string, index : number) => 
                { return text ? (<IonChip className="chips" key={index} outline={false} onClick={() => _playTTS(text)}>{text.substring(0,LIMITE_STRING_LENGHT)} { text.length > LIMITE_STRING_LENGHT ? "..." : "" }</IonChip>) : (null) }
            )}
        </div>
    )
}

export default ChipComponent;