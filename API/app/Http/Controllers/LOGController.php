<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLOGRequest;
use App\Http\Requests\UpdateLOGRequest;
use App\Repositories\LOGRepository;
use Illuminate\Http\Request;
use Flash;
use InfyOm\Generator\Controller\AppBaseController;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

class LOGController extends AppBaseController
{
    /** @var  LOGRepository */
    private $lOGRepository;

    public function __construct(LOGRepository $lOGRepo)
    {
        $this->lOGRepository = $lOGRepo;
    }

    /**
     * Display a listing of the LOG.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->lOGRepository->pushCriteria(new RequestCriteria($request));
        $lOGS = $this->lOGRepository->all();

        return view('l_o_g_s.index')
            ->with('lOGS', $lOGS);
    }

    /**
     * Show the form for creating a new LOG.
     *
     * @return Response
     */
    public function create()
    {
        return view('l_o_g_s.create');
    }

    /**
     * Store a newly created LOG in storage.
     *
     * @param CreateLOGRequest $request
     *
     * @return Response
     */
    public function store(CreateLOGRequest $request)
    {
        $input = $request->all();

        $lOG = $this->lOGRepository->create($input);

        Flash::success('L O G saved successfully.');

        return redirect(route('lOGS.index'));
    }

    /**
     * Display the specified LOG.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            Flash::error('L O G not found');

            return redirect(route('lOGS.index'));
        }

        return view('l_o_g_s.show')->with('lOG', $lOG);
    }

    /**
     * Show the form for editing the specified LOG.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            Flash::error('L O G not found');

            return redirect(route('lOGS.index'));
        }

        return view('l_o_g_s.edit')->with('lOG', $lOG);
    }

    /**
     * Update the specified LOG in storage.
     *
     * @param  int              $id
     * @param UpdateLOGRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateLOGRequest $request)
    {
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            Flash::error('L O G not found');

            return redirect(route('lOGS.index'));
        }

        $lOG = $this->lOGRepository->update($request->all(), $id);

        Flash::success('L O G updated successfully.');

        return redirect(route('lOGS.index'));
    }

    /**
     * Remove the specified LOG from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $lOG = $this->lOGRepository->findWithoutFail($id);

        if (empty($lOG)) {
            Flash::error('L O G not found');

            return redirect(route('lOGS.index'));
        }

        $this->lOGRepository->delete($id);

        Flash::success('L O G deleted successfully.');

        return redirect(route('lOGS.index'));
    }
}
