package com.healthy_plate.ingredient.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@Tag(name = "식재료 배치", description = "식재료 데이터 배치 작업 API")
public interface SwaggerIngredientBatchController {

    @Operation(
        summary = "식품 데이터 삭제",
        description = "데이터베이스의 모든 식재료 데이터를 삭제합니다.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "데이터 삭제 성공",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Map.class),
                    examples = @ExampleObject(
                        value = """
                            {
                                "success": true,
                                "message": "데이터 삭제 완료",
                                "deletedCount": 1000
                            }
                            """
                    )
                )
            ),
            @ApiResponse(
                responseCode = "500",
                description = "데이터 삭제 실패",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Map.class),
                    examples = @ExampleObject(
                        value = """
                            {
                                "success": false,
                                "message": "데이터 삭제 실패: 에러 메시지"
                            }
                            """
                    )
                )
            )
        }
    )
    ResponseEntity<Map<String, Object>> clearIngredientData();

    @Operation(
        summary = "식품 데이터 로딩",
        description = """
            배치 Job을 실행하여 식재료 데이터를 로딩합니다.

            **주의사항:**
            - 이미 데이터가 존재하는 경우 로딩되지 않습니다.
            - 데이터를 다시 로딩하려면 먼저 /api/batch/ingredients/clear를 호출해주세요.
            """,
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "배치 실행 완료 (성공 또는 데이터 이미 존재)",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Map.class),
                    examples = {
                        @ExampleObject(
                            name = "성공",
                            value = """
                                {
                                    "success": true,
                                    "message": "데이터 로딩 완료",
                                    "status": "COMPLETED",
                                    "readCount": 1000,
                                    "writeCount": 1000,
                                    "skipCount": 0
                                }
                                """
                        ),
                        @ExampleObject(
                            name = "데이터 이미 존재",
                            value = """
                                {
                                    "success": false,
                                    "message": "이미 데이터가 존재합니다.",
                                    "existingCount": 1000
                                }
                                """
                        )
                    }
                )
            ),
            @ApiResponse(
                responseCode = "500",
                description = "배치 실행 실패",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Map.class),
                    examples = @ExampleObject(
                        value = """
                            {
                                "success": false,
                                "message": "배치 실행 실패: 에러 메시지"
                            }
                            """
                    )
                )
            )
        }
    )
    ResponseEntity<Map<String, Object>> loadIngredientData();
}