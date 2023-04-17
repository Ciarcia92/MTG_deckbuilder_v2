package capstone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import capstone.entities.Deck;

@Repository
public interface DeckRepository extends JpaRepository<Deck, Long> {

	@Query(nativeQuery = true, value = "SELECT id FROM decks WHERE name = :name")
	Optional<Long> findDeckIdByName(@Param("name") String name);

	@Query(nativeQuery = true, value = "SELECT * FROM decks WHERE name = :name")
	Optional<Deck> findDeckByName(@Param("name") String name);
	
	@Query(nativeQuery = true, value = "SELECT * FROM decks WHERE user_id = :userId")
	List<Deck> findDeckByUserId(@Param("userId") Long userId);

	@Query(nativeQuery = true, value = "SELECT id FROM decks WHERE name = :name AND user_id = :userId")
	Optional<Long> findDeckIdByNameAndUserId(@Param("name") String name, @Param("userId") Long userId);
	
}

//TODO COMPLETARE LE REPO CON LE QUERY PER LE ALTRE PROPRIETà