import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
//redux 
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Login from '../src/components/Login';
import Header from './routes/Header';
import LoadingComponent from '../src/components/LoadingComponent';

//create redux store ->  reducers -> 'actions - actionType' | applyMiddleWare()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



//provide the store to react 
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<LoadingComponent>
				<div>
					<Header />
					<Switch>
						<Route path="/login" component={Login} exact={true} />
			
							<Route path="/" component={App} exact={true} />
						
					</Switch>
				</div>
			</LoadingComponent>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
