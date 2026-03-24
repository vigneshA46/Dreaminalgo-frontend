import React, { useState } from 'react';
import { MantineProvider, Box, Container, Text, TextInput, PasswordInput, Button, Group, Avatar, Paper, Flex } from '@mantine/core';
import { IconMail, IconLock, IconBrandGoogle, IconArrowRight, IconWand, IconPencil, IconTrendingUp } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { apiRequest } from '../utils/api';

function Signup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [fullname, setfullname] = useState('');
  const navigation = useNavigate();

  const SignupHandler = async () => {
  if (!email.trim() || !password.trim() || !fullname.trim()) {
    notifications.show({
      title: 'Missing fields',
      message: 'Please fill all fields',
      color: 'red',
    });
    return;
  }

  try {
    setLoading(true); // 🔄 start loader

    const response = await apiRequest(
      'POST',
      '/api/auth/signup',
      { email, password, fullname }
    );

    notifications.show({
      title: 'Success',
      message: response.message || 'Verification Email sent',
      color: 'green',
    });

  } catch (error) {
    notifications.show({
      title: 'Signup failed',
      message: error.message || 'Something went wrong',
      color: 'red',
    });
  } finally {
    setLoading(false); // ✅ stop loader
  }
};
  return (
    <>
    <Box w={"100vw"} >
      <Flex align={"center"} justify={"center"}>
        {/* Left Side - Signup Form */}
        <Box
          style={{
            flex: '1',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px'
          }}
        >
          <Container size="xs" style={{ maxWidth: '420px', width: '100%' }}>
            {/* Logo/Brand */}
            <Text
              style={{
                fontSize: '20px',
                fontWeight: 400,
                color: '#495057',
                marginBottom: '40px',
                letterSpacing: '0.5px'
              }}
            >
              DreaminAlgo 
            </Text>

            {/* Welcome Text */}
            <Text
              style={{
                fontSize: '32px',
                fontWeight: 400,
                color: '#212529',
                marginBottom: '8px',
                lineHeight: '1.3'
              }}
            >
              Welcome to
            </Text>
            <Text
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#212529',
                marginBottom: '12px',
                lineHeight: '1.3'
              }}
            >
              Our Algo Trading platform
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontSize: '13px',
                color: '#868e96',
                marginBottom: '32px',
                lineHeight: '1.5'
              }}
            >
             Master the skills that move the world: Trading & Coding.
            </Text>
            {/* fullname Input */}
            <TextInput
              placeholder="Jhon Doe"
              icon={<IconMail size={18} color="#17a2b8" />}
              size="md"
              styles={{
                root: { marginBottom: '16px' },
                input: {
                  backgroundColor: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  padding: '12px 16px',
                  height: '48px'
                }
              }}
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />

            {/* Email Input */}
            <TextInput
              placeholder="hello@turpio.studio "
              icon={<IconMail size={18} color="#17a2b8" />}
              size="md"
              styles={{
                root: { marginBottom: '16px' },
                input: {
                  backgroundColor: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  padding: '12px 16px',
                  height: '48px'
                }
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <PasswordInput
              placeholder="Password"
              icon={<IconLock size={18} color="#adb5bd" />}
              size="md"
              styles={{
                root: { marginBottom: '20px' },
                input: {
                  backgroundColor: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  padding: '12px 16px',
                  height: '48px'
                },
                innerInput: {
                  fontSize: '14px'
                }
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Sign up Button */}
            <Button
  fullWidth
  size="md"
  loading={loading}   // 🔥 Mantine loader
  onClick={SignupHandler}
  style={{
    backgroundColor: '#17a2b8',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    height: '48px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: 'none',
    cursor: 'pointer',
  }}
>
  Sign up
</Button>

            {/* Divider */}
            <Text
              align="center"
              style={{
                color: '#adb5bd',
                fontSize: '13px',
                marginBottom: '20px'
              }}
            >
              or
            </Text>


            {/* Login Link */}
            <Text
              align="center"
              style={{
                fontSize: '13px',
                color: '#868e96'
              }}
            >
              Already have an account?{' '}
              <Text
                component="span"
                style={{
                  color: '#0066ff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Login
              </Text>
            </Text>

          </Container>
        </Box>
      </Flex>
      </Box>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 968px) {
          .signup-container {
            flex-direction: column;
          }
        }
      `}</style>
    
    </>
  );
}

export default Signup;