const jwt = require('jsonwebtoken');

 const verifyToken = (req, res, next) => {
   const token = req.cookies.accessToken
 console.log(token)
   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorize!" })
   }

   // if token is exist then verify the token
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "Token is invalid" })
      }

      req.user = user
      next()
   })
}


 const verifyUser = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" })
      }
   })
}


 const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authorize" })
      }
   })
} 
module.exports = { verifyAdmin,verifyToken,verifyUser };