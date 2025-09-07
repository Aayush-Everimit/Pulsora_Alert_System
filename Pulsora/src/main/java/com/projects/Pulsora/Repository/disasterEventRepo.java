package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.DisasterEvent;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class disasterEventRepo implements disasterEventRepository {
    @Override
    public void flush() {

    }

    @Override
    public <S extends DisasterEvent> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends DisasterEvent> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<DisasterEvent> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public DisasterEvent getOne(Long aLong) {
        return null;
    }

    @Override
    public DisasterEvent getById(Long aLong) {
        return null;
    }

    @Override
    public DisasterEvent getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends DisasterEvent> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends DisasterEvent> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends DisasterEvent> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends DisasterEvent> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends DisasterEvent> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends DisasterEvent> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends DisasterEvent, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends DisasterEvent> S save(S entity) {
        return null;
    }

    @Override
    public <S extends DisasterEvent> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<DisasterEvent> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<DisasterEvent> findAll() {
        return List.of();
    }

    @Override
    public List<DisasterEvent> findAllById(Iterable<Long> longs) {
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
    public void delete(DisasterEvent entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends DisasterEvent> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<DisasterEvent> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<DisasterEvent> findAll(Pageable pageable) {
        return null;
    }
}
