import fs from "fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const BOUNTY_ID = 12;

const DELIVERY = `
1. Page / URL
https://quest-tech.io/

2. UX annoyance
The landing page hero experiences a visible layout shift after page load.
The headline and CTA move downward as animated assets finish loading,
which can cause accidental clicks.

3. Screenshot
Hero section before and after refresh showing the CTA shifting.

4. Suggested fix
Reserve layout space for hero assets before loading and preload critical assets
to eliminate cumulative layout shift (CLS).
`;

async function main() {
  const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "@questdottech/mcp-server"],
  env: {
    ...process.env,
    AGENT_PRIVATE_KEY: process.env.AGENT_PRIVATE_KEY,
  },
});

  const client = new Client(
    { name: "quest-tech-agent", version: "1.0.0" },
    { capabilities: {} }
  );

console.log(
  "PK loaded:",
  process.env.AGENT_PRIVATE_KEY
    ? `${process.env.AGENT_PRIVATE_KEY.slice(0, 6)}...${process.env.AGENT_PRIVATE_KEY.slice(-4)}`
    : "NOT FOUND"
);

  await client.connect(transport);

  console.log("✅ Connected");

  const bounty = await client.callTool({
    name: "get_bounty",
    arguments: { bountyId: BOUNTY_ID },
  });

  console.log(`Reading bounty #${BOUNTY_ID}`);
  console.log(bounty.structuredContent.title);

  const submit = await client.callTool({
    name: "submit_to_bounty",
    arguments: {
      bountyId: BOUNTY_ID,
      message: DELIVERY,
    },
  });

  console.log("\n===== SUBMISSION RESULT =====");
  console.log(JSON.stringify(submit, null, 2));

  fs.writeFileSync(
    "report.md",
    `# Quest.Tech Report

Bounty ID: ${BOUNTY_ID}

Title: ${bounty.structuredContent.title}

Submission:
${DELIVERY}

Response:
${JSON.stringify(submit, null, 2)}
`
  );

  console.log("\n📄 report.md saved.");

  await client.close();
}

main().catch(console.error);