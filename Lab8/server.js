const express = require('express');
const app = express();

app.use(express.json());

posts = [{title: "First Post", content: "This is the content of the first post.", comments: ["Great post!", "Thanks for sharing."]}, {title: "Second Post", content: "This is the content of the second post.", comments: []}];


// curl -X POST http://localhost:4000/posts -H "Content-Type: application/json" -d '{"title": "New Post", "content": "This is a new post."}'
app.post('/posts', (req, res) => {
    const post = {
        title: req.body['title'],
        content: req.body['content']
    }
    console.log("Adding this new post:", JSON.stringify(post));
    posts.push(post);
    res.status(201).send(post);
    res.end();
});

// curl -X DELETE http://localhost:4000/posts/1
app.delete('/posts/:id', (req, res) => {
    console.log("Deleting post " + req.params.id);
    posts.splice(req.params.id - 1, 1);
    res.status(204).send();
    res.end();
});


// curl -X PUT http://localhost:4000/posts/1 -H "Content-Type: application/json" -d '{"title": "Updated Post", "content": "This is the updated content."}' 
app.put('/posts/:id', (req, res) => {
    const updatedPost = {
        title: req.body['title'],
        content: req.body['content']
    }
    console.log("Updating post " + req.params.id + " to:", JSON.stringify(updatedPost));
    posts[req.params.id - 1] = updatedPost;
    res.status(200).send(updatedPost);
    res.end();
});


// curl http://localhost:4000/posts
app.get('/posts', (req, res) => {
    res.status(200).send(posts);
    res.end();
});


// curl http://localhost:4000/posts/1/comments
app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(posts[req.params.id - 1].comments);
    res.end(); 
});
// curl -X POST http://localhost:4000/posts/1/comments -H "Content-Type: application/json" -d '{"comment": "This is a new comment."}'
app.post('/posts/:id/comments', (req, res) => {
    const comment = req.body['comment'];
    console.log("Adding this new comment to post " + req.params.id + ":", comment);
    posts[req.params.id - 1].comments.push(comment);
    res.status(201).send({comment: comment});
    res.end();
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});