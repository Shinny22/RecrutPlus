const majorVersion = Number.parseInt(process.versions.node.split(".")[0], 10);

if (majorVersion < 20 || majorVersion >= 24) {
  console.error(
    [
      "Unsupported Node.js version for this project.",
      `Current: v${process.versions.node}`,
      "Required: Node.js 20.x, 22.x, or 23.x.",
      "Tip: install an LTS version and retry `npm run build`.",
    ].join("\n")
  );
  process.exit(1);
}
