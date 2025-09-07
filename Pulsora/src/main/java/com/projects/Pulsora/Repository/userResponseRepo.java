package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.UserResponse;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class userResponseRepo implements userResponseRepository {
    @Override
    public void flush() {

    }

    @Override
    public <S extends UserResponse> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends UserResponse> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<UserResponse> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public UserResponse getOne(Long aLong) {
        return null;
    }

    @Override
    public UserResponse getById(Long aLong) {
        return null;
    }

    @Override
    public UserResponse getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends UserResponse> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends UserResponse> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends UserResponse> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends UserResponse> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends UserResponse> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends UserResponse> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends UserResponse, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends UserResponse> S save(S entity) {
        return null;
    }

    @Override
    public <S extends UserResponse> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<UserResponse> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<UserResponse> findAll() {
        return List.of();
    }

    @Override
    public List<UserResponse> findAllById(Iterable<Long> longs) {
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
    public void delete(UserResponse entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends UserResponse> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<UserResponse> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<UserResponse> findAll(Pageable pageable) {
        return null;
    }
}
