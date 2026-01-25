package com.healthy_plate.ingredient.presentation.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record IngredientRequest(

    @NotBlank(message = "식재료명은 필수입니다.")
    @Size(max = 100, message = "식재료명은 100자 이하여야 합니다.")
    String name,

    @Size(max = 100, message = "영문 식재료명은 100자 이하여야 합니다.")
    String nameEn,

    @NotNull(message = "제공량은 필수입니다.")
    @Positive(message = "제공량은 0보다 커야 합니다.")
    Double servingSize,

    @NotBlank(message = "단위는 필수입니다.")
    String unit,

    @NotNull(message = "칼로리는 필수입니다.")
    @Min(value = 0, message = "칼로리는 0 이상이어야 합니다.")
    Integer calorie
) {

}
