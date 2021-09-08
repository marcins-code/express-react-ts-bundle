import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalTemplate from './templates/GlobalTemplate';
import Homepage from './views/pages/Homepage';
import Categories from './views/pages/Categories';

const App = () => (
  <BrowserRouter>
    <Switch>
      <GlobalTemplate>
        <Route path="/" exact component={Homepage} />
        <Route path="/categories" exact component={Categories} />
      </GlobalTemplate>
    </Switch>
  </BrowserRouter>
);

export default App;
