# API Documentation for api.prod.runiverseservers.com

This documentation covers all endpoints based on captured API interactions.

## Table of Contents
1. [GetNativeEquipmentData](#getnativeequipmentdata)
2. [GetAnimOrInanimAssetData](#getanimorinanimassetdata)
3. [GetItemExtendedProperties](#getitemextendedproperties)
4. [GetEquipmentPlayerData](#getequipmentplayerdata)
5. [GetItemDescriptorsFullData](#getitemdescriptorsfulldata)
6. [GetItemDescriptors](#getitemdescriptors)
7. [GetPlotType](#getplottype)
8. [GetUsersNames](#getusersnames)
9. [GetGameplayGlobals](#getgameplayglobals)

## GetNativeEquipmentData

Retrieves detailed data about native equipment items.

### Endpoint
```
POST /GetNativeEquipmentData
```

### Request Payload
```json
{
    "id": "string"  // Equipment ID (e.g., "651efba85fedae8b106096d6")
}
```

### Response
```json
{
    "data": {
        "_id": "string",
        "name": "string",  // e.g., "Hair 9 - Samurai"
        "styles": [
            {
                "native_color": "string",  // Color ID
                "icon": "string",          // Icon ID
                "sprite": "string"         // Sprite ID
            }
        ],
        "type": "string"  // e.g., "Hair"
    }
}
```

## GetAnimOrInanimAssetData

Retrieves animation, sprite sheet, and image data for assets.

### Endpoint
```
POST /GetAnimOrInanimAssetData
```

### Request Payload
```json
{
    "ids": ["string"]  // Array of asset IDs
}
```

### Response
For animated assets:
```json
{
    "data": {
        "assets": [
            {
                "_id": "string",
                "animation": {
                    "base": "string",  // Base animation URL
                    "small": "string", // Small animation URL
                    "large": "string"  // Large animation URL
                },
                "has_sfx": boolean,
                "name": "string",      // e.g., "Kitsune Gear"
                "sfx": [],            // Array of sound effects
                "sprite_sheet": {
                    "base": "string",  // Base sprite sheet URL
                    "small": "string", // Small sprite sheet URL
                    "large": "string"  // Large sprite sheet URL
                },
                "type": "string"      // e.g., "CharacterArmorBody"
            }
        ]
    }
}
```

For static assets:
```json
{
    "data": {
        "assets": [
            {
                "_id": "string",
                "image": "string",    // Image URL
                "name": "string",     // e.g., "Hemp"
                "type": "string"      // e.g., "Material"
            }
        ]
    }
}
```

## GetItemExtendedProperties

Retrieves detailed properties for items including affixes and cosmetic properties.

### Endpoint
```
POST /GetItemExtendedProperties
```

### Request Payload
```json
{
    "ids": ["string"]  // Array of item IDs
}
```

### Response
```json
{
    "data": [
        {
            "_id": "string",
            "description": "string",
            "sprite": "string",        // Sprite ID
            "affixes": [
                {
                    "_id": "string",
                    "affix_props": [
                        {
                            "target": "string",  // e.g., "Self"
                            "bonus": [
                                {
                                    "stat": "string",
                                    "stat_type": "string",      // e.g., "Advanced"
                                    "advanced_stat": "string",  // e.g., "HealingPotency"
                                    "magnitude": number,        // e.g., 10
                                    "perfect": boolean
                                }
                            ],
                            "tier": "string"    // e.g., "I" or "II"
                        }
                    ],
                    "affix_type": "string",     // e.g., "Support"
                    "category": "string",       // e.g., "Modifier"
                    "description": "string",
                    "item_type": "string",      // e.g., "All"
                    "mana_base_value": number,
                    "materials": [],
                    "name": "string",           // e.g., "Blooming"
                    "tier": "string",
                    "created_at": "string",     // ISO date
                    "updated_at": "string"      // ISO date
                }
            ],
            "affixes_triggered": [],
            "affixes_conditioned": [],
            "perfect_roll": boolean,
            "is_cosmetic": boolean,
            "hides_hair": boolean,
            "hides_facial_hair": boolean,
            "sprites": {                        // For mounts
                "body": "string",
                "clothes": "string",
                "rune": "string",
                "head": "string",
                "head_accesory": "string",
                "mouth_accesory": "string",
                "mount_back": "string"
            },
            "mount_type": "string"             // e.g., "Sitting"
        }
    ]
}
```

## GetEquipmentPlayerData

Retrieves a player's complete equipment loadout including cosmetics and mount information.

### Endpoint
```
POST /GetEquipmentPlayerData
```

### Request Payload
```json
{
    "global_id": "string",     // Player's global ID
    "character_id": "string"   // Character ID
}
```

### Response
```json
{
    "data": {
        "current_action": "string",
        "body_equipment": {
            "weapon_id": "string",
            "head_id": {
                "hair": {
                    "asset_id": "string",
                    "native_color_id": "string"
                },
                "facial_hair": {
                    "asset_id": "string",
                    "native_color_id": "string"
                },
                "face": {
                    "asset_id": "string",
                    "native_color_id": "string"
                }
            },
            "body_id": {
                "asset_id": "string",
                "native_color_id": "string"
            },
            "helmet_id": {
                "native": {
                    "asset_id": "string",
                    "native_color_id": "string"
                },
                "equipped": "string"
            },
            "suit_id": {
                "native": {
                    "asset_id": "string",
                    "native_color_id": "string"
                },
                "equipped": "string"
            },
            "accessory_id": {
                "native": {
                    "asset_id": "string",
                    "native_color_id": "string"
                },
                "equipped": "string"
            },
            "is_nft": boolean,
            "nft_body": "string",
            "nft_head": "string",
            "cosmetic_id": {
                "weapon": "string",
                "helmet": "string",
                "suit": "string"
            }
        },
        "crystal_equipment": {
            "cantrip": "string",
            "active": {
                "slot_1": "string",
                "slot_2": "string",
                "slot_3": "string"
            },
            "heart": {
                "slot_1": "string",
                "slot_2": "string"
            },
            "soul": "string"
        },
        "mount_equipment": {
            "mount_id": "string",
            "is_riding": boolean
        },
        "specialization_equipment": {
            "specialization_id": "string"
        }
    }
}
```

## GetItemDescriptorsFullData

Retrieves complete item descriptor data including extended properties.

### Endpoint
```
POST /GetItemDescriptorsFullData
```

### Request Payload
```json
{
    "ids": ["string"]  // Array of item IDs
}
```

### Response
```json
{
    "data": [
        {
            "_id": "string",
            "bag": number,
            "rarity": number,
            "name": "string",
            "type": "string",        // e.g., "Headgear"
            "sub_type": "string",    // e.g., "None"
            "tier": "string",        // e.g., "I" or "II"
            "icon": "string",        // Icon ID
            "minteable": boolean,
            "burneable": boolean,
            "extended_properties": {
                // Same structure as GetItemExtendedProperties response
            }
        }
    ]
}
```

## GetItemDescriptors

Retrieves basic item descriptor information.

### Endpoint
```
POST /GetItemDescriptors
```

### Request Payload
```json
{
    "ids": ["string"]  // Array of item IDs
}
```

### Response
```json
{
    "data": [
        {
            "_id": "string",
            "__v": number,
            "bag": number,
            "family": "string",
            "icon": "string",    // Icon ID
            "name": "string",    // Item name
            "rarity": number,
            "type": "string"     // e.g., "metal", "fabric"
        }
    ]
}
```

## GetPlotType

Retrieves information about a plot type including its building mask and dimensions.

### Endpoint
```
POST /GetPlotType
```

### Request Payload
```json
{
    "_id": "string"  // Plot type ID
}
```

### Response
```json
{
    "data": {
        "plot_type": {
            "_id": "string",
            "build_area_mask": {
                "image": "string",  // URL to building mask image
                "name": "string"    // e.g., "plot building mask 8x8 layout 0"
            },
            "buildable_area_in_squared_tiles": number,  // e.g., 8
            "height_in_pixels": number,                 // e.g., 128
            "width_in_pixels": number,                  // e.g., 128
            "name": "string"                           // e.g., "8x8"
        }
    }
}
```

## GetUsersNames

Retrieves usernames for given user IDs.

### Endpoint
```
POST /GetUsersNames
```

### Request Payload
```json
{
    "ids": ["string"]  // Array of user IDs
}
```

### Response
```json
{
    "data": {
        "user_id": "username"  // Key-value pairs of user IDs to usernames
    }
}
```

### Example Response
```json
{
    "data": {
        "8684E3430EEC00EE": "sebuu"
    }
}
```

## GetGameplayGlobals

Retrieves global game configuration settings.

### Endpoint
```
POST /GetGameplayGlobals
```

### Request Payload
```json
{}  // No payload required
```

### Response
```json
{
    "data": {
        "_id": "string",
        "character_specializations": {
            "level_requirements": {
                "tier_1": number,
                "tier_2": number,
                "tier_3": number
            },
            "list": []
        },
        "mana_infusion_costs": {
            "base": number,
            "item_type_multiplier": {
                "SPECIFIC": number,
                "EQUIPMENT": number,
                "CRYSTAL": number,
                "DECORATION": number
            },
            "rarity_multiplier": {
                "COMMON": number,
                "UNCOMMON": number,
                "RARE": number,
                "UNIQUE": number
            },
            "tier_multiplier": number[]
        },
        "ring_mana": {
            "normal": {
                "max_capacity": number,
                "recharge_interval_in_seconds": number,
                "recharge_amount": number
            },
            "rare": {
                "max_capacity": number,
                "recharge_interval_in_seconds": number,
                "recharge_amount": number
            }
        },
        "stats_constants": {
            "base_values": {
                "base_critical_multiplier": number,
                "atb_base_miliseconds": {
                    "single_battle": number,
                    "duo_battle": number,
                    "trio_battle": number,
                    "full_battle": number
                },
                "base_stats_start": {
                    "xp": number,
                    "level": number,
                    "strength": number,
                    "dexterity": number,
                    "constitution": number,
                    "intelligence": number,
                    "wisdom": number,
                    "luck": number
                },
                "shield_decay_per_second": number
            },
            "modulators": {
                "dodge_modulator": number,
                "defense_modulator": number,
                "speed_modulator": number,
                "healing_potency_modulator": number,
                "physical_damage_modulator": number,
                "magical_damage_modulator": number,
                "hit_points_modulator": number,
                "shield_potency_modulator": number,
                "status_resistance_modulator": number
            }
        },
        // Many more configuration settings...
    }
}
