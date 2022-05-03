function InfoToolTip(props) {
    
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
            <div className="popup__container">
                <button 
                    type="button"
                    className="popup__close-button popup__close-button_profile"
                    onClick={props.onClose}
                />
                <div className='popup__container-info'>
                    <img 
                        className="popup__info-icon" 
                        src={props.icon}
                        alt={props.text}
                    />
                    <p className="popup__info-text">{props.text}</p>
                </div>
                
            </div>
        </div>
    )
}

export default InfoToolTip;