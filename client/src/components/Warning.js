import React from "react";
const Warning = ({ network }) => {
  return (
    <div>
      {network ? (
        <div id="warning">
          You are on the {network} network. To use this Dapp, please switch to
          Kovan network.
        </div>
      ) : null}
    </div>
  );
};

export default Warning;
