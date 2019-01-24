import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { REQUEST_SLICE_HISTORY_START } from '../actions/actionTypes';

import { doSliceHistoryFulfilled, doSliceHistoryFailed } from '../actions/doSliceHistory';

// Also now using v6 pipe operators
const fetchSliceHistory = (action$, state$) =>
    action$.pipe(
        ofType(REQUEST_SLICE_HISTORY_START),
        mergeMap(action => {
            let apiUrl = 'http://localhost:5000/api/hello';
            return ajax({
                    url: apiUrl,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                     
                    }
                })
                .pipe(
                    map(response => doSliceHistoryFulfilled(response)),
                    catchError(error => doSliceHistoryFailed(error.xhr.response))
                );
        })
    );

export default fetchSliceHistory;
