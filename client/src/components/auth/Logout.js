import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback
} from "react";
import { Context } from "../../flux/store";
import { logout } from "../../flux/actions/authActions";

const Logout = () => {
    const [hover, setHover] = useState(false);
    const { dispatch, auth, error } = useContext(Context);
    return (
      <>
        
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
          onClick={e => {
            e.preventDefault();
            logout(dispatch);
          }}
        >
          Logout
        </button>
      </>
    );
}
export default Logout;