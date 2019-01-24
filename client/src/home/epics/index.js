import { combineEpics } from 'redux-observable';

// import your Home Module epics here and combine them
// Place all epics in same directory
import artifactSelect from './fetchArtifactSelect'
import sliceHistory from './fetchSliceHistory'
import sendSlice from './sendSlice'

const home = combineEpics(
    artifactSelect,
	sliceHistory,
    sendSlice
);

export default home