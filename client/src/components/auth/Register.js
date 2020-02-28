import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback
} from "react";
import { Context } from "../../flux/store";
import { clearErrors } from "../../flux/actions/errorActions";
import { register } from "../../flux/actions/authActions";
import ReCAPTCHA from "react-google-recaptcha";

const regFormInite = {
    name: "",
    email: "",
    password: ""
}
const Register = ({modalR01, setModalR01}) => {
    const { dispatch, auth, error } = useContext(Context);
    const [regForm, setRegForm] = useState(regFormInite);
    const [msg, setMsg] = useState(null);
    const ref = useRef();
    const recaptchaRef = useRef();

    const setModalR01Toggle = useCallback(() => {
      clearErrors(dispatch);
      setModalR01(i => !i);
    }, [clearErrors]);

    useEffect(() => {
      const { isAuthenticated } = auth;
      //   console.log("isAuthenticated", isAuthenticated);
      const { id } = error;
      console.log("error", error.msg.msg);
      if (error.id === "REGISTER_FAIL") {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }

      if (modalR01) {
        if (isAuthenticated) {
          setModalR01Toggle();
        } else {
          console.log("refresh")
          recaptchaRef.current.reset();
          // window.grecaptcha.reset();
        }
      }
    }, [auth, error, setModalR01Toggle, modalR01]);

    const onChangeCaptch = val => {
      console.log("val", val);
    };
    const onChange = (e) => {
        e.preventDefault();
        setRegForm({
            ...regForm,
            [e.target.id]: e.target.value
        });
    }
    const toRegister = async(e) => {

        e.preventDefault();
        const captcha = await recaptchaRef.current.getValue();
      console.log("captcha Value", captcha);
        register(regForm, captcha, dispatch);
    }
    useEffect(() => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        // console.log("ref.current", ref.current);
        if (!ref.current || ref.current.contains(event.target) || !modalR01) {
          return;
        }

        setModalR01Toggle();
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, modalR01]);
  return (
    <>
      <div
        className="modal"
        style={
          modalR01
            ? { display: "block", "backgroundColor": "rgba(0,0,0,0.4)" }
            : { display: "none", "backgroundColor": "rgba(0,0,0,0.4)" }
        }
      >
        <div className="modal-dialog">
          <div className="modal-content" ref={ref}>
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Register</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={e => {
                  e.preventDefault();
                  setModalR01Toggle();
                }}
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
              <form onSubmit={toRegister}>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={onChange}
                    value={regForm.name}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={regForm.email}
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}
                </div>
                <div className="form-group">
                  <label for="exampleInppasswordtPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={onChange}
                    value={regForm.password}
                  />
                </div>
                {/* <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div> */}
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeT29wUAAAAABnfqyODIlNLSyQgUebEHKtw7f-2"
                  // sitekey="6Lcw19wUAAAAAKlGhjZ6YvDdLEZgfp82h7L-NgPx"
                  // size="invisible"
                  className="mb-2"
                  onChange={onChangeCaptch}
                />
                <button
                  className="btn btn-primary btn-block"
                  // data-dismiss="modal"
                >
                  Sign Up
                </button>
              </form>
            </div>

            {/* <!-- Modal footer --> */}
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
