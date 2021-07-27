var socket = io();
var gameID = window.location.pathname;
gameID = gameID.substr(1);
tempid = gameID.split("/");
gameID = tempid[1];
var me, sePlayer;

var Joinform = document.getElementById("join_form");
Joinform.addEventListener("submit", (e) => {
  e.preventDefault();
  $("#start").animate(
    {
      opacity: 0,
    },
    1000,
    () => {
      $("#start").css("display", "none");
      $("#loading").css("display", "flex");
      $("#loading").animate({
        opacity: 1,
      });
    }
  );
  $("#player1name").html($("#player_name").val());
  setTimeout(() => {
    socket.emit("create", {
      room: gameID,
      name: $("#player_name").val(),
    });
    DGame();
  }, 2000);
});
function DError() {
  $("#loading").animate(
    {
      opacity: 0,
    },
    1000,
    () => {
      $("#loading").css("display", "none");
      $("#error_section").css("display", "flex");
      $("#error_section").animate({
        opacity: 1,
      });
    }
  );
}
function DGame() {
  $("#loading").animate(
    {
      opacity: 0,
    },
    1000,
    () => {
      $("#loading").css("display", "none");
      $("#game").css("display", "flex");
      $("#game").animate({
        opacity: 1,
      });
    }
  );
  $("#invite-link").val(window.location.origin + "/join/" + gameID);
}
socket.on("oncreate", (res) => {
  setTimeout(() => {
    var modal = new bootstrap.Modal(document.getElementById("invite"), {
      keyboard: false,
    });
    modal.show();
  }, 2000);
});
$("#copy-invite").click((e) => {
  $("#invite-link").select();
  document.execCommand("copy");
  $("#copy-invite").html("Coppied !");
  setTimeout(() => {
    var modal = new bootstrap.Modal(document.getElementById("invite"), {
      keyboard: false,
    });
    modal.hide();
  }, 3000);
});
socket.on("onjoin", (res) => {
  setTimeout(() => {
    res.room.players.forEach((player) => {
      if (player.id !== $("meta[name=socketid]").attr("content")) {
        $("#player2name").html(player.name);
        $(".player-2").addClass("active");
        sePlayer = player.id;
      }
    });
    $(".wait-msg").css("display", "none");
    $(".tiles").addClass("active");
  }, 1000);
});

socket.on("connection", (id) => {
  var meta = document.createElement("meta");
  meta.name = "socketid";
  meta.content = id;
  document.head.appendChild(meta);
  me = $("meta[name=socketid]").attr("content");
});
