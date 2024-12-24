import PropTypes from 'prop-types';

function InputField({ id, label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default InputField;
