import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { supabase } from '../supabase/supabaseClient'

function SignUp() {

      const [email, setEmail] = useState<string>("")
      const [password, setPassword] = useState<string>("")  
    
      const signUp = async () => {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password
        })
        if (error) console.error(error)
        else console.log("User created:", data)
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
            <Button onClick={signUp}>Sign Up</Button>
            {/* <Button onClick={signIn}>Log In</Button> */}
        </div>
    )
}

export default SignUp
