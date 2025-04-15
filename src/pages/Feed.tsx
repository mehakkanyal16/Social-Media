
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchPosts, fetchComments, refreshAllData, User, Post } from '@/services/api';
import { getSortedFeed, getUserAvatar, getPostImage } from '@/utils/dataProcessing';
import DataCard from '@/components/ui/DataCard';
import Loader from '@/components/ui/Loader';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import { MessageSquare, Calendar, RefreshCw } from 'lucide-react';
import RefreshButton from '@/components/ui/RefreshButton';

interface FeedPost extends Post {
  user?: User;
  commentCount: number;
}

const Feed = () => {
  // State for feed auto-refresh
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Fetch users, posts, and comments with auto-refresh
  const { 
    data: users, 
    isLoading: usersLoading, 
    error: usersError
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchInterval: autoRefresh ? 10000 : false
  });

  const { 
    data: posts, 
    isLoading: postsLoading, 
    error: postsError,
    refetch: refetchPosts
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchInterval: autoRefresh ? 10000 : false
  });

  const { 
    data: comments, 
    isLoading: commentsLoading, 
    error: commentsError 
  } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
    refetchInterval: autoRefresh ? 10000 : false
  });

  // State for feed posts
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  
  // Process and update feed whenever data changes
  useEffect(() => {
    if (users && posts && comments) {
      const userMap = new Map<string, User>();
      users.forEach(user => userMap.set(user.id, user));
      
      // Create a map of comment counts per post
      const commentCountMap = new Map<string, number>();
      comments.forEach(comment => {
        const count = commentCountMap.get(comment.postId) || 0;
        commentCountMap.set(comment.postId, count + 1);
      });
      
      // Sort posts by date and add user and comment count
      const sortedPosts = getSortedFeed(posts).map(post => ({
        ...post,
        user: userMap.get(post.userId),
        commentCount: commentCountMap.get(post.id) || 0
      }));
      
      setFeedPosts(sortedPosts);
    }
  }, [users, posts, comments]);

  const isLoading = usersLoading || postsLoading || commentsLoading;
  const error = usersError || postsError || commentsError;

  const handleRefresh = async () => {
    try {
      await refreshAllData();
      refetchPosts();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };
  
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  if (isLoading && !feedPosts.length) return <Loader />;
  if (error) return <ErrorDisplay message="Failed to load feed" retry={handleRefresh} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
          <p className="text-gray-600">Latest posts from users</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={toggleAutoRefresh}
            className={`flex items-center px-3 py-2 rounded-md text-sm ${
              autoRefresh ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
          </button>
          <RefreshButton onRefresh={handleRefresh} text="Refresh Now" />
        </div>
      </div>
      
      <div className="space-y-6">
        {feedPosts.length === 0 ? (
          <DataCard title="No Posts">
            <p className="text-gray-500 text-center py-4">No posts available</p>
          </DataCard>
        ) : (
          feedPosts.map(post => (
            <DataCard key={post.id} title={post.title}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                  <div className="rounded-lg overflow-hidden aspect-video bg-gray-200">
                    <img
                      src={getPostImage(post.id)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/800x600/gray/white?text=Image+Not+Available';
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {post.user && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                            <img
                              src={getUserAvatar(post.user.id)}
                              alt={post.user.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/150x150/gray/white?text=User';
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{post.user.name}</p>
                            <p className="text-xs text-gray-500">@{post.user.username}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center text-indigo-600">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{post.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DataCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
