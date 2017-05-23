<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateSellersAPIRequest;
use App\Http\Requests\API\UpdateSellersAPIRequest;
use App\Models\Sellers;
use App\Repositories\SellersRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class SellersController
 * @package App\Http\Controllers\API
 */

class SellersAPIController extends AppBaseController
{
    /** @var  SellersRepository */
    private $sellersRepository;

    public function __construct(SellersRepository $sellersRepo)
    {
        $this->sellersRepository = $sellersRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/sellers",
     *      summary="Get a listing of the Sellers.",
     *      tags={"Sellers"},
     *      description="Get all Sellers",
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
     *                  @SWG\Items(ref="#/definitions/Sellers")
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
        $this->sellersRepository->pushCriteria(new RequestCriteria($request));
        $this->sellersRepository->pushCriteria(new LimitOffsetCriteria($request));
        $sellers = $this->sellersRepository->all();

        return $this->sendResponse($sellers->toArray(), 'Sellers retrieved successfully');
    }

    /**
     * @param CreateSellersAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/sellers",
     *      summary="Store a newly created Sellers in storage",
     *      tags={"Sellers"},
     *      description="Store Sellers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Sellers that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Sellers")
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
     *                  ref="#/definitions/Sellers"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateSellersAPIRequest $request)
    {
        $input = $request->all();

        $sellers = $this->sellersRepository->create($input);

        return $this->sendResponse($sellers->toArray(), 'Sellers saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/sellers/{id}",
     *      summary="Display the specified Sellers",
     *      tags={"Sellers"},
     *      description="Get Sellers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Sellers",
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
     *                  ref="#/definitions/Sellers"
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
        /** @var Sellers $sellers */
        $sellers = $this->sellersRepository->findWithoutFail($id);

        if (empty($sellers)) {
            return $this->sendError('Sellers not found');
        }

        return $this->sendResponse($sellers->toArray(), 'Sellers retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateSellersAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/sellers/{id}",
     *      summary="Update the specified Sellers in storage",
     *      tags={"Sellers"},
     *      description="Update Sellers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Sellers",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Sellers that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Sellers")
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
     *                  ref="#/definitions/Sellers"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateSellersAPIRequest $request)
    {
        $input = $request->all();

        /** @var Sellers $sellers */
        $sellers = $this->sellersRepository->findWithoutFail($id);

        if (empty($sellers)) {
            return $this->sendError('Sellers not found');
        }

        $sellers = $this->sellersRepository->update($input, $id);

        return $this->sendResponse($sellers->toArray(), 'Sellers updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/sellers/{id}",
     *      summary="Remove the specified Sellers from storage",
     *      tags={"Sellers"},
     *      description="Delete Sellers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Sellers",
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
        /** @var Sellers $sellers */
        $sellers = $this->sellersRepository->findWithoutFail($id);

        if (empty($sellers)) {
            return $this->sendError('Sellers not found');
        }

        $sellers->delete();

        return $this->sendResponse($id, 'Sellers deleted successfully');
    }
}
