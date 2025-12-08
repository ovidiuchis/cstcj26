document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('participants-body');
    const loading = document.getElementById('loading');

    fetch('data/participants.json')
        .then(res => res.json())
        .then(data => {
            loading.style.display = 'none';
            
            // Sort by name
            data.sort((a, b) => a.name.localeCompare(b.name));

            data.forEach(p => {
                const row = document.createElement('tr');
                // Removed Role and Group columns as requested
                row.innerHTML = `
                    <td data-label="Nume"><strong>${p.name}</strong></td>
                    <td data-label="Text 1">${p.text1 || '-'}</td>
                    <td data-label="Text 2">${p.text2 || '-'}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
            loading.textContent = 'Eroare la încărcarea datelor. Lista va fi disponibilă în curând.'; // Graceful fail message
        });
});
