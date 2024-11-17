// Adding motivational quotes
let motivQuoteStatus = false;

async function getMotivationalQuote() {
  const url = "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes";
  if (motivQuoteStatus) {
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    const motivationalText = `"${randomQuote.q}" - ${randomQuote.a}`;
    document.getElementById('motivational-quote').textContent = motivationalText;
    motivQuoteStatus = true;
  } catch (error) {
    console.error(error.message);
    document.getElementById('motivational-quote').textContent = "Could not fetch a new quote.";
  }
}

document.getElementById('change-quote').addEventListener('click', function () {
  if (timerList[timerIndex].type === "break") {
    resetBreakQuoteStatus();
    getBreakQuote();
  }
  if (timerList[timerIndex].type === "work") {
    resetMotivQuoteStatus();
    getMotivationalQuote();
  }
});

getMotivationalQuote();

// break quotes
const breakQuotes = [
  "Take a deep breath and relax.",
  "Breaks help boost productivity. Enjoy this moment.",
  "Stretch, hydrate, and recharge!",
  "This pause is your reward. Relish it!",
  "A short break can lead to big ideas.",
  "Pause, breathe, and reset.",
  "Rest now, conquer later.",
  "Take a moment to breathe and refuel your mind.",
  "A break is an investment in your next big idea.",
  "Recharge your energy and come back stronger.",
  "Small breaks lead to big results.",
  "A moment of rest can spark your creativity.",
  "Step away, clear your mind, and return with focus.",
  "Even a brief pause can reset your productivity.",
  "Taking a break is the best way to maintain your flow."
];

let breakQuoteStatus = false;

// Adding break quotes
function getBreakQuote() {
  if (breakQuoteStatus) {
    return;
  }
  const index = Math.floor(Math.random() * breakQuotes.length);
  document.getElementById('motivational-quote').textContent = breakQuotes[index];
  breakQuoteStatus = true;
}