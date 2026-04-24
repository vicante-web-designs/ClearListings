import { Request, Response, NextFunction } from 'express';

export const requireRole = (...roles: Array<'user' | 'agent' | 'admin'>) => {

  return (req: Request, res: Response, next: NextFunction): void => {

    if(!req.user){
        res.status(401).json({ error: 'Unauthorized'})
        return
    }

    if(!roles.includes(req.user.role)){
        res.status(403).json({ error: 'You do not have permission to perform this action' })
        return
    }

    next()
  }
  
}