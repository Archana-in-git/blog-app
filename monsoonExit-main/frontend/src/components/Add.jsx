import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if updating an existing blog
  const isUpdateMode = location.state !== null;

  // Separate state to hold blog ID (for update)
  const [blogId, setBlogId] = useState("");

  // Initialize form state
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  // Pre-fill form when in update mode
  useEffect(() => {
    if (isUpdateMode && location.state) {
      const { title, content, img_url, _id } = location.state;
      setInputs({ title, content, img_url });
      setBlogId(_id); // ✅ Store ID separately
    }
  }, [isUpdateMode, location.state]);

  // Handle form input changes
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (isUpdateMode && blogId) {
      // ✅ UPDATE existing blog
      axios
        .put(`http://localhost:3001/update/${blogId}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log("Update error:", err);
        });
    } else {
      // ✅ ADD new blog
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log("Add error:", err);
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
          />

          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {isUpdateMode ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
