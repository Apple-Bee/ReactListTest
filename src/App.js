import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './components/ApiRequest';

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
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (inputValue.trim() !== '') {
      try {
        await axios.post('/api/items', { name: inputValue });
        setInputValue('');
        fetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      alert('Please enter something');
    }
  };

  const deleteItem = async (index) => {
    try {
      await axios.delete(`/api/items/${items[index].id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`/api/items/${items[editIndex].id}`, { name: editValue });
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
        <ul>
          {items.map((item, index) => (
            <li key={item.id}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button id="Save-btn" onClick={saveEdit}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <input type="text" value={item.name} readOnly />
                  <button id="Edit-btn" onClick={() => startEdit(index, item.name)}>
                    Edit
                  </button>
                </>
              )}
              <button id="Delete-btn" onClick={() => deleteItem(index)}>
                Delete
              </button>
            </li>
          ))}
          <MovieList />
        </ul>
      </header>
    </div>
  );
}

export default App;



