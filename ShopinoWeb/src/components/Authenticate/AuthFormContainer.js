import React from 'react'
import AuthPanel from './AuthPanel'

const AuthFormContainer = () => {
    const LoginContainerStyle={    
        padding:'128px 0 8%'
    }
    return (
        <div style={LoginContainerStyle}>
            <AuthPanel />
        </div>
    )
};

export default AuthFormContainer