import React, { useEffect, useState } from "react";
import { CreateGameProps } from "../dojo/types";

import { Phase } from "./phaseManager";
import { useDojo } from "../hooks/useDojo";
import { checkAndSetPhaseClientSide,  fetchAllEvents,  fetchAllOutRevData,  fetchGameData,  fetchGameTracker,  fetchPlayerInfo,  fetchSpecificOutRevData,  setClientOutpostComponent,  setComponentsFromGraphQlEntitiesHM } from "../utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";

import { useEntityQuery } from "@latticexyz/react";
import { getComponentValueStrict, getComponentValue } from "@latticexyz/recs";
import { GAME_CONFIG } from "../phaser/constants";

//HERE SHOULD BE DONE  ADD TRADES AND FETCH THE EVENTS 

interface LoadingPageProps {
  setUIState: React.Dispatch<Phase>;
}

export const LoadingComponent: React.FC<LoadingPageProps> = ({ setUIState }) => {

  const [gamePhase, setGamePhase] = useState<number>(1);
  //https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload
  // this is to preload

  // this will have the vid of the loading thing in the middle
  // this will first load in the phase of the game which will then dictate what actually gets loaded in

  // if in phase prep only load in the users outposts and the player data

  //else load in everything

  // const {
  //   account: { account },
  //   networkLayer: {
  //     systemCalls: { create_game, view_block_count  },
  //     network: { contractComponents, clientComponents, graphSdk },
  //   },
  // } = useDojo();


  const loadingFunction = async () => {

    const gameTrackerData = await fetchGameTracker(graphSdk);

    setComponentsFromGraphQlEntitiesHM(gameTrackerData, contractComponents, false);

    let gameTracker = getComponentValue(contractComponents.GameTracker, getEntityIdFromKeys([BigInt(GAME_CONFIG)]));

    if (gameTracker === null || gameTracker === undefined)  // if there is nothing that means the game hasnt started this is for debug reasons
    {
      console.error("creating a game");

      const create_game_prop: CreateGameProps =
      {
        account: account,
        preparation_phase_interval: 10,
        event_interval: 5,
        erc_addr: account.address,
        revenant_init_price: 111111111
      }
  
      await create_game(create_game_prop)

      const gameTrackerData = await fetchGameTracker(graphSdk);
      setComponentsFromGraphQlEntitiesHM(gameTrackerData, contractComponents, false);

      gameTracker = getComponentValue(contractComponents.GameTracker, getEntityIdFromKeys([BigInt(GAME_CONFIG)]));
    }

    const game_id = gameTracker.count;

    //then fetch the game comp
    const gameDataQuery = await fetchGameData(graphSdk, game_id);  // fetching the last game
    setComponentsFromGraphQlEntitiesHM(gameDataQuery, contractComponents, false);
    
    //game entity comp
    const blockCount =  await view_block_count();  //get the current block count
    const data = checkAndSetPhaseClientSide(game_id, blockCount!, contractComponents, clientComponents)
    const gameEntityCounter = getComponentValueStrict(contractComponents.GameEntityCounter, getEntityIdFromKeys([BigInt(game_id)]))

    setGamePhase(data.phase);

    const playerInfoQuery = await fetchPlayerInfo(graphSdk, game_id, account.address);
    setComponentsFromGraphQlEntitiesHM(playerInfoQuery, contractComponents, false);

    const allOutpostsModels = await fetchAllOutRevData(graphSdk, game_id, gameEntityCounter.outpost_count);
    setComponentsFromGraphQlEntitiesHM(allOutpostsModels, contractComponents, true);

    loadInClientOutpostData(game_id);

    switch (data.phase) {
  
      case 2:

        // console.error("THIS SHOULD BE FETCHING ALL THE EVENTS ALREADY")

        const allEventsModels = await fetchAllEvents(graphSdk, game_id, gameEntityCounter.event_count);
        setComponentsFromGraphQlEntitiesHM(allEventsModels, contractComponents, true);

        // const allTradesModels = await fetchAllOutRevData(graphSdk, game_id, 1);
        // setComponentsFromGraphQlEntitiesHM(allTradesModels, contractComponents, true);
        
       break;
    }

    if (data.phase === 1)
    {
      setUIState(Phase.PREP);
    }
    else
    {
      setUIState(Phase.GAME);
    }
  }

  const loadInClientOutpostData = (game_id: number) =>
  {
    const gameEntityCounter = getComponentValueStrict(contractComponents.GameEntityCounter, getEntityIdFromKeys([BigInt(game_id)]));
    const outpostCount = gameEntityCounter.outpost_count;

    for (let index = 1; index <= outpostCount; index++) {
      const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(index)]);
      
      const outpostData = getComponentValueStrict(contractComponents.Outpost, entityId);

      let owned = false;

      if (outpostData.owner === account.address) {owned = true;}
      
      setClientOutpostComponent(Number(outpostData.entity_id), owned, false, false,false,clientComponents,  contractComponents,game_id);
    }
  }

  useEffect(() => {
    
    //on change of game phase we can load stuff in?
    // or maybe just ask the user to reload page idk

  }, [gamePhase]);

  useEffect(() => {
    // loadingFunction();
  }, []);

  // this is just a test do delete when in actual build
  useEffect(() => {
    const timer = setTimeout(() => {
      setUIState(Phase.PREP);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <div className="centered-div" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <video
        autoPlay
        loop
        muted
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <source src="videos/LoadingAnim.webm" type="video/webm" />
      </video>
    </div>
  );
};
