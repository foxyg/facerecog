import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p  onClick={()=>{ onRouteChange('signin') }} className='pa3 link dim pointer black underline f3'>Sign Out</p>
            </nav>
        )
    } else {
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={()=> onRouteChange('signin')} className='pa3 link dim pointer black underline f3'>Sign In</p>
                <p onClick={()=> onRouteChange('register')} className='pa3 link dim pointer black underline f3'>Register</p>
            </nav>
        )
    }
    
}

export default Navigation;