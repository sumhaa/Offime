package Offime.Offime.dto.attendanceDto.request;

import Offime.Offime.entity.attendanceEntity.EventRecord;
import Offime.Offime.entity.attendanceEntity.EventType;
import Offime.Offime.entity.attendanceEntity.OutOfOfficeType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class RequestClockIn {

    private double latitude;
    private double longitude;
    private EventType eventType;


    public static EventRecord toEntity(RequestClockIn requestClockIn) {
        return EventRecord.builder()
                .date(LocalDate.now())
                .requestTime(LocalDateTime.now())
                .clockIn(LocalTime.now())
                .eventType(requestClockIn.eventType)
//                .isLate(requestEventRecord.)
                .build();
    }
}