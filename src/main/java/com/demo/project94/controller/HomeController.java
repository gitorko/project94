package com.demo.project94.controller;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
public class HomeController {

    @Autowired
    private RedisTemplate<String, Long> redisTemplate;

    private ExecutorService executor = Executors.newCachedThreadPool();

    @PostMapping(value = "/api/vote/{id}")
    public Long vote(@PathVariable String id) {
        log.info("voting for {}", id);
        return redisTemplate.opsForValue().increment(id);
    }

    @DeleteMapping(value = "/api/vote/{id}")
    public void resetVote(@PathVariable String id) {
        redisTemplate.opsForValue().getAndDelete(id);
    }

    @GetMapping(value = "/api/votes", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> getVotes() {
        SseEmitter emitter = new SseEmitter(15000L);
        executor.execute(() -> {
            try {
                int id = 0;
                while (true) {
                    SseEmitter.SseEventBuilder event = SseEmitter.event()
                            .data("cat: " + redisTemplate.opsForValue().get("cat") + "," +
                                    "dog: " + redisTemplate.opsForValue().get("dog"))
                            .id(String.valueOf(id++));
                    emitter.send(event);
                    TimeUnit.SECONDS.sleep(2);
                }
            } catch (Exception ex) {
                emitter.completeWithError(ex);
            }
        });
        return new ResponseEntity(emitter, HttpStatus.OK);
    }
}
