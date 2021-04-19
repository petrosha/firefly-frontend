import { makeObservable, observable, action, computed } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export default class {
    id = undefined;
    name = undefined;
    timeStamp=0;

    constructor(rootStore) {
        makeObservable(this, {
            id: observable,
            name: observable,
            setId: action,
        });
        this.rootStore = rootStore;
    }
    
    setId() {
        let userId=localStorage.getItem("fireflyUserId");
        if(!userId) {
            userId = uuidv4();
            localStorage.setItem("fireflyUserId",userId);
            
        }
        this.id=userId;
    }

    setData({name, timeStamp}){
        if(timeStamp>this.timeStamp){
            this.name=name;
            this.timeStamp=timeStamp;    
        }
    }
}
  
