// auth.js
// Connects the login/register form on login.html to the backend API,
// which is backed by MongoDB Atlas.

// Change this if your backend runs on a different host/port.
const API_BASE_URL = "http://localhost:5000/api";

function showMessage(elementId, text, isError = true) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? "#c0392b" : "#27ae60";
}

// ----- Login -----
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showMessage("loginMessage", "Please enter your email and password.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      showMessage("loginMessage", data.message || "Login failed.");
      return;
    }

    // Store the token for future authenticated requests
    localStorage.setItem("evara_token", data.token);
    localStorage.setItem("evara_user", JSON.stringify(data.user));

    showMessage("loginMessage", "Login successful! Redirecting...", false);
    setTimeout(() => {
      window.location.href = "my_acc.html";
    }, 800);
  } catch (err) {
    showMessage("loginMessage", "Could not reach the server. Is the backend running?");
  }
});

// ----- Register -----
document.getElementById("registerBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("registerUsername").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;

  if (!username || !email || !password || !confirmPassword) {
    showMessage("registerMessage", "Please fill in all fields.");
    return;
  }
  if (password !== confirmPassword) {
    showMessage("registerMessage", "Passwords do not match.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    const data = await res.json();

    if (!res.ok) {
      showMessage("registerMessage", data.message || "Registration failed.");
      return;
    }

    showMessage("registerMessage", "Registration successful! You can now log in.", false);
  } catch (err) {
    showMessage("registerMessage", "Could not reach the server. Is the backend running?");
  }
});
