package com.healthy_plate.ingredient.presentation.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record IngredientUpdateRequest(

    @Size(max = 100, message = "식재료명은 100자 이하여야 합니다.")
    String name,

    @Size(max = 100, message = "영문 식재료명은 100자 이하여야 합니다.")
    String nameEn,

    @Positive(message = "제공량은 0보다 커야 합니다.")
    Double servingSize,

    String unit,

    @Min(value = 0, message = "칼로리는 0 이상이어야 합니다.")
    Integer calorie
) {

}
