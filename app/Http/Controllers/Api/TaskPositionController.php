<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\PositionRequest;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\JsonResponse;

class TaskPositionController extends Controller
{

    public function update(PositionRequest $request, Task $task): JsonResponse
    {
        $this->authorize('update', $task);

        $user = auth()->user();
        $data = $request->validated();
        $oldPosition = $task->position;
        $newPosition = $data['position'];

        if ($oldPosition === $newPosition) {
            return response()->json(['success' => true, 'message' => 'Position unchanged']);
        }

        DB::transaction(function () use ($oldPosition, $newPosition, $task, $user) {
            if ($newPosition < $oldPosition) {
                $user->tasks()
                    ->where('position', '>=', $newPosition)
                    ->where('position', '<', $oldPosition)
                    ->increment('position');
            } elseif ($newPosition > $oldPosition) {
                $user->tasks()
                    ->where('position', '<=', $newPosition)
                    ->where('position', '>', $oldPosition)
                    ->decrement('position');
            }

            $task->update(['position' => $newPosition]);
        });

        return response()->json(['success' => true, 'message' => 'Position updated']);
    }
}
