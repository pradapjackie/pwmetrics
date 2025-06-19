"use strict";
// Copyright 2018 Google Inc. All Rights Reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE
Object.defineProperty(exports, "__esModule", { value: true });
const lighthouse = require('lighthouse/lighthouse-core');
const parseChromeFlags = require('lighthouse/lighthouse-cli/run').parseChromeFlags;
const chrome_launcher_1 = require("chrome-launcher");
const logger_1 = require("./utils/logger");
const messages_1 = require("./utils/messages");
const perfConfig = require('./perf-config');
const MAX_LIGHTHOUSE_TRIES = 2;
class LHRunner {
    //@todo improve FeatureFlags -> LHFlags
    constructor(url, flags) {
        this.url = url;
        this.flags = flags;
        this.tryLighthouseCounter = 0;
        this.logger = logger_1.Logger.getInstance({ showOutput: this.flags.showOutput });
    }
    async run() {
        try {
            let lhResults;
            await this.launchChrome();
            if (process.env.CI) {
                // handling CRI_TIMEOUT issue - https://github.com/GoogleChrome/lighthouse/issues/833
                this.tryLighthouseCounter = 0;
                lhResults = await this.runLighthouseOnCI().then((lhResults) => {
                    // fix for https://github.com/paulirish/pwmetrics/issues/63
                    return new Promise(resolve => {
                        this.logger.log(messages_1.getMessage('WAITING'));
                        setTimeout(_ => {
                            return resolve(lhResults);
                        }, 2000);
                    });
                });
            }
            else {
                lhResults = await lighthouse(this.url, this.flags, perfConfig);
            }
            await this.killLauncher();
            return lhResults;
        }
        catch (error) {
            await this.killLauncher();
            throw error;
        }
    }
    async killLauncher() {
        if (typeof this.launcher !== 'undefined') {
            await this.launcher.kill();
        }
    }
    async runLighthouseOnCI() {
        try {
            return await lighthouse(this.url, this.flags, perfConfig);
        }
        catch (error) {
            if (error.code === 'CRI_TIMEOUT' && this.tryLighthouseCounter <= MAX_LIGHTHOUSE_TRIES) {
                return await this.retryLighthouseOnCI();
            }
            if (this.tryLighthouseCounter > MAX_LIGHTHOUSE_TRIES) {
                throw new Error(messages_1.getMessage('CRI_TIMEOUT_REJECT'));
            }
        }
    }
    async retryLighthouseOnCI() {
        this.tryLighthouseCounter++;
        this.logger.log(messages_1.getMessage('CRI_TIMEOUT_RELAUNCH'));
        try {
            return await this.runLighthouseOnCI();
        }
        catch (error) {
            this.logger.error(error.message);
            this.logger.error(messages_1.getMessage('CLOSING_CHROME'));
            await this.killLauncher();
        }
    }
    async launchChrome() {
        try {
            this.logger.log(messages_1.getMessage('LAUNCHING_CHROME'));
            this.launcher = await chrome_launcher_1.launch({
                port: this.flags.port,
                chromeFlags: parseChromeFlags(this.flags.chromeFlags),
                chromePath: this.flags.chromePath
            });
            this.flags.port = this.launcher.port;
            return this.launcher;
        }
        catch (error) {
            this.logger.error(error);
            await this.killLauncher();
            return error;
        }
    }
}
exports.LHRunner = LHRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGgtcnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGgtcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBa0Q7QUFDbEQsOERBQThEOztBQUU5RCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN6RCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBQ25GLHFEQUF1RDtBQUN2RCwyQ0FBc0M7QUFFdEMsK0NBQTRDO0FBRTVDLE1BQU0sVUFBVSxHQUFRLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNqRCxNQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUUvQixNQUFhLFFBQVE7SUFLbkIsdUNBQXVDO0lBQ3ZDLFlBQW1CLEdBQVcsRUFBUyxLQUFtQjtRQUF2QyxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUN4RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHO1FBQ1AsSUFBSTtZQUNGLElBQUksU0FBMEIsQ0FBQztZQUMvQixNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUUxQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO2dCQUNsQixxRkFBcUY7Z0JBQ3JGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQTBCLEVBQUUsRUFBRTtvQkFDN0UsMkRBQTJEO29CQUMzRCxPQUFP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