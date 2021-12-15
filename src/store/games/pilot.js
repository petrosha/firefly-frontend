import { makeObservable, observable, action, computed } from "mobx";
import net from "net/network";
import {
  myRound,
  toRad,
  toDeg,
  degToRange,
  vectorEndCoords,
  vectorLength,
  vectorAngle,
  myDigitRandom,
  myRangeRandom
} from "helpers/mathHelpers.js"

export default class {
  timeStamp=0;
  timer=10;
  data = {};
  program = {
    selected:undefined,
    target:undefined,
    timeStamp:0,
    type:"",
    goes:false,
    steps:6,
    curveParams:{}
  }

  navigationTask={
    right:[0,0,0,0,0,0,0],
    left:[0,0,0,0,0,0,0]
  }

  navigation = {
    right:{
      level:0,
      levelUp:0,
      levelLow:0,
      task:0,
      taskWidth:15,
      speed:5,
      speedLevel:0,
      speedLevelUp:"",
      speedLevelLow:1,
      boost:0
    },
    left:{
      level:0,
      levelUp:0,
      levelLow:0,
      task:0,
      taskWidth:15,
      speed:5,
      speedLevel:0,
      speedLevelUp:"",
      speedLevelLow:1,
      boost:0
    }
  }

  constructor(rootStore) {
    makeObservable(this, {
      data: observable, //все пришедшие с сервера
      setData: action,
      program: observable,
      programReset: action,
      programCopyFromServer:action,
      programSetRadarSelected:action,
      programSetType:action,
      programCurveInitParams:action,
      programSetAstroSelected:action,      
      timer:observable,
      timerChangeValue: action,
      navigation: observable,
      navigationChangeSpeed:action,
      navigationChangeLevel:action,
      navigationTask:observable,
      navigationCreateTask:action,
      navigationCheckEngines:action,
      navigationCheckTask:action
    });
    this.rootStore = rootStore;
  }

  navigationChangeSpeed(direction,side){
    let navi =  this.navigation[side];
    if(this.program.goes)
    {
      if(direction){
        navi.speedLevel = navi.speedLevel < 3 ? navi.speedLevel+1 : 3
      } else
      {
        navi.speedLevel = navi.speedLevel > -3 ? navi.speedLevel-1 : -3;
      }
    }
  }

  navigationCheckEngines = () => {
    if(!this.data.systems) return;
    let tmpBoost=0;
    if(this.data.systems.find(el=>el.name==="manJet1").switchedOn) tmpBoost++;
    if(this.data.systems.find(el=>el.name==="manJet2").switchedOn) tmpBoost++;
    this.navigation.left.boost=tmpBoost;
    tmpBoost=0;
    if(this.data.systems.find(el=>el.name==="manJet3").switchedOn) tmpBoost++;
    if(this.data.systems.find(el=>el.name==="manJet4").switchedOn) tmpBoost++;
    this.navigation.right.boost=tmpBoost;
  }

  navigationCheckTask = () => {
    if(this.program.goes && this.timer===1){
      const right=this.navigation.right;
      const left=this.navigation.left;
      
      let mistake=myRound((Math.abs(right.level-right.task)/right.taskWidth+Math.abs(left.level-left.task)/left.taskWidth)/2);

      let tmpData={
        "menu":"pilot",
        "action":"setTaskMistake",
        "data": mistake
      }
      net.netPostAction(this.rootStore.user.id,tmpData); 
    } 
  }

  navigationChangeLevel(side){
    let navi =  this.navigation[side];
    // console.log("Navi: ",this.program.steps);
    if(this.program.steps === 6){
      navi.level=0
      navi.levelUp = 0;
      navi.levelLow = 0;
      navi.speedLevel=0;
      navi.speedLevelUp = "";
      navi.speedLevelLow = 0;
      return;
    }

    let change = Math.round(navi.speed*navi.speedLevel*navi.boost);
    if(change>0){
      navi.level = navi.level + change < 100 ? navi.level+change : 100
    } else
    {
      navi.level = navi.level + change > -100 ? navi.level+change : -100
    }

    navi.levelUp = navi.level>0 ? navi.level : 0 ;
    navi.levelLow = navi.level<0 ? navi.level : 0 ;
    navi.speedLevelUp = navi.level>=0 ? "" : Math.round(navi.speedLevel*navi.boost);
    navi.speedLevelLow = navi.level<0 ? "" : Math.round(navi.speedLevel*navi.boost);
  }

  navigationCreateTask(){
    const taskTemplate={
      "attack":[0,90,75,50,75,25,0],
      "evade":[0,70,45,30,45,70,0],
      "dock":[0,75,35,50,35,25,0],
      "orbit":[0,30,60,60,35,25,0],
      "course":[0,25,35,45,35,25,0],
      "astro":[0,70,55,45,35,25,0],
    }

    let taskProgram=taskTemplate[this.program.type];
    this.navigationTask={
      right:[],
      left:[]}

    taskProgram.forEach((el,idx) => {
      let tmpSign=myDigitRandom();
      let tmpSignL=[0,1,-1,1,-1,1,0]
      let tmpSignR=[0,1,1,1,1,1,0]

      this.navigationTask.right.push(myRangeRandom(el,10)*tmpSignR[idx]*tmpSign); 
      this.navigationTask.left.push(myRangeRandom(el,10)*tmpSignL[idx]*tmpSign); 
    })

    console.log("TASK: "+JSON.stringify(this.navigationTask));
  }

  timerChangeValue(){
    this.timer--;
  }

  setData(data){
    this.timerChangeValue();
    this.navigationCheckEngines();
    this.navigationChangeLevel("right");
    this.navigationChangeLevel("left");
    this.navigationCheckTask();

    if(data.timeStamp>this.timeStamp){
      this.timer=10;
      this.data = Object.assign({},data.data);
      this.timeStamp=data.timeStamp;
    }

    if(this.data.program.timeStamp > this.program.timeStamp) this.programCopyFromServer(data);

    if(this.program.selected && this.program.target==="radar"){ //проверка, вдруг выбранный объект исчез с радара
      let tmpAim=this.data.radar.find(el=>el.id === this.program.selected);
      if(!tmpAim) this.programReset();
      else if(tmpAim.timeStamp > this.program.timeStamp){
        this.program.timeStamp = tmpAim.timeStamp;
        if(this.program.type) this.programCurveInitParams();
      }
    }  

    this.navigation.right.task=this.navigationTask.right[this.program.steps];
    this.navigation.left.task=this.navigationTask.left[this.program.steps];
    
  }
  
  programReset(){
    this.program.selected=undefined;
    this.program.timeStamp=0;
    this.program.type="";
    this.program.target=undefined;
    this.program.goes=false;
    this.program.steps=6;
    this.program.curveParams={};
  }  

  programCopyFromServer(data){
    let program=this.data.program;
    this.program.selected=program.selected;
    this.program.timeStamp=program.timeStamp;
    this.program.type=program.type;
    this.program.target= program.target;
    this.program.goes=program.goes;
    this.program.steps=program.steps;
    this.program.curveParams=program.curveParams;
  }
  
  programSetRadarSelected(id){
    console.log("Selected: ",id);
    if(!this.program.goes){
      let tmpAim=this.data.radar.find(el=>el.id===id);
      if(tmpAim){
        this.programReset();
        this.program.selected = id;
        this.program.target = "radar";
        this.program.timeStamp = this.timeStamp;  
      }
    }
  }

  programSetAstroSelected(name){
    // console.log("Astro selected: ",name);
    if(!this.program.goes){
      let tmpAim=this.data.astro.objects.find(el=>el.name===name);
      if(tmpAim){
        this.programReset();
        this.program.selected = name;
        this.program.target = "astro";
        this.program.timeStamp = this.timeStamp+1;
        // console.log("Astro program ",JSON.stringify(this.program));  
      }
    }
  }

  programSetType(type){
    
    if(!this.data.systems.find(el=>el.name==="navComp1").switchedOn) return;

    if(!this.program.goes){
      if(this.program.selected){      
        this.program.type="";
        let tmpAim;
        switch(true){
          case (type === "attack" || type === "orbit" || type === "evade" || type === "dock"):
            tmpAim=this.data.radar.find(el=>el.id===this.program.selected);
            if(this.program.target==="radar" && vectorLength(0,0,tmpAim.eX,tmpAim.eY) <= 500) this.program.type=type;
            break;
          case (type === "course"):
            tmpAim=this.data.radar.find(el=>el.id===this.program.selected);
            if(this.program.target==="radar" && vectorLength(0,0,tmpAim.eX,tmpAim.eY) > 500) this.program.type=type;
            break;
          case (type === "astro"):
            if(this.program.target==="astro") this.program.type=type;
            break; 
        }
        if(this.program.type) { 
          this.programCurveInitParams();
          this.program.timeStamp=this.timeStamp;
        }
    }}
  }

  programCurveInitParams=()=>{
    let ship=this.data.ship;
    let program=this.program;
    
    let beginParams = [...vectorEndCoords(0,0,ship.sysAngle,25),ship.sysAngle,0,25+Math.round(75*Math.random())];
    let endParams = [];
    let front = false;

    let selectedParams;

    if(program.selected){
      if(program.target==="radar"){
        selectedParams = this.data.radar.find(el=> program.selected === el.id)
        if(program.type === "attack") {
          endParams = [...vectorEndCoords(
                            selectedParams.eX,
                            selectedParams.eY,
                            selectedParams.eA,
                            selectedParams.size+2*selectedParams.speed+10),
                            selectedParams.eA,
                            0,
                            50
                      ];
          beginParams[3]=randomRadius(selectedParams.speed,0.15);
          endParams[3]=randomRadius(selectedParams.speed,0.15);
          front = true;
        } else
        if(program.type === "dock") {
          endParams = [...vectorEndCoords(
                            selectedParams.eX,
                            selectedParams.eY,
                            selectedParams.eA+180,
                            selectedParams.size+5),
                            selectedParams.eA,
                            0,
                            75
                      ];
          beginParams[3]=randomRadius(selectedParams.speed,0.5);
          endParams[3]=Math.round(25+25*Math.random());
          front = false;
        } else
        if(program.type === "orbit") {
          let tmpAngle=90*(Math.round(Math.random())*2-1);
          endParams = [...vectorEndCoords(
                            selectedParams.eX,
                            selectedParams.eY,
                            selectedParams.eA+tmpAngle,
                            selectedParams.size+35),
                            selectedParams.eA,
                            0,
                            50+Math.round(50*Math.random())
                      ];
          beginParams[3]=randomRadius(selectedParams.speed,0.15);
          endParams[3]=randomRadius(25,0.5);
          front = Math.round(Math.random()) ? true : false;
        } else
        if(program.type === "evade") {
          let tmpAngle=90*(Math.round(Math.random())*2-1);
          endParams = [...vectorEndCoords(
                            selectedParams.eX,
                            selectedParams.eY,
                            selectedParams.eA+tmpAngle,
                            selectedParams.size+100),
                            selectedParams.eA,
                            0,
                            50+Math.round(50*Math.random())
                      ];
          beginParams[3]=randomRadius(25,0.5);
          endParams[3]=randomRadius(selectedParams.speed,0.5);
          tmpAngle=degToRange(selectedParams.eA-ship.sysAngle);
          front = tmpAngle>=90 && tmpAngle<=270 ? true : false;
        }else
        if(program.type === "course") {
          let tmpAngle=Math.round(vectorAngle(0,0,selectedParams.eX,selectedParams.eY));
          endParams = [...vectorEndCoords(
                            0,
                            0,
                            tmpAngle,
                            500),
                            tmpAngle,
                            0,
                            50+Math.round(50*Math.random())
                      ];
          beginParams[3]=randomRadius(25,0.5);
          endParams[3]=randomRadius(100,0.7);
          front = false;
        } 
      } else
      if(this.program.target="astro"){
        if(program.type === "astro") {
          let tmpAngle=Math.round(360*Math.random());
          endParams = [...vectorEndCoords(
                            0,
                            0,
                            tmpAngle,
                            1200),
                            tmpAngle,
                            0,
                            100
                      ];
          beginParams[3]=randomRadius(25,0.5);
          endParams[3]=randomRadius(125,0.15);
          front = false;
        } 
      } 
    
      let tmpParams={
        beginParams:beginParams,
        endParams:endParams,
        front:front
      }
      this.program.curveParams = Object.assign(tmpParams,trajectoryCurveParams(tmpParams));
    }
  }
} 
let randomRadius=(speed,dev)=>{
  let lspeed;
  if(speed<25) lspeed=25
  else if(lspeed>125) lspeed=125
  else lspeed=speed;

  let rad=0;
  while(rad<25 || rad>125){
    rad = Math.round(lspeed*(1-dev+2*dev*Math.random()))
  }
  return rad;
}

const trajectoryCurveParams = (curveParams) => {
  let [bX0,bY0,bA,bR,bLength] = curveParams.beginParams;//beginning path coords
  let [eX0,eY0,eA,eR,eLength] = curveParams.endParams;  
  let front = curveParams.front; 
  
  //начало первой арки
  let [bX,bY]=vectorEndCoords(bX0,bY0,bA,bLength);
  //конец второй арки
  let [eX,eY] = front ? vectorEndCoords(eX0,eY0,eA,eLength) : vectorEndCoords(eX0,eY0,eA+180,eLength);
 
  let bHand = 1, eHand = 1; //с какой стороны от начала и конца центр окружности, 1 - справа.
  let cross = 1; // 1 - перекрещивать траекторию, -1 нет. 

  bA = degToRange(bA); //чтобы углы были от 0 до 360. 
  eA = degToRange(eA);

  let dirAngleB=myRound(degToRange(vectorAngle(bX,bY,eX,eY)-bA)); //направление от B до E;
  bHand = dirAngleB>=0 && dirAngleB <=180 ? 1 : -1; //выбираем ближнюю сторону по умолчанию
  let dirAngleE=myRound(degToRange(vectorAngle(eX,eY,bX,bY)-eA)); //направление от E до B;
  eHand = dirAngleE>=0 && dirAngleE <=180 ? 1 : -1; //выбираем ближнюю сторону по умолчанию

  let bRCC = vectorEndCoords(bX,bY,bA+bHand*90,bR);
  // console.log("bRCC: ",bRCC);
  let eRCC = vectorEndCoords(eX,eY,eA+eHand*90,eR);
  // console.log("eRCC: ",eRCC);

  if(vectorLength(...bRCC,...eRCC)<=myRound(bR+eR)){ // в этом случае нет варианта с пересечением 
    eHand =  -1* eHand;
    eRCC = vectorEndCoords(eX,eY,eA+eHand*90,eR);
    // console.log("eRCC1: ",eRCC);
      
    if(vectorLength(...bRCC,...eRCC)<=myRound(bR+eR)){ //в этом случае и не кросс решения нет. 
      bHand= -1*bHand;
      bRCC = vectorEndCoords(bX,bY,bA+bHand*90,bR);
      // console.log("bRCC1: ",bRCC);
    }
  }

  let tmpDir = front ? 1 : -1; //выбираем траекторию в зависимости от задачи
  cross= bHand*eHand*tmpDir;

  let circleCentersAngle=vectorAngle(...bRCC,...eRCC);
  let circleCentersDistance=vectorLength(...bRCC,...eRCC);
  // console.log("circleCA: ",circleCentersAngle);
  // console.log("circleCD: ",circleCentersDistance);

  let tmpAngle = myRound(toDeg(Math.acos((bR+cross*eR)/circleCentersDistance)));
  let bRadius2Angle = myRound(circleCentersAngle-bHand*tmpAngle);
  let eRadius2Angle = cross>0 ? bRadius2Angle +180 : bRadius2Angle;
  // console.log("tmpAngle: ",tmpAngle);
  // console.log("finalAngle: ",bRadius2Angle," ", eRadius2Angle );


  let bStraightCoord = vectorEndCoords(...bRCC,bRadius2Angle,bR);
  let eStraightCoord = vectorEndCoords(...eRCC,eRadius2Angle,eR);
 
  let [bX2,bY2] = [Math.round(bStraightCoord[0]),Math.round(bStraightCoord[1])]
  // console.log("bX2: ",bX2," bY2: ",bY2);
  let [eX2,eY2] = [Math.round(eStraightCoord[0]),Math.round(eStraightCoord[1])]
  // console.log("eX2 : ",eX2," eY2: ",eY2);

  let bDir = bHand > 0 ? 1 : 0;
  let bArcAngle = myRound(degToRange(90 + bHand*(bRadius2Angle - bA)))
  let bArcPar1 =  bArcAngle >0 && bArcAngle <180 ? 0 : 1; 

  let eDir = bHand*cross > 0 ? 0 : 1;
  let eConst = bHand*eHand*cross > 0 ? 90 : -90;
  let eArcAngle = myRound(degToRange(eConst + cross*bHand *((eRadius2Angle) - eA)));
  let eArcPar1 = eArcAngle >0 && eArcAngle <180 ? 0 : 1; 

  let middleAngle=vectorAngle(bX2,bY2,eX2,eY2); //угол центральной прямой
  return {
    curveSpecificParams:{
      bX0:bX0,bY0:bY0,bX:bX,bY:bY,bR:bR,bArcPar1:bArcPar1,bDir:bDir,bX2:bX2,bY2:bY2,
      eX2:eX2,eY2:eY2,eR:eR,eArcPar1:eArcPar1,eDir:eDir,eX:eX,eY:eY,eX0:eX0,eY0:eY0
    },
    coords:[
      {x:bX0,y:bY0,a:bA},
      {x:bX,y:bY,a:bA},
      {x:bX2,y:bY2,a:middleAngle},
      {x:eX2,y:eY2,a:middleAngle},
      {x:eX,y:eY,a:front ? eA+180 : eA},
      {x:eX0,y:eY0,a:front ? eA+180 : eA}
    ]
  }
}

