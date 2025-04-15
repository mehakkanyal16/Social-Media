
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchPosts, fetchComments, refreshAllData, User, Post } from '@/services/api';
import { getPostCommentCounts, getTrendingPosts, getUserAvatar, getPostImage } from '@/utils/dataProcessing';
import DataCard from '@/components/ui/DataCard';
import Loader from '@/components/ui/Loader';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import { TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import RefreshButton from '@/components/ui/RefreshButton';

interface TrendingPost extends Post {
  commentCount: number;
  user?: User;
}

const TrendingPosts = () => {
  // Fetch users, posts, and comments
  const { data: users, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const { data: posts, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  const { data: comments, isLoading: commentsLoading, error: commentsError, refetch: refetchComments } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments
  });

  const isLoading = usersLoading || postsLoading || commentsLoading;
  const error = usersError || postsError || commentsError;

  const retry = async () => {
    try {
      await refreshAllData();
      refetchUsers();
      refetchPosts();
      refetchComments();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  let trendingPosts: TrendingPost[] = [];
  
  if (users && posts && comments) {
    const commentCounts = getPostCommentCounts(posts, comments);
    const trending = getTrendingPosts(posts, commentCounts) as TrendingPost[];
    
    // Add user data to each post
    const userMap = new Map<string, User>();
    users.forEach(user => userMap.set(user.id, user));
    
    trendingPosts = trending.map(post => ({
      ...post,
      user: userMap.get(post.userId)
    }));
  }

  if (isLoading) return <Loader />;
  if (error) return <ErrorDisplay message="Failed to load data" retry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trending Posts</h1>
          <p className="text-gray-600">Posts with the highest number of comments</p>
        </div>
        <RefreshButton onRefresh={retry} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trendingPosts.length === 0 ? (
          <DataCard title="No Trending Posts">
            <p className="text-gray-500 text-center py-4">No trending posts available</p>
          </DataCard>
        ) : (
          trendingPosts.map(post => (
            <DataCard key={post.id} title="Trending Post" className="flex flex-col h-full">
              <div className="flex flex-col h-full">
                <div className="mb-4 relative rounded-lg overflow-hidden aspect-video">
                  <img
                    src={getPostImage(post.id)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white py-1 px-3 rounded-full flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-xs font-semibold">Trending</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {post.user && (
                      <div className="flex items-center">
                        <img
                          src={getUserAvatar(post.user.id)}
                          alt={post.user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm font-medium">@{post.user.username}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-indigo-600">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{post.commentCount}</span>
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

export default TrendingPosts;
