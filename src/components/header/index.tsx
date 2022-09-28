import React, { ReactNode } from "react";
import "./style.css";

import { IonIcon } from "@ionic/react";
import { settingsOutline, arrowBackSharp } from 'ionicons/icons';

import { Link, useHistory } from 'react-router-dom';


interface props {
    canGoBack: boolean,
    children?: ReactNode
}

const HeaderComponent: React.FC<props> = ({ canGoBack }) => {

    const _history = useHistory();

    return (
        <div className="header">
            <div className="container-logo">
                {canGoBack ? (<IonIcon className="backArrow" icon={arrowBackSharp} color="black" onClick={() => _history.goBack()}/>) : (null)}
                    <span className="logo">Fala Comigo</span>
            </div>
            <div className="icons">
                <Link to="settings">
                    <IonIcon icon={settingsOutline} color="black"></IonIcon>
                </Link>
            </div>
        </div>
    )
}

export default HeaderComponent;