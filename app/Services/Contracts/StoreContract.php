<?php

namespace App\Services\Contracts;

use App\Models\Contract;
use App\Models\ContractCargo;
use App\Models\ContractInfo;
use App\Models\Enums\ContractType;
use Carbon\Carbon;

class StoreContract
{
    public function execute(ContractInfo $data, $expiry, $userId)
    {
        $cargo = $data->getCargo();
        $contract = new Contract();
        $contract->contract_type_id = 1;
        $contract->dep_airport_id = $data->getStart();
        $contract->current_airport_id = $data->getStart();
        $contract->arr_airport_id = $data->getDest();
        $contract->distance = $data->getDistance();
        $contract->contract_value = $data->getValue();
        $contract->heading = $data->getHeading();
        $contract->expires_at = $expiry;
        $contract->is_available = 0;
        $contract->cargo_type_id = $cargo['type'];
        $contract->cargo_qty = $cargo['qty'];
        $contract->cargo = $cargo['name'];
        $contract->accepted_by = $userId;
        if ($data->getCustom()) {
            $contract->user_id = $data->getUserId();
        }

        $contract->save();
    }
}
