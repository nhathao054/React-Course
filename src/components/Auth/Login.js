import { useState } from "react";
import "./Login.scss";
import { login } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);

    //====submit api=============
    const res = await login(email, password);
    if (res && res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        Don't have an account yet?{" "}
        <button onClick={() => navigate("/register")}> Sign In</button>
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
        <span>Forgot password?</span>
        <div>
          <button disabled={isLoading} onClick={() => handleLogin()}>
            {isLoading ? <ImSpinner className="loading-icon" /> : ""}
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
