import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { UserService } from "../services/UserService";

export class PostController {
  async create(req: Request, res: Response) {
    try {
      const { user_id, desc, img } = req.body;

      if (!user_id || !desc || !img)
        return res.status(400).json({ message: "fields are missing" });

      const postService = new PostService();
      const response = await postService.create(user_id, desc, img);

      if (response.error)
        return res.status(500).json({ message: "could not create post" });

      return res.status(201).json(response.post);
    } catch (err) {
      console.log("PostController.create =>> ", err.message);
      return res.status(500).json({ message: "could not create post" });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const postService = new PostService();

      const response = await postService.findOne(id);

      if (!response.ok)
        return res.status(404).json({ message: "Post not found" });

      return res.status(200).json(response.post);
    } catch (err) {
      console.log("PostController.search =>> ", err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  }

  async postsByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const userService = new UserService();

      const userExists = await userService.exists(userId);

      if (!userExists)
        return res.status(404).json({ message: "User not found" });

      const postService = new PostService();

      const response = await postService.findByUser(userId);

      if (!response.ok)
        return res.status(500).json({ message: "could not list user posts" });

      return res.status(200).json(response.userPosts);
    } catch (err) {
      console.log("PostController.postsByUser =>> ", err.message);
      return res.status(500).json({ message: "could not list user posts" });
    }
  }

  async postByUser(req: Request, res: Response) {
    try {
      const { userId, postId } = req.params;

      const userService = new UserService();

      const userExists = await userService.exists(userId);

      if (!userExists)
        return res.status(404).json({ message: "User not found" });

      const postService = new PostService();

      const response = await postService.findOneByUser(userId, postId);

      if (!response.ok) return res.status(404).json(response.message);

      return res.status(200).json(response.post);
    } catch (err) {
      console.log("PostController.postByUser =>> ", err.message);
      return res.status(500).json({ message: "could not find post" });
    }
  }
}
