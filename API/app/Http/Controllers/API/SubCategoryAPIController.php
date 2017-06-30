<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateSubCategoryAPIRequest;
use App\Http\Requests\API\UpdateSubCategoryAPIRequest;
use App\Models\LOG;
use App\Models\SubCategory;
use App\Repositories\SubCategoryRepository;
use Illuminate\Http\Request;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class SubCategoryController
 * @package App\Http\Controllers\API
 */

class SubCategoryAPIController extends AppBaseController
{
    /** @var  SubCategoryRepository */
    private $subCategoryRepository;

    public function __construct(SubCategoryRepository $subCategoryRepo)
    {
        $this->subCategoryRepository = $subCategoryRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/subCategories",
     *      summary="Get a listing of the SubCategories.",
     *      tags={"SubCategory"},
     *      description="Get all SubCategories",
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
     *                  @SWG\Items(ref="#/definitions/SubCategory")
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
        $this->subCategoryRepository->pushCriteria(new RequestCriteria($request));
        $this->subCategoryRepository->pushCriteria(new LimitOffsetCriteria($request));
        $subCategories = SubCategory::with('category');
        if($request->has('category')){
            $category = $request->input('category');
            $subCategories = $subCategories->where('category',$category);
        }
        $subCategories = $subCategories->get();
        return $this->sendResponse($subCategories->toArray(), 'Sub Categories retrieved successfully');
    }

    /**
     * @param CreateSubCategoryAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/subCategories",
     *      summary="Store a newly created SubCategory in storage",
     *      tags={"SubCategory"},
     *      description="Store SubCategory",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="SubCategory that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/SubCategory")
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
     *                  ref="#/definitions/SubCategory"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateSubCategoryAPIRequest $request)
    {
        $input = $request->all();

        $subCategories = $this->subCategoryRepository->create($input);
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s زیردسته %s را ثبت کرده است.",$request->user()->fname." ".$request->user()->lname,$subCategories->name),$request);}
        return $this->sendResponse($subCategories->toArray(), 'Sub Category saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/subCategories/{id}",
     *      summary="Display the specified SubCategory",
     *      tags={"SubCategory"},
     *      description="Get SubCategory",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of SubCategory",
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
     *                  ref="#/definitions/SubCategory"
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
        /** @var SubCategory $subCategory */
        $subCategory = $this->subCategoryRepository->findWithoutFail($id);

        if (empty($subCategory)) {
            return $this->sendError('Sub Category not found');
        }

        return $this->sendResponse($subCategory->toArray(), 'Sub Category retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateSubCategoryAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/subCategories/{id}",
     *      summary="Update the specified SubCategory in storage",
     *      tags={"SubCategory"},
     *      description="Update SubCategory",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of SubCategory",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="SubCategory that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/SubCategory")
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
     *                  ref="#/definitions/SubCategory"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateSubCategoryAPIRequest $request)
    {
        $input = $request->all();

        /** @var SubCategory $subCategory */
        $subCategory = $this->subCategoryRepository->findWithoutFail($id);

        if (empty($subCategory)) {
            return $this->sendError('Sub Category not found');
        }

        $subCategory = $this->subCategoryRepository->update($input, $id);
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s زیردسته %s را بروزرسانی کرده است.",$request->user()->fname." ".$request->user()->lname,$subCategory->name),$request);}
        return $this->sendResponse($subCategory->toArray(), 'SubCategory updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/subCategories/{id}",
     *      summary="Remove the specified SubCategory from storage",
     *      tags={"SubCategory"},
     *      description="Delete SubCategory",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of SubCategory",
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
    public function destroy($id, Request $request)
    {
        /** @var SubCategory $subCategory */
        $subCategory = $this->subCategoryRepository->findWithoutFail($id);
        $sc = $subCategory;
        if (empty($subCategory)) {
            return $this->sendError('Sub Category not found');
        }

        $subCategory->delete();
        if(LOG::$log_is_on) {LOG::infoReq(sprintf("کاربر %s زیردسته %s را حذف کرده است.",$request->user()->fname." ".$request->user()->lname,$sc->name),$request);}
        return $this->sendResponse($id, 'Sub Category deleted successfully');
    }
}
