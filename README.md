# Autosuggestion Project

A full-stack web application that provides real-time word autosuggestions using a Trie data structure.

## Project Structure

```
autosuggestion/
├── backend/
│   ├── app.py              # Flask application
│   ├── trie.py             # Trie data structure implementation
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # HTML UI
│   └── app.js              # JavaScript for interactivity
└── data/
    └── words.txt           # 50,000 English words
```

## Features

- **Real-time Autosuggestions**: Suggestions appear as you type with a 250-300ms debounce delay
- **Trie-based Search**: Efficient prefix-based word lookup using Trie data structure
- **Beautiful UI**: Modern, responsive design with smooth animations
- **CORS Enabled**: Frontend and backend can run independently

## Backend Setup

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will start on `http://localhost:5000` and load 50,000 words into the Trie data structure.

## Frontend Setup

### Prerequisites
- Any modern web browser

### Running

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your browser or serve it with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Then visit http://localhost:8000
   ```

## API Documentation

### GET /api/suggestions

Fetches autosuggestions for a given prefix.

**Query Parameters:**
- `q` (required): The search prefix
- `limit` (optional): Maximum number of suggestions (default: 5)

**Response:**
```json
[
  "apple",
  "application",
  "apply"
]
```

## How It Works

1. **Backend**: Reads 50,000 English words from `data/words.txt` and inserts them into a Trie data structure on startup
2. **User Input**: User types in the search box
3. **Debouncing**: JavaScript waits 250-300ms after each keystroke
4. **API Call**: Frontend makes a GET request to `/api/suggestions?q=prefix`
5. **Trie Search**: Backend searches the Trie for words starting with the prefix
6. **Results**: Returns up to 5 matching suggestions as JSON
7. **Display**: Frontend displays suggestions in a dropdown below the input box

## Technologies Used

- **Backend**: Python, Flask, Flask-CORS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Structure**: Trie (Prefix Tree)

## Performance

- **Word Loading**: ~50,000 words loaded into Trie in ~1-2 seconds
- **Suggestion Lookup**: O(m + n) where m is prefix length and n is number of suggestions
- **Memory**: Efficient prefix-based storage

## License

This project is open source and available for educational purposes.
