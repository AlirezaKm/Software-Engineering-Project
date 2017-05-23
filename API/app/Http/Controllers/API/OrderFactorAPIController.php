<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateOrderFactorAPIRequest;
use App\Http\Requests\API\UpdateOrderFactorAPIRequest;
use App\Models\OrderFactor;
use App\Repositories\OrderFactorRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class OrderFactorController
 * @package App\Http\Controllers\API
 */

class OrderFactorAPIController extends AppBaseController
{
    /** @var  OrderFactorRepository */
    private $orderFactorRepository;

    public function __construct(OrderFactorRepository $orderFactorRepo)
    {
        $this->orderFactorRepository = $orderFactorRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/orderFactors",
     *      summary="Get a listing of the OrderFactors.",
     *      tags={"OrderFactor"},
     *      description="Get all OrderFactors",
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
     *                  @SWG\Items(ref="#/definitions/OrderFactor")
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
        $this->orderFactorRepository->pushCriteria(new RequestCriteria($request));
        $this->orderFactorRepository->pushCriteria(new LimitOffsetCriteria($request));
        $orderFactors = $this->orderFactorRepository->all();

        return $this->sendResponse($orderFactors->toArray(), 'Order Factors retrieved successfully');
    }

    /**
     * @param CreateOrderFactorAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/orderFactors",
     *      summary="Store a newly created OrderFactor in storage",
     *      tags={"OrderFactor"},
     *      description="Store OrderFactor",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="OrderFactor that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/OrderFactor")
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
     *                  ref="#/definitions/OrderFactor"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateOrderFactorAPIRequest $request)
    {
        $input = $request->all();

        $orderFactors = $this->orderFactorRepository->create($input);

        return $this->sendResponse($orderFactors->toArray(), 'Order Factor saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/orderFactors/{id}",
     *      summary="Display the specified OrderFactor",
     *      tags={"OrderFactor"},
     *      description="Get OrderFactor",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of OrderFactor",
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
     *                  ref="#/definitions/OrderFactor"
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
        /** @var OrderFactor $orderFactor */
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            return $this->sendError('Order Factor not found');
        }

        return $this->sendResponse($orderFactor->toArray(), 'Order Factor retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateOrderFactorAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/orderFactors/{id}",
     *      summary="Update the specified OrderFactor in storage",
     *      tags={"OrderFactor"},
     *      description="Update OrderFactor",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of OrderFactor",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="OrderFactor that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/OrderFactor")
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
     *                  ref="#/definitions/OrderFactor"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateOrderFactorAPIRequest $request)
    {
        $input = $request->all();

        /** @var OrderFactor $orderFactor */
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            return $this->sendError('Order Factor not found');
        }

        $orderFactor = $this->orderFactorRepository->update($input, $id);

        return $this->sendResponse($orderFactor->toArray(), 'OrderFactor updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/orderFactors/{id}",
     *      summary="Remove the specified OrderFactor from storage",
     *      tags={"OrderFactor"},
     *      description="Delete OrderFactor",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of OrderFactor",
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
        /** @var OrderFactor $orderFactor */
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            return $this->sendError('Order Factor not found');
        }

        $orderFactor->delete();

        return $this->sendResponse($id, 'Order Factor deleted successfully');
    }
}
