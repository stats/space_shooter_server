// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.32
// 

using Colyseus.Schema;

public class UnlockMessage : Schema {
	[Type(0, "map", typeof(MapSchema<UnlockItem>))]
	public MapSchema<UnlockItem> unlocks = new MapSchema<UnlockItem>();
}

