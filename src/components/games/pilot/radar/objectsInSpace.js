import React from 'react';
import styles from './objectsInSpace.module.css';
import styles2 from './curtain.module.css';

const ObjectsInSpace = ({data, ship, selectCallBack,timer})=>{
     return (
        <g>
            { 
                data.map((el,idx) =>{ 
                    return (
                        <ObjectInSpace 
                            key={idx} 
                            data={el.data} 
                            vector={el.vector} 
                            color={el.color} 
                            outline={el.outline}
                            ship={ship}
                            timer={timer}
                            callBack={selectCallBack}/>
                    )})
            }
        </g>
)}

const ObjectInSpace = ({data={},ship={sysAngle:0, shiftX:0, shiftY:0},vector=false, color="red", outline=false, timer=10, callBack}) =>{   
    let {
        id=undefined,
        eX=0,
        eY=0,
        eA=0,
        name="unknown",
        type="unknown",
        speed=0,
        size=0,
        initialPause=0,
    } = data;

    let fontSize=15;
    return (
        
        <g> 
            {initialPause > 0 ? "" : 
                <g  className={styles.blink} 
                    style={{opacity:`${Math.round((Math.cos(Math.PI*(10-timer)/20))*100)}%`}}>

                    {/* вектор зловреда */}   
                    { vector ? <path className={styles.oisVector}
                        d={`M${ship.shiftX},${-ship.shiftY} L${eX},${-eY})`}/> : ""}
                    
                    <g  transform={`translate(${eX},${-eY})`}>
                        <g  transform={`rotate(${eA})`} onClick={()=>{callBack(id)}}>
                            {/* изображение зловреда */}
                            <path stroke={color} className={styles.oisTriangle}
                                d="M0 0 m -10 0 l10 -30 10 30 Z"/>  
                            <circle stroke={color} fill={color} className={styles.oisCircle}
                                cx="0" cy="0" r="10"/>     
                            {/* траектория зловреда */}
                            <path stroke={color} className={styles.oisTrajectory}
                                d="M0 -1000 L0 1000"/>
                        </g>
                        {/* размер зловреда */}
                        <circle stroke={color} className={styles.oisSize}
                            cx="0" cy="0" r={size}/>
                        {/* название зловреда и тип */} 
                        {   
                            outline? 
                                <g transform={`rotate(${ship.sysAngle})`}>
                                    <text x={22} y={-43} fill={color} fontSize={fontSize}
                                        className={styles.oisOutlineText}>
                                        {name}
                                    </text> 
                                    <path stroke={color} className={styles.oisOutline}
                                        d={`M0 0 l20 -40 ${fontSize*0.7*name.length} 0`}/>  
                                    <text x={22} y={-40+fontSize} fill={color} fontSize={fontSize}
                                        className={styles.oisOutlineText}>
                                        {type}
                                    </text> 
                                </g>
                            : ""}

                    </g>
                </g>    
            }
        </g>
)}

const TheShip = () =>{
    return(
        <g>
            <path  className={styles.theShipTrajectory}
                d="M0 -75 L0 -490"/>
            <g transform="scale(0.8)">
                <circle className={styles2.CurtainBackground} 
                        cx="0" cy="0" r="25"/>
                <g transform="translate(-25,-25)">
                    <path className={styles.theShip} d="M34.92,40.69h9v-.2A59.68,59.68,0,0,0,42,28.5a30.77,30.77,0,0,0-2.91-7.22c-2-3.44-3.88-4.48-3.9-4.49h0c-1.4-6.67-3.92-10.73-6.11-13.13A12.64,12.64,0,0,0,25,.49a12.64,12.64,0,0,0-4.12,3.17c-2.19,2.4-4.71,6.46-6.11,13.13h0s-1.91,1.05-3.9,4.49A30.77,30.77,0,0,0,8,28.5a59.68,59.68,0,0,0-1.87,12v.2h9v.14h0a13.43,13.43,0,0,0-1.9,2.32,13.2,13.2,0,0,0-1.33,2.62,10.75,10.75,0,0,0-.69,3.56v.19H38.83v-.19a10.75,10.75,0,0,0-.69-3.56,13.2,13.2,0,0,0-1.33-2.62,13.43,13.43,0,0,0-1.9-2.32h0Z"/>
                </g>
            </g>       
        </g>
        
    ) 
}

export {
    ObjectInSpace,
    TheShip,
    ObjectsInSpace
}