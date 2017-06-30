<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateUserTypeAPIRequest;
use App\Http\Requests\API\UpdateUserTypeAPIRequest;
use App\Models\LOG;
use App\Models\UserType;
use App\Repositories\UserTypeRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class UserTypeController
 * @package App\Http\Controllers\API
 */

class UserTypeAPIController extends AppBaseController
{
    /** @var  UserTypeRepository */
    private $userTypeRepository;

    public function __construct(UserTypeRepository $userTypeRepo)
    {
        $this->userTypeRepository = $userTypeRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/userTypes",
     *      summary="Get a listing of the UserTypes.",
     *      tags={"UserType"},
     *      description="Get all UserTypes",
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
     *                  @SWG\Items(ref="#/definitions/UserType")
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
        $this->userTypeRepository->pushCriteria(new RequestCriteria($request));
        $this->userTypeRepository->pushCriteria(new LimitOffsetCriteria($request));
        $userTypes = $this->userTypeRepository->all();

        return $this->sendResponse($userTypes->toArray(), 'User Types retrieved successfully');
    }

    /**
     * @param CreateUserTypeAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/userTypes",
     *      summary="Store a newly created UserType in storage",
     *      tags={"UserType"},
     *      description="Store UserType",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="UserType that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/UserType")
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
     *                  ref="#/definitions/UserType"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateUserTypeAPIRequest $request)
    {
        $input = $request->all();

        $userTypes = $this->userTypeRepository->create($input);
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s نوع کاربری %s را ثبت کرده است.",$request->user()->fname." ".$request->user()->lname,$userTypes->name),$request);}
        return $this->sendResponse($userTypes->toArray(), 'User Type saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/userTypes/{id}",
     *      summary="Display the specified UserType",
     *      tags={"UserType"},
     *      description="Get UserType",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of UserType",
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
     *                  ref="#/definitions/UserType"
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
        /** @var UserType $userType */
        $userType = $this->userTypeRepository->findWithoutFail($id);

        if (empty($userType)) {
            return $this->sendError('User Type not found');
        }

        return $this->sendResponse($userType->toArray(), 'User Type retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateUserTypeAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/userTypes/{id}",
     *      summary="Update the specified UserType in storage",
     *      tags={"UserType"},
     *      description="Update UserType",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of UserType",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="UserType that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/UserType")
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
     *                  ref="#/definitions/UserType"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateUserTypeAPIRequest $request)
    {
        $input = $request->all();

        /** @var UserType $userType */
        $userType = $this->userTypeRepository->findWithoutFail($id);

        if (empty($userType)) {
            return $this->sendError('User Type not found');
        }

        $userType = $this->userTypeRepository->update($input, $id);
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s نوع کاربری %s را بروزرسانی کرده است.",$request->user()->fname." ".$request->user()->lname,$userType->name),$request);}
        return $this->sendResponse($userType->toArray(), 'UserType updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/userTypes/{id}",
     *      summary="Remove the specified UserType from storage",
     *      tags={"UserType"},
     *      description="Delete UserType",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of UserType",
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
        /** @var UserType $userType */
        $userType = $this->userTypeRepository->findWithoutFail($id);
        $ut = $userType;
        if (empty($userType)) {
            return $this->sendError('User Type not found');
        }

        $userType->delete();
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s نوع کاربری %s را حذف کرده است.",$request->user()->fname." ".$request->user()->lname,$ut->name),$request);}
        return $this->sendResponse($id, 'User Type deleted successfully');
    }
}
