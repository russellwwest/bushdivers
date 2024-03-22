<?php

namespace Tests\Unit\Services\Airport;

use App\Models\Airport;
use App\Services\Airports\CalcCostOfJumpseat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CostOfJumpseatTest extends TestCase
{
    use RefreshDatabase;

    protected Model $fromAirport;
    protected Model $toAirport;
    protected CalcCostOfJumpseat $calcCostOfJumpseat;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->fromAirport = Airport::factory()->create([
            'is_hub' => false
        ]);
        $this->toAirport = Airport::factory()->create([
            'identifier' => 'AYMH',
            'name' => 'Mount hagen',
            'lat' => -5.82781,
            'lon' => 144.29953,
            'is_hub' => false
        ]);

        $this->calcCostOfJumpseat = $this->app->make(CalcCostOfJumpseat::class);
    }
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_jumpseat_calculated()
    {
        $data = $this->calcCostOfJumpseat->execute('AYMR', 'AYMH');
        $expected = round(71.4 * 0.25, 2);
        $this->assertEquals($expected, $data['cost']);
    }

    public function test_jumpseat_calculated_between_hubs_free()
    {
        $fromAirport = Airport::factory()->create([
            'identifier' => 'AYMG',
            'is_hub' => true,
        ]);
        $toAirport = Airport::factory()->create([
            'identifier' => 'AYMN',
            'name' => 'Mount hagen',
            'lat' => -5.82781,
            'lon' => 144.29953,
            'is_hub' => true
        ]);
        $data = $this->calcCostOfJumpseat->execute('AYMG', 'AYMN');
        $this->assertEquals(0.00, $data['cost']);
    }

    public function test_jumpseat_invalid_icao_handled()
    {
        $this->expectException(ModelNotFoundException::class);
        $this->calcCostOfJumpseat->execute('AYMR', 'EGLL');
    }
}
