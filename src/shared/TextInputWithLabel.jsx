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
      {labelText ? <label htmlFor={elementId}>{labelText}</label> : null}
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
