import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// UI Components
import ArtifactSelect from '../components/ArtifactSelect';
import SliceView from '../components/SliceView';
import HistoryView from '../components/HistoryView';

// Actions
import { doSliceHistory } from '../actions/doSliceHistory';
import { doArtifactSelect } from '../actions/doArtifactSelect';
import { doSendSlice } from '../actions/doSendSlice';

import { bindActionCreators } from 'redux'

class SliceContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			artifactGroup: '',
			modelFilePath: '',
			profileFilePath: '',
			isArtifactInstalled: false,
			isSliceComplete: false
		};
	}

	componentDidMount() {
		// Introduce login/accounts to keep track of slice history later?
		let username = 'username';
		this.props.doSliceHistory(username);
		this.props.doArtifactSelect(username);
		// this.props.doSendSlice(username);
	}

	setArtifactGroup(artifactGroup) {
		console.log("artifact group set now...", artifactGroup);
		this.setState({ artifactGroup : artifactGroup });
	}

	installArtifactGroup() {
		console.log("installing artifact group -> ", this.state.artifactGroup);
		this.setState({ 
			isArtifactInstalled : true,
			isSliceComplete : false
		});
	}

	setModelFilePath(modelFilePath) {
		console.log('setModelFilePath', modelFilePath);
		this.setState({ modelFilePath : modelFilePath });
	}

	setProfileFilePath(profileFilePath) {
		console.log('setProfileFilePath', profileFilePath);
		this.setState({ profileFilePath : profileFilePath });
	}

	doSendSlice() {
		console.log('sending slice with ..', this.state.modelFilePath, this.state.profileFilePath);

		// Send slice with API call.
		this.props.doSendSlice(this.state.modelFilePath, this.state.profileFilePath);

		// Update state.
		this.setState({ isSliceComplete : true });
	}

	render() {
		console.log("props: ", this.props);
		console.log("state: ", this.state);

		let pageContent = ''

		if (this.props.loading) {
      		pageContent = (
        		<div className="slice-container">
          			Loading...
        		</div>
      		)
		} else {
			pageContent = (
				<ul className="slice-container">
				</ul>
			)
		}

		return (
			<div className="slice-container">
				<ArtifactSelect 
					artifactGroups={this.props.artifactGroups}
					setArtifactGroup={(artifactGroup) => this.setArtifactGroup(artifactGroup)}
					installArtifactGroup={() => this.installArtifactGroup()}
				/>
				<SliceView 
					isArtifactGroupSelected={this.state.isArtifactInstalled}
					isSliceComplete={this.state.isSliceComplete}
					modelFilePath={this.state.modelFilePath}
					profileFilePath={this.state.profileFilePath}
					setModelFilePath={(modelFilePath) => this.setModelFilePath(modelFilePath)}
					setProfileFilePath={(profileFilePath) => this.setProfileFilePath(profileFilePath)}
					doSendSlice={() => this.doSendSlice()}
				/>
				<HistoryView historyList={this.props.historyList}/>
			</div>
		);

	}
}

SliceContainer.propTypes = {
	modelFilePath: PropTypes.string,
	profileFilePath: PropTypes.string,
	currentArtifact: PropTypes.string,
	artifactGroups: PropTypes.array,
	historyList: PropTypes.array
};

const mapStateToProps = state => {
	return {
		currentArtifact: state.home.artifactSelect.currentArtifact,
		artifactGroups: state.home.artifactSelect.artifactGroups,
		historyList: state.home.sliceHistory.historyList,
		loading: state.home.sliceHistory.isLoading,
		selectedFilePath: state.home.sendSlice.selectedFilePath,
		selectedProfilePath: state.home.sendSlice.selectedProfilePath,
		completedDotMakerbotPath: state.home.sendSlice.completedDotMakerbotPath,
		completedGCodePath: state.home.sendSlice.completedGCodePath
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		doArtifactSelect,
		doSliceHistory,
		doSendSlice
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SliceContainer);
