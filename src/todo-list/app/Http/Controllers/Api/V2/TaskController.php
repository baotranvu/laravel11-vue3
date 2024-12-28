<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Gate;
use App\Traits\ApiResponse;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use ApiResponse;
    public function index()
    {
        Gate::authorize('viewAny', Task::class);
        
        return $this->successResponse(
            TaskResource::collection(auth()->user()->tasks()->get()),
            'Tasks retrieved successfully',
            HttpStatus::OK
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $request->user()->tasks()->create($request->validated());

        return $this->successResponse(TaskResource::make($task), 'Task created successfully', HttpStatus::CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        Gate::authorize('view', $task);

        return $this->successResponse(TaskResource::make($task), 'Task retrieved successfully', HttpStatus::OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if ($request->user()->cannot('update', $task)) {
            return $this->errorResponse('You are not authorized to update this task', null, HttpStatus::UNAUTHORIZED);
        }
        $task->update($request->validated());

        return $this->successResponse(TaskResource::make($task), 'Task updated successfully', HttpStatus::OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return $this->successResponse(null, 'Task deleted successfully', HttpStatus::NO_CONTENT);
    }
}
