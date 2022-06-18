var debug = false; //if true, ammo swap data is shown in console

Events.on(ClientLoadEvent, () => {
  var it = Vars.content.blocks().select(b => b instanceof ItemTurret);
  var lt = Vars.content.blocks().select(b => b instanceof LiquidTurret);
  var itAmmo = new Seq();
  var ltAmmo = new Seq();
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
      if (debug) print("(" + b.name + "-" + b.ammoTypes + " -> " + t + ")");
      b.ammoTypes = t;
    }
    if (b instanceof LiquidTurret || b instanceof ContinuousLiquidTurret) {
      const t = ltAmmo.random();
      ltAmmo.remove(t);
      if (debug) print("(" + b.name + "-" + b.ammoTypes + " -> " + t + ")");
      b.ammoTypes = t;
    }
  });
});
