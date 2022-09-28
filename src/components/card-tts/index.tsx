import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react"
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonTextarea } from '@ionic/react';
import { playSharp, pauseSharp, heartOutline, refreshSharp, arrowUpCircleOutline } from "ionicons/icons";
import { useTTS, pauseSound } from '../../hooks/useTts';
import { useListOfContext } from '../../hooks/useListOfText';
import "./style.css";
import { useFavorites } from '../../hooks/useFavorites';
import { useAudio } from '../../hooks/useAudio';
import { useConfiguration } from '../../hooks/useConfiguration';


const CardTtsComponent: React.FC = () => {
    const [text, setText]: [string | null | undefined, Dispatch<SetStateAction<string | null | undefined>>] = useState()
    const { audioState, togglePlay } = useAudio();
    const { addText } = useListOfContext();
    const { favorites, addFavorites, removeFavorites } = useFavorites();

    const {idioma, volume, rate, pitch, voice, loadConfigs} = useConfiguration();

    useEffect(() => loadConfigs(), [loadConfigs]);

    const _play: Function = async () => {
        togglePlay(true);
        await useTTS(text!, idioma, volume, rate, pitch, voice);
        addText(text?.toLocaleLowerCase())
        setText("")
        togglePlay();
    }

    const pause: Function = async () => {
        pauseSound();
        togglePlay();
    }

    const _clear : Function = async () => {
        setText("");
        await pauseSound();
        togglePlay(false);
    }

    const toggleFavorite : Function = () => {
        if(favorites.includes(text!.toLocaleLowerCase())){
            removeFavorites(text?.toLocaleLowerCase())
        }else{
            addFavorites(text?.toLocaleLowerCase())
        }   
    }

    return (
        <IonCard mode="ios" className='card-tts'>
            <IonCardHeader>
                <IonCardSubtitle>Texto para voz</IonCardSubtitle>
                <IonCardTitle>Digite para reproduzir</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content-relative">
                <IonTextarea value={text} color='tertiary' autocapitalize="sentences" autofocus={true} cols={6} rows={5} spellcheck={true} wrap="soft" onIonChange={(e: any) => setText(e.target.value)} onKeyPress={(e) => e.key === "Enter" ? _play() : null} />
                {
                    !audioState ?
                        (
                            <IonButton className="play-button" onClick={() => _play()}>
                                <IonIcon icon={playSharp} />
                            </IonButton>
                        )
                        :
                        (
                            <IonButton className="play-button" onClick={() => pause()}>
                                <IonIcon icon={pauseSharp} />
                            </IonButton>
                        )
                }
                <IonFab vertical="bottom" horizontal="end" edge>
                    <IonFabButton color="light">
                        <IonIcon icon={arrowUpCircleOutline} />
                    </IonFabButton>
                    <IonFabList side='top'>
                        <IonFabButton color="light">
                            <IonIcon icon={refreshSharp} onClick={() => _clear()}/>
                        </IonFabButton>
                        <IonFabButton color={text && favorites.includes(text!.toLocaleLowerCase()) ? "danger" : "light"} onClick={() =>  toggleFavorite() }>
                            <IonIcon icon={heartOutline}/>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
            </IonCardContent>
        </IonCard>
    )
}

export default CardTtsComponent;