# Quick Start Guide - D&D 5.5e DM Assistant

## 30-Second Startup

### Windows
1. Navigate to the project folder
2. Double-click **`run.bat`**
3. Wait 10 seconds for "Running on http://127.0.0.1:5000"
4. Open your browser to **http://127.0.0.1:5000**

### macOS / Linux
1. Open Terminal in the project folder
2. Run: `bash run.sh`
3. Open browser to **http://127.0.0.1:5000**

---

## First Time Setup (Skip if run.bat/run.sh worked)

```bash
# 1. Navigate to project
cd "path/to/Asistente de DM"

# 2. Create virtual environment
python -m venv venv

# 3. Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Start the app
python app.py

# 6. Open browser
# http://127.0.0.1:5000
```

---

## Using Each Tool

### 🎭 NPC Generator
```
1. Click "NPC Generator" in sidebar
2. Click "Generate NPC"
3. Get a random NPC with:
   - Name (first + last)
   - 2024 Species (Human, Elf, etc.)
   - Class/Occupation
   - Personality Trait
   - Flaw
   - Secret
   - Optional: Background + Origin Feat

TIP: Regenerate until you like the combination
```

### ⚔️ Encounter Builder
```
1. Enter Party Size (1-8) and Average Level (1-20)
2. Click "Calculate Thresholds"
3. See XP budgets for Low/Moderate/Hard/Severe
4. Add monsters by name and XP value
5. See total XP and difficulty

TIP: Aim for Moderate or Hard difficulty for balanced combat
```

### 🎲 Dice Roller
```
1. Enter expression: 2d6+3, 1d20, 3d8-1, etc.
2. Optional: Check Advantage or Disadvantage
3. Click "Roll"
4. See total and individual rolls

TIP: Use for attack rolls, damage, saves, ability checks
```

### 📋 Initiative Tracker
```
1. Click "Add Combatant"
2. Enter: Name, Initiative bonus, HP, AC
3. Click "Confirm"
4. Repeat for all combatants
5. Table shows initiative order (auto-sorted)

DURING COMBAT:
- Click combatant to select
- Toggle conditions (Blinded, Charmed, etc.)
- Update HP with damage/healing
- Click "Next Round" to advance turn

TIP: Conditions are key in 2024 D&D - track them carefully!
```

### 🎰 Random Tables
```
Available:
- 🌤️ Random Weather (for travel)
- 🏛️ Dungeon Room (for exploration)
- 🛍️ Merchant Inventory (for shopping scenes)
- 🎭 Random Event (for plot hooks)
- ✨ Wild Magic Surge (2024 table!)

TIP: Use these to surprise your players and spark creativity
```

### 📝 Session Notes
```
1. Write notes in the text area
2. Optional: Give the session a name
3. Click "Save Session"

TO LOAD PREVIOUS SESSION:
- Click "Refresh List"
- Click "Load" on a previous session
- Edit and save again to update

TIP: Save after each session; include key plot points and NPC interactions
```

---

## 2024 D&D Edition Quick Reference

### Species (not Races)
All 2024 species are in the NPC generator:
- Human, Elf, Dwarf, Gnome, Halfling
- Dragonborn, Tiefling, Half-Elf, Half-Orc
- Orc, Goblin, Kobold

### Backgrounds (now grant feats!)
Each background gives:
- **+2 to an Ability Score**
- **One Origin Feat** (special feat from your background)

Example: Criminal background = +2 Dexterity + Dexterous Hands feat

### Exhaustion (Simplified to 6 levels)
1. Disadvantage on checks
2. Speed halved
3. Disadvantage on attacks/saves
4. HP max halved
5. Speed becomes 0
6. Death

### Conditions (use tracker!)
- Blinded, Charmed, Deafened, Exhaustion
- Frightened, Grappled, Incapacitated, Invisible
- Paralyzed, Petrified, Poisoned, Prone
- Restrained, Stunned, Unconscious

### Encounter XP (2024 DMG)
Use the Encounter Builder to calculate:
- **Low:** Basic challenge
- **Moderate:** Fair fight
- **Hard:** Difficult, some resource use
- **Severe:** Deadly, resources stretched

---

## Tips & Tricks

### For Combat
- **Start Initiative Early** - Add all combatants before round 1
- **Track Conditions Carefully** - They're your most powerful tool
- **Save Combat State** - Click "Save Combat" to reload later

### For NPCs
- **Give Them Secrets** - Use the NPC's secret as a plot hook
- **Assign Backgrounds** - Regenerate until you get one; it adds depth
- **Keep Favorites** - Write interesting NPCs to Session Notes

### For Encounters
- **Vary Difficulty** - Mix Low/Moderate/Hard encounters
- **Don't Spam Deadly** - Save severe encounters for dramatic moments
- **Add Objectives** - Beyond "kill all monsters"

### For Dice
- **Test Expressions** - Try before using in game
- **Use Advantage/Disadvantage** - Critical failures/successes

---

## Troubleshooting

### "Connection refused" / "Can't connect"
- Make sure Flask is still running in terminal
- Check browser is going to http://127.0.0.1:5000 (not https)

### "Port 5000 already in use"
- Edit `app.py` at the bottom, change 5000 to 5001 (or another number)
- Restart the app

### Notes aren't saving
- Check `data/sessions/` folder exists
- Check folder permissions
- Try a simpler session name

### Virtual environment issues
- Delete `venv/` folder
- Run `python -m venv venv` again
- Reinstall: `pip install -r requirements.txt`

---

## Browser Tips

- Works best in **Chrome, Firefox, Safari, Edge**
- Dark theme is default (looks great in dark environments!)
- Sidebar collapses on small screens

---

## What's Stored Locally

All data lives in the `data/` folder:
- `rules_2024.json` - Reference data (don't edit)
- `sessions/` - Your session notes (.txt files)
- `initiative_state.json` - Last saved combat (auto-generated)

**No data is sent anywhere.** Everything is on your computer.

---

## Next Steps

1. ✅ **Read** this guide
2. ✅ **Start the app** (run.bat or run.sh)
3. ✅ **Try each tool** - Start with NPC Generator
4. ✅ **Run a test encounter** - Create an encounter with 4 goblins
5. ✅ **Practice initiative** - Add 3 PCs and some monsters
6. ✅ **Save a session** - Write a test note
7. 🎉 **You're ready for game night!**

---

## Questions?

- Check **README.md** for full documentation
- Check **RULES_2024_REFERENCE.md** for 2024 D&D rules
- All code is in the project folder (feel free to modify!)

---

**Happy Dungeon Mastering! 🐉**

*D&D 5.5e (2024 Edition) - All rules from official PHB & DMG*
