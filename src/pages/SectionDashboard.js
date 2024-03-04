import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const SectionDashboard = () => {
    const [sections, setSections] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSection, setCurrentSection] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch sections from your API endpoint
        axios.get('http://localhost:4000/sections').then((response) => {
            setSections(response.data);
        });
    }, []);

    const columns = [
        {
            title: 'Section Name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record._id)}
                        type="danger"
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setIsEditing(false);
        setCurrentSection({});
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleEdit = (section) => {
        setIsEditing(true);
        setCurrentSection(section);
        setIsModalVisible(true);
        form.setFieldsValue({ name: section.name });
    };

    const handleDelete = (sectionId) => {
        // Delete section using your API endpoint
        axios.delete(`http://localhost:4000/sections/${sectionId}`).then(() => {
            // Update the sections state after a successful delete
            setSections(sections.filter((section) => section._id !== sectionId));
        });
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const newSection = { name: values.name };

            if (isEditing) {
                // Edit section using your API endpoint
                axios.put(`http://localhost:4000/sections/${currentSection._id}`, newSection).then((response) => {
                    // Update the sections state after a successful edit
                    setSections(sections.map((section) => (section._id === response.data._id ? response.data : section)));
                });
            } else {
                // Add section using your API endpoint
                axios.post('http://localhost:4000/sections', newSection).then((response) => {
                    // Update the sections state after a successful add
                    setSections(response.data);
                });
            }

            setIsModalVisible(false);
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
                Add Section
            </Button>
            <Table columns={columns} dataSource={sections} rowKey="_id" />

            <Modal
                title={isEditing ? 'Edit Section' : 'Add Section'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Section Name"
                        rules={[{ required: true, message: 'Please enter the section name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SectionDashboard;
