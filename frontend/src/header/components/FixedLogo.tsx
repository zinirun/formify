import React from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

export default function FixedLogo() {
    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 10,
                top: '15px',
                left: '20px',
            }}
        >
            <Link
                to="/"
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
            </Link>
        </div>
    );
}
