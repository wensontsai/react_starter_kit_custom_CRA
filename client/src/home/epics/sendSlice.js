import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { SEND_SLICE_START } from '../actions/actionTypes';

import { doSendSliceFulfilled, doSendSliceFailed } from '../actions/doSendSlice';

// Also now using v6 pipe operators
const sendSlice = (action$, state$) =>
    action$.pipe(
        ofType(SEND_SLICE_START),
        mergeMap(action => {
            let apiUrl = 'http://localhost:5000/api/slice';
            return ajax({
                    url: apiUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        modelPath: action.payload.modelPath,
                        profilePath: action.payload.profilePath
                    }
                })
                .pipe(
                    map(response => doSendSliceFulfilled(response)),
                    catchError(error => doSendSliceFailed(error.xhr.response))
                );
        })
    );

export default sendSlice;
