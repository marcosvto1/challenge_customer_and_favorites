const authConfig = {
  secret: process.env.APP_SECRET ||  "",
  tokenExpiryTime: 300
}

export { authConfig }