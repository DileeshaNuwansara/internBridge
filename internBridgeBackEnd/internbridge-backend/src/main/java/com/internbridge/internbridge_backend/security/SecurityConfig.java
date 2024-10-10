package com.internbridge.internbridge_backend.config;

import com.internbridge.internbridge_backend.service.Implementations.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfiguration {



    @Autowired
    private final JwtRequestFilter jwtRequestFilter;
    private final CustomUserDetailsService customUserDetailsService;



    public SecurityConfig(JwtRequestFilter jwtRequestFilter, CustomUserDetailsService customUserDetailsService) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/admin/**").hasRole("ROLE_ADMIN")
                .antMatchers("/student/**").hasRole("ROLE_STUDENT")
                .antMatchers("/companyhr/**").hasRole("ROLE_COMPANYHR")
                .antMatchers("/coordinator/**").hasRole("ROLE_COORDINATOR")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .and()
                .logout();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and()  // Enable CORS configuration
                .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/authenticate", "/api/v1/user/saveUser","/api/v1/user/verifyEmail").permitAll() // Allow specific endpoints
                            .requestMatchers("/admin/**").hasRole("ADMIN")
                            .requestMatchers("/user/**").hasRole("USER")
                            .requestMatchers("/Common/**").hasAnyRole("ADMIN", "USER")
                            .anyRequest().authenticated();
                })
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return (SecurityFilterChain)http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));  // Set allowed origins
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Set allowed methods
        configuration.setAllowedHeaders(List.of("*"));  // Allow all headers
        configuration.setAllowCredentials(true);  // Allow credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

}