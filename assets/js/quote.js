// Adding motivational quotes
// const motivationalQuotes = [
//   { text: "Stand up to your obstacles and do something about them. You'll find they haven't half the strength you think they have.", author: "Norman Vincent Peale" },
//   { text: "I dream my painting and I paint my dream.", author: "Vincent van Gogh" },
//   { text: "Intelligence, imagination, and knowledge are essential resources, but only effectiveness converts them into results.", author: "Peter Drucker" }
// ];

// function getMotivationalQuote() {
//   const index = Math.floor(Math.random() * motivationalQuotes.length);
//   const motivationalChoice = motivationalQuotes[index];
//   const motivationalText = `"${motivationalChoice.text}" - ${motivationalChoice.author}`;
//   document.getElementById('motivational-quote').textContent = motivationalText;
// }

// document.getElementById('change-quote').addEventListener('click', getMotivationalQuote);
// getMotivationalQuote();

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://cors-anywhere.herokuapp.com/
async function getMotivationalQuote() {
    const url = "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      const motivationalText = `"${randomQuote.q}" - ${randomQuote.a}`;
      
      document.getElementById('motivational-quote').textContent = motivationalText;
    } catch (error) {
      console.error(error.message);
      document.getElementById('motivational-quote').textContent = "Could not fetch a new quote.";
    }
  }
  
  document.getElementById('change-quote').addEventListener('click', getMotivationalQuote);
  
  getMotivationalQuote();