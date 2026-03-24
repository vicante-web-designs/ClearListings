import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from './config/supabase'
import { setUser, clearUser } from './state/slices/auth/authSlice'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleUserSession = async (session: any) => {
            if(session?.user){
                    const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                    dispatch(setUser({ user: session.user, role: profile?.role ?? 'user'}))
                } else {
                    dispatch(clearUser())
                }
        }

        //check if there's already a session when the app loads
        supabase.auth.getSession().then(async ({data: { session }}) => handleUserSession(session))

        //Listen for login/logout events
        const { data: { subscription } } = supabase.auth.onAuthStateChange( async(_event, session) => handleUserSession(session) )

        //cleanup listener when app unmounts
        return () => subscription.unsubscribe()
    }, [dispatch])
  return (
    <>
      <HomePage />
      <Analytics />
    </>
  )
}

export default App
