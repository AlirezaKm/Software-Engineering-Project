<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateOrderFactorAPIRequest;
use App\Http\Requests\API\UpdateOrderFactorAPIRequest;
use App\Models\LOG;
use App\Models\Order;
use App\Models\OrderFactor;
use App\Repositories\OrderFactorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use InfyOm\Generator\Controller\AppBaseController;
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
        $orderFactors = DB::table('Order')
            ->join('Product','Order.product','=','Product.code')
            ->join('OrderFactor','Order.orderFactor','=','OrderFactor.id')
            ->select(DB::raw('OrderFactor.* ,SUM(Order.count) AS \'count\' , SUM(Product.sellPrice) AS \'sum\''))
            ->groupBy('OrderFactor.id')
            ->get();
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
        $OrderFactorInfo = $request->except(['orders','create_date_time']);
        $orderFactor = $this->orderFactorRepository->create($OrderFactorInfo);
        if(empty($orderFactor)){
            return $this->sendError('OrderFactor Not Created!');
        }

        if($request->has('orders')){
            $orders = $request->only('orders');
            if(is_string($orders['orders'])){
                $pp = json_decode($orders['orders'],true);
            }else{
                $pp = $orders['orders'];
            }
            if($pp !== null){
                for ($i = 0 ; $i < count($pp) ; $i++){
                    $pp[$i] += array('orderFactor' => $orderFactor->id);
                }
            }
            //return $pp;
            // Here insert Order
            DB::table('Order')->insert($pp);
        }
        //if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s فاکتور سفارش به شماره %s را ثبت کرده است.",$request->user()->fname." ".$request->user()->lname,$orderFactor->id),$request);}
        return $this->sendResponse($request->all(), 'Order Factor saved successfully');
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
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);
        if(empty($orderFactor)){
            return $this->sendError('OrderFactor Not Found!');
        }

        $OrderFactorInfo = $request->except('orders');
        $orderFactor = $this->orderFactorRepository->update($OrderFactorInfo, $id);

        // Here is kOs kharingO namOsan !
        if($request->has('orders')){
            $orders = $request->only('orders');
            if(is_string($orders['orders'])){
                $pp = json_decode($orders['orders'],true);
            }else{
                $pp = $orders['orders'];
            }
            # Delete All ROWs and re Define them!
            Order::where('product',$id)->delete();
            if($pp !== null){
                for ($i = 0 ; $i < count($pp) ; $i++){
                    $pp[$i] += array('orderFactor' => $orderFactor->id);
                    unset($pp[$i]['id']);
                }
            }
            DB::table('Order')->insert($pp);
        }
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s فاکتور سفارش به شماره %s را بروزرسانی کرده است.",$request->user()->fname." ".$request->user()->lname,$orderFactor->id),$request);}
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
    public function destroy($id,Request $request)
    {
        /** @var OrderFactor $orderFactor */
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);
        $of = $orderFactor;
        if (empty($orderFactor)) {
            return $this->sendError('Order Factor not found');
        }

        $orderFactor->delete();
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s فاکتور سفارش به شماره %s را حذف کرده است.",$request->user()->fname." ".$request->user()->lname,$of->id),$request);}
        return $this->sendResponse($id, 'Order Factor deleted successfully');
    }
}
