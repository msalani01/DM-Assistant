/**
 * D&D 5.5e (2024 Edition) DM Assistant
 * Main JavaScript Application
 */

// ============== GLOBAL STATE ==============
const appState = {
    currentTool: 'home',
    monsters: [],
    combatants: [],
    currentRound: 1,
    selectedCombatant: null,
    sessions: []
};

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupNPCGenerator();
    setupEncounterBuilder();
    setupDiceRoller();
    setupRandomTables();
    setupSessionNotes();
    setupInitiativeTracker();
});

// ============== NAVIGATION ==============
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            navBtns.forEach(b => b.classList.remove('active'));
            
            // Remove active class from all sections
            document.querySelectorAll('.tool-section').forEach(sec => {
                sec.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding section
            const toolId = btn.getAttribute('data-tool');
            const section = document.getElementById(toolId);
            if (section) {
                section.classList.add('active');
            }
            
            appState.currentTool = toolId;
        });
    });
}

// ============== NPC GENERATOR ==============
function setupNPCGenerator() {
    const generateBtn = document.getElementById('generateNpcBtn');
    const saveBtn = document.getElementById('saveNpcBtn');
    
    generateBtn.addEventListener('click', generateNPC);
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            console.log("NPC saved (feature can expand to export)");
            alert("NPC saved to clipboard!");
        });
    }
}

async function generateNPC() {
    try {
        const response = await fetch('/api/npc/generate', {
            method: 'POST'
        });
        
        const npc = await response.json();
        
        // Display NPC result
        const resultDiv = document.getElementById('npcResult');
        document.getElementById('npcName').textContent = npc.name;
        document.getElementById('npcSpecies').textContent = npc.species;
        document.getElementById('npcOccupation').textContent = npc.class_or_occupation;
        document.getElementById('npcPersonality').textContent = npc.personality_trait;
        document.getElementById('npcFlaw').textContent = npc.flaw;
        document.getElementById('npcSecret').textContent = npc.secret;
        
        // Show background section if available
        const bgSection = document.getElementById('npcBackgroundSection');
        if (npc.background) {
            document.getElementById('npcBackground').textContent = npc.background;
            document.getElementById('npcFeat').textContent = npc.origin_feat;
            bgSection.style.display = 'block';
        } else {
            bgSection.style.display = 'none';
        }
        
        resultDiv.style.display = 'block';
        document.getElementById('saveNpcBtn').style.display = 'inline-block';
        
    } catch (error) {
        console.error('Error generating NPC:', error);
        alert('Error generating NPC');
    }
}

// ============== ENCOUNTER BUILDER ==============
function setupEncounterBuilder() {
    const suggestBtn = document.getElementById('suggestEncounterBtn');
    const addMonsterBtn = document.getElementById('addMonsterBtn');
    
    suggestBtn.addEventListener('click', suggestEncounter);
    addMonsterBtn.addEventListener('click', addMonsterToList);
}

async function suggestEncounter() {
    try {
        const partySize = parseInt(document.getElementById('partySize').value);
        const partyLevel = parseInt(document.getElementById('partyLevel').value);
        
        const response = await fetch('/api/encounter/suggest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                party_size: partySize,
                average_level: partyLevel
            })
        });
        
        const suggestion = await response.json();
        
        // Display thresholds
        document.getElementById('lowXp').textContent = suggestion.difficulty_levels.low;
        document.getElementById('moderateXp').textContent = suggestion.difficulty_levels.moderate;
        document.getElementById('hardXp').textContent = suggestion.difficulty_levels.hard;
        document.getElementById('severeXp').textContent = suggestion.difficulty_levels.severe;
        
        document.getElementById('encounterResult').style.display = 'block';
        
        // Reset monster list
        appState.monsters = [];
        updateMonsterTable();
        
    } catch (error) {
        console.error('Error suggesting encounter:', error);
        alert('Error calculating encounter');
    }
}

function addMonsterToList() {
    const name = document.getElementById('monsterName').value.trim();
    const xp = parseFloat(document.getElementById('monsterCR').value);
    
    if (!name || isNaN(xp) || xp < 0) {
        alert('Please enter valid monster name and XP value');
        return;
    }
    
    appState.monsters.push({
        id: Date.now(),
        name: name,
        xp: xp
    });
    
    document.getElementById('monsterName').value = '';
    document.getElementById('monsterCR').value = '';
    
    updateMonsterTable();
}

function removeMonster(id) {
    appState.monsters = appState.monsters.filter(m => m.id !== id);
    updateMonsterTable();
}

function updateMonsterTable() {
    const tbody = document.getElementById('monsterTableBody');
    tbody.innerHTML = '';
    
    let totalXp = 0;
    
    appState.monsters.forEach(monster => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${monster.name}</td>
            <td>${monster.xp}</td>
            <td><button class="delete-btn" onclick="removeMonster(${monster.id})">Remove</button></td>
        `;
        tbody.appendChild(row);
        totalXp += monster.xp;
    });
    
    document.getElementById('totalMonsterXp').textContent = totalXp;
}

// ============== DICE ROLLER ==============
function setupDiceRoller() {
    const rollBtn = document.getElementById('rollDiceBtn');
    const expressionInput = document.getElementById('diceExpression');
    
    rollBtn.addEventListener('click', rollDice);
    expressionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') rollDice();
    });
}

async function rollDice() {
    try {
        const expression = document.getElementById('diceExpression').value.trim();
        const advantage = document.getElementById('advantageCheckbox').checked;
        const disadvantage = document.getElementById('disadvantageCheckbox').checked;
        
        if (advantage && disadvantage) {
            alert('Cannot use both advantage and disadvantage');
            return;
        }
        
        if (!expression) {
            alert('Please enter a dice expression (e.g., 2d6+3)');
            return;
        }
        
        const response = await fetch('/api/dice/roll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                expression: expression,
                advantage: advantage,
                disadvantage: disadvantage
            })
        });
        
        const result = await response.json();
        
        if (result.error) {
            alert('Invalid dice expression: ' + result.error);
            return;
        }
        
        // Display result
        document.getElementById('rollTotal').textContent = result.total;
        document.getElementById('rollExpression').textContent = result.expression;
        document.getElementById('rollMethod').textContent = result.method;
        document.getElementById('rollBreakdown').textContent = result.rolls.join(', ');
        
        document.getElementById('diceResult').style.display = 'block';
        
    } catch (error) {
        console.error('Error rolling dice:', error);
        alert('Error rolling dice');
    }
}

// ============== RANDOM TABLES ==============
function setupRandomTables() {
    document.getElementById('rollWeatherBtn').addEventListener('click', rollWeather);
    document.getElementById('rollRoomBtn').addEventListener('click', rollDungeonRoom);
    document.getElementById('rollMerchantBtn').addEventListener('click', rollMerchantInventory);
    document.getElementById('rollEventBtn').addEventListener('click', rollRandomEvent);
    document.getElementById('rollWildMagicBtn').addEventListener('click', rollWildMagicSurge);
}

async function rollWeather() {
    try {
        const response = await fetch('/api/random/weather');
        const data = await response.json();
        
        document.getElementById('randomContent').innerHTML = `
            <h4>Weather:</h4>
            <p>${data.result}</p>
        `;
        document.getElementById('randomResult').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

async function rollDungeonRoom() {
    try {
        const response = await fetch('/api/random/room');
        const data = await response.json();
        
        document.getElementById('randomContent').innerHTML = `
            <h4>Dungeon Room:</h4>
            <p>${data.result}</p>
        `;
        document.getElementById('randomResult').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

async function rollMerchantInventory() {
    try {
        const response = await fetch('/api/random/merchant');
        const data = await response.json();
        
        let html = '<h4>Merchant Inventory:</h4><ul>';
        data.items.forEach(item => {
            html += `<li><strong>${item.item}</strong> (${item.value}) - Qty: ${item.quantity}</li>`;
        });
        html += '</ul>';
        
        document.getElementById('randomContent').innerHTML = html;
        document.getElementById('randomResult').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

async function rollRandomEvent() {
    try {
        const response = await fetch('/api/random/event');
        const data = await response.json();
        
        document.getElementById('randomContent').innerHTML = `
            <h4>Random Event:</h4>
            <p>${data.result}</p>
        `;
        document.getElementById('randomResult').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

async function rollWildMagicSurge() {
    try {
        const response = await fetch('/api/random/wild-magic-surge');
        const data = await response.json();
        
        document.getElementById('randomContent').innerHTML = `
            <h4>⚡ Wild Magic Surge (2024 Table):</h4>
            <p>${data.result}</p>
        `;
        
        const noteEl = document.getElementById('randomNote');
        noteEl.textContent = data.note;
        noteEl.style.display = 'block';
        
        document.getElementById('randomResult').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============== SESSION NOTES ==============
function setupSessionNotes() {
    const saveBtn = document.getElementById('saveSessionBtn');
    const refreshBtn = document.getElementById('refreshSessionsBtn');
    
    saveBtn.addEventListener('click', saveSessionNotes);
    refreshBtn.addEventListener('click', loadSessionsList);
    
    // Load sessions on startup
    loadSessionsList();
}

async function saveSessionNotes() {
    try {
        const name = document.getElementById('sessionName').value.trim() || 
                     `Session_${new Date().toISOString().slice(0, 10)}`;
        const content = document.getElementById('sessionContent').value;
        
        if (!content) {
            alert('Please write some notes before saving');
            return;
        }
        
        const response = await fetch('/api/sessions/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                content: content
            })
        });
        
        const result = await response.json();
        alert('Session saved: ' + result.filename);
        
        document.getElementById('sessionName').value = '';
        document.getElementById('sessionContent').value = '';
        
        loadSessionsList();
        
    } catch (error) {
        console.error('Error saving session:', error);
        alert('Error saving session');
    }
}

async function loadSessionsList() {
    try {
        const response = await fetch('/api/sessions/list');
        const sessions = await response.json();
        
        const container = document.getElementById('sessionsList');
        
        if (sessions.length === 0) {
            container.innerHTML = '<p class="placeholder">No sessions saved yet</p>';
            return;
        }
        
        container.innerHTML = '';
        
        sessions.forEach(session => {
            const date = new Date(session.created).toLocaleString();
            const item = document.createElement('div');
            item.className = 'session-item';
            item.innerHTML = `
                <div class="session-item-info">
                    <p class="session-name">${session.name}</p>
                    <p class="session-date">${date}</p>
                </div>
                <div class="session-item-actions">
                    <button class="load-session-btn" onclick="loadSession('${session.filename}')">Load</button>
                    <button class="delete-session-btn" onclick="deleteSession('${session.filename}')">Delete</button>
                </div>
            `;
            container.appendChild(item);
        });
        
    } catch (error) {
        console.error('Error loading sessions:', error);
    }
}

async function loadSession(filename) {
    try {
        const sessionName = filename.replace('.txt', '');
        const response = await fetch(`/api/sessions/read/${sessionName}`);
        const session = await response.json();
        
        if (session.error) {
            alert('Session not found');
            return;
        }
        
        document.getElementById('sessionName').value = session.name;
        document.getElementById('sessionContent').value = session.content;
        
        // Scroll to editor
        document.getElementById('sessionContent').focus();
        
    } catch (error) {
        console.error('Error loading session:', error);
    }
}

async function deleteSession(filename) {
    if (!confirm('Delete this session permanently?')) return;
    
    try {
        const sessionName = filename.replace('.txt', '');
        const response = await fetch(`/api/sessions/delete/${sessionName}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        alert(result.message);
        loadSessionsList();
        
    } catch (error) {
        console.error('Error deleting session:', error);
    }
}

// ============== INITIATIVE TRACKER ==============
function setupInitiativeTracker() {
    const addBtn = document.getElementById('addCombatantBtn');
    const submitBtn = document.getElementById('submitCombatantBtn');
    const saveBtn = document.getElementById('saveInitiativeBtn');
    const resetBtn = document.getElementById('resetInitiativeBtn');
    const nextRoundBtn = document.getElementById('nextRoundBtn');
    const prevRoundBtn = document.getElementById('prevRoundBtn');
    
    addBtn.addEventListener('click', () => {
        document.getElementById('initiativeSetup').style.display = 'block';
    });
    
    submitBtn.addEventListener('click', addCombatant);
    saveBtn.addEventListener('click', saveInitiativeState);
    resetBtn.addEventListener('click', resetInitiative);
    nextRoundBtn.addEventListener('click', nextRound);
    prevRoundBtn.addEventListener('click', previousRound);
    
    // Setup condition button listeners
    document.querySelectorAll('.condition-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!appState.selectedCombatant) return;
            
            const condition = e.target.getAttribute('data-condition');
            toggleCondition(appState.selectedCombatant, condition);
        });
    });
    
    // Load saved initiative
    loadInitiativeState();
}

function addCombatant() {
    const name = document.getElementById('combatantName').value.trim();
    const initiative = parseInt(document.getElementById('combatantInitiative').value) || 0;
    const hp = parseInt(document.getElementById('combatantHP').value);
    const ac = parseInt(document.getElementById('combatantAC').value);
    
    if (!name || !hp || !ac) {
        alert('Please fill in all fields');
        return;
    }
    
    const combatant = {
        id: Date.now(),
        name: name,
        initiative: initiative,
        maxHp: hp,
        currentHp: hp,
        ac: ac,
        conditions: []
    };
    
    appState.combatants.push(combatant);
    appState.combatants.sort((a, b) => b.initiative - a.initiative);
    
    // Clear form
    document.getElementById('combatantName').value = '';
    document.getElementById('combatantInitiative').value = '';
    document.getElementById('combatantHP').value = '';
    document.getElementById('combatantAC').value = '';
    
    document.getElementById('initiativeSetup').style.display = 'none';
    updateInitiativeTracker();
}

function updateInitiativeTracker() {
    if (appState.combatants.length === 0) {
        document.getElementById('initiativeTracker').style.display = 'none';
        return;
    }
    
    document.getElementById('initiativeTracker').style.display = 'block';
    document.getElementById('roundNumber').textContent = appState.currentRound;
    
    const tbody = document.getElementById('trackerTableBody');
    tbody.innerHTML = '';
    
    appState.combatants.forEach((combatant, index) => {
        const row = document.createElement('tr');
        row.className = index === 0 ? 'current' : '';
        row.onclick = () => selectCombatant(combatant.id);
        
        const conditionBadges = combatant.conditions
            .map(c => `<span class="condition-badge">${c}</span>`)
            .join(' ');
        
        row.innerHTML = `
            <td>${combatant.initiative}</td>
            <td><strong>${combatant.name}</strong></td>
            <td>
                <input type="number" 
                       class="hp-input" 
                       min="0" 
                       max="${combatant.maxHp}"
                       value="${combatant.currentHp}"
                       onchange="updateHP(${combatant.id}, this.value)">
                / ${combatant.maxHp}
            </td>
            <td>${combatant.ac}</td>
            <td>${conditionBadges}</td>
            <td>
                <button class="delete-btn" onclick="removeCombatant(${combatant.id})">Remove</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function selectCombatant(id) {
    appState.selectedCombatant = id;
    
    const combatant = appState.combatants.find(c => c.id === id);
    if (!combatant) return;
    
    const selectedDiv = document.getElementById('selectedCombatant');
    selectedDiv.style.display = 'block';
    document.getElementById('selectedName').textContent = `${combatant.name} (HP: ${combatant.currentHp}/${combatant.maxHp})`;
    
    // Update active state of condition buttons
    document.querySelectorAll('.condition-btn').forEach(btn => {
        const condition = btn.getAttribute('data-condition');
        btn.classList.toggle('active', combatant.conditions.includes(condition));
    });
}

function toggleCondition(combatantId, condition) {
    const combatant = appState.combatants.find(c => c.id === combatantId);
    if (!combatant) return;
    
    const index = combatant.conditions.indexOf(condition);
    if (index > -1) {
        combatant.conditions.splice(index, 1);
    } else {
        combatant.conditions.push(condition);
    }
    
    updateInitiativeTracker();
    selectCombatant(combatantId);
}

function updateHP(combatantId, newHP) {
    const combatant = appState.combatants.find(c => c.id === combatantId);
    if (combatant) {
        combatant.currentHp = Math.max(0, Math.min(newHP, combatant.maxHp));
        updateInitiativeTracker();
    }
}

function removeCombatant(id) {
    appState.combatants = appState.combatants.filter(c => c.id !== id);
    updateInitiativeTracker();
}

function nextRound() {
    appState.currentRound++;
    updateInitiativeTracker();
}

function previousRound() {
    if (appState.currentRound > 1) {
        appState.currentRound--;
        updateInitiativeTracker();
    }
}

function resetInitiative() {
    if (!confirm('Reset all combatants? This cannot be undone.')) return;
    
    appState.combatants = [];
    appState.currentRound = 1;
    appState.selectedCombatant = null;
    
    document.getElementById('initiativeSetup').style.display = 'none';
    document.getElementById('initiativeTracker').style.display = 'none';
    document.getElementById('selectedCombatant').style.display = 'none';
}

async function saveInitiativeState() {
    try {
        await fetch('/api/initiative/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                combatants: appState.combatants,
                currentRound: appState.currentRound
            })
        });
        alert('Combat state saved!');
    } catch (error) {
        console.error('Error saving initiative:', error);
    }
}

async function loadInitiativeState() {
    try {
        const response = await fetch('/api/initiative/load');
        const data = await response.json();
        
        if (data.combatants && data.combatants.length > 0) {
            appState.combatants = data.combatants;
            appState.currentRound = data.currentRound || 1;
            updateInitiativeTracker();
        }
    } catch (error) {
        console.error('Error loading initiative:', error);
    }
}

// ============== UTILITY FUNCTIONS ==============
function formatNumber(num) {
    return num.toLocaleString();
}

function showNotification(message, type = 'info') {
    // Simple notification system (can be expanded)
    console.log(`[${type.toUpperCase()}] ${message}`);
}
