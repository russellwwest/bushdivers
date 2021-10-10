<?php

namespace Tests\Unit\Services\User;

use App\Models\Rank;
use App\Models\User;
use App\Services\RankService;
use App\Services\UserService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class CheckRankTest extends TestCase
{
    use RefreshDatabase;

    protected RankService $rankService;
    protected Model $user;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        Artisan::call('db:seed --class=RankSeeder');
        $this->user = User::factory()->create([
            'rank_id' => 1,
            'flights_time' => 301, // mins
            'points' => 51
        ]);
        $this->rankService = new RankService();
    }
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_rank_gets_updated()
    {
        $this->rankService->checkRank($this->user->id);
        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'rank_id' => 2
        ]);
    }

    public function test_rank_does_not_get_updated()
    {
        $user = User::factory()->create([
            'rank_id' => 1,
            'flights_time' => 298, // mins
            'points' => 55
        ]);

        $this->rankService->checkRank($user->id);
        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'rank_id' => 1
        ]);
    }


}