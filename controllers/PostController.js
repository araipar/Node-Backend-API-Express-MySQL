import Post from "../models/PostModel.js";
import db from "../config/Database.js";

export const getPosts = async (req, res) => {
    try {
        const response = await Post.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsWithUserName = async (req, res) => {
    var v_query = "SELECT  posts.post, posts.likes, users.name, posts.\"createdAt\", posts.\"updatedAt\" FROM posts left join users on posts.user_id = users.id"

    if (req.body.email != undefined) {
        if (v_query.includes('WHERE')) {
            v_query = v_query + " AND users.email = '" + req.body.email + "'"
        } else {
            v_query = v_query + " WHERE users.email = '" + req.body.email + "'"
        }

    }
    if (req.body.name != undefined) {
        if (v_query.includes('WHERE')) {
            v_query = v_query + " AND users.name = '" + req.body.name + "'"
        } else {
            v_query = v_query + " WHERE users.name = '" + req.body.name + "'"
        }
    }
    if (req.body.SortBy != undefined) {
        v_query = v_query + " ORDER BY " + req.body.SortBy.field + " " + req.body.SortBy.order
    }
    console.log(v_query);
    try {
        const response = await db.query(v_query, { raw: false });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = async (req, res) => {
    try {
        await Post.create(req.body);
        res.status(201).json({ msg: "Post Created" });
    } catch (error) {
        console.log(error.message);
    }
}
