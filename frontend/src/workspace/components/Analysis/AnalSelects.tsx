import { Bar } from '@ant-design/charts';

export default function AnalSelects({ config }) {
    return <Bar {...config} height={30 * config.data.length + 20} />;
}
