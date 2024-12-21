import { Container } from "inversify";
import { CommentService } from "../../service/comment.service.interface.js";
import { DefaultCommentService } from "../../service/default_comment.service.js";
import { types } from "@typegoose/typegoose";
import { Component } from "../component.js";
import { CommentEntity, CommentModel } from "./comment.entity.js";
import { Controller } from "../../modules/rest/controller/controller.interface.js";
import { CommentsController } from "./comment.controller.js";

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);
    commentContainer.bind<Controller>(Component.CommentsController).to(CommentsController).inSingletonScope()

  return commentContainer;
}
