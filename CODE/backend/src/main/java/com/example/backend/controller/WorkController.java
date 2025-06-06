package com.example.backend.controller;

import com.example.backend.model.Work;
import com.example.backend.service.IWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class WorkController {
    @Autowired
    private IWorkService workService;

    @PostMapping("/work")
    private ResponseEntity<?> addWork(@RequestBody Work customer) {
        HashMap<String, String> res = new HashMap<>();
        try {
            SimpleDateFormat simpleDateFormat
                    = new SimpleDateFormat("HH:mm");
            Date date1 = simpleDateFormat.parse(customer.getOutTime());
            Date date2 = simpleDateFormat.parse(customer.getInTime());
            long differenceInMilliSeconds
                    = Math.abs(date2.getTime() - date1.getTime());
            long differenceInHours
                    = (differenceInMilliSeconds / (60 * 60 * 1000))
                    % 24;
            long differenceInMinutes
                    = (differenceInMilliSeconds / (60 * 1000)) % 60;
            System.out.println(
                    "Difference is " + differenceInHours + " hours "
                            + differenceInMinutes + " minutes ");
            Work work= Work.builder()
                    .day(customer.getDay())
                    .month(customer.getMonth())
                    .activity(customer.getActivity())
                    .employeeName(customer.getEmployeeName())
                    .year(customer.getYear())
                    .inTime(customer.getInTime())
                    .outTime(customer.getOutTime())
                    .workingHours(differenceInHours)
                    .workingMinutes(differenceInMinutes)
                    .build();
            workService.add(work);
            res.put("msg", "daily work added successfully");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/work")
    private ResponseEntity<?> getAll() {
        HashMap<String, String> res = new HashMap<>();
        try {

            return new ResponseEntity<>(workService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/work/{id}")
    private ResponseEntity<?> getById(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {

            return new ResponseEntity<>(workService.getById(id), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/getWorkByDate/{fromDate}/{toDate}/{id}")
    private ResponseEntity<?> getWorkByDate(@PathVariable Integer fromDate,@PathVariable Integer toDate,@PathVariable String id){
        HashMap<String, String> res = new HashMap<>();
        try{
            List<Work>  work=workService.getAll().stream().filter(i->i.getEmployeeName().equals(id)).toList();

            List<Work> works = work.stream().filter(i -> i.getDay() >= fromDate && i.getDay() <= toDate).toList();
            return new ResponseEntity<>(works, HttpStatus.OK);
        }catch (Exception e){
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/works/{id}")
    private ResponseEntity<?> filterWorkByName(@PathVariable String id) {
        HashMap<String, String> res = new HashMap<>();
        try {
          List<Work>  work=workService.getAll().stream().filter(i->i.getEmployeeName().equals(id)).toList();

            return new ResponseEntity<>(work, HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}