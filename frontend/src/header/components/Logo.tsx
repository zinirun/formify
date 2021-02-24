import React from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

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
