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
  $("#player2name").html($("#player_name").val());
  setTimeout(() => {
    socket.emit("join", {
      room: gameID,
      name: $("#player_name").val(),
    });
  }, 2000);
});
socket.on("onjoin", (res) => {
  if (res.canplay === false) {
    DError();
  } else {
    DGame();
    setTimeout(() => {
      res.room.players.forEach((player) => {
        if (player.id !== $("meta[name=socketid]").attr("content")) {
          $("#player1name").html(player.name);
          sePlayer = player.id;
        }
      });
    }, 1000);
  }
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
}

socket.on("connection", (id) => {
  var meta = document.createElement("meta");
  meta.name = "socketid";
  meta.content = id;
  document.head.appendChild(meta);
  me = $("meta[name=socketid]").attr("content");
});
