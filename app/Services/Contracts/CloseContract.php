<?php

namespace App\Services\Contracts;

use App\Models\Contract;

class CloseContract
{
    public function execute($contractId)
    {
        $contract = Contract::find($contractId);
        $contract->is_available = 0;
        $contract->user_id = null;
        $contract->save();
    }
}
