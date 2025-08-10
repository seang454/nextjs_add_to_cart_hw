
"use client"
import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div className="space-x-2">
      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => signIn("keycloak")}>SignIn</button>
    </div>
  )
}
