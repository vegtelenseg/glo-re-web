import { useContext } from "react";
import QRCode from "react-qr-code";
import { AuthContext } from "../contexts/auth/AuthController";

export const Profile = () => {
  const { auth } = useContext(AuthContext);
  const getQRCode = () => {
    if (auth.authenticated) {
      return auth.username;
    }
    return "";
  };
  return <QRCode value={getQRCode()} />;
};
