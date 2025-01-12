const InputForm = ({formData, setFormData, name, text, type}) => {
  return(
    <div className="form-control">
    <label className="label" htmlFor={name}>
      <span className="label-text">{text}</span>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={text}
      className="input input-bordered input-primary"
      value={formData[name] || ''}
      onChange={(e) =>
        setFormData({ ...formData, [name]: e.target.value})
      }
    />
  </div>
  )
}

export default InputForm;