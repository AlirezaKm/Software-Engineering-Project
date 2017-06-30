<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Order",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="product",
 *          description="product",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="count",
 *          description="count",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="orderFactor",
 *          description="orderFactor",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Order extends Model
{
    use SoftDeletes;

    public $table = 'Order';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'product',
        'count',
        'orderFactor'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'product' => 'integer',
        'count' => 'integer',
        'orderFactor' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'product' => 'required|numeric',
        'count' => 'required|numeric',
        'orderFactor' => 'required|numeric'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function OrderFactor()
    {
        return $this->belongsTo(\App\Models\OrderFactor::class,'orderFactor');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class,'product');
    }
}
