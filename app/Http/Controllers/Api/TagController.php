<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\StoreRequest;
use App\Http\Requests\Tag\UpdateRequest;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Collection;

class TagController extends Controller
{
    public function index(): Collection
    {
        return Tag::all();
    }

    public function show(Tag $tag): Tag
    {
        return $tag;
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $data = $request->validated();

        $tag = Tag::create([
            'title' => $data['title'],
        ]);

        return response()->json($tag, 201);
    }

    public function update(UpdateRequest $request, Tag $tag): JsonResponse
    {
        $data = $request->validated();

        $tag->update([
            'title' => $data['title'],
        ]);

        return response()->json($tag);
    }

    public function destroy(Tag $tag): JsonResponse
    {
        $tag->delete();

        return response()->json(['message' => 'Tag deleted.']);
    }
}
