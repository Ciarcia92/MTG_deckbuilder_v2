package capstone;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import capstone.entities.Role;
import capstone.entities.User;
import capstone.enums.RoleType;
import capstone.repository.RoleRepository;
import capstone.repository.UserRepository;

@SpringBootApplication
public class Application implements CommandLineRunner{

	@Autowired
	private RoleRepository rr;
	
	@Autowired
	private UserRepository ur;

	@Autowired
	private PasswordEncoder pe;
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

//		Role r1 = new Role(RoleType.USER);
//		Role r2 = new Role(RoleType.ADMIN);
//		
//		User u1 = new User("giuly", "giulia", "test@email.it", pe.encode("pluto"));
//		User u2 = new User("lorenzo", "lorenzo", "email@email.it", pe.encode("pluto"));
//		
//
//		u1.setRoles(new HashSet<>() {{
//			add(r1);
//			add(r2);
//		}});
//		
//		rr.save(r1);
//		rr.save(r2);
//		
//		ur.save(u1);
//		ur.save(u2);
		
	}

}
