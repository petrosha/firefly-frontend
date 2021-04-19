import { makeObservable, observable, action, computed } from "mobx";

export default class {
    timeStamp=0;
    data = [];

    constructor(rootStore) {
      makeObservable(this, {
        data: observable, //все пришедшие с сервера
        listNames: computed,
        list: computed,
        listPowers: computed,
        listScreenNames:computed,
        listPowerProduction: computed,
        listPowerProductionScreenNames:computed,
        fuel:computed,
        setData: action,
      });
      this.rootStore = rootStore;
    }

    get listNames(){
        return this.data.filter(el=>!el.hidden).map((el)=>el.name);
    }
    
    get listScreenNames(){
      return this.list.filter(el=>el.power<0).map((el)=>el.screenName);
    }

    get list(){
      return this.data.filter(el=>!(el.hidden));
    }

    get fuel(){
      let ret = this.data.find(el=>(el.name=="fuel1"));
      if(ret) return ret.fuelStorage;
      return 0;
    }

    get listPowers(){
      return this.list.filter(el=>el.power<0).map(el=>-1.*el.power*Number(el.switchedOn));
    }

    get listPowerProduction(){
      return this.list.filter(el=>el.power>0).map(el=>el.power*Number(el.switchedOn)*el.effectiveness);
    }
    
    get powerLevel(){
      return this.listPowerProduction.reduce((prev,el)=>prev+el,0)-this.listPowers.reduce((prev,el)=>prev+el,0);
    }

    get listPowerProductionScreenNames(){
      return this.list.filter(el=>el.power>0).map(el=>el.screenName);
    }

    setData(systems){
        if(systems.timeStamp>this.timeStamp){
            this.data=[...systems.data];
            this.timeStamp=systems.timeStamp;
            // console.log("Systems: ", this.data.map((el)=>el.name));
          }
    }        
}
  
