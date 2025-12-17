import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  return bcrypt.hash(password, 12);
};

export default hashPassword;

// Smtc#2025!@#N3w


//  in registartion form if we select india then show state , city , pincode , full address for indian user or other user only fulladdress

