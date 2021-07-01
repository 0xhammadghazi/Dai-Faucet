import React from "react";
const Header = ({ balance }) => {
  return (
    <div>
      <p>
        <b>Contract Dai Balance: </b>
        {balance}
      </p>
      <hr />
    </div>
  );
};

export default Header;
