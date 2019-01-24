import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SliceContainer from './containers/SliceContainer';
import './style.css';

class Home extends Component {
	render() {
		return (
			<div id="home">
				<Container>
					<SliceContainer />
				</Container>
			</div>
		);
	}
}

export default Home;

