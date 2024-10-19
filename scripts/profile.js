let currentUser = localStorage.getItem("currentUser");

if (!currentUser) location.href = "./index.html";

currentUser = JSON.parse(currentUser);

document
  .querySelector("#profile-image")
  .setAttribute(
    "src",
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      currentUser.username
    )}`
  );

document.querySelector("#email").value = currentUser.email;

const form1 = document.querySelector("#change-info-form");
form1.addEventListener("submit", (e) => {
  e.preventDefault();

  const newUsername = form1.username.value.trim();

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      ...currentUser,
      username: newUsername,
    })
  );

  const allUsers = JSON.parse(localStorage.getItem("users"));

  const user = allUsers.find((item) => item.email === currentUser.email);
  user.username = newUsername;

  localStorage.setItem("users", JSON.stringify(allUsers));

  alert("Username changed successfully");

  location.reload();
});

const form2 = document.querySelector("#change-password-form");
form2.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldPassword = form2["old-password"].value;
  const newPassword = form2["new-password"].value;
  const repeatPassword = form2["repeat-password"].value;

  if (newPassword !== repeatPassword) {
    alert("You repeated the wrong password");
    return;
  }

  if (currentUser.password !== oldPassword) {
    alert("Old password is incorrect");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      ...currentUser,
      password: newPassword,
    })
  );

  const allUsers = JSON.parse(localStorage.getItem("users"));

  const user = allUsers.find((item) => item.email === currentUser.email);
  user.password = newPassword;

  localStorage.setItem("users", JSON.stringify(allUsers));

  alert("Password changed successfully");

  location.reload();
});
