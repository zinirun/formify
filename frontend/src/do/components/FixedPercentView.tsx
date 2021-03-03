import { Progress } from 'antd';

export default function FixedPercentView({ done }) {
    return (
        <div
            style={{
                width: 100,
                position: 'fixed',
                zIndex: 10,
                top: '20px',
                right: '20px',
            }}
        >
            <Progress percent={done.percent} size="small" />
        </div>
    );
}
