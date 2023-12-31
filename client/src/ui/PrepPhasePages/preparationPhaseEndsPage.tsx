//libs
import React, { useEffect, useState } from "react";
import { PrepPhaseStages } from "./prepPhaseManager";
import { getComponentValueStrict } from "@latticexyz/recs";

import { ClickWrapper } from "../clickWrapper";
import { useDojo } from "../../hooks/useDojo";
import { GAME_CONFIG } from "../../phaser/constants";
import { getEntityIdFromKeys } from "@dojoengine/utils";

//styles
import "./PagesStyles/PrepPhaseEndsPageStyles.css";
import "./PagesStyles/BuyingPageStyle.css";

//components

//pages

/*notes
    this page is fine 
*/

interface PrepPhaseEndsPageProps {
    setMenuState: React.Dispatch<PrepPhaseStages>;
}

export const PrepPhaseEndsPage: React.FC<PrepPhaseEndsPageProps> = ({ setMenuState }) => {
    const [showBlocks, setShowBlocks] = useState(true);
    const [blocksLeft, setBlocksLeft] = useState(0);

    const toggleShowBlocks = () => {
        setShowBlocks((prevShowBlocks) => !prevShowBlocks);
    };

    // const {
    //     networkLayer: {
    //       network: { contractComponents, clientComponents }
    //     },
    //   } = useDojo();


    // const getBlocksLeft = async () => {
    //     const clientGame = getComponentValueStrict(clientComponents.ClientGameData, getEntityIdFromKeys([BigInt(GAME_CONFIG)]));
    //     const gameData = getComponentValueStrict(contractComponents.Game, getEntityIdFromKeys([BigInt(clientGame.current_game_id)]));

    //     const blocksLeft = (gameData.start_block_number + gameData.preparation_phase_interval) - clientGame.current_block_number!;
    //     setBlocksLeft(blocksLeft);
    // }

    // useEffect(() => {
       

    //     getBlocksLeft();

    //     const intervalId = setInterval(() => { 
    //         getBlocksLeft();
    //     }, 5000);

    //     return () => clearInterval(intervalId);
    // }, []);

    return (
        <div className="ppe-page-container">
            {/* <img src="./assets/Page_Bg/PREP_PHASE_WAIT_BG.png"  alt="testPic" /> */}
            <img src="./assets/Page_Bg/PREP_PHASE_WAIT_BG.png"  alt="testPic" />
            <ClickWrapper className="content-space">
                <h1 style={{textAlign:"center", fontFamily:"Zelda", fontSize:"3cqw", fontWeight:"100"}}>PREPARATION PHASE ENDS IN<br/>
                    <span onMouseDown={() => { setShowBlocks(!showBlocks) }}>{showBlocks ? `BLOCKS LEFT: ${blocksLeft}` : `DD: 5\u00a0\u00a0\u00a0HH: 5\u00a0\u00a0\u00a0MM: 3\u00a0\u00a0\u00a0SS: 50`}</span>
                </h1>
                <div className="global-button-style" style={{fontSize:"1.8cqw", marginBottom:"2%" ,padding:"5px 10px", fontWeight:"100"}} onMouseDown={() => {setMenuState(PrepPhaseStages.PROFILE)}}>Place your Reinforcements</div>
                <div style={{fontSize:"1.2cqw",height:"fit-content", display:"flex",gap:"20px" ,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <div onMouseDown={() => {setMenuState(PrepPhaseStages.BUY_REVS)}} className="global-button-style" style={{padding:"5px 10px", fontWeight:"100"}}>Summon more Revenants</div>
                    <div onMouseDown={() => {setMenuState(PrepPhaseStages.BUY_REIN)}} className="global-button-style" style={{padding:"5px 10px",  fontWeight:"100"}}>Buy more Reinforcements</div>
                </div>
            </ClickWrapper>
        </div>
    );
};
