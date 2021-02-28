import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import { useCallback, useState } from 'react';

export default function QOptions({ seq, onChange }) {
    const [options, setOptions] = useState([
        {
            key: 0,
            value: '',
        },
    ]);
    const handleChange = useCallback(
        (e, key) => {
            const { value } = e.target;
            const updated = options.map((opt) => {
                if (opt.key === key) {
                    return {
                        ...opt,
                        value,
                    };
                } else return opt;
            });
            setOptions(updated);
            onChange(
                seq,
                updated.map((opt, idx) => {
                    return { key: idx, value: opt.value };
                }),
            );
        },
        [onChange, options, seq],
    );
    const removeItem = useCallback(
        (key) => {
            const updated = options.filter((opt) => opt.key !== key);
            setOptions(updated);
            onChange(
                seq,
                updated.map((opt, idx) => {
                    return { key: idx, value: opt.value };
                }),
            );
        },
        [onChange, options, seq],
    );
    const addItem = useCallback(() => {
        const updated = [
            ...options,
            {
                key: options[options.length - 1].key + 1,
                value: '',
            },
        ];
        setOptions(updated);
        onChange(
            seq,
            updated.map((opt, idx) => {
                return { key: idx, value: opt.value };
            }),
        );
    }, [onChange, options, seq]);

    return (
        <>
            {options.map((opt) => (
                <div
                    key={`opt-${seq}-${opt.key}`}
                    style={{ display: 'flex', marginBottom: 8, alignItems: 'baseline' }}
                >
                    <Form.Item
                        name={`opt-${seq}-${opt.key}`}
                        rules={[{ required: true, message: '보기를 입력하세요.' }]}
                        style={{ margin: 0, width: '100%' }}
                    >
                        <Input
                            autoFocus
                            name={`opt-${seq}-${opt.key}`}
                            value={opt.value}
                            onChange={(e) => handleChange(e, opt.key)}
                            placeholder="보기를 입력하세요."
                        />
                    </Form.Item>
                    {opt.key !== 0 && (
                        <div style={{ marginLeft: '10px' }}>
                            <Tooltip title="보기 삭제">
                                <MinusCircleOutlined
                                    style={{ color: 'crimson', fontSize: '1.0rem' }}
                                    onClick={() => removeItem(opt.key)}
                                />
                            </Tooltip>
                        </div>
                    )}
                </div>
            ))}
            <Form.Item>
                <Button type="dashed" onClick={() => addItem()} block icon={<PlusOutlined />}>
                    보기 추가
                </Button>
            </Form.Item>
        </>
    );
}
