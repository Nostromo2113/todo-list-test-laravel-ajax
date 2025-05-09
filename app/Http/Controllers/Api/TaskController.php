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
        $this->authorize('update', $task);

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
        $this->authorize('delete', $task);

        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
