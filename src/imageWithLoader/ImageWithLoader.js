import React, { useState } from 'react';

import "./ImageWithLoader.css";

function ImageWithLoader({
    src, alt, className
}) {
    const [ isImageLoaded, setIsImageLoaded ] = useState(false);
    const [ isImageErr, setIsImageErr] = useState(false);
  
    const onError = () => {
      setIsImageErr(true);
      setIsImageLoaded(false)
    }

  return (
    <div className={className}>
        {!isImageLoaded && <p className='card__loader'>
			{isImageErr ? "Помилка доступу до фото..." : "Фото загружається..." }</p>}
        <img 
			src={`http://hipstagram.node.ed.asmer.org.ua/${src}`} 
			alt={alt}
			className={`card__img ${isImageLoaded ? 'card__img__loaded' : ''}`}
            onLoad={(() => setIsImageLoaded(true))}
			onError={onError}
        />
    </div>
  )
}

export default ImageWithLoader