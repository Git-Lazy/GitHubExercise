document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Light Mode';
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌛 Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load Quote of the Day
    const api_url = "https://zenquotes.io/api/today";
    async function getQuote(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                const quote = data[0].q;
                const author = data[0].a;
                document.querySelector('.daily-quote').textContent = `"${quote}" — ${author}`;
            } else {
                document.querySelector('.daily-quote').textContent = "No quote available.";
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
            document.querySelector('.daily-quote').textContent = "Failed to load quote.";
        }
    }
    getQuote(api_url);

    // Slideshow
    const images = [
        "images/image1.png",
        "images/image2.png",
        "images/image3.png",
        "images/image4.png"
    ];
    let currentIndex = 0;
    const slideshowImage = document.getElementById('slideshow-image');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        slideshowImage.src = images[currentIndex];
        console.log("Switched to:", slideshowImage.src);
    }, 3000); // Change image every 3 seconds
});
