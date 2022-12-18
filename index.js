(()=>{"use strict";var t={850:(t,e,s)=>{s.r(e)},62:function(t,e,s){var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(o,n){function r(t){try{a(i.next(t))}catch(t){n(t)}}function h(t){try{a(i.throw(t))}catch(t){n(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,h)}a((i=i.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.MonsterAi=e.PlayerAI=void 0;const n=s(928),r=o(s(377)),h=s(607);class a{update(t){console.log("raw ai.",t)}}e.default=a,e.PlayerAI=class extends a{update(t){return i(this,void 0,void 0,(function*(){if(t.destructible&&t.destructible.isDead())return;let e=0,s=0;"ArrowLeft"===h.game.lastKey?e=-1:"ArrowRight"===h.game.lastKey?e=1:"ArrowUp"===h.game.lastKey?s=-1:"ArrowDown"===h.game.lastKey&&(s=1),yield this.handleActionKey(t,h.game.lastKey),0==e&&0==s||(yield this.moveOrAttack(t,new r.default(t.pos.x+e,t.pos.y+s)))&&console.log("compute fov")}))}chooseFromInventory(t){var e,s;return i(this,void 0,void 0,(function*(){h.game.clear(new h.Color(0,0,0));let i="a";for(let o=0;o<(null===(e=(0,n.ensure)(t.container))||void 0===e?void 0:e.inventory.length);o++){const e=null===(s=t.container)||void 0===s?void 0:s.inventory[o];console.log(null==e?void 0:e.name),h.game.drawText(`${i}) ${null==e?void 0:e.name}`,2,2+o,"#FFFFFF"),i=String.fromCharCode(i.charCodeAt(0)+1)}const o=yield h.game.getch();console.log(`ch: ${o}`);const r=o.charCodeAt(0)-97;if(r>=0&&r<(0,n.ensure)(t.container).inventory.length)return(0,n.ensure)(t.container).inventory[r]}))}handleActionKey(t,e){return i(this,void 0,void 0,(function*(){if("g"===e){let e=!1;for(let s=0;s<h.game.actors.length;s++){const i=h.game.actors[s];if(i.pickable&&i.pos.x===t.pos.x&&i.pos.y===t.pos.y){if(i.pickable.pick(i,t)){console.log(`You pick the ${i.name}`),e=!0;break}e||console.log("Your inventory is full")}}e||console.log("Nothing here that you can pick up.")}"i"===e&&(yield(()=>i(this,void 0,void 0,(function*(){const e=yield this.chooseFromInventory(t);e&&(console.log(`You use a ${e.name}`),(0,n.ensure)(e.pickable).use(e,t))})))())}))}moveOrAttack(t,e){return i(this,void 0,void 0,(function*(){const s=e;if(h.game.isWall(s))return!1;for(let s=0;s<h.game.actors.length;s++){const i=h.game.actors[s];if(i.attacker&&i.destructible&&!i.destructible.isDead()&&i.pos.x===e.x&&i.pos.y===e.y)return(0,n.ensure)(t.attacker).attack(t,i),!1}for(let t=0;t<h.game.actors.length;t++){const s=h.game.actors[t];s.destructible&&s.destructible.isDead()&&s.pos.x===e.x&&s.pos.y===e.y&&console.log(`There's a ${s.name} here`)}return t.pos=e,!0}))}},e.MonsterAi=class extends a{update(t){t.destructible&&t.destructible.isDead()||this.moveOrAttack(t,(0,n.ensure)(h.game.player).pos)}moveOrAttack(t,e){let s=e.x-t.pos.x,i=e.y-t.pos.y;const o=s>0?1:-1,a=i>0?1:-1,l=(0,n.float2int)(Math.sqrt(s*s+i*i));if(l>=2){console.log(l),s=(0,n.float2int)(s/l),i=(0,n.float2int)(i/l);const e=new r.default(t.pos.x+s,t.pos.y+i),c=new r.default(t.pos.x+o,t.pos.y),u=new r.default(t.pos.x,t.pos.y+o);h.game.canWalk(e)?(t.pos.x+=s,t.pos.y+=i,console.log(t.pos)):h.game.canWalk(c)?t.pos.x+=o:h.game.canWalk(u)&&(t.pos.y+=a)}}}},354:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Attacker=void 0,e.Attacker=class{constructor(t){this.power=t}attack(t,e){e.destructible&&!e.destructible.isDead()&&(this.power-e.destructible.defense>0?console.log(`${t.name} attacks ${e.name} for ${this.power} points.`):console.log(`${t.name} attacks ${e.name} but it has no effect.`),e.destructible.TakeDamage(e,this.power))}}},693:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Container=void 0,e.Container=class{constructor(t){this.size=t,this.inventory=[]}add(t){return!(this.inventory.length>=this.size||(this.inventory.push(t),0))}remove(t){for(let e=0;e<this.inventory.length;e++)if(this.inventory[e]===t)return this.inventory.splice(e,1),!0;return!1}}},151:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ItemDestructible=e.PlayerDestructible=e.MonsterDestructible=e.Destructible=void 0;const i=s(607);class o{constructor(t,e,s){this.maxHP=t,this.HP=t,this.defense=e,this.corpseName=s}isDead(){return this.HP<0}TakeDamage(t,e){return(e=this.defense)>0?(this.HP-=e,this.HP<=0&&this.Die(t)):e=0,e}Heal(t){return this.HP+=t,this.HP>=this.maxHP&&(t-=this.HP-this.maxHP,this.HP=this.maxHP),t}Die(t){t.ch="%",t.color="#800000",t.name=this.corpseName,t.blocks=!1,i.game.sendToBack(t)}}e.Destructible=o,e.MonsterDestructible=class extends o{constructor(t,e,s){super(t,e,s)}Die(t){console.log(`${t.name} is dead`),super.Die(t)}},e.PlayerDestructible=class extends o{constructor(t,e,s){super(t,e,s)}Die(t){console.log("You died!"),super.Die(t)}},e.ItemDestructible=class extends o{constructor(t,e,s){super(t,e,s)}Die(t){console.log(`${t.name} is smashed`),super.Die(t)}}},339:function(t,e,s){var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(o,n){function r(t){try{a(i.next(t))}catch(t){n(t)}}function h(t){try{a(i.throw(t))}catch(t){n(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,h)}a((i=i.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(s(377)),r=s(607);e.default=class{constructor(t,e,s){this.name=t,this.ch=e,this.color=s,this.pos=new n.default(1,1),this.blocks=!0,this.fovOnly=!0,this.blockFov=!1}update(){return i(this,void 0,void 0,(function*(){this.ai&&(yield this.ai.update(this))}))}getDistance(t){const e=this.pos.x-t.x,s=this.pos.y-t.y;return Math.sqrt(e*e+s*s)}Render(){r.game.drawChar(this.ch,this.pos.x,this.pos.y,this.color)}}},678:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.LightningBold=e.Healer=e.Pickable=void 0;const i=s(607);class o{pick(t,e){return!(!e.container||!e.container.add(t)||(i.game.removeActor(t),0))}use(t,e){return!!e.container&&(e.container.remove(t),!0)}}e.Pickable=o,e.Healer=class extends o{constructor(t){super(),this.amount=t}use(t,e){return!!(e.destructible&&e.destructible.Heal(this.amount)>0)&&super.use(t,e)}},e.LightningBold=class extends o{constructor(t,e){super(),this.range=t,this.damage=e}use(t,e){var s;const o=i.game.getClosestEnemy(e.pos,this.range);return o?(console.log(`A lightning bolt strikes ${o.name}`),console.log(`The damage is ${this.damage} points.`),null===(s=o.destructible)||void 0===s||s.TakeDamage(o,this.damage),super.use(t,e)):(console.log("No enemy is close enought to strike"),!1)}}},607:function(t,e,s){var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(o,n){function r(t){try{a(i.next(t))}catch(t){n(t)}}function h(t){try{a(i.throw(t))}catch(t){n(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,h)}a((i=i.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.game=e.Game=e.Color=void 0,s(850);const n=o(s(339)),r=s(62),h=s(354),a=s(693),l=s(151),c=s(678),u=o(s(933)),d=s(928);class f{constructor(t,e,s){this.r=0,this.g=0,this.b=0,this.r=t,this.g=e,this.b=s}}e.Color=f;class p{constructor(){this.fontSize=12,this.masterSeed=0,this.depth=0,this.canvas=(0,d.ensure)(document.querySelector("#screen")),this.ctx=(0,d.ensure)(this.canvas.getContext("2d")),this.ctx.font=`${this.fontSize}px system-ui`,this.width=1024,this.height=512,this.lastKey="",this.actors=[]}clear(t){this.ctx.fillStyle=(0,d.rgbToHex)(t.r,t.g,t.b),this.ctx.fillRect(0,0,this.width,this.height)}putPixel(t,e,s){const i=this.ctx.getImageData(0,0,this.width,this.height),o=4*(e*i.width+t),n=i.data;n[o]=s.r,n[o+1]=s.g,n[o+2]=s.b,n[o+3]=255,this.ctx.putImageData(i,0,0)}drawChar(t,e,s,i="#BBB"){e<0||s<0||(e+1)*this.fontSize>=this.width||(s+1)*this.fontSize>=this.height||(this.ctx.textAlign="center",this.ctx.fillStyle="#101010",this.ctx.fillRect(e*this.fontSize-this.fontSize/2,s*this.fontSize,this.fontSize,this.fontSize),this.ctx.fillStyle=i,this.ctx.fillText(t,e*this.fontSize,s*this.fontSize+this.fontSize))}drawText(t,e,s,i="#909090",o="left"){this.ctx.textAlign=o,this.ctx.font=`${this.fontSize}px system-ui`,this.ctx.fillStyle="#101010",this.ctx.fillStyle=i,this.ctx.fillText(t,e*this.fontSize,s*this.fontSize+this.fontSize)}waitingKeypress(){return new Promise((t=>{const s=o=>i(this,void 0,void 0,(function*(){o.key&&(e.game.lastKey=o.key),document.removeEventListener("keydown",s),t()}));document.addEventListener("keydown",s)}))}getch(){return i(this,void 0,void 0,(function*(){yield this.waitingKeypress();const t=this.lastKey;return this.lastKey="",t}))}render(){var t;this.clear(new f(0,0,0)),null===(t=this.level)||void 0===t||t.render();for(let t=0;t<this.actors.length;t++)this.actors[t].Render()}getClosestEnemy(t,e){let s,i=1e4;for(let o=0;o<this.actors.length;o++){const n=this.actors[o],r=n.getDistance(t);r<i&&(r<=e||0===e)&&n!==this.player&&(i=r,s=n)}return s}removeActor(t){this.actors=this.actors.filter((e=>e!==t))}sendToBack(t){this.removeActor(t),this.actors.unshift(t)}isWall(t){return(0,d.ensure)(this.level).isWall(t.x,t.y)}canWalk(t){if(1==this.isWall(t))return!1;for(let e=0;e<this.actors.length;e++)if(this.actors[e].blocks&&this.actors[e].pos===t)return!1;return!0}gameLoop(){return i(this,void 0,void 0,(function*(){for(this.render();;){this.lastKey=yield this.getch(),yield(0,d.ensure)(this.player).update();for(let t=0;t<this.actors.length;t++)this.actors[t]!=this.player&&(yield this.actors[t].update());this.render()}}))}addUnit(t,e,s,i,o){const r=new n.default(t,i,o);r.pos.x=e,r.pos.y=s,this.actors.push(r)}addItem(t,e,s){let i,o="#808080",n="?";"Healing potion"===t?(o="#FF00FF",n="!",i=new c.Healer(10)):"Scroll of lightning bolt"===t&&(o="#FFAA00",n="#",i=new c.LightningBold(10,15)),this.addUnit(t,e,s,n,o);const r=this.actors[this.actors.length-1];i&&(r.pickable=i),this.sendToBack(r)}addAI(t,e,s){let i="#808080",o="?",n=10,c=2;const u="carcass of "+t;let f=1;if("Hero"===t)return i="#FFF",o="@",n=15,c=5,f=5,this.addUnit(t,e,s,o,i),this.player=this.actors[this.actors.length-1],this.player.destructible=new l.PlayerDestructible(n,c,u),this.player.attacker=new h.Attacker(f),(0,d.ensure)(this.player).ai=new r.PlayerAI,void(this.player.container=new a.Container(26));"Orc"===t&&(o="O",i="#00FF00",n=7,c=2,f=2),this.addUnit(t,e,s,o,i);const p=this.actors[this.actors.length-1];p.ai=new r.MonsterAi,p.attacker=new h.Attacker(f),p.destructible=new l.MonsterDestructible(n,c,u)}init(){this.level=new u.default(80,40)}newGame(){var t;if(this.masterSeed=(0,d.float2int)(134217727*Math.random()),window.location.search){const t=new URLSearchParams(window.location.search);t.has("seed")&&(this.masterSeed=parseInt((0,d.ensure)(t.get("seed"))))}history.pushState({},"Dungeon of Slan",`/DungeonOfSlan/?seed=${this.masterSeed}`),null===(t=this.level)||void 0===t||t.generateMap(this.masterSeed,this.depth),this.addAI("Hero",4,12),this.addAI("Orc",14,12),this.addItem("Healing potion",6,6),this.addItem("Scroll of lightning bolt",10,6)}load(){this.newGame()}run(){return i(this,void 0,void 0,(function*(){console.log("Game is running"),this.init(),this.load(),yield this.gameLoop()}))}}e.Game=p,e.game=new p,e.game.run()},634:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(262)),n=s(928),r=i(s(451)),h=i(s(357)),a=new r.default;e.default=class{constructor(t,e,s,i,o=5){this.maxLevel=o,this.rootContainer=new h.default(t+1,e+1,s-2,i-2),this.rows=i,this.cols=s,this.corridos=[],this.tempRooms=[],this.tree=this.Devide(this.rootContainer,0),this.rooms=this.tree.GetLeafs(),this.CreateRooms(),this.ConnectRooms(this.tree,this.corridos)}RandomSplit(t){let e,s,i=!a.getInt(0,1);if(i=t.w>t.h&&t.w/t.h>=.05,i){const i=a.getInt(.3*t.w,.6*t.w);e=new h.default(t.x,t.y,i,t.h),s=new h.default(t.x+i,t.y,t.w-i,t.h)}else{const i=a.getInt(.3*t.h,.6*t.h);e=new h.default(t.x,t.y,t.w,i),s=new h.default(t.x,t.y+i,t.w,t.h-i)}return[e,s]}Devide(t,e){const s=new o.default(t);if(e<this.maxLevel&&t.w>=10&&t.h>=10){const i=this.RandomSplit(t);s.A=this.Devide(i[0],e+1),s.B=this.Devide(i[1],e+1)}return s}CreateRooms(){for(const t of this.rooms){const e=a.getInt(.8*t.w,.9*t.w),s=a.getInt(.8*t.h,.9*t.h),i=a.getInt(t.x,t.x+t.w-e),o=a.getInt(t.y,t.y+t.h-s),n=new h.default(i,o,e,s);this.tempRooms.push(n)}}IsThereRoom(t,e){for(const s of this.tempRooms)if(t>=s.x&&e>=s.y&&t<=s.w&&e<=s.h)return!0;return!1}ConnectRooms(t,e){if(!t.A||!t.B)return!1;const s=(0,n.float2int)(t.A.leaf.GetCenterX()),i=(0,n.float2int)(t.A.leaf.GetCenterY()),o=(0,n.float2int)(t.B.leaf.GetCenterX()),r=(0,n.float2int)(t.B.leaf.GetCenterY());e.push(new h.default(s-1,i-1,o-1,r-1)),this.ConnectRooms((0,n.ensure)(t.A),e),this.ConnectRooms((0,n.ensure)(t.B),e)}}},262:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(s(357));class n extends o.default{constructor(t){super(t.x,t.y,t.w,t.h),this.A=void 0,this.B=void 0,this.leaf=t}GetLeafs(){return this.A&&this.B?[...this.A.GetLeafs(),...this.B.GetLeafs()]:[this.leaf]}}e.default=n},933:function(t,e,s){var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(o,n){function r(t){try{a(i.next(t))}catch(t){n(t)}}function h(t){try{a(i.throw(t))}catch(t){n(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,h)}a((i=i.apply(t,e||[])).next())}))},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.random=void 0;const n=s(928),r=o(s(451)),h=o(s(357)),a=s(607),l=o(s(634));var c;!function(t){t[t.unused=0]="unused",t[t.floor=1]="floor",t[t.wall=2]="wall"}(c||(c={}));class u{constructor(){this.x=0,this.y=0,this.distance=0,this.last=!1}}class d{constructor(){this.type=c.unused,this.collide=!1,this.inFov=0,this.color="#000000",this.character="?"}}e.random=new r.default,e.default=class{constructor(t,e){this.ROOM_MIN_SIZE=4,this.depth=0,this.levelSeed=0,this.width=t,this.height=e,this.dungeonName="Unknow dungeon",this.tiles=new Array(this.width*this.height).fill(!1),this.pathMap=new Array(this.width*this.height),this.nodeTemp=[],this.nodes=[]}isWall(t,e){if(t>=0&&t<=this.width&&e>=0&&e<=this.height){const s=t+e*this.width;return this.tiles[s].collide}return!1}setWall(t,e){t=(0,n.float2int)(t),e=(0,n.float2int)(e),this.tiles[t+e*this.width].collide=!0,this.tiles[t+e*this.width].type=c.wall}setFloor(t,e){t=(0,n.float2int)(t),e=(0,n.float2int)(e),this.tiles[t+e*this.width].collide=!1,this.tiles[t+e*this.width].type=c.floor}dig(t,e,s,i){for(let o=e;o<e+i;o++)for(let e=t;e<t+s;e++)this.setFloor(e,o)}makeWalls(t,e,s,i){const o=i-e,n=s-t;this.dig(t,e,n,o);for(let i=0;i<=o;i++)this.setWall(t,e+i),this.setWall(s,e+i);for(let s=0;s<=n;s++)this.setWall(t+s,e),this.setWall(t+s,i)}fillUnusedTiles(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++){const s=e+t*this.width;this.tiles[s].type===c.unused&&this.setWall(e,t)}}makeDoorHole(t,e,s,i,o){0==o&&(this.setFloor(t-1,e+i/2),this.setFloor(t,e+i/2),this.setFloor(t+1,e+i/2)),1==o&&(this.setFloor(t+s-1,e+i/2),this.setFloor(t+s,e+i/2),this.setFloor(t+s+1,e+i/2)),2==o&&(this.setFloor(t+s/2,e-1),this.setFloor(t+s/2,e),this.setFloor(t+s/2,e+1)),3==o&&(this.setFloor(t+s/2,e+i-1),this.setFloor(t+s/2,e+i),this.setFloor(t+s/2,e+i+1))}createNaivePath(t,e,s,i){let o=t,n=e;for(;o<s?o++:o>s?o--:n<i?n++:n>i&&n--,o!=s||n!=i;)this.setFloor(o,n)}setPathStart(t,e){return i(this,void 0,void 0,(function*(){const s=this.convertXYtoID(t,e);s>=0&&s<this.width*this.height&&(this.pathMap[s]=1)}))}convertXYtoID(t,e){return t+e*this.width}createPath(t,e,s,i,o){this.nodes=[];for(let t=0;t<this.width*this.height;t++)this.pathMap[t]=this.tiles[t].collide?-1:0;this.setPathStart(t,e);let n=!1,r=0;for(let h=0;h<o;h++)for(let o=t-(h+1);o<t+h+1;o++)for(let t=e-(h+1);t<e+h+1;t++)o<0||t<0||o>=this.width-1||t>=this.height-1||this.pathMap[this.convertXYtoID(o,t)]===h&&(0===this.pathMap[this.convertXYtoID(o-1,t)]&&(this.pathMap[this.convertXYtoID(o-1,t)]=h+1),0===this.pathMap[this.convertXYtoID(o+1,t)]&&(this.pathMap[this.convertXYtoID(o+1,t)]=h+1),0===this.pathMap[this.convertXYtoID(o,t-1)]&&(this.pathMap[this.convertXYtoID(o,t-1)]=h+1),0===this.pathMap[this.convertXYtoID(o,t+1)]&&(this.pathMap[this.convertXYtoID(o,t+1)]=h+1),o===s&&t===i&&(n=!0),r++);if(0==n)return 1;let h=s,a=i;for(let t=0;t<r;t++){const t=this.convertXYtoID(h,a),e=h,s=a;if(this.pathMap[this.convertXYtoID(h-1,a)]===this.pathMap[t]-1&&h--,this.pathMap[this.convertXYtoID(h+1,a)]===this.pathMap[t]-1&&h++,this.pathMap[this.convertXYtoID(h,a-1)]===this.pathMap[t]-1&&a--,this.pathMap[this.convertXYtoID(h,a+1)]===this.pathMap[t]-1&&a++,e!==h||s!==a){const e=new u;e.x=h,e.y=a,e.distance=this.pathMap[t],this.nodes.push(e)}}return 0}generateMap(t,s){return i(this,void 0,void 0,(function*(){this.depth=s,this.levelSeed=t,this.nodeTemp=[],e.random.setSeed(this.levelSeed+25*s),this.generateName(),this.tiles=new Array(this.width*this.height).fill(!1);for(let t=0;t<this.width*this.height;t++)this.tiles[t]=new d;const i=new l.default(3,3,this.width-4,this.height-4,8);for(let t=0;t<i.rooms.length;t++){const s=i.tempRooms[t],o=new h.default(s.x,s.y,s.w,s.h);this.makeWalls(o.x,o.y,o.x+o.w,o.y+o.h),this.makeDoorHole(o.x,o.y,o.w,o.h,e.random.getInt(0,4))}const o=[];for(let t=0;t<i.corridos.length;t++){const e=i.corridos[t];this.nodes=[],this.createPath(e.x,e.y,e.w,e.h,128),0==this.nodes.length&&(console.log("fail"),o.push(e));for(let t=0;t<this.nodes.length;t++)this.nodeTemp.push(this.nodes[t])}for(let t=0;t<this.nodeTemp.length;t++){const e=this.nodeTemp[t];this.setFloor(e.x,e.y)}for(let t=0;t<o.length;t++){const e=o[t];this.createNaivePath(e.x,e.y,e.w,e.h)}this.fillUnusedTiles()}))}generateName(){const t=["Cave","Grotto","Cavern","Dungeon","Crypt","Church","Temple"];this.dungeonName="The "+t[e.random.getInt(0,t.length)]+" of "+["Fear","Death","Shadows","Darkness","Misery","Pain","Hatred","Madness","Nightmares","Despair"][e.random.getInt(0,t.length)]}render(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)1==this.tiles[e+t*this.width].collide?a.game.drawChar("#",e,t,"#999"):a.game.drawChar(".",e,t,"#999")}}},928:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.float2int=e.rgbToHex=e.ensure=void 0,e.ensure=(t,e="This value was promised to be there.")=>{if(null==t)throw new TypeError(e);return t},e.rgbToHex=(t,e,s)=>"#"+((1<<24)+(t<<16)+(e<<8)+s).toString(16).slice(1),e.float2int=t=>t>>0},451:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});const i=s(928);let o=0;e.default=class{constructor(){this.rnd=0}setSeed(t){o=t}calc(){o=(9301*o+49297)%233280,this.rnd=o/233280}getInt(t,e){return e=e||1,t=t||0,this.calc(),Math.floor(t+this.rnd*(e-t))}dice(t,e,s=0){let i=0;e++;for(let s=0;s<t;s++)i+=Number(this.getInt(1,e));return i+=+s,i<t&&(i=t),i}parseDice(t){const e=t.includes("+")?parseInt((0,i.ensure)(t.split("+").at(1))):0,[s,o]=t.split("d");return[parseInt(s),parseInt(o),e]}}},357:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s,i){this.x=t,this.y=e,this.w=s,this.h=i}GetHalfDimensionX(){return this.w/2}GetHalfDimensionY(){return this.h/2}GetCenterX(){return this.x+this.GetHalfDimensionX()}GetCenterY(){return this.y+this.GetHalfDimensionY()}}},377:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e){this.x=t,this.y=e}}}},e={};function s(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,s),n.exports}s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s(607)})();