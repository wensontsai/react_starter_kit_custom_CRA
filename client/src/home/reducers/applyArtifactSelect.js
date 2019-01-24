import {
  REQUEST_ARTIFACT_SELECT_START,
  REQUEST_ARTIFACT_SELECT_SUCCESS,
  REQUEST_ARTIFACT_SELECT_FAILED
} from '../actions/actionTypes';

let initialState = {
  artifactGroups: [
    'sombrero',
    'develop',
    'abr_3',
    'abr_k',
    'master',
    'sanity'
  ],
  isLoading: false,
  currentArtifact: '',
  errors: []
};
function applyArtifactSelect(state = initialState, action) {

  switch (action.type) {
    case REQUEST_ARTIFACT_SELECT_START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case REQUEST_ARTIFACT_SELECT_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });

    case REQUEST_ARTIFACT_SELECT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        currentArtifact: 'fawesf'
        // artifactGroups: action.payload
      });

    default:
      return state;
  }
}

export default applyArtifactSelect;
