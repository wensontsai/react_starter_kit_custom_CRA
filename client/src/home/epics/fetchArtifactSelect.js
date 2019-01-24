import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { REQUEST_ARTIFACT_SELECT_START } from '../actions/actionTypes';

import { doArtifactSelectFulfilled, doArtifactSelectFailed } from '../actions/doArtifactSelect';

// Also now using v6 pipe operators
const fetchArtifactSelect = (action$, state$) =>
    action$.pipe(
        ofType(REQUEST_ARTIFACT_SELECT_START),
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
                    map(response => doArtifactSelectFulfilled(response)),
                    catchError(error => doArtifactSelectFailed(error.xhr.response))
                );
        })
    );

export default fetchArtifactSelect;
