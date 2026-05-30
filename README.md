# D&D 5.5e (2024 Edition) Dungeon Master Assistant

A comprehensive, offline Dungeon Master assistant for D&D 5th Edition (2024 Edition). Runs locally on any laptop using Flask and a web interface.

## Features

### 🎭 NPC Generator
- Randomly generate NPCs with all attributes
- 2024 PHB Species (not Races)
- Random backgrounds with Origin Feats and ability score increases
- Personality traits, flaws, and secrets

### ⚔️ Encounter Builder
- Calculate encounter difficulty using 2024 DMG XP thresholds
- Add monsters with XP values
- Real-time difficulty assessment
- Party size and level scaling

### 📋 Initiative Tracker
- Add combatants with initiative, HP, AC
- Track combat round by round
- Apply 2024 D&D conditions (Blinded, Charmed, Exhaustion, etc.)
- Simplified exhaustion system from 2024 rules
- HP damage/healing tracking

### 🎲 Dice Roller
- Roll any dice expression (2d6+3, 1d20, etc.)
- Advantage/Disadvantage support
- Breakdown of individual rolls
- Common roll templates

### 🎰 Random Tables
- Random weather generation
- Dungeon room descriptions
- Merchant inventory
- Random plot events
- Wild Magic Surge table (updated 2024 version)

### 📝 Session Notes
- Write and save session notes per session
- Locally stored as .txt files
- Load/manage previous sessions
- No internet required

## Key 2024 Edition Changes

This app respects all 2024 PHB & DMG rules:

- **Species instead of Race** - All ancestries renamed to "Species"
- **Backgrounds grant Feats** - Each background gives +2 ability increase and an Origin Feat
- **Simplified Exhaustion** - Now 6 levels with clearer stacking effects instead of complex ability penalties
- **Updated XP Thresholds** - Encounter building guidelines adjusted from 2014 edition
- **Weapon Mastery** - New weapon property system supported
- **Class-specific Spell Lists** - Spells no longer universally shared between classes
- **Condition Updates** - All conditions follow 2024 rules

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- Windows, macOS, or Linux

### Steps

1. **Clone or download this project**
   ```bash
   cd "Asistente de DM"
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app**
   ```bash
   python app.py
   ```

5. **Open in browser**
   - Navigate to `http://127.0.0.1:5000`
   - App is now ready to use!

## Project Structure

```
Asistente de DM/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── static/
│   ├── css/
│   │   └── style.css    # Dark theme styling
│   └── js/
│       └── app.js       # Frontend JavaScript
├── templates/
│   ├── base.html        # Base template
│   └── index.html       # Main interface
└── data/
    ├── rules_2024.json  # 2024 D&D rules data
    ├── sessions/        # Session notes (local)
    └── initiative_state.json  # Saved combat state
```

## Usage

### NPC Generator
1. Click **NPC Generator** from sidebar
2. Click **Generate NPC**
3. Get a random NPC with species, class, personality, and secrets
4. Optionally includes background with origin feat

### Encounter Builder
1. Enter party size and average level
2. Click **Calculate Thresholds**
3. Add monsters by name and XP value
4. See real-time difficulty scaling

### Initiative Tracker
1. Click **Initiative Tracker**
2. **Add Combatant** with name, initiative roll, HP, AC
3. Track combat turn-by-turn
4. Click combatants to select, then toggle conditions
5. Update HP with damage/healing

### Dice Roller
1. Enter dice expression (e.g., `2d6+3`, `1d20`)
2. Toggle Advantage/Disadvantage if needed
3. See total and breakdown

### Random Tables
- Click any button to roll that table
- Weather, rooms, events, merchant inventory, wild magic surges

### Session Notes
1. Write notes in the text area
2. Enter session name (optional)
3. Click **Save Session**
4. Manage previous sessions (Load/Delete)

## 2024 Rules Reference

### Exhaustion (Simplified from 2014)
- Level 1: Disadvantage on ability checks
- Level 2: Speed halved
- Level 3: Disadvantage on attack rolls and saving throws
- Level 4: Hit point maximum halved
- Level 5: Speed reduced to 0
- Level 6: Death

### Conditions
All 2024 conditions are available in the Initiative Tracker:
- Blinded, Charmed, Deafened
- Exhaustion (with new stacking)
- Frightened, Grappled, Incapacitated
- Invisible, Paralyzed, Petrified
- Poisoned, Prone, Restrained
- Stunned, Unconscious

### XP Thresholds (2024 DMG)
Updated thresholds per party level for encounter balance. Adjusted from 2014 edition for better scaling.

## Offline & Local
- ✅ No internet required
- ✅ All data stored locally (JSON files)
- ✅ Runs entirely on your machine
- ✅ No external API calls
- ✅ Based on official 2024 PHB & DMG

## Tips for DMs

1. **Use Initiative Tracker for complex combats** - Saves time during battle
2. **Pre-generate NPCs** - Have extras ready for unexpected encounters
3. **Bookmark common rolls** - Test Fireball damage (8d6), attack rolls, etc.
4. **Save encounter designs** - Use Session Notes to document what worked
5. **Reference the Conditions panel** - Never forget what a condition does

## Browser Compatibility

Works in:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Troubleshooting

### App won't start
- Ensure Python 3.7+ is installed
- Check that Flask is installed: `pip install Flask`

### Port already in use
- Edit `app.py` line and change port from 5000 to something else
- Example: `app.run(debug=True, host='127.0.0.1', port=5001)`

### Notes not saving
- Ensure the `data/` directory exists
- Check folder permissions

## Future Enhancements

Potential additions:
- Spell lookup by class
- Monster manual integration (local data)
- Campaign tracker
- Character sheet generator
- Loot tables
- Trap triggers
- Custom condition tracking

## License

Free to use and modify for your D&D games!

## Support

This is a passion project for D&D 5e DMs. All rules follow the 2024 Player's Handbook and Dungeon Master's Guide.

---

**Happy Dungeon Mastering! 🐉**

*Last Updated: 2024 D&D Edition*
