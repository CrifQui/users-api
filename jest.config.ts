import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
    clearMocks: true,
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: {
                    module: "ESNext",
                    moduleResolution: "bundler",
                },
            },
        ],
    },
};

export default config;
