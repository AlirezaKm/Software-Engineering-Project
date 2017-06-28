<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use InfyOm\Generator\Utils\ResponseUtil;
use Laravel\Passport\ClientRepository;
use App\Http\Messages\Farsi;
use Response;
use Validator;

class AuthController extends Controller
{
    public function login(Request $req){
        $validator = Validator::make($req->input(),[
            'username' => 'required',
            'password' => 'required'
        ]);
        if($validator->fails()){
            return Response::json(ResponseUtil::makeError($validator->messages()));
        }

        $input_info = [
            'email'     => trim($req->input('username')),
            'password'  => trim($req->input('password'))
        ];

        if(Auth::attempt($input_info) == false){
            return Response::json(ResponseUtil::makeError(Farsi::$USER_NOT_FOUND));
        }else {
            $user = Auth::user();
            $client = DB::table('oauth_clients')->where('user_id', $user->id)->first();
            if ($client === null) {
                $client = (new ClientRepository)->createPersonalAccessClient(
                    $user->id,
                    $user->fname . " " . $user->lname . " Client",
                    "http://localhost"
                );
            }
            DB::table('oauth_access_tokens')->where('user_id', $user->id)->where('revoked', 0)->update(['revoked' => 1]);

            $token = $user->createToken($user->fname . " " . $user->lname . " Token", [UserType::where('id',$user->type)->first()->name]);

            return Response::json(ResponseUtil::makeResponse(Farsi::$USER_LOGGED_IN, [
                'client_id' => $client->id,
                'secret' => $client->secret,
                'access_token' => $token->accessToken,
                'redirect' => "/"
            ]));
        }
    }

    function register(Request $req){
        $validator = Validator::make($req->input(),[
            'fname' => 'alpha',
            'lname' => 'alpha',
            'email' => 'required|email|unique:users,email,'.$req->input('email'),
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
            'type'      => 'numeric|exists:userTypes,id'
        ]);
        if($validator->fails()){
            return Response::json(ResponseUtil::makeError($validator->messages()));
        }

        $user = (new User)->forceFill([
            'fname'         => trim($req->input('fname')),
            'lname'         => trim($req->input('lname')),
            'email'         => trim($req->input('email')),
            'password'      => bcrypt(trim($req->input('password'))),
            'type'          => trim($req->input('type'))
        ]);
        $user->save();

        // Get client_id & client_secret
        $client = (new ClientRepository)->createPersonalAccessClient(
            $user->id,
            $user->fname." ".$user->lname." Client",
            "http://localhost"
        );

        return Response::json(ResponseUtil::makeResponse(Farsi::$USER_REGISTERED, $user));
    }
}
