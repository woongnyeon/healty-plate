package com.healthy_plate.ingredient.domain.repository;

import com.healthy_plate.ingredient.domain.model.Ingredient;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IngredientRepository {

    Ingredient save(Ingredient ingredient);

    Optional<Ingredient> findById(Long id);

    @Query("SELECT i FROM Ingredient i WHERE i.name.value LIKE %:name%")
    List<Ingredient> findByNameContaining(@Param("name") String name);

    long count();

    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN true ELSE false END FROM Ingredient i WHERE i.name.value = :name")
    boolean existsByName(@Param("name") String name);

    void deleteById(Long id);

    void deleteAll();
}
