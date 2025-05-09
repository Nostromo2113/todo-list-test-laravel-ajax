<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
            $max = static::max('position');
            $task->position = is_null($max) ? 0 : $max + 1;
        });
    }
}
