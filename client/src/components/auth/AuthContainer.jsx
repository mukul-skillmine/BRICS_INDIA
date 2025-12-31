import { useState } from "react"; import RegisterModal from "./RegisterModal"; import LoginModal from "./LoginModal";

const AuthContainer = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const closeAll = () => {
    setShowRegister(false);
    setShowLogin(false);
    onClose(); // 🔥 THIS closes Header openAuth
  };

  return (
    <>
      {showRegister && (
        <RegisterModal
          setShowModal={setShowRegister}
          setShowLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={closeAll}
        />
      )}

      {showLogin && (
        <LoginModal
          setShowLogin={setShowLogin}
          setShowRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onClose={closeAll}
        />
      )}
    </>
  );
};

export default AuthContainer;
