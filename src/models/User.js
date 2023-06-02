import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    max: 255,
    required: true
  },
  email: {
    type: String,
    max: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    max: 255,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  const saltRound = 10
  const password = this.password

  const salt = await bcrypt.genSalt(saltRound)
  const hash = await bcrypt.hash(password, salt)

  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const isPasswordValid = await bcrypt.compare(password, user.password)
  console.log('instance method isValidPassword ran: ' + isPasswordValid)

  return isPasswordValid
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
