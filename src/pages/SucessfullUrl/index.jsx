import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SucessfullUrl = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const userId = params.get('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    const updateCredits = async () => {
      try {
        const res = await fetch('http://localhost/carApi/update-credits-session.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, user_id: userId }),
        });
        const data = await res.json();
        if (data.success) {
          console.log('Credits updated, active plan:', data.plan_id);
          navigate('/dashboard'); // yahan redirect ho jayega
        } else {
          console.error('Failed to update credits:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (sessionId && userId) {
      updateCredits();
    }
  }, [sessionId, userId, navigate]);

  return <div>Updating your subscription status...</div>;
};

export default SucessfullUrl;
