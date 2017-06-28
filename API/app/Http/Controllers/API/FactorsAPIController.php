<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateFactorsAPIRequest;
use App\Http\Requests\API\UpdateFactorsAPIRequest;
use App\Models\Factors;
use App\Repositories\FactorsRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class FactorsController
 * @package App\Http\Controllers\API
 */

class FactorsAPIController extends AppBaseController
{
    /** @var  FactorsRepository */
    private $factorsRepository;

    public function __construct(FactorsRepository $factorsRepo)
    {
        $this->factorsRepository = $factorsRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/factors",
     *      summary="Get a listing of the Factors.",
     *      tags={"Factors"},
     *      description="Get all Factors",
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
     *                  @SWG\Items(ref="#/definitions/Factors")
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

        $this->factorsRepository->pushCriteria(new RequestCriteria($request));
        $this->factorsRepository->pushCriteria(new LimitOffsetCriteria($request));
        $SizeOfPage = 5;
        $factors = Factors::with('seller');

        if($request->has('page') && is_numeric($request->input('page'))){
            $page = $request->input('page') > 1 ? $request->input('page') : 1;
            // Check inja ro , perhaps offset bayad bashe ($page+$SizeOfPage + 1)
            $factors = $factors->limit($SizeOfPage)->offset(($page - 1)*$SizeOfPage);
        }else{
            $factors = $factors->orderBy('id','desc')->take($SizeOfPage);

        }

        $factors = $factors->get();
        return $this->sendResponse($factors->toArray(), 'Factors retrieved successfully');
    }

    /**
     * @param CreateFactorsAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/factors",
     *      summary="Store a newly created Factors in storage",
     *      tags={"Factors"},
     *      description="Store Factors",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Factors that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Factors")
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
     *                  ref="#/definitions/Factors"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateFactorsAPIRequest $request)
    {
        $input = $request->all();

        $factors = $this->factorsRepository->create($input);

        return $this->sendResponse($factors->toArray(), 'Factors saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/factors/{id}",
     *      summary="Display the specified Factors",
     *      tags={"Factors"},
     *      description="Get Factors",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Factors",
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
     *                  ref="#/definitions/Factors"
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
        /** @var Factors $factors */
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            return $this->sendError('Factors not found');
        }

        return $this->sendResponse($factors->toArray(), 'Factors retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateFactorsAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/factors/{id}",
     *      summary="Update the specified Factors in storage",
     *      tags={"Factors"},
     *      description="Update Factors",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Factors",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Factors that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Factors")
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
     *                  ref="#/definitions/Factors"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateFactorsAPIRequest $request)
    {
        $input = $request->all();

        /** @var Factors $factors */
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            return $this->sendError('Factors not found');
        }

        $factors = $this->factorsRepository->update($input, $id);

        return $this->sendResponse($factors->toArray(), 'Factors updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/factors/{id}",
     *      summary="Remove the specified Factors from storage",
     *      tags={"Factors"},
     *      description="Delete Factors",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Factors",
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
        /** @var Factors $factors */
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            return $this->sendError('Factors not found');
        }

        $factors->delete();

        return $this->sendResponse($id, 'Factors deleted successfully');
    }
}
