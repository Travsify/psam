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
  { 
    name: "Sack Race", icon: "🏃", 
    desc: "A classical high-energy jumping race that brings back childhood memories.",
    rules: ["Both feet must stay inside the sack at all times.", "First person to hop across the finish line wins.", "No physical contact with other racers."],
    materials: ["20 large burlap or heavy-duty plastic sacks.", "Finish line tape or cones."],
    fun: "Add a 'clumsiness' award for the most dramatic fall!"
  },
  { 
    name: "Tug of War", icon: "💪", 
    desc: "The ultimate show of strength between our old school houses or friendship groups.",
    rules: ["Two teams pull on opposite ends of a rope.", "Objective is to pull the other team across the center line.", "No wrapping the rope around your hands!"],
    materials: ["Heavy-duty 50-foot manila rope.", "Center line marker (tape or spray paint)."],
    fun: "Have the winners 'coach' the next round of finalists."
  },
  { 
      name: "Memory Lane Quiz", icon: "❓", 
      desc: "Test how much you actually remember from our PSAM days (2012-2014).",
      rules: ["Participants answer questions about past teachers, events, and classmates.", "No phones allowed!", "Speed counts for bonus points."],
      materials: ["Quiz cards or a digital presentation.", "Buzzer app or physical bells."],
      fun: "Include a 'Secret Alumnus' round with obscure facts."
  },
  { 
      name: "Musical Chairs", icon: "🪑", 
      desc: "The high-stakes game of speed and strategy. Who gets the last seat?",
      rules: ["One chair less than the number of players.", "When music stops, find a seat.", "No hovering allowed!"],
      materials: ["Portable sound system.", "Circle of 15-20 stable chairs."],
      fun: "Play popular songs from 2012 to set the vibe."
  },
  { 
      name: "PSAM Charades", icon: "🎭", 
      desc: "Act out iconic class moments, teachers, or inside jokes without speaking.",
      rules: ["Teams take turns acting out a secret prompt.", "No sounds or lip-syncing.", "Time limit of 60 seconds per prompt."],
      materials: ["List of prompts on cards.", "Stopwatch or phone timer."],
      fun: "The 'Best Actor' gets an extra cocktail voucher!"
  },
  { 
      name: "Scavenger Hunt", icon: "🔍", 
      desc: "Find hidden PSAM-themed artifacts hidden around the picnic ground.",
      rules: ["Find all items on the list within the time limit.", "Items must be brought back to the hub.", "Teams only."],
      materials: ["Custom printed clue sheets.", "Small 'artifacts' (old badge replicas, etc.)."],
      fun: "Include clues that require alumni to take selfies with strangers."
  },
  { 
      name: "Giant Jenga", icon: "🧱", 
      desc: "A test of steady hands. Don't let the PSAM tower collapse!",
      rules: ["Pull one block from the tower and place it on top.", "Only use one hand.", "Person who knocks it over buys the next round."],
      materials: ["Giant wooden Jenga set (usually 54 blocks).", "Stable, flat base."],
      fun: "Write alumni names on the blocks for 'targeted' removals."
  },
  { 
      name: "Alumni Trivia", icon: "📚", 
      desc: "In-depth trivia specifically about our 2012-2014 class members.",
      rules: ["Questions range from 'Who was the first to get married?' to 'Who had the loudest laugh?'", "Multiple choice format.", "Crowd decides the winner on subjective questions."],
      materials: ["Projector or large board.", "Score keeping system."],
      fun: "Crowd-source questions during registration!"
  },
  { 
      name: "Photo Booth Challenge", icon: "📸", 
      desc: "Strike the best 'Iconic' post-2014 pose in our themed photobooth.",
      rules: ["Must use at least 3 props.", "Pose must tell a story of '10 years later'.", "Best photo voted on by the group."],
      materials: ["PSAM Backdrop.", "Props (glasses, signs, hats).", "Selfie-ring light."],
      fun: "Instant print-outs make the best souvenirs."
  },
  { 
      name: "Dance-Off", icon: "💃", 
      desc: "Show off those moves! Whether it's 2014 Shoki or 2026 Afrobeat.",
      rules: ["Rounds of 30 seconds per dancer.", "Elimination style.", "Judges look for creativity and energy."],
      materials: ["Great Playlist.", "Clear dancefloor area."],
      fun: "Mix in some nostalgic Nigerian hits from our graduation year."
  },
  { 
      name: "Two Truths & A Lie", icon: "🤥", 
      desc: "Reconnect by guessing what's real and what's fake about your classmates' lives since 2014.",
      rules: ["State 3 facts about your life.", "Classmates vote on which one is the lie.", "Correct guessers get a point."],
      materials: ["Note pads or just voices.", "A good memory for facts."],
      fun: "Reward the 'Best Liar' for the most believable tall tale."
  },
  { 
      name: "Blindfolded Trust Walk", icon: "🙈", 
      desc: "Trust your fellow alumnus to lead you through a simple obstacle course.",
      rules: ["One person is blindfolded, the other gives verbal directions.", "No touching allowed.", "Fastest time wins."],
      materials: ["Blindfolds.", "Basic obstacles (cones, balls)."],
      fun: "Make the 'directions' rhyme for added difficulty."
  },
  { 
      name: "PSAM Bingo", icon: "🎲", 
      desc: "Find people who match specific criteria on your bingo card.",
      rules: ["Find someone who 'Lives in Abuja', 'Is a Doctor', etc.", "They must sign your card.", "First to clear a row wins."],
      materials: ["Custom Bingo cards.", "Pens for everyone."],
      fun: "Include a 'Secret Celebrity' space for a random classmate."
  },
  { 
      name: "Talent Show", icon: "🎤", 
      desc: "What's your secret talent 10 years later? Singing, poetry, or a magic trick?",
      rules: ["Perform for 2-3 minutes.", "No strictly professional acts.", "Winner chosen by applause-meter."],
      materials: ["Microphone.", "Small stage area."],
      fun: "Have our favorite 2014 teacher be a guest judge!"
  },
  { 
      name: "Raffle Draw", icon: "🎟️", 
      desc: "The big finale. Win exclusive PSAM Reunion merchandise and vouchers.",
      rules: ["Everyone gets a ticket upon entry.", "Numbers drawn at random throughout the evening.", "Must be present to win."],
      materials: ["Raffle tickets.", "Prizes (shirts, caps, gift boxes)."],
      fun: "The 'Grand Prize' should be a local weekend getaway."
  },
  { 
      name: "Paper Plane Contest", icon: "✈️", 
      desc: "Use your engineering skills to build the furthest flying plane.",
      rules: ["Use only one sheet of A4 paper.", "No tape or glue.", "Longest flight distance wins."],
      materials: ["50 sheets of colorful A4 paper.", "Measuring tape."],
      fun: "Award a 'Style' trophy for the most unique folding design."
  },
  { 
      name: "Egg & Spoon Race", icon: "🥚", 
      desc: "The ultimate test of balance and focus. Don't drop the egg!",
      rules: ["Place spoon in mouth (or hand).", "Objective is to reach finish line without dropping the egg.", "No holding the egg with your thumb."],
      materials: ["20 plastic spoons.", "20 hard-boiled eggs."],
      fun: "Play high-tempo music to build the tension!"
  },
  { 
      name: "Balloon Pop", icon: "🎈", 
      desc: "The chaotic team challenge. Pop as many balloons as possible without using your hands.",
      rules: ["Balloons are tied to players' ankles.", "Objective is to pop others' while protecting yours.", "Last balloon standing wins."],
      materials: ["100 colorful balloons.", "Spool of twine."],
      fun: "Team colors make it clearer for the audience to cheer!"
  },
  { 
      name: "Guess the Baby", icon: "👶", 
      desc: "Can you recognize your classmates from their infant photos?",
      rules: ["Photos displayed on a board with numbers.", "Participants write down the names next to numbers.", "Most correct guesses wins."],
      materials: ["Board for photos.", "Printed baby photos from alumni."],
      fun: "Award a 'Cute' prize for the baby photo that looks exactly the same today."
  },
  { 
      name: "Hula Hoop Pass", icon: "⭕", 
      desc: "A cooperative team challenge. Move the hoop through a human chain without breaking grip.",
      rules: ["Teams hold hands in a line.", "Move the hoop from one end to the other.", "No releasing hands!"],
      materials: ["2 large hula hoops."],
      fun: "Compete against another class year if available!"
  }
];

const STORAGE_KEY = 'psam_poll_v7'; 
const REGISTRY_KEY = 'psam_reunion_v7';
const SESSION_KEY = 'psam_current_alumni_v7';

let pollResults = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let alumniRegistry = JSON.parse(localStorage.getItem(REGISTRY_KEY)) || [];
let currentAlumni = JSON.parse(localStorage.getItem(SESSION_KEY)) || null;

let appState = {
    mode: 'home', 
    step: 0,
    sessionVotes: {},
    selectedGame: null
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
    const navMap = { 'home': 'nav-home', 'itinerary': 'nav-itinerary', 'voting': 'nav-voting', 'registration': 'nav-voting', 'success': 'nav-voting', 'games': 'nav-games', 'game-guide': 'nav-games', 'hall-of-fame': 'nav-hall' };
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

const viewGame = (game) => {
    appState.selectedGame = game;
    appState.mode = 'game-guide';
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

const renderApp = () => {
    updateNav();
    const main = document.getElementById('main-content');
    const container = document.getElementById('poll-container');
    const progress = document.getElementById('progress-container');
    const bar = document.getElementById('progress-fill');
    const stats = document.getElementById('global-stats');

    if (!main || !container) return;
    if (stats) stats.innerHTML = `🎓 <strong>${alumniRegistry.length}</strong> Enrolled &middot; 🗳️ <strong>${pollResults[1]?.total || 0}</strong> Votes Recorded`;

    main.innerHTML = '';
    container.innerHTML = '';
    progress.style.display = 'none';

    if (appState.mode === 'home') {
        const h1 = document.getElementById('header-title');
        const h2 = document.getElementById('header-subtitle');
        if (h1) h1.textContent = "PSAM Class of 12/14";
        if (h2) h2.textContent = "Grand Reunion 2026 · Abuja";

        main.innerHTML = `
            <div class="entry-menu">
                <div class="menu-card" onclick="setMode('itinerary')">
                    <span class="menu-icon">📅</span>
                    <h3>The Itinerary</h3>
                    <p>Official schedule from Arrival through Farewell Brunch.</p>
                </div>
                <div class="menu-card" onclick="setMode('games')">
                    <span class="menu-icon">🎮</span>
                    <h3>Reunion Games</h3>
                    <p>Interactive playbook of 20 legendary activities.</p>
                </div>
                <div class="menu-card" onclick="setMode('voting')">
                    <span class="menu-icon">🗳️</span>
                    <h3>Gala Awards Ballot</h3>
                    <p>Register and vote for the official PSAM awards.</p>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'itinerary') {
        main.innerHTML = `
            <div style="text-align:center; margin-bottom:3rem;"><h2 style="font-size:3rem; font-weight:900;">Official Itinerary</h2></div>
            <div class="itinerary-list">
                ${itineraryDays.map(day => `
                    <div class="itinerary-item">
                        <span class="itinerary-date">${day.date}</span>
                        <h3 style="font-size:1.4rem; margin-bottom:0.75rem;">${day.title}</h3>
                        <p style="color:var(--text-secondary); line-height:1.7;">${day.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (appState.mode === 'games') {
        main.innerHTML = `
            <div style="text-align:center; margin-bottom:3rem;"><h2 style="font-size:3rem; font-weight:900;">Iconic Playbook</h2><p style="color:var(--text-secondary);">Select a game to view the official guide</p></div>
            <div class="game-grid">
                ${reunionGames.map((game, i) => `
                    <div class="game-card" onclick="viewGame(reunionGames[${i}])">
                        <span class="game-icon">${game.icon}</span>
                        <h3>${game.name}</h3>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (appState.mode === 'game-guide') {
        const game = appState.selectedGame;
        main.innerHTML = `
            <div class="game-guide">
                <div style="text-align:center; margin-bottom:2rem;">
                    <span class="game-icon" style="font-size:5rem;">${game.icon}</span>
                    <h2 style="font-size:2.8rem; font-weight:900;">${game.name}</h2>
                    <p style="color:var(--text-secondary); margin-top:1rem; font-size:1.1rem; line-height:1.6;">${game.desc}</p>
                </div>
                <div class="guide-section">
                    <span class="guide-label">🎯 How to Play / Rules</span>
                    <ul class="guide-list">${game.rules.map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
                <div class="guide-section">
                    <span class="guide-label">📦 Materials Needed</span>
                    <ul class="guide-list">${game.materials.map(m => `<li>${m}</li>`).join('')}</ul>
                </div>
                <div class="guide-section">
                    <span class="guide-label">✨ The Fun Factor</span>
                    <p class="guide-text">${game.fun}</p>
                </div>
                <button class="next-btn" style="margin-top:3rem;" onclick="setMode('games')">Back to Playbook</button>
            </div>
        `;
    }

    if (appState.mode === 'registration') {
        main.innerHTML = `
            <div class="registration-form">
                <div class="event-banner-wing"></div>
                <div class="registration-content">
                    <h2 style="margin-bottom:2rem; font-weight:900;">Gala Enrollment</h2>
                    <form onsubmit="handleRegistration(event)">
                        <div class="form-group"><label>Full Name</label><input name="name" required placeholder="John Doe"></div>
                        <div class="form-group"><label>Email Address</label><input type="email" name="email" required placeholder="john@example.com"></div>
                        <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" required placeholder="+234..."></div>
                        <div class="form-group"><label>Attending?</label>
                            <select name="attending"><option value="Yes">Yes!</option><option value="Maybe">Maybe</option><option value="No">No</option></select></div>
                        <button type="submit" class="next-btn" style="margin-top:1.5rem;">Join & Vote</button>
                    </form>
                </div>
            </div>
        `;
    }

    if (appState.mode === 'success') {
        main.innerHTML = `
            <div class="registration-form" style="display:block; max-width:600px"><div class="success-card">
                <span class="success-icon">✨</span><h2 style="font-size:2.5rem; font-weight:900;">Success!</h2>
                <p style="color:var(--text-secondary); margin-bottom:3rem; line-height:1.6;">Your reunion enrollment is successful. Let's head to the voting hall.</p>
                <button class="next-btn" onclick="startVoting()">Proceed to Awards</button>
            </div></div>
        `;
    }

    if (appState.mode === 'voting') {
        progress.style.display = 'block';
        if (bar) bar.style.width = `${(appState.step / pollData.length) * 100}%`;
        const cat = pollData[appState.step - 1];
        const sel = appState.sessionVotes[appState.step];
        container.innerHTML = `
            <div class="category-card" style="max-width:700px; margin:0 auto; border-top:4px solid var(--accent-primary);">
                <span style="color:var(--accent-secondary); font-size:0.8rem; font-weight:800; text-transform:uppercase;">Award ${appState.step} / ${pollData.length}</span>
                <h2 style="font-size:2.4rem; margin-top:1rem;">${cat.title}</h2>
                <p style="color:var(--text-secondary); margin-bottom:2rem; font-style:italic;">"${cat.desc}"</p>
                <div class="nominees-list">${cat.nominees.map(n => `<div class="nominee-option ${sel === n ? 'selected' : ''}" onclick="castSessionVote('${n}')"><span class="nominee-name">${n}</span></div>`).join('')}</div>
                <button class="next-btn" style="margin-top:3rem;" ${!sel ? 'disabled' : ''} onclick="nextStep()">${appState.step === pollData.length ? 'Submit Ballot' : 'Next Award'}</button>
            </div>
        `;
    }

    if (appState.mode === 'hall-of-fame') {
        main.innerHTML = `
            <div style="text-align:center; margin-bottom:3rem;"><h2 style="font-size:3.5rem; font-weight:900;">The Legends</h2><button class="share-btn" onclick="resetSession()">Login Switch</button></div>
            <div class="poll-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:2rem;">
                ${pollData.map(cat => {
                    const data = pollResults[cat.id];
                    const sorted = [...cat.nominees].sort((a,b) => (data.votes[b] || 0) - (data.votes[a] || 0));
                    return `
                        <div class="category-card" style="padding:1.5rem;">
                            <h2 style="font-size:1.3rem; margin-bottom:0.5rem; font-weight:900;">${cat.title}</h2>
                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1.5rem; font-style:italic;">"${cat.desc}"</p>
                            <div class="podium-container">
                                <div class="podium-item rank-2"><span class="rank-badge">2</span><p style="font-size:0.75rem; color:var(--text-secondary); margin-top:auto;">${sorted[1] || '-'}</p></div>
                                <div class="podium-item rank-1"><span class="rank-badge">1</span><p style="font-size:0.85rem; font-weight:900; margin-top:auto; color:var(--accent-tertiary);">${sorted[0] || '-'}</p></div>
                                <div class="podium-item rank-3"><span class="rank-badge">3</span><p style="font-size:0.75rem; color:var(--text-secondary); margin-top:auto;">${sorted[2] || '-'}</p></div>
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
window.viewGame = viewGame;
window.handleRegistration = handleRegistration;
window.castSessionVote = castSessionVote;
window.nextStep = nextStep;
window.resetSession = resetSession;
window.startVoting = startVoting;
window.submitBallot = submitBallot;
