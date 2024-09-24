import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { toast } from 'react-toastify';
import { XPTransactionResponse } from '../../@types/xpTransactionResponse';
import { Achievement } from '../../@types/achievement';

export const useXPTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const recordXPTransaction = async (source: string, habitId?: string, xpGained?: number, retries = 3): Promise<XPTransactionResponse | null> => {
    setIsLoading(true);

    const xpPromise = new Promise<XPTransactionResponse>((resolve, reject) => {
      const attemptTransaction = async (attemptsLeft: number) => {
        try {
          const token = getToken();
          if (!token) {
            throw new Error('No authentication token found');
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const body: any = { source };
          if (source === 'Habit_completion') {
            body.habitId = habitId;
          } else {
            body.xpGained = xpGained;
          }

          const response = await fetch(`${import.meta.env.VITE_BASE_URI}/xp/record`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('XP transaction failed:', errorData);
            throw new Error(errorData.error || 'Failed to record XP transaction');
          }

          const data = await response.json();
          resolve(data);
        } catch (error) {
          if (attemptsLeft > 0) {
            console.log(`Retrying XP transaction. Attempts left: ${attemptsLeft - 1}`);
            setTimeout(() => attemptTransaction(attemptsLeft - 1), 1000);
          } else {
            reject(error);
          }
        }
      };

      attemptTransaction(retries);
    });

    const displayAchievements = (achievements: Achievement[]) => {
      achievements.forEach((achievement, index) => {
        setTimeout(() => {
          toast.success(
            `Achievement Unlocked: ${achievement.name} (${achievement.xpReward} XP)`,
            { autoClose: 2500 }
          );
        }, index * 1000); // Delay each achievement toast by 1 second
      });
    };

    toast.promise(
      xpPromise,
      {
        pending: 'Calculating rewards...',
        success: {
          render({data}: {data: XPTransactionResponse}) {
            setTimeout(() => {
              // Display initial achievements
              displayAchievements(data.earnedAchievements);

              // Display level up toast and check for additional achievements
              if (data.newLevel) {
                const token = getToken();
                setTimeout(() => {
                  toast.info(`Congratulations! You've reached level ${data.newLevel}!`, { autoClose: 2500 });
                  
                  // Check for additional achievements triggered by level up
                  fetch(`${import.meta.env.VITE_BASE_URI}/achievements/check-level`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ level: data.newLevel }),
                  })
                    .then(response => response.json())
                    .then(newAchievements => {
                      if (newAchievements.length > 0) {
                        displayAchievements(newAchievements);
                      }
                    })
                    .catch(error => console.error('Error checking level achievements:', error));
                }, data.earnedAchievements.length * 1000 + 1000);
              }
            }, 1000);

            return `You gained ${data.xpGained} XP!`;
          },
          autoClose: 2000
        },
        error: {
          render({data}: {data: Error}) {
            return `Error: ${data.message}`;
          }
        }
      }
    );

    try {
      const result = await xpPromise;
      return result;
    } catch (error) {
      console.error('Error recording XP transaction:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { recordXPTransaction, isLoading };
};