$(function () {
  $(".loginForm .input").on("change", function () {
    $(".loginForm p").text("");
  });

  $("#login-form").submit((e) => {
    e.preventDefault();

    let element = $("#login-form");

    let action = element.attr("action");
    console.log(action);

    try {
      $.post(action, $("#login-form").serialize()).done(function (response) {
        if (response.error) {
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
  });
});

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
