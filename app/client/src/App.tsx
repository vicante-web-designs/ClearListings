import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from './config/supabase'
import { setUser, clearUser } from './state/slices/auth/authSlice'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      let cancelled = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleUserSession = async (session: any) => {
            console.log('session:', session)
            console.log('session.user:', session?.user)
            if(session.user){
                    const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                    console.log('user id:', session.user.id)
                    console.log('profile:', profile)
                    console.log('error:', error)

                    if(!cancelled){
                      dispatch(setUser({ user: session.user, role: profile?.role ?? 'user'}))
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
