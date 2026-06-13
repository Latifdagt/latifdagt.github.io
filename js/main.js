const animateBtn = document.getElementById("animateBtn");
const landing = document.getElementById("landing");
const birthdayPage = document.getElementById("birthdayPage");
const messageSelect = document.getElementById("messageSelect");
const messageDisplay = document.getElementById("messageDisplay");
const backBtn = document.getElementById("backBtn");
const revealBtn = document.getElementById("revealBtn");
const revealPage = document.getElementById('revealPage');
const replayBtn = document.getElementById('replayBtn');
const surpriseImage = document.getElementById('surpriseImage');

function showBirthdayPage() {
    if (landing) landing.classList.add('d-none');
    if (birthdayPage) {
        birthdayPage.classList.remove('d-none');
        // allow layout then trigger slide-down
        setTimeout(() => {
            birthdayPage.classList.add('open');
            document.body.classList.add('no-scroll');
        }, 20);
    }
    document.documentElement.scrollTop = 0;
    // Set default message
    if (messageSelect && messageDisplay) messageDisplay.textContent = messageSelect.options[messageSelect.selectedIndex].text;
    // Start the YouTube embed with autoplay (muted to increase autoplay likelihood)
    const video = document.getElementById('birthdayVideo');
    if (video) {
        video.src = 'https://www.youtube.com/embed/YzmDLMV2Ytc?autoplay=1&rel=0&mute=0';
    }
}

function hideBirthdayPage() {
    if (birthdayPage) {
        // slide up
        birthdayPage.classList.remove('open');
        document.body.classList.remove('no-scroll');
        // wait for transition then hide
        setTimeout(() => {
            birthdayPage.classList.add('d-none');
            if (landing) landing.classList.remove('d-none');
            // stop video
            const video = document.getElementById('birthdayVideo');
            if (video) video.src = '';
        }, 650);
    } else {
        if (landing) landing.classList.remove('d-none');
    }
}

if (animateBtn) animateBtn.addEventListener('click', showBirthdayPage);

if (messageSelect && messageDisplay) {
    messageSelect.addEventListener('change', () => {
        const text = messageSelect.options[messageSelect.selectedIndex].text;
        messageDisplay.textContent = text;
    });
}

if (backBtn) backBtn.addEventListener('click', hideBirthdayPage);

if (revealBtn) revealBtn.addEventListener('click', () => {
    // Stop and clear the video
    const video = document.getElementById('birthdayVideo');
    if (video) video.src = '';
    // Hide birthday page (slide up) then show reveal page (slide up from bottom)
    if (birthdayPage) {
        birthdayPage.classList.remove('open');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            birthdayPage.classList.add('d-none');
            // show reveal
            if (revealPage) {
                revealPage.classList.remove('d-none');
                setTimeout(() => {
                    revealPage.classList.add('open');
                    document.body.classList.add('no-scroll');
                }, 20);
            }
        }, 650);
    }
});

if (replayBtn) replayBtn.addEventListener('click', () => {
    // hide reveal page and return to landing
    if (revealPage) {
        revealPage.classList.remove('open');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            revealPage.classList.add('d-none');
            if (landing) landing.classList.remove('d-none');
            // clear image src if desired
            if (surpriseImage) surpriseImage.src = '';
        }, 650);
    } else {
        if (landing) landing.classList.remove('d-none');
    }
});