// import User from "../models/userModel.js";

// export const registerUser = async (req, res) => {
//   try {
//     console.log("REQ BODY:", req.body);

//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const user = await User.create({ username, email, password });

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//     });

//   } catch (error) {
//     console.error("🔥 ERROR:", error);

//     if (error.name === "ValidationError") {
//       const errors = {};
//       Object.keys(error.errors).forEach((key) => {
//         errors[key] = error.errors[key].message;
//       });

//       return res.status(400).json({
//         success: false,
//         errors,
//       });
//     }

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         errors: {
//           email: "Email already exists",
//         },
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



import hashPassword from "../helpers/hashPassword.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { firstName, lastName, email,phoneNumber,country,city,state,pincode,fullAddress,password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check user already exists 

    const isPresent = await User.findOne({email});

    if(isPresent){
      return res.status(402).json({
        success:false,
        message:"User already exists "
      })
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ firstName, lastName, email,phoneNumber,country,city,state,pincode,fullAddress,password:hashedPassword });

    const newUser = user.toObject();
    delete newUser.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
  }
};
