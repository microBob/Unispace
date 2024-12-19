# Unispace

[![Format and Lint](https://github.com/microBob/Unispace/actions/workflows/format-and-lint.yml/badge.svg)](https://github.com/microBob/Unispace/actions/workflows/format-and-lint.yml)

Synchonized tab workspaces and bookmarks manager web extension.

⚠️ This project is still in development and is not considered stable yet. Please test it out and report any issues you find!

# Installation

## For users

⚠️ Still in development, no releases yet. Check back later!

## For Developers

### Prerequisites

1. [Node.js](https://nodejs.org/en/) (v23 or higher)
2. [pnpm](https://pnpm.io/) (v9 or higher)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Login to InstantDB:

   ```bash
   pnpx instant-cli login
   ```

3. Push the InstantDB schema and permissions. This operation will also copy the app ID to `.env`:

   ```bash
   pnpm push-instant
   ```

4. In `.env`, create a `WXT_INSTANT_APP_ID` variable below `PUBLIC_INSTANT_APP_ID` and copy down the app ID.
