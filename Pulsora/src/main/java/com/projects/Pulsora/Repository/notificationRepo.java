package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.Notification;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class notificationRepo implements notificationRepository {
    @Override
    public void flush() {

    }

    @Override
    public <S extends Notification> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Notification> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<Notification> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Notification getOne(Long aLong) {
        return null;
    }

    @Override
    public Notification getById(Long aLong) {
        return null;
    }

    @Override
    public Notification getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends Notification> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Notification> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends Notification> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends Notification> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Notification> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Notification> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Notification, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Notification> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Notification> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<Notification> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<Notification> findAll() {
        return List.of();
    }

    @Override
    public List<Notification> findAllById(Iterable<Long> longs) {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void delete(Notification entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends Notification> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Notification> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<Notification> findAll(Pageable pageable) {
        return null;
    }
}
