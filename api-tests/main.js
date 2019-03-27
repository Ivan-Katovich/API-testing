const Mocha = require("mocha");
let mochaMain = new Mocha({
    spec: './specs/books/books.spec.js',
    force: true,
    colors: true,
    timeout: 100000,
    exit: true,
    // reporter: 'spec',
    reporter: 'mocha-reportportal-agent',
    reporterOptions: {
        endpoint: "http://localhost:8080/api/v1",
        token: "b2df4150-2ef0-4510-a035-86e245e4f4a8",
        launch: "API_testing MRA",
        project: "SUPERADMIN_PERSONAL",
        description: "my description",
        attachScreenshots: false,
        showPassedHooks: false
    }
});

try{
    console.log('111111111111111');
    // mochaMain.ignoreLeaks(false);
    mochaMain.files = ["api-tests/specs/books/books.spec.js"];
    mochaMain.run();
    // process.exit(process.exitCode);
} catch (err) {
    console.log('3333333333333');
    console.error(`Test suite doesn't exists or set. Error: ${err}`);
}