const pollData = [
    { id: 1, title: "The 'Still the Same' Award", nominees: ['Patrick', 'Samuel Eze', 'Abdulrahman', 'Drusilla'], desc: "The person who hasn't changed a bit since 2014" },
    { id: 2, title: "The 'Glow-Up' Master", nominees: ['Donatus', 'Samuel Isaac', 'Qudus', 'Patrick'], desc: "Most impressive physical/lifestyle transformation" },
    { id: 3, title: "The 'Silent Billionaire'", nominees: ['Goodman', 'Qudus', 'Abdulrahman', 'Salome'], desc: "The one who achieved massive success quietly" },
    { id: 4, title: "The 'Global Nomad'", nominees: ['Salome', 'Dorothy', 'Jude', 'Suzan'], desc: "Person who has traveled the most countries" },
    { id: 5, title: "The 'Academic Giant'", nominees: ['Drusilla', 'Anielkan', 'Blessing', 'Suzan'], desc: "Most advanced degrees achieved" },
    { id: 6, title: "The 'Life of the Party'", nominees: ['Goodman', 'Qudus', 'Jude', 'Samuel Eze'], desc: "Still the funniest person in the room" }
];

const itineraryDays = [
    { date: "Monday, May 11th", title: "Arrival & 'The Icebreaker' Cocktail Night", desc: "Welcome back to Abuja! Check-in at the Luxury Suites, followed by an evening of cocktails, hors d'oeuvres, and initial catch-ups. Music by an acoustic live band." },
    { date: "Tuesday, May 12th", title: "Back to Our Roots: Picnic & Games Day", desc: "A relaxed day at Millennium Park. Games include Sack Race, Tug of War, and 'The Memory Lane Quiz'. Lunch: Authentic Nigerian BBQ and cold drinks." },
    { date: "Wednesday, May 13th", title: "Impact Day: Alumni Charity Drive & Mentorship", desc: "The class visits a local school in Abuja to donate supplies and mentor current secondary school students. A day of giving back to the community." },
    { date: "Thursday, May 14th", title: "Abuja City Tour & Photo Ops", desc: "A professional city tour including Jabi Lake, Zuma Rock photo stop, and a visit to the Nike Art Gallery. Wear your official 'Reunion Merch'!" },
    { date: "Friday, May 15th", title: "The Gala Dinner & Awards Night", desc: "Our main event. Red-carpet entrance, 5-course meal, and 'The Class Awards'. Special Guest Speakers." },
    { date: "Saturday, May 16th", title: "Farewell Brunch & Group Prayer", desc: "A final group brunch to share contact details, pray for the class, and discuss the roadmap for the Class of 12/14 Foundation. Departure." }
];

const reunionGames = [
  { name: "Sack Race", icon: "🏃", desc: "Classical high-energy jumping race." },
  { name: "Tug of War", icon: "💪", desc: "The ultimate show of class strength." },
  { name: "Memory Lane Quiz", icon: "❓", desc: "How much do you remember from 2012?" },
  { name: "Musical Chairs", icon: "🪑", desc: "Battle for the final seat!" },
  { name: "Charades", icon: "🎭", desc: "Act out our old class moments." },
  { name: "Scavenger Hunt", icon: "🔍", desc: "Find hidden PSAM artifacts." },
  { name: "Giant Jenga", icon: "🧱", desc: "Don't let the tower fall!" },
  { name: "Alumni Trivia", icon: "📚", desc: "Trivia based on class members." },
  { name: "Photo Booth Challenge", icon: "📸", desc: "Strike the best post-2014 pose." },
  { name: "Dance-Off", icon: "💃", desc: "Show off those 2014 moves." },
  { name: "Two Truths & A Lie", icon: "🤥", desc: "What have you done since graduation?" },
  { name: "Blindfolded Walk", icon: "🙈", desc: "Trust your fellow alumnus." },
  { name: "PSAM Bingo", icon: "🎲", desc: "Find people who match the card." },
  { name: "Talent Show", icon: "🎤", desc: "What's your secret talent?" },
  { name: "Raffle Draw", icon: "🎟️", desc: "Win exclusive reunion merch." }
];

const STORAGE_KEY = 'psam_poll_v6'; 
const REGISTRY_KEY = 'psam_reunion_v6';
const SESSION_KEY = 'psam_current_alumni_v6';

let pollResults = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let alumniRegistry = JSON.parse(localStorage.getItem(REGISTRY_KEY)) || [];
let currentAlumni = JSON.parse(localStorage.getItem(SESSION_KEY)) || null;

let appState = {
    mode: 'home', // 'home', 'registration', 'success', 'voting', 'hall-of-fame', 'itinerary', 'games'
    step: 0,
    sessionVotes: {}
};

// 1. Init
const init = () => {
    if (Object.keys(pollResults).length === 0 || !pollResults[1]) {
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

const updateNav = () => {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navMap = { 'home': 'nav-home', 'itinerary': 'nav-itinerary', 'voting': 'nav-voting', 'registration': 'nav-voting', 'success': 'nav-voting', 'games': 'nav-games', 'hall-of-fame': 'nav-hall' };
    const activeId = navMap[appState.mode];
    if (activeId) document.getElementById(activeId)?.classList.add('active');
};

const setMode = (mode) => {
    appState.mode = mode;
    if (mode === 'voting') {
        if (!currentAlumni) {
            appState.mode = 'registration';
        } else {
            const hasVoted = pollResults[1]?.voters.includes(currentAlumni.name);
            if (hasVoted) {
                showToast(`Alumni ${currentAlumni.name}, our records show your legendary ballot is already cast.`);
                appState.mode = 'hall-of-fame';
            } else {
                appState.step = 1;
            }
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (!alumniRegistry.some(a => a.email === alumni.email)) alumniRegistry.push(alumni);
    currentAlumni = alumni;
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(alumniRegistry));
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentAlumni));
    appState.mode = 'success';
    renderApp();
};

const startVoting = () => { appState.step = 1; appState.mode = 'voting'; renderApp(); };

const castSessionVote = (nominee) => { appState.sessionVotes[appState.step] = nominee; renderApp(); };

const nextStep = () => {
    if (!appState.sessionVotes[appState.step]) {
        showToast('Please select a nominee to proceed.');
        return;
    }
    if (appState.step < pollData.length) {
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
        if (pollResults[cat.id] && choice) {
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
    updateNav();
    const main = document.getElementById('main-content');
    const container = document.getElementById('poll-container');
    const progress = document.getElementById('progress-container');
    const bar = document.getElementById('progress-fill');
    const stats = document.getElementById('global-stats');

    if (!main || !container) return;

    if (stats) stats.innerHTML = `🛡️ <strong>${alumniRegistry.length}</strong> Registered &middot; 🗳️ <strong>${pollResults[1]?.total || 0}</strong> Ballots Cast`;

    main.innerHTML = '';
    container.innerHTML = '';
    progress.style.display = 'none';

    if (appState.mode === 'home') {
        main.innerHTML = `
            <div class="entry-menu">
                <div class="menu-card" onclick="setMode('itinerary')">
                    <span class="menu-icon">📅</span>
                    <h3>Official Itinerary</h3>
                    <p>Plan your week from Arrival to Farewell Brunch.</p>
                </div>
                <div class="menu-card" onclick="setMode('voting')">
                    <span class="menu-icon">🗳️</span>
                    <h3>Gala Awards Ballot</h3>
                    <p>Vote for 'Glow-Up Master', 'Silent Billionaire' and more.</p>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'itinerary') {
        main.innerHTML = `
            <div style="text-align:center; margin-bottom:4rem;">
                <h2 style="font-size:3rem; font-weight:900;">Grand Reunion Itinerary</h2>
                <p style="color:var(--text-secondary);">PSAM Class of 12/14 | Reconnecting a Decade Later</p>
            </div>
            <div class="itinerary-list">
                ${itineraryDays.map(day => `
                    <div class="itinerary-item">
                        <span class="itinerary-date">${day.date}</span>
                        <h3 style="font-size:1.5rem; margin-bottom:1rem;">${day.title}</h3>
                        <p style="color:var(--text-secondary); line-height:1.7;">${day.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (appState.mode === 'games') {
        main.innerHTML = `
            <div style="text-align:center; margin-bottom:4rem;">
                <h2 style="font-size:3rem; font-weight:900;">Iconic Reunion Games</h2>
                <p style="color:var(--text-secondary);">15 suggested activities for our Abuja Get-Together</p>
            </div>
            <div class="game-grid">
                ${reunionGames.map(game => `
                    <div class="game-card">
                        <span class="game-icon">${game.icon}</span>
                        <h3>${game.name}</h3>
                        <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.5rem;">${game.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (appState.mode === 'registration') {
        main.innerHTML = `
            <div class="registration-form">
                <div class="event-banner-wing"></div>
                <div class="registration-content">
                    <h2 style="margin-bottom:0.5rem; font-weight:900;">Gala Registration</h2>
                    <form onsubmit="handleRegistration(event)">
                        <div class="form-group"><label>Full Name</label><input name="name" required placeholder="John Doe"></div>
                        <div class="form-group"><label>Email Address</label><input type="email" name="email" required placeholder="john@example.com"></div>
                        <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" required placeholder="+234..."></div>
                        <div class="form-group">
                            <label>Are you attending the Abuja Get-Together?</label>
                            <select name="attending">
                                <option value="Yes">Yes, I'll be there!</option>
                                <option value="Maybe">Maybe (Deciding)</option>
                                <option value="No">No, can't make it</option>
                            </select>
                        </div>
                        <button type="submit" class="next-btn" style="width:100%; margin-top:2rem;">Register & Open Ballot</button>
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
                    <h2 style="font-size:2.5rem; font-weight:900;">Success!</h2>
                    <p style="color:var(--text-secondary); margin-bottom:3rem;">Thank you for wanting to join this event! Your enrollment is successful. Now, let's head to the voting hall.</p>
                    <button class="next-btn" style="width:100%" onclick="startVoting()">Proceed to Awards Ballot</button>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'voting') {
        progress.style.display = 'block';
        if (bar) bar.style.width = `${(appState.step / pollData.length) * 100}%`;
        const cat = pollData[appState.step - 1];
        const sel = appState.sessionVotes[appState.step];
        container.innerHTML = `
            <div class="category-card" style="max-width:700px; margin:0 auto;">
                <span style="color:var(--accent-secondary); font-size:0.8rem; font-weight:800; text-transform:uppercase;">Gala Award ${appState.step} / ${pollData.length}</span>
                <h2 class="category-title" style="font-size:2.4rem; margin-top:1rem;">${cat.title}</h2>
                <p style="color:var(--text-secondary); font-size:0.9rem;">${cat.desc}</p>
                <div class="nominees-list" style="margin-top:2rem">
                    ${cat.nominees.map(n => `<div class="nominee-option ${sel === n ? 'selected' : ''}" onclick="castSessionVote('${n}')"><span class="nominee-name">${n}</span></div>`).join('')}
                </div>
                <button class="next-btn" style="width:100%; margin-top:3rem;" ${!sel ? 'disabled' : ''} onclick="nextStep()">
                    ${appState.step === pollData.length ? 'Submit Final Ballot' : 'Next Award'}
                </button>
            </div>
        `;
    }

    if (appState.mode === 'hall-of-fame') {
        main.innerHTML = `
            <div style="text-align:center; padding:2rem;">
                <h2 style="font-size:3.5rem; font-weight:900;">Current Standings</h2>
                <button class="share-btn" onclick="resetSession()">Switch Alumni Login</button>
            </div>
            <div class="poll-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:2.5rem;">
                ${pollData.map(cat => {
                    const data = pollResults[cat.id];
                    const sorted = [...cat.nominees].sort((a,b) => (data.votes[b] || 0) - (data.votes[a] || 0));
                    return `
                        <div class="category-card" style="padding:1.5rem;">
                            <h2 style="font-size:1.2rem; margin-bottom:1rem;">${cat.title}</h2>
                            <div class="podium-container">
                                <div class="podium-item rank-2"><span class="rank-badge">2</span><p style="font-size:0.75rem; margin-top:auto;">${sorted[1] || '-'}</p></div>
                                <div class="podium-item rank-1"><span class="rank-badge">1</span><p style="font-size:0.8rem; font-weight:900; margin-top:auto;">${sorted[0] || '-'}</p></div>
                                <div class="podium-item rank-3"><span class="rank-badge">3</span><p style="font-size:0.75rem; margin-top:auto;">${sorted[2] || '-'}</p></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

const resetSession = () => { currentAlumni = null; localStorage.removeItem(SESSION_KEY); setMode('home'); };

init();
window.setMode = setMode;
window.handleRegistration = handleRegistration;
window.castSessionVote = castSessionVote;
window.nextStep = nextStep;
window.resetSession = resetSession;
window.startVoting = startVoting;
