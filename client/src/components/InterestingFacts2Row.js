import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InterestingFacts2Row extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="BestPicActorActressSameYear-results-container">
				<div className="title">{this.props.title}</div>
				<div className="oldest">{this.props.nominees}</div>
				<div className="oldest">{this.props.number} </div>
				<div className="winFirstNominationActor">{this.props.WinFirstNominationActor}</div>
				<div className="youngest">{this.props.youngestWinner}</div>
				<div className="youngest">{this.props.age} </div>
				<div className="leadingRole4">{this.props.leadingRole4timesActor}</div>
				<div className="leadingRole4">{this.props.leadingRoleTimes} </div>
			</div>
		);
	}
}