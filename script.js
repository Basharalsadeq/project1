// 1. SET THE TARGET DATE
// Tomorrow, Feb 23, 2026 at 10:00 AM
const targetDate = new Date("February 23, 2026 10:00:00").getTime();

// 2. THE COUNTDOWN FUNCTION
const updateCountdown = setInterval(function () {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Time calculations
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Update HTML elements safely
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("minutes");
  const secsEl = document.getElementById("seconds");

  if (daysEl) daysEl.innerText = d;
  if (hoursEl) hoursEl.innerText = String(h).padStart(2, "0");
  if (minsEl) minsEl.innerText = String(m).padStart(2, "0");
  if (secsEl) secsEl.innerText = String(s).padStart(2, "0");

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(updateCountdown);
    const timerGrid = document.querySelector(".timer-grid");
    if (timerGrid) {
      timerGrid.innerHTML =
        "<h2 style='color:#d31d32; grid-column: span 4;'>COMPETITION CLOSED</h2>";
    }
  }
}, 1000);

// 3. FORM SUBMISSION LOGIC
const guessForm = document.getElementById("guessForm");
if (guessForm) {
  guessForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!guessForm.checkValidity()) {
      guessForm.reportValidity();
      return;
    }

    const data = new FormData(guessForm);
    const params = new URLSearchParams(data);

    try {
      // Replace with your real Google Script URL
      const response = await fetch("GOOGLE_SCRIPT_URL", {
        method: "POST",
        body: params,
      });

      alert("Success! Your guess has been recorded.");
      guessForm.reset();
    } catch (err) {
      console.log("Form error:", err);
      // Even if URL is missing, we show this for testing
      alert("Submission attempted! (Check console for URL errors)");
    }
  });
}
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  // Appends: [Date, Name, Email, Mobile, Guess]
  sheet.appendRow([new Date(), data.name, data.email, data.mobile, data.guess]);

  return ContentService.createTextOutput("Success").setMimeType(
    ContentService.MimeType.TEXT,
  );
}

// UPDATED FORM SUBMISSION LOGIC
const scriptURL =
  "https://script.google.com/macros/s/AKfycby3TH6ztq7VqYfLQYrwvA9rIBD4nXhRr8mXdgKGMbFpNYwQMp2ynpUmPRg3gqqVJgucOw/exec";
const form = document.getElementById("guessForm");
const submitBtn = document.querySelector('button[type="submit"]');
const modal = document.getElementById("thankYouModal");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    alert("Please fill in all fields correctly.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      // Show the popup instead of an alert
      modal.style.display = "flex";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Guess";
    })
    .catch((error) => {
      console.error("Error!", error.message);
      alert("Something went wrong. Please try again.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Guess";
    });
});

// Function to close the popup
function closeModal() {
  modal.style.display = "none";
}
// Function to show the modal (Called inside your .then() block)
function showSuccessPopup() {
  const modal = document.getElementById("thankYouModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("thankYouModal");
  if (modal) {
    modal.style.display = "none";
  }
}
