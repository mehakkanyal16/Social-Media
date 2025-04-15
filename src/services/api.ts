
/**
 * API service for fetching data from the social media platform
 * Using mock data since the API server isn't available
 */

// API Types
export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}

// Mock data for development and testing
const MOCK_USERS: User[] = [
  { id: "u1", username: "johndoe", name: "John Doe" },
  { id: "u2", username: "janedoe", name: "Jane Doe" },
  { id: "u3", username: "mikebrown", name: "Mike Brown" },
  { id: "u4", username: "emmasmith", name: "Emma Smith" },
  { id: "u5", username: "alexjones", name: "Alex Jones" },
  { id: "u6", username: "saralee", name: "Sara Lee" },
  { id: "u7", username: "tomwilson", name: "Tom Wilson" }
];

const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    userId: "u1",
    title: "First Post",
    content: "This is my first post on the platform. I'm excited to share my thoughts!",
    createdAt: "2023-04-10T10:30:00Z"
  },
  {
    id: "p2",
    userId: "u2",
    title: "Hello Everyone",
    content: "Hello to all my followers! Looking forward to connecting with all of you.",
    createdAt: "2023-04-11T08:15:00Z"
  },
  {
    id: "p3",
    userId: "u3",
    title: "Tech Updates",
    content: "Here are the latest updates in the tech world that everyone should know about.",
    createdAt: "2023-04-12T14:45:00Z"
  },
  {
    id: "p4",
    userId: "u1",
    title: "My Second Post",
    content: "Thanks for all the likes on my first post. Here's another one with more thoughts!",
    createdAt: "2023-04-13T16:20:00Z"
  },
  {
    id: "p5",
    userId: "u4",
    title: "Travel Diary",
    content: "Just got back from an amazing trip to the mountains. The views were breathtaking!",
    createdAt: "2023-04-14T09:10:00Z"
  },
  {
    id: "p6",
    userId: "u5",
    title: "Food Recipe",
    content: "Here's my secret recipe for the perfect chocolate cake that everyone has been asking for.",
    createdAt: "2023-04-15T11:05:00Z"
  },
  {
    id: "p7",
    userId: "u2",
    title: "Fitness Tips",
    content: "Starting your fitness journey? Here are some tips that helped me stay consistent.",
    createdAt: "2023-04-16T07:30:00Z"
  }
];

const MOCK_COMMENTS: Comment[] = [
  { id: "c1", postId: "p1", userId: "u2", content: "Great first post!", createdAt: "2023-04-10T11:00:00Z" },
  { id: "c2", postId: "p1", userId: "u3", content: "Welcome to the platform!", createdAt: "2023-04-10T11:30:00Z" },
  { id: "c3", postId: "p1", userId: "u4", content: "Looking forward to more!", createdAt: "2023-04-10T12:15:00Z" },
  { id: "c4", postId: "p2", userId: "u1", content: "Hello Jane!", createdAt: "2023-04-11T09:00:00Z" },
  { id: "c5", postId: "p2", userId: "u5", content: "Nice to meet you!", createdAt: "2023-04-11T10:30:00Z" },
  { id: "c6", postId: "p3", userId: "u1", content: "Informative post!", createdAt: "2023-04-12T15:30:00Z" },
  { id: "c7", postId: "p3", userId: "u2", content: "Thanks for sharing.", createdAt: "2023-04-12T16:45:00Z" },
  { id: "c8", postId: "p3", userId: "u4", content: "I learned something new!", createdAt: "2023-04-12T17:20:00Z" },
  { id: "c9", postId: "p3", userId: "u6", content: "Great insights!", createdAt: "2023-04-12T18:10:00Z" },
  { id: "c10", postId: "p4", userId: "u3", content: "Keep them coming!", createdAt: "2023-04-13T17:00:00Z" },
  { id: "c11", postId: "p4", userId: "u5", content: "Interesting perspective.", createdAt: "2023-04-13T18:30:00Z" },
  { id: "c12", postId: "p5", userId: "u1", content: "Wow, looks amazing!", createdAt: "2023-04-14T10:00:00Z" },
  { id: "c13", postId: "p5", userId: "u2", content: "Which mountains did you visit?", createdAt: "2023-04-14T11:15:00Z" },
  { id: "c14", postId: "p6", userId: "u4", content: "Will try this recipe this weekend!", createdAt: "2023-04-15T12:00:00Z" },
  { id: "c15", postId: "p7", userId: "u1", content: "These tips are helpful!", createdAt: "2023-04-16T08:45:00Z" },
  { id: "c16", postId: "p7", userId: "u3", content: "Just what I needed to hear!", createdAt: "2023-04-16T09:30:00Z" },
  { id: "c17", postId: "p7", userId: "u5", content: "Started my journey last week!", createdAt: "2023-04-16T10:15:00Z" }
];

// Cache timestamps to track data freshness - simulating real API behavior
let lastUsersFetch = 0;
let lastPostsFetch = 0;
let lastCommentsFetch = 0;

// Cache max age in milliseconds (30 seconds)
const CACHE_MAX_AGE = 30000;

// Helper function to check if cache is valid
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_MAX_AGE;
};

// Simulate network delay for more realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch users with mock data
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate network delay
  await delay(500);
  
  // Update cache timestamp
  lastUsersFetch = Date.now();
  return [...MOCK_USERS];
};

// Fetch posts with mock data
export const fetchPosts = async (): Promise<Post[]> => {
  // Simulate network delay
  await delay(700);
  
  // Update cache timestamp
  lastPostsFetch = Date.now();
  return [...MOCK_POSTS];
};

// Fetch comments with mock data
export const fetchComments = async (): Promise<Comment[]> => {
  // Simulate network delay
  await delay(600);
  
  // Update cache timestamp
  lastCommentsFetch = Date.now();
  return [...MOCK_COMMENTS];
};

// Force refresh all data (used when manual refresh is triggered)
export const refreshAllData = async (): Promise<void> => {
  // Reset timestamps to force fresh fetches
  lastUsersFetch = 0;
  lastPostsFetch = 0;
  lastCommentsFetch = 0;
  
  // Simulate fetching all data in parallel
  await Promise.all([
    delay(500), // users
    delay(700), // posts
    delay(600)  // comments
  ]);
};
