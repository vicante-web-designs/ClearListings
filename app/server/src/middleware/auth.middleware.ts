import { Request, Response, NextFunction } from 'express'
import supabase from '../config/supabase.js'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeder = req.headers['authorization']
  const token = authHeder?.split('')[1]

// Check if there's no token
  if(!token){
    res.status(401).json({ error: 'No token provided' })
    return 
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)

// Check if there's an error or no user is returned
  if(error || !user) {
    res.status(401).json({ error: 'Invalid or expired session'})
    return 
  }

  const { data: profile } = await supabase.from('profiles').select('id, role').eq('id', user.id).single()

  if(!profile){
    res.status(401).json({ error: 'Profile not found'})
    return
  }

  req.user  = { id: profile.id, role: profile.role}

  next()
}