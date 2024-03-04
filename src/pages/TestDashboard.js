import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;

const TestDashboard = () => {
    const [tests, setTests] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTest, setCurrentTest] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch tests from your API endpoint
        axios.get('http://localhost:4000/tests').then((response) => {
            setTests(response.data);
        });
    }, []);

    const columns = [
        {
            title: 'Test Name',
            dataIndex: 'name',
        },
        {
            title: 'Test Link',
            dataIndex: 'link',
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => attendTest(record.link)}>
                        Attend
                    </Button>
                </Space>
            ),
        },
    ];

    const attendTest = (link) => {
        // Redirect the user to the test attendance page or handle attendance logic
        // You can use React Router to navigate to a different page
        window.location.href = `http://localhost:3000/attend/${link}`;
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const newTest = { name: values.name };

            // Create a new test using your API endpoint
            axios.post('http://localhost:4000/tests', newTest).then((response) => {
                setTests([...tests, response.data]);
                setIsModalVisible(false);
            });
        });
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ marginBottom: 16 }}
            >
                Add Test
            </Button>

            <Search
                placeholder="Search tests"
                onSearch={(value) => {
                    // Implement search logic here if needed
                }}
                enterButton={<SearchOutlined />}
                style={{ marginBottom: 16 }}
            />

            <Table columns={columns} dataSource={tests} rowKey="_id" />

            <Modal
                title="Add Test"
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Test Name"
                        rules={[{ required: true, message: 'Please enter the test name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TestDashboard;
