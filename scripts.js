// Search for GitHub user
function searchUser() {
  const username = document.getElementById("username").value.trim();

  if (!username) {
    showError("Please enter a username");
    return;
  }

  // Show loading, hide errors
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").style.display = "none";
  document.getElementById("userInfo").style.display = "none";

  // Fetch user data from GitHub API
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        showError("User not found");
        document.getElementById("loading").style.display = "none";
        return;
      }
      displayUser(data);
      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => {
      showError("Error fetching user");
      document.getElementById("loading").style.display = "none";
    });
}

// Display user information
function displayUser(user) {
  // Set avatar
  document.getElementById("avatar").src = user.avatar_url;

  // Set name and info
  document.getElementById("name").textContent = user.name || user.login;
  document.getElementById("login").textContent = `@${user.login}`;
  document.getElementById("bio").textContent = user.bio || "No bio";

  // Set stats
  document.getElementById("repos").textContent = user.public_repos;
  document.getElementById("followers").textContent = user.followers;
  document.getElementById("following").textContent = user.following;
  document.getElementById("gists").textContent = user.public_gists;

  // Set profile links
  document.getElementById("profileLink").href = user.html_url;
  document.getElementById("reposLink").href =
    user.html_url + "?tab=repositories";

  // Show user info
  document.getElementById("userInfo").style.display = "block";
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

// Allow Enter key to search
document.getElementById("username").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchUser();
  }
});
