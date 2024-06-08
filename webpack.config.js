"devServer": {
  "historyApiFallback": true,
  "proxy": {
    "/api": {
      "target" : "https://servidortfg.azurewebsites.net",
      "secure": false
    }
  }
}
