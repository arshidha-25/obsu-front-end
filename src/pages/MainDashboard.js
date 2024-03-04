// MainDashboard.js
import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SectionDashboard from './SectionDashboard';
import TestDashboard from './TestDashboard';
import Dashboard from "./Dashboard";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import StatisticsPage from "./StatisticsPage";


const { Content } = Layout;

const MainDashboard = () => {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content style={{ padding: '16px' }}>
                        <Routes>
                            <Route path="/statistics" element={<StatisticsPage />} />
                            <Route path="/sections" element={<SectionDashboard />} />
                            <Route path="/tests" element={<TestDashboard />} />
                            <Route path="/questions" element={<Dashboard />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default MainDashboard;
