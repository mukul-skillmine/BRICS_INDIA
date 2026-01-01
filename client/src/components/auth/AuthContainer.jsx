import { useState } from "react"; import RegisterModal from "./RegisterModal"; import LoginModal from "./LoginModal";

const AuthContainer = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const closeAll = () => {
    setShowRegister(false);
    setShowLogin(false);
    onClose(); // 🔥 Header controls visibility
  };

  return (
    <>
      {showRegister && (
        <RegisterModal
          onClose={closeAll}
          openLogin={openLogin}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={closeAll}
          openRegister={openRegister}
        />
      )}
    </>
  );
};

export default AuthContainer;

