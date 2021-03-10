import { Divider, Space } from 'antd';

export default function HomeContainer({ contents }) {
    return (
        <div style={{ width: '80vw', margin: '70px auto 0px' }}>
            <Divider style={{ marginBottom: '70px' }} />
            {contents.direction === 'right' ? (
                <Space size={60} style={{ display: 'flex', width: '600px', margin: '0 auto' }}>
                    <img
                        src={`${contents.src}`}
                        alt="Formify"
                        style={{
                            borderRadius: '5px',
                            boxShadow:
                                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        }}
                    />
                    <div style={{ width: '350px' }}>
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{contents.title}</p>
                        <p style={{ fontSize: '1.05rem', color: '#999' }}>{contents.content}</p>
                    </div>
                </Space>
            ) : (
                <Space size={60} style={{ display: 'flex', width: '600px', margin: '0 auto' }}>
                    <div style={{ width: '350px' }}>
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{contents.title}</p>
                        <p style={{ fontSize: '1.05rem', color: '#999' }}>{contents.content}</p>
                    </div>
                    <img
                        src={`${contents.src}`}
                        alt="Formify"
                        style={{
                            borderRadius: '5px',
                            boxShadow:
                                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        }}
                    />
                </Space>
            )}
        </div>
    );
}
