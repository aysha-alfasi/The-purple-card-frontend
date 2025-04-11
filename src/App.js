import React, { useState } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";
import { Howl } from "howler";
import Swal from 'sweetalert2';
import "./App.css";

const btnSound = new Howl({
  src: ["/sounds/btn.mp3"],
});
const finishSound = new Howl({
  src: ["/sounds/finish.mp3"],
});

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);

  const openAddModal = () => {
    btnSound.play();
    setIsEditMode(true);
    setIsViewMode(false);
    setCurrentCard(null);
    setModalVisible(true);
  };

  const openEditModal = (card) => {
    setIsEditMode(true);
    setIsViewMode(false);
    setCurrentCard(card);
    setModalVisible(true);
  };

  const openViewModal = (card) => {
    setIsViewMode(true);
    setIsEditMode(false);
    setCurrentCard(card);
    setModalVisible(true);
  };

  const saveCard = (newCard) => {
    if (currentCard) {
      setCards(
        cards.map((card) =>
          card.id === currentCard.id ? { ...newCard, id: currentCard.id } : card
        )
      );
    } else {
      setCards([...cards, { ...newCard, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteCard = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to retrieve this card after deletion!",
      icon: 'warning',
      background: '#f3e5f5',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'my-confirm-btn',
        cancelButton: 'my-cancel-btn',
        popup: 'large-alert',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
  
        Swal.fire({
          title: 'Deleted!',
          text: 'The card has been successfully deleted.',
          icon: 'success',
          background: '#f3e5f5',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-ok-button',
            popup: 'large-alert',
          }
        });
      }
    });
  };

  const handleFinish = (id) => {
    finishSound.play();
    Swal.fire({
      title: "This idea is now a reality🌟",
      text: `Card number ${id} has been terminated.`,
      icon: 'success',
      confirmButtonText: 'ok',
      customClass: {
        confirmButton: 'my-ok-button',
        popup: 'large-alert',
      },
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="App">
      <h1>The Purple Card</h1>
      <h2>Extract ideas from your mind to the world</h2>
      <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>
      <button className="Add" onClick={openAddModal}>
        {" "}
        Add Idea
      </button>
      {modalVisible && (
        <Modal
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          card={currentCard}
          onClose={closeModal}
          onSave={saveCard}
        />
      )}
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.about}
            onDelete={deleteCard}
            onEdit={() => openEditModal(card)}
            onFinish={handleFinish}
            onView={() => openViewModal(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
