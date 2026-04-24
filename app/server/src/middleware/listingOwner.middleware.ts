import { Request, Response, NextFunction } from 'express';
import supabase from '../config/supabase.js';

export const listingOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

// Get the agent id
  const { data: listing, error } = await supabase.from('listings').select('agent_id').eq('id', id).single()

  if(error || !listing) {
    res.status(404).json({ error: 'Listing not found'})
    return
  }

// If user is an admin, skio the ownership check
  if(req.user.role === 'admin'){
    next()
    return
  }

  if(listing.agent_id !== req.user.id){
    res.status(403).json({ error: 'You do not own this listing'})
    return
  }

  next()
}