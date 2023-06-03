import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    let user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({ errors: [{ message: 'User already exists' }] })
    }
    user = await UserModel.create({ username, email, password })
    user = user.toObject()
    delete user.password
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    jwt.sign(
      req.user,
      process.env.JWTSECRET,
      { expiresIn: 36000 },
      async (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const verifyToken = async (req, res, next) => {
  return res.status(200).json({ isValid: true })
}
