import React from 'react';

const Input = ({ label, name, value, onChange, type = 'text', placeholder = '', ...props }) => {
  return (
    <div>
      {label && <label className="block text-lg font-semibold mb-3">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        {...props}
      />
    </div>
  );
};

export default Input;