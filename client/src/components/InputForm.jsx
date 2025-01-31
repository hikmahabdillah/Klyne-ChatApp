import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const ShowPasswordBtn = ({showPassword, setShowPassword}) => {
  return (
    <button
      className="absolute right-3 top-[70%] -translate-y-1/2"
      onClick={() => setShowPassword(!showPassword)}
      type="button"
    >
      {showPassword ? <EyeOff/> : <Eye/> }
    </button>
  )
}

const InputForm = ({formData, setFormData, name, text, type}) => {
  const [showPassword, setShowPassword] = useState(false);

  return(
    <div className="form-control relative">
    <label className="label" htmlFor={name}>
      <span className="label-text">{text}</span>
    </label>
    <input
      id={name}
      name={name}
      type={type == 'password' ? (showPassword ? "text" : "password") : type}
      placeholder={text}
      className={`input input-primary ${name == 'customId' && "border-2"}`}
      value={formData[name] || ''}
      onChange={(e) =>
        setFormData({ ...formData, [name]: e.target.value})
      }
    />
    {type == "password" && <ShowPasswordBtn showPassword={showPassword} setShowPassword={setShowPassword} /> }
  </div>
  )
}

export default InputForm;