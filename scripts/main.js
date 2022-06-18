Events.on(ClientLoadEvent, () => {
  var itemTurrets = Vars.content.blocks().select(b => b instanceof ItemTurret);
  var liquidTurrets = Vars.content.blocks().select(b => b instanceof LiquidTurret);
  
  Vars.content.blocks().each(b => {
    if (itemTurrets.contains(b)) {
      const itemTurret = itemTurrets.random();
      b.ammoTypes = itemTurret.ammoTypes;
      itemTurrets.remove(itemTurret);
    }
    if (liquidTurrets.contains(b)) {
      const liquidTurret = liquidTurrets.random();
      b.ammoTypes = liquidTurret.ammoTypes;
      liquidTurrets.remove(liquidTurret);
    }
  });
});
