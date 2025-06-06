package com.example.backend.service.impl;

import com.example.backend.model.Work;
import com.example.backend.repository.IWorkRepository;
import com.example.backend.service.IWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class WorkService implements IWorkService {
    @Autowired
    private IWorkRepository workRepository;
    @Override
    public Work add(Work customer) {
        return workRepository.save(customer) ;
    }

    @Override
    public Work getById(Long id) {
        return workRepository.findById(id).get();
    }

    @Override
    public List<Work> getAll() {
        return workRepository.findAll();
    }

    @Override
    public Work update(Work customer) {
        return workRepository.save(customer);
    }

    @Override
    public void deleteById(Long id) {
workRepository.deleteById(id);
    }


}
