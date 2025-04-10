import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import "./Modal.css";

const addSound = new Howl({
  src: ["/sounds/add.mp3"],
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
    if (newCard.title && newCard.content && newCard.about) {
      onSave(newCard);
      onClose();
      addSound.play();
    } else {
      alert("Please fill all");
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
            <h4>{card.about}</h4>
            <p>{card.content}</p>
          </>
        ) : (
          isEditMode && (
            <>
              <h2>Extract the Idea</h2>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newCard.title}
                onChange={handleInputChange}
              />
              <textarea
                name="about"
                placeholder="About"
                value={newCard.about}
                onChange={handleInputChange}
              />
              <textarea
                name="content"
                placeholder="Content"
                value={newCard.content}
                onChange={handleInputChange}
              />
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
