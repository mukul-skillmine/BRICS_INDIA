import Otp from "../models/otpModel.js";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import { sendEmail } from "../helpers/mail.js";
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const otp = uuidv4().replace(/\D/g, "").substring(0, 6);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    let user = await Otp.findOne({ email });
    if (!user) {
      user = await Otp.create({ email, otp, otpExpires });
    } else {
      await Otp.findOneAndUpdate(
        { email },
        { otp, otpExpires, isVerified: false },
        { new: true }
      );
    }
    await sendEmail({ to: email, otp });
    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await Otp.findOne({ email });
    if (!user)
      return res.status(400).json({ sucess: false, message: "User not found" });
    if (user.otp !== otp)
      return res.status(400).json({ sucess: false, message: "Invalid OTP" });
    if (user.otpExpires < new Date())
      return res.status(400).json({ sucess: false, message: "OTP expired" });
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
