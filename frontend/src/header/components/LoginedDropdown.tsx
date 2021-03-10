import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoginedMenu from './LoginedMenu';

export default function LoginedDropdown({ user }) {
    return (
        <Dropdown overlay={<LoginedMenu user={user} />}>
            <a className="ant-dropdown-link" href="/" onClick={(e) => e.preventDefault()}>
                {user.username} <DownOutlined />
            </a>
        </Dropdown>
    );
}
