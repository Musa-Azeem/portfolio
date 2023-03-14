const request = require('request');

module.exports = function (imageUrl) {
  // if imageUrl is empty or invalid, replace it with default

  const defaultUrl = "https://drive.google.com/uc?export=view&id=1BY5HC2nTQqxw26nOzB_AQ8Yv3FS_hzpc"

  // If url empty, return default
  if (!imageUrl) {
    return defaultUrl
  }

  // If url is invalid, send error - TODO
  
  return imageUrl
}
//   const defaultUrl = "https://drive.google.com/uc?export=view&id=1BY5HC2nTQqxw26nOzB_AQ8Yv3FS_hzpc"

//   // If image URL was not uploaded, use a default image
//   if (!imageUrl) {
//     return defaultUrl
//   }

//   // check image URL formatting
//   if (imageUrl.startsWith('https://drive.google.com/uc?export=view&id=')) {
//     // check response from url
//     const promise = new Promise((resolve, reject) => {
//       request(imageUrl, (error, response, body) => {
//         if (!error && response.statusCode == 200) {
//           // Response success
//           console.log('s')
//           resolve(imageUrl);
//         }
//         // Response failure
//         reject(error)
//       })
//     })

//     promise.then(
//       (result) => {
//         console.log('h '+result)
//         return result
//       },
//       (error) => {
//         return null
//       }
//     )


//   }

//   // Failure
//   return null
// }