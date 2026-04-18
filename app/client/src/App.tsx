import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from './config/supabase'
import { setUser, clearUser } from './state/slices/auth/authSlice'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'
import type { Session } from '@supabase/supabase-js'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      let cancelled = false;
        const handleUserSession = async (session: Session | null) => {
            if(session?.user){
                    const role = session.user.app_metadata?.user_role ?? 'user'

                    if(!cancelled){
                      dispatch(setUser({ user: session.user, role }))
                    } 
                } else {
                    if(!cancelled){
                      dispatch(clearUser())
                    }
                }                
        }

        //check if there's already a session when the app loads
        supabase.auth.getSession().then(async ({data: { session }}) => handleUserSession(session))

        //Listen for login/logout events
        const { data: { subscription } } = supabase.auth.onAuthStateChange( async(_event, session) => handleUserSession(session) )

        //cleanup listener when app unmounts
        return () => {
          cancelled = true;
          subscription.unsubscribe()
        }
    }, [dispatch])

  return (
    <>
      <HomePage />
      <Analytics />
    </>
  )
}

export default App
