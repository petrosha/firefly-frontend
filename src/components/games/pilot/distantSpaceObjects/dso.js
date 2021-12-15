import React from "react";
import styles from "./dso.module.css";

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";
import {
  //myRound,
  //toRad,
  //toDeg,
  degToRange,
  //vectorEndCoords,
  vectorLength,
  vectorAngle,
  //myDigitRandom,
  //myRangeRandom
} from "helpers/mathHelpers.js";

const Title = ({ name = "" }) => {
  return(
    <div className={ styles.titleDiv }>
      <p className={ styles.titleText }>{name}</p>
    </div>
  );
};

const SystemTitle = ({ name = "" }) => {
  return(
    <div className={ styles.systemTitleDiv }>
      <p className={ styles.titleComment }>квадрант</p>
      <p className={ styles.titleText }>{name}</p>
    </div>
  );
};


const AstroCard = ({ card, selected = false, callBack } ) => {
  let {
    name = "unknown",
    type = "unknown",
    astroX = 484,
    astroY = 1825,
    astroZ = 664,
    fuel = ""
  } = card;

  return(
    <div className={ selected ? styles.cardDiv + " " + styles.cardDivBack : styles.cardDiv } onClick={ () => { callBack(card.name); } }>
      <div className={ styles.cardTitle }>{ name }</div>
      <div className={ styles.cardType }>{ type }</div>
      <div className={ styles.cardFuel }>{ fuel ? "F " + fuel : "" }</div>
      <div className={ styles.cardCoords }>C { astroX }, { astroY }, { astroZ }</div>
    </div>
  );
};

const SystemCard = ({ card, selected = false, callBack } ) => {
  let {
    id = 1,
    name = "Персефона",
    type = "planet",
    eX = 450,
    eY = 0,
    speed = 5,
    transponder = true,
  } = card;
  return(
    <div className={ selected ? styles.cardDiv + " " + styles.cardDivBack : styles.cardDiv } onClick={ () => { callBack(card.id); } }>
      <div className={ styles.cardTitle }>{name}</div>
      <div className={ styles.cardType }>{type}</div>
      <div className={ styles.cardFuel }>A {Math.round(degToRange(vectorAngle(0, 0, eX, eY)))}</div>
      <div className={ styles.cardDist }>D {Math.round(vectorLength(0, 0, eX, eY))}</div>
      <div className={ styles.cardSpeed }>S {Math.round(Number(speed))}</div>
    </div>
  );
};

const DistantSpaceObjects = observer(() => {
  let pilotData = useStore().pilotData;
  let { astro, radar, systems } = pilotData.data;
  let program = pilotData.program;

  if(!astro) return ("");
  let switchedOn = systems.find(el => el.name === "beacon1").switchedOn;

  if(astro.voyage) return (<Title name={ "В пути..." }/>);

  let current = astro.objects.find(el => astro.current === el.name);
  // console.log("Current: ",current);
  return (
    <div className={ styles.mainDiv }>
      <SystemTitle name={ current.name }/>
      {
        switchedOn ? radar.filter(el => el.transponder).map((el, idx) => {
          return(
            <SystemCard
              card={ el }
              program={ program }
              selected={ program.target === "radar" && program.selected === el.id ? true : false }
              key={ idx }
              callBack={ pilotData.programSetRadarSelected.bind(pilotData) } />
          ); }) : <div className={ styles.titleComment }>* * *</div>
      }
      <Title name={ "Верс" }/>
      {
        current.directions ? current.directions.map((el, idx) => {
          let selected = false;
          if(program.target === "astro" && program.selected === el.name) selected = true;
          return(
            <AstroCard
              card={ el }
              program={ program }
              selected={ selected }
              key={ idx }
              callBack={ pilotData.programSetAstroSelected.bind(pilotData) } />
          );
        }) : ""
      }
    </div>
  );
});

export default DistantSpaceObjects;