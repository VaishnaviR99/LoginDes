$(document).ready(() => {
  let username = "";
  let password = "";
  let accountName = "";
  let rememberMe = false;

  $(".loginForm input").on("change", function () {
    $(".loginForm p").text("");

    let input = $(this);
    let inputId = input.attr("id");
    let inputValue = input.val();

    if (inputId === "username") {
      username = inputValue;
    } else if (inputId === "password") {
      password = inputValue;
    } else if (inputId === "accountName") {
      accountName = inputValue;
    }
  });

  $("#flexCheckDefault").on("change", function () {
    rememberMe = $(this).is(":checked");
  });

  $(".loginForm").submit((e) => {
    e.preventDefault();

    const Loginuser = {
      username: username,
      password: password,
      account_name: accountName,
    };

    fetchuser(Loginuser);
    if (rememberMe) {
      document.cookie = `username=${username}`;
    }
  });
});

const fetchuser = async (Loginuser) => {
  const { username, password, account_name } = Loginuser;
  try {
    $.post("https://dev.soloboss.net/vpbx_login.php", {
      username,
      password,
      account_name,
    }).done(function (response) {
      if (response.error) {
        console.log(response);
        if (response.error.username) {
          $(".usernamehelper").text(response.error.username);
          $("#username").css("border", "red 2px solid");
        }
        if (response.error.password) {
          $(".passhelper").text(response.error.password);
          $("#password").css("border", "red 2px solid");
        }
        if (response.error.account_name) {
          $(".accounthelper").text(response.error.account_name);
          $("#accountName").css("border", "red 2px solid");
        }
        createAlert(response.error.message, "danger");
      } else {
        createAlert(response.success.message, "success");
        $(".loginForm input").css("border", "");
      }
    });
  } catch (err) {
    createAlert(err, "danger");
  }
};

function createAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", `alert-${type}`);

  const alertText = document.createTextNode(message);
  alertDiv.appendChild(alertText);

  const container = document.getElementById("alert-container");
  container.appendChild(alertDiv);

  setTimeout(() => alertDiv.remove(), 3000); // Remove after 3 seconds
}
