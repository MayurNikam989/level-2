import React from "react";

export const FormField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};
