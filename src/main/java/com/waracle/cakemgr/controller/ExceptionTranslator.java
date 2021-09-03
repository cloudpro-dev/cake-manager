package com.waracle.cakemgr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

/**
 * Exception translation between Java Exception and HTTP responses
 * Used to provide javax field validation errors to client in a structured manner
 *
 * @author Gavin Martin
 */
@ControllerAdvice
public class ExceptionTranslator {

    public static final String ERR_VALIDATION = "error.validation";

    public final MessageSource messageSource;

    @Autowired
    public ExceptionTranslator(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDto processValidationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        return processFieldErrors(fieldErrors);
    }

    private ErrorDto processFieldErrors(List<FieldError> fieldErrors) {
        ErrorDto dto = new ErrorDto(messageSource.getMessage(ERR_VALIDATION, null, LocaleContextHolder.getLocale()));
        for (FieldError fieldError : fieldErrors) {
            dto.add(fieldError.getObjectName(), fieldError.getField(), messageSource.getMessage(fieldError, LocaleContextHolder.getLocale()));
        }
        return dto;
    }

    /**
     * Generic wrapper for all exceptions
     */
    protected static class ErrorDto {
        private final String message;
        private final String description;

        private List<FieldErrorDto> fieldErrors;

        public ErrorDto(String message) {
            this(message, null);
        }

        public ErrorDto(String message, String description) {
            this.message = message;
            this.description = description;
        }

        public ErrorDto(String message, String description, List<FieldErrorDto> fieldErrors) {
            this.message = message;
            this.description = description;
            this.fieldErrors = fieldErrors;
        }

        public void add(String objectName, String field, String message) {
            if (fieldErrors == null) {
                fieldErrors = new ArrayList<>();
            }
            fieldErrors.add(new FieldErrorDto(objectName, field, message));
        }

        public String getMessage() {
            return message;
        }

        public String getDescription() {
            return description;
        }

        public List<FieldErrorDto> getFieldErrors() {
            return fieldErrors;
        }
    }

    /**
     * Represents an individual field validation constraint violation (javax.validation)
     */
    protected static class FieldErrorDto {
        private final String objectName;
        private final String field;
        private final String message;

        public FieldErrorDto(String objectName, String field, String message) {
            this.objectName = objectName;
            this.field = field;
            this.message = message;
        }

        public String getObjectName() {
            return objectName;
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }
    }

}
