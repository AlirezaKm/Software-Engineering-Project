<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePropertyAPIRequest;
use App\Http\Requests\API\UpdatePropertyAPIRequest;
use App\Models\Property;
use App\Repositories\PropertyRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PropertyController
 * @package App\Http\Controllers\API
 */

class PropertyAPIController extends AppBaseController
{
    /** @var  PropertyRepository */
    private $propertyRepository;

    public function __construct(PropertyRepository $propertyRepo)
    {
        $this->propertyRepository = $propertyRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/properties",
     *      summary="Get a listing of the Properties.",
     *      tags={"Property"},
     *      description="Get all Properties",
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
     *                  @SWG\Items(ref="#/definitions/Property")
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
        $this->propertyRepository->pushCriteria(new RequestCriteria($request));
        $this->propertyRepository->pushCriteria(new LimitOffsetCriteria($request));
        $properties = $this->propertyRepository->all();

        return $this->sendResponse($properties->toArray(), 'Properties retrieved successfully');
    }

    /**
     * @param CreatePropertyAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/properties",
     *      summary="Store a newly created Property in storage",
     *      tags={"Property"},
     *      description="Store Property",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Property that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Property")
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
     *                  ref="#/definitions/Property"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePropertyAPIRequest $request)
    {
        $input = $request->all();

        $properties = $this->propertyRepository->create($input);

        return $this->sendResponse($properties->toArray(), 'Property saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/properties/{id}",
     *      summary="Display the specified Property",
     *      tags={"Property"},
     *      description="Get Property",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Property",
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
     *                  ref="#/definitions/Property"
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
        /** @var Property $property */
        $property = $this->propertyRepository->findWithoutFail($id);

        if (empty($property)) {
            return $this->sendError('Property not found');
        }

        return $this->sendResponse($property->toArray(), 'Property retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePropertyAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/properties/{id}",
     *      summary="Update the specified Property in storage",
     *      tags={"Property"},
     *      description="Update Property",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Property",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Property that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Property")
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
     *                  ref="#/definitions/Property"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePropertyAPIRequest $request)
    {
        $input = $request->all();

        /** @var Property $property */
        $property = $this->propertyRepository->findWithoutFail($id);

        if (empty($property)) {
            return $this->sendError('Property not found');
        }

        $property = $this->propertyRepository->update($input, $id);

        return $this->sendResponse($property->toArray(), 'Property updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/properties/{id}",
     *      summary="Remove the specified Property from storage",
     *      tags={"Property"},
     *      description="Delete Property",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Property",
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
        /** @var Property $property */
        $property = $this->propertyRepository->findWithoutFail($id);

        if (empty($property)) {
            return $this->sendError('Property not found');
        }

        $property->delete();

        return $this->sendResponse($id, 'Property deleted successfully');
    }
}
