<?php

namespace App\Http\Controllers\MarketPlace;

use App\Http\Controllers\Controller;
use App\Models\Aircraft;
use App\Models\Airport;
use App\Models\Fleet;
use App\Services\Airports\CalcDistanceBetweenPoints;
use App\Services\Airports\FindAirportsWithinDistance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ShowUsedAircraftController extends Controller
{
    protected CalcDistanceBetweenPoints $calcDistanceBetweenPoints;
    protected FindAirportsWithinDistance $findAirportsWithinDistance;

    public function __construct(CalcDistanceBetweenPoints $calcDistanceBetweenPoints, FindAirportsWithinDistance $findAirportsWithinDistance)
    {
        $this->calcDistanceBetweenPoints = $calcDistanceBetweenPoints;
        $this->findAirportsWithinDistance = $findAirportsWithinDistance;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($fleet): Response
    {
        $currentLocation = Airport::where('identifier', Auth::user()->current_airport_id)->first();
        $allAirports = $this->findAirportsWithinDistance->execute($currentLocation, 0, 200);
        $allAirportsId = $allAirports->pluck('identifier');
        $currentAircraftForSale = Aircraft::with('location', 'fleet', 'engines')
            ->where('owner_id', null)
            ->where('fleet_id', $fleet)
            ->whereIn('current_airport_id', $allAirportsId)
            ->get();

        $fleetDetail = Fleet::find($fleet);

        return Inertia::render('Marketplace/UsedAircraft', ['aircraft' => $currentAircraftForSale, 'currentLocation' => $currentLocation, 'fleet' => $fleetDetail]);
    }
}
