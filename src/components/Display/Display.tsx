import { FC } from "react";

import { CurrentReportProps } from "../../types";

const Display: FC<CurrentReportProps> = ({
  requests,
  success,
  failed,
  status,
}) => {
  return (
    <div className="App_display">
      <p>
        <span>Requests:</span>
        <span>{requests}</span>
      </p>
      <p>
        <span>Success:</span>
        <span>{success}</span>
      </p>
      <p>
        <span>Failed:</span>
        <span>{failed}</span>
      </p>
      <p>
        <span>Status:</span>
        <span>{status ? "ON" : "OFF"}</span>
      </p>
    </div>
  );
};

export default Display;
