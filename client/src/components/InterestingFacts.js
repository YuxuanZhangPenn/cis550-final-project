import React from 'react';
import PageNavbar from './PageNavbar';
import InterestingFactsRow from './InterestingFactsRow';
import '../style/InterestingFacts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InterestingFacts extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			recMovies: []
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
		this.submitOldestWinner = this.submitOldestWinner.bind(this);
		this.submitWinFirstNomination = this.submitWinFirstNomination.bind(this);
	}

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	submitMovie() {
		fetch("http://localhost:8081/interestingFacts/" + this.state.movieName,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(moviesList => {
			console.log(moviesList); //displays your JSON object in the console
			let moviesDivs = moviesList.map((movie, i) => 
			<InterestingFactsRow id={"movies-" + movie.title} title={movie.title} id = {movie.id} rating = {movie.rating} vote_count = {movie.vote_count}/>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				recMovies: moviesDivs
			});
		});
	}

	submitOldestWinner() {
		fetch("http://localhost:8081/oldestWinner",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFactsRow id={"movies-" + result.nominee} nominees={result.nominee} number = {result.number} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				oldestWinnerResults: resultDivs
			});
		});
	}



	submitWinFirstNomination() {
		fetch("http://localhost:8081/winFirstNomination",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFactsRow id={"movies-" + result.nominee} nominees={result.nominee}  />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				firstNominationResults: resultDivs
			});
		});
	}

	
	render() {

		return (
			<div className="InterestingFacts">
				<PageNavbar active="InterestingFacts" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		
			    		<div className="h5">Interesting Facts</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Movie Name" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
			    		</div>
			    	</div>
			    	<div className = "jumbotron">
			    		<div className="header-container">
			    			<div className="h4">Do you want to know something about actors?</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" > Oldest Winner </div>
			    				<div button className = "btn btn-info"> Youngest Winner </div>
			    				<div button className = "btn btn-info" > Most nomination </div>
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitOldestWinner}> Actor won most in a certain prize </div>
			    				<div button className = "btn btn-info"> Actor won most "Best Actor in supporting role" </div>
			    				<div button className = "btn btn-info" onClick={this.submitWinFirstNomination}> Actors win the first nomination </div>
			    			</div>
			    		</div>
			    		<div className="oldestWinner-results-container" id="results">
			    			{this.state.oldestWinnerResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.firstNominationResults}
			    		</div>
			    	</div>
			    	<div className = "jumbotron">
			    		<div className="header-container">
			    			<div className="h4">Do you want to know something about movies?</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info"> Movies won best picture, best actor and actress at the same year </div>
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info"> Most nominees in a year </div>
			    				<div button className = "btn btn-info"> Won most nominees in a year </div>
			    				<div button className = "btn btn-info"> Nominated, but won nothing </div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recMovies}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}