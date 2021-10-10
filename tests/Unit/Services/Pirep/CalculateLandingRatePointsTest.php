<?php

namespace Tests\Unit\Services\Pirep;

use App\Models\Enums\PointsType;
use App\Services\PirepService;
use PHPUnit\Framework\TestCase;

class CalculateLandingRatePointsTest extends TestCase
{
    protected PirepService $pirepService;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->pirepService = new PirepService();
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_landing_rate_m600()
    {
        $expected = PointsType::LANDING_RATE_M600_M500;
        $actual = $this->pirepService->calculateLandingRatePoints(-600);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_m499()
    {
        $expected = PointsType::LANDING_RATE_M499_M300;
        $actual = $this->pirepService->calculateLandingRatePoints(-499);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_m299()
    {
        $expected = PointsType::LANDING_RATE_M299_M200;
        $actual = $this->pirepService->calculateLandingRatePoints(-299);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_m199()
    {
        $expected = PointsType::LANDING_RATE_M199_M151;
        $actual = $this->pirepService->calculateLandingRatePoints(-199);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_m149()
    {
        $expected = PointsType::LANDING_RATE_M149_M100;
        $actual = $this->pirepService->calculateLandingRatePoints(-149);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_m99()
    {
        $expected = PointsType::LANDING_RATE_M99_300;
        $actual = $this->pirepService->calculateLandingRatePoints(-99);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_150()
    {
        $expected = PointsType::LANDING_RATE_PERFECT;
        $actual = $this->pirepService->calculateLandingRatePoints(150);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_301()
    {
        $expected = PointsType::LANDING_RATE_301_500;
        $actual = $this->pirepService->calculateLandingRatePoints(301);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_501()
    {
        $expected = PointsType::LANDING_RATE_M600_M500;
        $actual = $this->pirepService->calculateLandingRatePoints(501);
        $this->assertEquals($expected, $actual['points']);
    }

    public function test_landing_rate_900()
    {
        $expected = 0;
        $actual = $this->pirepService->calculateLandingRatePoints(900);
        $this->assertEquals($expected, $actual['points']);
    }
}