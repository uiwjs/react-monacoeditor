(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{608:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default="; See if the input starts with a given symbol.\n(define (match-symbol input pattern)\n  (cond ((null? (remain input)) #f)\n  ((eqv? (car (remain input)) pattern) (r-cdr input))\n  (else #f)))\n\n; Allow the input to start with one of a list of patterns.\n(define (match-or input pattern)\n  (cond ((null? pattern) #f)\n  ((match-pattern input (car pattern)))\n  (else (match-or input (cdr pattern)))))\n\n; Allow a sequence of patterns.\n(define (match-seq input pattern)\n  (if (null? pattern)\n      input\n      (let ((match (match-pattern input (car pattern))))\n  (if match (match-seq match (cdr pattern)) #f))))\n\n; Match with the pattern but no problem if it does not match.\n(define (match-opt input pattern)\n  (let ((match (match-pattern input (car pattern))))\n    (if match match input)))\n\n; Match anything (other than '()), until pattern is found. The rather\n; clumsy form of requiring an ending pattern is needed to decide where\n; the end of the match is. If none is given, this will match the rest\n; of the sentence.\n(define (match-any input pattern)\n  (cond ((null? (remain input)) #f)\n  ((null? pattern) (f-cons (remain input) (clear-remain input)))\n  (else\n   (let ((accum-any (collector)))\n     (define (match-pattern-any input pattern)\n       (cond ((null? (remain input)) #f)\n       (else (accum-any (car (remain input)))\n       (cond ((match-pattern (r-cdr input) pattern))\n             (else (match-pattern-any (r-cdr input) pattern))))))\n     (let ((retval (match-pattern-any input (car pattern))))\n       (if retval\n     (f-cons (accum-any) retval)\n     #f))))))\n\n"}}]);