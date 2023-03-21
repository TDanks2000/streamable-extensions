"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
class Template extends types_1.MediaProvier {
    constructor() {
        super(...arguments);
        this.baseUrl = "";
    }
    getMediaInfo(animeId, ...args) {
        throw new Error("Method not implemented.");
    }
    getMediaSources(episodeId, ...args) {
        throw new Error("Method not implemented.");
    }
    getMediaServers(episodeId) {
        throw new Error("Method not implemented.");
    }
    search(query, ...args) {
        throw new Error("Method not implemented.");
    }
}
exports.default = Template;
