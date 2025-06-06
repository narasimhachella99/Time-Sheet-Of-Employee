package com.example.backend.service;

import com.example.backend.model.Employee;
import com.example.backend.model.Work;

import java.util.List;

public interface IWorkService {
    Work add(Work customer);

    Work getById(Long id);

    List<Work> getAll();

    Work update(Work customer);

    void deleteById(Long id);


}
