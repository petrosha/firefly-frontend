import { makeObservable, observable, action, computed } from "mobx";

export default class {
    timeStamp=0;
    names=[];
    selected=[];
    current=undefined;

    constructor(rootStore) {
      makeObservable(this, {
        names: observable, //все пришедшие с сервера
        selected: observable, //выбранные на этом терминале в начале работы
        current: observable, //активное сейчас меню
        listToSelect: computed,
        list: computed,
        setData: action,
        setCurrent: action,
      });
//      autorun(() => console.log(this.report));
      this.rootStore = rootStore;
    }

    get listToSelect(){
        return this.names.filter(el=>!el.hidden);
    }

    get list(){
      return this.selected;
    }

    setData(menu){
        if(menu.timeStamp>this.timeStamp){
            this.names=[...menu.names];
//            console.log("Names: ", this.names.filter(el=>!el.hidden));
            this.selected=[...menu.selected];
            if(this.selected[0]) this.current=this.selected[0];
            this.timeStamp=menu.timeStamp;
        }
    }    
    
    setCurrent(current){
        this.current=current;
    }
  
    
}
  
