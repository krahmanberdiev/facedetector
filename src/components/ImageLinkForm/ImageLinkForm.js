import React from 'react';
import './imagelinkform.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit   }) => {
    return (
        <div className='imagelinkform'>
            <p className='f3'>
                {'Please enter the url of your picture '}
            </p>
            <div className ='center'>
                <div className='form pa4 center br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'
                        onClick={onButtonSubmit}
                        >Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm