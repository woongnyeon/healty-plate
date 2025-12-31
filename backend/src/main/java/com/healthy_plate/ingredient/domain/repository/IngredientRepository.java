package com.healthy_plate.ingredient.domain.repository;

import com.healthy_plate.ingredient.domain.model.Ingredient;
import java.util.List;

public interface IngredientRepository {

    Ingredient save(Ingredient ingredient);

    long count();

    void deleteAll();

    boolean existsByName(String name);

    List<Ingredient> findByNameContaining(String name);

    void deleteById(String id);
}
