package capstone.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capstone.entities.User;
import capstone.payloads.UserDto;
import capstone.service.UserService;

@RestController
@RequestMapping("/userDto")
public class UserDtoController {

	@Autowired
	private UserService userSrv;
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		Optional<UserDto> clObj = userSrv.getUserDtoById(id);
		if (!clObj.isPresent()) return new ResponseEntity<>("UTENTE NON TROVATO",HttpStatus.NOT_FOUND);		 
		return new ResponseEntity<>(clObj.get(), HttpStatus.OK);
	}
}
