import React from "react"
import "./style.css";
import { IonContent, IonPage } from "@ionic/react"
import HeaderComponent from "../../components/header"
import CardTtsComponent from "../../components/card-tts";
import ChipComponent from "../../components/chips";
import FavoriteComponent from "../../components/favorites";

const HomePage: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <HeaderComponent canGoBack={false}/>
                <CardTtsComponent />
                <ChipComponent />
                <FavoriteComponent />
            </IonContent>
        </IonPage>
    )
}

export default HomePage;