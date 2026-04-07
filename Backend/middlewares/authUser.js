import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
  
  try {
    
    
    const authHeader =  req.headers.authorization
   
    if (!authHeader) return res.status(401).json({ success: false, message: 'Not authorized: no token' })

   const token = authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user= decoded.id 
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message:error.message })
  }
}

export default authUser