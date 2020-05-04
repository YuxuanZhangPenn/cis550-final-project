import React from 'react';
import PageNavbar from './PageNavbar';
import InterestingFacts2Row from './InterestingFacts2Row';
import '../style/InterestingFacts2.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InterestingFacts2 extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			BestPicActorActressSameYear: "",
			HighestRatingWinNothingYear: "",

			recMovies: [],
			BestPicActorActressSameYearResult: [],
			HighestRatingWinNothingYearResult: [],
			oldestWinnerResults: [],
			firstNominationResults:[]
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.handleBestPicActorActressSameYearChange = this.handleBestPicActorActressSameYearChange.bind(this);
		this.handleHighestRatingWinNothingYearChange = this.handleHighestRatingWinNothingYearChange.bind(this);

		this.submitMovie = this.submitMovie.bind(this);
		this.submitOldestWinner = this.submitOldestWinner.bind(this);
		this.submitWinFirstNomination = this.submitWinFirstNomination.bind(this);
		this.submitBestPicActorActressSameYearChange = this.submitBestPicActorActressSameYearChange.bind(this);
		this.submitHighestRatingWinNothingYearChange = this.submitHighestRatingWinNothingYearChange.bind(this);
	}

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	}

	handleBestPicActorActressSameYearChange(e) {
		this.setState({
			BestPicActorActressSameYear: e.target.value
		});
	}

	handleHighestRatingWinNothingYearChange(e) {
		this.setState({
			HighestRatingWinNothingYear: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	submitMovie() {
		fetch("http://localhost:8081/bestPicActorActressSameYear/" + this.state.movieName,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(moviesList => {
			console.log(moviesList); //displays your JSON object in the console
			let moviesDivs = moviesList.map((movie, i) => 
			<InterestingFacts2Row id={"movies-" + movie.title} title={movie.title} id = {movie.id} rating = {movie.rating} vote_count = {movie.vote_count}/>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				recMovies: moviesDivs
			});
		});
	}


	submitBestPicActorActressSameYearChange() {
		fetch("http://localhost:8081/bestPicActorActressSameYear/" + this.state.BestPicActorActressSameYear,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultsList => {
			console.log(resultsList); //displays your JSON object in the console
			let resultsDivs = resultsList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.film_title} title={result.film_title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: resultsDivs
			});
		});
	}

	submitHighestRatingWinNothingYearChange() {
		fetch("http://localhost:8081/highestRatingWinNothing/" + this.state.HighestRatingWinNothingYear,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultsList => {
			console.log(resultsList); //displays your JSON object in the console
			let resultsDivs = resultsList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} title={result.title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				HighestRatingWinNothingYearResult: resultsDivs
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
			<InterestingFacts2Row id={"movies-" + result.nominee} nominees={result.nominee} number = {result.number} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				oldestWinnerResults: resultDivs,
				firstNominationResults: []
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
			<InterestingFacts2Row id={"movies-" + result.nominee} WinFirstNominationActor={result.nominee}  />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				oldestWinnerResults: [],
				firstNominationResults: resultDivs
			});
		});
	}

	
	render() {

		return (
			<div className="InterestingFacts2">
				<PageNavbar active="InterestingFacts2" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		
			    		<div className="h5">Interesting Facts</div>
			    		<br></br>
			    		<div className="input-container">
			    			<p>1. Films won best picture, actor and actress at the same year (Please select a year)</p>
			    			<input type='text' placeholder="Enter Year" value={this.state.BestPicActorActressSameYear} onChange={this.handleBestPicActorActressSameYearChange} id="BestPicActorActressSameYear" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitBestPicActorActressSameYearChange}>Submit</button>
			    		</div>
			    		<div className="BestPicActorActressSameYear-results-container" id="results">
			    			{this.state.BestPicActorActressSameYearResult}
			    		</div>
			    		<div>
			    		<p><br/></p>
			    		</div>
			    		<div className="input-container">
			    			<p>2. Movies of highest rating of that year but win nothing in that year’s awards (Please select a year)</p>
			    			<input type='text' placeholder="Enter Year" value={this.state.HighestRatingWinNothingYear} onChange={this.handleHighestRatingWinNothingYearChange} id="BestPicActorActressSameYear" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitHighestRatingWinNothingYearChange}>Submit</button>
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.HighestRatingWinNothingYearResult}
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