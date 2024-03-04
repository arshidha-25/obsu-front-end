// StatisticsPage.js
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card} from "antd";

const StatisticsPage = () => {
    const [questionCount, setQuestionCount] = useState(0);
    const [sectionCount, setSectionCount] = useState(0);
    const [testCount, setTestCount] = useState(0);

    useEffect(() => {
        // Fetch statistics from your API endpoints
        axios.get('http://localhost:4000/questions').then((response) => {
            setQuestionCount(response.data.length);
        });

        axios.get('http://localhost:4000/sections').then((response) => {
            setSectionCount(response.data.length);
        });

        axios.get('http://localhost:4000/tests').then((response) => {
            setTestCount(response.data.length);
        });
    }, []);
    return (
        <div>
            <h1>Statistics</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <StatisticsCard title="Questions" count={questionCount} />
                <StatisticsCard title="Sections" count={sectionCount} />
                <StatisticsCard title="Tests" count={testCount} />
            </div>
        </div>
    );
};

const StatisticsCard = ({ title, count }) => {
    return (
        <Card title={title} style={{ flex: 1, margin: '16px' }}>
            <p>Total: {count}</p>
        </Card>
    );
};

export default StatisticsPage;
