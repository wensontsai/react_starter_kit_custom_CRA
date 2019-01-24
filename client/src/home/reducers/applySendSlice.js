import {
  SEND_SLICE_START,
  SEND_SLICE_SUCCESS,
  SEND_SLICE_FAILED
} from '../actions/actionTypes';

let initialState = {
  selectedFilePath: '',
  selectedProfilePath: '',
  completedDotMakerbotPath: '',
  completedGCodePath: '',
  isLoading: false,
  errors: []
};
function applySendSlice(state = initialState, action) {

  switch (action.type) {
    case SEND_SLICE_START:
      return Object.assign({}, state, {
        selectedFilePath: action.payload.modelPath,
        selectedProfilePath: action.payload.profilePath,
        isLoading: true
      });

    case SEND_SLICE_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });

    case SEND_SLICE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        completedDotMakerbotPath: action.payload.response.downloadLink,
        completedGCodePath: action.payload.response.downloadLink,
      });

    default:
      return state;
  }
}

export default applySendSlice;
