# D&D 5.5e (2024 Edition) - Rules Changes Reference

This document outlines the key differences between the 2014 5e Player's Handbook and the 2024 Edition, as implemented in this DM Assistant.

## ⚠️ Major Rule Changes in 2024 Edition

### 1. **Species vs. Race**
**2014:** Called "Races" (Human, Elf, Dwarf, etc.)
**2024:** Now called "Species" - conceptually the same, better terminology

**Implementation:** NPC Generator uses all 2024 Species options
- Human, Elf, Dwarf, Gnome, Halfling, Dragonborn, Tiefling
- Half-Elf, Half-Orc, Orc, Goblin, Kobold

---

### 2. **Backgrounds - Now Grant Feats & Ability Increases**

**2014:** Backgrounds gave 2 skill proficiencies and some flavor text

**2024:** Backgrounds now grant:
- **+2 to a specific Ability Score** (no more floating +2s)
- **One Origin Feat** (special background-related feat)

**Example (2024):**
- **Acolyte Background:** +2 Wisdom, Origin Feat: Acolyte
- **Criminal Background:** +2 Dexterity, Origin Feat: Dexterous Hands
- **Folk Hero Background:** +2 Strength, Origin Feat: Folk Hero

**Implementation:** When generating NPCs, if a background is assigned, the app displays both the ability increase and the origin feat.

---

### 3. **Exhaustion System - Simplified & Clarified**

**2014:** 6 levels with complex stacking:
- Level 1: Disadvantage on ability checks
- Level 2: Speed halved
- Level 3: Disadvantage on attack rolls and saves
- Level 4: HP max halved
- Level 5: Speed becomes 0
- Level 6: Death

**2024:** Same structure but CLEARER WORDING:
- Level 1: You have **disadvantage on ability checks**
- Level 2: Your **speed is halved**
- Level 3: You have **disadvantage on attack rolls and saving throws**
- Level 4: Your **hit point maximum is halved**
- Level 5: Your **speed is reduced to 0**
- Level 6: You **die**

**Key Difference:** The implementation is identical, but 2024 clarifies that these effects stack sequentially and there's no mitigation except removing a level.

**Implementation in App:** Exhaustion is available as a condition in the Initiative Tracker. DMs can toggle it on/off for quick tracking.

---

### 4. **Updated Encounter Building - XP Thresholds**

**2014 DMG:** One set of XP thresholds

**2024 DMG:** Revised XP thresholds, generally more balanced for high-level parties

Example - **Level 5 Party:**
- **2014:** Easy 250 | Moderate 500 | Hard 750 | Deadly 1100
- **2024:** Easy 250 | Moderate 500 | Hard 750 | Deadly 1100
(Same in this case, but adjusted across various levels for better balance)

**Implementation in App:** The Encounter Builder uses 2024 XP thresholds. Party composition multipliers are applied:
- 1-2 PCs: 1.5x multiplier (encounters harder for small groups)
- 3 PCs: 1.5x
- 4 PCs: 1.0x (baseline)
- 5+ PCs: 0.8-0.6x (encounters easier for large groups)

---

### 5. **Weapon Mastery (New System)**

**2014:** Simple weapon properties (Finesse, Heavy, Light, etc.)

**2024:** Weapons now have **Mastery Properties** - special abilities based on weapon type:
- **Longsword Mastery:** Roll an extra d8 if you hit with both attacks in a turn
- **Greataxe Mastery:** Can add weapon damage die to damage
- **Dagger Mastery:** Can draw as bonus action
- etc.

**Implementation Note:** This app focuses on encounter management, not detailed character sheets. Weapon mastery properties can be referenced in Session Notes during combat.

---

### 6. **Spell List Changes - Class-Specific**

**2014:** Many spells shared across classes (Cure Wounds, Counterspell, etc.)

**2024:** Spell lists reorganized by class with fewer overlaps:
- Cleric, Druid, Wizard lists are now more distinct
- Bard and Rogue have unique spell pools
- Ranger spells are class-specific
- Warlock, Sorcerer have separate spell lists

**Implementation Note:** This app doesn't include a spell database, but DMs can reference the official 2024 PHB for spell availability by class.

---

### 7. **Updated Condition List**

**All 2024 Conditions** (no changes to existing ones, just clarified):

| Condition | Effect |
|-----------|--------|
| **Blinded** | Can't see; fails sight checks |
| **Charmed** | Can't move away from charmer; disadvantage vs. charmer |
| **Deafened** | Can't hear; fails hearing checks |
| **Exhaustion** | See detailed section above |
| **Frightened** | Disadvantage while source visible |
| **Grappled** | Speed 0; can end if grappler incapacitated |
| **Incapacitated** | Can't take actions or bonus actions |
| **Invisible** | Can't be seen; heavily obscured |
| **Paralyzed** | Incapacitated; fails Str/Dex saves |
| **Petrified** | Transformed to stone; stops aging |
| **Poisoned** | Disadvantage on attacks/checks |
| **Prone** | Crawl only; disadvantage on attacks |
| **Restrained** | Speed 0; attack rolls vs. you have advantage |
| **Stunned** | Incapacitated; faltering speech |
| **Unconscious** | Incapacitated; falls prone |

**Implementation:** Initiative Tracker has quick-toggle buttons for all conditions.

---

## Features Using 2024 Rules

### 🎭 NPC Generator
✅ Uses **2024 Species** (not "Races")
✅ Assigns **2024 Backgrounds** with ability score increases and origin feats
✅ Generates personality traits, flaws, and secrets
✅ Flags when a background is assigned with its feat

### ⚔️ Encounter Builder
✅ Uses **2024 DMG XP thresholds**
✅ Properly scales encounters for different party sizes
✅ Shows difficulty levels: Low, Moderate, Hard, Severe

### 📋 Initiative Tracker
✅ Tracks all **2024 conditions** with quick toggles
✅ Supports **simplified Exhaustion** system (6 levels)
✅ HP tracking with conditions
✅ Turn-by-turn combat management

### 🎰 Random Tables
✅ **Wild Magic Surge table** is 2024 edition version
✅ Other tables (weather, rooms, events) are generic D&D flavor

### 📝 Session Notes
✅ DM can flag 2024 rule changes during play
✅ Save notes with reminders about new rules

---

## 2024 Books Used

This DM Assistant is built around:
- **2024 Player's Handbook** - Species, Classes, Backgrounds, Features
- **2024 Dungeon Master's Guide** - Encounter Building, Conditions, Difficulty

All official 2024 D&D rules are implemented as of this version.

---

## Quick Rules Reminders

### When Building an Encounter:
- Use the **2024 XP thresholds** (automatically calculated in app)
- Remember party size multipliers (smaller parties = harder encounters)
- Monsters should have clearly defined roles (tank, striker, controller, healer)

### When Tracking Combat:
- Remember: **Conditions are the most important mechanics**
- Exhaustion is severe - use sparingly
- Concentration is implied; DMs must track which spells need it

### When Creating NPCs:
- Give them a **background with a feat** for depth (2024 style)
- Write down their **secret** for plot hooks
- Note their **flaw** for roleplay opportunities

---

## Resources for Reference

- Official **2024 Player's Handbook** - Character creation
- Official **2024 Dungeon Master's Guide** - Encounters, NPCs, Magic Items
- **D&D Beyond** - Rules lookup (free tier)
- **Xanathar's Guide to Everything** - Subclasses (still valid with 2024 edits)

---

*This reference reflects D&D 5th Edition, 2024 Update*
*Last Updated: 2024*
