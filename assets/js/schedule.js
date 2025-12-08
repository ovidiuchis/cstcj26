document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('schedule-container');

    fetch('data/orar.json')
        .then(res => res.json())
        .then(data => {
            container.innerHTML = '';
            
            data.schedule.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'group-section day';
                
                let sessionsHtml = '';
                day.sessions.forEach(session => {
                    // Different styling for breaks if needed, currently just same line
                    if (session.type === 'break') {
                        sessionsHtml += `<p><strong>${session.time}</strong> - ${session.title}</p>`;
                    } else {
                        const description = session.speaker ? `${session.title} - ${session.speaker}` : session.title;
                        sessionsHtml += `<p>${session.time} - ${description}</p>`;
                    }
                });

                dayDiv.innerHTML = `
                    <div class="group-header">${day.day}</div>
                    ${sessionsHtml}
                `;
                container.appendChild(dayDiv);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<p>Eroare la încărcarea programului.</p>';
        });
});
