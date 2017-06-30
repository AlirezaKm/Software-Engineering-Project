<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Product",
 *      required={""},
 *      @SWG\Property(
 *          property="code",
 *          description="code",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="factor",
 *          description="factor",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="category",
 *          description="category",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="subcategory",
 *          description="subcategory",
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
 *          property="buyPrice",
 *          description="buyPrice",
 *          type="number",
 *          format="float"
 *      ),
 *      @SWG\Property(
 *          property="sellPrice",
 *          description="sellPrice",
 *          type="number",
 *          format="float"
 *      )
 * )
 */
class Product extends Model
{
    use SoftDeletes;

    protected $primaryKey = "code";
    public $table = 'Product';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];

    public $fillable = [
        'factor',
        'name',
        'category',
        'subcategory',
        'count',
        'buyPrice',
        'sellPrice'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'code' => 'integer',
        'factor' => 'integer',
        'name' => 'string',
        'category' => 'integer',
        'subcategory' => 'integer',
        'count' => 'integer',
        'buyPrice' => 'float',
        'sellPrice' => 'float'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'factor' => 'required|numeric',
        'name' => 'required|string',
        'category' => 'required|numeric',
        'subcategory' => 'required|numeric',
        'count' => 'required|numeric',
        'buyPrice' => 'required',
        'sellPrice' => 'required'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class,'category');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function factor()
    {
        return $this->belongsTo(\App\Models\Factors::class,'factor');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function subCategory()
    {
        return $this->belongsTo(\App\Models\SubCategory::class,'subcategory');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function orders()
    {
        return $this->hasMany(\App\Models\Order::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function productProperties()
    {
        return $this->hasMany(\App\Models\ProductProperty::class);
    }
}
