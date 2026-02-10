package com.brian.interview.repository;

import com.brian.interview.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    // Custom queries can be added here if needed
}
