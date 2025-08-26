const errorCodes = (code) => {
  let msg = 'Something went wrong'

  switch (code) {
    case 'auth/user-not-found':
      msg = 'User not found'
      break
    case 'auth/wrong-password':
      msg = 'Incorrect password'
      break
    case 'auth/email-already-in-use':
      msg = 'Email already in use'
      break
    case 'auth/invalid-credential':
      msg = 'Invalid credentials'
      break
    default:
      msg = 'An unknown error occurred'
  }

  return msg
}

export default errorCodes
