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

        $data = $request->validated();

        DB::transaction(function () use ($data, $task): void {
            $oldPosition = $task->position;
            $newPosition = $data['position'];

            if ($oldPosition < $newPosition) {
                Task::where('position', '>', $oldPosition)
                    ->where('position', '<=', $newPosition)
                    ->decrement('position');
            } elseif ($oldPosition > $newPosition) {
                Task::where('position', '>=', $newPosition)
                    ->where('position', '<', $oldPosition)
                    ->increment('position');
            }

            $task->position = $newPosition;
            $task->save();
        });

        return response()->json([
            'success' => true,
            'message' => 'Position updated'
        ]);
    }
}
