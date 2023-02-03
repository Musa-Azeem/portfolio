const request = require('request');

module.exports = function (imageUrl) {
  const defaultUrl = "https://drive.google.com/uc?export=view&id=1BY5HC2nTQqxw26nOzB_AQ8Yv3FS_hzpc"

  // If image URL was not uploaded, use a default image
  if (!imageUrl) {
    return defaultUrl
  }

  console.log(imageUrl)

  // check image URL formatting
  if (imageUrl.startsWith('https://drive.google.com/uc?export=view&id=')) {
    // check response from url
    request(imageUrl, (error, response, body) => {
      if(!error && response.statusCode == 200){
        // Response success
        return imageUrl
      }
    })
  }

  // Failure
  return null
}