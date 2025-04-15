
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchPosts, fetchComments, refreshAllData, User } from '@/services/api';
import { getPostCommentCounts, getTopUsers, getUserAvatar } from '@/utils/dataProcessing';
import DataCard from '@/components/ui/DataCard';
import Loader from '@/components/ui/Loader';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import { User as UserIcon, MessageSquare } from 'lucide-react';
import RefreshButton from '@/components/ui/RefreshButton';

interface UserWithCommentCount extends User {
  commentCount: number;
}

const TopUsers = () => {
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

  let topUsers: UserWithCommentCount[] = [];

  if (users && posts && comments) {
    const commentCounts = getPostCommentCounts(posts, comments);
    topUsers = getTopUsers(users, posts, commentCounts) as UserWithCommentCount[];
  }

  if (isLoading) return <Loader />;
  if (error) return <ErrorDisplay message="Failed to load data" retry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Top Users</h1>
          <p className="text-gray-600">The top 5 users with the most commented posts</p>
        </div>
        <RefreshButton onRefresh={retry} />
      </div>
      
      <DataCard title="Most Engaged Users">
        <div className="space-y-4">
          {topUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No user data available</p>
          ) : (
            topUsers.map((user, index) => (
              <div key={user.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 mr-4">
                  <div className="relative">
                    <img
                      src={getUserAvatar(user.id)}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                </div>
                <div className="flex items-center text-indigo-600">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{user.commentCount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </DataCard>
    </div>
  );
};

export default TopUsers;
