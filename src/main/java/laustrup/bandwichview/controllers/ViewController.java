package laustrup.bandwichview.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller("/")
public class ViewController {

    private String _index = "index.html",
                    _url = "http://www.localhost:8080/";

    @GetMapping("") public RedirectView preset() { return new RedirectView(_url+"welcome"); }
    @GetMapping("?search_query={query}") public String search() { return _index; }
    @GetMapping("?event={event}") public String event() { return _index; }
    @GetMapping("?user={user}") public String user() { return _index; }
    @GetMapping("profile") public String profile() { return _index; }
    @GetMapping("dashboard") public String dashboard() { return _index; }
    @GetMapping("welcome") public String welcome() { return _index; }
}
