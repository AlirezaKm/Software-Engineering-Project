<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateProductPropertyAPIRequest;
use App\Http\Requests\API\UpdateProductPropertyAPIRequest;
use App\Models\ProductProperty;
use App\Repositories\ProductPropertyRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ProductPropertyController
 * @package App\Http\Controllers\API
 */

class ProductPropertyAPIController extends AppBaseController
{
    /** @var  ProductPropertyRepository */
    private $productPropertyRepository;

    public function __construct(ProductPropertyRepository $productPropertyRepo)
    {
        $this->productPropertyRepository = $productPropertyRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/productProperties",
     *      summary="Get a listing of the ProductProperties.",
     *      tags={"ProductProperty"},
     *      description="Get all ProductProperties",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/ProductProperty")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->productPropertyRepository->pushCriteria(new RequestCriteria($request));
        $this->productPropertyRepository->pushCriteria(new LimitOffsetCriteria($request));
        $productProperties = $this->productPropertyRepository->all();

        return $this->sendResponse($productProperties->toArray(), 'Product Properties retrieved successfully');
    }

    /**
     * @param CreateProductPropertyAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/productProperties",
     *      summary="Store a newly created ProductProperty in storage",
     *      tags={"ProductProperty"},
     *      description="Store ProductProperty",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="ProductProperty that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/ProductProperty")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/ProductProperty"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateProductPropertyAPIRequest $request)
    {
        $input = $request->all();

        $productProperties = $this->productPropertyRepository->create($input);

        return $this->sendResponse($productProperties->toArray(), 'Product Property saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/productProperties/{id}",
     *      summary="Display the specified ProductProperty",
     *      tags={"ProductProperty"},
     *      description="Get ProductProperty",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ProductProperty",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/ProductProperty"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var ProductProperty $productProperty */
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            return $this->sendError('Product Property not found');
        }

        return $this->sendResponse($productProperty->toArray(), 'Product Property retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateProductPropertyAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/productProperties/{id}",
     *      summary="Update the specified ProductProperty in storage",
     *      tags={"ProductProperty"},
     *      description="Update ProductProperty",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ProductProperty",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="ProductProperty that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/ProductProperty")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/ProductProperty"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateProductPropertyAPIRequest $request)
    {
        $input = $request->all();

        /** @var ProductProperty $productProperty */
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            return $this->sendError('Product Property not found');
        }

        $productProperty = $this->productPropertyRepository->update($input, $id);

        return $this->sendResponse($productProperty->toArray(), 'ProductProperty updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/productProperties/{id}",
     *      summary="Remove the specified ProductProperty from storage",
     *      tags={"ProductProperty"},
     *      description="Delete ProductProperty",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ProductProperty",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var ProductProperty $productProperty */
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            return $this->sendError('Product Property not found');
        }

        $productProperty->delete();

        return $this->sendResponse($id, 'Product Property deleted successfully');
    }
}
