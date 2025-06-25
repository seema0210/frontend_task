import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import NewCard from './NewCard';

function App() {

  const [cards, setCards] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const getAllCards = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const getRes = await response.json()
      const finalUsers = getRes.users.slice(0, 9)
      return finalUsers;
    } catch (error) {
      console.log('fetch api error', error)
    }
  }

  const handleDelete = (currentId) => {
    try {
      fetch(`https://dummyjson.com/users/${currentId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })

      setCards((prevCard) => prevCard?.filter((item) => item.id !== currentId))
      toast.success("User deleted successfully");

    } catch (error) {
      toast.error("Error deleting user");
    }
  }

  const handleAdd = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    getAllCards().then((data) => setCards(data))
  }, [])

  return (
    <div className="container">
      <div className="button-container">
        <button className="add-btn" onClick={handleAdd}>
          Add User Card +
        </button>
      </div>
      <div className="card-grid">
        {cards.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.firstName} {item.lastName}</h3>
            <p>{item.email}</p>
            <div className="card-footer">
              <p>{item.role}</p>
              <button type='button' onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {
        openModal && (
          <div className="modal-overlay">
            <NewCard
            setOpenModal={setOpenModal}
            setCards={setCards}
            />
          </div>
        )
      }

      <ToastContainer position="top-center" autoClose={3000} />
    </div>

  );
}

export default App;
