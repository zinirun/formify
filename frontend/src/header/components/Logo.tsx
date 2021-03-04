import React from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import { Switch } from 'react-darkreader';
import { Space } from 'antd';

export default function Logo() {
    return (
        <div className="formify-logo">
            <Link to="/" style={{ color: 'white' }}>
                <FormOutlined />
                <span className="formify-logo-text">Formify</span>
            </Link>
        </div>
    );
}

export function FixedLogoWithDarkSwitch({ isDark, toggle }) {
    return (
        <Space
            style={{
                position: 'fixed',
                zIndex: 10,
                top: '15px',
                left: '20px',
                display: 'flex',
            }}
        >
            <a
                href="/"
                target="_blank"
                style={{
                    fontSize: '0.8rem',
                }}
            >
                <p
                    style={{
                        margin: 0,
                        marginBottom: -3,
                        fontSize: '0.7rem',
                        color: '#bbb',
                    }}
                >
                    Powered by
                </p>
                <FormOutlined />
                <span className="formify-logo-text">Formify</span>
            </a>
            <Switch checked={isDark} onChange={toggle} styling="github" />
        </Space>
    );
}
