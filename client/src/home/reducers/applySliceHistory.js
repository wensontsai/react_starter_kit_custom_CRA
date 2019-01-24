import {
  REQUEST_SLICE_HISTORY_START,
  REQUEST_SLICE_HISTORY_SUCCESS,
  REQUEST_SLICE_HISTORY_FAILED
} from '../actions/actionTypes';

let initialState = {
  historyList: [
      'test_01.makerbot', 
      'test_02.makerbot',
      'test_03.makerbot',
      'test_04.makerbot',
      'test_06.makerbot'
  ],
  isLoading: false,
  errors: []
};
function applySliceHistory(state = initialState, action) {

  switch (action.type) {
    case REQUEST_SLICE_HISTORY_START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case REQUEST_SLICE_HISTORY_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });

    case REQUEST_SLICE_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        // historyList: action.payload
      });

    default:
      return state;
  }
}

export default applySliceHistory;
