// const express = require('express');
import express from 'express';
const app = express();
const port = 4000;
app.use(express.json())
const videos = [
    {
      id: 1,
      title: "An apple mobile which is nothing like apple",
      duration: "12:05",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    },
    {
      id: 2,
      title: "Samsung Universe 9",
      duration: "10:25",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
    },
    {
      id: 3,
      title: "Samsung Galaxy Book",
      duration: "06:51",
      thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg"
    }
  ];
  
//C1:
app.get('/videos', (req, res) => {
    res.json(videos);
  });

// C2:
app.get('/videos', (req, res) => {
    const videos = VideosList();
    const searchTerm = req.query.search;
    if (searchTerm) {
      const foundVideo = videos.find(video => video.title.toLowerCase() === searchTerm.toLowerCase());
      if (foundVideo) {
        res.json(foundVideo);
      } else {
        res.status(404).json({ message: 'Video not found' });
      }
    } else {
      res.status(400).json({ message: 'Search term is missing' });
    }
  });
  
// C3:
  app.get('/videos/:id', (req, res) => {
    const videoId = parseInt(req.params.id);
    const foundVideo = videos.find(video => video.id === videoId);
    if (foundVideo) {
      res.json(foundVideo);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  });
  
// C4:
  app.post('/videos', (req, res) => {
    const newData = req.body;
    videos.push(newData);
    res.json(videos);
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });