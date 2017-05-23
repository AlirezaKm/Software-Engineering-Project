<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductPropertyRequest;
use App\Http\Requests\UpdateProductPropertyRequest;
use App\Repositories\ProductPropertyRepository;
use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

class ProductPropertyController extends AppBaseController
{
    /** @var  ProductPropertyRepository */
    private $productPropertyRepository;

    public function __construct(ProductPropertyRepository $productPropertyRepo)
    {
        $this->productPropertyRepository = $productPropertyRepo;
    }

    /**
     * Display a listing of the ProductProperty.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->productPropertyRepository->pushCriteria(new RequestCriteria($request));
        $productProperties = $this->productPropertyRepository->all();

        return view('product_properties.index')
            ->with('productProperties', $productProperties);
    }

    /**
     * Show the form for creating a new ProductProperty.
     *
     * @return Response
     */
    public function create()
    {
        return view('product_properties.create');
    }

    /**
     * Store a newly created ProductProperty in storage.
     *
     * @param CreateProductPropertyRequest $request
     *
     * @return Response
     */
    public function store(CreateProductPropertyRequest $request)
    {
        $input = $request->all();

        $productProperty = $this->productPropertyRepository->create($input);

        Flash::success('Product Property saved successfully.');

        return redirect(route('productProperties.index'));
    }

    /**
     * Display the specified ProductProperty.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            Flash::error('Product Property not found');

            return redirect(route('productProperties.index'));
        }

        return view('product_properties.show')->with('productProperty', $productProperty);
    }

    /**
     * Show the form for editing the specified ProductProperty.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            Flash::error('Product Property not found');

            return redirect(route('productProperties.index'));
        }

        return view('product_properties.edit')->with('productProperty', $productProperty);
    }

    /**
     * Update the specified ProductProperty in storage.
     *
     * @param  int              $id
     * @param UpdateProductPropertyRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateProductPropertyRequest $request)
    {
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            Flash::error('Product Property not found');

            return redirect(route('productProperties.index'));
        }

        $productProperty = $this->productPropertyRepository->update($request->all(), $id);

        Flash::success('Product Property updated successfully.');

        return redirect(route('productProperties.index'));
    }

    /**
     * Remove the specified ProductProperty from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $productProperty = $this->productPropertyRepository->findWithoutFail($id);

        if (empty($productProperty)) {
            Flash::error('Product Property not found');

            return redirect(route('productProperties.index'));
        }

        $this->productPropertyRepository->delete($id);

        Flash::success('Product Property deleted successfully.');

        return redirect(route('productProperties.index'));
    }
}
