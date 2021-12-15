import { makeObservable, observable, action, computed } from "mobx";

export default class {
    timeStamp=0;
    soundsList={};
    playList=[];
    status=true;

    constructor(rootStore) {
        makeObservable(this, {
            timeStamp:observable,
            soundsList:observable,
            playList:observable,
            status:observable,
            setData:action,
        });
        this.rootStore = rootStore;
    }
    
    setData(data){
        if(data.timeStamp>this.timeStamp){
            this.soundsList = Object.assign({},data.soundsList);
            this.status=data.status;
            this.playList=[...data.soundsPlayList]
            this.timeStamp=data.timeStamp;
            console.log("Sounds: ", JSON.stringify(this.playList));

        }
    }

}
  
