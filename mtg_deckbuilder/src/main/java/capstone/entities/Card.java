package capstone.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cards")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Card {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	
	private String oracleId;
	private String uri;
	private String typeLine;
	private String imageUris;
	
}
