# Developer Guide - Customizing the DM Assistant

This guide explains the project structure and how to add features or modify the app.

---

## Project Structure

```
Asistente de DM/
│
├── app.py                    # Flask backend (routes, logic)
├── requirements.txt          # Python dependencies
├── run.bat / run.sh         # Startup scripts
│
├── static/                   # Frontend assets
│   ├── css/
│   │   └── style.css        # Dark theme styling (~800 lines)
│   └── js/
│       └── app.js           # Frontend logic (~600 lines)
│
├── templates/                # HTML templates
│   ├── base.html            # Base layout with sidebar
│   └── index.html           # Main interface with all tools
│
├── data/                     # Local data storage
│   ├── rules_2024.json      # 2024 D&D reference data
│   ├── sessions/            # Session notes (user-generated)
│   └── initiative_state.json # Combat state (auto-saved)
│
├── README.md                # Main documentation
├── QUICKSTART.md            # Quick start guide
├── RULES_2024_REFERENCE.md  # 2024 rule changes
└── venv/                    # Virtual environment (auto-created)
```

---

## How to Add a New Feature

### Example: Add "Treasure Generator"

#### 1. Add Backend Route in `app.py`

```python
@app.route('/api/treasure/random', methods=['GET'])
def generate_treasure():
    """Generate random treasure"""
    try:
        treasures = [
            "100 gold coins",
            "A magical sword +1",
            "Potion of Healing x3",
            "Diamond necklace (500gp)"
        ]
        treasure = random.choice(treasures)
        return jsonify({"result": treasure})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
```

#### 2. Add Button in `templates/index.html`

Find the Random Tables section and add:
```html
<button class="btn btn-primary" id="rollTreasureBtn">💎 Random Treasure</button>
```

#### 3. Add JavaScript Handler in `static/js/app.js`

In `setupRandomTables()`:
```javascript
document.getElementById('rollTreasureBtn').addEventListener('click', rollTreasure);
```

Add the function:
```javascript
async function rollTreasure() {
    try {
        const response = await fetch('/api/treasure/random');
        const data = await response.json();
        
        document.getElementById('randomContent').innerHTML = `
            <h4>Treasure:</h4>
            <p>${data.result}</p>
        `;
        document.getElementById('randomResult').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}
```

#### 4. Add to data/rules_2024.json

```json
"treasure": [
    "100 gold coins",
    "A magical sword +1",
    ...
]
```

---

## Modifying the UI

### Change Colors

Edit `static/css/style.css`:
```css
:root {
    --bg-primary: #1a1a1a;      /* Change these colors */
    --accent-primary: #d4af37;  /* Gold */
    --accent-secondary: #8b0000; /* Dark red */
}
```

### Add a New Section

In `templates/index.html`:
```html
<!-- NEW FEATURE SECTION -->
<section id="my-feature" class="tool-section">
    <h3>My Feature 🎪</h3>
    <p class="tool-description">Description here</p>
    
    <div class="tool-controls">
        <button class="btn btn-primary" id="myButton">Action</button>
    </div>
</section>
```

Add to sidebar:
```html
<button class="nav-btn" data-tool="my-feature">🎪 My Feature</button>
```

---

## Adding to 2024 Rules Data

Edit `data/rules_2024.json` to add new reference data:

```json
{
  "my_new_table": [
    "Item 1",
    "Item 2"
  ],
  "notes_2024_changes": {
    "my_feature": "How this differs from 2014"
  }
}
```

Then access in Python:
```python
rules = RULES_2024
data = rules.get('my_new_table', [])
```

---

## Working with Session Notes

Session notes are stored as `.txt` files in `data/sessions/`:

### Read a Session Programmatically

```python
session_path = DATA_DIR / "sessions" / "session_5.txt"
with open(session_path, 'r', encoding='utf-8') as f:
    content = f.read()
```

### Extend to Other Formats

To support PDF or JSON export:
1. Add new endpoint in `app.py`
2. Read the `.txt` file
3. Convert to desired format
4. Return to user

---

## Debugging Tips

### Enable Flask Debug Mode

Already enabled by default in `app.py`:
```python
app.run(debug=True)
```

### Check Browser Console

Press F12 to open Developer Tools. Check:
- Console tab for JavaScript errors
- Network tab to see API calls
- Elements tab to inspect HTML

### Print Debug Info

In Python:
```python
print(f"DEBUG: {variable_name}")
```

In JavaScript:
```javascript
console.log("DEBUG:", variableName);
```

### Test API Endpoints

Use a tool like **Postman** or **curl**:
```bash
curl http://127.0.0.1:5000/api/npc/generate -X POST
```

---

## Performance Optimization

### Dice Rolling
Currently uses `random.randint()` - fast and sufficient

### Large Tables
If adding tables with 1000+ items, consider:
- Lazy loading
- Caching results
- Index-based lookup

### File I/O
Session notes are saved per-request. For high-frequency saves:
- Consider adding a database (SQLite)
- Or batch save operations

---

## Adding External Data

### Load Custom Monsters

Edit `data/rules_2024.json`:
```json
{
  "monsters": [
    {"name": "Goblin", "cr": 0.125, "xp": 50},
    {"name": "Orc", "cr": 0.5, "xp": 100}
  ]
}
```

Use in Encounter Builder frontend.

### Load Custom Spells

Create `data/spells_2024.json`:
```json
{
  "cleric_spells": ["Cure Wounds", "Healing Word"],
  "wizard_spells": ["Magic Missile", "Fireball"]
}
```

Load in Python:
```python
with open(DATA_DIR / 'spells_2024.json') as f:
    spells = json.load(f)
```

---

## Testing New Features

### Unit Test Pattern

```python
# In app.py, before running:
if __name__ == '__main__':
    # Test routes
    with app.test_client() as client:
        response = client.post('/api/npc/generate')
        print(response.json)
    app.run(debug=True, host='127.0.0.1', port=5000)
```

### Frontend Testing

Add test buttons in `templates/index.html`:
```html
<button onclick="testFunction()">Test</button>
<script>
function testFunction() {
    console.log("Test running...");
}
</script>
```

---

## Extending to New Platforms

### Deploy to Web (Heroku, PythonAnywhere)

1. Add `Procfile`:
   ```
   web: gunicorn app:app
   ```

2. Add `runtime.txt`:
   ```
   python-3.9.16
   ```

3. Install gunicorn:
   ```
   pip install gunicorn
   pip freeze > requirements.txt
   ```

4. Deploy!

### Mobile App

Use React Native / Flutter to call the same Flask API:
```javascript
const response = await fetch('http://your-server:5000/api/npc/generate', {
  method: 'POST'
});
```

---

## Common Customizations

### Change the Default Theme
Edit colors in `static/css/style.css` `:root` section

### Add More Conditions
Add to `rules_2024.json`, then update Initiative Tracker buttons

### Custom Random Tables
Add arrays to `rules_2024.json`, then create new route + button

### Session Note Templates
Modify `templates/index.html` to show a template in the textarea

### Larger Font (Accessibility)
In `static/css/style.css`:
```css
html, body {
    font-size: 18px;  /* Changed from default */
}
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Changes not showing | Clear browser cache (Ctrl+Shift+Delete) |
| API not responding | Check Flask is running, no errors in terminal |
| CSS not loading | Check file path in HTML, refresh page |
| JavaScript errors | Open F12 console, read error message |
| Port in use | Change port in `app.py` last line |

---

## Code Style

This project uses:
- **Python:** Standard Flask conventions
- **JavaScript:** Vanilla JS (no frameworks required)
- **CSS:** Dark theme with semantic classes
- **HTML:** Bootstrap-inspired responsive layout

Feel free to refactor as needed!

---

## Resources

- **Flask Docs:** https://flask.palletsprojects.com/
- **D&D 5e 2024 PHB:** Official reference
- **MDN Web Docs:** JavaScript/HTML/CSS reference
- **Jinja2 Templates:** https://jinja.palletsprojects.com/

---

## Future Ideas

- ✨ Monster manual (offline database)
- 📊 Campaign tracker (multi-session management)
- 🎨 Custom themes
- 🗺️ Random dungeon generator
- 📖 Spell lookup by class/level
- 🏆 Experience tracker for campaign
- 💾 Export to JSON/PDF
- 🔊 Sound effects / music integration

---

## Contributing

Feel free to extend, modify, and improve!

Questions? Check the code comments for guidance.

**Happy coding, DM! 🐉**
