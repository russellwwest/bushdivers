<?php

namespace App\Http\Controllers\Contracts;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ShowActiveContractsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request): Response
    {
//        $customContracts = Contract::with('depAirport', 'arrAirport')
//            ->where('is_completed', false)
//            ->where('is_available', false)
//            ->where('user_id', Auth::user()->id)
//            ->orderBy('dep_airport_id', 'asc')
//            ->orderBy('heading', 'asc')
//            ->get();

        $contracts = Contract::with('depAirport', 'arrAirport', 'currentAirport')
            ->where('is_completed', false)
            ->where('is_available', false)
            ->where('is_custom', false)
            ->where('contract_type_id', 1)
//            ->where('user_id', null)
            ->orderBy('dep_airport_id', 'asc')
            ->orderBy('heading', 'asc')
            ->get();

//        $community = Contract::with('depAirport', 'arrAirport')
//            ->where('is_completed', false)
//            ->where('is_available', false)
//            ->where('contract_type_id', 3)
//            ->where('user_id', null)
//            ->orderBy('dep_airport_id', 'asc')
//            ->orderBy('heading', 'asc')
//            ->get();

        $user = User::find(Auth::user()->id);
        $location = $user->location;

        return Inertia::render('Contracts/MyContracts', ['contracts' => $contracts, 'location' => $location]);
    }
}
