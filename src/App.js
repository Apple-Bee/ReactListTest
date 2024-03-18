import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    } else {
      alert('Please enter something')
    }
  };

  const deleteItem = index => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = () => {
    const newItems = [...items];
    newItems[editIndex] = editValue;
    setItems(newItems);
    setEditIndex(null);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="App">
    <header>
    <div className='add-div'>
      <h1>The List</h1>
      
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id='Add-btn' onClick={addItem}>Add</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button id='Save-btn' onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={item}
                  readOnly
                />
                <button id='Edit-btn' onClick={() => startEdit(index, item)}>Edit</button>
              </>
            )}
            <button id='Delete-btn' onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </header>
    </div>
  );
}

export default App;


