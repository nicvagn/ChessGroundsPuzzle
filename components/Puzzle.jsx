import React from "react";
import PropTypes from "prop-types";
// import { Chess } from "chess.js";
import * as ChessJS from "chess.js";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
// const Chess = require("chess.js");
//const wait = milliseconds => {
// this function returns a new promise
// return new Promise(resolve => {
// setTimeout(() => {
//  resolve();
//  }, milliseconds);
// });
//}

//example usage of wait
//wait(1000).then(() => {
// console.log("waited 1 second");
//});
// put utilities like this in "helpers.js" (i.e. promises (fetch?)

// second example fen (for testing)
//"r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19"

export default class Puzzle extends React.Component {
  static propTypes = { children: PropTypes.func };

  state = {
    // initial fen (will eventually come from props)
    fen: this.props.fen,
    movable: {},
    pendingMove: [],
    selectVisible: "",
    lastMove: [],
    turnColor: ""
  };

  componentDidMount() {
    // this.chess = new Chess(this.state.fen);
    //need to make first move as computer (gives context)
    // also, need to set orientation according to second move in puzzle
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //update fen from props here
    }
  }

  // runs on player move
  onMove = (from, to) => {
    // extracts legal moves
    const moves = this.game.moves({ verbose: true });
    // loops through each square
    for (let i = 0, len = moves.length; i < len; i++) {
      /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        this.setState({
          pendingMove: [from, to],
          selectVisible: true
        });
        return;
      }
    }

    //refactor the below code with async and promises once learned
    console.log(this.game.fen());
    this.game.move({
      from: from,
      to: to
    });
    console.log(this.game.fen());
    this.game.move({
      from: "f8",
      to: "d8"
    });

    // makes opposing move
    setTimeout(() => {
      console.log(this.game.fen());

      this.setState({
        fen: this.game.fen(),
        lastMove: [to, from]
      });
      //weirdly a log is required for this to work...
      //need to learn async/wait
      console.log(
        this.setState({
          fen: this.game.fen(),
          lastMove: [to, from]
        })
      );
      console.log("Correct!");
    }, 500);
  };

  // calcs legal moves and returns chessground compatible object
  calcMovable = () => {
    this.game = new Chess(this.state.fen);
    const dests = new Map();
    this.game.SQUARES.forEach((s) => {
      const ms = this.game.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });

    return {
      free: false,
      dests,
      color: this.turnColor() // "white"
    };
  };

  // returns color of current turn
  turnColor = () => {
    return this.game.turn() === "w" ? "white" : "black";
  };

  render() {
    const movable = this.calcMovable();

    return this.props.children({
      movable: movable,
      fen: this.state.fen,
      turnColor: movable.color,
      lastMove: this.state.lastMove,
      onMove: this.onMove
    });
  }
}
