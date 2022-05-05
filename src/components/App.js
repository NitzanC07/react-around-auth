import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import api from '../utils/api.js';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './login.js';
import InfoToolTip from './InfoToolTip.js';
import iconSuccess from '../images/tool-tip-success.svg';
import iconFailed from '../images/tool-tip-failed.svg';


//** This the main file of the application.  */
function App() {

    const [currentUser , setCurrentUser ] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
            setCurrentUser(userData);
            setCards(cardsData);
        })
        .catch(err => {
            console.log("Error - there is any communication with the server: ", err);
        });
    }, []);
 
    function handleCardLike(card) {
        // Check one more time if this card was already liked
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Send a request to the API and getting the updated card data
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            // console.log(newCard);
            setCards((state) => 
                state.map((c) => c._id === card._id ? newCard : c ));
        })
        .catch((err) => {
            console.log("Error - there is any communication with the server: ", err);
        })
    }
  
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
    const [isInfoToolTipSuccess, setInfoToolTipSuccess] = useState(false);
    const [isInfoToolTipFaild, setInfoToolTipFaild] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
        
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setInfoToolTipSuccess(false);
        setInfoToolTipFaild(false);
    }
    
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleInfoToolTipSuccess() {
        setInfoToolTipSuccess(true);
    }

    function handleInfoToolTipFaild() {
        setInfoToolTipFaild(true);
    }

    function handleImageClick(card) {
        setSelectedCard(card)
        setImagePopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        // console.log("Ask to delete: ", card);
        setSelectedCard(card);
        setDeleteCardPopupOpen(true);
    }

    function handleCardDelete(card) {
        // console.log("Card was submitted: ", card);
        setSelectedCard(card)
        const cardId = card._id
        api.deleteCard(cardId)
        .then(() => {
            // console.log("Card was deleted.", card);
            setCards((cards) => cards.filter((c) => c._id !== cardId))
            closeAllPopups();
        })
        .catch((err) => {
            console.log("Error - there is any communication with the server: ", err);
        })
    }

    useEffect(() => {
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keyup', closeByEscape)
        return () => document.removeEventListener('keyup', closeByEscape)
    }, [])

    useEffect(() => {
        const closeByOverlay = (evt) => {
            if(evt.target.classList.contains('popup_open')) {
                closeAllPopups();
            }
        }
        document.addEventListener('mouseup', closeByOverlay)
        return () => document.removeEventListener('mouseup', closeByOverlay)
    }, [])

    function handlerUpdateUser(data) {
        api.setUserInfo(data)
            .then(() => {
                // console.log("User data updated: ", data);
                setCurrentUser({
                    name: data.name, 
                    about: data.about, 
                    avatar: currentUser.avatar,
                    _id: currentUser._id,
                    cohort: currentUser.cohort
                })
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Error - there is any communication with the server: ", err);
            })
    }

    function handlerUpdateAddCard(newCard) {
        api.createCard(newCard)
            .then((card) => {
                // console.log("Card was added.", card);
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Error - there is any communication with the server: ", err);
            })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(() => {
                // console.log("Avatar was updated: ", data);
                setCurrentUser({
                    name: currentUser.name, 
                    about: currentUser.about, 
                    avatar: data.avatar,
                    _id: currentUser._id,
                    cohort: currentUser.cohort
                })
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Error - there is any communication with the server: ", err);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header 
                        isLoggedIn={isLoggedIn} 
                        user={currentUser}
                        // page={}
                    />

                    <Switch>
                        <ProtectedRoute exact path='/' loggedIn={isLoggedIn}>
                            <Main 
                                onEditProfileClick={handleEditProfileClick}
                                onAddPlaceClick={handleAddPlaceClick}
                                onEditAvatarClick={handleEditAvatarClick}
                                onCardClick={handleImageClick}
                                isEditProfilePopupOpen={isEditProfilePopupOpen}
                                isAddPlacePopupOpen={isAddPlacePopupOpen}
                                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                                isImagePopupOpen={isImagePopupOpen}
                                cards={cards}
                                onCardDelete={handleDeleteCardClick}
                                onCardlikeClick={handleCardLike}
                            />

                            <Footer />
                        </ProtectedRoute>

                        <Route path='/signup'>
                            <Register 
                                title="Sign up"
                                link="Log in" 
                                isLoggedIn={isLoggedIn}
                            />
                        </Route>
                        <Route path='/signin'>
                            <Login 
                                title="Log in"
                                link='Sign up'
                                isLoggedIn={isLoggedIn}
                            />
                        </Route>
                    </Switch>
                                        
                    <ImagePopup 
                        className="popup popup_type_image" 
                        isOpen={isImagePopupOpen ? 'popup_open' : ''} 
                        onClose={closeAllPopups}
                        selectedCard={selectedCard}
                    />

                    <InfoToolTip
                        name="info-success"
                        isOpen={isInfoToolTipSuccess ? 'popup_open' : ''}
                        onClose={closeAllPopups}
                        text='Success! You have now been registered.'
                        icon={iconSuccess}
                    />

                    <InfoToolTip
                        name="info-faild"
                        isOpen={isInfoToolTipFaild ? 'popup_open' : ''}
                        onClose={closeAllPopups}
                        text='Oops, something went wrong! Please try again.'
                        icon={iconFailed}
                    />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handlerUpdateUser}
                    />

                    <AddPlacePopup 
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAddCard={handlerUpdateAddCard}
                        cards={cards}
                    />

                    <EditAvatarPopup 
                        isOpen={isEditAvatarPopupOpen} 
                        onClose={closeAllPopups} 
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <DeleteCardPopup 
                        isOpen={isDeleteCardPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateDeleteCard={handleCardDelete}
                        selectedCard={selectedCard}
                    />
                    
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;