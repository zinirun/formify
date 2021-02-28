import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';

export default function QOptions({ seq, onChange }) {
    const [options, setOptions] = useState(['']);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const [_, idx] = name.split('-');
        let updated = options;
        updated[idx] = value;
        setOptions(updated);
        onChange(seq, options);
    };
    const test = (f1) => {
        console.log(f1);
    };
    return (
        <Form.List name={`opt-${seq}`}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => (
                        <div
                            key={field.key}
                            style={{ display: 'flex', marginBottom: 8, alignItems: 'baseline' }}
                        >
                            <Form.Item
                                {...field}
                                name={[field.name, 'opt']}
                                fieldKey={[field.fieldKey, 'opt']}
                                rules={[{ required: true, message: '보기를 입력하세요.' }]}
                                style={{ margin: 0, width: '100%' }}
                            >
                                <Input
                                    onChange={() => test(fields)}
                                    placeholder="보기를 입력하세요."
                                />
                            </Form.Item>
                            <div style={{ marginLeft: '10px' }}>
                                <MinusCircleOutlined
                                    style={{ color: 'crimson', fontSize: '1.0rem' }}
                                    onClick={() => remove(field.name)}
                                />
                            </div>
                        </div>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            보기 추가
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>

        // {options.map((opt, idx) => (
        //     <Input
        //         name={`${seq}-${idx}`}
        //         key={`${seq}-${idx}`}
        //         placeholder="보기를 입력하세요."
        //         value={opt}
        //         onChange={handleChange}
        //     />
        // ))}
    );
}
