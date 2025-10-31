
const Select = ({ label, name, value, onChange, options, ...props }) => {
  return (
    <div>
      {label && <label className="block text-lg font-semibold mb-3">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;