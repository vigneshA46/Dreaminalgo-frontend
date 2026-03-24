import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Center, Loader, Text, Stack, ThemeIcon } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { apiRequest } from '../utils/api';

function Verifymail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('loading'); 
  // loading | success | error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await apiRequest('GET', '/api/auth/verify-email', { token });

        setStatus('success');

        notifications.show({
          title: 'Success',
          message: 'Email verified successfully',
          color: 'green',
        });

        // ⏳ Redirect after 2 sec
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);

      } catch (err) {
        setStatus('error');

        notifications.show({
          title: 'Verification failed',
          message: 'Invalid or expired token',
          color: 'red',
        });
      }
    };

    if (token) verifyEmail();
  }, [token]);

  return (
    <Center style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Stack align="center" spacing="md">

        {/* 🔄 Loading */}
        {status === 'loading' && (
          <>
            <Loader size="lg" color="teal" />
            <Text>Verifying your email...</Text>
          </>
        )}

        {/* ✅ Success */}
        {status === 'success' && (
          <>
            <ThemeIcon size={60} radius="xl" color="green">
              <IconCheck size={30} />
            </ThemeIcon>
            <Text size="lg" fw={600}>
              Email Verified Successfully 🎉
            </Text>
            <Text size="sm" c="dimmed">
              Redirecting to login...
            </Text>
          </>
        )}

        {/* ❌ Error */}
        {status === 'error' && (
          <>
            <ThemeIcon size={60} radius="xl" color="red">
              <IconX size={30} />
            </ThemeIcon>
            <Text size="lg" fw={600}>
              Verification Failed
            </Text>
            <Text size="sm" c="dimmed">
              Invalid or expired token
            </Text>
          </>
        )}

      </Stack>
    </Center>
  );
}

export default Verifymail;