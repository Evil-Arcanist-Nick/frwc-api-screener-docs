# ID Documentation

This document provides details about the various IDs used in the API responses and what game elements they correspond to.

## Item IDs

### Mount IDs
Example: `_64b9afb62c5595e63d87e5fd_654fd0c798acf092a02c385b`
Returns:
- Mount type information
- Sprite data for different parts (body, clothes, rune, head, etc.)
- Description
- Minteable status
- Creation/update timestamps
- Mystery box data (if applicable)

### Cosmetic IDs
Example: `_64b9b3a22c5595e63d87e865_6552efd55420227106419438`
Returns:
- Description
- Sprite ID
- Cosmetic flags (is_cosmetic, hides_hair, hides_facial_hair)
- NFT image ID (if applicable)
- Affix information (if any)

### Equipment IDs
Example: `_679d251588ed77a5304819f5_67ec3a23fcadb53080a4d74a`
Returns:
- Item name and description
- Sprite ID
- Rarity level
- Equipment type and subtype
- Tier information
- Affix data including:
  - Affix type (Support, Offensive, etc.)
  - Bonus stats and magnitudes
  - Tier levels
  - Perfect roll status
- Visual properties (hides_hair, hides_facial_hair)

### Asset IDs
Example: `638efb19e809513c2001547e`
Returns:
- Animation data
  - Base URL
  - Small/Large variants
- Sprite sheet data
  - Base URL
  - Small/Large variants
- Asset type
- Name
- SFX information

### Material IDs
Example: `634f2a9e808f6bf4626a3653`
Returns:
- Material name
- Rarity
- Type (e.g., fabric)
- Icon ID
- Bag slot number

## Character IDs

### Global ID
Format: 16 character hexadecimal (e.g., `BC89E213BE59927E`)
Used in combination with character_id for player data requests

### Character ID
Format: 14 character hexadecimal (e.g., `46368F4266EAE94`)
Used to retrieve specific character equipment and status data

## Equipment Data Structure

When requesting equipment data, the response includes:
- Weapon ID
- Head ID (including hair, facial hair, face assets)
- Body ID
- Helmet ID
- Suit ID
- Accessory ID
- Crystal equipment
- Mount equipment
- Specialization equipment

Each equipment slot can contain:
- Native equipment (default/base items)
- Equipped items (player-obtained items)
- Cosmetic overrides

## Crystal Equipment Structure

Crystal equipment includes:
- Cantrip slot
- Active slots (1-3)
- Heart slots (1-2)
- Soul slot

## User IDs
Format: 24 character hexadecimal (e.g., `6322636c4745f215b46c918a`)
Used to identify users in the system

## Plot IDs
Example: `6344968f46243558dd218bc8`
Returns:
- Plot type information
- Building area mask data
- Plot dimensions
- Buildable area information

## Notes

1. Most IDs follow either:
   - Double underscore format: `_[first_id]_[second_id]` for items
   - Single 24-character hexadecimal format for system objects
   - 14-16 character hexadecimal format for character/player identifiers

2. Asset IDs typically link to:
   - Images
   - Animations
   - Sprite sheets
   - Icons

3. Equipment IDs contain information about:
   - Base stats
   - Affixes
   - Visual properties
   - Crafting/trading properties

4. All timestamps in the system are stored in ISO 8601 format with UTC timezone
