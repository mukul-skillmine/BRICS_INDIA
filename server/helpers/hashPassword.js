import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  return bcrypt.hash(password, 12);
};

export default hashPassword;