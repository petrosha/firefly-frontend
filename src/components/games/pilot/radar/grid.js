import React from 'react';
import styles from './grid.module.css';
import {
    myRound,
    toRad,
    toDeg,
} from "helpers/mathHelpers.js"

const GridRing = ({halfScreen = 600, halfRadar = 500}) =>{
    return (
        <g>
            <circle className={styles.gridInRing} 
                cx={0} cy={0} r={halfRadar}/>         
             <circle className={styles.gridOutRing} 
                cx={0} cy={0} r={halfScreen}/> 
        </g>
)}


const GridRadius = ({radius=500,angle=0,textSize=12}) =>{
    let outText=String(Math.round(angle));
    return(
        <g transform={`rotate(${angle})`}>
            <path className={styles.gridRadius} 
                d={`M 0 ${-0.05*radius} L 0 ${-0.97*radius}`}/>
            <text x={0} y={-1.015*radius} dx={Math.round(-0.3*textSize*outText.length)} 
                className={styles.gridRingText} 
                fontSize={textSize}>
                   {outText}
            </text>       
        </g>
)}

const GridCircle = ({radius=500}) =>{
    return(
        <circle className={styles.gridCircle} 
            cx={0} cy={0} r={radius}/> 
)}


const GridAll = ({halfScreen = 600, halfRadar = 500, div = 1,divCirc = 1}) =>{
    let angles = [];
    let radii=[]; 
    for(let i=0;i<div;i++) angles.push(myRound(360*i/div));
    for(let i=0;i<divCirc;i++) radii.push(myRound(halfRadar*(i+1)/(divCirc+1)));

    return (
        <g>
            {angles.map((el,idx)=>{ return (
                <GridRadius key={idx} radius={halfRadar} angle={el} textSize={Math.round(0.7*(halfScreen-halfRadar))}/>
            )})}
            {radii.map((el,idx)=>{ return (
                <GridCircle key={idx} radius={el}/>
            )})}
            <GridRing halfScreen={halfScreen-5} halfRadar={halfRadar} div={div}/>
        </g> 
)}


export {
    GridAll
}