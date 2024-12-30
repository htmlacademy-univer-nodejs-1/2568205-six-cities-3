import { inject } from "inversify";
import { BaseController } from "../../modules/rest/controller/base_controller.abstart.js";
import { Component } from "../component.js";
import { CommentService } from "../../service/comment.service.interface.js";
import { Logger } from "../../modules/logger/logger.interface.js";
import { StatusCodes } from "http-status-codes";
import { fillDTO } from "../../helpers/common.js";
import { HttpError } from "../../modules/rest/errors/http_error.js";
import { Request, Response } from 'express';
import { CommentRdo } from "../../rdo/comment.rdo.js";
import { OfferService } from "../../service/offer.service.interface.js";
import { CreateCommentDto } from "../../dto/create_comment.dto.js";
import { HttpMethod } from "../../modules/rest/types/http_method.enum.js";
import { ValidateDtoMiddleware } from "../../modules/rest/middleware/validate_dto.middleware.js";
import { ValidateObjectIdMiddleware } from "../../modules/rest/middleware/validate_object.middleware.js";
import { DocumentExistsMiddleware } from "../../modules/rest/middleware/document_exists.middleware.js";
import { ParseTokenMiddleware } from "../../modules/rest/middleware/parse_token_middleware.js";

export class CommentsController extends BaseController

{
  constructor(
    @inject(Component.Logger) protected readonly logger:Logger,
    @inject(Component.CommentService) private readonly commentService:CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ){
    super(logger)
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]})
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.getComments, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(offerService, 'Offer', 'offerId' )]})
  }
  public async getComments( req:Request, res: Response): Promise<void> {



    const comments = await this.commentService.findByOfferId(req.params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
  public async create(
    { body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.findById(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, userId: tokenPayload.id} );
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}

