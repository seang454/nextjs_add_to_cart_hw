
"use client"
import { signOut } from 'next-auth/react'

export default function SignOut() {
  return (
    <div className="space-x-2">
      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => signOut()}>SignOut</button>
    </div>
  )
}
