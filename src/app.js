const express = require("express");
const cors = require("cors");
const axios = require("axios");
// import these using npm i 

const app = express();
const PORT = 3000;
const baseURL = "https://jsonplaceholder.typicode.com/posts";

app.use(cors());
app.use(express.json());

// get all the data 
app.get('/api/posts', async (req, res) => {
    try{
        const response = await axios.get(baseURL);
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({error : "Failed to fetch post"});
    }
});

// get the particular id 
app.get('/api/posts/:id', async (req, res) => {
    try{
        const response = await axios.get(`${baseURL}/${req.params.id}`);
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({error : "Post not found"});
    }
});

// post - add new data by using thunder client 
app.post('/api/posts', async (req, res) => {
    try{
        const response = await axios.post(baseURL, req.body);
        res.status(200).json(response.data);
    }
    catch(error){
        res.status(500).json({error : "Failed to add post"});
    }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.put(`${baseURL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${baseURL}/${req.params.id}`);
    res.json({ message: 'Post deleted (not really, just faked)' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});