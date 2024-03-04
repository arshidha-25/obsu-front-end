import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const Dashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [form] = Form.useForm();
    const [selectedQuestionType, setSelectedQuestionType] = useState('Objective');
    const [additionalAnswers, setAdditionalAnswers] = useState([]); // Initialize as an empty array

    useEffect(() => {
        // Fetch questions from your API endpoint
        axios.get('http://localhost:4000/questions').then((response) => {
            setQuestions(response.data);
        });
    }, []);

    const addAnswerField = () => {
        // const currentAdditionalAnswers = form.getFieldValue('additionalAnswers');
        form.setFieldsValue({
            additionalAnswers: [...form.getFieldValue('additionalAnswers'), ''],
        });
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
        },
        {
            title: 'Type',
            dataIndex: 'type',
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
                        onClick={() => handleDelete(record.id)}
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
        setCurrentQuestion({});
        setIsModalVisible(true);
        form.resetFields();
        setAdditionalAnswers([]); // Reset additionalAnswers when adding a new question
    };

    const handleEdit = (question) => {
        setIsEditing(true);
        setCurrentQuestion(question);
        setIsModalVisible(true);
        form.setFieldsValue({ question: question.question });
        setSelectedQuestionType(question.type);
    };

    const handleDelete = (questionId) => {
        // Delete question using your API endpoint
        axios.delete(`http://localhost:4000/questions/${questionId}`).then(() => {
            // Update the questions state after a successful delete
            setQuestions(questions.filter((question) => question.id !== questionId));
        });
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const newQuestion = {
                question: values.question,
                type: selectedQuestionType, // Add the selected question type
            };

            if (isEditing) {
                // Edit question using your API endpoint
                axios.put(`http://localhost:4000/questions/${currentQuestion.id}`, newQuestion).then((response) => {
                    // Update the questions state after a successful edit
                    setQuestions(questions.map((question) => (question.id === response.data.id ? response.data : question)));
                });
            } else {
                // Add question using your API endpoint
                axios.post('http://localhost:4000/questions', newQuestion).then((response) => {
                    // Update the questions state after a successful add
                    setQuestions(response.data);
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
                Add Question
            </Button>
            <Table columns={columns} dataSource={questions} rowKey="id" />

            <Modal
                title={isEditing ? 'Edit Question' : 'Add Question'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="question"
                        label="Question"
                        rules={[{ required: true, message: 'Please enter the question!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Question Type"
                        rules={[{ required: true, message: 'Please select a question type!' }]}
                    >
                        <Select onChange={(value) => setSelectedQuestionType(value)}>
                            <Option value="Objective">Choose the Best Answer</Option>
                            <Option value="Multiple">Question with Multiple Answers</Option>
                            <Option value="Short">Short Question</Option>
                            <Option value="Elaborate">Elaborate Answerable Question</Option>
                        </Select>
                    </Form.Item>

                    {selectedQuestionType === 'Objective' && (
                        <div>
                            <Form.Item
                                name="bestAnswer"
                                label="Best Answer"
                                rules={[{ required: true, message: 'Please enter the best answer!' }]}
                            >
                                <Input />
                            </Form.Item>
                             You can add the fields for additional answers here
                            {form.getFieldValue('additionalAnswers') != null ?form.getFieldValue('additionalAnswers').map((answer, index) => (
                                <Form.Item
                                    name={['additionalAnswers', index]}
                                    label={`Additional Answer ${index + 1}`}
                                    rules={[{ required: true, message: 'Please enter the additional answer!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            )): (<></>)}
                            <Form.Item>
                                <Button onClick={addAnswerField}>Add Answer</Button>
                            </Form.Item>
                        </div>
                    )}

                    {selectedQuestionType === 'Multiple' && (
                        <div>
                            {/* Render UI for questions with multiple answers */}
                            {/* You can add the appropriate fields here */}
                        </div>)
                    }

                    {selectedQuestionType === 'Short' && (
                        <div>
                            <Form.Item
                                name="shortAnswer"
                                label="Short Answer"
                                rules={[{ required: true, message: 'Please enter the short answer!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>)
                    }

                    {selectedQuestionType === 'Elaborate' && (
                        <div>
                            <Form.Item
                                name="elaborateAnswer"
                                label="Elaborate Answer"
                                rules={[{ required: true, message: 'Please enter the elaborate answer!' }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </div>)
                    }
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;
