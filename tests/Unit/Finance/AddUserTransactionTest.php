<?php

namespace Tests\Unit\Finance;

use App\Models\Enums\TransactionTypes;
use App\Models\User;
use App\Services\Finance\AddUserTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AddUserTransactionTest extends TestCase
{
    use RefreshDatabase;

    protected Model $user;
    protected AddUserTransaction $addUserTransaction;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        $this->user = User::factory()->create();
        $this->addUserTransaction = $this->app->make(AddUserTransaction::class);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_credit_is_added()
    {
        $this->addUserTransaction->execute($this->user->id, TransactionTypes::Bonus, 500);
        $this->assertDatabaseHas('user_accounts', [
            'user_id' => $this->user->id,
            'type' => TransactionTypes::Bonus,
            'total' => 500
        ]);
    }

    public function test_debit_is_added()
    {
        $this->addUserTransaction->execute($this->user->id, TransactionTypes::Jumpseat, -500);
        $this->assertDatabaseHas('user_accounts', [
            'user_id' => $this->user->id,
            'type' => TransactionTypes::Jumpseat,
            'total' => -500
        ]);
    }
}
