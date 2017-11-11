import 'regenerator-runtime/runtime';
import React         from 'react';
import ReactDOM      from 'react-dom';
import createHistory from 'history/createHashHistory';
import {
  Provider,
}  from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import {
  ConnectedRouter,
  routerMiddleware,
} from 'react-router-redux';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import StickyList from './containers/StickyList';

import reducers from './reducers/sidebar';
import rootSaga from './sagas/sidebar';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware,
                                                    routerMiddleware(history)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter onChange={() => this.handleRoute}>
        <Switch>
          <Route path="/stickies" component={StickyList} />
          <Redirect default to="/stickies" />
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  </Provider>, document.getElementById('container'));