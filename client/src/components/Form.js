import React from "react";
const Form = ({ handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} id="form">
        <h4>Max 5 Dai/Transaction</h4>
        <label>
          Address:{" "}
          <input
            type="text"
            id="address"
            required="required"
            placeholder="Enter receiving address"
          />
        </label>
        <br />
        <label>
          Amount:{" "}
          <input
            type="text"
            id="amount"
            required="required"
            placeholder="Enter amount to transfer"
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
