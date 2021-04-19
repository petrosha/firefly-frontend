import React from 'react';

import { observer } from "mobx-react-lite"
import { useStore } from "./store/root_store";

import MenuSelect from "./components/menuSelect/menuSelect"
import Error from "./components/error/error"
import Spinner from "./components/spinner/spinner"
import MainScreen from "./components/mainScreen/mainScreen"

const App = observer(() => {
  const store = useStore();

  let componentToSHow=undefined;
  if(store.error.error) componentToSHow = <Error/>
  else 
  if(store.menus.names.length === 0) componentToSHow = <Spinner/>
  else 
  if(store.menus.selected.length === 0) componentToSHow = <MenuSelect/>
  else componentToSHow=(<MainScreen/>)

  return (
    <>
      {componentToSHow}
    </>
  )
})

export default App