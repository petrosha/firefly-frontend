import React from 'react';
import styles from './trajectory.module.css';

const Trajectory=({curveParams, steps=5}) => {
  let {
    bX0,bY0,bX,bY,bR,bArcPar1,bDir,bX2,bY2,
    eX2,eY2,eR,eArcPar1,eDir,eX,eY,eX0,eY0    
  } = curveParams.curveSpecificParams;

  if(steps>5) steps=5;
  // console.log("Trajectory: ",curveParams.curveSpecificParams);

  let pathes=[
    <g key="0">
      <path className={styles.beginLine}
        d={`M${bX0},${-bY0} L${bX} ${-bY}`}/>
        <circle className={styles.dot}
          cx={bX} cy={-bY} r={7}/>
    </g>,
    <g key="1">
      <path className={styles.path1} 
        d={`M${bX},${-bY} A${bR},${bR} 0 ${bArcPar1} ${bDir} ${bX2},${-bY2}`}/>
      <circle className={styles.dot}
        cx={bX2} cy={-bY2} r={7}/>
    </g>,
    <g key="2">
      <path className={styles.path2}
        d={`M${bX2},${-bY2} L${eX2} ${-eY2}`}/>
      <circle className={styles.dot}
        cx={eX2} cy={-eY2} r={7}/>
    </g>,   
    <g key="3">
      <path className={styles.path3} 
        d={`M${eX2},${-eY2} A${eR},${eR} 0  ${eArcPar1} ${eDir} ${eX},${-eY}`}/>
      <circle className={styles.dot}
        cx={eX} cy={-eY} r={7}/>
    </g>,
    <g key="4">
      <path className={styles.endLine}
        d={`M${eX0},${-eY0} L${eX} ${-eY}`}/> 
    </g>
  ]
  
  let pathesToDraw=[];
  for(let i = 0; i < steps; i++){
    pathesToDraw.push(pathes[4-i])
  }
  return(
    <g className={styles.pathesAll}>
      {pathesToDraw}
      {/* 
      <circle stroke="orange" strokeWidth="5" fill="orange" 
        cx={`${bRCC[0]}`} cy={`${-bRCC[1]}`} r="5"/>
      <circle stroke="orange" strokeWidth="5" fill="orange" 
        cx={`${eRCC[0]}`} cy={`${-eRCC[1]}`} r="5"/> */}
    </g>
  )
}

export default Trajectory;

