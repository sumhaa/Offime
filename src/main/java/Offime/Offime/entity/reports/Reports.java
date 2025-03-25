package Offime.Offime.entity.reports;

import Offime.Offime.entity.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TEMPLATE_ID", nullable = false)
    private Templates template;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WRITER_ID", nullable = false)
    private Member writer;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "ACTIVE")
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "CREATED_AT")
    private LocalDateTime created_at;

    @UpdateTimestamp
    @Column(name = "MODIFIED_AT")
    private LocalDateTime modified_at;
}
