(()=>{"use strict";var t={850:(t,e,i)=>{i.r(e)},62:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{h(s.next(t))}catch(t){n(t)}}function r(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}h((s=s.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.MonsterAi=e.PlayerAI=void 0;const n=i(928),a=o(i(377)),r=i(607);class h{update(t){return s(this,void 0,void 0,(function*(){console.log("raw ai.",t)}))}}e.default=h,e.PlayerAI=class extends h{update(t){return s(this,void 0,void 0,(function*(){if(t.destructible&&t.destructible.isDead())return;let e=0,i=0;"ArrowLeft"===r.game.lastKey?e=-1:"ArrowRight"===r.game.lastKey?e=1:"ArrowUp"===r.game.lastKey?i=-1:"ArrowDown"===r.game.lastKey&&(i=1),yield this.handleActionKey(t,r.game.lastKey),0==e&&0==i||(r.game.gamestatus=r.GameStatus.NEW_TURN,(yield this.moveOrAttack(t,new a.default(t.pos.x+e,t.pos.y+i)))&&t.fov&&(yield t.computeFov()))}))}chooseFromInventory(t){var e,i;return s(this,void 0,void 0,(function*(){r.game.clear(new r.Color(0,0,0));let s="a";for(let o=0;o<(null===(e=(0,n.ensure)(t.container))||void 0===e?void 0:e.inventory.length);o++){const e=null===(i=t.container)||void 0===i?void 0:i.inventory[o];console.log(null==e?void 0:e.name),r.game.drawText(`${s}) ${null==e?void 0:e.name}`,2,2+o,"#FFFFFF"),s=String.fromCharCode(s.charCodeAt(0)+1)}const o=(yield r.game.getch()).charCodeAt(0)-97;if(o>=0&&o<(0,n.ensure)(t.container).inventory.length)return(0,n.ensure)(t.container).inventory[o]}))}handleActionKey(t,e){return s(this,void 0,void 0,(function*(){"g"===e?yield(()=>s(this,void 0,void 0,(function*(){var e,i,s;let o=!1;for(let s=0;s<r.game.actors.length;s++){const n=r.game.actors[s];if(n.pickable&&n.pos.x===t.pos.x&&n.pos.y===t.pos.y){if(n.pickable.pick(n,t)){null===(e=r.game.log)||void 0===e||e.addToLog(`Nostit esineen ${n.name}`,"#999"),o=!0;break}o||null===(i=r.game.log)||void 0===i||i.addToLog("Sinun laukkusi on täynnä.","#999")}}o||null===(s=r.game.log)||void 0===s||s.addToLog("Tässä ei ole mitään poimittavaa.","#999"),r.game.gamestatus=r.GameStatus.NEW_TURN})))():"i"===e?yield(()=>s(this,void 0,void 0,(function*(){var e;const i=yield this.chooseFromInventory(t);i&&(null===(e=r.game.log)||void 0===e||e.addToLog(`Käytit esineen ${i.name}`,"#999"),(0,n.ensure)(i.pickable).use(i,t)),r.game.gamestatus=r.GameStatus.NEW_TURN})))():">"===e&&(yield(()=>s(this,void 0,void 0,(function*(){var e,i,s;(null===(e=r.game.level)||void 0===e?void 0:e.stairs.x)===t.pos.x&&(null===(i=r.game.level)||void 0===i?void 0:i.stairs.y)===t.pos.y?r.game.nextLevel():null===(s=r.game.log)||void 0===s||s.addToLog("Tässä ei ole portaita.","#999"),r.game.gamestatus=r.GameStatus.NEW_TURN})))())}))}moveOrAttack(t,e){var i;return s(this,void 0,void 0,(function*(){const s=e;if(r.game.isWall(s))return!1;for(let i=0;i<r.game.actors.length;i++){const s=r.game.actors[i];if(s.attacker&&s.destructible&&!s.destructible.isDead()&&s.pos.x===e.x&&s.pos.y===e.y)return yield(0,n.ensure)(t.attacker).attack(t,s),!1}for(let t=0;t<r.game.actors.length;t++){const s=r.game.actors[t];(s.destructible&&s.destructible.isDead()||s.pickable)&&s.pos.x===e.x&&s.pos.y===e.y&&(null===(i=r.game.log)||void 0===i||i.addToLog(`Tässä on ${s.name}.`,"#999"))}return t.pos=e,!0}))}},e.MonsterAi=class extends h{update(t){return s(this,void 0,void 0,(function*(){t.destructible&&t.destructible.isDead()||(yield this.moveOrAttack(t,(0,n.ensure)(r.game.player).pos))}))}moveOrAttack(t,e){var i;return s(this,void 0,void 0,(function*(){let s=e.x-t.pos.x,o=e.y-t.pos.y;const h=s>0?1:-1,l=o>0?1:-1,d=(0,n.float2int)(Math.sqrt(s*s+o*o));if(d>=2){s=(0,n.float2int)(Math.round(s/d)),o=(0,n.float2int)(Math.round(o/d));const e=new a.default(t.pos.x+s,t.pos.y+o),i=new a.default(t.pos.x+h,t.pos.y),u=new a.default(t.pos.x,t.pos.y+l);r.game.canWalk(e)?(t.pos.x+=s,t.pos.y+=o):r.game.canWalk(i)?t.pos.x+=h:r.game.canWalk(u)&&(t.pos.y+=l)}else yield null===(i=t.attacker)||void 0===i?void 0:i.attack(t,(0,n.ensure)(r.game.player))}))}}},354:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{h(s.next(t))}catch(t){n(t)}}function r(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}h((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Attacker=void 0;const o=i(933),n=i(607);e.Attacker=class{constructor(t,e){this.power=t,this.accuracy=e}attack(t,e){var i,a,r;return s(this,void 0,void 0,(function*(){if(e.destructible&&!e.destructible.isDead()){const s=o.random.getInt(1,this.power),h=o.random.getInt(1,20+this.accuracy);null===(i=n.game.log)||void 0===i||i.addToLog(`acc: ${h}`,"#FFF"),h>=e.destructible.defense?null===(a=n.game.log)||void 0===a||a.addToLog(`${t.name} hyökkää. ${e.name} ottaa ${s} vahinkoa`,"#FFF"):null===(r=n.game.log)||void 0===r||r.addToLog(`${t.name} hyökkää, mutta ${e.name} väistää iskun.`,"#AAA"),e.destructible.TakeDamage(e,s)}}))}}},693:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Container=void 0,e.Container=class{constructor(t){this.size=t,this.inventory=[]}add(t){return!(this.inventory.length>=this.size||(this.inventory.push(t),0))}remove(t){for(let e=0;e<this.inventory.length;e++)if(this.inventory[e]===t)return this.inventory.splice(e,1),!0;return!1}}},151:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ItemDestructible=e.PlayerDestructible=e.MonsterDestructible=e.Destructible=void 0;const s=i(928),o=i(607);class n{constructor(t,e,i){this.maxHP=t,this.HP=t,this.defense=e,this.corpseName=i}isDead(){return(0,s.float2int)(this.HP)<=0}TakeDamage(t,e){return e>0?(this.HP-=e,this.HP<=0&&this.Die(t)):e=0,e}Heal(t){return this.HP+=t,this.HP>=this.maxHP&&(t-=this.HP-this.maxHP,this.HP=this.maxHP),t}Die(t){t.ch="%",t.color="#800000",t.name=this.corpseName,t.blocks=!1,o.game.sendToBack(t)}}e.Destructible=n,e.MonsterDestructible=class extends n{constructor(t,e,i){super(t,e,i)}Die(t){var e;null===(e=o.game.log)||void 0===e||e.addToLog(`${t.name} kuoli`,"#999"),super.Die(t)}},e.PlayerDestructible=class extends n{constructor(t,e,i){super(t,e,i)}Die(t){var e;null===(e=o.game.log)||void 0===e||e.addToLog("Sinä kuolit","#900"),o.game.gamestatus=o.GameStatus.DEFEAT,super.Die(t)}},e.ItemDestructible=class extends n{constructor(t,e,i){super(t,e,i)}Die(t){var e;null===(e=o.game.log)||void 0===e||e.addToLog(`${t.name} räjähti!`,"#999"),super.Die(t)}}},915:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{h(s.next(t))}catch(t){n(t)}}function r(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}h((s=s.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.FieldOfView=void 0;const n=i(928),a=o(i(377)),r=i(607);e.FieldOfView=class{constructor(t,e){this.width=t,this.height=e,this.tiles=new Array(this.width*this.height).fill(0)}setInFov(t,e){t.x>=0&&t.y>=0&&t.x<this.width&&t.y<this.height&&(this.tiles[t.x+t.y*this.width]=e)}isInFov(t){return t.x>=0||t.y>=0||t.x<this.width||t.y<this.height?this.tiles[t.x+t.y*this.width]:0}clearLos(){return s(this,void 0,void 0,(function*(){for(let t=0;t<this.width*this.height;t++)this.tiles[t]=0}))}revealAll(){return s(this,void 0,void 0,(function*(){for(let t=0;t<this.width*this.height;t++)0==this.tiles[t]&&(this.tiles[t]=1)}))}calculate(t,e){return s(this,void 0,void 0,(function*(){for(let t=0;t<this.width*this.height;t++)2==this.tiles[t]&&(this.tiles[t]=1);for(let i=0;i<360;i++){let s=t.pos.x+.5,o=t.pos.y+.5;this.setInFov(new a.default((0,n.float2int)(s),(0,n.float2int)(o)),2);const h=Math.sin(i/180*3.1416),l=Math.cos(i/180*3.1416);for(let t=0;t<e;t++){s+=h,o+=l;const t=new a.default((0,n.float2int)(s),(0,n.float2int)(o));if(this.setInFov(new a.default((0,n.float2int)(s),(0,n.float2int)(o)),2),r.game.isWall(t))break}}}))}}},339:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{h(s.next(t))}catch(t){n(t)}}function r(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}h((s=s.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(928),a=o(i(377)),r=i(607);e.default=class{constructor(t,e,i){this.name=t,this.ch=e,this.color=i,this.pos=new a.default(1,1),this.blocks=!0,this.fovOnly=!0,this.blockFov=!1}update(){return s(this,void 0,void 0,(function*(){this.ai&&(yield this.ai.update(this))}))}computeFov(){return s(this,void 0,void 0,(function*(){this.fov&&this.fov.calculate(this,10)}))}getDistance(t){const e=this.pos.x-t.x,i=this.pos.y-t.y;return Math.sqrt(e*e+i*i)}Render(){var t;const e=(null===(t=r.game.player)||void 0===t?void 0:t.fov)&&r.game.player.fov.isInFov(this.pos);if(2===e||0!=e&&1==this.blockFov){const t=this.pos.x-(0,n.ensure)(r.game.camera).x,e=this.pos.y-(0,n.ensure)(r.game.camera).y;r.game.drawChar(this.ch,t,e,this.color)}}}},678:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.LightningBold=e.Healer=e.Pickable=void 0;const s=i(607);class o{pick(t,e){return!(!e.container||!e.container.add(t)||(s.game.removeActor(t),0))}use(t,e){return!!e.container&&(e.container.remove(t),!0)}}e.Pickable=o,e.Healer=class extends o{constructor(t){super(),this.amount=t}use(t,e){return!!(e.destructible&&e.destructible.Heal(this.amount)>0)&&super.use(t,e)}},e.LightningBold=class extends o{constructor(t,e){super(),this.range=t,this.damage=e}use(t,e){var i,o,n;const a=s.game.getClosestEnemy(e.pos,this.range);return a?(null===(o=s.game.log)||void 0===o||o.addToLog(`Salama iskee ja ${a.name} ottaa ${this.damage} verran vahinkoa`,"#999"),null===(n=a.destructible)||void 0===n||n.TakeDamage(a,this.damage),super.use(t,e)):(null===(i=s.game.log)||void 0===i||i.addToLog("Ei yhtään vihollista tarpeeksi lähellä.","#999"),!1)}}},607:function(t,e,i){var s=this&&this.__createBinding||(Object.create?function(t,e,i,s){void 0===s&&(s=i),Object.defineProperty(t,s,{enumerable:!0,get:function(){return e[i]}})}:function(t,e,i,s){void 0===s&&(s=i),t[s]=e[i]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),n=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&s(e,t,i);return o(e,t),e},a=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{h(s.next(t))}catch(t){n(t)}}function r(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}h((s=s.apply(t,e||[])).next())}))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.game=e.Game=e.Color=e.GameStatus=void 0,i(850);const h=r(i(339)),l=i(62),d=i(354),u=i(693),c=i(151),f=i(915),v=i(678),m=n(i(933)),g=i(928),p=i(804),y=i(5),w=r(i(377));var x;!function(t){t[t.STARTUP=0]="STARTUP",t[t.IDLE=1]="IDLE",t[t.NEW_TURN=2]="NEW_TURN",t[t.VICTORY=3]="VICTORY",t[t.DEFEAT=4]="DEFEAT"}(x=e.GameStatus||(e.GameStatus={}));class F{constructor(t,e,i){this.r=0,this.g=0,this.b=0,this.r=t,this.g=e,this.b=i}}e.Color=F;class _{constructor(){this.fontSize=12,this.masterSeed=0,this.depth=0,this.canvas=(0,g.ensure)(document.querySelector("#screen")),this.ctx=(0,g.ensure)(this.canvas.getContext("2d")),this.ctx.font=`${this.fontSize}px system-ui`,this.width=1024,this.height=512,this.lastKey="",this.actors=[],this.log=new y.Log(10),this.camera=new p.Camera,this.gamestatus=x.STARTUP}clear(t){this.ctx.fillStyle=(0,g.rgbToHex)(t.r,t.g,t.b),this.ctx.fillRect(0,0,this.width,this.height)}putPixel(t,e,i){const s=this.ctx.getImageData(0,0,this.width,this.height),o=4*(e*s.width+t),n=s.data;n[o]=i.r,n[o+1]=i.g,n[o+2]=i.b,n[o+3]=255,this.ctx.putImageData(s,0,0)}renderVersion(){const t="Commit ID: 945df68 | Version: v0.0.000001";this.drawText(`${t}`,80-t.length,this.ctx.canvas.height/this.fontSize-2,"#808080")}drawChar(t,e,i,s="#BBB"){e<0||i<0||(e+1)*this.fontSize>=this.width||(i+1)*this.fontSize>=this.height||(this.ctx.textAlign="center",this.ctx.fillStyle="#100A14",this.ctx.fillRect(e*this.fontSize-this.fontSize/2,i*this.fontSize,this.fontSize,this.fontSize),this.ctx.fillStyle=s,this.ctx.fillText(t,e*this.fontSize,i*this.fontSize+this.fontSize))}drawText(t,e,i,s="#909090"){for(let o=0;o<t.length;o++)this.drawChar(t.charAt(o),e+o,i,s)}waitingKeypress(){return new Promise((t=>{const i=s=>a(this,void 0,void 0,(function*(){s.key&&(e.game.lastKey=s.key),document.removeEventListener("keydown",i),t()}));document.addEventListener("keydown",i)}))}getch(){return a(this,void 0,void 0,(function*(){yield this.waitingKeypress();const t=this.lastKey;return this.lastKey="",t}))}renderUI(){var t,e,i,s,o,n;this.drawText(`Syvyys: ${this.depth}`,(0,g.float2int)(this.width/this.fontSize)-10,0,"#FFF"),this.drawText(`HP: ${null===(e=null===(t=this.player)||void 0===t?void 0:t.destructible)||void 0===e?void 0:e.HP} / ${null===(s=null===(i=this.player)||void 0===i?void 0:i.destructible)||void 0===s?void 0:s.maxHP}`,1,0,"#FFF"),this.drawText(`AC: ${null===(n=null===(o=this.player)||void 0===o?void 0:o.destructible)||void 0===n?void 0:n.defense}`,1,1,"#FFF"),this.renderVersion()}render(){var t,e;this.clear(new F(3,3,5)),null===(t=this.level)||void 0===t||t.render();for(let t=0;t<this.actors.length;t++)this.actors[t].Render();null===(e=this.log)||void 0===e||e.render(),this.renderUI()}getClosestEnemy(t,e){let i,s=1e4;for(let o=0;o<this.actors.length;o++){const n=this.actors[o],a=n.getDistance(t);a<s&&(a<=e||0===e)&&n!==this.player&&(s=a,i=n)}return i}removeActor(t){this.actors=this.actors.filter((e=>e!==t))}sendToBack(t){this.removeActor(t),this.actors.unshift(t)}isWall(t){return(0,g.ensure)(this.level).isWall(t.x,t.y)}canWalk(t){if(this.isWall(t))return!1;for(let e=0;e<this.actors.length;e++)if(this.actors[e].blocks&&this.actors[e].pos.x===t.x&&this.actors[e].pos.y===t.y)return!1;return!0}gameLoop(){var t,e;return a(this,void 0,void 0,(function*(){for((0,g.ensure)(this.player).computeFov(),null===(t=this.camera)||void 0===t||t.update((0,g.ensure)(this.player)),this.render();;){if(this.lastKey=yield this.getch(),this.gamestatus!==x.DEFEAT&&(this.gamestatus=x.IDLE),yield(0,g.ensure)(this.player).update(),null===(e=this.camera)||void 0===e||e.update((0,g.ensure)(this.player)),this.gamestatus===x.NEW_TURN)for(let t=0;t<this.actors.length;t++)this.actors[t]!=this.player&&(yield this.actors[t].update());this.render()}}))}addUnit(t,e,i,s,o){const n=new h.default(t,s,o);n.pos.x=e,n.pos.y=i,this.actors.push(n)}addItem(t,e,i){let s,o="#808080",n="?",a=!1;"Healing potion"===t?(o="#FF00FF",n="!",s=new v.Healer(10)):"Scroll of lightning bolt"===t?(o="#FFAA00",n="#",s=new v.LightningBold(10,15)):"Stairs"===t&&(o="#FFFFFF",n=">",a=!0),this.addUnit(t,e,i,n,o);const r=this.actors[this.actors.length-1];r.blockFov=a,s&&(r.pickable=s),console.log(`Item ${r.name} added`),this.sendToBack(r)}addAI(t,e,i){let s="#808080",o="?",n=10,a=2;const r="carcass of "+t;let h=1,v=1;if("Hero"===t)return s="#FFF",o="@",n=15,a=10,h=5,v=10,this.addUnit(t,e,i,o,s),this.player=this.actors[this.actors.length-1],this.player.destructible=new c.PlayerDestructible(n,a,r),this.player.attacker=new d.Attacker(h,v),(0,g.ensure)(this.player).ai=new l.PlayerAI,this.player.container=new u.Container(26),this.player.fov=new f.FieldOfView((0,g.ensure)(this.level).width,(0,g.ensure)(this.level).height),void(this.player.pos=(0,g.ensure)(this.level).startPosition);"Orc"===t?(o="O",s="#00FF00",n=7,a=2,h=5,v=9):"Rotta"===t?(o="r",s="#808080",n=3,a=1,h=2,v=3):"Jättirotta"===t&&(o="R",s="#808080",n=5,a=1,h=4,v=5),this.addUnit(t,e,i,o,s);const m=this.actors[this.actors.length-1];m.ai=new l.MonsterAi,m.attacker=new d.Attacker(h,v),m.destructible=new c.MonsterDestructible(n,a,r)}init(){this.level=new m.default(80,40)}nextLevel(){var t,e,i,s,o;return a(this,void 0,void 0,(function*(){null===(t=this.log)||void 0===t||t.addToLog("Menit yhden tason alemmas.","#999"),this.level=void 0;const n=this.player;this.actors=[],this.level=new m.default(80,40),this.depth++,null===(e=this.level)||void 0===e||e.generateMap(this.masterSeed,this.depth),this.actors.push(n),(0,g.ensure)(this.player).pos=(0,g.ensure)(this.level).startPosition,yield null===(s=null===(i=this.player)||void 0===i?void 0:i.fov)||void 0===s?void 0:s.clearLos(),this.addItem("Stairs",(0,g.ensure)(this.level).stairs.x,(0,g.ensure)(this.level).stairs.y),this.fillWithNPCs(),this.fillWithItems(),yield null===(o=this.player)||void 0===o?void 0:o.computeFov()}))}newGame(){var t;if(this.masterSeed=(0,g.float2int)(134217727*Math.random()),window.location.search){const t=new URLSearchParams(window.location.search);t.has("seed")&&(this.masterSeed=parseInt((0,g.ensure)(t.get("seed"))))}history.pushState({},"Dungeon of Slan",`/DungeonOfSlan/?seed=${this.masterSeed}`),null===(t=this.level)||void 0===t||t.generateMap(this.masterSeed,this.depth),this.addAI("Hero",4,12),this.fillWithNPCs(),this.fillWithItems(),this.addItem("Stairs",(0,g.ensure)(this.level).stairs.x,(0,g.ensure)(this.level).stairs.y)}fillWithItems(){var t,e,i,s;for(let o=0;o<(0,g.ensure)(null===(t=this.level)||void 0===t?void 0:t.root).rooms.length;o++){const t=(0,g.ensure)(null===(i=null===(e=this.level)||void 0===e?void 0:e.root)||void 0===i?void 0:i.rooms[o]);if((0,g.float2int)(t.GetCenterX())===(null===(s=this.level)||void 0===s?void 0:s.startPosition.x)&&(0,g.float2int)(t.GetCenterY())===this.level.startPosition.y)continue;const n=Math.min(5,m.random.getInt(0,(0,g.float2int)(Math.sqrt(Math.max(0,(t.w-5)*(t.h-5))))));for(let e=0;e<n;e++){let e=0,i=0;for(;e=m.random.getInt((null==t?void 0:t.x)+2,t.x+t.w-2),i=m.random.getInt((null==t?void 0:t.y)+2,t.y+t.h-3),!this.canWalk(new w.default(e,i)););if(m.random.getInt(0,100)>50){const t=m.random.getInt(0,5);0===t&&this.addItem("Healing potion",e,i),1===t&&this.addItem("Scroll of lightning bolt",e,i)}}}}fillWithNPCs(){var t,e,i,s,o,n,a,r,h,l,d,u;let c=0,f=0;for(let o=0;o<(0,g.ensure)(null===(t=this.level)||void 0===t?void 0:t.root).rooms.length;o++){const t=(0,g.ensure)(null===(i=null===(e=this.level)||void 0===e?void 0:e.root)||void 0===i?void 0:i.rooms[o]);if(f++,(0,g.float2int)(t.GetCenterX())===(null===(s=this.level)||void 0===s?void 0:s.startPosition.x)&&(0,g.float2int)(t.GetCenterY())===this.level.startPosition.y)continue;const n=Math.min(5,m.random.getInt(0,(0,g.float2int)(Math.sqrt(Math.max(0,(t.w-5)*(t.h-5))))));for(let e=0;e<n;e++){let e=0,i=0;for(;e=m.random.getInt((null==t?void 0:t.x)+2,t.x+t.w-2),i=m.random.getInt((null==t?void 0:t.y)+2,t.y+t.h-3),!this.canWalk(new w.default(e,i)););m.random.getInt(0,100)>90&&(this.addAI("Rotta",e,i),c++)}}const v=c/f;v>=.7?null===(o=this.log)||void 0===o||o.addToLog(`${null===(n=this.level)||void 0===n?void 0:n.dungeonName} vaikuttaa todella vaaralliselta.`,"#FFFFFF"):v>=.5?null===(a=this.log)||void 0===a||a.addToLog(`${null===(r=this.level)||void 0===r?void 0:r.dungeonName} vaikuttaa melkoisen pahaenteiseltä.`,"#FFFFFF"):v>=.25?null===(h=this.log)||void 0===h||h.addToLog(`${null===(l=this.level)||void 0===l?void 0:l.dungeonName} vaikuttaa melkoisen asumattomalta.`,"#FFFFFF"):null===(d=this.log)||void 0===d||d.addToLog(`${null===(u=this.level)||void 0===u?void 0:u.dungeonName} vaikuttaa hiljaiselta.`,"#FFFFFF"),console.log(c/f,c,f)}load(){this.newGame()}run(){return a(this,void 0,void 0,(function*(){this.init(),this.load(),yield this.gameLoop()}))}}e.Game=_,e.game=new _,e.game.run()},634:function(t,e,i){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=s(i(262)),n=i(928),a=s(i(451)),r=s(i(357)),h=new a.default;e.default=class{constructor(t,e,i,s,o=5){this.maxLevel=o,this.rootContainer=new r.default(t+1,e+1,i-2,s-2),this.rows=s,this.cols=i,this.corridos=[],this.tempRooms=[],this.tree=this.Devide(this.rootContainer,0),this.rooms=this.tree.GetLeafs(),this.CreateRooms(),this.ConnectRooms(this.tree,this.corridos)}RandomSplit(t){let e,i,s=!h.getInt(0,1);if(s=t.w>t.h&&t.w/t.h>=.05,s){const s=h.getInt(.3*t.w,.6*t.w);e=new r.default(t.x,t.y,s,t.h),i=new r.default(t.x+s,t.y,t.w-s,t.h)}else{const s=h.getInt(.3*t.h,.6*t.h);e=new r.default(t.x,t.y,t.w,s),i=new r.default(t.x,t.y+s,t.w,t.h-s)}return[e,i]}Devide(t,e){const i=new o.default(t);if(e<this.maxLevel&&t.w>=10&&t.h>=10){const s=this.RandomSplit(t);i.A=this.Devide(s[0],e+1),i.B=this.Devide(s[1],e+1)}return i}CreateRooms(){for(const t of this.rooms){const e=h.getInt(.8*t.w,.9*t.w),i=h.getInt(.8*t.h,.9*t.h),s=h.getInt(t.x,t.x+t.w-e),o=h.getInt(t.y,t.y+t.h-i),n=new r.default(s,o,e,i);this.tempRooms.push(n)}}IsThereRoom(t,e){for(const i of this.tempRooms)if(t>=i.x&&e>=i.y&&t<=i.w&&e<=i.h)return!0;return!1}ConnectRooms(t,e){if(!t.A||!t.B)return!1;const i=(0,n.float2int)(t.A.leaf.GetCenterX()),s=(0,n.float2int)(t.A.leaf.GetCenterY()),o=(0,n.float2int)(t.B.leaf.GetCenterX()),a=(0,n.float2int)(t.B.leaf.GetCenterY());e.push(new r.default(i-1,s-1,o-1,a-1)),this.ConnectRooms((0,n.ensure)(t.A),e),this.ConnectRooms((0,n.ensure)(t.B),e)}}},262:function(t,e,i){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=s(i(357));class n extends o.default{constructor(t){super(t.x,t.y,t.w,t.h),this.A=void 0,this.B=void 0,this.leaf=t}GetLeafs(){return this.A&&this.B?[...this.A.GetLeafs(),...this.B.GetLeafs()]:[this.leaf]}}e.default=n},933:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{h(s.next(t))}catch(t){n(t)}}function r(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}h((s=s.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.random=void 0;const n=i(928),a=o(i(451)),r=o(i(357)),h=o(i(377)),l=i(607),d=o(i(634));var u;!function(t){t[t.unused=0]="unused",t[t.floor=1]="floor",t[t.wall=2]="wall"}(u||(u={}));class c{constructor(){this.x=0,this.y=0,this.distance=0,this.last=!1}}class f{constructor(){this.type=u.unused,this.collide=!1,this.color="#000000",this.character="?"}}e.random=new a.default,e.default=class{constructor(t,e){this.ROOM_MIN_SIZE=4,this.depth=0,this.levelSeed=0,this.width=t,this.height=e,this.dungeonName="Unknow dungeon",this.tiles=new Array(this.width*this.height).fill(!1),this.noisemap=new Array(this.width*this.height).fill(0),this.pathMap=new Array(this.width*this.height),this.nodeTemp=[],this.nodes=[],this.startPosition=new h.default(1,1),this.stairs=new h.default(1,1)}isWall(t,e){if(t>=0&&t<=this.width&&e>=0&&e<=this.height){const i=t+e*this.width;return this.tiles[i].collide}return!1}setWall(t,e){t=(0,n.float2int)(t),e=(0,n.float2int)(e),this.tiles[t+e*this.width].collide=!0,this.tiles[t+e*this.width].type=u.wall}setFloor(t,e){t=(0,n.float2int)(t),e=(0,n.float2int)(e),this.tiles[t+e*this.width].collide=!1,this.tiles[t+e*this.width].type=u.floor}dig(t,e,i,s){for(let o=e;o<e+s;o++)for(let e=t;e<t+i;e++)this.setFloor(e,o)}makeWalls(t,e,i,s){const o=s-e,n=i-t;this.dig(t,e,n,o);for(let s=0;s<=o;s++)this.setWall(t,e+s),this.setWall(i,e+s);for(let i=0;i<=n;i++)this.setWall(t+i,e),this.setWall(t+i,s)}fillUnusedTiles(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++){const i=e+t*this.width;this.tiles[i].type===u.unused&&this.setWall(e,t)}}makeDoorHole(t,e,i,s,o){0==o&&(this.setFloor(t-1,e+s/2),this.setFloor(t,e+s/2),this.setFloor(t+1,e+s/2)),1==o&&(this.setFloor(t+i-1,e+s/2),this.setFloor(t+i,e+s/2),this.setFloor(t+i+1,e+s/2)),2==o&&(this.setFloor(t+i/2,e-1),this.setFloor(t+i/2,e),this.setFloor(t+i/2,e+1)),3==o&&(this.setFloor(t+i/2,e+s-1),this.setFloor(t+i/2,e+s),this.setFloor(t+i/2,e+s+1))}createNaivePath(t,e,i,s){let o=t,n=e;for(;o<i?o++:o>i?o--:n<s?n++:n>s&&n--,o!=i||n!=s;)this.setFloor(o,n)}setPathStart(t,e){return s(this,void 0,void 0,(function*(){const i=this.convertXYtoID(t,e);i>=0&&i<this.width*this.height&&(this.pathMap[i]=1)}))}convertXYtoID(t,e){return t+e*this.width}createPath(t,e,i,s,o){this.nodes=[];for(let t=0;t<this.width*this.height;t++)this.pathMap[t]=this.tiles[t].collide?-1:0;this.setPathStart(t,e);let n=!1,a=0;for(let r=0;r<o;r++)for(let o=t-(r+1);o<t+r+1;o++)for(let t=e-(r+1);t<e+r+1;t++)o<0||t<0||o>=this.width-1||t>=this.height-1||this.pathMap[this.convertXYtoID(o,t)]===r&&(0===this.pathMap[this.convertXYtoID(o-1,t)]&&(this.pathMap[this.convertXYtoID(o-1,t)]=r+1),0===this.pathMap[this.convertXYtoID(o+1,t)]&&(this.pathMap[this.convertXYtoID(o+1,t)]=r+1),0===this.pathMap[this.convertXYtoID(o,t-1)]&&(this.pathMap[this.convertXYtoID(o,t-1)]=r+1),0===this.pathMap[this.convertXYtoID(o,t+1)]&&(this.pathMap[this.convertXYtoID(o,t+1)]=r+1),o===i&&t===s&&(n=!0),a++);if(0==n)return 1;let r=i,h=s;for(let t=0;t<a;t++){const t=this.convertXYtoID(r,h),e=r,i=h;if(this.pathMap[this.convertXYtoID(r-1,h)]===this.pathMap[t]-1&&r--,this.pathMap[this.convertXYtoID(r+1,h)]===this.pathMap[t]-1&&r++,this.pathMap[this.convertXYtoID(r,h-1)]===this.pathMap[t]-1&&h--,this.pathMap[this.convertXYtoID(r,h+1)]===this.pathMap[t]-1&&h++,e!==r||i!==h){const e=new c;e.x=r,e.y=h,e.distance=this.pathMap[t],this.nodes.push(e)}}return 0}generateMap(t,i){return s(this,void 0,void 0,(function*(){this.depth=i,this.levelSeed=t,this.nodeTemp=[],e.random.setSeed(this.levelSeed+25*i),this.generateName(),this.tiles=new Array(this.width*this.height).fill(!1);for(let t=0;t<this.width*this.height;t++)this.tiles[t]=new f;const s=e.random.getInt(4,8);console.log("splitted to "+s),this.root=new d.default(3,3,this.width-4,this.height-4,s);for(let t=0;t<this.root.rooms.length;t++){const i=this.root.tempRooms[t],s=new r.default(i.x,i.y,i.w,i.h);this.makeWalls(s.x,s.y,s.x+s.w,s.y+s.h),this.makeDoorHole(s.x,s.y,s.w,s.h,e.random.getInt(0,4))}const o=[];for(let t=0;t<this.root.corridos.length;t++){const e=this.root.corridos[t];this.nodes=[],this.createPath(e.x,e.y,e.w,e.h,128),0==this.nodes.length&&o.push(e);for(let t=0;t<this.nodes.length;t++)this.nodeTemp.push(this.nodes[t])}for(let t=0;t<this.nodeTemp.length;t++){const e=this.nodeTemp[t];this.setFloor(e.x,e.y)}for(let t=0;t<o.length;t++){const e=o[t];this.createNaivePath(e.x,e.y,e.w,e.h)}this.fillUnusedTiles();const a=e.random.getInt(0,this.root.rooms.length),h=this.root.rooms[a];for(this.startPosition.x=(0,n.float2int)(h.GetCenterX()),this.startPosition.y=(0,n.float2int)(h.GetCenterY());;){const t=e.random.getInt(0,this.root.rooms.length);if(t!=a){const e=this.root.rooms[t];this.stairs.x=(0,n.float2int)(e.GetCenterX()),this.stairs.y=(0,n.float2int)(e.GetCenterY());break}}}))}howManyWalls2(t,e){if(t>0&&e>0&&t<this.width-1&&e<this.height-1){let i=0;for(let s=t-1;s<=t+1;s++)for(let t=e-1;t<=e+1;t++)1===this.noisemap[s+t*this.width]&&i++;return i}return 0}placeWallLogic(t,e){const i=this.howManyWalls2(t,e);if(this.isWall(t,e)){if(i>=4)return 1;if(i<2)return 0}else if(i>=5)return 1;return 0}smoothMap(){return s(this,void 0,void 0,(function*(){const t=new Array(this.width*this.height).fill(0);for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)this.noisemap[e+t*this.width]=this.isWall(e,t)?0:1;console.log("cavern iters: ",3);for(let e=0;e<3;e++){for(let e=1;e<this.height-1;e++)for(let i=1;i<this.width-1;i++)t[i+e*this.width]=this.placeWallLogic(i,e);for(let e=0;e<this.width*this.height;e++)this.noisemap[e]=t[e]}for(let t=1;t<this.height-1;t++)for(let e=1;e<this.width-1;e++){const i=e+t*this.width;0!==this.noisemap[i]?this.setFloor(e,t):this.setWall(e,t)}}))}generateName(){const t=["Suuren","Mahtavan","Tukahduttavan","Kuristavan","Muinaisen","Ikuisen","Loputtoman","Armottoman"],i=["Pelon","Kuolon","Varjojen","Pimeyden","Kurjuuden","Tuskan","Vihan","Hulluuden","Painajaisten","Epätoivon"];this.dungeonName="",e.random.getInt(0,10)>=8&&(this.dungeonName=t[e.random.getInt(0,t.length)]+" "),this.dungeonName+=i[e.random.getInt(0,i.length)]+" "+["luola","pesä","maa","kehto","kirkko","temppeli","lähde","koti","linna","linnoitus"][e.random.getInt(0,i.length)],this.dungeonName=(0,n.capitalize)(this.dungeonName.toLowerCase())}render(){var t,e;const i=(0,n.ensure)(l.game.camera);for(let s=0;s<this.height;s++)for(let o=0;o<this.width;o++){const n=o-i.x,a=s-i.y,r=null===(e=null===(t=l.game.player)||void 0===t?void 0:t.fov)||void 0===e?void 0:e.isInFov(new h.default(o,s));2===r?1==this.tiles[o+s*this.width].collide?l.game.drawChar("#",n,a,"#999"):l.game.drawChar(".",n,a,"#999"):1===r&&(1==this.tiles[o+s*this.width].collide?l.game.drawChar("*",n,a,"#999"):l.game.drawChar(" ",n,a,"#999"))}}}},804:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Camera=void 0;const s=i(928),o=i(607);e.Camera=class{constructor(){this.x=0,this.y=0}update(t){this.x=t.pos.x-(0,s.float2int)(o.game.width/o.game.fontSize/2),this.y=t.pos.y-(0,s.float2int)(o.game.height/o.game.fontSize/2)}}},928:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.capitalize=e.float2int=e.rgbToHex=e.ensure=void 0,e.ensure=(t,e="This value was promised to be there.")=>{if(null==t)throw new TypeError(e);return t},e.rgbToHex=(t,e,i)=>"#"+((1<<24)+(t<<16)+(e<<8)+i).toString(16).slice(1),e.float2int=t=>t>>0,e.capitalize=t=>t.charAt(0).toUpperCase()+t.slice(1)},5:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Log=e.LogText=void 0;const s=i(928),o=i(607);class n{constructor(t,e){this.text=t,this.color=e,this.amount=1}}e.LogText=n,e.Log=class{constructor(t){this.size=t,this.currentSize=this.size,this.texts=[],this.decayTimeMax=10,this.decayTime=this.decayTimeMax}updateDecay(){this.decayTime=this.decayTimeMax,this.currentSize++,this.currentSize>=this.size&&(this.currentSize=this.size)}addToLog(t,e){if(this.texts.length>0&&t===this.texts[this.texts.length-1].text)return this.texts[this.texts.length-1].amount++,void this.updateDecay();const i=new n(t,e);this.texts.push(i),this.updateDecay()}render(){let t=0;this.decayTime<0&&(this.currentSize--,this.currentSize<0&&(this.currentSize=0));for(let e=this.texts.length-this.currentSize;e<this.texts.length;e++)if(e>=0){const e=this.texts.length-t-1,i=1===this.texts[e].amount?this.texts[e].text:this.texts[e].text+` (${this.texts[e].amount})`;o.game.drawText(i,1,(0,s.ensure)(o.game.level).height-t,this.texts[e].color),t++}this.decayTime--}}},451:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const s=i(928);let o=0;e.default=class{constructor(){this.rnd=0}setSeed(t){o=t}calc(){o=(9301*o+49297)%233280,this.rnd=o/233280}getInt(t,e){return e=e||1,t=t||0,this.calc(),Math.floor(t+this.rnd*(e-t))}dice(t,e,i=0){let s=0;e++;for(let i=0;i<t;i++)s+=Number(this.getInt(1,e));return s+=+i,s<t&&(s=t),s}parseDice(t){const e=t.includes("+")?parseInt((0,s.ensure)(t.split("+").at(1))):0,[i,o]=t.split("d");return[parseInt(i),parseInt(o),e]}}},357:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,i,s){this.x=t,this.y=e,this.w=i,this.h=s}GetHalfDimensionX(){return this.w/2}GetHalfDimensionY(){return this.h/2}GetCenterX(){return this.x+this.GetHalfDimensionX()}GetCenterY(){return this.y+this.GetHalfDimensionY()}}},377:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e){this.x=t,this.y=e}}}},e={};function i(s){var o=e[s];if(void 0!==o)return o.exports;var n=e[s]={exports:{}};return t[s].call(n.exports,n,n.exports,i),n.exports}i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(607)})();