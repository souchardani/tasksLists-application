package com.souchar.tasks.mappers;

import com.souchar.tasks.domain.dto.TaskDto;
import com.souchar.tasks.domain.entities.Task;

public interface TaskMapper {

    Task fromDto(TaskDto taskDto);

    TaskDto toDto(Task task);
}
