<?php

namespace App\Events;

use App\Models\Pirep;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PirepFiled
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public $pirep;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Pirep $pirep)
    {
        $this->pirep = $pirep;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
