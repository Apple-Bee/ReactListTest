import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
      const response = await axios.get('/api/MovieList'); // Update endpoint to match backend
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (inputValue.trim() !== '') {
      try {
        await axios.post('/api/MovieList', { title: inputValue }); // Update endpoint and data structuregfdfg
        setInputValue('');
        fetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      alert('Please enter something');
    }
  };

  const deleteItem = async (id) => { // Change parameter to id instead of index
    try {
      await axios.delete(`/api/MovieList/${id}`); // Update endpoint to delete by id
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = async (id) => { // Change parameter to id instead of index
    try {
      await axios.put(`/api/MovieList/${id}`, { title: editValue }); // Update endpoint and data structure
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
          {items.map((item) => ( // Change parameter name from index to item
            <li key={item.id}>
              {editIndex === item.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button id="Save-btn" onClick={() => saveEdit(item.id)}> {/* Pass id to saveEdit */}
                    Save
                  </button>
                </>
              ) : (
                <>
                  <input type="text" value={item.title} readOnly />
                  <button id="Edit-btn" onClick={() => startEdit(item.id, item.title)}> {/* Pass id to startEdit */}
                    Edit
                  </button>
                </>
              )}
              <button id="Delete-btn" onClick={() => deleteItem(item.id)}> {/* Pass id to deleteItem */}
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




