<?php

namespace App\Services\Contracts;

use App\Models\Contract;
use App\Models\Enums\AirlineTransactionTypes;
use App\Models\Enums\FinancialConsts;
use App\Models\Enums\TransactionTypes;
use App\Services\Finance\AddAirlineTransaction;
use App\Services\Finance\AddUserTransaction;
use Carbon\Carbon;

class CheckForExpiry
{
    protected AddAirlineTransaction $addAirlineTransaction;
    protected AddUserTransaction $addUserTransaction;
    protected CloseContract $closeContract;
    public function __construct(AddAirlineTransaction $addAirlineTransaction, AddUserTransaction $addUserTransaction, CloseContract $closeContract)
    {
        $this->addUserTransaction = $addUserTransaction;
        $this->addAirlineTransaction = $addAirlineTransaction;
        $this->closeContract = $closeContract;
    }

    public function execute()
    {
        $contracts = Contract::where('expires_at', '<', Carbon::now())
            ->get();

        foreach ($contracts as $contract) {
            $inProgress = 0;
            if ($contract->active_pirep != null) {
                $inProgress = 1;
            }

            // close contract
            if (!$inProgress) {
                $this->closeContract->execute($contract->id);
            }
        }
    }
}
