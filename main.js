const apiKey = 'QDqTpto0XX2vzVwxuSvAxf3N0ZWh4dIEmgT79p3B';
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').classList.add('hidden');
        const content = document.getElementById('apod-content');
        content.classList.remove('hidden');

        document.getElementById('apod-title').textContent = data.title;


        
        document.getElementById('apod-img').src = data.url;
        document.getElementById('apod-description').textContent = data.explanation;
        document.getElementById('apod-date').textContent = data.date;
        
        const hdUrlLink = document.getElementById('apod-hdurl');
        hdUrlLink.href = data.hdurl || data.url;

        const copyrightEl = document.getElementById('apod-copyright');
        copyrightEl.textContent = data.copyright ? `© ${data.copyright}` : '';
    })
    .catch(error => {
        console.error('Error fetching APOD:', error);
        const loading = document.getElementById('loading');
        loading.innerHTML = `
            <div class="text-center text-red-500">
                <p class="text-2xl">Failed to load image</p>
                <p class="mt-2">${error.message}</p>
            </div>
        `;
    });