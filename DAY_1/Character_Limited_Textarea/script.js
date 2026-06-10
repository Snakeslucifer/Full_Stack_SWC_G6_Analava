const textArea = document.getElementById("textArea");
const counter = document.getElementById("counter");
const output = document.getElementById("output");

const MAX = 200;

textArea.addEventListener("input", () => {
  let text = textArea.value;

  // Hard limit enforcement (extra safety)
  if (text.length > MAX) {
    textArea.value = text.substring(0, MAX);
    text = textArea.value;
  }

  const remaining = MAX - text.length;
  counter.textContent = `${remaining} characters remaining`;

  // Remove previous styles
  counter.classList.remove("warning", "danger");

  // 80–90% warning zone (160+ chars used)
  if (text.length >= 160 && text.length < 190) {
    counter.classList.add("warning");
  }

  // 90%+ danger zone (190+ chars used)
  if (text.length >= 190) {
    counter.classList.add("danger");
  }
});

function submitText() {
  const value = textArea.value.trim();

  if (!value) {
    output.textContent = "Cannot submit empty text.";
    return;
  }

  output.textContent = "Submitted: " + value;
  textArea.value = "";
  counter.textContent = "200 characters remaining";
  counter.classList.remove("warning", "danger");
}