package com.brian.interview.dto;

import com.brian.interview.model.Movie;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {

    private String id;
    private String title;
    private Date year;
    private String plot;

    public static MovieDTO fromEntity(Movie movie) {
        if (movie == null) return null;
        return new MovieDTO(
            movie.getId(),
            movie.getTitle(),
            movie.getYear(),
            movie.getPlot()
        );
    }
}
