import React from "react";

const ValidationErrors = ({ errors }) => {
  return (
    Object.keys(errors).length !== 0 && (
      <ul
        className="bg-red-100 border mt-3 border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {Object.values(errors)?.map((error, index) => (
          <li key={index}>-{error}</li>
        ))}
      </ul>
    )
  );
};

export default ValidationErrors;
