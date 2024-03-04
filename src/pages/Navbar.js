// Navbar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
    return (
        <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Menu mode="horizontal" style={{ border: 'none' }}>
                <Menu.Item key="sections">
                    <Link to="/sections">Sections</Link>
                </Menu.Item>
                <Menu.Item key="tests">
                    <Link to="/tests">Tests</Link>
                </Menu.Item>
                <Menu.Item key="questions">
                    <Link to="/questions">Questions</Link>
                </Menu.Item>
            </Menu>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>Hello, Arshidha </span>
                <Link to="/logout">Logout  &nbsp;</Link>
            </div>
        </Header>
    );
};

export default Navbar;
