let b1 = 0,
  b2 = 0,
  b3 = 0,
  b4 = 0,
  b5 = 0,
  b6 = 0,
  b7 = 0,
  b8 = 0,
  b9 = 0;
var canI = true;
$(".block").click((e) => {
  var target = e.currentTarget;
  if (canI === true) {
    socket.emit("game", {
      room: gameID,
      move: target.id,
      by: me,
    });
  }
});
socket.on("game", (res) => {
  if (GetVar(res.move) == 0) {
    if (res.by === me) {
      canI = false;
      Player1Block("#" + res.move);
      UpdateVars(res.move, 1);
    } else {
      canI = true;
      Player2Block("#" + res.move);
      UpdateVars(res.move, 2);
    }
  }
  var Won = IsWon();
  if (Won.game_end === true) {
    if (Won.winner === 1) {
      WinnerModal($("#player1name").html());
    } else {
      WinnerModal($("#player2name").html());
    }
  }
});

function GetVar(varName, val) {
  if (varName === "b1") {
    return b1;
  }
  if (varName === "b2") {
    return b2;
  }
  if (varName === "b3") {
    return b3;
  }
  if (varName === "b4") {
    return b4;
  }
  if (varName === "b5") {
    return b5;
  }
  if (varName === "b6") {
    return b6;
  }
  if (varName === "b7") {
    return b7;
  }
  if (varName === "b8") {
    return b8;
  }
  if (varName === "b9") {
    return b9;
  }
}
function Player1Block(blockID) {
  $(blockID + " .p1").addClass("active");
}
function Player2Block(blockID) {
  $(blockID + " .p2").addClass("active");
}

function UpdateVars(varName, val) {
  if (varName === "b1") {
    b1 = val;
  }
  if (varName === "b2") {
    b2 = val;
  }
  if (varName === "b3") {
    b3 = val;
  }
  if (varName === "b4") {
    b4 = val;
  }
  if (varName === "b5") {
    b5 = val;
  }
  if (varName === "b6") {
    b6 = val;
  }
  if (varName === "b7") {
    b7 = val;
  }
  if (varName === "b8") {
    b8 = val;
  }
  if (varName === "b9") {
    b9 = val;
  }
}

function IsWon() {
  if (b1 === 1 && b2 === 1 && b3 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }
  if (b4 === 1 && b5 === 1 && b6 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }
  if (b7 === 1 && b8 === 1 && b9 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }

  if (b1 === 1 && b4 === 1 && b7 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }
  if (b2 === 1 && b5 === 1 && b8 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }
  if (b3 === 1 && b6 === 1 && b9 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }

  if (b1 === 1 && b5 === 1 && b9 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }
  if (b3 === 1 && b5 === 1 && b7 === 1) {
    return {
      game_end: true,
      winner: 1,
    };
  }
  if (b1 === 2 && b2 === 2 && b3 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }
  if (b4 === 2 && b5 === 2 && b6 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }
  if (b7 === 2 && b8 === 2 && b9 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }

  if (b1 === 2 && b4 === 2 && b7 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }
  if (b2 === 2 && b5 === 2 && b8 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }
  if (b3 === 2 && b6 === 2 && b9 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }

  if (b1 === 2 && b5 === 2 && b9 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }
  if (b3 === 2 && b5 === 2 && b7 === 2) {
    return {
      game_end: true,
      winner: 2,
    };
  }
  if (
    b1 > 0 &&
    b2 > 0 &&
    b3 > 0 &&
    b4 > 0 &&
    b5 > 0 &&
    b6 > 0 &&
    b7 > 0 &&
    b8 > 0 &&
    b9 > 0
  ) {
    var modal = new bootstrap.Modal(document.getElementById("draw"), {
      keyboard: false,
    });
    modal.show();
    return {
      game_end: false,
      winner: null,
    };
  }
  return {
    game_end: false,
    winner: null,
  };
}
function SetDefault() {}
function WinnerModal(winner) {
  var modal = new bootstrap.Modal(document.getElementById("won"), {
    keyboard: false,
  });
  $("#winner_title").html(winner + " won the match 😎");
  modal.show();
  var anim = document.getElementById("won_animation");
  setTimeout(() => {
    anim.play();
  }, 500);
}
