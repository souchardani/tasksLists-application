package com.souchar.tasks.mappers;

import com.souchar.tasks.domain.dto.TaskListDto;
import com.souchar.tasks.domain.entities.TaskList;

public interface TasksListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);

}
