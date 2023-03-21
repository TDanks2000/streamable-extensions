import fs from "fs";
import path from "path";
import { AvailableExtensionTypes } from "./types/types";

const availableExtensions = (type?: AvailableExtensionTypes) => {
  const available = [];

  const extensionsFolder = fs.readdirSync("./src/extensions");
  for (const folder of extensionsFolder) {
    if (folder.toLowerCase() === "template") break;

    const extensionsFiles = fs
      .readdirSync(`./src/extensions/${folder}`)
      .filter((file) => file.endsWith(".json"));

    for (const file of extensionsFiles) {
      const extensionJson = JSON.parse(
        fs.readFileSync(`./src/extensions/${folder}/${file}`, "utf-8")
      );

      if (type && extensionJson.type !== type) continue;

      available.push({ ...extensionJson });
    }
  }

  return available;
};

export { availableExtensions };
