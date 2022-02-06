const defaultUrl = "http://challenge-api.luizalabs.com/api/product"

const apiConfig = {
  luizaLabs: {
    url: process.env.API_LUIZALABS || defaultUrl
  }
}

export { apiConfig }