import * as React from "react";

interface Props {
  progress: number;
}

const ProgressBar: React.SFC<Props> = ({ progress, ...props }) => (
  <div style={{ transform: `translate3d(${toPercent(progress)}%, 0, 0)` }} className="progress-bar" {...props} />
);

export default ProgressBar;

function toPercent(n) {
  return (-1 + n) * 100;
}
