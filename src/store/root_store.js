import React from "react"
import Menus from "./menus"
import User from "./user"
import ClientError from "./error"
import Systems from "./games/systems"

class Store {
    constructor() {
        this.menus = new Menus(this); 
        this.user = new User(this); 
        this.error = new ClientError(this); 
        this.systems = new Systems(this); 
    }  
}

export default new Store();

/* Store helpers */
const StoreContext = React.createContext();
 
export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
 
/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
 
/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};