import initializeBasicAuth from 'nextjs-basic-auth'
const users = [
  { user: process.env.BASIC_AUTH_USERNAME!, password: process.env.BASIC_AUTH_PASSWORD! },
]
const basicAuthCheck = initializeBasicAuth({
  users: users
})

export default basicAuthCheck
