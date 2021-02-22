import React from 'react';
import { Button } from 'antd';
import { SERVER_ADDR } from './config/uri.config';

function App() {
    const handleOAuthLogin = (authSource: string) => {
        window.location.href = `${SERVER_ADDR}/auth/${authSource}`;
    };
    return (
        <div>
            <Button type="primary" onClick={() => handleOAuthLogin('google')}>
                Google Login
            </Button>
            <Button type="primary" onClick={() => handleOAuthLogin('github')}>
                Github Login
            </Button>
        </div>
    );
}

export default App;
