import React from "react";

const Dropdown = ({
  value,
  data,
  placeholder,
  placeholderValue,
  onChange,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div>
      <select value={value} className="form-control" onChange={handleChange}>
        <option value={placeholderValue}>{placeholder}</option>
        {data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
