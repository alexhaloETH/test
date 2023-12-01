import React, { useEffect, useState } from "react";

import "./PagesStyles/ProfilePageStyles.css";

import { MenuState } from "./gamePhaseManager";

import { HasValue, getComponentValueStrict, getComponentValue } from "@latticexyz/recs";

import { useEntityQuery } from "@latticexyz/react";

import { useDojo } from "../../hooks/useDojo";

import { ConfirmEventOutpost, ReinforceOutpostProps } from "../../dojo/types";
import { setComponentQuick } from "../../dojo/testCalls";
import { GAME_CONFIG } from "../../phaser/constants";
import { ClickWrapper } from "../clickWrapper";
import { getEntityIdFromKeys } from "@dojoengine/utils";


interface ProfilePageProps {
  setMenuState?: React.Dispatch<React.SetStateAction<MenuState>>;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ setMenuState }) => {
  // const closePage = () => {
  //   setMenuState(MenuState.NONE);
  // };

  const [text, setText] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  useEffect(() => { console.log(text) }, [text]);

  return (
    <ClickWrapper className="profile-page-container">

      <img className="page-img" src="./assets/Page_Bg/PROFILE_PAGE_BG.png" alt="testPic" />

      <div className="pages-upper-section">

        <div className="page-left-flex">
          <h2 onMouseDown={() => {}}>X</h2>
        </div>
        <div className="page-title-flex">
          <h1>PROFILE</h1>
        </div>
        <div className="page-right-flex">
          <div className="title-cart-section">
            <h1>
              {" "}
              {/* <img src="LOGO_WHITE.png" className="test-embed" alt=""></img> {playerInfo === undefined ? 0 : playerInfo.reinforcement_count} */}
              <img src="reinforcements_logo.png" className="test-embed" alt="" ></img> {0}
            </h1>
            <h3>Reinforcement available</h3>
          </div>
        </div>
      </div>

      <div className="info-section">

        <div className="info-section-blank"></div>

        <div className="info-section-table">
          <div className="table-section">
            <div className="table-container" >
              <div className="table-title-container">
                <h2>Outpost ID</h2>
                <h2>Position</h2>
                <h2>Reinforcements</h2>
                <div style={{  flex: "1" }}></div>
              </div>
              <ClickWrapper className="table-items-container">
                {/*  this should be an element */}
                {/* {selectedOutposts.map((outpost: any, index: number) => (
        <div
          key={index}
          className="item-container-profile"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h2 onMouseEnter={() => setText("")}>{getComponentValueStrict(clientComponents.ClientOutpostData, outpost).id}</h2>
          <h2
            onMouseDown={() => {
              moveCameraHere(getComponentValueStrict(contractComponents.Outpost, outpost).x, getComponentValueStrict(contractComponents.Outpost, outpost).y);
              setHoveredIndex(null);
            }}
            onMouseEnter={() => setText("Go Here")}
          >
            X: {getComponentValueStrict(contractComponents.Outpost, outpost).x}, Y:{" "}
            {getComponentValueStrict(contractComponents.Outpost, outpost).y}
          </h2>
          <h2
            onMouseDown={() => {
              reinforceOutpost(getComponentValueStrict(clientComponents.ClientOutpostData, outpost).id);
              setHoveredIndex(null);
            }}
            onMouseEnter={() => setText("Reinforce")}
          >
            {getComponentValueStrict(contractComponents.Outpost, outpost).lifes}
          </h2>
          <div className="item-button" style={{ opacity: hoveredIndex === index ? 1 : 0 }}>
            {text}
          </div>
        </div>
      ))} */}
                <div
                  key={0}
                  className="item-container-profile"
                  onMouseEnter={() => setHoveredIndex(0)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <h2 onMouseEnter={() => setText("")}>{0}</h2>

                  <h2 onMouseEnter={() => setText("Go Here")}>
                    X: {1832}, Y:{5342}
                  </h2>

                  <h2
                    onMouseDown={() => { }}
                    onMouseEnter={() => setText("Reinforce")} >
                    {2}
                  </h2>

                  <div className="item-button global-button-style" style={{ opacity: hoveredIndex === 0 && text !== "" ? 1 : 0 }}>
                    {text}
                  </div>
                </div>

                <div
                  key={1}
                  className="item-container-profile"
                  onMouseEnter={() => setHoveredIndex(1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <h2 onMouseEnter={() => setText("")}>{1}</h2>

                  <h2 onMouseEnter={() => setText("Go Here")}>
                    X: {1832}, Y:{5342}
                  </h2>

                  <h2
                    onMouseDown={() => { }}
                    onMouseEnter={() => setText("Reinforce")} >
                    {2}
                  </h2>

                  <div className="item-button global-button-style" style={{ opacity: hoveredIndex === 1 && text !== "" ? 1 : 0 }}>
                    {text}
                  </div>

                </div>

                <div
                  key={2}
                  className="item-container-profile"
                  onMouseEnter={() => setHoveredIndex(2)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <h2 onMouseEnter={() => setText("")}>{2}</h2>

                  <h2 onMouseEnter={() => setText("Go Here")}>
                    X: {1832}, Y:{5342}
                  </h2>

                  <h2
                    onMouseDown={() => { }}
                    onMouseEnter={() => setText("Reinforce")} >
                    {2}
                  </h2>

                  <div className="item-button global-button-style" style={{ opacity: hoveredIndex === 2 && text !== "" ? 1 : 0 }}>
                    {text}
                  </div>
                </div>

              </ClickWrapper>
            </div>
          </div>
          <div className="buy-section" >
            <div className="global-button-style button-style-profile">Buy Reinforcements (Disabled)</div>
            <ClickWrapper className="global-button-style button-style-profile" onMouseDown={() => { }}>Destory All</ClickWrapper>
          </div>

        </div>

        <div className="info-section-blank"></div>
      </div>

    </ClickWrapper>
  );
};


