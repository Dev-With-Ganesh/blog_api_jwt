const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    const { title, body } = req.body;

    try {
        const newPost = new Post({
            title,
            body,
            user: req.user.id
        });
        await newPost.save();
        return res.status(201).json(newPost);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// ✅ FIXED name
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username'); // ✅ FIXED
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.user.toString() !== req.user.id)
            return res.status(403).json({ msg: 'Not authorized' });

        post.title = req.body.title || post.title;
        post.body = req.body.body || post.body;
        const updated = await post.save();
        res.json(updated);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.user.toString() !== req.user.id)
            return res.status(403).json({ msg: 'Not authorized' });

        await post.remove();
        res.json({ msg: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
