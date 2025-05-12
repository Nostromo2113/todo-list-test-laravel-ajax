<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Task extends Model
{
    protected $guarded = false;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }


    protected static function booted()
    {
        static::creating(function ($task) {
            if (auth()->check()) {
                $max = static::where('user_id', auth()->id())->max('position');
                $task->position = is_null($max) ? 0 : $max + 1;
            }
        });

        static::deleting(function ($deletedTask) {
            static::where('user_id', $deletedTask->user_id)
                ->where('position', '>', $deletedTask->position)
                ->update([
                    'position' => DB::raw('position - 1')
                ]);
        });
    }
}
