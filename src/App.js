import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './components/ApiRequest'; // Corrected import statement

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5103/api/movies');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (inputValue.trim() !== '') {
      try {
        const newItem = { id: items.length + 1, title: inputValue, director: "miss olgert" }; // Generate ID for new item
        await axios.post('http://localhost:5103/api/movies', newItem); // Post new item to backend
        setInputValue('');
        fetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      alert('Please enter something');
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/http://localhost:5103/api/movies/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`/api/MovieList/${id}`, { title: editValue });
      setEditIndex(null);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="App">
      <header>
        <div className="add-div">
          <h1>The List</h1>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="Add-btn" onClick={addItem}>
            Add
          </button>
        </div>
        <MovieList /> {/* Include MovieList component here */}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editIndex === item.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button id="Save-btn" onClick={() => saveEdit(item.id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <input type="text" value={item.title} readOnly />
                  <button id="Edit-btn" onClick={() => startEdit(item.id, item.title)}>
                    Edit
                  </button>
                </>
              )}
              <button id="Delete-btn" onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;





