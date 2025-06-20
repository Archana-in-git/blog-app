import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Fetch blog data on mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // DELETE handler
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setBlogs((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // ✅ UPDATE handler: send blog data to Add.jsx
  const handleUpdate = (blog) => {
    navigate("/add", { state: blog }); // Pass blog object via router state
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {blog.content}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {blog.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(blog._id)}
                >
                  DELETE
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUpdate(blog)} // ✅ Pass full blog
                >
                  UPDATE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
