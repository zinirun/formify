import { Spin } from 'antd';

export default function LoadingSpin(props) {
    return (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin tip={props.tip ? props.tip : null} />
        </div>
    );
}
