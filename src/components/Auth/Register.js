import { useState } from "react";
import "./Register.scss";
import { register } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    const res = await register(email, password, username);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        have an account?{" "}
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
      <div className="login-title col-4 mx-auto">Haven & React</div>
      <div className="login-welcome col-4 mx-auto">Hello, who’s this?</div>
      <div className="login-content col-2 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icon-eye"
              onClick={() => {
                setIsShowPassword(false);
              }}
            >
              <VscEyeClosed />
            </span>
          ) : (
            <span
              className="icon-eye"
              onClick={() => {
                setIsShowPassword(true);
              }}
            >
              <VscEye />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <span>Forgot password?</span>
        <div>
          <button onClick={() => handleRegister()}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
