import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Register
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await User.create({
      name,
      email,
      password:
        hashedPassword,
      role,
    });

    res.status(201).json({
      message:
        "Registered Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// Login
export const login = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(401).json({
        message:
          "Invalid Password",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET ||
          "queuecaresecret",
        {
          expiresIn: "7d",
        }
      );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// Forgot Password
export const forgotPassword =
  async (req, res) => {
    try {

      const user =
        await User.findOne({
          email:
            req.body.email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

      await user.save();

      const resetUrl =
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      await sendEmail(
        user.email,
        "QueueCare Password Reset",
        `Reset your password using this link:\n${resetUrl}`
      );

      res.json({
        message:
          "Password reset email sent",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// Reset Password
export const resetPassword =
  async (req, res) => {
    try {

      const user =
        await User.findOne({
          resetPasswordToken:
            req.params.token,
          resetPasswordExpire: {
            $gt: Date.now(),
          },
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Invalid or expired token",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        );

      user.password =
        hashedPassword;

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.json({
        message:
          "Password reset successful",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };