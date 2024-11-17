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
  "Time to take a deep breath and relax.",
  "Enjoy this moment, you've earned it.",
  "Stretch, hydrate, and recharge!",
  "A boost in productivity leads to big ideas.",
  "Time to recharge to go to distance later.",
  "Rest now, innovate later.",
  "Step away, your creativity needs you.",
  "Return with focus.",
  "Pause, breathe, and reset.",
  "Take this time to invest in clarity.",
  "This time is crutial to success.",
  "Congratulations on building resilience!",
  "Short rests prepare for long strides."
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