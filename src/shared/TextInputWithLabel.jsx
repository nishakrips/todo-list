function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  type = "text",
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type={type}
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default TextInputWithLabel
