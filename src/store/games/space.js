import { makeObservable, observable, action, computed } from "mobx";
export default class {
    timeStamp = 0;
    pics = undefined;
    ort = undefined;
    status = false;

    constructor(rootStore) {
        makeObservable(this, {
            timeStamp: observable,
            pics:observable,
            ort:observable,
            status:observable,
            setData: action,
            setStatus: action
        });
        this.rootStore = rootStore;
    }

    setData(data) {
        if (data.timeStamp > this.timeStamp) {
            this.pics = Object.assign({},data.pics);
            this.ort = Object.assign({},data.ort);
            this.timeStamp = data.timeStamp;
            console.log("space: ", JSON.stringify(this.pics.currentName));
            console.log("ort: ", JSON.stringify(this.ort));
        }
    }

    setStatus() {
        this.status = !this.status;
        console.log("space status: ",this.status);

    }

}
