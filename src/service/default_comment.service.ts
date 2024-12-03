import { inject } from "inversify";
import { CommentService } from "./comment.service.interface.js";
import { DocumentType, types } from "@typegoose/typegoose";
import { Component } from "../entities/component.js";
import { CommentEntity } from "../entities/comment/comment.entity.js";
import { CreateCommentDto } from "../dto/create_comment.dto.js";

export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
