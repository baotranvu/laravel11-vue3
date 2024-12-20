<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $task = $request->user()->tasks()->find($request->task);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        $task->update([
            'is_completed' => true,
        ]);

        return response()->json([
            'message' => 'Task completed',
        ]);
    }
}
