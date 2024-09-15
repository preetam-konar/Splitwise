package com.riverdale.splitwise.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class AppSecurityConfig {

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
        jdbcUserDetailsManager.setUsersByUsernameQuery("select email, pw, active from users where email=?");
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery("select email, role from roles where email=?");
        return jdbcUserDetailsManager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(configuror ->
                configuror
                        .anyRequest().authenticated()
        ).formLogin(
                form ->
                        form.loginProcessingUrl("/authenticateUser")
                                .usernameParameter("username")
                                .passwordParameter("password")
                                .permitAll()
        ).logout(LogoutConfigurer::permitAll);


        return http.build();
    }

}
