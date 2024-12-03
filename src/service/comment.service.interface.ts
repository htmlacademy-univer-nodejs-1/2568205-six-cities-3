import { DocumentType } from "@typegoose/typegoose";
import { CreateCommentDto } from "../dto/create_comment.dto.js";
import { CommentEntity } from "../entities/comment/comment.entity.js";

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number>
}
