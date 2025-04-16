import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./Modal.css";
import { Howl } from "howler";


const errSound = new Howl({
  src: ["/sounds/err3.mp3"],
});



const Modal = ({ isEditMode, isViewMode, card, onClose, onSave }) => {
  const [newCard, setNewCard] = useState({
    title: "",
    about: "",
    content: "",
  });

  useEffect(() => {
    if (isEditMode && card) {
      setNewCard({
        title: card.title,
        about: card.about,
        content: card.content,
      });
    }
  }, [isEditMode, card]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleSave = () => {
    if (newCard.title.trim() && newCard.content.trim() && newCard.about.trim()) {
      onSave(newCard);
      onClose();
    } else {
      errSound.play();
         Swal.fire({
            text: "Please fill all the fields 😊",
            icon: 'warning',
            background: '#f3e5f5',
            confirmButtonText: 'ok',
            customClass: {
              confirmButton: 'my-ok-button',
              popup: 'small-alert',
              title: 'swal-custom-title',
              htmlContainer: 'swal-custom-text',
            },
          });
    }
  };


  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {isViewMode ? (
          <>
            <h2>{card.title}</h2>
            <h4> Idea about: {card.about} ⭐</h4>
            <p>{card.content}</p>
          </>
        ) : (
          isEditMode && (
            <>
<div className="field">
  <input
    type="text"
    name="title"
    id="title"
    placeholder=" "
    value={newCard.title}
    onChange={handleInputChange}
  />
  <label htmlFor="title">Title<span className="required-star">✨</span></label>
</div>

<div className="field">
  <textarea
    name="about"
    id="about"
    placeholder=" "
    value={newCard.about}
    onChange={handleInputChange}
  />
  <label htmlFor="about">Topic (e.g. flowers)<span className="required-star">🌻</span></label>
</div>

<div className="field">
  <textarea
    className="content"
    name="content"
    id="content"
    placeholder=" "
    value={newCard.content}
    onChange={handleInputChange}
  />
  <label htmlFor="content">Your idea with details<span className="required-star">🛸</span></label>
</div>

              <div className="edit-modal-btns">
                <button className="save" onClick={handleSave}>
                  Save
                </button>
                <button className="close-btn" onClick={onClose}>
                  Close
                </button>
              </div>
            </>
          )
        )}
        {!isEditMode && (
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
