"""
D&D 5.5e (2024 Edition) Dungeon Master Assistant
A local, offline Flask web app for DM utilities
"""

from flask import Flask, render_template, request, jsonify
import json
import os
import random
from datetime import datetime
from pathlib import Path

app = Flask(__name__)

# Paths
DATA_DIR = Path(__file__).parent / "data"
RULES_FILE = DATA_DIR / "rules_2024.json"
SESSIONS_DIR = DATA_DIR / "sessions"
NPC_DATA_FILE = DATA_DIR / "npc_data.json"

# Ensure directories exist
DATA_DIR.mkdir(exist_ok=True)
SESSIONS_DIR.mkdir(exist_ok=True)

# Load 2024 D&D rules
def load_rules():
    """Load 2024 D&D rules from JSON"""
    try:
        with open(RULES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading rules: {e}")
        return {}

RULES_2024 = load_rules()

# ============== ROUTES ==============

@app.route('/')
def index():
    """Main page - displays the app interface"""
    return render_template('index.html', rules=RULES_2024)

# ============== NPC GENERATOR ROUTES ==============

@app.route('/api/npc/generate', methods=['POST'])
def generate_npc():
    """Generate a random NPC with all attributes"""
    try:
        rules = RULES_2024
        
        # Generate basic NPC
        first_names = ["Alden", "Brynn", "Castor", "Darius", "Elara", "Finn", "Grendel", 
                       "Hazel", "Iris", "Jasper", "Kira", "Loren", "Mira", "Nolan", 
                       "Orrin", "Piper", "Quinn", "Rowan", "Silas", "Thora", "Ulrich", 
                       "Vera", "Wyatt", "Xander", "Yara", "Zephyr"]
        
        last_names = ["Aldric", "Blackwood", "Crestfall", "Darkwell", "Emberstone",
                      "Fairweather", "Goldleaf", "Harrow", "Ironside", "Jade",
                      "Kinsley", "Lightbringer", "Moonwhisper", "Nightshade", "Oakheart",
                      "Pearlstone", "Quicksilver", "Ravenswood", "Stormborn", "Thornfield"]
        
        npc = {
            "name": f"{random.choice(first_names)} {random.choice(last_names)}",
            "species": random.choice(rules.get("species", [])),
            "class_or_occupation": random.choice(rules.get("classes", ["Merchant", "Innkeeper", "Guard", "Scholar"])),
            "personality_trait": random.choice(rules.get("personality_traits", [])),
            "flaw": random.choice(rules.get("flaws", [])),
            "secret": random.choice(rules.get("secrets", [])),
            "background": None,
            "origin_feat": None
        }
        
        # Optionally add background
        if random.choice([True, False]):
            background = random.choice(rules.get("backgrounds", []))
            npc["background"] = background["name"]
            npc["origin_feat"] = background["origin_feat"]
        
        return jsonify(npc)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ============== ENCOUNTER BUILDER ROUTES ==============

@app.route('/api/encounter/suggest', methods=['POST'])
def suggest_encounter():
    """Suggest encounter difficulty based on party and level"""
    try:
        data = request.json
        party_size = int(data.get('party_size', 4))
        average_level = int(data.get('average_level', 1))
        
        rules = RULES_2024
        xp_thresholds = rules.get('xp_thresholds_2024', {}).get('difficulty_levels', {})
        
        level_key = f"level_{average_level}"
        if level_key not in xp_thresholds:
            level_key = "level_20"  # Use highest available
        
        thresholds = xp_thresholds.get(level_key, {})
        
        # Adjust for party size
        multiplier = {
            1: 1.5,
            2: 1.5,
            3: 1.5,
            4: 1.0,
            5: 1.0,
            6: 0.8,
            7: 0.8,
            8: 0.6
        }.get(party_size, 1.0)
        
        suggestion = {
            "party_size": party_size,
            "average_level": average_level,
            "difficulty_levels": {
                "low": int(thresholds.get('easy', 0) * multiplier),
                "moderate": int(thresholds.get('moderate', 0) * multiplier),
                "hard": int(thresholds.get('hard', 0) * multiplier),
                "severe": int(thresholds.get('deadly', 0) * multiplier)
            },
            "note_2024": "2024 DMG uses simplified XP thresholds adjusted from 2014 edition"
        }
        
        return jsonify(suggestion)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ============== RANDOM TABLES ROUTES ==============

@app.route('/api/random/weather', methods=['GET'])
def roll_weather():
    """Roll random weather"""
    rules = RULES_2024
    weather = random.choice(rules.get('weather', []))
    return jsonify({"result": weather})

@app.route('/api/random/room', methods=['GET'])
def roll_dungeon_room():
    """Roll random dungeon room"""
    rules = RULES_2024
    room = random.choice(rules.get('dungeon_rooms', []))
    return jsonify({"result": room})

@app.route('/api/random/merchant', methods=['GET'])
def roll_merchant_inventory():
    """Roll random merchant inventory items"""
    rules = RULES_2024
    items = random.sample(rules.get('merchant_inventory', []), min(3, len(rules.get('merchant_inventory', []))))
    return jsonify({"items": items})

@app.route('/api/random/event', methods=['GET'])
def roll_random_event():
    """Roll random event"""
    rules = RULES_2024
    event = random.choice(rules.get('random_events', []))
    return jsonify({"result": event})

@app.route('/api/random/wild-magic-surge', methods=['GET'])
def roll_wild_magic():
    """Roll wild magic surge (2024 table)"""
    rules = RULES_2024
    surge = random.choice(rules.get('wild_magic_surge_table_2024', []))
    return jsonify({"result": surge, "note": "2024 Wild Magic Surge table (simplified from 2014)"})

# ============== DICE ROLLER ROUTES ==============

@app.route('/api/dice/roll', methods=['POST'])
def roll_dice():
    """Roll dice expression like 2d6+3"""
    try:
        data = request.json
        expression = data.get('expression', '1d20').strip()
        use_advantage = data.get('advantage', False)
        use_disadvantage = data.get('disadvantage', False)
        
        # Parse and roll
        result = parse_and_roll(expression, use_advantage, use_disadvantage)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def parse_and_roll(expression, advantage=False, disadvantage=False):
    """Parse dice expression and return results"""
    import re
    
    expression = expression.replace(' ', '').lower()
    
    # Handle advantage/disadvantage first
    rolls = [roll_dice_expression(expression)]
    
    if advantage:
        rolls.append(roll_dice_expression(expression))
        total = max(rolls)
        method = "Advantage"
    elif disadvantage:
        rolls.append(roll_dice_expression(expression))
        total = min(rolls)
        method = "Disadvantage"
    else:
        total = rolls[0]
        method = "Normal"
    
    return {
        "expression": expression,
        "rolls": rolls,
        "total": total,
        "method": method
    }

def roll_dice_expression(expr):
    """Roll a single dice expression like 2d6+3"""
    import re
    
    # Pattern: [number]d[number][+/-][number]
    pattern = r'(\d*)d(\d+)([+-]?)(\d*)'
    match = re.match(pattern, expr)
    
    if not match:
        raise ValueError(f"Invalid dice expression: {expr}")
    
    num_dice = int(match.group(1)) if match.group(1) else 1
    die_size = int(match.group(2))
    operation = match.group(3) or '+'
    modifier = int(match.group(4)) if match.group(4) else 0
    
    if num_dice > 100 or die_size > 1000:
        raise ValueError("Dice expression too large")
    
    # Roll dice
    rolls = [random.randint(1, die_size) for _ in range(num_dice)]
    total = sum(rolls)
    
    # Apply modifier
    if operation == '+':
        total += modifier
    elif operation == '-':
        total -= modifier
    
    return total

# ============== SESSION NOTES ROUTES ==============

@app.route('/api/sessions/list', methods=['GET'])
def list_sessions():
    """List all session notes"""
    try:
        sessions = []
        for file in SESSIONS_DIR.glob("*.txt"):
            sessions.append({
                "filename": file.name,
                "name": file.stem,
                "created": datetime.fromtimestamp(file.stat().st_ctime).isoformat()
            })
        sessions.sort(key=lambda x: x['created'], reverse=True)
        return jsonify(sessions)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/sessions/read/<session_name>', methods=['GET'])
def read_session(session_name):
    """Read session notes"""
    try:
        file_path = SESSIONS_DIR / f"{session_name}.txt"
        if not file_path.exists():
            return jsonify({"error": "Session not found"}), 404
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        return jsonify({
            "name": session_name,
            "content": content,
            "created": datetime.fromtimestamp(file_path.stat().st_ctime).isoformat()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/sessions/save', methods=['POST'])
def save_session():
    """Save session notes"""
    try:
        data = request.json
        session_name = data.get('name', f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
        content = data.get('content', '')
        
        # Sanitize filename
        session_name = "".join(c for c in session_name if c.isalnum() or c in (' ', '_', '-')).strip()
        
        file_path = SESSIONS_DIR / f"{session_name}.txt"
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return jsonify({"message": "Session saved", "filename": f"{session_name}.txt"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/sessions/delete/<session_name>', methods=['DELETE'])
def delete_session(session_name):
    """Delete a session"""
    try:
        file_path = SESSIONS_DIR / f"{session_name}.txt"
        if file_path.exists():
            file_path.unlink()
            return jsonify({"message": "Session deleted"})
        else:
            return jsonify({"error": "Session not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ============== INITIATIVE TRACKER ROUTES ==============

@app.route('/api/initiative/save', methods=['POST'])
def save_initiative():
    """Save initiative tracker state"""
    try:
        data = request.json
        file_path = DATA_DIR / "initiative_state.json"
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        
        return jsonify({"message": "Initiative saved"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/initiative/load', methods=['GET'])
def load_initiative():
    """Load initiative tracker state"""
    try:
        file_path = DATA_DIR / "initiative_state.json"
        
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ============== ERROR HANDLERS ==============

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Server error"}), 500

if __name__ == '__main__':
    # Run on localhost:5000
    app.run(debug=True, host='127.0.0.1', port=5000)
