import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback
} from "react";
import Register from "./Register";
import {Context} from "../../flux/store";
import { clearErrors } from "../../flux/actions/errorActions";
import { login } from "../../flux/actions/authActions";
import ReCAPTCHA from "react-google-recaptcha";

const loginFormInite = {
    email: "",
    password: ""
}


const Login = () => {
    const { dispatch, auth, error } = useContext(Context);
    const [loginForm, setLoginForm] = useState(loginFormInite);
    const [msg, setMsg] = useState(null)
    const [hover, setHover] = useState(false);
    const [modalL01, setModalL01] = useState(false);
    const [modalR01, setModalR01] = useState(false);
    const ref = useRef();
    const recaptchaRef = useRef();

    const setModalL01Toggle = useCallback(() => {
      // Clear errors
      clearErrors(dispatch);
      setModalL01(i => !i);
    }, [clearErrors]);

    useEffect(() => {
      const { isAuthenticated } = auth;
    //   console.log("isAuthenticated", isAuthenticated);
      const { id } = error;
      console.log("error", error.msg.msg);
      if (error.id === "LOGIN_FAIL") {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }

      if (modalL01) {
        if (isAuthenticated) {
          setModalL01Toggle();
        }else{
          recaptchaRef.current.reset();
          // window.grecaptcha.reset();
        }
      }
    }, [auth, error, setModalL01Toggle, modalL01]);
    
    useEffect(() => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        // console.log("ref.current", ref.current);
        if (!ref.current || ref.current.contains(event.target) || !modalL01) {
          return;
        }

        setModalL01Toggle();
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, modalL01]);
    
    
    const onChange = (e) => {
        // e.preventDefault();
        setLoginForm({
          ...loginForm,
          [e.target.id]: e.target.value
        });
    }
    const onChangeCaptch = (val) => {
      console.log("val", val)
    }
    const toLogin = async (e) => {
      e.preventDefault();
      console.log("toLogin");
      // await recaptchaRef.current.execute();
      const captcha = await recaptchaRef.current.getValue();
      console.log("captcha Value", captcha);
      
      
      login(loginForm, captcha, dispatch);
    };
  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-block"
          style={
            hover
              ? { backgroundColor: "#0d84d9", borderColor: "#0d84d9" }
              : { backgroundColor: "#66bcfa", borderColor: "#66bcfa" }
          }
          onMouseEnter={() => {
            setHover(i => !i);
          }}
          onMouseLeave={() => {
            setHover(i => !i);
          }}
          onClick={
            (e => {
              e.preventDefault();
            },
            setModalL01Toggle)
          }
        >
          Login
        </button>
      </div>
      <div
        className="modal"
        // style={{
        //   display: "block", //block
        //   position: "fixed" /* Stay in place */,
        //   "z-index": "1" /* Sit on top */,
        //   left: "0",
        //   top: "0",
        //   width: "100%" /* Full width */,
        //   height: "100%" /* Full height */,
        //   overflow: "auto" /* Enable scroll if needed */,
        //   "backgroundColor": "rgb(0,0,0)" /* Fallback color */,
        //   "backgroundColor": "rgba(0,0,0,0.4)"
        // }}
        style={
          modalL01
            ? { display: "block", "backgroundColor": "rgba(0,0,0,0.4)" }
            : { display: "none", "backgroundColor": "rgba(0,0,0,0.4)" }
        }
      >
        <div className="modal-dialog">
          <div className="modal-content" ref={ref}>
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Login</h4>
              <button
                type="button"
                className="close"
                onClick={
                  (e => {
                    e.preventDefault();
                  },
                  setModalL01Toggle)
                }
              >
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {msg ? (
                <>
                  <div className="alert alert-danger" role="alert">
                    <strong>{msg}</strong>
                  </div>
                </>
              ) : (
                <span></span>
              )}
              <form onSubmit={toLogin}>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={loginForm.email}
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small> */}
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={onChange}
                    value={loginForm.password}
                  />
                </div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeT29wUAAAAABnfqyODIlNLSyQgUebEHKtw7f-2"
                  // sitekey="6Lcw19wUAAAAAKlGhjZ6YvDdLEZgfp82h7L-NgPx"
                  // size="invisible"
                  className="mb-2"
                  onChange={onChangeCaptch}
                />
                <button
                  //   type="submit"
                  className="btn btn-primary btn-block"
                >
                  Login
                </button>
              </form>
              <div className="row">
                <div className="col d-flex justify-content-center mt-1 md-1">
                  <span className="mr-1">No account? </span>
                  <a
                    // type="button"
                    // className="align-middle"
                    // data-dismiss="modal"
                    href="#"
                    // onMouseEnter={() => this.setState({ showSomething: true })}
                    onClick={e => {
                      e.preventDefault();
                      setModalL01Toggle();
                      setModalR01(i => !i);
                    }}
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Register modalR01={modalR01} setModalR01={i => setModalR01(i)} />
    </>
  );
};
export default Login;
