import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation } from '@tanstack/react-query'

function Login() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [helpText, sethelpText] = useState<string>("")
  const { user, login } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        sethelpText(data.message);
        throw new Error(data.message || "Login failed")
      }
      return data;
    },

    onSuccess: (data) => {
      // Update zustand store
      login(data.user);
      console.log("Logged in:", data);
    },

    onError: (err) => {
      console.log("Login error:", err.message);
    }
  });

  // 2️⃣ Call mutation on submit
  const formSubmit = (e: any) => {
    e.preventDefault();
    sethelpText("");
    if (user) {
      console.log("Already logged in");
      return;
    }
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Login
        </h2>

        <div className="space-y-1">
          <Input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {helpText.length > 0 && (
            <span className="text-xs text-red-500">{helpText}</span>
          )}
        </div>

        <div className="space-y-1">
          <Input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type='submit'
          className='w-full'
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

export default Login
