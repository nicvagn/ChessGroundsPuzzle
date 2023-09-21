import Chessground from "../components/Chessground";
import Puzzle from "../components/Puzzle";

export default function IndexPage() {
  return (
    <div style={boardsContainer}>
      <div className="box">
        <div className="main-board green merida my-2">
          <Puzzle fen={"5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27"}>
            {({ movable, fen, turnColor, lastMove, onMove }) => (
              <Chessground
                movable={movable}
                fen={fen}
                turnColor={turnColor}
                lastMove={lastMove}
                onMove={onMove}
              />
            )}
          </Puzzle>
        </div>
      </div>
    </div>
  );
}

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 40
};

// movable: {
//  free: true // all moves are valid - board editor
// }
// orientation={"black"}
