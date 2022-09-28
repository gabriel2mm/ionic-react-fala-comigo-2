import React, { useEffect } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { heart } from "ionicons/icons";
import { useTTS } from "../../hooks/useTts";
import "./styles.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useConfiguration } from "../../hooks/useConfiguration";

const FavoriteComponent: React.FC = () => {

    const { favorites, removeFavorites } = useFavorites();
    const {idioma, volume, rate, pitch, voice, loadConfigs} = useConfiguration();

    useEffect(() => loadConfigs(), [loadConfigs])

    const _play : Function=  async (text : string) : Promise<void> => {
        await useTTS(text, idioma, volume, rate, pitch, voice);
    }

    return (
        <IonCard mode="ios">
            <IonCardHeader>
                <IonCardSubtitle>Salve seus textos favoritos!</IonCardSubtitle>
                <IonCardTitle>Favoritos</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

                {favorites.length > 0 ? (
                    <IonList inset={true}>
                    {favorites.map((fav, index) => {
                        return (
                            <IonItem key={index} onClick={() => _play(fav)}>
                                <IonLabel>
                                    <div className="item-list">
                                        <span>{fav}</span>
                                        <IonIcon icon={heart} color="danger" onClick={() => removeFavorites(fav)}/>
                                    </div>
                                </IonLabel>
                            </IonItem>
                        )
                    })}
                    </IonList>
                ) : (<IonLabel>Ainda não há favoritos!</IonLabel>)}
            </IonCardContent>
        </IonCard>
    )
}

export default FavoriteComponent;