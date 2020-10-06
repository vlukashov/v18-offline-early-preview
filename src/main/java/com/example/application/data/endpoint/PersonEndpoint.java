package com.example.application.data.endpoint;


import com.example.application.data.CrudEndpoint;
import com.example.application.data.entity.Person;
import com.example.application.data.service.PersonService;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.Deferrable;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
public class PersonEndpoint extends CrudEndpoint<Person, Integer> {

    private PersonService service;

    public PersonEndpoint(@Autowired PersonService service) {
        this.service = service;
    }

    @Override
    protected PersonService getService() {
        return service;
    }
}
