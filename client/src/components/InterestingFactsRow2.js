import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InterestingFacts2Row extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<div className="oldestWinner-results-container">
				<div className="nominees">{this.props.nominees}</div>
				<div className="number">{this.props.number}</div>
			</div>
			<div className="winFirstNomination-results-container">
				<div className="nominees">{this.props.nominees}</div>
			</div>
			</div>
		);
	}
}