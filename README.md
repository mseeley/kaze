Kaze - 風
=========

A lightweight and nimble test runner.  Kaze translates to "wind" in Japanese.

-   Non-blocking, processing occurs within multiple 50 ms time slices
-   Asynchronous, assertions may delegate their return value to another function executing in the future
-   Benchmarking, compare speed between multiple tests using repetitive execution
-   Regular expression filtering of test names allows easy running of test subsets
-   Lightweight ~1.4 KB minified, ~700 B gzipped

Interface
=========

    object kaze

      void    clear()
      void    pause()
      void    resume()
      void    run([Function onresult[, RegExp filter[, Number iterations]]])
      void    test(String name, Function assert)
      void    tests(Object defs)

See [readme.html](http://github.com/mseeley/Kaze/blob/master/readme.html) for more information.
