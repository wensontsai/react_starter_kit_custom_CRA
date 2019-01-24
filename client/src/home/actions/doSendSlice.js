import {
  SEND_SLICE_START,
  SEND_SLICE_SUCCESS,
  SEND_SLICE_FAILED
} from './actionTypes';

// start request
export function doSendSlice(modelPath, profilePath) {

  const payload = {
    modelPath: modelPath, 
    profilePath: profilePath
  };

  console.log('============ hi it action doSendSlice', payload);

  return {
    type: SEND_SLICE_START,
    payload
  };
}

// on successful
export function doSendSliceFulfilled(payload) {

  console.log('======== SEND SLICE SUCCESS =============', payload);

  return {
    type: SEND_SLICE_SUCCESS,
    payload
  };
}

// on fail
export function doSendSliceFailed(payload) {

  console.log('SEND SLICE FAILED WAAAH', payload);

  return {
    type: SEND_SLICE_FAILED,
    payload
  };
}