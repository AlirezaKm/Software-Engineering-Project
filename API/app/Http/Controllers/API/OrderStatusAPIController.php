<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateOrderStatusAPIRequest;
use App\Http\Requests\API\UpdateOrderStatusAPIRequest;
use App\Models\LOG;
use App\Models\OrderStatus;
use App\Repositories\OrderStatusRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class OrderStatusController
 * @package App\Http\Controllers\API
 */

class OrderStatusAPIController extends AppBaseController
{
    /** @var  OrderStatusRepository */
    private $orderStatusRepository;

    public function __construct(OrderStatusRepository $orderStatusRepo)
    {
        $this->orderStatusRepository = $orderStatusRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/orderStatuses",
     *      summary="Get a listing of the OrderStatuses.",
     *      tags={"OrderStatus"},
     *      description="Get all OrderStatuses",
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
     *                  @SWG\Items(ref="#/definitions/OrderStatus")
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
        $this->orderStatusRepository->pushCriteria(new RequestCriteria($request));
        $this->orderStatusRepository->pushCriteria(new LimitOffsetCriteria($request));
        $orderStatuses = $this->orderStatusRepository->all();

        return $this->sendResponse($orderStatuses->toArray(), 'Order Statuses retrieved successfully');
    }

    /**
     * @param CreateOrderStatusAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/orderStatuses",
     *      summary="Store a newly created OrderStatus in storage",
     *      tags={"OrderStatus"},
     *      description="Store OrderStatus",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="OrderStatus that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/OrderStatus")
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
     *                  ref="#/definitions/OrderStatus"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateOrderStatusAPIRequest $request)
    {
        $input = $request->all();

        $orderStatuses = $this->orderStatusRepository->create($input);
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s نوع سفارش %s را ثبت کرده است.",$request->user()->fname." ".$request->user()->lname,$orderStatuses->name),$request);}
        return $this->sendResponse($orderStatuses->toArray(), 'Order Status saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/orderStatuses/{id}",
     *      summary="Display the specified OrderStatus",
     *      tags={"OrderStatus"},
     *      description="Get OrderStatus",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of OrderStatus",
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
     *                  ref="#/definitions/OrderStatus"
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
        /** @var OrderStatus $orderStatus */
        $orderStatus = $this->orderStatusRepository->findWithoutFail($id);

        if (empty($orderStatus)) {
            return $this->sendError('Order Status not found');
        }

        return $this->sendResponse($orderStatus->toArray(), 'Order Status retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateOrderStatusAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/orderStatuses/{id}",
     *      summary="Update the specified OrderStatus in storage",
     *      tags={"OrderStatus"},
     *      description="Update OrderStatus",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of OrderStatus",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="OrderStatus that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/OrderStatus")
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
     *                  ref="#/definitions/OrderStatus"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateOrderStatusAPIRequest $request)
    {
        $input = $request->all();

        /** @var OrderStatus $orderStatus */
        $orderStatus = $this->orderStatusRepository->findWithoutFail($id);

        if (empty($orderStatus)) {
            return $this->sendError('Order Status not found');
        }

        $orderStatus = $this->orderStatusRepository->update($input, $id);
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s نوع سفارش %s را بروزرسانی کرده است.",$request->user()->fname." ".$request->user()->lname,$orderStatus->name),$request);}
        return $this->sendResponse($orderStatus->toArray(), 'OrderStatus updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/orderStatuses/{id}",
     *      summary="Remove the specified OrderStatus from storage",
     *      tags={"OrderStatus"},
     *      description="Delete OrderStatus",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of OrderStatus",
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
    public function destroy($id,Request $request)
    {
        /** @var OrderStatus $orderStatus */
        $orderStatus = $this->orderStatusRepository->findWithoutFail($id);
        $os = $orderStatus;
        if (empty($orderStatus)) {
            return $this->sendError('Order Status not found');
        }

        $orderStatus->delete();
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s نوع سفارش %s را حذف کرده است.",$request->user()->fname." ".$request->user()->lname,$os->name),$request);}
        return $this->sendResponse($id, 'Order Status deleted successfully');
    }
}
