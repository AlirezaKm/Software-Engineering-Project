<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFactorsRequest;
use App\Http\Requests\UpdateFactorsRequest;
use App\Repositories\FactorsRepository;
use InfyOm\Generator\Controller\AppBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

class FactorsController extends AppBaseController
{
    /** @var  FactorsRepository */
    private $factorsRepository;

    public function __construct(FactorsRepository $factorsRepo)
    {
        $this->factorsRepository = $factorsRepo;
    }

    /**
     * Display a listing of the Factors.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->factorsRepository->pushCriteria(new RequestCriteria($request));
        $factors = $this->factorsRepository->all();

        return view('factors.index')
            ->with('factors', $factors);
    }

    /**
     * Show the form for creating a new Factors.
     *
     * @return Response
     */
    public function create()
    {
        return view('factors.create');
    }

    /**
     * Store a newly created Factors in storage.
     *
     * @param CreateFactorsRequest $request
     *
     * @return Response
     */
    public function store(CreateFactorsRequest $request)
    {
        $input = $request->all();

        $factors = $this->factorsRepository->create($input);

        Flash::success('Factors saved successfully.');

        return redirect(route('factors.index'));
    }

    /**
     * Display the specified Factors.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            Flash::error('Factors not found');

            return redirect(route('factors.index'));
        }

        return view('factors.show')->with('factors', $factors);
    }

    /**
     * Show the form for editing the specified Factors.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            Flash::error('Factors not found');

            return redirect(route('factors.index'));
        }

        return view('factors.edit')->with('factors', $factors);
    }

    /**
     * Update the specified Factors in storage.
     *
     * @param  int              $id
     * @param UpdateFactorsRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateFactorsRequest $request)
    {
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            Flash::error('Factors not found');

            return redirect(route('factors.index'));
        }

        $factors = $this->factorsRepository->update($request->all(), $id);

        Flash::success('Factors updated successfully.');

        return redirect(route('factors.index'));
    }

    /**
     * Remove the specified Factors from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $factors = $this->factorsRepository->findWithoutFail($id);

        if (empty($factors)) {
            Flash::error('Factors not found');

            return redirect(route('factors.index'));
        }

        $this->factorsRepository->delete($id);

        Flash::success('Factors deleted successfully.');

        return redirect(route('factors.index'));
    }
}
