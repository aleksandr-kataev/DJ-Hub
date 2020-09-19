import React from 'react';
import { Layout } from 'antd';
import NavBar from '../NavBar/NavBar';

const Home = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout>
      <Header>
        <NavBar />
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Home;
