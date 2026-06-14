package at.ac.hcw.foodly;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.Principal;


@Component
public class GlobalDebugLoggingFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(GlobalDebugLoggingFilter.class);

    // This grabs your true/false toggle from application.properties
    @Value("${app.debug.enabled:false}")
    private boolean debugEnabled;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Cast to HttpServletRequest to get access to URLs and Methods
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        if (debugEnabled) {
            String method = httpRequest.getMethod(); // GET, POST, PUT, etc.
            String uri = httpRequest.getRequestURI();   // /api/dishes
            Principal user = httpRequest.getUserPrincipal();
            String username = (user != null) ? user.getName() : "Anonymous/Guest";

            logger.info("[DEBUG TOGGLE] Request received -> Method: {}, URI: {}, User: {}", method, uri, username);
        }

        // Always let the request pass through to the intended controller!
        chain.doFilter(request, response);
    }
}