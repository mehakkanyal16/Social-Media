
import { User, Post, Comment } from '@/services/api';

// Get the comment counts for all posts
export const getPostCommentCounts = (posts: Post[], comments: Comment[]): Map<string, number> => {
  const commentCounts = new Map<string, number>();
  
  // Initialize counts for all posts
  posts.forEach(post => {
    commentCounts.set(post.id, 0);
  });
  
  // Count comments for each post
  comments.forEach(comment => {
    const currentCount = commentCounts.get(comment.postId) || 0;
    commentCounts.set(comment.postId, currentCount + 1);
  });
  
  return commentCounts;
};

// Get the top users with the most commented posts
export const getTopUsers = (users: User[], posts: Post[], commentCounts: Map<string, number>, limit = 5): User[] => {
  // Create a map to track comment counts per user
  const userCommentCounts = new Map<string, number>();
  
  // Calculate comment counts for each user's posts
  posts.forEach(post => {
    const userId = post.userId;
    const commentCount = commentCounts.get(post.id) || 0;
    const currentUserCount = userCommentCounts.get(userId) || 0;
    userCommentCounts.set(userId, currentUserCount + commentCount);
  });
  
  // Sort users by comment count and get top N
  return users
    .map(user => ({
      ...user,
      commentCount: userCommentCounts.get(user.id) || 0
    }))
    .sort((a, b) => (b.commentCount as number) - (a.commentCount as number))
    .slice(0, limit);
};

// Get trending posts (posts with highest comment counts)
export const getTrendingPosts = (posts: Post[], commentCounts: Map<string, number>): Post[] => {
  // Find the maximum comment count
  let maxComments = 0;
  commentCounts.forEach(count => {
    if (count > maxComments) {
      maxComments = count;
    }
  });
  
  // Filter posts with the maximum comment count
  return posts
    .filter(post => (commentCounts.get(post.id) || 0) === maxComments)
    .map(post => ({
      ...post,
      commentCount: commentCounts.get(post.id) || 0
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Sort posts by creation date (newest first)
export const getSortedFeed = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Generate a random avatar URL for users
export const getUserAvatar = (userId: string): string => {
  // Use direct image URLs instead of unsplash API which might be unreliable
  const seed = userId.charCodeAt(0) % 5 + 1;
  return `https://i.pravatar.cc/150?img=${seed + 10}`; // Using pravatar service with fixed IDs
};

// Generate a random image URL for posts
export const getPostImage = (postId: string): string => {
  // Use direct image URLs instead of unsplash API which might be unreliable
  const seed = postId.charCodeAt(0) % 10 + 1;
  return `https://picsum.photos/seed/${seed}/800/600`; // Using picsum with fixed seeds
};
