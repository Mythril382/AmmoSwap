function randomizeAmmo() {
  const it = Vars.content.blocks().select(b => b instanceof ItemTurret);
  const lt = Vars.content.blocks().select(b => b instanceof LiquidTurret || b instanceof ContinuousLiquidTurret);
  const itAmmo = new Seq();
  const ltAmmo = new Seq();
  it.each(t => {
    itAmmo.add(t.ammoTypes.copy());
  });
  lt.each(t => {
    ltAmmo.add(t.ammoTypes.copy());
  });
  
  Vars.content.blocks().each(b => {
    if (b instanceof ItemTurret) {
      const t = itAmmo.random();
      itAmmo.remove(t);
      if (Core.settings.getBool("ammo-swap-show-debug", false)) print(Core.bundle.format("ammo-swap-debug", t, b.localizedName));
      b.ammoTypes = t;
    }
    if (b instanceof LiquidTurret || b instanceof ContinuousLiquidTurret) {
      const t = ltAmmo.random();
      ltAmmo.remove(t);
      if (Core.settings.getBool("ammo-swap-show-debug", false)) print(Core.bundle.format("ammo-swap-debug", t, b.localizedName));
      b.ammoTypes = t;
    }
  });
}

Events.on(ClientLoadEvent, () => {
  Vars.ui.settings.addCategory("@setting.ammo-swap", Icon.turret, c => {
    c.checkPref("ammo-swap-world-load", false);
    c.checkPref("ammo-swap-show-debug", false);
  });
  
  if (Core.settings.getBool("ammo-swap-world-load", false)) Events.on(WorldLoadEvent, () => randomizeAmmo()); 
  
  randomizeAmmo();
});
