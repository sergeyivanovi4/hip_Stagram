import React from 'react';
import "./Textarea.css";

function Textarea({
    value,
    onChange,
	isLoading,
    placeholder,
	onSubmit,
	buttonText
}) {
  return (
    <div className='textarea__wrapper'> 

        <textarea 
                className='textarea' 
                placeholder={placeholder}
                value={value} 
                onChange={e => onChange(e.target.value)}
        />
        <button 
				className='textarea__btn'
				disabled={isLoading}
				onClick={() => onSubmit(value)}
        >
                    {buttonText}
        </button>
    </div>
  )
}

export default Textarea