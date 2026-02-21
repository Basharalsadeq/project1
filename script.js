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
