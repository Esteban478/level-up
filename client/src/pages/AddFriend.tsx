import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import FullScreenLayout from '../components/layouts/FullScreenLayout';
import { useAuth } from '../hooks/auth/useAuth';
import { User } from '../@types/user';
import { debounce } from '../utils/debounce';
import UserCard from '../components/shared/UserCard';
import '../styles/AddFriend.css';

const AddFriend: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserFriends, setCurrentUserFriends] = useState<string[]>([]);
  const { user: authUser, getToken } = useAuth();

  const handleSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/search?term=${term}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const results = await response.json();
      setSearchResults(results);
    } catch (err) {
      toast.error('An error occurred while searching for users');
      console.error('Error searching users:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const fetchCurrentUserFriends = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/friends`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user friends');
        }

        const friends = await response.json();
        setCurrentUserFriends(friends.map((friend: User) => friend._id));
      } catch (err) {
        console.error('Error fetching user friends:', err);
      }
    };

    fetchCurrentUserFriends();
  }, [getToken]);

  const handleAddFriend = async (userId: string) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const currentUserId = authUser?.id;
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/friends`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          friendId: userId,
          currentUserId: currentUserId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add friend');
      }

      toast.success('Friend added successfully');
      setCurrentUserFriends(prev => [...prev, userId]);
    } catch (err) {
      toast.error('An error occurred while adding friend');
      console.error('Error adding friend:', err);
    }
  };

  return (
    <FullScreenLayout
      title="Add Friend"
      backButton
    >
      <div className="add-friend-container">
        <p className="add-friend-description">
          Search for users by email or username to add them as friends.
        </p>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter email or username"
            className="search-input"
          />
        </div>
        <div className="search-results">
          {isLoading ? (
            <p className="searching">Searching...</p>
          ) : searchTerm && searchResults.length === 0 ? (
            <p className="no-results">No users found matching your search.</p>
          ) : (
            searchResults.map(user => (
              <UserCard
                key={user._id}
                user={user}
                isFriend={currentUserFriends.includes(user._id)}
                isHorizontal={true}
                onAddFriend={handleAddFriend}
              />
            ))
          )}
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default AddFriend;