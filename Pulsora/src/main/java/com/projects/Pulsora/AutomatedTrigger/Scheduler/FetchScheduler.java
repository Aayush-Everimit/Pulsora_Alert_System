package com.projects.Pulsora.AutomatedTrigger.Scheduler;

import com.projects.Pulsora.AutomatedTrigger.Dto.ExEventDto;
import com.projects.Pulsora.AutomatedTrigger.Fetcher.GDACSFetcher;
import com.projects.Pulsora.AutomatedTrigger.Fetcher.NASADataFetcher;
import com.projects.Pulsora.AutomatedTrigger.Fetcher.OpenWeatherFetcher;
import com.projects.Pulsora.AutomatedTrigger.Fetcher.USGSFetcher;
import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Service.DisasterEventService;
import com.projects.Pulsora.Service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class FetchScheduler {

    private final GDACSFetcher gdacsFetcher;
    private final NASADataFetcher nasaDataFetcher;
    private final OpenWeatherFetcher openWeatherFetcher;
    private final USGSFetcher usgsFetcher;
    private final DisasterEventService disasterEventService;
    private final NotificationService notificationService;

    @Scheduled(fixedRate = 300000) //5 minutes
    public void runAutomatedChecks() {
        log.info(" Running automated disaster fetch cycle...");

        List<ExEventDto> allEvents = new ArrayList<>();

        allEvents.addAll(usgsFetcher.fetch());
        allEvents.addAll(nasaDataFetcher.fetch());
        allEvents.addAll(openWeatherFetcher.fetch());
        allEvents.addAll(gdacsFetcher.fetch());

        log.info(" Collected {} events from external sources.", allEvents.size());

        for (ExEventDto eventDto : allEvents) {
            try {
                boolean exists = disasterEventService.existsByExternalId(eventDto.getExternalId());

                if (!exists) {
                    DisasterEvent saved = disasterEventService.createDisasterEventFromExternal(eventDto);

                    notificationService.sendInitialNotificationToUsers(saved);

                    log.info(" Auto-triggered new event: {} ({}) at {}",
                            eventDto.getEventType(), eventDto.getLocation(), eventDto.getTimeStamp());
                } else {
                    log.debug("️ Skipping duplicate event: {}", eventDto.getExternalId());
                }

            } catch (Exception e) {
                log.error(" Error processing event {} ({}): {}",
                        eventDto.getEventType(), eventDto.getExternalId(), e.getMessage());
            }
        }

        log.info(" Automated disaster fetch cycle completed.");
    }
}
