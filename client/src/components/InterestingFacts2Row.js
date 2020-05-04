import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InterestingFacts2Row extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<div className="BestPicActorActressSameYear-results-container">
				<div className="title">{this.props.title}</div>
				<div className="nominees">{this.props.nominees}</div>
				<div className="number">{this.props.number}</div>
				<div className="WinFirstNominationActor">{this.props.WinFirstNominationActor}</div>
			</div>
			
			</div>
		);
	}
}