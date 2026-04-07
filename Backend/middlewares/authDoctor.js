import jwt from 'jsonwebtoken'

const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Not authorized: no token' })
    }

    // 🔥 فصل Bearer عن التوكن
    const token = authHeader

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token missing' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)

    // ✅ خزن id بشكل آمن
    req.doctorId=decoded.id

    next()

  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message: error.message })
  }
}

export default authDoctor