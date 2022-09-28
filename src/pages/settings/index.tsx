import React, { Dispatch, useEffect, useMemo } from "react";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSelect, IonSelectOption, IonLabel, IonRange, IonButton, useIonToast } from "@ionic/react";
import { getSupportedLanguages, getSupportedVoices } from "../../hooks/useTts";
import { useConfiguration } from "../../hooks/useConfiguration";

import HeaderComponent from "../../components/header";
import "./styles.css";
import { SpeechSynthesisVoice } from "@capacitor-community/text-to-speech";

const SettingPage: React.FC<{}> = () => {

    const [languages, setLanguages]: [Array<string>, Dispatch<React.SetStateAction<Array<string>>>] = React.useState([""]);
    const [voicesLocal, setVoicesLocal]: [Array<any>, Dispatch<React.SetStateAction<Array<any>>>] = React.useState([{}]);

    const [selectValue, setSelectValue]: [string, Dispatch<React.SetStateAction<string>>] = React.useState("pt-BR");
    const [selectVoiceIndex, setSelectVoiceIndex]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(-1);
    const [VolumeLocal, setVolumeLocal]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [rateLocal, setrateLocal]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [pitchLocal, setpitchLocal]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);

    const [present] = useIonToast();

    const { saveConfigs, loadConfigs, idioma, volume, rate, pitch, voice } = useConfiguration();

    const getLanguagesList = async (): Promise<Array<string>> => {
        const langs = await getSupportedLanguages();
        return langs.languages;
    }

    const getVoicesList = async (): Promise<SpeechSynthesisVoice[]> => {
        const voices = await getSupportedVoices();
        return voices.voices;
    }

    const memorizedVoices = useMemo(() => getVoicesList(), []);
    const memorizedLanguages = useMemo(() => getLanguagesList(), []);

    useEffect(() => {
        memorizedLanguages.then(itens => setLanguages(itens));
    }, [memorizedLanguages]);

    useEffect(() => {
        memorizedVoices.then(itens => {
            setVoicesLocal(itens.map((item: SpeechSynthesisVoice, index: number) => {
                const obj = { item, index };
                return obj;
            }).filter(i => i.item.lang === selectValue))
        });
    }, [memorizedVoices, selectValue]);

    useEffect(() => {
        loadConfigs();
        setSelectValue(idioma);
        setVolumeLocal(volume);
        setrateLocal(rate);
        setpitchLocal(pitch);
        setSelectVoiceIndex(voice);
    }, [loadConfigs, idioma, volume, rate, pitch, voice]);

    useEffect(() => console.log(selectVoiceIndex), [selectVoiceIndex]);

    const _setVolumeLocal = (VolumeLocalParam: number): void => {
        setVolumeLocal(+VolumeLocalParam.toFixed(1));
    }
    const _setrateLocal = (rateLocalParam: number): void => {
        setrateLocal(+rateLocalParam.toFixed(1));
    }
    const _setpitchLocal = (pitchLocalParam: number): void => {
        setpitchLocal(+pitchLocalParam.toFixed(1));
    }

    const _saveConfigs = () => {
        saveConfigs(selectValue, VolumeLocal, rateLocal, pitchLocal, selectVoiceIndex);
        present({
            message: 'Configurações salvas com sucesso!',
            duration: 1500,
            position: "bottom"
        });
    }

    return (
        <IonPage>
            <IonContent>
                <HeaderComponent canGoBack={true} />
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Altere as configurações conforme seu gosto.</IonCardSubtitle>
                        <IonCardTitle>Configurações</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div className="container-form">

                            <IonLabel>Seleciona o idioma:</IonLabel>
                            <IonSelect mode="ios" placeholder="Selecione o idioma do áudio" value={selectValue} selectedText={selectValue} onIonChange={e => setSelectValue(e.detail.value)}>
                                {languages.map((item: string, index: number) => <IonSelectOption key={index} value={item}>{item}</IonSelectOption>)}
                            </IonSelect>

                            <IonLabel>Selecionar a voz:</IonLabel>
                            {voicesLocal ? (
                                <IonSelect mode="ios" placeholder="Selecione o idioma do áudio" value={selectVoiceIndex} selectedText={selectVoiceIndex !== -1? voicesLocal.filter( voices => voices.index === selectVoiceIndex)[0]?.item.name : voicesLocal[0].item?.name!} onIonChange={e => setSelectVoiceIndex(e.detail.value)}>
                                    {voicesLocal.map((i: any, index: number) => (<IonSelectOption key={index} value={i.index}>{i.item?.name!}</IonSelectOption>))}
                                </IonSelect>) : (null)}

                            <IonLabel>Selecione o volume:</IonLabel>
                            <IonRange mode="ios" ticks={true} snaps={true} pinFormatter={(value) => value.toFixed(1)} pin={true} step={0.1} min={0} max={1} value={VolumeLocal} defaultValue={1} onIonChange={(e) => _setVolumeLocal(+e.detail.value.toString())} />

                            <IonLabel>Selecione a velocidade de pronúncia:</IonLabel>
                            <IonRange mode="ios" ticks={true} snaps={true} pinFormatter={(value) => value.toFixed(1)} pin={true} step={0.1} min={0} max={1} value={rateLocal} defaultValue={1} onIonChange={(e) => _setrateLocal(+e.detail.value.toString())} />

                            <IonLabel>Selecione a intonação da voz:</IonLabel>
                            <IonRange mode="ios" ticks={true} snaps={true} pinFormatter={(value) => value.toFixed(1)} pin={true} step={0.1} min={0} max={1} value={pitchLocal} defaultValue={1} onIonChange={(e) => _setpitchLocal(+e.detail.value.toString())} />

                            <IonButton expand="full" onClick={() => _saveConfigs()}>Salvar</IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>

                <IonLabel className="rodape" title="Desenvolvido por Gabriel Maia">Desenvolvidor por: gabriel_more@hotmail.com</IonLabel>
            </IonContent>
        </IonPage>
    )
}

export default SettingPage;