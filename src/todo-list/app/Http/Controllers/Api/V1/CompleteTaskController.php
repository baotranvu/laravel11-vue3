<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class CompleteTaskController extends Controller
{
    use ApiResponse;
    public function __invoke(Request $request)
    {
        $task = Task::find($request->id);
        $task->is_completed = !$task->is_completed;
        $task->save();

        return $this->successResponse(null, 'Task completed', HttpStatus::OK);
    }
}
