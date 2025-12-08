import React, { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useAuthStore } from '@/store/useAuthStore'

function Login() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const {user, isAuthenticated, login} = useAuthStore();


  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) console.error(error)
    else {
      login({name: data.name, email: data.email});
      console.log("User signed in:", data)
    }
  }

  return (
    <div>
      <Input
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={signIn}>Login</Button>
    </div>
  )
}

export default Login
