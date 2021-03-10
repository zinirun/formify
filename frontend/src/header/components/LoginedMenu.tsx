import axios from 'axios';
import { LOGOUT } from '../../config/uri.config';

export default function LoginedMenu({ user }) {
    const triggerLogout = () => {
        axios
            .post(LOGOUT)
            .then(() => (window.location.href = '/'))
            .catch(() => (window.location.href = '/'));
    };
    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
        >
            <div style={{ padding: 8, textAlign: 'center' }}>
                <span style={{ color: '#999', cursor: 'default' }}>
                    {user.provider === 'github' && 'Github'}
                    {user.provider === 'facebook' && 'Facebook'}
                    {user.provider === 'google' && 'Google'} 계정
                </span>
            </div>
            <div style={{ padding: 8, textAlign: 'center' }}>
                <a href="#logout" onClick={triggerLogout}>
                    로그아웃
                </a>
            </div>
        </div>
    );
}
