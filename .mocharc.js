module.exports = {
    spec: './api-tests/specs/**/*.js',
    force: true,
    colors: true,
    reporter: 'spec',
    // reporter: 'mocha-multi-reporters',
    // reporterOptions: {
    //     reporterEnabled: 'mocha-reportportal-agent, spec',
    //     mochaReportportalAgentReporterOptions: {
    //         endpoint: "http://localhost:8080/api/v1",
    //         token: "32d1b53e-bf2d-4733-a1ad-5c09f31aa12f",
    //         launch: "API_testing MMR",
    //         project: "SUPERADMIN_PERSONAL",
    //         // debug: true
    //     }
    // },
    // reporter: 'mocha-reportportal-agent',
    // reporterOptions: {
    //     // client settings
    //     endpoint: "http://localhost:8080/api/v1",
    //     token: "32d1b53e-bf2d-4733-a1ad-5c09f31aa12f",
    //     // username: "superadmin",
    //     // password: "qwerty",
    //     launch: "API_testing MRA",
    //     project: "SUPERADMIN_PERSONAL",
    //     // agent settings
    //     attachScreenshots: false,
    //     showPassedHooks: false
    // },
    // reporter: 'mocha-rp-reporter',
    // reporterOptions: {
    //     // configFile: "path to config.json",
    //     configOptions: {
    //         endpoint: "http://localhost:8080/api/v1",
    //         token: "32d1b53e-bf2d-4733-a1ad-5c09f31aa12f",
    //         // username: "user",
    //         // password: "password",
    //         launch: "API_testing",
    //         project: "Books_lib"
    //     }
    // },
    timeout: 100000,
    exit: true
};