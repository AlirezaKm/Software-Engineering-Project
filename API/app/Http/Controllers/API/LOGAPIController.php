<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateLOGAPIRequest;
use App\Http\Requests\API\UpdateLOGAPIRequest;
use App\Models\LOG;
use App\Repositories\LOGRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class LOGController
 * @package App\Http\Controllers\API
 */

class LOGAPIController extends AppBaseController
{
    /** @var  LOGRepository */
    private $lOGRepository;

    public function __construct(LOGRepository $lOGRepo)
    {
        $this->lOGRepository = $lOGRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/lOGS",
     *      summary="Get a listing of the LOGS.",
     *      tags={"LOG"},
     *      description="Get all LOGS",
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
     *                  @SWG\Items(ref="#/definitions/LOG")
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
        $this->lOGRepository->pushCriteria(new RequestCriteria($request));
        $this->lOGRepository->pushCriteria(new LimitOffsetCriteria($request));
        $lOGS = $this->lOGRepository->all();

        return $this->sendResponse($lOGS->toArray(), 'L O G S retrieved successfully');
    }

    /**
     * @param CreateLOGAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/lOGS",
     *      summary="Store a newly created LOG in storage",
     *      tags={"LOG"},
     *      description="Store LOG",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="LOG that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/LOG")
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
     *                  ref="#/definitions/LOG"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateLOGAPIRequest $request)
    {
        $input = $request->all();

        $lOGS = $this->lOGRepository->create($input);

        return $this->sendResponse($lOGS->toArray(), 'L O G saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/lOGS/{id}",
     *      summary="Display the specified LOG",
     *      tags={"LOG"},
     *      description="Get LOG",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of LOG",
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
     *                  ref="#/definitions/LOG"
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
        /** @var LOG $lOG */
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            return $this->sendError('L O G not found');
        }

        return $this->sendResponse($lOG->toArray(), 'L O G retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateLOGAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/lOGS/{id}",
     *      summary="Update the specified LOG in storage",
     *      tags={"LOG"},
     *      description="Update LOG",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of LOG",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="LOG that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/LOG")
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
     *                  ref="#/definitions/LOG"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateLOGAPIRequest $request)
    {
        $input = $request->all();

        /** @var LOG $lOG */
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            return $this->sendError('L O G not found');
        }

        $lOG = $this->lOGRepository->update($input, $id);

        return $this->sendResponse($lOG->toArray(), 'LOG updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/lOGS/{id}",
     *      summary="Remove the specified LOG from storage",
     *      tags={"LOG"},
     *      description="Delete LOG",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of LOG",
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
        /** @var LOG $lOG */
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            return $this->sendError('L O G not found');
        }

        $lOG->delete();

        return $this->sendResponse($id, 'L O G deleted successfully');
    }
}
