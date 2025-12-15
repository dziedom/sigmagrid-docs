#!/usr/bin/env node

/**
 * Validates that static/.well-known/mcp.json is an exact byte-for-byte copy of static/mcp.json.
 * Also checks public/.well-known/mcp.json if it exists.
 * Exits with code 1 on mismatch, 0 on success.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, '..', 'static', 'mcp.json');
const WELL_KNOWN_FILE = path.join(__dirname, '..', 'static', '.well-known', 'mcp.json');
const PUBLIC_FILE = path.join(__dirname, '..', 'public', '.well-known', 'mcp.json');

function readFileBytes(filePath) {
  try {
    return fs.readFileSync(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function compareFiles(file1, file2, name1, name2) {
  const content1 = readFileBytes(file1);
  const content2 = readFileBytes(file2);

  if (content1 === null) {
    console.error(`Error: ${name1} does not exist`);
    return false;
  }

  if (content2 === null) {
    console.error(`Error: ${name2} does not exist`);
    return false;
  }

  if (content1.length !== content2.length) {
    console.error(`Error: ${name1} and ${name2} have different lengths (${content1.length} vs ${content2.length} bytes)`);
    return false;
  }

  for (let i = 0; i < content1.length; i++) {
    if (content1[i] !== content2[i]) {
      console.error(`Error: ${name1} and ${name2} differ at byte position ${i} (${content1[i]} vs ${content2[i]})`);
      return false;
    }
  }

  return true;
}

// Main validation
let allMatch = true;

// Check static/.well-known/mcp.json matches static/mcp.json
console.log('Checking static/.well-known/mcp.json matches static/mcp.json...');
if (!compareFiles(SOURCE_FILE, WELL_KNOWN_FILE, 'static/mcp.json', 'static/.well-known/mcp.json')) {
  allMatch = false;
} else {
  console.log('✓ static/.well-known/mcp.json matches static/mcp.json');
}

// Check public/.well-known/mcp.json if it exists
const publicContent = readFileBytes(PUBLIC_FILE);
if (publicContent !== null) {
  console.log('Checking public/.well-known/mcp.json matches static/mcp.json...');
  if (!compareFiles(SOURCE_FILE, PUBLIC_FILE, 'static/mcp.json', 'public/.well-known/mcp.json')) {
    allMatch = false;
  } else {
    console.log('✓ public/.well-known/mcp.json matches static/mcp.json');
  }
} else {
  console.log('ℹ public/.well-known/mcp.json does not exist (this is expected)');
}

if (allMatch) {
  console.log('\n✓ All files match correctly');
  process.exit(0);
} else {
  console.error('\n✗ Validation failed: files do not match');
  process.exit(1);
}





















