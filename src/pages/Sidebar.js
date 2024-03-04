import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    DashboardOutlined,
    AppstoreAddOutlined,
    ExperimentOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons'; // Import the icons

const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider width={200} theme="light">
            <Menu mode="vertical" defaultSelectedKeys={['1']}>
                <Menu.Item key="statistics" icon={<DashboardOutlined />}>
                    <Link to="/statistics">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="sections" icon={<AppstoreAddOutlined />}>
                    <Link to="/sections">Sections</Link>
                </Menu.Item>
                <Menu.Item key="tests" icon={<ExperimentOutlined />}>
                    <Link to="/tests">Tests</Link>
                </Menu.Item>
                <Menu.Item key="questions" icon={<QuestionCircleOutlined />}>
                    <Link to="/questions">Questions</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
