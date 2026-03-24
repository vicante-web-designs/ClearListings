import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from './config/supabase'
import { setUser, clearUser, setLoading } from './state/slices/auth/authSlice'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        //check if there's already a session when the app loads
        supabase.auth.getSession().then(async ({data: { session }}) => {
            if(session?.user){
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()

                dispatch(setUser({ user: session.user, role: profile?.role ?? 'user'}))
            } else {
                dispatch(clearUser())
            }
        })

        //Listen for login/logout events
        const { data: { subscription } } = supabase.auth.onAuthStateChange( async(event, session) => {
            if(session?.user){
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()

                dispatch(setUser( { user: session.user, role: profile?.role ?? 'user'}))
            } else {
                dispatch(clearUser())
            }
        })

        //cleanup listener when app unmounts
        return () => subscription.unsubscribe()
    }, [dispatch])
  return (
    <>
      <HomePage />
      < Analytics />
    </>
  )
}

export default App
