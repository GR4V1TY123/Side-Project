import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'

function SignUp() {

  const navigate = useNavigate();

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [helpText, sethelpText] = useState<string>("")
  const { user, login } = useAuthStore();

  const signUpMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        sethelpText(data.message);
        throw new Error(data.message || "Login failed")
      }
      return data;
    },

    onError: (error) => {
      console.log(error.message);
    },

    onSuccess: (data) => {
      login(data);
      console.log(data);
      navigate('/')
    }
  })

  const signUp = async(e)=> {
    e.preventDefault();
    sethelpText("");
    if(user){
      console.log("Already logged in");
      return;
    }
    signUpMutation.mutate();
  }

  return (
    <form
      onSubmit={signUp}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6"
    >
      {
        (helpText.length > 0 && <span className='text-xs text-red-500'>{helpText}</span>)
      }
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name='name'
      />

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name='email'
      />

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name='password'
      />

      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>

  )
}

export default SignUp
