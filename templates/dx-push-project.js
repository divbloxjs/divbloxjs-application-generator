const dx = require("../dx-app");

async function run(operation) {
  await dx.pushProject(operation);

  process.exit(0);
}

function getOperation() {
  if (process.argv.includes("complete")) {
    return "complete";
  }

  if (process.argv.includes("datamodel")) {
    return "datamodel";
  }

  console.log(
    "Pushing project data model, but you can provide a custom push operation 'complete|datamodel'"
  );
  return "datamodel";
}

run(getOperation());
