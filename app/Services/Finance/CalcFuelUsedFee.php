<?php

namespace App\Services\Finance;

use App\Models\Aircraft;
use App\Models\AirlineFees;
use App\Models\Enums\AirlineTransactionTypes;
use App\Models\Enums\TransactionTypes;

class CalcFuelUsedFee
{
    protected AddAirlineTransaction $addAirlineTransaction;
    protected AddUserTransaction $addUserTransaction;

    public function __construct(
        AddAirlineTransaction $addAirlineTransaction,
        AddUserTransaction $addUserTransaction
    )
    {
        $this->addAirlineTransaction = $addAirlineTransaction;
        $this->addUserTransaction = $addUserTransaction;
    }

    public function execute($pirep)
    {
        $aircraft = Aircraft::with('fleet')->find($pirep->aircraft_id);
        $fuelType = $aircraft->fleet->fuel_type == 1 ? 'Avgas' : 'Jet Fuel';
        $fuelCost = AirlineFees::where('fee_name', $fuelType)->first();

        $fuelUsedCost = $fuelCost->fee_amount * $pirep->fuel_used;
        // TODO: if negative, 0 fuel fee for company, and charge pilot for fuel
        if ($fuelUsedCost < 0) {
            if (!$aircraft->is_rental) {
                $this->addAirlineTransaction->execute(AirlineTransactionTypes::FuelFees, $fuelUsedCost, 'Fuel Cost', $pirep->id);
                $this->addAirlineTransaction->execute(AirlineTransactionTypes::FuelFees, $fuelUsedCost, 'Fuel Cost Paid by Pilot', $pirep->id, 'credit');

                // add line to pilot transactions
                $this->addUserTransaction->execute($pirep->user_id, TransactionTypes::FuelPenalty, -$fuelUsedCost, $pirep->id);
            } else {
                // add line to pilot transactions
                $this->addUserTransaction->execute($pirep->user_id, TransactionTypes::FlightFeesFuel, -$fuelUsedCost, $pirep->id);
            }

        } else {
            if (!$aircraft->is_rental) {
                $this->addAirlineTransaction->execute(AirlineTransactionTypes::FuelFees, $fuelUsedCost, 'Fuel Cost', $pirep->id);
            } else {
                $this->addUserTransaction->execute($pirep->user_id, TransactionTypes::FlightFeesFuel, -$fuelUsedCost, $pirep->id);
            }
        }
    }
}