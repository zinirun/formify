import { Divider } from 'antd';

export default function GuideContainer({ contents }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <Divider style={{ marginBottom: '70px' }} />
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '60px 0 40px' }}>
                {contents.title}
            </p>
            <img
                src={`${contents.src}`}
                alt="Formify Guide"
                style={{
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
            />
            <p
                style={{
                    fontSize: '1.05rem',
                    color: '#999',
                    margin: '60px auto',
                    width: '600px',
                }}
            >
                {contents.content}
            </p>
        </div>
    );
}
