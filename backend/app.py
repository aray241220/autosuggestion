from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from trie import Trie

app = Flask(__name__)
CORS(app)

# Initialize the Trie
trie = Trie()

def load_words():
    """Load words from the words.txt file and insert them into the trie"""
    words_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'words.txt')
    print(f"Loading words from: {words_file}")
    
    try:
        with open(words_file, 'r', encoding='utf-16') as f:
            count = 0
            for line in f:
                word = line.strip()
                if word:
                    trie.insert(word)
                    count += 1
            print(f"Loaded {count} words into the trie")
    except Exception as e:
        print(f"Error loading words: {e}")

@app.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    """Get autosuggestions for the given input"""
    query = request.args.get('q', '').strip()
    limit = request.args.get('limit', 5, type=int)
    
    if not query:
        return jsonify([])
    
    suggestions = trie.get_suggestions(query, limit)
    return jsonify(suggestions)

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Loading words into trie...")
    load_words()
    print("Trie loaded. Server ready!")
    app.run(debug=True, port=5000)
