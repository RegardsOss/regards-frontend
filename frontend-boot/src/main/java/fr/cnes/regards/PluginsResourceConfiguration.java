package fr.cnes.regards;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

// Cette classe permet d'ajouter un répertoire externe pour le chargement des plugins
@Configuration
public class PluginsResourceConfiguration extends WebMvcConfigurerAdapter {

    @Value("${regards.frontend.www.path}")
    private String staticExternalPath;

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        if ((staticExternalPath != null) && !staticExternalPath.isEmpty()) {
            String staticPath = staticExternalPath;
            if (!staticPath.endsWith("/")) {
                staticPath = staticPath + "/";
            }
            registry.addResourceHandler("/**").addResourceLocations("file:" + staticPath, "classpath:/static/");
        }
    }
}
