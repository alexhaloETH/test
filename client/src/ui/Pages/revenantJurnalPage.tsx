import React from "react";

import "./PagesStyles/RevenantJurnalPageStyles.css";

import { MenuState } from "./gamePhaseManager";


interface RevenantjurnalPageProps {
    setMenuState: React.Dispatch<React.SetStateAction<MenuState>>;
}

export const RevenantJurnalPage: React.FC<RevenantjurnalPageProps> = ({ setMenuState }) => {

    const closePage = () => {
        setMenuState(MenuState.NONE);
    };

    return (
        <div className="game-page-container">
            <img className="page-img" src="./assets/Page_Bg/JOURNAL_PAGE_BG.png" alt="testPic" />
        </div>
    );
};
