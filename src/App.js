import axios from 'axios';
import './App.css';
import MovieList from './components/ApiRequest';
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks

function App() {
  const [items, setItems] = useState([]);
  const [titleValue, setTitleValue] = useState(''); // State for movie title
  const [directorValue, setDirectorValue] = useState(''); // State for director name
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
    if (titleValue.trim() !== '' && directorValue.trim() !== '') { // Check both title and director
      try {
        const newItem = { title: titleValue, director: directorValue };
        await axios.post('http://localhost:5103/api/movies', newItem);
        setTitleValue('');
        setDirectorValue('');
        fetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      alert('Please enter both title and director');
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5103/api/movies/${id}`);
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
      const response = await axios.get(`http://localhost:5103/api/movies/${id}`);
      const existingMovie = response.data;
  
      const updatedMovie = {
        ...existingMovie,
        title: editValue,
        director: editValue
      };
  
      await axios.put(`http://localhost:5103/api/movies/${id}`, updatedMovie);
  
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
            placeholder='Please type movie title'
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input 
            type='text' 
            placeholder='Please type director name'
            value={directorValue} // Use directorValue for input value
            onChange={(e) => setDirectorValue(e.target.value)} // Update directorValue state
            onKeyPress={handleKeyPress}
          />
          <button id="Add-btn" onClick={addItem}>
            Add
          </button>
        </div>
        <MovieList />
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
                  <input type="text" value={`${item.title} - ${item.director}`} readOnly />
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







