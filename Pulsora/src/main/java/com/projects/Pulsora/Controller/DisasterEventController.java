package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Service.DisasterEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/disaster-events")
public class DisasterEventController
{
    private final DisasterEventService disasterEventService;

    public DisasterEventController(DisasterEventService disasterEventService)
    {
        this.disasterEventService = disasterEventService;
    }
    @PostMapping({"", "/"})    public ResponseEntity<DisasterEvent> create(@RequestBody DisasterEvent disasterEvent)
    {
        DisasterEvent created  = disasterEventService.createEventAndNotify(disasterEvent);
        return ResponseEntity.ok(created);
    }
    @GetMapping({"", "/"})    public List<DisasterEvent> getAllEvents()
    {
        return disasterEventService.getAllEvents();
    }
    @GetMapping("/{id}")
    public ResponseEntity<DisasterEvent> getEventById(@PathVariable long id) {
        return disasterEventService.getAllEventsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
