import { Progress, Space } from 'antd';
import { Switch } from 'react-darkreader';

export default function FixedPercentView({ done, isDark, toggle, status }) {
    const handleToggle = () => {
        toggle();
        document.getElementById('start-btn')?.focus();
    };
    return (
        <Space
            size={5}
            style={{
                position: 'fixed',
                zIndex: 10,
                top: '20px',
                right: '20px',
                display: 'flex',
                verticalAlign: 'baseline',
            }}
        >
            {status === 'progress' && (
                <Progress percent={done.percent} size="small" style={{ width: 100, height: 30 }} />
            )}
            <Switch checked={isDark} onChange={handleToggle} styling="github" />
        </Space>
    );
}
