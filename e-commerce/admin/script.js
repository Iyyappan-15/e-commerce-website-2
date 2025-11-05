// Animation toggle
const container = document.querySelector('.container');
const regbtn = document.querySelector('.register-btn');
const logbtn = document.querySelector('.login-btn');

regbtn.addEventListener('click', () => container.classList.add('active'));
logbtn.addEventListener('click', () => container.classList.remove('active'));

// login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!name || !password) return alert("Enter both username and password!");

  try {
    const res = await fetch("http://localhost:5000/api/auth/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, type: "login" })
    });

    const result = await res.json();
    if (res.ok) {
      alert("Login Successful! Redirecting...");
      localStorage.setItem("loggedInUser", name);
      window.location.href = "adminindex.html";
    } else {
      alert(result.error || "Error during login");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

// register
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!email || !password) return alert("Please enter both email and password!");

  try {
    const res = await fetch("http://localhost:5000/api/auth/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, type: "register" })
    });

    const result = await res.json();
    if (res.ok) {
      alert("Registration successful!");
      console.log(result);
      container.classList.remove('active'); // switch to login view
    } else {
      alert(result.error || "Error during registration");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
document.querySelector(".forgot-link a").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".register-btn").click();
});
