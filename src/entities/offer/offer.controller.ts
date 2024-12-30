import { inject } from "inversify";
import { BaseController } from "../../modules/rest/controller/base_controller.abstart.js";
import { OfferService } from "../../service/offer.service.interface.js";
import { Component } from "../component.js";
import { Logger } from "../../modules/logger/logger.interface.js";
import { HttpMethod } from "../../modules/rest/types/http_method.enum.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { fillDTO } from "../../helpers/common.js";
import { AllOfferRDO } from "../../rdo/all_offer.rdo.js";
import { CreateOfferDto } from "../../dto/create_offer.dto.js";
import { request } from "node:http";
import { FavouriteOfferDto } from "../../dto/favourite_offer.to.js";
import { UserService } from "../../service/user.service.interface.js";
import { DetailedOfferRdo } from "../../rdo/detailed_offer.rdo.js";
import { OfferDto } from "../../dto/offer.dto.js";
import { ValidateObjectIdMiddleware } from "../../modules/rest/middleware/validate_object.middleware.js";
import { ValidateDtoMiddleware } from "../../modules/rest/middleware/validate_dto.middleware.js";
import { DocumentExistsMiddleware } from "../../modules/rest/middleware/document_exists.middleware.js";
import { PrivateRouteMiddleware } from "../../modules/rest/middleware/private_route.middleware.js";

export class OfferController extends BaseController
{
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService
  ) {
    super(logger)

    this.logger.info('Register routes for OfferController…');
const checkExist = new DocumentExistsMiddleware(offerService, 'Offer', 'id');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)] });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.detailedOffer, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('id'), checkExist] });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.deleteOffer, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('id'), checkExist] });
    this.addRoute({ path: '/:id', method: HttpMethod.Put, handler: this.updateOffer, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('id'), new ValidateDtoMiddleware(CreateOfferDto), checkExist] });
    this.addRoute({path: '/favourites/add', method: HttpMethod.Post, handler: this.addToFavourite, middlewares:[new PrivateRouteMiddleware()]})
    this.addRoute({path: '/favourites/remove', method: HttpMethod.Post, handler: this.removeFromFavourite, middlewares: [new PrivateRouteMiddleware()] })
    this.addRoute({path: '/favourites/:city', method: HttpMethod.Get, handler: this.findFavouriteFromCity})

  }
  public async index(req:Request, res:Response): Promise<void>
  {
    console.log('Зайдено')
    const limit = (req.query['limit']==undefined? 60:req.query['limit']) as number
      const offers = await this.offerService.findAll(limit)
      console.log(offers)
      const resposeData = fillDTO(AllOfferRDO, offers)
      this.ok(res, resposeData)


  }
  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(AllOfferRDO, result));
  }
  public async addToFavourite({ body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, FavouriteOfferDto>,
    res: Response) {
      const offer = await this.offerService.findById(body.id)
      const user = await this.userService.findById(tokenPayload.id)
      if (!offer)
      {
        const offerDoesNotExist = new Error("Данного оффера не существует")
        this.send(res, StatusCodes.BAD_REQUEST, offerDoesNotExist.message)
        return this.logger.error(offerDoesNotExist.message, offerDoesNotExist)
      }

      this.offerService.addTofavourite(body.id, tokenPayload.id)
      this.ok(res, fillDTO(DetailedOfferRdo, offer))

  }
  public async removeFromFavourite({ body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, FavouriteOfferDto>,
    res: Response) {
      const offer = await this.offerService.findById(body.id)

      this.offerService.removeFromFavourite(body.id, tokenPayload.id)
      this.ok(res, {})

  }
  public async detailedOffer(req:Request, res:Response): Promise<void>
  {
    const id = req.params['id']
    console.log(id)
      const offer = await this.offerService.findById(id)
      const userId = req.tokenPayload.id;
      console.log(userId)
      const favouriteOffers = await this.offerService.getFavouritesByUser(userId)
      const isFavourite = favouriteOffers?.includes(offer!)
      console.log(favouriteOffers)
      const resposeData =  fillDTO(DetailedOfferRdo, offer)
      resposeData.isFavoutite = isFavourite!
      console.log()
      this.ok(res, resposeData)


  }
  public async deleteOffer (req:Request, res:Response): Promise<void>
  {
    this.offerService.delete(req.params['id'])
    this.noContent(res, {})
  }
  public async updateOffer(req:Request, res:Response)
  {
    const offer = this.offerService.updateById(req.params['id'], req.body)
    this.ok(res, fillDTO(DetailedOfferRdo, offer))

  }
  public async findFavouriteFromCity(req: Request, res:Response): Promise<void>
  {
    const offers = await this.offerService.findPremiumByCity(req.params['city'])
    this.ok(res, fillDTO(AllOfferRDO, offers))
  }

  }


