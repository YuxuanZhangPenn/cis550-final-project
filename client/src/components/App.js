import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import FindMovies from './FindMovies';
import AwardByYear from './AwardByYear';
import InterestingFacts from './InterestingFacts';
import InterestingFacts2 from './InterestingFacts2';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<FindMovies />
							)}
						/>
						<Route
							exact
							path="/Dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/FindMovies"
							render={() => (
								<FindMovies />
							)}
						/>
						<Route
							path="/AwardByYear"
							render={() => (
								<AwardByYear />
							)}
						/>
						<Route
							path="/InterestingFacts"
							render={() => (
								<InterestingFacts />
							)}
						/>
						<Route
							path="/InterestingFacts2"
							render={() => (
								<InterestingFacts2 />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}