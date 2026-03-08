import React, { useState } from 'react';
import { MantineProvider, Box, Container, Text, TextInput, PasswordInput, Button, Group, Avatar, Paper, Flex } from '@mantine/core';
import { IconMail, IconLock, IconBrandGoogle, IconArrowRight, IconWand, IconPencil, IconTrendingUp } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setfullname] = useState('');
  const navigation = useNavigate();

  const SIgnupHandler = async ()=>{
      if (!email.trim() || !password.trim()) {
        notifications.show({
          title: 'Missing fields',
          message: 'Please enter both email and password',
          color: 'red',
        });
        return;
      }
      try {
      // 1️⃣ Login
      const response = await apiRequest(
        'POST',
        '/api/auth/signup',
        {email, password,fullname}
      );
        console.log(response)
    
      notifications.show({
        title: 'Verify Email',
        message: 'Verification Email sent',
        color: 'green',
      });

    }catch (error) {
        notifications.show({
          title: 'Login failed',
          message: error.message,
          color: 'red',
        });
        console.error('Login failed:', error);
      }
  }

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
              onClick={()=>navigation('/')}
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
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#138496'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#17a2b8'}
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

            {/* Bottom Section - Users Info */}
           {/*  <Paper
              style={{
                marginTop: '60px',
                padding: '16px 20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Group spacing={12}>
                <Group spacing={-8}>
                  <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                    size={36}
                    radius="xl"
                    style={{ border: '2px solid white' }}
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                    size={36}
                    radius="xl"
                    style={{ border: '2px solid white' }}
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100"
                    size={36}
                    radius="xl"
                    style={{ border: '2px solid white' }}
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                    size={36}
                    radius="xl"
                    style={{ border: '2px solid white' }}
                  />
                </Group>
                <Box>
                  <Text
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#212529'
                    }}
                  >
                    Join with 20k+ Users!
                  </Text>
                  <Text
                    style={{
                      fontSize: '12px',
                      color: '#868e96'
                    }}
                  >
                    Let's see our happy customer
                  </Text>
                </Box>
              </Group>
              <Box
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}  
              >
                <IconArrowRight size={20} color="#495057" />
              </Box>
            </Paper> */}
          </Container>
        </Box>

        {/* Right Side - Hero Section */}
        {/* <Box
          style={{
            flex: '1',
            background: 'linear-gradient(135deg, #7dd3dd 0%, #a8dfe6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            position: 'relative'
          }}
        >
          <Box style={{ maxWidth: '500px', width: '100%' }}>
            
            <Text
              style={{
                fontSize: '28px',
                fontWeight: 300,
                color: 'white',
                marginBottom: '40px',
                lineHeight: '1.5'
              }}
            >
              AI Revolutionizing the way we create, render, and experience content.
            </Text>

            
            <Box
              style={{
                width: '100%',
                height: '300px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
                
                <g transform="translate(100, 80)">
                  
                  <path
                    d="M0,0 L100,0 L100,40 L60,60 L0,60 Z"
                    fill="#f5f5f5"
                    stroke="#5a5a5a"
                    strokeWidth="2"
                  />
                  <path
                    d="M100,0 L140,20 L140,80 L100,60 L100,0 Z"
                    fill="#e0e0e0"
                    stroke="#5a5a5a"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,60 L60,80 L140,80 L100,60 L60,60 Z"
                    fill="#d5d5d5"
                    stroke="#5a5a5a"
                    strokeWidth="2"
                  />
                  
                  
                  <path
                    d="M30,15 L70,15 L70,35 L50,45 L30,45 Z"
                    fill="#5a6b7a"
                  />
                  <path
                    d="M70,15 L90,25 L90,55 L70,45 L70,15 Z"
                    fill="#4a5b6a"
                  />

                  
                  <g transform="translate(60, 100)">
                    <path
                      d="M0,0 L80,0 L80,35 L50,50 L0,50 Z"
                      fill="#f5f5f5"
                      stroke="#5a5a5a"
                      strokeWidth="2"
                    />
                    <path
                      d="M80,0 L110,18 L110,68 L80,50 L80,0 Z"
                      fill="#e0e0e0"
                      stroke="#5a5a5a"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,50 L50,68 L110,68 L80,50 L50,50 Z"
                      fill="#d5d5d5"
                      stroke="#5a5a5a"
                      strokeWidth="2"
                    />
                    
                    
                    <path
                      d="M25,12 L55,12 L55,28 L40,36 L25,36 Z"
                      fill="#5a6b7a"
                    />
                    <path
                      d="M55,12 L70,20 L70,44 L55,36 L55,12 Z"
                      fill="#4a5b6a"
                    />
                  </g>
                </g>
              </svg>
            </Box>

            
            <Group spacing={12} style={{ marginBottom: '30px' }}>
              <Box
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <IconWand size={18} color="white" />
                <Text style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
                  Creating
                </Text>
              </Box>
              <Box
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconPencil size={20} color="white" />
              </Box>
              <Box
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconTrendingUp size={20} color="white" />
              </Box>
            </Group>

            
            <Text
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.6'
              }}
            >
              Create design brief with AI voice command to make awesome 3d images that suits your needs.
            </Text>
          </Box>
        </Box> */}
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