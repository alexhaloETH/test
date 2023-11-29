import React from "react";

import "./PagesStyles/RulesPageStyles.css"

import { MenuState } from "./gamePhaseManager";

interface RulesPageProps {
    setMenuState?: React.Dispatch<React.SetStateAction<MenuState>>;
}

export const RulesPage: React.FC<RulesPageProps> = ({ setMenuState }) => 
{
    // const closePage = () => {
    //     setMenuState(MenuState.NONE);
    // };

    return (
        <div className="rules-page-container">
            <img className="page-img" src="./assets/Page_Bg/RULES_PAGE_BG.png" alt="testPic" />
        </div>
    )
}
