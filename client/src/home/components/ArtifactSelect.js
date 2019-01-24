import React from 'react';
    
const ArtifactSelect = (props) => {
	return (
        <div className='artifact-select boxed'>
            <u><h5>Artifact Group</h5></u>
            <div>
                <p>Please select an artifact group to slice with.</p>

                <p>Currently loaded with: {props.currentArtifact || '...'}</p>
                <div>
                    <select
                        value={props.currentArtifact}
                        onChange={(e) => props.setArtifactGroup(e.target.value)}
                    >
                    {props.artifactGroups.map((artifactGroup, index) => {
                        return <option value={artifactGroup}>{artifactGroup}</option>
                    })}
                    </select>
                </div>

                <div>
                    <button
                        onClick={() => props.installArtifactGroup()}
                    >
                        Install artifact group
                    </button>
                </div>
            </div>
        </div>
	)
}

export default ArtifactSelect;