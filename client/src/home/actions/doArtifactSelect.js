import {
  REQUEST_ARTIFACT_SELECT_START,
  REQUEST_ARTIFACT_SELECT_SUCCESS,
  REQUEST_ARTIFACT_SELECT_FAILED
} from './actionTypes';

// start request
export function doArtifactSelect(payload) {
  return {
    type: REQUEST_ARTIFACT_SELECT_START,
    payload
  };
}

// on successful
export function doArtifactSelectFulfilled(payload) {
  return {
    type: REQUEST_ARTIFACT_SELECT_SUCCESS,
    payload
  };
}

// on fail
export function doArtifactSelectFailed(payload) {
  return {
    type: REQUEST_ARTIFACT_SELECT_FAILED,
    payload
  };
}