<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateProductAPIRequest;
use App\Http\Requests\API\UpdateProductAPIRequest;
use App\Models\Product;
use App\Models\ProductProperty;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use InfyOm\Generator\Controller\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ProductController
 * @package App\Http\Controllers\API
 */

class ProductAPIController extends AppBaseController
{
    /** @var  ProductRepository */
    private $productRepository;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepository = $productRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/products",
     *      summary="Get a listing of the Products.",
     *      tags={"Product"},
     *      description="Get all Products",
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
     *                  @SWG\Items(ref="#/definitions/Product")
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
        $this->productRepository->pushCriteria(new RequestCriteria($request));
        $this->productRepository->pushCriteria(new LimitOffsetCriteria($request));
        $products = Product::with('category','subcategory','factor');
        $SizeOfPage = 10;
        if($request->has('orderFactor')){

        }else {
            // Not Trust Here , Security RIDE namOsan !
            if($request->has('limit') && is_numeric($request->input('limit'))){
                $limit = $request->input('limit');
                $products = $products->limit($limit);
            }else{
                $products = $products->limit($SizeOfPage);
            }
            if($request->has('page') && is_numeric($request->input('page'))){
                $page = $request->input('page') > 1 ? $request->input('page') : 1;
                $products = $products->offset(($page - 1)*$SizeOfPage);
            }else{
                $products = $products->offset(0);
            }
            if($request->has('category') && is_numeric($request->input('category'))){
                $category = $request->input('category') > 0 ? $request->input('category') : 0;
                $products = $products->where('category',$category);
            }
            if($request->has('subCategory') && is_numeric($request->input('subCategory'))){
                $subcategory = $request->input('subCategory') > 0 ? $request->input('subCategory') : 0;
                $products = $products->where('subcategory',$subcategory);
            }
            if($request->has('name')){
                $name = $request->input('name');
                $products = $products->where('name',$name);
            }
            if($request->has('factor')){
                $factor = $request->input('factor');
                $products = $products->where('factor',$factor);
            }
        }
        $products = $products->get();
        return $this->sendResponse($products->toArray(), 'Products retrieved successfully');
    }

    /**
     * @param CreateProductAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/products",
     *      summary="Store a newly created Product in storage",
     *      tags={"Product"},
     *      description="Store Product",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Product that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Product")
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
     *                  ref="#/definitions/Product"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateProductAPIRequest $request)
    {
        //return  $request->all();
        $productInfo = $request->except('productProperties');
        $product = $this->productRepository->create($productInfo);
        if(empty($product)){
            return $this->sendError('Product Not Created!');
        }
        if($request->has('productProperties')){
            $productProperties = $request->only('productProperties');
            if(is_string($productProperties['productProperties'])){
                $pp = json_decode($productProperties['productProperties'],true);
            }else{
                $pp = $productProperties['productProperties'];
            }
            if($pp !== null){
                for ($i = 0 ; $i < count($pp) ; $i++){
                    $pp[$i] += array('product' => $product->code);
                }
            }
            //return $pp;
            // Here insert ProductProperty
            DB::table('ProductProperty')->insert($pp);
        }
        return $this->sendResponse($request->all(), 'Product saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/products/{id}",
     *      summary="Display the specified Product",
     *      tags={"Product"},
     *      description="Get Product",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Product",
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
     *                  ref="#/definitions/Product"
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
        /** @var Product $product */
        //$product = $this->productRepository->findWithoutFail($id);
        $products = Product::with('category','subcategory','factor');
        $product = $products->find($id);
        if (empty($product)) {
            return $this->sendError('Product not found');
        }
        return $this->sendResponse($product->toArray(), 'Product retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateProductAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/products/{id}",
     *      summary="Update the specified Product in storage",
     *      tags={"Product"},
     *      description="Update Product",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Product",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Product that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Product")
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
     *                  ref="#/definitions/Product"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateProductAPIRequest $request)
    {
        $product = $this->productRepository->findWithoutFail($id);
        if(empty($product)){
            return $this->sendError('Product Not Found!');
        }

        $productInfo = $request->except('productProperties');
        $product = $this->productRepository->update($productInfo, $id);

        // Here is kOs kharingO namOsan !
        if($request->has('productProperties')){
            $productProperties = $request->only('productProperties');
            if(is_string($productProperties['productProperties'])){
                $pp = json_decode($productProperties['productProperties'],true);
            }else{
                $pp = $productProperties['productProperties'];
            }
            # Delete All ROWs and re Define them!
            ProductProperty::where('product',$id)->delete();
            if($pp !== null){
                for ($i = 0 ; $i < count($pp) ; $i++){
                    $pp[$i] += array('product' => $product->code);
                    unset($pp[$i]['id']);
                }
            }
            DB::table('ProductProperty')->insert($pp);
        }
        /** @var Product $product */
        return $this->sendResponse($request->all(), 'Product updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/products/{id}",
     *      summary="Remove the specified Product from storage",
     *      tags={"Product"},
     *      description="Delete Product",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Product",
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
        /** @var Product $product */
        $product = $this->productRepository->findWithoutFail($id);

        if (empty($product)) {
            return $this->sendError('Product not found');
        }

        $product->delete();

        return $this->sendResponse($id, 'Product deleted successfully');
    }
}
