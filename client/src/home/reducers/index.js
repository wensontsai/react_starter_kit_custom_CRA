import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import artifactSelect from './applyArtifactSelect'
import sliceHistory from './applySliceHistory'
import sendSlice from './applySendSlice'

const home = combineReducers({
    artifactSelect,
	sliceHistory,
    sendSlice
});

export default home;