export const TextBox = ({label, text, placeholder, onChange}) => {
  console.log(text)
  return (
    <div className="flex flex-col">
      <label className="text-left text-base font-medium text-gray-500">
        {label}
      </label>
      <input
        type="text"
        value={text}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-md sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  )
}

