import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Upload from './components/upload/Upload';
import Create from './components/upload/Create';

function App(): JSX.Element {
  return (
    <div className="App">
    <Navbar />
      <div className={'container'}>
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/upload/:uploadId"} component={Upload}/>
          <Route path={"/create"} component={Create} />
        </Switch>
      </div>
    </div>
  );
}
export default App;