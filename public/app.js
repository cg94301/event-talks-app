document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categorySearch = document.getElementById('categorySearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    let allTalks = [];

    // Configuration
    const START_HOUR = 10;
    const START_MINUTE = 0;
    const TALK_DURATION = 60; // minutes
    const TRANSITION_DURATION = 10; // minutes
    const LUNCH_DURATION = 60; // minutes
    const LUNCH_AFTER_TALK = 3;

    // Fetch talks from API
    async function fetchSchedule() {
        try {
            const response = await fetch('/api/schedule');
            allTalks = await response.json();
            renderSchedule(allTalks);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            scheduleContainer.innerHTML = '<div class="error">Failed to load schedule. Please try again later.</div>';
        }
    }

    // Format time (e.g., 10:00 AM)
    function formatTime(totalMinutes) {
        let hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    }

    // Render the schedule based on talks and optional filter
    function renderSchedule(talks, filter = '') {
        scheduleContainer.innerHTML = '';
        
        let currentMinutes = START_HOUR * 60 + START_MINUTE;
        const filteredFilter = filter.toLowerCase().trim();

        allTalks.forEach((talk, index) => {
            const startTime = formatTime(currentMinutes);
            const endTime = formatTime(currentMinutes + TALK_DURATION);
            
            // If filtering, only check the talk content
            const matchesFilter = talk.categories.some(cat => cat.toLowerCase().includes(filteredFilter)) || 
                                 talk.title.toLowerCase().includes(filteredFilter) ||
                                 talk.speakers.some(speaker => speaker.toLowerCase().includes(filteredFilter));

            if (matchesFilter || !filteredFilter) {
                // Create talk element
                const talkElement = document.createElement('div');
                talkElement.className = 'schedule-item';
                talkElement.innerHTML = `
                    <div class="time-slot">${startTime} - ${endTime}</div>
                    <h2 class="talk-title">${talk.title}</h2>
                    <div class="speakers">by ${talk.speakers.join(' & ')}</div>
                    <div class="categories">
                        ${talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                    <p class="description">${talk.description}</p>
                `;
                scheduleContainer.appendChild(talkElement);
            }

            // Update time for transitions and lunch
            currentMinutes += TALK_DURATION;

            // Handle Lunch or Transition
            const isLastTalk = index === allTalks.length - 1;
            if (!isLastTalk) {
                if (index + 1 === LUNCH_AFTER_TALK) {
                    // Render Lunch Break
                    const lunchElement = document.createElement('div');
                    lunchElement.className = 'lunch-item';
                    lunchElement.innerHTML = `🍴 Lunch Break: ${formatTime(currentMinutes)} - ${formatTime(currentMinutes + LUNCH_DURATION)}`;
                    scheduleContainer.appendChild(lunchElement);
                    currentMinutes += LUNCH_DURATION;
                } else {
                    // Render Transition
                    const transitionElement = document.createElement('div');
                    transitionElement.className = 'transition-item';
                    transitionElement.innerText = `10 min transition`;
                    scheduleContainer.appendChild(transitionElement);
                    currentMinutes += TRANSITION_DURATION;
                }
            }
        });

        if (scheduleContainer.children.length === 0) {
            scheduleContainer.innerHTML = '<div class="no-results">No talks found matching your search.</div>';
        }
    }

    // Event listener for search input
    categorySearch.addEventListener('input', (e) => {
        const value = e.target.value;
        renderSchedule(allTalks, value);
        toggleClearButton(value);
    });

    // Event listener for clear button
    clearSearchBtn.addEventListener('click', () => {
        categorySearch.value = '';
        renderSchedule(allTalks, '');
        toggleClearButton('');
        categorySearch.focus();
    });

    // Show/hide the clear button
    function toggleClearButton(value) {
        clearSearchBtn.style.display = value.trim() ? 'block' : 'none';
    }

    // Initial load
    fetchSchedule();
});
