<?php

namespace App\Http\Requests\API;

use App\Models\LOG;
use InfyOm\Generator\Request\APIRequest;

class UpdateLOGAPIRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return LOG::$rules;
    }
}
