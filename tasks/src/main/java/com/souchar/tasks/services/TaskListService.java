package com.souchar.tasks.services;

import com.souchar.tasks.domain.entities.TaskList;

import java.util.List;

public interface TaskListService {


    List<TaskList> listTaskList();

    TaskList createTaskList(TaskList taskList);
}
