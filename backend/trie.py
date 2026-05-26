class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Insert a word into the trie"""
        node = self.root
        for char in word.lower():
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def get_suggestions(self, prefix, limit=5):
        """Get a limited list of autosuggested strings based on a prefix"""
        suggestions = []
        node = self.root
        
        # Navigate to the prefix node
        for char in prefix.lower():
            if char not in node.children:
                return suggestions
            node = node.children[char]
        
        # DFS to collect words with limit
        self._dfs(node, prefix.lower(), suggestions, limit)
        return suggestions

    def _dfs(self, node, current_word, suggestions, limit):
        """Depth-first search to find words starting with prefix"""
        if len(suggestions) >= limit:
            return
        
        if node.is_word:
            suggestions.append(current_word)
        
        for char in sorted(node.children.keys()):
            if len(suggestions) >= limit:
                return
            self._dfs(node.children[char], current_word + char, suggestions, limit)
