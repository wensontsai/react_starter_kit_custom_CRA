// import React from 'react'
// import { Container } from 'reactstrap';
// import './style.css';

// class About extends React.Component {

//   render() {

//     return (
//      <div id="about">
//          <Container>
//              <h2 className="text-center">
//              About
//            </h2>
//            <p>About page content</p>
//            </Container>
//        </div>
//     );
//   }

// }

// export default About;

import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './style.css';

class About extends Component {
  constructor(props) {
	super(props);
	  this.state = {
		response: ''
	  };
  }

  componentDidMount() {
	this.callApi()
	  .then(res => this.setState({ response: res.express }))
	  .catch(err => console.log(err));
  }

  callApi = async () => {
	const response = await fetch('/api/hello');
	const body = await response.json();

	if (response.status !== 200) throw Error(body.message);

	return body;
  };

  render() {
	return (
        <div id="home">
            <Container>
                <div className="slice-container">
                <img src="https://media.giphy.com/media/B8l4KbEPvCpUI/giphy.gif"></img>
                <img src="https://media.giphy.com/media/cMVZb73Qawtlm/giphy.gif"></img>
                </div>
            </Container>
        </div>
	);
  }
}

export default About;