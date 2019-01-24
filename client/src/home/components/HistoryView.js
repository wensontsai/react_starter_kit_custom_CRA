import React from 'react';

const HistoryView = (props) => {
    return (
        <div className="history-view boxed">
            <u><h5>Slice History</h5></u>
            <div>
                {props.historyList.map((file_name, index) => {
                    return <p>{file_name}</p>
                })}
            </div>

            <img src="https://media.giphy.com/media/uA8WItRYSRkfm/giphy.gif"></img>
        </div>
    )
}

export default HistoryView;