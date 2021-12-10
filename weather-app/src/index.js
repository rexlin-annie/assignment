import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import HourlyDataReducer from './redux/reducers/HourlyDataReducer';
import mySaga from './redux/sagas/saga';

//Redux configurations
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ HourlyDataReducer });
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

ReactDOM.render(  
  <React.StrictMode>
    <Provider store= {store}>
      <App />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
