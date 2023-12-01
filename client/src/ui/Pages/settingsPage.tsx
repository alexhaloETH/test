import React from "react";

import "./PagesStyles/SettingPageStyle.css";

import { MenuState } from "./gamePhaseManager";


interface SettingPageProps {
    setMenuState: React.Dispatch<React.SetStateAction<MenuState>>;
}

export const SettingsPage: React.FC<SettingPageProps> = ({ setMenuState }) => {

    const closePage = () => {
        setMenuState(MenuState.NONE);
    };

    return (
        <div className="game-page-container">

            <img className="page-img" src="./assets/Page_Bg/PROFILE_PAGE_BG.png" alt="testPic" />

        </div>
    )
}
