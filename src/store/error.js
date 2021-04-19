import { makeObservable, observable, action} from "mobx";

export default class {
    error = undefined;
    errorText = undefined;

    constructor(rootStore) {
        makeObservable(this, {
            error: observable,
            errorText: observable,
            setError: action,
        });
        this.rootStore = rootStore;
    }
    
    setError(error,errorText) {
        this.error=error;
        this.errorText=errorText;
    }
}
  
