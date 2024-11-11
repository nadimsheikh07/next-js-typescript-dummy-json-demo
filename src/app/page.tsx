"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { Post, User } from "@/types/types";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
`;

export default function Home() {
  
  const [posts, setPosts] = useState<(Post & User)[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get the first 10 posts
        const postResponse = await axios.get("https://dummyjson.com/posts");
        const topPosts: Post[] = postResponse.data.posts.slice(0, 10);

        // Fetch user data for each post
        const postsWithUserNames = await Promise.all(
          topPosts.map(async (post) => {
            const userResponse = await axios.get(
              `https://dummyjson.com/users/${post.userId}`
            );
            const user: User = userResponse.data;
            return { ...post, ...user };
          })
        );

        setPosts(postsWithUserNames);
      } catch (error) {
        console.error("Error fetching posts or users:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>By: {post.firstName} {post.lastName}</p>
        </PostCard>
      ))}
    </Container>
  );
}
