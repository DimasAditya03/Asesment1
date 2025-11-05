<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'asc')->paginate(10);
    
        return response()->json([
            'results' => $users,
        ], 200);
    }

    public function store(UserStoreRequest $request)
    {
        try {
            //CreateUser
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
            ]);

            return response()->json(
                [
                    'message' => 'User Successfuly Created.',
                ],
                200,
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Something went really wrong',
                ],
                500,
            );
        }
    }

    public function show($id)
    {
        $users = User::find($id);
        if (!$users) {
            return response()->json(
                [
                    'message' => 'User not found.',
                ],
                404,
            );
        }

        return response()->json($users, 200);

        return response()->json(
            [
                'users' => $users,
            ],
            200,
        );
    }

    public function update(UserStoreRequest $request, $id)
    {
        try {
            $users = User::find($id);
            if (!$users) {
                return response()->json(
                    [
                        'message' => 'User not found.',
                    ],
                    404,
                );
            }

            $users->name = $request->name;
            $users->email = $request->email;

            $users->save();

            return response()->json(
                [
                    'message' => 'User Successfully Updated.',
                ],
                200,
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Something went really wrong!',
                ],
                500,
            );
        }
    }

    public function destroy($id)
    {
        $users = User::find($id);
        if (!$users) {
            return response()->json(
                [
                    'message' => 'User not found.',
                ],
                404,
            );
        }

        $users->delete();

        return response()->json(
            [
                'message' => 'User Sucessfully Deleted.',
            ],
            200,
        );
    }
}
