let myRound=(value) => Number(value.toFixed(10));
let toRad = (deg) => myRound(Math.PI*Number(deg)/180.0);
let toDeg = (rad) => myRound(180.0*Number(rad)/Math.PI);
let degToRange=(deg) =>{
    deg=myRound(deg%360); 
    if(deg<0) deg+=360;
    return deg;
}

let vectorEndCoords = (x,y,a,r) =>{ 
  x=Number(x);
  y=Number(y);
  a=Number(a);
  r=Number(r);
  // console.log("Vector Coords: ", x," ", y," ", a, " ", r);
  //  console.log("toRad: ",a," ",toRad(a));
  return [
    myRound(x+Math.sin(toRad(a))*r),
    myRound(y+Math.cos(toRad(a))*r)
  ]}

let vectorLength = (x1,y1,x2,y2) => {
  x1=Number(x1);
  y1=Number(y1);
  x2=Number(x2);
  y2=Number(y2);
  // console.log("Vector Length: ", x1," ", y1," ", x2, " ", y2);
  return myRound(Math.sqrt((x1-x2)**2+(y1-y2)**2));
}

let vectorAngle = (x1,y1,x2,y2) =>{
  x1=Number(x1);
  y1=Number(y1);
  x2=Number(x2);
  y2=Number(y2);

  let length=vectorLength(x1,y1,x2,y2);
  let angle = Math.acos((y2-y1)/length);
  if(x2<x1) angle = 2*Math.PI-angle;
  return myRound(toDeg(angle));
} 

const myDigitRandom=()=>Math.round(2*Math.round(Math.random())-1);
const myRangeRandom=(value,dis)=>myRound(Number(value)+myDigitRandom()*Number(dis)*Math.random());

export {
  myRound,
  toRad,
  toDeg,
  degToRange,
  vectorEndCoords,
  vectorLength,
  vectorAngle,
  myDigitRandom,
  myRangeRandom
}