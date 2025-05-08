<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreRequest;
use App\Http\Requests\Task\UpdateRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class TaskController extends Controller
{
    public function index(): Collection
    {
        return Auth::user()
            ->tasks()
            ->orderBy('position')
            ->with('tags')
            ->get();
    }

    public function show(Task $task): JsonResponse
    {
        return response()->json($task->load('tags'));
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $data = $request->validated();

        $task = Auth::user()->tasks()->create([
            'title' => $data['title'],
            'text' => $data['text'] ?? null,
        ]);

        if (!empty($data['tags'])) {
            $task->tags()->attach($data['tags']);
        }

        return response()->json($task->load('tags'), 201);
    }

    public function update(UpdateRequest $request, Task $task): JsonResponse
    {
        // Желательно использовать политики. Я их активно использую в своем проекте, но ради одной проверки посчитал избыточным
        if ($task->user_id !== auth()->id()) {
            abort(403, 'You are not authorized to update this task.');
        }

        $data = $request->validated();

        $task->update([
            'title' => $data['title'],
            'text' => $data['text'] ?? null,
        ]);

        if (isset($data['tags'])) {
            $task->tags()->sync($data['tags']);
        }

        return response()->json($task->load('tags'));
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
