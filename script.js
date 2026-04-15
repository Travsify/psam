const pollData = [
    { id: 1, title: '"Front Row" Genius', nominees: ['Patrick', 'Samuel Eze', 'Abdulrahman', 'Drusilla'] },
    { id: 2, title: '"Masaka Traffic" Survivor', nominees: ['Donatus', 'Samuel Isaac', 'Qudus', 'Patrick'] },
    { id: 3, title: '"Class Gist" Master', nominees: ['Goodman', 'Qudus', 'Abdulrahman', 'Salome'] },
    { id: 4, title: '"2014 Fashion Icon"', nominees: ['Salome', 'Dorothy', 'Jude', 'Suzan'] },
    { id: 5, title: '"Silent Achiever"', nominees: ['Drusilla', 'Anielkan', 'Blessing', 'Suzan'] },
    { id: 6, title: '"Assembly Ground" Voice', nominees: ['Goodman', 'Qudus', 'Jude', 'Samuel Eze'] },
    { id: 7, title: '"Sports Legend"', nominees: ['Jude', 'Anielkan', 'Donatus', 'Samuel Isaac'] },
    { id: 8, title: '"Teacher\'s Favorite"', nominees: ['Dorothy', 'Samuel Eze', 'Drusilla', 'Blessing'] },
    { id: 9, title: '"Class Heartthrob"', nominees: ['Patrick', 'Salome', 'Dorothy', 'Jude'] },
    { id: 10, title: 'The Ultimate PSAM Legend', nominees: ['Patrick', 'Salome', 'Goodman', 'Suzan', 'Qudus', 'Jude', 'Samuel Eze', 'Samuel Isaac', 'Dorothy', 'Drusilla', 'Blessing', 'Donatus', 'Abdulrahman', 'Anielkan'] }
];

const STORAGE_KEY = 'psam_poll_v5'; 
const REGISTRY_KEY = 'psam_reunion_v5';
const SESSION_KEY = 'psam_current_alumni_v5';

let pollResults = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let alumniRegistry = JSON.parse(localStorage.getItem(REGISTRY_KEY)) || [];
let currentAlumni = JSON.parse(localStorage.getItem(SESSION_KEY)) || null;

let appState = {
    mode: 'home', // 'home', 'registration', 'success', 'voting', 'hall-of-fame'
    step: 0,
    sessionVotes: {}
};

// 1. Init
const init = () => {
    if (Object.keys(pollResults).length === 0 || !pollResults[1]?.voters) {
        pollResults = {};
        pollData.forEach(p => {
            pollResults[p.id] = { votes: {}, total: 0, voters: [] };
            p.nominees.forEach(n => { pollResults[p.id].votes[n] = 0; });
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pollResults));
    }
    renderApp();
};

const showToast = (message) => {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    if (msg) msg.textContent = message;
    toast?.classList.add('show');
    setTimeout(() => toast?.classList.remove('show'), 5000);
};

const setMode = (mode) => {
    appState.mode = mode;
    if (mode === 'voting') {
        if (!currentAlumni) {
            appState.mode = 'registration';
        } else if (pollResults[1].voters.includes(currentAlumni.name)) {
            showToast(`Hello ${currentAlumni.name}, our registry shows you have already cast your ballot!`);
            appState.mode = 'hall-of-fame';
        } else {
            appState.step = 1;
        }
    }
    renderApp();
};

const handleRegistration = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const alumni = {
        name: fd.get('name').trim(),
        email: fd.get('email').trim(),
        phone: fd.get('phone').trim(),
        attending: fd.get('attending'),
        id: Date.now()
    };

    if (!alumniRegistry.some(a => a.email === alumni.email)) {
        alumniRegistry.push(alumni);
    }
    
    currentAlumni = alumni;
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(alumniRegistry));
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentAlumni));
    
    appState.mode = 'success';
    renderApp();
};

const startVoting = () => {
    appState.step = 1;
    appState.mode = 'voting';
    renderApp();
};

const castSessionVote = (nominee) => {
    appState.sessionVotes[appState.step] = nominee;
    renderApp();
};

const nextStep = () => {
    if (!appState.sessionVotes[appState.step]) {
        showToast('Please select a legend for this award.');
        return;
    }
    if (appState.step < 10) {
        appState.step++;
        renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        submitBallot();
    }
};

const submitBallot = () => {
    pollData.forEach(cat => {
        const choice = appState.sessionVotes[cat.id];
        if (pollResults[cat.id]) {
            pollResults[cat.id].votes[choice]++;
            pollResults[cat.id].total++;
            pollResults[cat.id].voters.push(currentAlumni.name);
        }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pollResults));
    appState.mode = 'hall-of-fame';
    showToast('Ballot Finalized! Thank you for participating.');
    renderApp();
};

// 3. Render
const renderApp = () => {
    const main = document.getElementById('main-content');
    const container = document.getElementById('poll-container');
    const progress = document.getElementById('progress-container');
    const bar = document.getElementById('progress-fill');
    const stats = document.getElementById('global-stats');

    if (!main || !container) return;

    if (stats) stats.innerHTML = `🌟 <strong>${alumniRegistry.length}</strong> Event Registrations &middot; 🗳️ <strong>${pollResults[1]?.total || 0}</strong> Votes Recorded`;

    main.innerHTML = '';
    container.innerHTML = '';
    progress.style.display = 'none';

    if (appState.mode === 'home') {
        main.innerHTML = `
            <div class="entry-menu">
                <div class="menu-card" onclick="setMode('voting')">
                    <span class="menu-icon">🗳️</span>
                    <h3>The Voting Hall</h3>
                    <p>Register for the reunion and cast your legendary ballot.</p>
                </div>
                <div class="menu-card" onclick="setMode('hall-of-fame')">
                    <span class="menu-icon">🏆</span>
                    <h3>Hall of Fame</h3>
                    <p>Celebrate the standing legends of PSAM 2012-2014.</p>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'registration') {
        main.innerHTML = `
            <div class="registration-form">
                <div class="event-banner-wing"></div>
                <div class="registration-content">
                    <h2 style="margin-bottom:0.5rem; font-weight:900;">Reunion Enrollment</h2>
                    <p style="color:var(--text-secondary); margin-bottom:2rem; font-size:0.9rem;">Abuja Get-Together &middot; May 11-16, 2026</p>
                    <form onsubmit="handleRegistration(event)">
                        <div class="form-group"><label>Full Name</label><input name="name" required placeholder="John Doe"></div>
                        <div class="form-group"><label>Email Address</label><input type="email" name="email" required placeholder="john@example.com"></div>
                        <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" required placeholder="+234..."></div>
                        <div class="form-group">
                            <label>Will you be attending?</label>
                            <select name="attending" style="width:100%; padding:1.25rem; background:rgba(255,255,255,0.05); border:1px solid var(--border-color); color:#fff; border-radius:12px; font-family:inherit; outline:none;">
                                <option value="Yes">Yes, I'll be there!</option>
                                <option value="Maybe">Maybe (Deciding)</option>
                                <option value="No">No, can't make it</option>
                            </select>
                        </div>
                        <button type="submit" class="next-btn" style="width:100%; margin-top:1.5rem;">Join the Reunion Event</button>
                    </form>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'success') {
        main.innerHTML = `
            <div class="registration-form" style="display:block; max-width:600px">
                <div class="success-card">
                    <span class="success-icon">✨</span>
                    <h2 style="font-size:2.5rem; margin-bottom:1rem; font-weight:900;">Congratulations!</h2>
                    <p style="color:var(--text-secondary); margin-bottom:3rem; line-height:1.6;">Thank you for wanting to join this event! Your enrollment is successful. Now, let's head to the voting hall to crown our legends.</p>
                    <button class="next-btn" style="width:100%" onclick="startVoting()">Proceed to Voting Hall</button>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'voting') {
        progress.style.display = 'block';
        if (bar) bar.style.width = `${(appState.step / 10) * 100}%`;
        const cat = pollData[appState.step - 1];
        const sel = appState.sessionVotes[appState.step];

        container.innerHTML = `
            <div class="category-card" style="max-width:700px; margin:0 auto;">
                <span style="color:var(--accent-secondary); font-size:0.8rem; font-weight:800; text-transform:uppercase; letter-spacing:0.1em;">Award ${appState.step} / 10</span>
                <h2 class="category-title" style="font-size:2.4rem; margin-top:1rem;">${cat.title}</h2>
                <div class="nominees-list" style="margin-top:2rem">
                    ${cat.nominees.map(n => `
                        <div class="nominee-option ${sel === n ? 'selected' : ''}" onclick="castSessionVote('${n}')">
                            <span class="nominee-name">${n}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="next-btn" style="width:100%; margin-top:3rem;" ${!sel ? 'disabled' : ''} onclick="nextStep()">
                    ${appState.step === 10 ? 'Finish Ballot' : 'Next Category'}
                </button>
            </div>
        `;
    }

    if (appState.mode === 'hall-of-fame') {
        main.innerHTML = `
            <div style="text-align:center; padding:2rem;">
                <h2 style="font-size:3.5rem; margin-bottom:1rem; font-weight:900;">Iconic Standings</h2>
                <div style="display:flex; justify-content:center; gap:1.5rem; margin-bottom:4rem;">
                    <button class="share-btn" style="margin:0" onclick="setMode('home')">Great Hall</button>
                    <button class="share-btn" style="margin:0; background:rgba(255,255,255,0.05)" onclick="resetSession()">New Alumni</button>
                </div>
            </div>
            <div class="poll-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:2.5rem;">
                ${pollData.map(cat => {
                    const data = pollResults[cat.id];
                    const sorted = [...cat.nominees].sort((a,b) => (data.votes[b] || 0) - (data.votes[a] || 0));
                    return `
                        <div class="category-card" style="padding:1.5rem;">
                            <h2 class="category-title" style="font-size:1.3rem;">${cat.title}</h2>
                            <div class="podium-container">
                                <div class="podium-item rank-2"><span class="rank-badge">2</span><p style="font-size:0.75rem; color:var(--text-secondary); margin-top:auto;">${sorted[1] || '-'}</p></div>
                                <div class="podium-item rank-1"><span class="rank-badge">1</span><p style="font-size:0.85rem; font-weight:900; color:#fff; margin-top:auto;">${sorted[0] || '-'}</p></div>
                                <div class="podium-item rank-3"><span class="rank-badge">3</span><p style="font-size:0.75rem; color:var(--text-secondary); margin-top:auto;">${sorted[2] || '-'}</p></div>
                            </div>
                            <div class="nominees-list">
                                ${cat.nominees.map(n => {
                                    const v = data.votes[n];
                                    const p = data.total === 0 ? 0 : Math.round((v / data.total) * 100);
                                    return `
                                        <div class="nominee-option" style="pointer-events:none; padding: 0.5rem 1rem; margin-bottom:0.4rem">
                                            <div class="vote-bar" style="width:${p}%"></div>
                                            <span class="nominee-name" style="font-size:0.85rem">${n}</span>
                                            <span class="vote-percentage" style="font-size:0.8rem">${v} (${p}%)</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

const resetSession = () => {
    currentAlumni = null;
    localStorage.removeItem(SESSION_KEY);
    setMode('home');
};

init();

window.setMode = setMode;
window.handleRegistration = handleRegistration;
window.castSessionVote = castSessionVote;
window.nextStep = nextStep;
window.resetSession = resetSession;
window.startVoting = startVoting;
