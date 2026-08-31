# Quest.Tech Autonomous MCP Agent

Autonomous AI agent for **Quest.Tech** using the official `@questdottech/mcp-server`.

## Features

* Connects to the Quest.Tech MCP server.
* Discovers available bounties.
* Reads bounty details.
* Generates a valid submission.
* Submits the result through MCP.
* Saves an execution report (`report.md`).

## Requirements

* Node.js 18+
* npm

## Installation

```bash
npm install
npm install @questdottech/mcp-server @modelcontextprotocol/sdk openai dotenv
```

## Environment

Create a `.env` file:

```env
AGENT_PRIVATE_KEY=0xYOUR_AGENT_PRIVATE_KEY
OPENAI_API_KEY=YOUR_OPENAI_KEY
```

## Run

```bash
node agent.js
```

## Example Workflow

1. Connect to Quest.Tech MCP.
2. List open bounties.
3. Read bounty details.
4. Generate a delivery.
5. Submit delivery.
6. Save `report.md`.

## MCP Tools Used

* list_bounties
* get_bounty
* submit_to_bounty
* get_profile
* get_activity

## Example Output

```text
Connected to Quest.Tech MCP
Reading bounty #12
Submission completed
Report saved.
```

## Notes

This repository never stores private keys in Git. The `.env` file is ignored.
