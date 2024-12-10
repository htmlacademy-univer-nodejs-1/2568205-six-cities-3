import { types } from "@typegoose/typegoose";
import { DefaultOfferService } from "../../service/default_offer.service.js";
import { OfferEntity, OfferModel } from "./offer.entity.js";
import { OfferService } from "../../service/offer.service.interface.js";
import { Container } from "inversify";
import { Component } from "../component.js";
import { Controller } from "../../modules/rest/controller/controller.interface.js";
import { OfferController } from "./offer.controller.js";

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope()

  return offerContainer;
}
