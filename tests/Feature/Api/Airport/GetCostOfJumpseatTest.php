<?php

namespace Tests\Feature\Api\Airport;

use App\Models\Airport;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetCostOfJumpseatTest extends TestCase
{
    use RefreshDatabase;

    protected Model $fromAirport;
    protected Model $toAirport;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->fromAirport = Airport::factory()->create();
        $this->toAirport = Airport::factory()->create([
            'identifier' => 'AYMH',
            'name' => 'Mount hagen',
            'lat' => -5.82781,
            'lon' => 144.29953
        ]);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_cost_returned_successfully()
    {
        $response = $this->getJson('/api/jumpseat/cost/'.$this->fromAirport->identifier.'/'.$this->toAirport->identifier);
        $response->assertStatus(200);
    }

    public function test_cost_is_correct()
    {
        $response = $this->getJson('/api/jumpseat/cost/'.$this->fromAirport->identifier.'/'.$this->toAirport->identifier);
        $cost = round(71.4 * 0.25,2);
        $response->assertJson(['cost' => $cost]);
    }

    public function test_invalid_airport_fails()
    {
        $response = $this->getJson('/api/jumpseat/cost/'.$this->fromAirport->identifier.'/EGLL');
        $response->assertStatus(404);
    }
}