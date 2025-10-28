# Augment Setup Instructions for Odoo Integration

This document provides setup instructions for developers using Augment to work on the HyperPrints Odoo integration.

## Overview

For integrating with Odoo, we are using this npm package:
**https://www.npmjs.com/package/odoo-xmlrpc**

To ensure proper integration and code quality, you need to add the relevant codebases to your Augment context.

## Required Context Setup

### 1. Add odoo-xmlrpc Package Source Code

1. **Clone the npm package repository:**
   ```bash
   git clone https://github.com/faisalsami/odoo-xmlrpc
   ```

2. **Add to Augment Context:**
   - Go to **Augment Settings** > **Context** > **+ Add More**
   - Add the cloned `odoo-xmlrpc` repository folder
   - This provides the source code for the XMLRPC client we're using

### 2. Add Odoo Enterprise Codebase

1. **Clone the Odoo Enterprise repository:**
   ```bash
   git clone https://github.com/vertec-io/odoo-enterprise
   ```

2. **Add to Augment Context:**
   - Go to **Augment Settings** > **Context** > **+ Add More**
   - Add the cloned `odoo-enterprise` repository folder
   - This provides the complete Odoo 18.0 Enterprise codebase for reference

### Visual Setup Guide

![Augment Context Setup](.dev/augment_context_setup_1.PNG)

*Screenshot showing how to add repositories to Augment context*

## Augment Rules Configuration

Add the following rules to your Augment configuration to ensure proper Odoo integration:

### Rules and User Guidelines

```
Always review the Odoo Enterprise repo for the correct odoo 18.0 code before writing new functionality to integrate with Odoo via the xmlrpc client. Ensure that all of your code meets the Odoo api and requirements.

Use the odoo-xmlrpc code base to understand how the odoo-xmlrpc npm package integrates with Odoo to ensure you're writing correct code.
```

### Visual Rules Setup Guide

![Augment Rules Setup](.dev/augment_rules_setup_1.PNG)

*Screenshot showing how to configure rules in Augment settings*

## Context Structure

After setup, your Augment context should include:

```
📁 Context
├── 📁 hyperprints_coming_soon (main project)
├── 📁 odoo-xmlrpc-ts (XMLRPC client source)
└── 📁 odoo_enterprise (Odoo 18.0 Enterprise codebase)
```

## Why This Setup is Important

### 1. **Accurate API Usage**
- The Odoo Enterprise codebase provides the definitive reference for Odoo 18.0 APIs
- Ensures compatibility with the latest Odoo features and field structures
- Prevents deprecated API usage

### 2. **Proper XMLRPC Integration**
- The odoo-xmlrpc source code shows correct usage patterns
- Helps understand data types, method signatures, and error handling
- Ensures efficient and reliable XMLRPC calls

### 3. **Code Quality**
- Augment can reference actual Odoo model definitions
- Provides accurate field names, relationships, and constraints
- Ensures proper data validation and formatting

## Development Workflow

When working on Odoo integration features:

1. **Research First**: Check the Odoo Enterprise codebase for relevant models and methods
2. **Reference XMLRPC Client**: Review how similar operations are implemented in odoo-xmlrpc
3. **Implement**: Write code that follows Odoo conventions and API patterns
4. **Test**: Verify against actual Odoo instance using the test endpoints

## Key Odoo Modules to Reference

For this project, pay special attention to these Odoo modules:

- **`crm/`** - Customer Relationship Management (leads, opportunities)
- **`mail/`** - Email templates and messaging system
- **`base/`** - Core models (res.partner, res.users, etc.)
- **`sales_team/`** - Sales team management

## Troubleshooting

If you encounter issues:

1. **Check Odoo Documentation**: Reference the Enterprise codebase for field definitions
2. **Verify XMLRPC Usage**: Compare with examples in the odoo-xmlrpc repository
3. **Test API Calls**: Use the `/api/test-odoo` endpoint to verify connectivity
4. **Review Logs**: Check console output for detailed error messages

## Additional Resources

- **Odoo 18.0 Documentation**: https://www.odoo.com/documentation/18.0/
- **XMLRPC Package**: https://www.npmjs.com/package/odoo-xmlrpc
- **Project Setup**: See `ODOO_SETUP.md` for environment configuration
- **Environment Variables**: See `.env.example` for required configuration

---

**Note**: This setup ensures that Augment has complete context about both the XMLRPC client implementation and the target Odoo system, enabling accurate and efficient code generation for Odoo integration features.
