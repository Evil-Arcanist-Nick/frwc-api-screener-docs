# Specific ID Documentation

This document provides a detailed breakdown of every specific ID encountered in the API responses and exactly what it returned.

## Mount IDs

### _64b9afb62c5595e63d87e5fd_654fd0c798acf092a02c385b
Returns a mount with:
- Description: "No seat is more comfortable. No throne is more glamorous."
- Mount Type: "Sitting"
- Sprites:
  - Body: "673fcd7fdf4fd194bc1afd20"
  - Clothes: "67378c75a71472a5d75d2991"
  - Rune: "67378c75a71472a5d75d2991"
  - Head: "673fcde8df4fd194bc1afd7d"
  - Head Accessory: "67378c75a71472a5d75d2991"
  - Mouth Accessory: "67378c75a71472a5d75d2991"
  - Mount Back: "67d98ba6285f4f44c2a2f29d"
- Minteable: true
- Created: "2024-12-10T15:25:12.041Z"
- Updated: "2025-03-18T16:31:42.221Z"
- Mystery Box Data:
  - ID: "64b9afb62c5595e63d87e5fd"
  - Burning Mana Value: 3
  - Description: "Contains an extremely rare Player Mount..."
  - Number: 2
  - Tier: "gold"

### _64b9aec52c5595e63d87e53e_6552004111fadcaedd969cf2
Used in mount_equipment data for a character (riding status: true)

## Cosmetic IDs

### _64b9b3a22c5595e63d87e865_6552efd55420227106419438
Returns a cosmetic item:
- Description: "Give Color to your ideas!"
- Sprite: "679a822588ed77a53035da48"
- Is Cosmetic: true
- NFT Image: "67bcd702c8a44bc80bf88ef8"
- Hides Hair: true
- Hides Facial Hair: false

### _67d996bc285f4f44c2a4e97a_67e715cb9359f97a1f366272
Returns the "Bear Patch":
- Description: "A token of appreciation from brother Bear."
- Sprite: "67d99974285f4f44c2a56177"
- NFT Image: "67d9990a285f4f44c2a54b9a"
- Bag: 22
- Rarity: 1
- Type: "Headgear"
- Tier: "II"
- Icon: "67d99842285f4f44c2a53666"
- Is Cosmetic: true
- Hides Hair: false
- Hides Facial Hair: false

## Equipment IDs

### _679d251588ed77a5304819f5_67ec3a23fcadb53080a4d74a
Returns "Assassin Cowl":
- Description: "No recognition needed for your noble deeds."
- Sprite: "634747a92efecc0d69b26616"
- Rarity: 1
- Type: "Headgear"
- Tier: "II"
- Icon: "636c0fb0d22c16e85b822026"
- Affixes:
  1. Lucky II:
     - Bonus: +14.7 Luck (Base)
     - Type: Support
     - Mana Value: 2
  2. Mighty II:
     - Bonus: +11.9 Physical Damage (Advanced)
     - Type: Offensive
     - Mana Value: 2
  3. Dexterous I:
     - Bonus: +8.2 Dexterity (Base)
     - Type: Support
     - Mana Value: 1
- Hides Hair: true
- Hides Facial Hair: false

## Asset IDs

### 638efb19e809513c2001547e
Returns "Hair blonde 2 short":
- Animation JSON: "https://d3hv7cxq1p9foc.cloudfront.net/MultiFileAssets/NativeCharacterAsset/Animation/hair_blonde_2.json"
- Sprite Sheet: "https://d3hv7cxq1p9foc.cloudfront.net/MultiFileAssets/NativeCharacterAsset/SpriteSheet/hair_blonde_2.png"
- Type: "NativeCharacterAsset"
- Has SFX: false

### 67c735ebec26e8bdac6f94a6
Returns "Scientist-Gear-T3":
- Animation JSON: "https://d3hv7cxq1p9foc.cloudfront.net/MultiFileAssets/CharacterArmorBody/Animation/scientist_t3_gear.json"
- Sprite Sheet: "https://d3hv7cxq1p9foc.cloudfront.net/MultiFileAssets/CharacterArmorBody/SpriteSheet/scientist_t3_gear.png"
- Type: "CharacterArmorBody"
- Has SFX: false

## Material IDs

### 634f2a9e808f6bf4626a3653
Returns "Hemp":
- Type: "fabric"
- Rarity: 0
- Bag: 2
- Icon: "63236d464745f215b46c93a7"

### 634f3562808f6bf4626a3738
Returns "Cotton":
- Type: "fabric"
- Rarity: 0
- Bag: 2
- Icon: "63236ded4745f215b46c93b9"

## Character IDs

### BC89E213BE59927E (Global ID) with 46368F4266EAE94 (Character ID)
Returns character equipment data including:
- Current Action: ""
- Body Equipment:
  - Weapon: "_64dfcdcee8ec8d469b25b905_67ed34a10aee9c6acce556bd"
  - Head customization details
  - Body customization details
  - Equipment in various slots
- Crystal Equipment:
  - Cantrip: "_67a521dba4bc507f2cbf19b2_67edfc9a1f44b6c96f4b94f7"
  - Active slots filled with various crystals
- Mount Equipment:
  - Mount: "_67585c9ebe88b5e0330bafbb_67e43201e9ede64846ca27c2"
  - Riding status: false
- Specialization: "678910fd993403f087a80908"

### CAF1781834D7020E (Global ID) with C8C17A5D8FA3E50B (Character ID)
Returns similar character equipment data with different equipped items and states

## Plot IDs

### 6344968f46243558dd218bc8
Returns plot type "8x8":
- Building Area Mask: Image for "plot building mask 8x8 layout 0"
- Buildable Area: 8 squared tiles
- Dimensions: 128x128 pixels

## User IDs

### 8684E3430EEC00EE
Returns username: "sebuu"

## Icon IDs

### 63236d464745f215b46c93a7
Returns Hemp material icon:
- Image: "https://d3hv7cxq1p9foc.cloudfront.net/Dev/SingleFileAssets/Material/Image/Fabric_Hemp.png"
- Type: "Material"

### 63236ded4745f215b46c93b9
Returns Cotton material icon:
- Image: "https://d3hv7cxq1p9foc.cloudfront.net/Dev/SingleFileAssets/Material/Image/Fabric_Cotton.png"
- Type: "Material"
