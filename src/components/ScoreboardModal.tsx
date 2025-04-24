import React from "react";
interface ScoreBoard {
  open: boolean;
  children: React.ReactNode;
}
const ScoreboardModal: React.FC<ScoreBoard> = (props) => {
  const { open } = props;

  return (
    <div className="scoreboard" style={{ display: open ? "block" : "none" }}>
      <div className="scoreboard-dialogue">{props.children}</div>
    </div>
  );
};

export default ScoreboardModal;
