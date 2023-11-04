import { SuccessCodes } from "App/Core/Constants/SuccessCodes";
import CreateProductOfferTask from "App/Tasks/CreateProductOfferTask";
import DeleteProductOfferTask from "App/Tasks/DeleteProductOfferTask";
import ListProductOffersTask from "App/Tasks/ListProductOffersTask";
import UpdateProductOfferTask from "App/Tasks/UpdateProductOfferTask";
import ViewProductOfferTask from "App/Tasks/ViewProductOfferTask";
import CreateProductOfferValidator from "App/Validators/CreateProdutOfferValidator";
import UpdateProductOfferValidator from "App/Validators/UpdateProductOfferValidator";

export default class ProductOfferController {
  public async listProductOffers() {
    return {
      success: true,
      success_code: SuccessCodes.LIST_PRODUCT_OFFERS,
      success_message: "List of product offers",
      data: await new ListProductOffersTask().run(),
    };
  }

  public async viewProductOffer({ request }) {
    const { product_offer_id } = request.params();

    return {
      success: true,
      success_code: SuccessCodes.VIEW_PRODUCT_OFFER,
      success_message: "View product offer",
      data: await new ViewProductOfferTask().run(product_offer_id),
    };
  }

  public async createProductOffer({ request }) {
    const payload = await request.validate(CreateProductOfferValidator);

    return {
      success: true,
      success_code: SuccessCodes.CREATE_PRODUCT_OFFER,
      success_message: "Product offer successfully created",
      data: await new CreateProductOfferTask().run(payload),
    };
  }

  public async updateProductOffer({ request }) {
    const payload = await request.validate(UpdateProductOfferValidator);
    const { product_offer_id } = request.params();

    await new UpdateProductOfferTask().run({
      ...payload,
      product_offer_id,
    });

    return {
      success: true,
      success_code: SuccessCodes.CREATE_PRODUCT_OFFER,
      success_message: "Product offer successfully updated",
    };
  }

  public async deleteProductOffer({ request }) {
    const { product_offer_id } = request.params();

    await new DeleteProductOfferTask().run(product_offer_id);

    return {
      success: true,
      success_code: SuccessCodes.DELETE_PRODUCT_OFFER,
      success_message: "Product offer successfully deleted",
    };
  }
}
