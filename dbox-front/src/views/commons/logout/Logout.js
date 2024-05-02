import { useHistory } from "react-router-dom";
import LoginApi from "apis/login-api";
import { useDispatch } from "react-redux";
import { setUser } from "stores/session";

import { IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

console.debug("Logout.js");

export default function Logout() {
  const dispatcher = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await LoginApi.logout({});
    dispatcher(setUser(null));
    history.push(`/login`);
  };
  
  return (
    <IconButton aria-label="Logout" onClick={logout}  color="primary" >
      <ExitToAppIcon /> Logout
    </IconButton>
  );
}
