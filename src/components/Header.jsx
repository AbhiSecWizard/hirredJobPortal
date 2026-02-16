import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false)

  const { user, isLoaded, isSignedIn } = useUser()

  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true)
    }
  }, [search])

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      setShowSignIn(false)
      search.delete("sign-in")
      setSearch(search)
    }
  }

  // 🛑 Wait until Clerk loads
  if (!isLoaded) return null

  // 🎯 Safe role detection
  const role =
    user?.publicMetadata?.role ||
    user?.unsafeMetadata?.role ||
    null

  const isRecruiter = isSignedIn && role === "recruiter"

  return (
    <>
      <nav className='py-4 flex justify-between items-center w-full'>
        
        <Link to="/">
          <img src="/logo.png" alt="logo" className='h-20'/>
        </Link>

        <div className='flex gap-8 items-center'>

          <SignedOut>
            <Button
              variant='outline'
              onClick={() => {
                setShowSignIn(true)
                setSearch({ "sign-in": "true" })
              }}
            >
              Login
            </Button>
          </SignedOut>

          {/* ✅ SHOW ONLY IF RECRUITER */}
          {isRecruiter && (
            <Link to="/post-job">
              <Button variant='destructive' className="rounded-full">
                Post a Job
                <PenBox size={20}/>
              </Button>
            </Link>
          )}

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label='My Jobs'
                  labelIcon={<BriefcaseBusiness size={15}/>}
                  href='/my-jobs'
                />
                <UserButton.Link
                  label='Saved Jobs'
                  labelIcon={<Heart size={15}/>}
                  href='/saved-jobs'
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

        </div>
      </nav>

      {showSignIn && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'
          />
        </div>
      )}
    </>
  )
}

export default Header
