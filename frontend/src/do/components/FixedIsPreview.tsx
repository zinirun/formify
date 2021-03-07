export default function FixedIsPreview() {
    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 10,
                top: '20px',
                left: '90px',
                textAlign: 'center',
            }}
        >
            <span
                style={{
                    color: 'white',
                    fontSize: '0.8rem',
                    padding: '3px 5px',
                    borderRadius: 5,
                    backgroundColor: '#333',
                }}
            >
                폼 미리보기
            </span>
        </div>
    );
}
