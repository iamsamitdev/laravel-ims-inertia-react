<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterTestController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return response()->json([
            'terms-of-service' => $request->input('terms-of-service'),
            'terms-of-service_type' => gettype($request->input('terms-of-service')),
            'terms-of-service_empty' => empty($request->input('terms-of-service')),
            'all_inputs' => $request->all()
        ]);
    }
}
