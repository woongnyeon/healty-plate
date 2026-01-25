package com.healthy_plate.ingredient.infrastructure.repository;

import com.healthy_plate.ingredient.application.dto.IngredientWithUserDto;
import com.healthy_plate.ingredient.domain.model.Ingredient;
import com.healthy_plate.ingredient.domain.repository.IngredientRepository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaIngredientRepository extends JpaRepository<Ingredient, Long>, IngredientRepository {

    @Override
    @Query("SELECT i FROM Ingredient i WHERE i.name LIKE %:name%")
    List<Ingredient> findByNameContaining(@Param("name") String name);

    @Override
    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN true ELSE false END " +
        "FROM Ingredient i WHERE i.name = :name")
    boolean existsByName(@Param("name") String name);

    @Override
    @Query("""
        SELECT new com.healthy_plate.ingredient.application.dto.IngredientWithUserDto(
            i.id,
            i.name,
            i.nameEn,
            i.calorie,
            i.servingSize,
            CAST(i.unit AS string),
            CAST(i.registrationType AS string),
            i.isVerified,
            u.id,
            u.profile.nickname
        )
        FROM Ingredient i
        JOIN User u ON i.registerId = u.id
        WHERE u.id = :userId
    """)
    List<IngredientWithUserDto> findByUserIdWithUserInfo(@Param("userId") Long userId);

}
