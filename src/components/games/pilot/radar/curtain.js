import React from 'react';
import styles from './curtain.module.css';

const CurtainBackground = ({halfScreen=600, halfRadar=500}) =>{
    return(
    <rect x={0} y={0} 
        width={2*halfScreen} height={2*halfScreen}
        className={styles.CurtainBackground}/> 
)}

const CurtainOneQuarter = ({halfScreen=600, halfRadar=500, rotation=0}) =>{
    return (
        <g transform={`rotate(${rotation})`}>
            <path className={styles.CurtainOneQuarter}
            d={`M ${-halfRadar} 0
                A ${halfRadar} ${halfRadar} 0 0 1 0 ${-halfRadar} 
                L ${0} ${-halfScreen} 
                L ${-halfScreen} ${-halfScreen}
                L ${-halfScreen} ${0} Z`}/> 
        </g> 
)}

const Curtain4Quarters = ({halfScreen=600, halfRadar=500}) =>{
    return (
      <g>
          <CurtainOneQuarter halfScreen={halfScreen} halfRadar={halfRadar} rotation={0}/>
          <CurtainOneQuarter halfScreen={halfScreen} halfRadar={halfRadar} rotation={90}/>
          <CurtainOneQuarter halfScreen={halfScreen} halfRadar={halfRadar} rotation={180}/>
          <CurtainOneQuarter halfScreen={halfScreen} halfRadar={halfRadar} rotation={270}/>
      </g>
    )}

export {
    Curtain4Quarters,
    CurtainBackground
}