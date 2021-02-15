import React from 'react';
import { Button } from 'antd';
import { SERVER_ADDR } from './config/uri.config';

function App() {
    const handleGoogleLogin = () => {
        window.location.href = `${SERVER_ADDR}/auth/google`;
    };
    return (
        <div>
            <Button type="primary" onClick={handleGoogleLogin}>
                Google Login
            </Button>
        </div>
    );
}

export default App;
