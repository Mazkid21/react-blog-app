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
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from '../src/components/Login';
import Header from './routes/Header';
import LoadingComponent from '../src/components/LoadingComponent';
import AuthenticatedComponent from '../src/components/AuthenticatedComponent';
import NoteDetail from '../src/components/NoteDetail';
import NoteEdit from '../src/components/NoteEdit';

//create redux store ->  reducers -> 'actions - actionType' | applyMiddleWare()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



//provide the store to react 
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<LoadingComponent>
				<div>
					<Switch>
						<Route path="/login" component={Login} exact={true} />
						<Redirect from="/logout" to="/" />
						<AuthenticatedComponent>
							<Header />
							<Route path="/" component={App} exact={true} />
							<Route path="/:id" component={NoteDetail} exact={true} />
							<Route path="/:id/edit" component={NoteEdit} exact={true} />
						</AuthenticatedComponent>
					</Switch>
				</div>
			</LoadingComponent>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
