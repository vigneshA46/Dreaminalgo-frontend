import React from 'react'
import { MantineProvider, Box, Container, Text, Grid, Card, AspectRatio } from '@mantine/core';

const Tutorials = () => {
     const tutorials = [
    {
      id: 1,
      title: 'How to log in to your Broker account',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      id: 2,
      title: 'How to Deploy a Trading Strategy',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      id: 3,
      title: 'Angel One Broker Account Login & API key',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      id: 4,
      title: 'Zebull Broker Account Login & APP key',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      id: 5,
      title: 'Finvasia (Shoonya) Broker Account Login',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      id: 6,
      title: 'Alice Blue Broker Account Login & API key',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
  ];
  return (
          <Box style={{ backgroundColor: '#ffffffff', minHeight: '100vh', padding: '20px' }}>
        <Container size="xl" style={{ maxWidth: '1400px' }}>
          {/* Page Title */}
         <Text size='1.5rem' fw={"600"} pb={"1rem"} >Tutorials</Text>

          {/* Tutorial Grid */}
          <Grid gutter="lg">
            {tutorials.map((tutorial) => (
              <Grid.Col key={tutorial.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  shadow="sm"
                  padding="0"
                  radius="md"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Video Thumbnail */}
                  <AspectRatio ratio={16 / 9}>
                    <Box
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                      }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                        title={tutorial.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                  </AspectRatio>

                  {/* Video Title */}
                  <Box p="md">
                    <Text
                      size="md"
                      fw={500}
                      c="#212529"
                      style={{
                        lineHeight: '1.4',
                        minHeight: '44px',
                      }}
                    >
                      {tutorial.title}
                    </Text>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
  )
}

export default Tutorials