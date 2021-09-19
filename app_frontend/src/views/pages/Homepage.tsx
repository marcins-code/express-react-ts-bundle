import React from 'react';
import MainTemplate from '../../templates/MainTemplate';
import BlogCard from '../../components/organisms/BlogCard/BlogCard';

const Homepage = () => (
  // @ts-ignore
  <MainTemplate>
    <BlogCard
      src="https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNvZGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80"
      title="Idque Caesaris facere voluntate liceret: sese habere."
    />
    <BlogCard
      src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80"
      title="A Complete Guide to Grid"
    />
  </MainTemplate>
);

export default Homepage;
