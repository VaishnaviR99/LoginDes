$(document).ready(() => {
  let username = "";
  let password = "";
  let accountName = "";
  let rememberMe = false;

  $(".loginForm .input").on("change", function () {
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

  $("#checkbox").on("change", function () {
    rememberMe = $(this).is(":checked");
  });

  $(".loginForm").submit((e) => {
    e.preventDefault();
    console.log("submit");
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
          $("#userinputdiv").css("border-bottom", "red 2px solid");
        }
        if (response.error.password) {
          $(".passhelper").text(response.error.password);
          $("#passinputdiv").css("border-bottom", "red 2px solid");
        }
        if (response.error.account_name) {
          $(".accounthelper").text(response.error.account_name);
          $("#accinputdiv").css("border-bottom", "red 2px solid");
        }
        createAlert(response.error.message, "error");
      } else {
        createAlert(response.success.message, "success");
        $(".inputdiv").css("border-bottom", "");
      }
    });
  } catch (err) {
    createAlert(err, "error");
  }
};

function createAlert(message, type = "success") {
  $("#alert-container").addClass("show");
  $("#alert-container").text(message);
  if (type == "success") {
    $("#alert-container").css("background-color", "rgb(34,179,58)");
} else {
      $("#alert-container").css("background-color", "rgb(247, 46, 42)");
  }
  setTimeout(() => {
    $("#alert-container").removeClass("show");
  }, 3000);
}
