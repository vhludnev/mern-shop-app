import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    AUth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //res.send({ email, password })

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user
    res.json({ _id, name, email, isAdmin, token: null })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})

export { authUser }
