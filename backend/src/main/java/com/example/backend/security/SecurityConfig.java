package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) //csrf is cross site Request forgery. it will stay in cookies. disabled because otherwise put push blocked
                .authorizeHttpRequests(a -> a
                        .requestMatchers("/api/hello").authenticated()
                        .anyRequest().permitAll()) //because many end points we don't know
                .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)) //when cookies, session build
                .exceptionHandling(error -> error
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o-> o.
                        defaultSuccessUrl("http://localhost:5173"));
        return http.build();
    }
}
