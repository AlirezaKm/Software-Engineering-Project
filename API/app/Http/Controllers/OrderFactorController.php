<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderFactorRequest;
use App\Http\Requests\UpdateOrderFactorRequest;
use App\Repositories\OrderFactorRepository;
use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

class OrderFactorController extends AppBaseController
{
    /** @var  OrderFactorRepository */
    private $orderFactorRepository;

    public function __construct(OrderFactorRepository $orderFactorRepo)
    {
        $this->orderFactorRepository = $orderFactorRepo;
    }

    /**
     * Display a listing of the OrderFactor.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->orderFactorRepository->pushCriteria(new RequestCriteria($request));
        $orderFactors = $this->orderFactorRepository->all();

        return view('order_factors.index')
            ->with('orderFactors', $orderFactors);
    }

    /**
     * Show the form for creating a new OrderFactor.
     *
     * @return Response
     */
    public function create()
    {
        return view('order_factors.create');
    }

    /**
     * Store a newly created OrderFactor in storage.
     *
     * @param CreateOrderFactorRequest $request
     *
     * @return Response
     */
    public function store(CreateOrderFactorRequest $request)
    {
        $input = $request->all();

        $orderFactor = $this->orderFactorRepository->create($input);

        Flash::success('Order Factor saved successfully.');

        return redirect(route('orderFactors.index'));
    }

    /**
     * Display the specified OrderFactor.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            Flash::error('Order Factor not found');

            return redirect(route('orderFactors.index'));
        }

        return view('order_factors.show')->with('orderFactor', $orderFactor);
    }

    /**
     * Show the form for editing the specified OrderFactor.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            Flash::error('Order Factor not found');

            return redirect(route('orderFactors.index'));
        }

        return view('order_factors.edit')->with('orderFactor', $orderFactor);
    }

    /**
     * Update the specified OrderFactor in storage.
     *
     * @param  int              $id
     * @param UpdateOrderFactorRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateOrderFactorRequest $request)
    {
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            Flash::error('Order Factor not found');

            return redirect(route('orderFactors.index'));
        }

        $orderFactor = $this->orderFactorRepository->update($request->all(), $id);

        Flash::success('Order Factor updated successfully.');

        return redirect(route('orderFactors.index'));
    }

    /**
     * Remove the specified OrderFactor from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $orderFactor = $this->orderFactorRepository->findWithoutFail($id);

        if (empty($orderFactor)) {
            Flash::error('Order Factor not found');

            return redirect(route('orderFactors.index'));
        }

        $this->orderFactorRepository->delete($id);

        Flash::success('Order Factor deleted successfully.');

        return redirect(route('orderFactors.index'));
    }
}
