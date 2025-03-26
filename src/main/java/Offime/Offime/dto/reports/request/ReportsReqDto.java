package Offime.Offime.dto.reports.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReportsReqDto {

    private String title;
    private Long writerId;
    private Long templateId;
    private List<ResponsesReqDto> responseData;

}
