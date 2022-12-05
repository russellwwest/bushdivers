<?php

namespace Tests\Feature\Api\Tracker;

use App\Models\Aircraft;
use App\Models\AirlineFees;
use App\Models\Airport;
use App\Models\Contract;
use App\Models\ContractCargo;
use App\Models\Enums\AirlineTransactionTypes;
use App\Models\Enums\FinancialConsts;
use App\Models\Enums\TransactionTypes;
use App\Models\Fleet;
use App\Models\FlightLog;
use App\Models\Pirep;
use App\Models\PirepCargo;
use App\Models\Rental;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SubmitPirepRentalTest extends TestCase
{
    use RefreshDatabase;

    protected Model $user;
    protected Model $pirep;
    protected Model $pirepCargo;
    protected Model $contract;
    protected Model $contractCargo;
    protected Model $fleet;
    protected Model $aircraft;
    protected Model $booking;

    public function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->user = User::factory()->create([
            'rank_id' => 1,
            'flights_time' => 299,
            'points' => 49,
            'created_at' => Carbon::now()->addYears(-2)
        ]);
        $this->fleet = Fleet::factory()->create([
            'fuel_type' => 1,
            'size' => 'S'
        ]);
        $this->aircraft = Rental::factory()->create([
            'fleet_id' => $this->fleet->id,
            'fuel_onboard' => 50,
            'current_airport_id' => 'AYMR',
            'user_id' => $this->user->id
        ]);
        DB::table('cargo_types')->insert([
            ['type' => 1, 'text' => 'Solar Panels'],
            ['type' => 1, 'text' => 'Building materials'],
            ['type' => 2, 'text' => 'Medics'],
            ['type' => 2, 'text' => 'Locals'],
        ]);

        $this->contract = Contract::factory()->create([
            'contract_value' => 250.00,
            'dep_airport_id' => 'AYMR',
            'arr_airport_id' => 'AYMN'
        ]);

        $this->pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'destination_airport_id' => $this->contract->arr_airport_id,
            'departure_airport_id' => $this->contract->dep_airport_id,
            'aircraft_id' => $this->aircraft->id,
            'current_lat' => -6.14617,
            'current_lon' => 143.65733,
            'is_rental' => true
        ]);

        $this->pirepCargo = PirepCargo::factory()->create([
            'pirep_id' => $this->pirep->id,
            'contract_cargo_id' => $this->contract->id
        ]);

        Airport::factory()->create([
            'identifier' => 'AYMR'
        ]);
        Airport::factory()->create([
            'identifier' => 'AYMN'
        ]);

        FlightLog::factory()->create([
            'pirep_id' => $this->pirep->id,
            'lat' => -6.36263,
            'lon' => 143.23056
        ]);

        FlightLog::factory()->create([
            'pirep_id' => $this->pirep->id,
            'lat' => -6.14477,
            'lon' => 143.65752
        ]);

        AirlineFees::factory()->create([
            'fee_type' => AirlineTransactionTypes::FuelFees,
            'fee_name' => 'Avgas',
            'fee_amount' => 2.15
        ]);
        AirlineFees::factory()->create([
            'fee_type' => AirlineTransactionTypes::GroundHandlingFees,
            'fee_name' => 'Cargo Handling',
            'fee_weight' => 1,
            'fee_amount' => 0.15
        ]);
        AirlineFees::factory()->create([
            'fee_type' => AirlineTransactionTypes::LandingFees,
            'fee_name' => 'Landing Fees - Small',
            'fee_amount' => 35.00
        ]);
    }

    public function test_pirep_submitted_successfully()
    {
        Artisan::call('db:seed --class=RankSeeder');
        Sanctum::actingAs(
            $this->user,
            ['*']
        );
        $startTime = "05/10/2021 01:00:00";
        $endTime = "05/10/2021 01:45:00";

        $data = [
            'pirep_id' => $this->pirep->id,
            'fuel_used' => 25,
            'distance' => 76,
            'landing_rate' => -149.12,
            'block_off_time'=> $startTime,
            'block_on_time' => $endTime
        ];

        $response = $this->postJson('/api/pirep/submit', $data);

        $response->assertStatus(200);
    }

    public function test_fees_charged_to_pilot_for_rental()
    {
        Sanctum::actingAs(
            $this->user,
            ['*']
        );
        $startTime = "05/10/2021 01:00:00";
        $endTime = "05/10/2021 01:30:00";
        $fuelCost = 25 * 2.15;

        $data = [
            'pirep_id' => $this->pirep->id,
            'fuel_used' => 25,
            'distance' => 76,
            'landing_rate' => -149.12,
            'block_off_time'=> $startTime,
            'block_on_time' => $endTime
        ];

        $this->postJson('/api/pirep/submit', $data);

        $this->assertDatabaseHas('user_accounts', [
            'flight_id' => $this->pirep->id,
            'type' => TransactionTypes::FlightFeesFuel
        ]);

        $this->assertDatabaseHas('user_accounts', [
            'flight_id' => $this->pirep->id,
            'type' => TransactionTypes::FlightFeesLanding
        ]);

        $this->assertDatabaseHas('user_accounts', [
            'flight_id' => $this->pirep->id,
            'type' => TransactionTypes::FlightFeesGround
        ]);
    }

    public function test_rental_pilot_pay_correct()
    {
        Sanctum::actingAs(
            $this->user,
            ['*']
        );
        $startTime = "05/10/2021 01:00:00";
        $endTime = "05/10/2021 01:30:00";
        $companyPay = $this->contract->contract_value;
        $pilotPay = (FinancialConsts::PrivatePilotPay / 100) * $companyPay;

        $data = [
            'pirep_id' => $this->pirep->id,
            'fuel_used' => 25,
            'distance' => 76,
            'landing_rate' => -149.12,
            'block_off_time'=> $startTime,
            'block_on_time' => $endTime
        ];

        $this->postJson('/api/pirep/submit', $data);

        $this->assertDatabaseHas('user_accounts', [
            'flight_id' => $this->pirep->id,
            'type' => TransactionTypes::FlightPay,
            'total' => $pilotPay
        ]);
    }
}
