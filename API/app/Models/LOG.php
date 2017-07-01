<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @SWG\Definition(
 *      definition="LOG",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="description",
 *          description="description",
 *          type="string"
 *      )
 * )
 */
class LOG extends Model
{
    use SoftDeletes;

    public $table = 'logs';
    public static $log_is_on = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'title',
        'description'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'title' => 'string',
        'description' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    public static function info($title,$message = ""){
        if(!self::$log_is_on)
            return;
        $time = Carbon::now();
        $msg = [
            'title' => $title,
            'description' => sprintf("[%s][%s][INFO]: %s",$time->timestamp,$time,$message)
        ];
        DB::table('logs')->insert($msg);
    }

    public static function infoReq($title ,Request $request){
        self::info($title , sprintf("URL: %s , METHOD: %s , HEADER: %s , PARAM: %s , FROM: %s",$request->url(),$request->method(),json_encode($request->header()),sprintf("[%s]",json_encode($request->all(),true)),$request->ip()));
    }

    public static function error($title,$message = ""){
        if(!self::$log_is_on)
            return;
        $time = Carbon::now();
        $msg = [
            'title' => $title,
            'description' => sprintf("[%s][%s][ERR]: %s",$time->timestamp,$time,$message)
        ];
        DB::table('logs')->insert($msg);
    }

    public static function errorReq($title ,Request $request){
        self::error($title ,sprintf("URL: %s , METHOD: %s , HEADER: %s , PARAM: %s , FROM: %s",$request->url(),$request->method(),json_encode($request->header()),sprintf("[%s]",json_encode($request->all(),true)),$request->ip()));
    }
}
