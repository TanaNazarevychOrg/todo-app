
import React, { useEffect } from 'react';
import { Row, Col } from "antd";
import TaskList from "../components/TaskList";

function Home({ tasks, addTask }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed - b.completed; 
  });

  useEffect(() => {
    console.log("Tasks received in Home.js:", tasks);
  }, [tasks]);

  return (
    <div>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <h1 style={{ textAlign: 'center' }}>Tasks</h1>
          <TaskList tasks={sortedTasks} />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
