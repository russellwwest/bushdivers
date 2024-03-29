<?php

namespace App\Http\Controllers\Scheduler\Contracts;

use App\Http\Controllers\Controller;
use App\Services\Contracts\CheckForExpiry;
use App\Services\General\LogSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CheckForExpiredContractsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, CheckForExpiry $checkForExpiry, LogSchedule $logSchedule): JsonResponse
    {
        try {
            $checkForExpiry->execute();
            $logSchedule->execute('check-expiry', true);
            return response()->json(['message' => 'Successfully processed expired contract cleanse']);
        } catch (\Exception $exception) {
            $logSchedule->execute('check-expiry', false);
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }
}
