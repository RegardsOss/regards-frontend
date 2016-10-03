package fr.cnes.regards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter;

@SpringBootApplication
public class Bootstrap {

    @Bean
    public UrlRewriteFilter getUrlRewriteFilter() {
        System.out.println("Calling Bean URL Rewrite Filter");
        UrlRewriteFilter urlRewriteFilter = new UrlRewriteFilter();
        return urlRewriteFilter;
    }

    public static void main(String[] args) {
        SpringApplication.run(Bootstrap.class, args);
    }
}
