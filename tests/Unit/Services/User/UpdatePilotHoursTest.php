<?php

namespace Tests\Unit\Services\User;

use App\Models\User;
use App\Services\User\UpdateUserHours;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdatePilotHoursTest extends TestCase
{
    use RefreshDatabase;

    protected UpdateUserHours $updateUserHours;
    protected Model $user;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->user = User::factory()->create([
            'flights_time' => 60,
            'flights' => 2
        ]);
        $this->updateUserHours = $this->app->make(UpdateUserHours::class);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_pilot_flight_time_updated()
    {
        ;
        $this->updateUserHours->execute(30, $this->user->id);
        $this->assertDatabaseHas('users', [
            'flights_time' => 90
        ]);
    }

    public function test_pilot_flights_count_updated()
    {
        ;
        $this->updateUserHours->execute(30, $this->user->id);
        $this->assertDatabaseHas('users', [
            'flights' => 3
        ]);
    }
}
