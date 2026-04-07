import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
  try {
    const authHeader =  req.headers.authorization
    if (!authHeader) return res.status(401).json({ success: false, message: 'Not authorized: no token' })

   const token = authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    if(decoded!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      req.body= decoded.id 
      return res.status(401).json({ success: false, message: 'Not authorized' })
     }
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message:error.message })
  }
}

export default authAdmin