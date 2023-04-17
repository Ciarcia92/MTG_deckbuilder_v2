package capstone.controller;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capstone.entities.Deck;
import capstone.entities.User;
import capstone.repository.RoleRepository;
import capstone.repository.UserRepository;
import capstone.service.UserService;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

	//TODO AGGIORNARE CON METODO UPDATE PER MODIFICARE UTENTE
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private UserService us;
	@Autowired
	PasswordEncoder pE;
	@Autowired
	RoleRepository rR;
	
	@GetMapping
	public ResponseEntity<List<User>> getAll() {
		List<User> list = us.getAllUsers();		
		if( list.isEmpty() ) return new ResponseEntity<>(HttpStatus.NOT_FOUND);			
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		Optional<User> user = us.getUserById(id);
		if (!user.isPresent()) return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);		 
		return new ResponseEntity<>(user.get(), HttpStatus.OK);
	}
	
	@GetMapping("/deckname/{deckName}")
	public ResponseEntity<Object> getByDeckName(@PathVariable String deckName) {
		Optional<User> user = ur.findUserByDeckName(deckName);
		if (!user.isPresent()) return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);		 
		return new ResponseEntity<>(user.get(), HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		Optional<User> user = us.getUserById(id);		
		if (!user.isPresent()) return new ResponseEntity<>("Address not found",HttpStatus.NOT_FOUND);
		else us.deleteUserById(user.get().getId());		
		return new ResponseEntity<>(String.format("User with id %d cancelled!", id), HttpStatus.OK);
	}

}
