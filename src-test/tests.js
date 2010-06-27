var defs = {
  "pass:normal": function () {
    return [1,2,3].length == 3;
  },
  "pass:delegate": function (del) {
    var start = +new Date;
    // assert truish
    setTimeout(del(function(){return 1;}), 200);
  },
  "pass:slow": function () {
    var start = +new Date;
    // mimim an resource heavy assert, force time deferrals
    while (+new Date - start < 15) { /* block */ }
    return true;
  },
  "fail:normal": function () {
    return [1,2,3].length == 0;
  },
  "fail:delegate": function (del) {
    var start = +new Date;
    // assert falsey
    setTimeout(del(function(){return '';}), 200);
  }
};

function onresult (name, pass, elapsed, loops, remaining) {
  var method = pass ? log : log.warn;
  method(name, "finished", loops, "loop(s) in", elapsed, "ms");
}

// All kaze methods may be renamed
var k = kaze;
kaze = null;

// Load fixtures, if this fails nothing below will work
k.tests(defs);

// Repeated calls to run() will queue arguments

// Run tests filtered tests repeatedly
k.run(onresult, /norm/, 10);

// Test pausing before running tests
k.pause();
k.run(onresult, /del/);
// run() is async, wait before resuming
setTimeout(function () {
  k.resume();
}, 500);

// Test pausing and resuming from onresult
k.run(function (n, p, e, l, r) {
  onresult.apply(null, [].slice.apply(arguments));

  // Put further test running on pause until resume() is executed
  k.pause();
  setTimeout(function () {
    k.resume();
  }, 500);
}, /slow/);

// Mimic a (very) greedy process
k.run(onresult, /slow/, 450);
