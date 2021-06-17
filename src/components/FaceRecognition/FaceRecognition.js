import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) =>{
    return (
        <div className='ma1 center'>
            <div className='center mt2'>
                <img id ='inputimage' alt='face' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>
            </div>            
        </div>
    );
}

export default FaceRecognition;