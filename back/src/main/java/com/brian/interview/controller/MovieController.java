package com.brian.interview.controller;

import com.brian.interview.dto.MovieDTO;
import com.brian.interview.model.Movie;
import com.brian.interview.repository.MovieRepository;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Value("${OMDB_API_KEY}")
    private String omdbApiKey;

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<MovieDTO> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return movies
            .stream()
            .map(MovieDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @GetMapping("/populate")
    public ResponseEntity<String> populateMovies() {
        String url =
            "http://www.omdbapi.com/?apikey=" +
            omdbApiKey +
            "&s=Star+Wars&plot=full&type=movie&plot=short";
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject json = new JSONObject(response);
        JSONArray searchResults = json.optJSONArray("Search");
        if (searchResults == null) {
            return ResponseEntity.badRequest().body(
                "No movies found in OMDb response."
            );
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        for (int i = 0; i < searchResults.length(); i++) {
            JSONObject movieJson = searchResults.getJSONObject(i);
            String imdbId = movieJson.optString("imdbID");
            String title = movieJson.optString("Title");
            String yearStr = movieJson.optString("Year");
            String plot = "";

            // Fetch full movie details for plot
            String detailUrl =
                "http://www.omdbapi.com/?apikey=" +
                omdbApiKey +
                "&i=" +
                imdbId +
                "&plot=short";
            String detailResponse = restTemplate.getForObject(
                detailUrl,
                String.class
            );
            JSONObject detailJson = new JSONObject(detailResponse);
            plot = detailJson.optString("Plot");

            Date year = null;
            try {
                year = sdf.parse(yearStr);
            } catch (Exception e) {
                year = null;
            }

            Movie movie = new Movie();
            movie.setId(imdbId);
            movie.setTitle(title);
            movie.setYear(year);
            movie.setPlot(plot);

            movieRepository.save(movie);
        }

        return ResponseEntity.ok("Movies populated successfully.");
    }

    @GetMapping("/{id}")
    public MovieDTO getMovieById(@PathVariable String id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        return MovieDTO.fromEntity(movie);
    }

    @PostMapping
    public MovieDTO createMovie(@RequestBody MovieDTO movieDTO) {
        Movie movie = new Movie(
            movieDTO.getId(),
            movieDTO.getTitle(),
            movieDTO.getYear(),
            movieDTO.getPlot()
        );
        Movie saved = movieRepository.save(movie);
        return MovieDTO.fromEntity(saved);
    }

    @PutMapping("/{id}")
    public MovieDTO updateMovie(
        @PathVariable String id,
        @RequestBody MovieDTO movieDTO
    ) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) return null;
        movie.setTitle(movieDTO.getTitle());
        movie.setYear(movieDTO.getYear());
        movie.setPlot(movieDTO.getPlot());
        Movie updated = movieRepository.save(movie);
        return MovieDTO.fromEntity(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable String id) {
        movieRepository.deleteById(id);
    }
}
