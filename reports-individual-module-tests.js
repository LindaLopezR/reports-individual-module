// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by reports-individual-module.js.
import { name as packageName } from "meteor/reports-individual-module";

// Write your tests here!
// Here is an example.
Tinytest.add('reports-individual-module - example', function (test) {
  test.equal(packageName, "reports-individual-module");
});
