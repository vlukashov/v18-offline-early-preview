package com.example.application.data.service;

import com.example.application.data.entity.Person;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import javax.annotation.Nullable;

public interface PersonRepository extends JpaRepository<Person, Integer> {

}