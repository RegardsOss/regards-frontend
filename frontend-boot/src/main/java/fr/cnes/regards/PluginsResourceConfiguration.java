package fr.cnes.regards;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

// Cette classe permet d'ajouter un répertoire externe pour le chargement des plugins
@Configuration
public class PluginsResourceConfiguration extends WebMvcConfigurerAdapter {

 @Value("${plugins.resource}")
 private String pluginsResource_;
 @Value("${plugins.path}")
 private String pluginsPath_;
 @Value("${plugins.external.path}")
 private String pluginsExternalPath_;

 @Override
 public void addResourceHandlers(ResourceHandlerRegistry registry) {
   if (pluginsExternalPath_ != null && !pluginsExternalPath_.isEmpty()){
   registry.addResourceHandler("/plugins/**")
   .addResourceLocations("/static/plugins/","file:"+pluginsExternalPath_);
   } else {
   registry.addResourceHandler("/plugins/**")
   .addResourceLocations("/static/plugins/");
   }
 }
}
