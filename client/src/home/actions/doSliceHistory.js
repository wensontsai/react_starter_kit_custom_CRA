import {
  REQUEST_SLICE_HISTORY_START,
  REQUEST_SLICE_HISTORY_SUCCESS,
  REQUEST_SLICE_HISTORY_FAILED
} from './actionTypes';

// start request
export function doSliceHistory(payload) {
  return {
    type: REQUEST_SLICE_HISTORY_START,
    payload
  };
}

// on successful
export function doSliceHistoryFulfilled(payload) {
  return {
    type: REQUEST_SLICE_HISTORY_SUCCESS,
    payload
  };
}

// on fail
export function doSliceHistoryFailed(payload) {
  return {
    type: REQUEST_SLICE_HISTORY_FAILED,
    payload
  };
}