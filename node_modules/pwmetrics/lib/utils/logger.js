"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor() { }
    static getInstance(options = null) {
        Logger.options = options || Logger.options;
        Logger.instance = Logger.instance || new Logger();
        return Logger.instance;
    }
    log(msg, ...args) {
        if (Logger.options.showOutput) {
            console.log(msg, ...args);
        }
    }
    warn(msg, ...args) {
        if (Logger.options.showOutput) {
            console.warn(msg, ...args);
        }
    }
    error(msg, ...args) {
        if (Logger.options.showOutput) {
            console.error(msg, ...args);
        }
    }
}
Logger.options = {
    showOutput: true
};
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxNQUFNO0lBTWpCLGdCQUFlLENBQUM7SUFFaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUF5QixJQUFJO1FBQzlDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDM0MsTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksTUFBTSxFQUFFLENBQUM7UUFDbEQsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBUSxFQUFFLEdBQUcsSUFBVztRQUMxQixJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVEsRUFBRSxHQUFHLElBQVc7UUFDM0IsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQztZQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFRLEVBQUUsR0FBRyxJQUFXO1FBQzVCLElBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUM7WUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7O0FBN0JNLGNBQU8sR0FBa0I7SUFDOUIsVUFBVSxFQUFFLElBQUk7Q0FDakIsQ0FBQztBQUhKLHdCQStCQyJ9