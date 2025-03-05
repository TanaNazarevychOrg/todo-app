import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Task from "./pages/Task";
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import { db, auth } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const { Header, Content, Footer } = Layout;

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (title, text, isComplete) => {
    const newTask = { title, text, completed: isComplete };
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    setTasks([...tasks, { id: docRef.id, ...newTask }]);
  };

  const updateTask = async (taskId, updatedTitle, updatedText, isComplete) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      title: updatedTitle,
      text: updatedText,
      completed: isComplete
    });
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, title: updatedTitle, text: updatedText, completed: isComplete } : task
    ));
  };

  const toggleTask = async (id) => {
    const task = tasks.find(task => task.id === id);
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      completed: !task.completed
    });
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
      <div className="logo" style={{ color: '#000', fontSize: '20px', fontWeight: 'bold', paddingLeft: '20px' }}>
          To-Do App
        </div>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <a href="/">Home</a>
          </Menu.Item>
          {!user && (
            <>
              <Menu.Item key="register">
                <a href="/register">Register</a>
              </Menu.Item>
              <Menu.Item key="login">
                <a href="/login">Login</a>
              </Menu.Item>
            </>
          )}
          {user && (
            <Menu.Item key="logout">
              <Logout />
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ minHeight: '80vh' }}>
          <Col span={12}>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={user ? <Home tasks={tasks} addTask={addTask} /> : <Navigate to="/login" />} />
                <Route path="/task/:id" element={user ? <Task tasks={tasks} addTask={addTask} updateTask={updateTask} toggleTask={toggleTask} deleteTask={deleteTask} /> : <Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>To-Do app ©2025 Created by Tanya Nazarevych</Footer>
    </Layout>
  );
}

export default App;
