import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export default function QShowOptions(props) {
    const [options, setOptions] = useState([
        {
            key: 0,
            value: '',
        },
    ]);
    useEffect(() => {
        setOptions(props.data);
    }, [props]);
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
            props.onChange(
                props.seq,
                updated.map((opt, idx) => {
                    return { key: idx, value: opt.value };
                }),
            );
        },
        [props, options],
    );
    const removeItem = useCallback(
        (key) => {
            const updated = options.filter((opt) => opt.key !== key);
            setOptions(updated);
            props.onChange(
                props.seq,
                updated.map((opt, idx) => {
                    return { key: idx, value: opt.value };
                }),
            );
        },
        [props, options],
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
        props.onChange(
            props.seq,
            updated.map((opt, idx) => {
                return { key: idx, value: opt.value };
            }),
        );
    }, [props, options]);

    return (
        <>
            {options.map((opt) => (
                <div
                    key={`opt-${props.seq}-${opt.key}`}
                    style={{ display: 'flex', marginBottom: 8, alignItems: 'baseline' }}
                >
                    <Input
                        value={opt.value}
                        name={`opt-${props.seq}-${opt.key}`}
                        onChange={(e) => handleChange(e, opt.key)}
                        placeholder="보기를 입력하세요."
                    />
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
