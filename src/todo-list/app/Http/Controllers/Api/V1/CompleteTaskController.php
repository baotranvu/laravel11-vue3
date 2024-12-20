<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class CompleteTaskController extends Controller
{
    public function __invoke(Request $request)
    {
        
        $task = Task::find($request->id);
        $task->is_completed = true;
        $task->save();

        return response()->json([
            'message' => 'Task completed',
        ]);
    }
}
