// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract TodoList{
    uint public taskCount;
    

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );
    
    event TaskUpdated(
        uint id,
        string newContent
    );

    constructor() {
        createTask("First dApp project by Emoshimo");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleTask(uint taskId) public {
        Task memory _task = tasks[taskId];
        _task.completed = !_task.completed;
        tasks[taskId] = _task;
        emit TaskCompleted(taskId, _task.completed);
    }

    function updateTask(uint taskId, string memory newContent) public {
        Task memory _task = tasks[taskId];
        _task.content = newContent;
        tasks[taskId] = _task;
        emit TaskUpdated(taskId, newContent);
    }


}