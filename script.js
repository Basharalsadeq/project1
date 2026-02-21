const form = document.getElementById("guessForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const params = new URLSearchParams(data);
  try {
    const response = await fetch("GOOGLE_SCRIPT_URL", {
      method: "POST",
      body: params,
    });
    if (response.ok) {
      document.getElementById("ack").innerText =
        "Thank you! Your guess has been recorded.";
      form.reset();
    }
  } catch (err) {
    document.getElementById("ack").innerText = "Oops! Something went wrong.";
  }
});

let duration = 300; // 5 minutes
let timeLeft = duration;
let interval;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  clearInterval(interval);
  timeLeft = duration;

  interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.innerText =
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    if (timeLeft <= 10) {
      timerDisplay.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(interval);
      timerDisplay.innerText = "TIME UP!";
    }

    timeLeft--;
  }, 1000);
});
// Set the date we're counting down to
const targetDate = new Date("March 15, 2026 00:00:00").getTime();

const updateTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Time calculations
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the results into the HTML elements
  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;

  // If the count down is finished
  if (distance < 0) {
    clearInterval(updateTimer);
    document.querySelector(".countdown-container").innerHTML = "EXPIRED";
  }
}, 1000);
