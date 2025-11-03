package com.souchar.tasks.Controllers;


import com.souchar.tasks.domain.dto.TaskListDto;
import com.souchar.tasks.domain.entities.TaskList;
import com.souchar.tasks.mappers.TasksListMapper;
import com.souchar.tasks.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/tasks-lists")
public class TaskListController {

    private TaskListService taskListService;
    private TasksListMapper tasksListMapper;

    public TaskListController(TaskListService taskListService, TasksListMapper tasksListMapper) {
        this.taskListService = taskListService;
        this.tasksListMapper = tasksListMapper;
    }

    @GetMapping
    public List<TaskListDto> listTaskLists() {
       return taskListService.listTaskList().stream()
                .map(tasksListMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto) {
        TaskList createdTaskList = taskListService.createTaskList(tasksListMapper.fromDto(taskListDto));
        return tasksListMapper.toDto(createdTaskList);
    }
}
