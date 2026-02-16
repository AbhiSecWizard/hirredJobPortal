import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Protectedroute = ({children}) => {
const {isSignedIn,user,isLoaded}=useUser()
// console.log(user,isSignedIn,isLoaded)
const {pathname} =  useLocation()

if( isLoaded && !isSignedIn && isSignedIn !== undefined ){
    return <Navigate to="/?sign-in=true"/>
}

// here we are adding a condition that is user is recruiter or condidate we will check that in onbaording page



if(user !== undefined &&    !user?.unsafeMetadata?.role &&  pathname !== "/onboarding"
) return <Navigate to="/onboarding"/>



  return children;
}

export default Protectedroute
