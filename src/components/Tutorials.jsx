import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [opened, setOpened] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
const [currentVideo, setCurrentVideo] = useState("");

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // ✅ Fetch all tutorials
  const fetchTutorials = async () => {
    try {
      const res = await apiRequest("GET", "/api/tutorials");
      setTutorials(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);
  

  // ✅ Convert YouTube URL → embed
 const getEmbedUrl = (url) => {
  try {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } catch {
    return "";
  }
};

  return (
    <Box p="lg">
      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <Title order={3}>Tutorials</Title>
      </Group>

      {/* LIST */}
      <Grid>
        {tutorials.map((tut) => (
          <Grid.Col key={tut.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              radius="lg"
              withBorder
              p="md"
              style={{
                borderColor: "#e5e5e5",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Text fw={600}>{tut.title}</Text>

                {/* YouTube Embed */}
                <Box
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
  onClick={() => {
    setCurrentVideo(getEmbedUrl(tut.url));
    setVideoOpen(true);
  }}
  style={{
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    background: "#000",
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff"
  }}
>
  ▶ Play Video
</Box>
                </Box>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Modal
  opened={videoOpen}
  onClose={() => {
  setVideoOpen(false);
  setCurrentVideo(""); // ✅ stops playback
}}
  withCloseButton
  padding={0}
>
  <Box style={{ width: "100vw", height: "100vh", background: "black" }}>

  <iframe
    width="100%"
    height="100%"
    src={currentVideo}
    title="YouTube video player"
    allow="autoplay; encrypted-media"
    allowFullScreen
    style={{ border: "none" }}
  />
</Box>
</Modal>
    </Box>
  );
};

export default Tutorials;