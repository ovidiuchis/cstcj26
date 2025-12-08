document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    const titleElement = document.getElementById('event-title');
    const subtitleElement = document.getElementById('event-subtitle');
    const detailsElement = document.getElementById('event-details');

    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            // Populate Event Info
            if (data.event) {
                if (titleElement) titleElement.textContent = data.event.title || '';
                if (subtitleElement) subtitleElement.textContent = data.event.subtitle || '';
                if (detailsElement) detailsElement.textContent = data.event.details || '';
            }

            // Populate Links
            const links = data.links || []; 
            // Fallback if user kept old array format, though we just updated it.
            // But strict checking:
            const linksArray = Array.isArray(data) ? data : links;

            linksArray.forEach(link => {
                if (link.active) {
                    const linkElement = document.createElement('a');
                    linkElement.href = link.url;
                    linkElement.className = 'link-card';
                    // Open external links in new tab
                    if (link.url.startsWith('http')) {
                        linkElement.target = '_blank';
                        linkElement.rel = 'noopener noreferrer';
                    }

                    linkElement.innerHTML = `
                        <i class="${link.icon}"></i>
                        <span>${link.name}</span>
                    `;

                    linksContainer.appendChild(linkElement);
                }
            });
        })
        .catch(error => {
            console.error('Error loading content:', error);
            if (linksContainer) linksContainer.innerHTML = '<p>Error loading content.</p>';
        });
});
