document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('groups-container');

    fetch('data/participants.json')
        .then(res => res.json())
        .then(data => {
            // If data is empty or invalid, throw error to catch block/graceful fail
            if (!Array.isArray(data) || data.length === 0) throw new Error("No data");

            const groups = {};
            
            // Group by 'group' field which is now Leader Name
            data.forEach(p => {
                const groupKey = p.group || "Nedefinit"; 
                if (!groups[groupKey]) groups[groupKey] = [];
                groups[groupKey].push(p);
            });

            container.innerHTML = ''; // Clear loading

            // Iterate through group names
            Object.keys(groups).sort().forEach(groupName => {
                const groupMembers = groups[groupName];
                
                // Specific sorting order: U (Ucenic) -> P (Participant) -> O (Observator)
                const roleOrder = { 'U': 1, 'P': 2, 'O': 3 };
                
                groupMembers.sort((a, b) => {
                    const roleA = roleOrder[a.role] || 4; // Default to 4 if unknown
                    const roleB = roleOrder[b.role] || 4;
                    return roleA - roleB;
                });
                
                const groupDiv = document.createElement('div');
                groupDiv.className = 'group-section';
                
                let membersHtml = '';
                groupMembers.forEach(member => {
                    // Skip printing the leader as a member row, if they are the leader of this group
                    if (member.role === 'L') return; 

                    // Badges: U (Apprentice), O (Observer), L (Leader - though skipped above)
                    let badge = '';
                    if (member.role === 'U') badge = `<span class="role-tag role-APP">U</span>`; // Using APP style for Apprentice
                    if (member.role === 'O') badge = `<span class="role-tag role-OBS">O</span>`;
                    // P is default, no badge needed usually, or just "P"
                    
                    const texts = [member.text1, member.text2].filter(t => t).join(', ');

                    membersHtml += `
                        <div class="participant-row">
                            <div class="participant-info">
                                ${badge} <span>${member.name}</span>
                            </div>
                            <div class="participant-texts">
                                <small>${texts}</small>
                            </div>
                        </div>
                    `;
                });

                // Determine Display Leader Name
                // If groupName is "Nedefinit", show just "Grup Nedefinit". 
                // Otherwise "Grupa - SGL: [Name]"
                const headerText = (groupName === "Nedefinit") 
                    ? "Grupă Neasignată" 
                    : `${groupName}`;

                groupDiv.innerHTML = `
                    <div class="group-header">
                        ${headerText}
                    </div>
                    ${membersHtml}
                `;
                container.appendChild(groupDiv);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<p style="text-align:center; padding: 20px;">Împărțirea pe grupe va fi disponibilă în curând.</p>';
        });
});
