import { Request, Response } from "express";
import { PostService } from "../services/PostService";

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
    }
  }
}
