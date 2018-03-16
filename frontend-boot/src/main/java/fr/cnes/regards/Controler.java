package fr.cnes.regards;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class Controler {

    @RequestMapping("/controler")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}
