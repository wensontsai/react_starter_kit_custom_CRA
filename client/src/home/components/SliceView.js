import React from 'react';

const SliceView = (props) => {

    // Disable unless artifact group has been selected.
    const containerClass = 'slice-view boxed ' + (!props.isArtifactGroupSelected ? '' : '');
    const sliceCompleteClass = 'boxed ' + (!props.isSliceComplete ? 'disabled' : '');

    return (
        <div className={containerClass}>
            <u><h5>Slice View</h5></u>

            <div className='boxed'>
                <p>Please upload a model file and a profile with which to slice with.</p>
                <div id='drop-area'>
                  <form className='my-form'>
                    <p><i>Drag and Drop a model file onto the dashed region.</i></p>
                    <input 
                        type='file' 
                        id='fileElem' 
                        multiple={false}
                        accept='*' 
                        onChange={(e) => props.setModelFilePath(e.target.value)}
                        // onDrop={(e) => props.setModelFilePath(e.target.value)}
                        >
                    </input>
                    <div>{props.modelFilePath}</div>
                    <label
                        className='button_secondary' 
                        for='fileElem'>
                            Upload model file.
                    </label>
                  </form>
                </div>
                <div id='drop-area'>
                  <form className='my-form'>
                    <p><i>Drag and Drop a profile onto the dashed region.</i></p>
                    <input 
                        type='file' 
                        id='fileElem2' 
                        multiple={false}
                        accept='*' 
                        onChange={(e) => props.setProfileFilePath(e.target.value)}
                        // onDrop={(e) => props.setProfileFilePath(e.target.value)}
                        >
                    </input>
                    <div>{props.profileFilePath}</div>
                    <label
                        className='button_secondary' 
                        for='fileElem2'>
                            Upload profile file.
                    </label>
                  </form>
                </div>


                <button
                    onClick={() => props.doSendSlice()}
                    >
                    Slice away!
                </button>
            </div>

            <div className={sliceCompleteClass}>
                <u><h5>Download Completed Slices Here:</h5></u>

                <button>
                    download .makerbot
                </button>
                    <p>link: {props.downloadDotMakerbotLink || '...'}</p>

                <button>
                    download .gcode / link to gcode.ws
                </button>
                    <p>link: {props.downloadGCodeLink || '...'}</p>

                <button>
                    Slice Again.
                </button>

            </div>
        </div>
    )
}

export default SliceView;