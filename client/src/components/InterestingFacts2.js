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
			HighestRatingWinNothingYear: "",
			LeadingRole4timesChangeTime: "",
			AnimationYear: "",

			BestPicActorActressSameYearResult: [],
			HighestRatingWinNothingYearResult: [],
			oldestWinnerResults: [],
			youngestWinnerResults: [],
			firstNominationResults: [],
			LeadingRole4timesResults: [],
			Win3awardsResults: [],
			LowestRatingBestOscarStoryResults: [],
			AgeRangeResults: [],
			AnimationResults: [],
			OscarWhichGenreResults: [],
			OscarAwardWhichGenreResults: [],
			OscarDirectorActorResults: [],
			GoldenDirectorActorResults: []
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.handleHighestRatingWinNothingYearChange = this.handleHighestRatingWinNothingYearChange.bind(this);
		this.handleLeadingRole4timesChange = this.handleLeadingRole4timesChange.bind(this);
		this.handleAnimationYearChange = this.handleAnimationYearChange.bind(this);

		this.submitOldestWinner = this.submitOldestWinner.bind(this);
		this.submitYoungestWinner = this.submitYoungestWinner.bind(this);
		this.submitWinFirstNomination = this.submitWinFirstNomination.bind(this);
		this.submitBestPicActorActressSameYearChange = this.submitBestPicActorActressSameYearChange.bind(this);
		this.submitHighestRatingWinNothingYearChange = this.submitHighestRatingWinNothingYearChange.bind(this);
		this.submitLeadingRole4times = this.submitLeadingRole4times.bind(this);
		this.submitWin3awards = this.submitWin3awards.bind(this);
		this.submitLowestRatingBestOscarStory = this.submitLowestRatingBestOscarStory.bind(this);
		this.submitAgeRange = this.submitAgeRange.bind(this);
		this.submitAnimationYear = this.submitAnimationYear.bind(this);
		this.submitOscarWhichGenre = this.submitOscarWhichGenre.bind(this);
		this.submitOscarAwardWhichGenre = this.submitOscarAwardWhichGenre.bind(this);
		this.submitOscarDirectorActor = this.submitOscarDirectorActor.bind(this);
		this.submitGoldenDirectorActor = this.submitGoldenDirectorActor.bind(this);
	}

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	}

	handleLeadingRole4timesChange(e) {
		this.setState({
			LeadingRole4timesChangeTime: e.target.value
		});
	}

	handleHighestRatingWinNothingYearChange(e) {
		this.setState({
			HighestRatingWinNothingYear: e.target.value
		});
	}

	handleAnimationYearChange(e) {
		this.setState({
			AnimationYear: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */


	submitLeadingRole4times() {
		fetch("http://localhost:8081/leadingRole4times/"+this.state.LeadingRole4timesChangeTime,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.nominee} leadingRole4timesActor={result.nominee} leadingRoleTimes={result.number+" times"} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				LeadingRole4timesResults: resultDivs
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
				HighestRatingWinNothingYearResult: resultsDivs,
			});
		});
	}


	submitAnimationYear() {
		fetch("http://localhost:8081/animation/" + this.state.AnimationYear,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultsList => {
			console.log(resultsList); //displays your JSON object in the console
			let resultsDivs = resultsList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.film_title} AnimationTitle={result.film_title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				AnimationResults: resultsDivs,
			});
		});
	}



	submitBestPicActorActressSameYearChange() {
		fetch("http://localhost:8081/bestPicActorActressSameYear",
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
				BestPicActorActressSameYearResult: resultsDivs,
				Win3awardsResults: [],
				LowestRatingBestOscarStoryResults: [],
				AgeRangeResults: [],
				OscarWhichGenreResults: [],
				OscarAwardWhichGenreResults: []
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
			<InterestingFacts2Row id={"movies-" + result.nominee} nominees={result.nominee} number = {result.number+" times of nomination"} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				oldestWinnerResults: resultDivs,
				youngestWinnerResults: [],
				firstNominationResults: [],
				LeadingRole4timesResults: [],
				OscarDirectorActorResults: [],
				GoldenDirectorActorResults: []
			});
		});
	}


	submitYoungestWinner() {
		fetch("http://localhost:8081/youngestWinner",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.nominee} youngestWinner={result.nominee} age={result.age + " year's old"}  />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				
				oldestWinnerResults: [],
				youngestWinnerResults: resultDivs,
				firstNominationResults: [],
				LeadingRole4timesResults: [],
				OscarDirectorActorResults: [],
				GoldenDirectorActorResults: []
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
				youngestWinnerResults: [],
				firstNominationResults: resultDivs,
				LeadingRole4timesResults: [],
				OscarDirectorActorResults: [],
				GoldenDirectorActorResults: []
			});
		});
	}



	submitOscarDirectorActor() {
		fetch("http://localhost:8081/oscarDirectorActor",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} oscarDirectorActortitle={"movie: "+result.title} oscarDirectorActorName={"director's name: "+result.name} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				oldestWinnerResults: [],
				youngestWinnerResults: [],
				firstNominationResults: [],
				LeadingRole4timesResults: [],
				OscarDirectorActorResults: resultDivs,
				GoldenDirectorActorResults: []
			});
		});
	}



	submitGoldenDirectorActor() {
		fetch("http://localhost:8081/goldenDirectorActor",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} goldenDirectorActortitle={"movie: "+result.title} goldenDirectorActorName={"director's name: "+result.name} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				oldestWinnerResults: [],
				youngestWinnerResults: [],
				firstNominationResults: [],
				LeadingRole4timesResults: [],
				OscarDirectorActorResults: [],
				GoldenDirectorActorResults: resultDivs
			});
		});
	}




	submitLowestRatingBestOscarStory() {
		fetch("http://localhost:8081/lowestRatingBestOscarStory",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} LowestRatingBestOscarStoryTitle={result.title} LowestRatingBestOscarStoryRating={result.rating}/>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				Win3awardsResults: [],
				LowestRatingBestOscarStoryResults: resultDivs,
				AgeRangeResults: [],
				OscarWhichGenreResults: [],
				OscarAwardWhichGenreResults: []
			});
		});
	}

	submitWin3awards() {
		fetch("http://localhost:8081/win3awards",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} win3prizeTitle={result.title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				Win3awardsResults: resultDivs,
				LowestRatingBestOscarStoryResults: [],
				AgeRangeResults: [],
				OscarWhichGenreResults: [],
				OscarAwardWhichGenreResults: []
			});
		});
	}


	submitAgeRange() {
		fetch("http://localhost:8081/ageRange",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.age} ageRangeAge={result.age} ageRangeNum={"number of actor & actress: "+result.number} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				Win3awardsResults: [],
				LowestRatingBestOscarStoryResults: [],
				AgeRangeResults: resultDivs,
				OscarWhichGenreResults: [],
				OscarAwardWhichGenreResults: []
			});
		});
	}

	
	submitOscarWhichGenre() {
		fetch("http://localhost:8081/oscarWhichGenre",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.age} oscarWhichGenreGenre={result.genre} oscarWhichGenreNum={"number of movies: "+result.number} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				Win3awardsResults: [],
				LowestRatingBestOscarStoryResults: [],
				AgeRangeResults: [],
				OscarWhichGenreResults: resultDivs,
				OscarAwardWhichGenreResults: []

			});
		});
	}



	submitOscarAwardWhichGenre() {
		fetch("http://localhost:8081/oscarAwardWhichGenre",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.age} oscarAwardWhichGenreGenre={result.genre} oscarAwardWhichGenreNum={"number of movies: "+result.number} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				Win3awardsResults: [],
				LowestRatingBestOscarStoryResults: [],
				AgeRangeResults: [],
				OscarWhichGenreResults: [],
				OscarAwardWhichGenreResults: resultDivs
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
			    		<div className="input-container">
			    			<p>1. Actor won "Actor in a leading role” for over &nbsp;
			    			<input type='text' placeholder="Enter times" value={this.state.LeadingRole4timesChangeTime} onChange={this.handleLeadingRole4timesChange} id="BestPicActorActressSameYear" className="movie-input"/>
			    			&nbsp; times but never won (Please enter the number of times)</p>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitLeadingRole4times}>Submit</button>
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.LeadingRole4timesResults}
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
			    		<div>
			    		<p><br/></p>
			    		</div>
			    		<div className="input-container">
			    			<p>3. Animated movies made after 2000 which won Oscar but not Golden Award</p>
			    			<input type='text' placeholder="Enter Year" value={this.state.AnimationYear} onChange={this.handleAnimationYearChange} id="BestPicActorActressSameYear" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitAnimationYear}>Submit</button>
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.AnimationResults}
			    		</div>
			    	</div>

			    	<div className = "jumbotron">
			    		<div className="header-container">
			    			<div className="h4">Do you want to know something about actors?</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitYoungestWinner}> Youngest Winner </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitOscarDirectorActor}> Oscar best director also the actor of this film </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitGoldenDirectorActor}> Golden best director also the actor of this film </div> &nbsp;
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitOldestWinner}> Actor won most in a certain prize </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitWinFirstNomination}> Actors won at the first nomination </div> 
			    			</div>
			    		</div>
			    		<div className="oldestWinner-results-container" id="results">
			    			{this.state.oldestWinnerResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.firstNominationResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.youngestWinnerResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.OscarDirectorActorResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.GoldenDirectorActorResults}
			    		</div>
			    	</div>
			    	<div className = "jumbotron">
			    		<div className="header-container">
			    			<div className="h4">Do you want to know something about movies?</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitBestPicActorActressSameYearChange}> Movies won best picture, best actor and actress at the same year </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitWin3awards}> Movies won all the three prizes </div> &nbsp;
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitLowestRatingBestOscarStory}> Top 10 lowest rating movies which won Oscar best story</div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitAgeRange}> Age range when won the prize </div> &nbsp;
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitOscarWhichGenre}> number of each genre in Oscar nomination</div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitOscarAwardWhichGenre}> number of each genre in Oscar Award </div> &nbsp;
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.Win3awardsResults}
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.LowestRatingBestOscarStoryResults}
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.BestPicActorActressSameYearResult}
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.AgeRangeResults}
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.OscarWhichGenreResults}
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.OscarAwardWhichGenreResults}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}