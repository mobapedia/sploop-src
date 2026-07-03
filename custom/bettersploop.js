//0c70c7f8bd770a23ed96.js
//!!!!!!! - shows locations with potential side effects
// ADS EDIT removes ad loading
// ZOOM EDIT shows modifications for custom zoom
// GRID EDIT shows modifications for custom grid rendering
// RENDER EDIT shows modifications for custom rendering
// WORLD BOUND EDIT shows modifications for accurate world boundaries
// KEYBINDS EDIT shows modifications to take keybinds from custom bettersploop settings instead of default keybinds localstorage
// KEYR EDIT shows modifications that enable no spike on reload and fix spike reload bug

// EDIT
/* toRender format:
0: circle [x,y,r,color]
1: point [x,y,color]
2: filled circle [x,y,r,color]
3: line [x1,y1,x2,y2,color]
4: shaded semicircle [x,y,r,angle,color]
*/
let entityUids = {} // [entityId, x, y, radius, itemidofhelditem, angle]
let toRender = []
let coords = []
const radiusMap = {
    "0": 35,
    "1": 75,
    "2": 45,
    "3": 90,
    "4": 76,
    "5": 50,
    "6": 40,
    "7": 45,
    "8": 45,
    "9": 60,
    "10": 40,
    "11": 40,
    "13": 45,
    "14": 90,
    "15": 50,
    "16": 54,
    "17": 42,
    "18": 45,
    "19": 80,
    "20": 80,
    "21": 60,
    "22": 59,
    "23": 90,
    "24": 50,
    "25": 90,
    "26": 50,
    "27": 100,
    "28": 90,
    "29": 100,
    "30": 45,
    "31": 92,
    "32": 92,
    "33": 58,
    "34": 92,
    "35": 20,
    "36": 20,
    "37": 35,
    "38": 50,
    "39": 220,
    "40": 100,
    "41": 40,
    "42": 45,
    "43": 90
}
const rangeMap = {
    "0": 80,
    "1": 135,
    "2": 160,
    "3": 90,
    "11": 55,
    "13": 100,
    "15": 80,
    "17": 140,
    "28": 165,
    "30": 94,
    "31": 115,
    "32": 90,
    "33": 90,
    "34": 94,
    "35": 94,
    "36": 140,
    "37": 140,
    "38": 160,
    "39": 160,
    "40": 140,
    "41": 100,
    "42": 100,
    "43": 100,
    "44": 165,
    "45": 165,
    "46": 80,
    "47": 80,
    "48": 80,
    "52": 80,
    "53": 80,
    "54": 80,
    "56": 80,
    "57": 115,
    "58": 160,
    "59": 140,
    "60": 140,
    "61": 140,
    "62": 140,
    "63": 300,
    "65": 80,
    "66": 80,
    "67": 80,
    "68": 115,
    "69": 115,
    "70": 115,
    "71": 80,
    "72": 165,
    "73": 160,
    "74": 135,
    "75": 135,
    "76": 135,
    "77": 90,
    "78": 94
}
const itemIdToEntityIdMap = {
    "5": 8,
    "6": 10,
    "7": 7,
    "8": 9,
    "9": 6,
    "14": 13,
    "16": 15,
    "18": 17,
    "19": 16,
    "20": 2,
    "21": 18,
    "22": 20,
    "23": 19,
    "24": 5,
    "25": 21,
    "29": 22,
    "49": 26,
    "51": 37,
    "63": 41,
    "64": 42
}
const itemIdToOffsetsMap = {
    "0": {
        "spriteXOffsetPx": 1,
        "spriteYOffsetPx": -3.5,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "1": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": -8,
        "spriteWidth": 256,
        "spriteHeight": 410
    },
    "2": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "3": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": -2,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "4": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": 0,
        "spriteWidth": 400,
        "spriteHeight": 400
    },
    "5": {
        "spriteXOffsetPx": 15,
        "spriteYOffsetPx": 0,
        "spriteWidth": 220,
        "spriteHeight": 220
    },
    "6": {
        "spriteXOffsetPx": 3,
        "spriteYOffsetPx": 0,
        "spriteWidth": 192,
        "spriteHeight": 192
    },
    "7": {
        "spriteXOffsetPx": 15,
        "spriteYOffsetPx": 0,
        "spriteWidth": 232,
        "spriteHeight": 224
    },
    "8": {
        "spriteXOffsetPx": 8,
        "spriteYOffsetPx": 0,
        "spriteWidth": 280,
        "spriteHeight": 280
    },
    "9": {
        "spriteXOffsetPx": 26,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "10": {
        "spriteXOffsetPx": 22,
        "spriteYOffsetPx": 0,
        "spriteWidth": 150,
        "spriteHeight": 150
    },
    "11": {
        "spriteXOffsetPx": 10,
        "spriteYOffsetPx": -15,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "12": {
        "spriteXOffsetPx": 22,
        "spriteYOffsetPx": 0,
        "spriteWidth": 150,
        "spriteHeight": 150
    },
    "13": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": 4,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "14": {
        "spriteXOffsetPx": 38,
        "spriteYOffsetPx": 0,
        "spriteWidth": 350,
        "spriteHeight": 350
    },
    "15": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 5,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "16": {
        "spriteXOffsetPx": 25,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "17": {
        "spriteXOffsetPx": 3,
        "spriteYOffsetPx": 1,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "18": {
        "spriteXOffsetPx": 14,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "19": {
        "spriteXOffsetPx": 38,
        "spriteYOffsetPx": 0,
        "spriteWidth": 350,
        "spriteHeight": 350
    },
    "20": {
        "spriteXOffsetPx": 15,
        "spriteYOffsetPx": 0,
        "spriteWidth": 232,
        "spriteHeight": 224
    },
    "21": {
        "spriteXOffsetPx": 25,
        "spriteYOffsetPx": 0,
        "spriteWidth": 257,
        "spriteHeight": 257
    },
    "22": {
        "spriteXOffsetPx": 47,
        "spriteYOffsetPx": 0,
        "spriteWidth": 500,
        "spriteHeight": 500
    },
    "23": {
        "spriteXOffsetPx": 47,
        "spriteYOffsetPx": 0,
        "spriteWidth": 500,
        "spriteHeight": 500
    },
    "24": {
        "spriteXOffsetPx": 17,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "25": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": 0,
        "spriteWidth": 300,
        "spriteHeight": 300
    },
    "26": {
        "spriteXOffsetPx": 35,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "27": {
        "spriteXOffsetPx": 30,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "28": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": 0,
        "spriteWidth": 276,
        "spriteHeight": 420
    },
    "29": {
        "spriteXOffsetPx": 13,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "30": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 4,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "31": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 10,
        "spriteWidth": 128,
        "spriteHeight": 284
    },
    "32": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": -2,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "33": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": -2,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "34": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 4,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "35": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 4,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "36": {
        "spriteXOffsetPx": 3,
        "spriteYOffsetPx": 1,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "37": {
        "spriteXOffsetPx": 3,
        "spriteYOffsetPx": 1,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "38": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "39": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "40": {
        "spriteXOffsetPx": 3,
        "spriteYOffsetPx": 1,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "41": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": 4,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "42": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": 4,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "43": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": 4,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "44": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": 0,
        "spriteWidth": 276,
        "spriteHeight": 420
    },
    "45": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": 0,
        "spriteWidth": 276,
        "spriteHeight": 420
    },
    "46": {
        "spriteXOffsetPx": 1,
        "spriteYOffsetPx": -3.5,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "47": {
        "spriteXOffsetPx": 1,
        "spriteYOffsetPx": -3.5,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "48": {
        "spriteXOffsetPx": 1,
        "spriteYOffsetPx": -3.5,
        "spriteWidth": 275,
        "spriteHeight": 275
    },
    "49": {
        "spriteXOffsetPx": 15,
        "spriteYOffsetPx": 0,
        "spriteWidth": 257,
        "spriteHeight": 257
    },
    "50": {
        "spriteXOffsetPx": 35,
        "spriteYOffsetPx": 0,
        "spriteWidth": 150,
        "spriteHeight": 150
    },
    "51": {
        "spriteXOffsetPx": 15,
        "spriteYOffsetPx": 0,
        "spriteWidth": 140,
        "spriteHeight": 140
    },
    "52": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": 10,
        "spriteWidth": 214,
        "spriteHeight": 156
    },
    "53": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": 10,
        "spriteWidth": 215,
        "spriteHeight": 157
    },
    "54": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": 10,
        "spriteWidth": 215,
        "spriteHeight": 157
    },
    "56": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": 10,
        "spriteWidth": 215,
        "spriteHeight": 167
    },
    "57": {
        "spriteXOffsetPx": 40,
        "spriteYOffsetPx": 40,
        "spriteWidth": 225,
        "spriteHeight": 122
    },
    "58": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": -5,
        "spriteWidth": 274,
        "spriteHeight": 361
    },
    "59": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": -30,
        "spriteWidth": 256,
        "spriteHeight": 440
    },
    "60": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": -30,
        "spriteWidth": 256,
        "spriteHeight": 440
    },
    "61": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": -30,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "62": {
        "spriteXOffsetPx": 0,
        "spriteYOffsetPx": -30,
        "spriteWidth": 256,
        "spriteHeight": 436
    },
    "63": {
        "spriteXOffsetPx": 26,
        "spriteYOffsetPx": 0,
        "spriteWidth": 257,
        "spriteHeight": 257
    },
    "64": {
        "spriteXOffsetPx": 15,
        "spriteYOffsetPx": 0,
        "spriteWidth": 246,
        "spriteHeight": 238
    },
    "65": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 5,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "66": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 5,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "67": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 5,
        "spriteWidth": 256,
        "spriteHeight": 256
    },
    "68": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 10,
        "spriteWidth": 128,
        "spriteHeight": 284
    },
    "69": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 10,
        "spriteWidth": 128,
        "spriteHeight": 284
    },
    "70": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 10,
        "spriteWidth": 128,
        "spriteHeight": 309
    },
    "71": {
        "spriteXOffsetPx": 20,
        "spriteYOffsetPx": 10,
        "spriteWidth": 214,
        "spriteHeight": 166
    },
    "72": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": 0,
        "spriteWidth": 276,
        "spriteHeight": 431
    },
    "73": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 0,
        "spriteWidth": 256,
        "spriteHeight": 435
    },
    "74": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": -8,
        "spriteWidth": 256,
        "spriteHeight": 410
    },
    "75": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": -8,
        "spriteWidth": 256,
        "spriteHeight": 410
    },
    "76": {
        "spriteXOffsetPx": -4,
        "spriteYOffsetPx": -8,
        "spriteWidth": 256,
        "spriteHeight": 410
    },
    "77": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": -2,
        "spriteWidth": 288,
        "spriteHeight": 288
    },
    "78": {
        "spriteXOffsetPx": 2,
        "spriteYOffsetPx": 4,
        "spriteWidth": 238,
        "spriteHeight": 280
    }
}
function findAllPairsWithinX(circles, x) {
    const len = circles.length;
    if (len < 2) return [];

    // Sort by X in-place
    circles.sort((a, b) => a.x - b.x);

    const pairs = [];

    for (let i = 0; i < len; i++) {
        const c1 = circles[i];
        const c1Reach = c1.r + x; // How far c1's edge can reach plus the x buffer

        for (let j = i + 1; j < len; j++) {
            const c2 = circles[j];
            const dx = c2.x - c1.x;

            // The maximum possible distance on the X axis for a match
            const maxDx = c1Reach + c2.r; 

            // SWEEP AND PRUNE: If c2 is too far right, the rest are even further.
            // Skip the rest of the inner loop for c1!
            if (dx > maxDx) break; 

            // Y-axis early exit
            const dy = c2.y - c1.y;
            if (dy > maxDx || dy < -maxDx) continue;

            // Full squared distance check (no Math.sqrt)
            if (dx * dx + dy * dy <= maxDx * maxDx) {
                // Push the matching pair into our results
                pairs.push([c1, c2]); 
            }
        }
    }

    return pairs;
}
function getFittedCircleCenter(c1, c2, rNew = 35) {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return null;

    // "Inflate" the original circles
    const R1 = c1.r + rNew;
    const R2 = c2.r + rNew;

    const baseDist = (R1 * R1 - R2 * R2 + dist * dist) / (2 * dist);
    const hSquared = R1 * R1 - baseDist * baseDist;
    
    if (hSquared < 0) return null; // Doesn't fit

    const h = Math.sqrt(hSquared);

    const baseX = c1.x + (dx * baseDist) / dist;
    const baseY = c1.y + (dy * baseDist) / dist;

    const offsetX = (-dy * h) / dist;
    const offsetY = (dx * h) / dist;

    // --- NEW: Calculate the angle of the perpendicular line ---
    // Math.atan2 gives the angle in radians. 
    // Because we use the offset values, this angle points exactly from the gap's center towards pointA.
    const perpendicularAngle = Math.atan2(offsetY, offsetX); 

    return {
        pointA: { x: baseX + offsetX, y: baseY + offsetY },
        pointB: { x: baseX - offsetX, y: baseY - offsetY },
        angle: perpendicularAngle // In radians
    };
}
// ENDEDIT
;(function () {
  var r = {
    3950: function (n) {
      n.exports = {
        M: 1,
        D: 2,
        B: 4,
        L: 8,
        C: 16,
        A: 32
      };
    },
    7160: function (n) {
      n.exports = {
        p: 0,
        T: 1,
        H: 2
      };
    },
    3970: function (n) {
      n.exports = {
        k: 0,
        G: 1,
        U: 2,
        Y: 3,
        j: 4
      };
    },
    7262: function (n) {
      n.exports = {
        N: 1,
        O: 2,
        P: 4,
        S: 8,
        q: 16,
        K: 32,
        J: 64,
        I: 128,
        Z: 256,
        V: 512,
        W: 1024,
        X: 2048,
        F: 4096,
        R: 8192,
        $: 16384
      };
    },
    5599: function (n) {
      n.exports = {
        nn: 0,
        tn: 1
      };
    },
    9055: function (n) {
      n.exports = {
        N: 0,
        en: 1,
        on: 2,
        rn: 3
      };
    },
    4071: function (n) {
      const o = [];
      o[0] = ["Sploop Classic", 0, 0];
      o[1] = ["Yellow Classic", 0, 0];
      o[2] = ["Brown Classic", 0, 0];
      o[3] = ["Pink Classic", 0, 0];
      o[4] = ["Blue Classic", 0, 0];
      o[5] = ["Green Classic", 0, 0];
      o[6] = ["White Cat", 0, 100];
      o[7] = ["Ginger Cat", 0, 100];
      o[8] = ["Pit Bull", 0, 150];
      o[9] = ["Pig", 0, 100];
      o[10] = ["Crocodile", 0, 200];
      o[11] = ["Fox", 0, 200];
      o[12] = ["Panda", 0, 300];
      o[13] = ["Bear", 0, 300];
      o[14] = ["Penguin", 0, 300];
      o[15] = ["Cactus", 0, 400];
      o[16] = ["Strawberry", 0, 800];
      o[17] = ["Wolf", 0, 400];
      o[18] = ["Mammoth", 0, 2000];
      o[19] = ["Golden Cow", 0, 3000];
      o[20] = ["Shark", 0, 1000];
      o[21] = ["Apple", 0, 200];
      o[22] = ["Stone", 0, 500];
      o[23] = ["Cave Stone", 0, 600];
      o[24] = ["Ice", 0, 700];
      o[25] = ["Gold", 0, 800];
      o[26] = ["Cow", 0, 350];
      o[27] = ["Dragon", 0, 5000];
      o[28] = ["Black Ice", 0, 1000];
      o[29] = ["Magma", 0, 1500];
      o[30] = ["Kawak", 0, 2500];
      o[31] = ["Snowman", 0, 400];
      o[32] = ["Elf", 0, 1000];
      o[33] = ["Green Bauble", 0, 300];
      o[34] = ["Red Bauble", 0, 300];
      o[35] = ["Golden Bauble", 0, 800];
      o[36] = ["Duck", 0, 300];
      o[37] = ["Tornado", 0, 3000];
      o[38] = ["Golden Beetle", 0, 1500];
      o[39] = ["Evil Bat", 0, 1500];
      o[40] = ["Ghost", 0, 1500];
      o[41] = ["Witch", 0, 1500];
      o[42] = ["Reaper", 0, 10000];
      o[43] = ["Eye", 0, 3000];
      o[44] = ["Devil", 0, 5000];
      o[45] = ["Mummy", 0, 2000];
      o[46] = ["Pumpkin 1", 0, 500];
      o[47] = ["Pumpkin 2", 0, 500];
      o[48] = ["Pumpkin 3", 0, 500];
      o[49] = ["Werewolf", 0, 3500];
      o[50] = ["Monster", 0, 2500];
      o[51] = ["Coffee cup 1", 0, 1000];
      o[52] = ["Bull", 0, 1500];
      o[53] = ["Monkey", 0, 1500];
      o[54] = ["Igloo", 0, 1000];
      o[55] = ["Holly", 0, 500];
      o[56] = ["Chalet", 0, 2000];
      o[57] = ["Orange Heart", 0, 300];
      o[58] = ["Yellow Heart", 0, 300];
      o[59] = ["Green Heart", 0, 300];
      o[60] = ["Pink Heart", 0, 300];
      o[61] = ["Blue Heart", 0, 300];
      o[62] = ["Mauve Heart", 0, 600];
      o[63] = ["Red Heart", 0, 900];
      o[64] = ["Skier 1", 0, 500];
      o[65] = ["Skier 2", 0, 500];
      o[66] = ["Skier 3", 0, 500];
      o[67] = ["Deer", 0, 3000];
      o[68] = ["Snow Globe", 0, 3500];
      o[69] = ["Christmas Star", 0, 1000];
      o[70] = ["Fir Tree", 0, 1500];
      o[71] = ["Snow Flake", 0, 1000];
      o[72] = ["Yeti", 0, 2000];
      o[73] = ["Rabbit", 0, 1500];
      o[74] = ["Penguin", 0, 2000];
      o[75] = ["Raven", 0, 1750];
      o[76] = ["Polar Bear", 0, 1500];
      o[77] = ["Leaf", 0, 500];
      o[78] = ["Red Candle", 0, 750];
      o[79] = ["Christmas Cake", 0, 1500];
      o[80] = ["Waffle", 0, 20000];
      o[81] = ["Yellow Present", 0, 750];
      o[82] = ["Purple Present", 0, 750];
      o[83] = ["Red Present", 0, 750];
      o[84] = ["Yellow Star", 0, 1000];
      o[85] = ["Angry Clown", 0, 2500];
      o[86] = ["Moon", 0, 1000];
      o[87] = ["Cup", 0, 500];
      o[88] = ["Ruby", 0, 7500];
      o[89] = ["Computer", 0, 6000];
      o[90] = ["Avocado", 0, 500];
      o[91] = ["Explosion", 0, 4000];
      o[92] = ["Chocolate Donut", 0, 1500];
      o[93] = ["Vanilla Donut", 0, 1500];
      o[94] = ["Sugar Donut", 0, 1500];
      o[95] = ["Black Hole", 0, 3000];
      o[96] = ["Sphinx", 0, 2000];
      o[97] = ["Gargoyle", 0, 4000];
      o[98] = ["Black Cat", 0, 800];
      o[99] = ["Candy Corn", 0, 500];
      o[100] = ["Pumpkin", 0, 2500];
      const i = [];
      i[0] = ["None", 0, 0];
      i[1] = ["Mustache", 0, 100];
      i[2] = ["Sun Glasses", 0, 500];
      i[3] = ["Yellow Cap", 0, 0];
      i[4] = ["Blue Cap", 0, 0];
      i[5] = ["Purple Cap", 0, 0];
      i[6] = ["Green Cap", 0, 0];
      i[7] = ["Pink Bow", 0, 0];
      i[8] = ["3D Glasses", 0, 300];
      i[9] = ["Scar", 0, 150];
      i[10] = ["Turban", 0, 250];
      i[11] = ["Bandage", 0, 250];
      i[12] = ["Crazy Glasses", 0, 150];
      i[13] = ["Cow's Snout", 0, 300];
      i[14] = ["Carrot", 0, 150];
      i[15] = ["Horn", 0, 1000];
      i[16] = ["Tusk", 0, 800];
      i[17] = ["Mammoth Hair", 0, 600];
      i[18] = ["Mammoth Ears", 0, 500];
      i[19] = ["Leaf", 0, 150];
      i[20] = ["Black Mustache", 0, 500];
      i[21] = ["Snowman Hat", 0, 1000];
      i[22] = ["Blue Beanie", 0, 200];
      i[23] = ["Green Beanie", 0, 200];
      i[24] = ["Purple Beanie", 0, 200];
      i[25] = ["Orange Beanie", 0, 200];
      i[26] = ["Yellow Scarf", 0, 250];
      i[27] = ["Red Scarf", 0, 350];
      i[28] = ["Green Scarf", 0, 300];
      i[29] = ["Red Nose", 0, 400];
      i[30] = ["Mask", 0, 1000];
      i[31] = ["Garlands", 0, 500];
      i[32] = ["Dog Fur", 0, 2500];
      i[33] = ["Nails", 0, 750];
      i[34] = ["Horns", 0, 1200];
      i[35] = ["Alien Eyes 1", 0, 2000];
      i[36] = ["Exorbited", 0, 800];
      i[37] = ["Goblin Ears", 0, 600];
      i[38] = ["Brain", 0, 5000];
      i[39] = ["Axe", 0, 1500];
      i[40] = ["Hannibal", 0, 3000];
      i[41] = ["Face Mask", 0, 1000];
      i[42] = ["Green Beanie", 0, 500];
      i[43] = ["Grey Beanie", 0, 200];
      i[44] = ["Snow Beanie", 0, 500];
      i[45] = ["Girly Beanie", 0, 500];
      i[46] = ["Pottah Scarf", 0, 1000];
      i[47] = ["Cyborg", 0, 4000];
      i[48] = ["Acorn Hat", 0, 1000];
      i[49] = ["Rabbit Ears", 0, 750];
      i[50] = ["Alien Eyes 2", 0, 2000];
      i[51] = ["Wolf Ears", 0, 1000];
      i[52] = ["Duck's Beak", 0, 1250];
      i[53] = ["Monkey Ears", 0, 1500];
      i[54] = ["Tamer Cap", 0, 1000];
      i[55] = ["Yellow Cap", 0, 300];
      i[56] = ["Grey Cap", 0, 300];
      i[57] = ["Blue Cap", 0, 300];
      i[58] = ["Daisy Petals", 0, 1000];
      i[59] = ["Knight Mask", 0, 10000];
      i[60] = ["Blue Hair", 0, 2000];
      i[61] = ["Angel Halo", 0, 1500];
      i[62] = ["Black Hair", 0, 2000];
      i[63] = ["White Hair", 0, 2000];
      i[64] = ["Mysterious Mask", 0, 1500];
      i[65] = ["Jason Mask", 0, 1500];
      const r = [];
      r[0] = ["None", 0, 0];
      r[1] = ["Mammoth Tail", 0, 500];
      r[2] = ["Dragon Wings", 0, 5000];
      r[3] = ["Swords", 0, 2000];
      r[4] = ["Blue Cape", 0, 400];
      r[5] = ["Christmas Cape", 0, 400];
      r[6] = ["Speedy Cape", 0, 400];
      r[7] = ["Garland", 0, 300];
      r[8] = ["Baby Elf", 0, 1500];
      r[9] = ["Gift", 0, 1000];
      r[10] = ["Yellow Bag", 0, 300];
      r[11] = ["Cauldron", 0, 500];
      r[12] = ["Pumpkin", 0, 1500];
      r[13] = ["Trident", 0, 3000];
      r[14] = ["Vampire Cape", 0, 800];
      r[15] = ["Broom Stick", 0, 2000];
      r[16] = ["Scythe", 0, 5000];
      r[17] = ["Bat Wings", 0, 3500];
      r[18] = ["Candies", 0, 800];
      r[19] = ["Skeleton", 0, 10000];
      r[20] = ["Ghost Cape", 0, 600];
      r[21] = ["Plant", 0, 600];
      r[22] = ["Rose", 0, 1000];
      r[23] = ["Cupid's Wings", 0, 750];
      r[24] = ["Treasure Map", 0, 1500];
      r[25] = ["Phone", 0, 1000];
      r[26] = ["Cotton Candy", 0, 1000];
      r[27] = ["Candy Apple", 0, 1000];
      r[28] = ["Bear Backpack", 0, 4000];
      r[29] = ["Deer Backpack", 0, 4000];
      r[30] = ["Popcorn", 0, 2000];
      r[31] = ["Soda", 0, 2000];
      r[32] = ["Backpack", 0, 3000];
      r[33] = ["Magick Wand", 0, 2000];
      r[34] = ["Valentine's Day", 0, 1500];
      r[35] = ["Tentacles Backpack", 0, 2000];
      r[36] = ["Devil Wings", 0, 10000];
      r[37] = ["Angel Wings", 0, 10000];
      r[38] = ["Crank", 0, 1500];
      r[39] = ["Fir Tree", 0, 750];
      r[40] = ["Jester Card", 0, 600];
      r[41] = ["Boom!", 0, 750];
      r[42] = ["US Flag", 0, 200];
      r[43] = ["EU Flag", 0, 200];
      r[44] = ["AS Flag", 0, 200];
      r[45] = ["International Flag", 0, 200];
      r[46] = ["Knife", 0, 1500];
      n.exports = {};
      n.exports.cn = o;
      n.exports.sn = i;
      n.exports.un = r;
    },
    1917: function (n) {
      n.exports = {
        an: 0,
        fn: 1,
        ln: 2,
        hn: 3,
        tn: 4,
        dn: 5,
        W: 6,
        mn: 7,
        gn: 8,
        vn: 9,
        V: 10,
        wn: 11,
        bn: 12,
        yn: 13,
        zn: 14,
        _n: 15,
        Mn: 16,
        Dn: 17,
        Bn: 18,
        Ln: 19,
        Cn: 20,
        An: 21,
        pn: 22,
        Tn: 23,
        xn: 24,
        Hn: 25,
        kn: 26,
        Gn: 27,
        En: 28,
        Un: 29,
        Yn: 30,
        jn: 31,
        Nn: 32,
        On: 33,
        Pn: 34,
        Sn: 35,
        qn: 36,
        Kn: 37,
        Jn: 38,
        In: 39,
        Zn: 40,
        $: 41,
        Vn: 42,
        Wn: 43
      };
    },
    9657: function (n) {
      n.exports = {
        Hn: 0,
        Gn: 1,
        En: 2
      };
    },
    4002: function (n) {
      n.exports = {
        N: 0,
        Xn: 1,
        Fn: 2,
        Qn: 3,
        Rn: 4,
        $n: 5,
        nt: 6,
        tt: 7,
        et: 8,
        ot: 9,
        it: 10,
        rt: 11,
        ct: 12,
        st: 13
      };
    },
    4613: function (n) {
      n.exports = {
        ut: 0,
        at: 1,
        ft: 2
      };
    },
    6410: function (n) {
      n.exports = {
        lt: 0,
        ht: 1,
        dt: 2,
        gt: 3,
        S: 4,
        vt: 5,
        V: 6,
        mn: 7,
        vn: 8,
        W: 9,
        wt: 10,
        Z: 11,
        bt: 12,
        K: 13,
        yn: 14,
        yt: 15,
        _n: 16,
        zt: 17,
        Dn: 18,
        Mn: 19,
        ln: 20,
        Bn: 21,
        Cn: 22,
        Ln: 23,
        _t: 24,
        An: 25,
        q: 26,
        Mt: 27,
        Dt: 28,
        pn: 29,
        Bt: 30,
        X: 31,
        Lt: 32,
        Ct: 33,
        At: 34,
        Tt: 35,
        xt: 36,
        Ht: 37,
        kt: 38,
        Gt: 39,
        Et: 40,
        Ut: 41,
        Yt: 42,
        jt: 43,
        Nt: 44,
        Ot: 45,
        Pt: 46,
        St: 47,
        qt: 48,
        kn: 49,
        Kt: 50,
        Kn: 51,
        Jt: 52,
        It: 53,
        Zt: 54,
        Vt: 55,
        Wt: 56,
        Xt: 57,
        Ft: 58,
        Qt: 59,
        Rt: 60,
        $t: 61,
        ne: 62,
        $: 63,
        Vn: 64,
        te: 65,
        ee: 66,
        oe: 67,
        ie: 68,
        re: 69,
        ce: 70,
        Vt: 71,
        se: 72,
        ue: 73,
        ae: 74,
        fe: 75,
        le: 76,
        he: 77,
        de: 78
      };
    },
    9281: function (n) {
      n.exports = {
        me: {
          ge: 20,
          ve: 35,
          we: 25,
          be: 26,
          ye: 9,
          ze: 2,
          _e: 32,
          Me: 29,
          De: 3,
          Be: 33,
          Le: 31,
          Ce: 6,
          Ae: 22,
          pe: 19,
          Te: 8,
          xe: 28,
          He: 13,
          ke: 5,
          Ge: 30,
          Ee: 14,
          Ue: 34,
          Ye: 11,
          je: 0,
          Ne: 15,
          Oe: 24,
          Pe: 27,
          Se: 4,
          qe: 1,
          Ke: 17,
          Je: 16,
          Ie: 36,
          Ze: 10,
          Ve: 37,
          We: 21,
          Xe: 23,
          Fe: 12,
          Qe: 7,
          Re: 18
        },
        $e: {
          no: 11,
          eo: 6,
          oo: 13,
          io: 2,
          ro: 19,
          co: 18,
          so: 10,
          uo: 20,
          ao: 0,
          fo: 5,
          lo: 7,
          ho: 14,
          do: 12,
          mo: 3,
          vo: 23,
          wo: 1,
          bo: 15,
          yo: 9,
          zo: 4,
          _o: 8,
          Mo: 24,
          Do: 21,
          Bo: 17,
          Lo: 25,
          Co: 22,
          Ao: 16
        },
        po: {}
      };
    },
    3255: function (n) {
      n.exports = {
        To: 0,
        xo: 1,
        tn: 2,
        Ho: 3
      };
    },
    6399: function (n) {
      n.exports = {
        J: 0,
        ko: 1,
        Ho: 2,
        tn: 3
      };
    },
    6597: function (n) {
      n.exports = {
        Go: 0,
        Eo: 1,
        Uo: 2,
        fn: 3,
        Yo: 4,
        jo: 5,
        No: 6,
        Oo: 7,
        hn: 8,
        dn: 9,
        tn: 10,
        gn: 11,
        mn: 12,
        W: 13,
        V: 14,
        vn: 15,
        Po: 16,
        bn: 17,
        So: 17,
        xo: 18,
        To: 19,
        qo: 20,
        Ho: 21,
        Ko: 22,
        Jo: 23,
        ht: 24,
        lt: 25,
        dt: 26,
        S: 27,
        Io: 28,
        Zo: 29,
        Vo: 30,
        Wo: 31,
        Xo: 32,
        Fo: 33,
        wn: 34,
        Qo: 35,
        Ro: 36,
        $o: 37,
        ni: 38,
        ti: 39,
        ei: 40,
        oi: 41,
        wt: 42,
        ii: 43,
        ri: 44,
        ci: 45,
        Z: 46,
        si: 47,
        ui: 48,
        ai: 49,
        fi: 50,
        bt: 51,
        li: 52,
        hi: 53,
        K: 54,
        di: 55,
        mi: 56,
        gi: 57,
        zn: 58,
        vi: 59,
        wi: 60,
        bi: 61,
        yt: 62,
        yi: 63,
        _n: 64,
        zi: 65,
        _i: 66,
        zt: 67,
        Mi: 68,
        Di: 69,
        Dn: 70,
        Bi: 71,
        ln: 72,
        Li: 73,
        Ci: 74,
        Ai: 75,
        pi: 76,
        Ti: 77,
        xi: 78,
        Cn: 79,
        Hi: 80,
        Ln: 81,
        An: 82,
        ki: 83,
        _t: 84,
        Gi: 85,
        Ei: 86,
        q: 87,
        Ui: 88,
        Yi: 89,
        ji: 90,
        Mt: 91,
        Ni: 92,
        Oi: 93,
        Pi: 94,
        Si: 95,
        qi: 96,
        Ki: 97,
        Ji: 98,
        Dt: 99,
        Ii: 100,
        Zi: 101,
        pn: 102,
        Vi: 103,
        Wi: 104,
        Xi: 105,
        Fi: 106,
        Qi: 107,
        Ri: 108,
        $i: 109,
        nr: 110,
        tr: 111,
        er: 112,
        ir: 113,
        rr: 114,
        cr: 115,
        Bt: 116,
        sr: 117,
        ur: 118,
        ar: 119,
        lr: 120,
        hr: 121,
        dr: 122,
        mr: 123,
        Tn: 124,
        xn: 125,
        gr: 126,
        X: 127,
        vr: 128,
        Hn: 129,
        Lt: 130,
        wr: 131,
        Ct: 132,
        br: 133,
        At: 134,
        yr: 135,
        xt: 136,
        zr: 137,
        Ht: 138,
        _r: 139,
        kt: 140,
        Mr: 141,
        Gt: 142,
        Dr: 143,
        Tt: 144,
        Br: 145,
        Lr: 146,
        Cr: 147,
        Et: 148,
        Ut: 149,
        Ar: 150,
        Yt: 151,
        jt: 152,
        Nt: 153,
        pr: 154,
        Ot: 155,
        Tr: 156,
        Pt: 157,
        Hr: 158,
        St: 159,
        kr: 160,
        qt: 161,
        Gr: 162,
        Er: 163,
        Ur: 164,
        Yr: 165,
        jr: 166,
        Nr: 167,
        Or: 168,
        kn: 169,
        Pr: 170,
        Un: 171,
        jn: 172,
        Nn: 173,
        On: 174,
        Yn: 175,
        Sr: 176,
        En: 177,
        Gn: 178,
        Pn: 179,
        Sn: 180,
        qn: 181,
        Kt: 182,
        Kn: 183,
        qr: 184,
        Kr: 185,
        Jn: 186,
        In: 187,
        Jr: 188,
        Ir: 189,
        Zr: 190,
        Vr: 191,
        Wr: 192,
        Xr: 193,
        Fr: 194,
        Qr: 195,
        Rr: 196,
        $r: 197,
        Xt: 198,
        Ft: 199,
        nc: 200,
        tc: 201,
        ec: 202,
        Zn: 203,
        oc: 204,
        ic: 205,
        rc: 206,
        cc: 207,
        $: 208,
        sc: 209,
        Wr: 210,
        Rr: 211,
        uc: 212,
        ac: 213,
        fc: 214,
        lc: 215,
        hc: 216,
        dc: 217,
        mc: 218,
        gc: 219,
        Vn: 220,
        vc: 221,
        wc: 222,
        bc: 223,
        yc: 224,
        zc: 226,
        _c: 227,
        Mc: 228,
        Dc: 229,
        Bc: 230,
        Lc: 231,
        Cc: 232,
        Ac: 233,
        Tc: 234,
        xc: 235,
        Hc: 236,
        Rr: 237,
        Wr: 238,
        se: 239,
        kc: 240,
        ue: 241,
        Gc: 242,
        ae: 243,
        Ec: 244,
        fe: 245,
        Uc: 246,
        le: 247,
        Yc: 248,
        ue: 249,
        Gc: 250,
        de: 251,
        jc: 252,
        he: 253,
        Nc: 254,
        Oc: 255,
        Pc: 256,
        Wn: 257
      };
    },
    5397: function (n) {
      n.exports = {
        Sc: 1,
        qc: 2,
        Kc: 4,
        Jc: 8,
        Ic: 16,
        Zc: 32,
        Vc: 64,
        Wc: 128,
        Xc: 256
      };
    },
    3266: function (n) {
      n.exports = {
        tn: 1,
        Fc: 2,
        Qc: 3
      };
    },
    6078: function (n, e, o) {
      try {
        __MUTATEOO = o(9847);
        __MUTATEQ = o(2677);
        __MUTATEQ0O = o(2190);
        __MUTATEoQQ = o(2639);
        __MUTATEQQo = o(3543);
      } catch (n) {}
      const r = function () {
        const e = "nickname";
        const o = "currency";
        const i = "score";
        const c = "death";
        const s = "kill";
        const u = "https://account.sploop.io:443/";
        const a = [["logged-content", "flex"]];
        const f = [["login-content", "flex"]];
        const l = {};
        const h = [{
          Rc: "wood",
          $c: 0,
          ns: 10,
          ts: 30,
          es: 20,
          os: 20,
          rs: 0
        }, {
          Rc: "stone",
          $c: 100000,
          ns: 20,
          ts: 60,
          es: 30,
          os: 30,
          rs: 0
        }, {
          Rc: "copper",
          $c: 900000,
          ns: 30,
          ts: 100,
          es: 40,
          os: 40,
          rs: 100
        }, {
          Rc: "bronze",
          $c: 2100000,
          ns: 40,
          ts: 150,
          es: 60,
          os: 60,
          rs: 200
        }, {
          Rc: "silver",
          $c: 6100000,
          ns: 50,
          ts: 200,
          es: 80,
          os: 80,
          rs: 300
        }, {
          Rc: "gold",
          $c: 10100000,
          ns: 60,
          ts: 300,
          es: 100,
          os: 100,
          rs: 400
        }, {
          Rc: "diamond",
          $c: 20100000,
          ns: 70,
          ts: 400,
          es: 120,
          os: 120,
          rs: 500
        }, {
          Rc: "emerald",
          $c: 35100000,
          ns: 80,
          ts: 500,
          es: 140,
          os: 140,
          rs: 600
        }, {
          Rc: "ruby",
          $c: 66100000,
          ns: 90,
          ts: 600,
          es: 170,
          os: 170,
          rs: 700
        }, {
          Rc: "platinum",
          $c: 116100000,
          ns: 100,
          ts: 800,
          es: 200,
          os: 200,
          rs: 800
        }, {
          Rc: "amber",
          $c: 196100000,
          ns: 120,
          ts: 1000,
          es: 240,
          os: 240,
          rs: 1000
        }, {
          Rc: "mystic",
          $c: 296100000,
          ns: 140,
          ts: 1200,
          es: 280,
          os: 280,
          rs: 1200
        }, {
          Rc: "divine",
          $c: 496100000,
          ns: 160,
          ts: 1400,
          es: 320,
          os: 320,
          rs: 1400
        }, {
          Rc: "immortal",
          $c: 696100000,
          ns: 180,
          ts: 1600,
          es: 360,
          os: 360,
          rs: 1600
        }, {
          Rc: "draconic",
          $c: 896100000,
          ns: 200,
          ts: 1800,
          es: 400,
          os: 400,
          rs: 1800
        }, {
          Rc: "celestial",
          $c: 1096100000,
          ns: 220,
          ts: 2000,
          es: 440,
          os: 440,
          rs: 2000
        }, {
          Rc: "astral",
          $c: 1296100000,
          ns: 240,
          ts: 2200,
          es: 480,
          os: 480,
          rs: 2200
        }, {
          Rc: "radiant",
          $c: 1696100000,
          ns: 260,
          ts: 2400,
          es: 520,
          os: 520,
          rs: 2400
        }, {
          Rc: "eternal",
          $c: 3296100000,
          ns: 280,
          ts: 2600,
          es: 560,
          os: 560,
          rs: 2600
        }];
        const d = __MUTATEOO.get("main-login-button");
        const m = __MUTATEOO.get("main-sign-up-button");
        const g = __MUTATEOO.get("login-button");
        const v = __MUTATEOO.get("signup-button");
        const w = __MUTATEOO.get("profile-login-button");
        const b = __MUTATEOO.get("profile-sign-up-button");
        const y = __MUTATEOO.get("enter-password");
        const z = __MUTATEOO.get("enter-new-password");
        const _ = __MUTATEOO.get("error-password");
        const M = __MUTATEOO.get("enter-username");
        const D = __MUTATEOO.get("error-username");
        const B = __MUTATEOO.get("enter-mail");
        const L = __MUTATEOO.get("error-mail");
        const C = __MUTATEOO.get("send-email");
        const A = __MUTATEOO.get("login");
        const p = __MUTATEOO.get("register");
        const T = __MUTATEOO.get("send-mail-password");
        const x = __MUTATEOO.get("validate-new-password");
        const H = __MUTATEOO.get("forgot-password");
        const k = __MUTATEOO.get("logout");
        const G = __MUTATEOO.get("change-username");
        const E = __MUTATEOO.get("change-username-button");
        const U = __MUTATEOO.get("account-required");
        const Y = __MUTATEOO.get("ranking-rank");
        const j = __MUTATEOO.get("ranking-score-daily");
        const N = __MUTATEOO.get("ranking-score-month");
        const O = __MUTATEOO.get("ranking-score-all");
        const P = __MUTATEOO.get("ranking-kill-daily");
        const S = __MUTATEOO.get("ranking-kill-month");
        const q = __MUTATEOO.get("ranking-kill-all");
        const K = __MUTATEOO.get("ranking-ranks-container");
        const J = __MUTATEOO.get("ranking-rank-container");
        const I = __MUTATEOO.get("ranking-middle-main");
        const Z = __MUTATEOO.get("ranking2-middle-main");
        const V = [Y, j, N, O, P, S, q];
        let W = 0;
        let X = {
          cs: "",
          ss: "",
          hash: ""
        };
        function F(n) {
          const t = h.length;
          for (let e = 0; e < t; e++) {
            if (n < h[e].$c) {
              return e - 1;
            }
          }
          return t - 1;
        }
        function Q(t) {
          nn();
          Z.style.display = "none";
          I.style.display = "inline-block";
          const o = JSON.parse(t);
          let i = 1;
          for (let n = o.length - 1; n >= 0; n--) {
            const t = o[n];
            const r = t[0];
            const c = t[1];
            const s = t[2];
            const u = document.createElement("div");
            u.classList.add("subcontent-bg");
            u.classList.add("table-line");
            u.innerHTML = "<div class=\"ranking-rank\"> #" + i + " </div><div class=\"ranking-name\"></div><div class=\"ranking-score\"> " + r.toLocaleString() + " </div>";
            __MUTATEOO.get("ranking-name", u).innerText = c + "#" + s;
            K.appendChild(u);
            i++;
          }
          __MUTATEOO.us();
        }
        function R() {
          return r.fs[__MUTATEQQo.ls(o)];
        }
        function $(t) {
          nn();
          I.style.display = "none";
          Z.style.display = "inline-block";
          const o = JSON.parse(t);
          let i = 1;
          for (let n = o.length - 1; n >= 0; n--) {
            const t = o[n];
            const r = t[0];
            const c = F(r);
            const s = t[1];
            const u = t[2];
            const a = document.createElement("div");
            a.classList.add("subcontent-bg");
            a.classList.add("table-line");
            a.innerHTML = "<div class=\"ranking-rank\"> #" + i + " </div><div class=\"ranking-badge\"><img draggable=\"false\" src=\"img/ui/rank" + c + ".png\"></div><div class=\"ranking-name\"></div><div class=\"ranking-score\"> " + r.toLocaleString() + " </div>";
            __MUTATEOO.get("ranking-name", a).innerText = s + "#" + u;
            J.appendChild(a);
            i++;
          }
          __MUTATEOO.us();
        }
        function nn() {
          K.innerHTML = "";
          J.innerHTML = "";
        }
        function tn(t, e, o) {
          const r = V.length;
          for (let n = 0; n < r; n++) {
            V[n].classList.remove("dark-blue-button-2-active");
          }
          t.classList.add("dark-blue-button-2-active");
          if (e === "ranking") {
            const n = u + "rankingScore";
            __MUTATEQQo.request(n, $);
          } else {
            const n = u + "leaderboards?time=" + o + "&type=" + e;
            __MUTATEQQo.request(n, Q);
          }
          __MUTATEOO.hs("Getting the leaderboard...");
        }
        function en(t) {
          __MUTATEOO.us();
          if (t === "1") {
            __MUTATEOO.get("password-ok").style.display = "inline-block";
          } else {
            __MUTATEOO.get("password-nok").style.display = "inline-block";
          }
        }
        function on(t) {
          __MUTATEOO.us();
          if (t === "1") {
            __MUTATEOO.get("link-sent-ok").style.display = "inline-block";
          } else {
            __MUTATEOO.get("link-sent-nok").style.display = "inline-block";
          }
        }
        function rn() {
          if (X.cs) {
            C.value = X.cs;
          }
          __MUTATEOO.get("link-sent-ok").style.display = "none";
          __MUTATEOO.get("link-sent-nok").style.display = "none";
          __MUTATEOO.get("loading-mail-box").style.display = "none";
          T.style.display = "inline-block";
        }
        function cn() {
          _.style.visibility = "hidden";
          D.style.visibility = "hidden";
          L.style.visibility = "hidden";
        }
        function sn(t) {
          X.cs = t[__MUTATEQQo.ls("id")];
          __MUTATEQQo.setData("accMail", X.cs);
          X.ss = t[__MUTATEQQo.ls("token")];
          __MUTATEQQo.setData("accToken", X.ss);
          r.fs = t;
          const a = t[__MUTATEQQo.ls(e)] + "#" + t[__MUTATEQQo.ls("counter")];
          __MUTATEOO.get("nickname-value").innerText = a;
          __MUTATEOO.get("currency-value").innerText = t[__MUTATEQQo.ls(o)].toLocaleString();
          const f = t[__MUTATEQQo.ls(e)];
          G.value = f;
          E.style.display = "none";
          const l = __MUTATEOO.get("profile-bg");
          for (let n = 0; n < h.length; n++) {
            l.classList.remove("profile-bg" + n);
          }
          __MUTATEOO.get("total-score").innerText = t[__MUTATEQQo.ls(i)].toLocaleString();
          __MUTATEOO.get("total-death").innerText = t[__MUTATEQQo.ls(c)].toLocaleString();
          __MUTATEOO.get("total-kill").innerText = t[__MUTATEQQo.ls(s)].toLocaleString();
          __MUTATEOO.get("best-kill").innerText = t[__MUTATEQQo.ls("bestKill")].toLocaleString();
          __MUTATEOO.get("kill-death").innerText = (t[__MUTATEQQo.ls(s)] / (t[__MUTATEQQo.ls(c)] || 1)).toLocaleString();
          const d = t[__MUTATEQQo.ls(i)];
          const m = F(d);
          l.classList.add("profile-bg" + m);
          __MUTATEOO.get("profile-rank").src = "img/ui/big-rank" + m + ".png";
          __MUTATEOO.get("rank").src = "img/ui/rank" + m + ".png";
          if (m >= h.length - 1) {
            __MUTATEOO.get("profile-next-rank-container").style.display = "none";
          } else {
            const n = h[m + 1];
            __MUTATEOO.get("score-left-value").innerText = Math.floor(n.$c - d).toLocaleString();
            __MUTATEOO.get("profile-next-rank-container").style.display = "flex";
            __MUTATEOO.get("profile-from-rank").src = "img/ui/rank" + m + ".png";
            __MUTATEOO.get("profile-to-rank").src = "img/ui/rank" + (m + 1) + ".png";
          }
          const g = t[__MUTATEQQo.ls("bestScore")];
          let v = "";
          for (let n = 0; n < g.length; n++) {
            v += "<div class=\"subcontent-bg table-line\"><div class=\"ranking-rank\"> #" + (n + 1) + " </div><div class=\"ranking-score best-score\" id=\"best-score-value0\"> " + g[n][0].toLocaleString() + " </div></div>";
          }
          __MUTATEOO.get("ranks-container").innerHTML = v;
        }
        function un(n) {
          gn(n);
          const t = __MUTATEOO.views.shop;
          t.ds();
          t.gs();
        }
        function an() {
          if (R() >= 100) {
            const n = u + "changename?nickname=" + G.value + "&mail=" + X.cs + "&token=" + X.ss;
            __MUTATEQQo.request(n, gn);
            __MUTATEOO.hs("Changing name...");
          }
        }
        function fn() {
          if (G.value !== r.fs[__MUTATEQQo.ls(e)]) {
            E.style.display = "flex";
          } else {
            E.style.display = "none";
          }
        }
        function ln() {
          const e = __MUTATEQQo.getData("accMail");
          if (e) {
            X.cs = e;
          }
          const o = __MUTATEQQo.getData("accToken");
          if (o) {
            X.ss = o;
          }
          if (e && o) {
            return 1;
          } else {
            return 0;
          }
        }
        function hn() {
          if (W !== 1) {
            W = 1;
            for (let n = 0; n < f.length; n++) {
              const t = __MUTATEOO.get(f[n][0]);
              t.classList.remove("fade-in");
              t.style.display = "none";
            }
            for (let n = 0; n < a.length; n++) {
              const e = a[n];
              __MUTATEOO.get(e[0]).style.display = e[1];
            }
            setTimeout(function () {
              for (let t = 0; t < a.length; t++) {
                __MUTATEOO.get(a[t][0]).classList.add("fade-in");
              }
            }, 50);
            __MUTATEOO.get("profile-content").classList.remove("blur");
            __MUTATEOO.get("shop-content").classList.remove("blur");
            mn();
          }
        }
        function dn() {
          if (W === 0) {
            U.style.display = "flex";
          }
        }
        function mn() {
          U.style.display = "none";
        }
        function gn(t) {
          __MUTATEOO.us();
          if (t === "notFound") {
            L.innerText = "This account does not exist";
            L.style.visibility = "visible";
            wn();
            return;
          } else if (t === "tooMany") {
            _.innerText = "Try again in 10 minutes";
            _.style.visibility = "visible";
            wn();
            return;
          } else if (t === "wrongPassword") {
            _.innerText = "Wrong password";
            _.style.visibility = "visible";
            wn();
            return;
          } else if (t === "0" || t === "error") {
            _.innerText = "Unknown error";
            _.style.visibility = "visible";
            wn();
            return;
          } else {
            sn(JSON.parse(t));
            __MUTATEOO.vs.login.hide();
            hn();
            return;
          }
        }
        function vn() {
          W = 0;
          for (let n = 0; n < a.length; n++) {
            const e = __MUTATEOO.get(a[n][0]);
            e.classList.remove("fade-in");
            e.style.display = "none";
          }
          for (let n = 0; n < f.length; n++) {
            const e = f[n];
            __MUTATEOO.get(e[0]).style.display = e[1];
          }
          setTimeout(function () {
            for (let t = 0; t < f.length; t++) {
              __MUTATEOO.get(f[t][0]).classList.add("fade-in");
            }
          }, 50);
          __MUTATEOO.get("profile-content").classList.add("blur");
          __MUTATEOO.get("shop-content").classList.add("blur");
        }
        function wn() {
          r.fs = l;
          W = 0;
          __MUTATEQQo.setData("accToken", "");
          __MUTATEQQo.setData("skin", "0");
          __MUTATEQQo.setData("accessory", "0");
          __MUTATEQQo.setData("back", "0");
          vn();
        }
        function bn() {
          const e = y.value;
          if (e.length < 4) {
            _.innerText = "The password is too short";
            _.style.visibility = "visible";
            return;
          } else {
            X.hash = __MUTATEoQQ(e);
            return X.hash;
          }
        }
        function yn() {
          const n = M.value;
          if (n.length < 1) {
            D.innerText = "The nickname is too short";
            D.style.visibility = "visible";
            return;
          } else {
            return n;
          }
        }
        function zn() {
          let e = B.value;
          try {
            e = e.trim();
          } catch (n) {}
          if (e.indexOf("@") === -1 || e.indexOf(".") === -1 || e.length < 6) {
            L.innerText = "The Email Address is incorrect!";
            L.style.visibility = "visible";
            return;
          } else {
            X.cs = e;
            return e.toLowerCase();
          }
        }
        function _n() {
          cn();
          const n = bn();
          const t = yn();
          const e = zn();
          if (n === undefined || t === undefined || e === undefined) {
            return;
          }
          const o = u + "register?nickname=" + t + "&mail=" + e + "&hash=" + n;
          __MUTATEOO.hs("Creating...");
          __MUTATEQQo.request(o, Mn);
        }
        function Mn(t) {
          __MUTATEOO.us();
          cn();
          if (t === "exists") {
            L.innerText = "This mail is already taken";
            L.style.visibility = "visible";
            return;
          }
          if (t === "tooMany") {
            _.innerText = "Try again later";
            _.style.visibility = "visible";
          } else if (t === "0" || t === "error") {
            _.innerText = "Unknown error";
            _.style.visibility = "visible";
            return;
          }
          sn(JSON.parse(t));
          __MUTATEOO.vs.login.hide();
          hn();
        }
        function Dn() {
          __MUTATEOO.us();
        }
        function Bn() {
          cn();
          const e = bn();
          const o = zn();
          if (e === undefined || o === undefined) {
            return;
          }
          const i = u + "login?mail=" + X.cs + "&hash=" + X.hash;
          __MUTATEOO.hs("Connecting...");
          __MUTATEQQo.request(i, gn, Dn);
        }
        function Ln(n, t) {
          cn();
          const e = u + "tokenLogin?mail=" + n + "&token=" + t;
          __MUTATEQQo.request(e, gn);
        }
        function rn() {
          __MUTATEOO.vs.login.hide();
          __MUTATEOO.vs["forgot-password"].show();
        }
        function Cn() {
          cn();
          const e = __MUTATEOO.vs.login;
          e.show();
          __MUTATEOO.get("pop-title", e.ws).innerText = "LOGIN";
          v.classList.remove("login-button-active");
          g.classList.add("login-button-active");
          __MUTATEOO.get("enter-username-title").style.display = "none";
          M.style.display = "none";
          D.style.visibility = "hidden";
          p.style.display = "none";
          A.style.display = "inline-block";
        }
        function An() {
          cn();
          const e = __MUTATEOO.vs.login;
          e.show();
          __MUTATEOO.get("pop-title", e.ws).innerText = "SIGN UP";
          g.classList.remove("login-button-active");
          v.classList.add("login-button-active");
          __MUTATEOO.get("enter-username-title").style.display = "flex";
          M.style.display = "flex";
          A.style.display = "none";
          p.style.display = "inline-block";
        }
        T.addEventListener("click", function () {
          const e = u + "forgot?mail=" + C.value;
          __MUTATEQQo.request(e, on);
          T.style.display = "none";
          __MUTATEOO.hs("Sending...");
        });
        x.addEventListener("click", function () {
          const e = u + "restore?mail=" + __MUTATEQQo.bs("mail") + "&token=" + __MUTATEQQo.bs("restore") + "&hash=" + __MUTATEoQQ(z.value);
          __MUTATEQQo.request(e, en);
          __MUTATEOO.hs("Changing your password...");
          x.style.display = "none";
        });
        return {
          ys: function () {
            d.addEventListener("click", Cn);
            m.addEventListener("click", An);
            g.addEventListener("click", Cn);
            v.addEventListener("click", An);
            w.addEventListener("click", Cn);
            b.addEventListener("click", An);
            H.addEventListener("click", rn);
            p.addEventListener("click", _n);
            A.addEventListener("click", Bn);
            k.addEventListener("click", function () {
              wn();
              dn();
            });
            G.addEventListener("input", fn);
            E.addEventListener("click", an);
            E.style.display = "none";
            if (ln() === 1) {
              __MUTATEOO.hs("Connecting...");
              Ln(X.cs, X.ss);
            } else {
              vn();
              if (__MUTATEQQo.bs("mail") && __MUTATEQQo.bs("restore")) {
                __MUTATEOO.vs["new-password"].show();
              }
            }
            Y.addEventListener("click", function () {
              tn(Y, "ranking");
            });
            j.addEventListener("click", function () {
              tn(j, "score", "day");
            });
            N.addEventListener("click", function () {
              tn(N, "score", "month");
            });
            O.addEventListener("click", function () {
              tn(O, "score", "all");
            });
            P.addEventListener("click", function () {
              tn(P, "kill", "day");
            });
            S.addEventListener("click", function () {
              tn(S, "kill", "month");
            });
            q.addEventListener("click", function () {
              tn(q, "kill", "all");
            });
            const e = __MUTATEOO.views.ranking;
            e.gs = function () {
              tn(Y, "ranking");
            };
            e.ds = function () {
              nn();
            };
            const o = __MUTATEOO.views.profile;
            o.gs = function () {
              r.zs();
            };
            o.ds = function () {
              r._s();
            };
          },
          refresh: function () {
            if (W === 1) {
              Ln(X.cs, X.ss);
            }
          },
          Ms: function () {
            Ln(X.cs, X.ss);
          },
          Ds: R,
          Bs: function (n) {
            return r.fs[__MUTATEQQo.ls(n)] || [];
          },
          Ls: function (n, t, e, o, i) {
            if (R() >= o) {
              const o = u + "cosmetic?type=" + n + "&index=" + e + "&mail=" + X.cs + "&token=" + X.ss;
              __MUTATEQQo.request(o, un);
              __MUTATEOO.hs("Buying the " + t + " " + n + "...");
            }
          },
          Cs: function () {
            if (W === 1) {
              return 1;
            } else {
              return 0;
            }
          },
          As: sn,
          zs: dn,
          _s: mn,
          fs: l,
          ps: h
        };
      }();
      r.ys();
      try {
        n.exports = r;
      } catch (n) {}
    },
    7644: function () {
      var e;
      var o;
      var i = document.getElementById("main-content");
      var r = getComputedStyle(i).height;
      for (var c = ["profile", "shop", "game", "skins", "ranking"], s = 0; s < c.length; s++) {
        e = c[s];
        o = undefined;
        (o = document.getElementById("nav-" + e)).addEventListener("click", function () {
          r = getComputedStyle(i).height;
        }, {
          capture: true
        });
        o.addEventListener("click", function () {
          var n = getComputedStyle(i).height;
          i.style.height = r;
          requestAnimationFrame(function () {
            i.style.height = n;
            setTimeout(function () {
              i.style.height = "";
            }, 300);
          });
        });
      }
    },
    2677: function (r, c, s) {
      let a = null;
      let f = false;
      function l(n) {
        if (!f) {
          f = true;
          try {
            let n = s(5108);
            if (n && n.default) {
              n = n.default;
            }
            if (n && typeof n.Ts == "function") {
              a = n;
            }
          } catch (n) {}
        }
        if (a) {
          return a.Ts(n);
        } else {
          return n;
        }
      }
      const h = function () {
        const r = {};
        function c() {
          this.xs = 1;
          this.Hs = this.width / 2;
          this.ks = this.height / 2;
          this.onload = null;
          this.onerror = null;
        }
        function s() {
          this.xs = 0;
        }
        return {
          Gs: function (n, t) {
            const e = r[n];
            if (e !== undefined) {
              return e;
            } else {
              r[n] = {
                src: n,
                Es: t === undefined ? {
                  xs: 0
                } : t
              };
              return r[n];
            }
          },
          Us: function (n, t) {
            if (t === undefined || t.xs !== 2) {
              (t = new Image()).xs = 2;
              t.onload = c;
              t.onerror = s;
              t.src = l(n);
            }
            return t;
          },
          Ys: r
        };
      }();
      try {
        r.exports = h;
      } catch (n) {}
    },
    9847: function (n, e, o) {
      try {
        __MUTATEQ = o(2677);
        __MUTATEQ0O = o(2190);
        __MUTATEQQo = o(3543);
        __MUTATEOO0QO = o(4071);
      } catch (n) {}
      const i = function () {
        const e = 1.4;
        const o = [];
        o[0] = __MUTATEOO0QO.cn;
        const i = o[0];
        o[1] = __MUTATEOO0QO.sn;
        const r = o[1];
        o[2] = __MUTATEOO0QO.un;
        const c = o[2];
        for (let n = 0; n < i.length; n++) {
          if (!i[n]) {
            throw "error";
          }
          i[n][1] = n;
        }
        for (let n = 0; n < r.length; n++) {
          if (!r[n]) {
            throw "error";
          }
          r[n][1] = n;
        }
        for (let t = 0; t < c.length; t++) {
          if (!c[t]) {
            throw "error";
          }
          c[t][1] = t;
        }
        const s = [];
        s[0] = "skin";
        s[1] = "accessory";
        s[2] = "back";
        const u = function () {};
        const a = ["profile", "shop", "game", "skins", "ranking"];
        const f = ["login", "settings", "changelog", "forgot-password", "faq", "policy", "no-da", "reward-da", "progress-loss", "new-password", "tutorial", "pack-builder"];
        function l(t, e) {
          if ((e = e || document).getElementById) {
            const n = e.getElementById(t);
            if (n) {
              return n;
            }
          }
          if (e.getElementsByClassName) {
            const n = e.getElementsByClassName(t);
            if (n && n[0]) {
              return n[0];
            }
          }
          if (e.getElementsByTagName) {
            const n = e.getElementsByTagName(t);
            if (n && n[0]) {
              return n[0];
            }
          }
        }
        const h = [];
        const d = [];
        const m = l("homepage");
        const g = l("middle-wrap");
        const v = l("top-wrap-left");
        const w = l("top-wrap-right");
        const b = l("bottom-wrap");
        const y = l("cross-promo");
        const z = l("pop-ui");
        const _ = l("changelog");
        const M = l("settings");
        const D = l("policy");
        const B = l("new-changelog");
        const L = l("spectator");
        const C = l("spectator-close");
        const A = [l("middle-wrap")];
        const p = l("waiting");
        const T = l("waiting-text");
        const x = l("small-waiting");
        const H = l("small-waiting-text");
        const k = l("landscape");
        const G = l("skins-middle-main");
        const E = l("skin-description");
        const U = l("skins-category");
        const Y = l("accessory-category");
        const j = l("back-category");
        const N = l("shop-skins-middle-main");
        const O = l("shop-skin-description");
        const P = l("shop-skins-category");
        const S = l("shop-accessory-category");
        const q = l("shop-back-category");
        const K = l("shop-price");
        const J = l("shop-can-buy");
        const I = l("shop-buy");
        const Z = l("shop-currency-logo");
        const V = l("change-server");
        const W = l("do-not-change-server");
        const X = l("nickname");
        let F;
        let Q;
        let R;
        let $ = "";
        let nn = "";
        let tn = 0;
        let en = 0;
        let on = 0;
        let rn = 0;
        let cn = 0;
        let sn = -1;
        function un() {
          p.classList.add("fade-in");
        }
        function an() {
          x.classList.add("fade-in");
        }
        function fn(e) {
          const i = this;
          d[e] = this;
          this.js = "pop-" + e;
          this.ws = l(this.js);
          this.style = this.ws.style;
          this.ws.addEventListener("click", function (n) {
            n.stopPropagation();
          });
          this.hide = function () {
            z.style.display = "none";
            i.style.display = "none";
            Q = undefined;
          };
          this.transition = function () {
            z.classList.add("fade-in");
            i.ws.classList.add("popup-fade-in");
          };
          this.show = function () {
            if (Q === undefined) {
              Q = i;
              z.classList.remove("fade-in");
              i.ws.classList.remove("popup-fade-in");
              z.style.display = "flex";
              i.style.display = "flex";
              setTimeout(i.transition, 50);
            }
          };
          l("pop-close-button", this.ws).addEventListener("click", this.hide);
        }
        function ln(t) {
          this.gs = u;
          this.ds = u;
          const o = this;
          h[t] = this;
          this.js = t + "-content";
          this.Ns = "nav-" + t;
          this.ws = l(this.js);
          this.style = this.ws.style;
          this.Os = l(this.Ns);
          this.Ps = l("nav-button-text", this.Os);
          this.hide = function () {
            o.style.display = "none";
            o.Ps.classList.remove("nav-button-active");
            o.Ps.classList.add("nav-button-text");
            o.ds();
          };
          this.transition = function () {
            o.ws.classList.add("fade-in");
          };
          this.show = function () {
            if (F !== o) {
              if (F) {
                F.hide();
              }
              F = o;
              o.ws.classList.remove("fade-in");
              o.style.display = "flex";
              o.Ps.classList.remove("nav-button-text");
              o.Ps.classList.add("nav-button-active");
              setTimeout(o.transition, 50);
              o.gs();
            }
          };
          this.Os.addEventListener("click", this.show);
          this.hide();
        }
        function hn() {
          let e = 0;
          let o = 0;
          e = window.innerWidth / 1270;
          o = window.innerHeight / 685;
          if (window.innerWidth > window.innerHeight * 0.9) {
            k.style.display = "none";
          } else {
            k.style.display = "flex";
          }
          const i = Math.min(1, Math.min(e, o));
          g.style.transform = "scale(" + i + ")";
          v.style.transform = "scale(" + i + ")";
          w.style.transform = "scale(" + i + ")";
          b.style.transform = "scale(" + i + ")";
          y.style.transform = "scale(" + i + ")";
          y.style.top = Math.floor(i * 70) + "px";
          const r = l("pop-ui");
          r.style.transform = "scale(" + i + ")";
          const c = Math.ceil(1 / i * 100) - 100;
          r.style.left = "-" + c / 2 + "%";
          r.style.top = "-" + c / 2 + "%";
          r.style.width = 100 + c + "%";
          r.style.height = 100 + c + "%";
        }
        function dn() {
          if (cn === 0) {
            cn = 1;
            C.style.display = "inline-block";
            for (let n of A) {
              n.style.display = "none";
            }
          } else {
            cn = 0;
            C.style.display = "none";
            for (let n of A) {
              n.style.display = "flex";
            }
          }
        }
        function mn(n, t, e) {
          return (1 - e) * n + e * t;
        }
        function gn(n) {
          n.Ss = mn(n.Ss, n.qs, 0.1);
          n.Ks = mn(n.Ks, n.Js, 0.1);
          n.Is = mn(n.Is, n.Zs, 0.1);
          n.Vs = mn(n.Vs, n.Ws, 0.1);
        }
        function vn(t, i, r) {
          const s = l(t);
          this.Xs = new __MUTATEQ0O.Fs(s, i, 186, 196, gn);
          this.Xs.qs = 0;
          this.Xs.Js = 0;
          this.Xs.Zs = 1;
          this.Xs.Ws = 1;
          const u = Math.min(o[0].length - 1, __MUTATEQQo.getData("skin") || 0);
          const a = Math.min(o[1].length - 1, __MUTATEQQo.getData("accessory") || 0);
          const f = Math.min(o[2].length - 1, __MUTATEQQo.getData("back") || 0);
          this.Xs.Qs("img/skins/back" + f + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const h = this.Xs.Rs[0];
          this.Xs.Qs("img/skins/arm" + u + ".png", 58, 151, Math.PI / 2, e, e, 1);
          const d = this.Xs.Rs[1];
          this.Xs.Qs("img/skins/arm" + u + ".png", 128, 151, Math.PI / 2, e, -1.4, 1);
          const m = this.Xs.Rs[2];
          this.Xs.Qs("img/skins/body" + u + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const g = this.Xs.Rs[3];
          this.Xs.Qs("img/skins/accessory" + a + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const v = this.Xs.Rs[4];
          this.$s = function (n, t) {
            let i = "";
            if (n === "skin") {
              i = o[0][t][0];
              g.nu = __MUTATEQ.Gs("img/skins/body" + t + ".png");
              d.nu = __MUTATEQ.Gs("img/skins/arm" + t + ".png");
              m.nu = d.nu;
            } else if (n === "accessory") {
              i = o[1][t][0];
              v.nu = __MUTATEQ.Gs("img/skins/accessory" + t + ".png");
            } else if (n === "back") {
              i = o[2][t][0];
              h.nu = __MUTATEQ.Gs("img/skins/back" + t + ".png");
            }
            r.innerText = i;
            nn = i;
          };
        }
        function wn(t) {
          U.classList.remove("dark-blue-button-4-active");
          Y.classList.remove("dark-blue-button-4-active");
          j.classList.remove("dark-blue-button-4-active");
          P.classList.remove("dark-blue-button-4-active");
          S.classList.remove("dark-blue-button-4-active");
          q.classList.remove("dark-blue-button-4-active");
          t.classList.add("dark-blue-button-4-active");
        }
        function bn(n, e, o) {
          n.addEventListener("click", function () {
            if (R !== undefined) {
              R.classList.remove("skin-active");
            }
            R = n;
            n.classList.add("skin-active");
            __MUTATEQQo.setData(e, o);
            h.skins.skinSelector.$s(e, o);
          });
        }
        function yn(n, e, o, i) {
          n.addEventListener("click", function () {
            $ = e;
            en = o;
            tn = i;
            if (R !== undefined) {
              R.classList.remove("skin-active");
            }
            R = n;
            n.classList.add("skin-active");
            K.innerText = i;
            I.style.display = "flex";
            if (__MUTATE000.Ds() >= i) {
              I.classList.remove("yellow-button-active");
              J.innerText = "BUY";
              J.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
              K.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
              Z.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
            } else {
              I.classList.add("yellow-button-active");
              J.innerText = "NEED";
              J.style.cursor = "";
              K.style.cursor = "";
              Z.style.cursor = "";
            }
            h.shop.skinSelector.$s(e, o);
          });
        }
        function zn(n, t) {
          return n[2] - t[2];
        }
        function _n(t, e, i, r) {
          if (sn === t) {
            return;
          }
          sn = t;
          wn(e);
          r.innerHTML = "";
          const u = s[t];
          const a = o[t].slice().sort(zn);
          const f = a.length;
          const d = __MUTATE000.Bs(u);
          let m = document.createElement("div");
          m.classList.add("skins-line");
          let g = 0;
          let v = 0;
          for (let n = 0; n < f; n++) {
            let t = a[n];
            let e = t[2];
            let o = t[1];
            if (i === 1 && e !== 0 && d.indexOf(o) === -1) {
              continue;
            }
            if (i === 2 && (e === 0 || d.indexOf(o) !== -1)) {
              continue;
            }
            let s = document.createElement("img");
            s.tu = u + o;
            s.draggable = "false";
            s.src = "img/ui/" + u + o + ".png";
            s.classList.add("skin");
            m.appendChild(s);
            if (i === 1) {
              bn(s, u, o);
            } else if (i === 2) {
              yn(s, u, o, e);
            }
            if (g === 0 || (g + 1) % 5 != 0 && n !== f - 1) {
              v = 1;
            } else {
              r.appendChild(m);
              m = document.createElement("div");
              m.classList.add("skins-line");
              v = 0;
            }
            g++;
          }
          if (v === 1) {
            r.appendChild(m);
          }
          const w = Math.min(a.length - 1, __MUTATEQQo.getData(u) || 0);
          R = l(u + w);
          if (R) {
            R.classList.add("skin-active");
            h.skins.skinSelector.$s(u, w);
          }
        }
        function Mn(n, t, e, o) {
          const i = h.skins;
          const r = h.shop;
          i.skinSelector.Xs.qs = n;
          i.skinSelector.Xs.Js = t;
          i.skinSelector.Xs.Zs = e;
          i.skinSelector.Xs.Ws = o;
          r.skinSelector.Xs.qs = n;
          r.skinSelector.Xs.Js = t;
          r.skinSelector.Xs.Zs = e;
          r.skinSelector.Xs.Ws = o;
        }
        function Dn(n) {
          Mn(0, 0, 1, 1);
          R = undefined;
          sn = -1;
          n.innerHTML = "";
        }
        z.addEventListener("click", function () {
          if (Q !== undefined) {
            Q.hide();
          }
        });
        (function () {
          l("version").innerText = 10;
          for (let n in a) {
            new ln(a[n]);
          }
          for (let n in f) {
            new fn(f[n]);
          }
          _.addEventListener("click", function () {
            __MUTATEQQo.setData("gameVersion", 10);
            d.changelog.show();
            B.style.display = "none";
          });
          const e = "_atgam";
          if (!__MUTATEQQo.getData(e)) {
            __MUTATEQQo.setData(e, "GM" + __MUTATEQQo.eu(1) + "." + __MUTATEQQo.eu(4) + "." + __MUTATEQQo.eu(16), ".sploop.io");
          }
          M.addEventListener("click", function () {
            d.settings.show();
          });
          D.addEventListener("click", function () {
            d.policy.show();
          });
          L.addEventListener("click", dn);
          C.addEventListener("click", dn);
          const o = h.skins;
          o.skinSelector = new vn("skin-box", "skin-selector", E);
          o.gs = function () {
            const e = Number(__MUTATEQQo.getData("skin")) || 0;
            o.skinSelector.$s("skin", e);
            const i = Number(__MUTATEQQo.getData("accessory")) || 0;
            o.skinSelector.$s("accessory", i);
            const r = Number(__MUTATEQQo.getData("back")) || 0;
            o.skinSelector.$s("back", r);
            o.skinSelector.Xs.ys();
            _n(0, U, 1, G);
          };
          o.ds = function () {
            o.skinSelector.Xs.remove();
            Dn(G);
          };
          Y.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            _n(1, Y, 1, G);
          });
          j.addEventListener("click", function () {
            Mn(27.900000000000006, 58.80000000000001, 0.7, 0.7);
            _n(2, j, 1, G);
          });
          U.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            _n(0, U, 1, G);
          });
          const i = h.shop;
          i.skinSelector = new vn("shop-skin-box", "shop-skin-selector", O);
          i.gs = function () {
            i.skinSelector.Xs.ys();
            __MUTATE000.zs();
            const e = Number(__MUTATEQQo.getData("skin")) || 0;
            i.skinSelector.$s("skin", e);
            const o = Number(__MUTATEQQo.getData("accessory")) || 0;
            i.skinSelector.$s("accessory", o);
            const r = Number(__MUTATEQQo.getData("back")) || 0;
            i.skinSelector.$s("back", r);
            I.style.display = "none";
            _n(0, P, 2, N);
          };
          i.ds = function () {
            __MUTATE000._s();
            i.skinSelector.Xs.remove();
            Dn(N);
          };
          q.addEventListener("click", function () {
            Mn(27.900000000000006, 58.80000000000001, 0.7, 0.7);
            _n(2, q, 2, N);
          });
          S.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            _n(1, S, 2, N);
          });
          P.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            _n(0, P, 2, N);
          });
          I.addEventListener("click", function () {
            __MUTATE000.Ls($, nn, en, tn);
          });
          V.addEventListener("click", function () {
            const n = d["progress-loss"];
            n.hide();
            n.next();
          });
          W.addEventListener("click", function () {
            d["progress-loss"].hide();
          });
          window.addEventListener("resize", hn, false);
          hn();
          m.style.display = "flex";
          h.game.show();
          X.addEventListener("input", function () {
            __MUTATEQQo.setData("nickname", X.value);
          });
          X.value = __MUTATEQQo.getData("nickname") || "";
          const r = Number(__MUTATEQQo.getData("gameVersion")) || 0;
          B.style.display = r === 10 ? "none" : "flex";
        })();
        return {
          get: l,
          views: h,
          vs: d,
          hs: function (n) {
            on++;
            p.classList.remove("fade-in");
            p.style.display = "flex";
            T.innerText = n;
            setTimeout(un, 0);
          },
          us: function () {
            on = Math.max(0, on - 1);
            if (on <= 0) {
              p.style.display = "none";
            }
          },
          ou: function (t) {
            rn++;
            x.classList.remove("fade-in");
            x.style.display = "flex";
            H.innerText = t;
            setTimeout(an, 0);
          },
          iu: function () {
            rn = Math.max(0, rn - 1);
            if (rn <= 0) {
              x.style.display = "none";
            }
          },
          ru: i.length,
          cu: r.length,
          su: c.length
        };
      }();
      try {
        n.exports = i;
      } catch (n) {}
    },
    6820: function () {
      var e;
      var o = document.getElementById("show-ranks-list-button");
      var i = document.getElementById("ranking-rank-container");
      var r = document.getElementById("ranks-list");
      var c = document.getElementById("ranking-rank");
      var s = document.getElementById("ranking-fullscreen");
      var u = document.getElementById("rank-fullscreen-close");
      var a = [document.getElementById("ranking-middle-main"), document.getElementById("ranking2-middle-main")];
      for (var f = ["profile", "shop", "game", "skins"], l = 0; l < f.length; l++) {
        e = f[l];
        document.getElementById("nav-" + e).addEventListener("click", function () {
          if (a[0].classList.contains("rank-fullscreen")) {
            d();
          }
          s.parentElement.style.display = "none";
        });
      }
      document.getElementById("nav-ranking").addEventListener("click", function () {
        s.parentElement.style.display = "flex";
      });
      var h = [];
      for (l = 0; l < a.length; l++) {
        h.push({
          parent: a[l].parentElement,
          nextSibling: a[l].nextElementSibling
        });
      }
      function d() {
        u.style.display = "none";
        s.src = "img/ui/fullscreen.png";
        for (var e = 0; e < a.length; e++) {
          var o = a[e];
          o.classList.remove("rank-fullscreen");
          var i = h[e];
          if (i.nextSibling && i.nextSibling.parentNode === i.parent) {
            i.parent.insertBefore(o, i.nextSibling);
          } else {
            i.parent.appendChild(o);
          }
        }
      }
      function m() {
        s.src = "img/ui/unfullscreen.png";
        for (var e = 0; e < a.length; e++) {
          document.body.appendChild(a[e]);
          a[e].classList.add("rank-fullscreen");
        }
        u.style.display = "flex";
      }
      u.addEventListener("click", d);
      s.onclick = function () {
        if (a[0].classList.contains("rank-fullscreen")) {
          d();
        } else {
          m();
        }
      };
      document.addEventListener("keydown", function (t) {
        if (t.key === "Escape" && a[0].classList.contains("rank-fullscreen")) {
          d();
        }
      });
      o.onmousedown = function () {
        o.classList.add("dark-blue-button-2-active");
      };
      o.onclick = function () {
        a[0].style.display = "none";
        a[1].style.display = "inline-block";
        r.style.display = "block";
        i.style.display = "none";
        c.classList.remove("dark-blue-button-2-active");
      };
      c.onclick = function () {
        r.style.display = "none";
        i.style.display = "block";
        c.classList.add("dark-blue-button-2-active");
        o.classList.remove("dark-blue-button-2-active");
      };
      for (var g = 0; g < a.length; g++) {
        a[g].classList.add("scrollbar");
      }
    },
    9082: function (n, e, o) {
      var r = "";
      var c = 0;
      var s = 0;
      for (var u = o(2072).split("\n"), a = 0; a < u.length; a++) {
        var f = u[a].trim();
        if (f) {
          if (f !== "!HTML") {
            if (f !== "!New Section") {
              if (f.indexOf("img/") !== -1 && s !== 5 && f[0] !== "i") {
                f = f.replace(/(img\/.*\.png)/, "<img class=\"tutorial-img\" src=\"$1\">");
              }
              if (s === 0) {
                s = 1;
                r += "<div class=\"tutorial-page subcontent-bg\"><h2 class=\"subcontent-title\">" + f + "</h2>";
              } else if (s === 1) {
                s = 2;
                r += "<span class=\"subcontent-title\">" + f + "</span><br>";
              } else if (s === 2) {
                s = 4;
                r += "<br><div class=\"tutorial-title-container\"><span class=\"subcontent-title tutorial-title\">" + f + "</span>";
              } else if (s === 4) {
                if (f[0] === "-") {
                  s = 3;
                  r += "</div><ul><li><b>•</b> " + f.slice(2) + "</li>";
                } else if (f[0] === "i") {
                  r += "<img class=\"tutorial-img\" src=\"" + f + "\">";
                }
              } else if (s === 3) {
                r += "<li><b>•</b> " + f.slice(2) + "</li>";
              } else if (s === 5) {
                r += f;
              }
            } else {
              r += "</div>";
              s = 0;
            }
          } else if (s === 5) {
            s = c;
          } else {
            c = s;
            s = 5;
          }
        } else if (s === 3) {
          s = 2;
          r += "</ul>";
        }
      }
      if (s === 3) {
        r += "</ul>";
      } else if (s === 4) {
        r += "</div>";
      }
      r += "</div>";
      var l = document.getElementById("tutorial-pages-container");
      if (l) {
        l.insertAdjacentHTML("beforeend", r);
      }
    },
    2190: function (n, e, o) {
      try {
        __MUTATEQ = o(2677);
        __MUTATEQQo = o(3543);
      } catch (n) {}
      const i = function () {
        const n = function () {};
        const e = [];
        let o;
        function i(n) {
          const i = n.nu.Es;
          if (i.xs !== 1) {
            n.nu.Es = __MUTATEQ.Us(n.nu.src, i);
            return;
          }
          const r = n.uu * i.width / 2;
          const c = n.au * i.height / 2;
          o.save();
          o.translate(n.fu, n.lu);
          o.rotate(n.hu);
          o.scale(n.du, n.mu);
          if (n.gu !== 1) {
            o.globalAlpha = n.gu;
          }
          o.drawImage(i, -r / 2, -c / 2, r, c);
          o.restore();
        }
        function r(n, t, e, o, i, r, c) {
          this.nu = __MUTATEQ.Gs(n);
          this.fu = t || 0;
          this.lu = e || 0;
          this.hu = o || 0;
          this.uu = Math.abs(i) || 1;
          this.au = Math.abs(r) || 1;
          this.du = i > 0 ? 1 : -1;
          this.mu = r > 0 ? 1 : -1;
          this.gu = c || 1;
        }
        return {
          Fs: function (c, s, u, a, f) {
            const l = this;
            if (f === undefined) {
              f = n;
            }
            this.Rs = [];
            this.Rc = s;
            this.Ss = 0;
            this.Ks = 0;
            this.Is = 1;
            this.Vs = 1;
            this.isActive = 0;
            this.ys = function () {
              c.innerHTML = "<canvas id=\"" + s + "\"></canvas>";
              l.vu = document.getElementById(s);
              l.wu = l.vu.getContext("2d");
              l.vu.width = u;
              l.vu.height = a;
              l.isActive = 1;
              e.push(l);
            };
            this.remove = function () {
              l.isActive = 0;
              e.splice(e.indexOf(l), 1);
              c.innerHTML = "";
              l.vu = undefined;
              l.wu = undefined;
            };
            this.bu = function () {
              l.remove();
              l.Rs.length = 0;
            };
            this.Qs = function (n, t, e, o, i, c, s) {
              const u = new r(n, t, e, o, i, c, s);
              l.Rs.push(u);
            };
            this.yu = function () {
              if (l.isActive === 0) {
                return;
              }
              const e = o;
              o = l.wu;
              o.clearRect(0, 0, u, a);
              o.save();
              o.translate(l.Ss, l.Ks);
              o.scale(l.Is, l.Vs);
              f(l);
              const r = l.Rs.length;
              for (let n = 0; n < r; n++) {
                i(l.Rs[n]);
              }
              o.restore();
              o = e;
            };
          },
          yu: function () {
            const n = e.length;
            for (let t = 0; t < n; t++) {
              e[t].yu();
            }
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {}
    },
    1872: function () {
      var e = document.getElementById("pop-ui");
      var o = document.getElementById("pop-tutorial");
      document.getElementById("how-to").onclick = function () {
        e.style.display = "flex";
        e.classList.remove("fade-in");
        o.style.display = "flex";
        o.classList.remove("popup-fade-in");
        setTimeout(function () {
          e.classList.add("fade-in");
          o.classList.add("popup-fade-in");
        }, 0);
      };
      e.addEventListener("click", function (t) {
        if (t.target === e || t.target.classList.contains("pop-close")) {
          e.style.display = "none";
          o.style.display = "none";
        }
      });
      var i = document.getElementById("tutorial-contents");
      var r = document.getElementById("tutorial-scrolltop");
      var c = document.getElementById("tutorial-pages-container");
      for (var s = o.querySelectorAll("h2.subcontent-title"), u = 1; u < s.length; u++) {
        (function (n) {
          var e = document.createElement("li");
          e.textContent = s[n].textContent;
          e.classList.add("pop-close");
          e.onclick = function () {
            s[n].parentElement.scrollIntoView({
              zu: "start",
              behavior: "smooth"
            });
          };
          i.appendChild(e);
        })(u);
      }
      r.onclick = function () {
        c.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      };
      c.onscroll = function () {
        if (c.scrollTop >= 300) {
          r.style.opacity = "1";
        } else {
          r.style.opacity = "0";
        }
      };
      var a = document.getElementById("acceptPolicyButton");
      if (a) {
        a.onclick = function () {
          e.click();
        };
      }
    },
    9605: function () {
      var e = document.getElementById("help-howto");
      var o = document.getElementById("how-to");
      if (localStorage.getItem("helpClicked")) {
        e.style.display = "none";
      }
      o.addEventListener("click", function () {
        localStorage.setItem("helpClicked", "true");
        e.style.display = "none";
      });
    },
    1174: function (n, e, o) {
    /* ADS EDIT
      const i = function () {
        let n;
        let e;
        return {
          ys: function () {
            n = o(5299);
            try {
              r = document;
              c = "script";
              s = "gamedistribution-jssdk";
              a = r.getElementsByTagName(c)[0];
              if (!r.getElementById(s)) {
                (u = r.createElement(c)).tu = s;
                u.src = "https://api.adinplay.com/libs/aiptag/pub/LSI/lostworld.io/tag.min.js";
                a.parentNode.insertBefore(u, a);
              }
              const n = {
                cmd: []
              };
              window.aiptag = window.aiptag || n;
              const t = window.aiptag;
              t.cmd.display = t.cmd.display || [];
              t.cmd.player = t.cmd.player || [];
              window.aiptag.cmd.display.push(function () {
                window.aipDisplayTag.display("lostworld-io_300x250_1");
              });
              window.aiptag.cmd.display.push(function () {
                window.aipDisplayTag.display("lostworld-io_300x250_2");
              });
              window.aiptag.cmd.display.push(function () {
                window.aipDisplayTag.display("lostworld-io_970x250");
              });
              t.cmd.player.push(function () {
                window.adplayer = new window.aipPlayer({
                  AIP_REWARDEDCOMPLETE: function (n) {
                    if (n !== "canceled") {
                      e._u();
                    }
                  },
                  AD_WIDTH: 960,
                  AD_HEIGHT: 540,
                  AD_FULLSCREEN: true,
                  AD_CENTERPLAYER: true,
                  LOADING_TEXT: "loading advertisement",
                  PREROLL_ELEM: function () {
                    return document.getElementById("preroll");
                  },
                  AIP_COMPLETE: function (n) {
                    e._u();
                  },
                  AIP_REMOVE: function () {}
                });
              });
            } catch (n) {}
            var r;
            var c;
            var s;
            var u;
            var a;
          },
          refresh: function () {
            try {
              window.aiptag.cmd.display.push(function () {
                window.aipDisplayTag.display("lostworld-io_300x250_1");
              });
              window.aiptag.cmd.display.push(function () {
                window.aipDisplayTag.display("lostworld-io_300x250_2");
              });
              window.aiptag.cmd.display.push(function () {
                window.aipDisplayTag.display("lostworld-io_970x250");
              });
            } catch (n) {}
          },
          Mu: function () {
            n.Du();
          },
          Bu: function () {
            try {
              if (window.adplayer !== undefined) {
                startReward();
                window.aiptag.cmd.player.push(function () {
                  window.adplayer.startPreRoll();
                });
                return 1;
              } else {
                __MUTATEo();
                return 0;
              }
            } catch (n) {
              __MUTATEo();
              return 0;
            }
          },
          Lu: function (n) {
            e = n;
            e._u();
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {} ENDEDIT*/
    },
    5299: function (n, e, o) {
      try {
        __MUTATE000 = o(6078);
        __MUTATEOO = o(9847);
        __MUTATEQQo = o(3543);
        __MUTATEO = o(1174);
        __MUTATEoQO = o(3840);
        __MUTATEoo0o = o(8582);
        __MUTATEoo0 = o(9705);
        //CPMStarAds = o(5438); ADS EDIT ENDEDIT
      } catch (n) {}
      /* ADS EDIT
      let i;
      function r() {
        if (n.exports.Cu === 1) {
          try {
            __MUTATEOO.get("lostworld-io_970x250").innerHTML = "<a href=\"https://taming.io\" onclick=\"try{Widget.sendAdd('taming.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/taming92.png\"></img></a>";
            __MUTATEOO.get("lostworld-io_300x250_1").innerHTML = "<a href=\"https://shootup.io\" onclick=\"try{Widget.sendAdd('shootup.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/shootup32.png\"></img></a>";
            __MUTATEOO.get("lostworld-io_300x250_2").innerHTML = "<a href=\"https://webgames.io\" onclick=\"try{Widget.sendAdd('webgames.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/webgames32.png\"></img></a>";
          } catch (n) {}
        }
      }
      Date.now();
      try {
        n.exports = {};
        n.exports.Au = function (n) {
          i.refresh();
        };
        n.exports.Lu = function (n) {
          i.Lu(n);
        };
        n.exports.pu = i;
        n.exports.Cu = 0;
        n.exports.Tu = r;
        n.exports.Du = function (e) {
          e = e || "https://api.adinplay.com/libs/aiptag/assets/adsbygoogle.js";
          __MUTATEQQo.request(e, undefined, function () {
            n.exports.Cu = 1;
            r();
          });
        };
        n.exports.xu = function () {
          adblockerPopup.openClosePopup();
        };
        n.exports.Hu = function () {};
      } catch (n) {}
      (function () {
        const e = __MUTATEQQo.bs("ref");
        if (e === "crazygames") {
          i = __MUTATEoQO;
          const n = __MUTATEOO.get("shop-io-games");
          n[__MUTATEQQo.ls("onclick")] = function () {};
          n[__MUTATEQQo.ls("href")] = "https://www.crazygames.com/c/io";
        } else if (e === "gamedistribution") {
          __MUTATEOO.get("cross-promo").style.display = "none";
          i = __MUTATEoo0o;
        } else if (e === "gamemonetize") {
          i = __MUTATEoo0;
        } else {
          i = CPMStarAds;
          __MUTATEOO.get("iogames").style.display = "none";
        }
        __MUTATEOO.get("da-left").innerHTML = "<div id='lostworld-io_300x250_1'></div>";
        __MUTATEOO.get("da-right").innerHTML = "<div id='lostworld-io_300x250_2'></div>";
        __MUTATEOO.get("da-bottom").innerHTML = "<div id='lostworld-io_970x250'></div>";
        i.ys();
        i.Mu();
      })(); ENDEDIT*/
    },
    5438: function (n, e, o) {
    /* ADS EDIT
      const i = function () {
        let n;
        let e;
        let i;
        return {
          ys: function () {
            n = o(5299);
            i = o(3543);
            try {
              (function () {
                var e = i.ls("824_52651_gameapi");
                var o = i.ls("cpmstarx");
                var r = window[o] = window[o] || {};
                var c = Math.round(Math.random() * 999999);
                var u = document.createElement("script");
                u[i.ls("type")] = "text/javascript";
                u[i.ls("async")] = true;
                u[i.ls("onerror")] = function () {
                  var o = function (n) {
                    if (n && typeof n == "object" && s[i.ls("fail")]) {
                      s[i.ls("fail")]();
                    }
                  };
                  if (r && Array.isArray(r[i.ls("cmd")]) && r[i.ls("cmd")].forEach(o)) {
                    r[i.ls("cmd")].length = 0;
                  }
                  cpmstarAPI = window[i.ls("_" + e)] = o;
                };
                var a = document.location[i.ls("protocol")];
                var f = a == "https:" || a == "file:" ? "https://server" : "//cdn";
                if (window.location[i.ls("hash")] == "#cpmstarDev") {
                  f = "//dev.server";
                }
                if (window.location[i.ls("hash")] == "#cpmstarStaging") {
                  f = "//staging.server";
                }
                u.src = f + ".cpmstar.com/cached/zonefiles/" + e + ".js?rnd=" + c;
                var l = document.getElementsByTagName("script")[0];
                l.parentNode.insertBefore(u, l);
                cpmstarAPI = function (t) {
                  (r[i.ls("cmd")] = r[i.ls("cmd")] || []).push(t);
                };
                cpmstarAPI;
              })();
              const n = document.createElement("script");
              n.setAttribute("src", "https://ssl.cdne.cpmstar.com/cached/js/lib.js");
              document.head.appendChild(n);
              (function () {
                var n = window;
                var t = 86200;
                document.getElementById("lostworld-io_300x250_1").classList.add("div-" + t);
                var e = i.ls("cpmstarx");
                var o = n.document.getElementsByClassName("div-" + t);
                var r = o.length - 1;
                var c = o[r];
                const s = {
                  [i.ls("kind")]: "asynctagfetch",
                  [i.ls("el")]: c,
                  [i.ls("pid")]: t,
                  [i.ls("pindex")]: r
                };
                n[e] = n[e] || {};
                (n[e][i.ls("libcmd")] = n[e][i.ls("libcmd")] || []).push(s);
              })();
              (function () {
                var t = window;
                var o = 86185;
                document.getElementById("lostworld-io_300x250_2").classList.add("div-" + o);
                var r = i.ls("cpmstarx");
                var c = t.document.getElementsByClassName("div-" + o);
                var s = c.length - 1;
                var u = c[s];
                const a = {
                  [i.ls("kind")]: "asynctagfetch",
                  [i.ls("el")]: u,
                  [i.ls("pid")]: o,
                  [i.ls("pindex")]: s
                };
                t[r] = t[r] || {};
                (t[r][i.ls("libcmd")] = t[r][i.ls("libcmd")] || []).push(a);
              })();
              (function () {
                var t = window;
                var o = 86183;
                document.getElementById("lostworld-io_970x250").classList.add("div-" + o);
                var r = i.ls("cpmstarx");
                var c = t.document.getElementsByClassName("div-" + o);
                var s = c.length - 1;
                var u = c[s];
                const a = {
                  [i.ls("kind")]: "asynctagfetch",
                  [i.ls("el")]: u,
                  [i.ls("pid")]: o,
                  [i.ls("pindex")]: s
                };
                t[r] = t[r] || {};
                (t[r][i.ls("libcmd")] = t[r][i.ls("libcmd")] || []).push(a);
              })();
            } catch (n) {}
          },
          refresh: function () {
            try {
              const t = {
                [i.ls("kind")]: "adcmd",
                [i.ls("command")]: "refresh",
                [i.ls("module")]: "POOL 86183"
              };
              cpmstarAPI(t);
              const e = {
                [i.ls("kind")]: "adcmd",
                [i.ls("command")]: "refresh",
                [i.ls("module")]: "POOL 86185"
              };
              cpmstarAPI(e);
              const o = {
                [i.ls("kind")]: "adcmd",
                [i.ls("command")]: "refresh",
                [i.ls("module")]: "POOL 86200"
              };
              cpmstarAPI(o);
            } catch (n) {}
          },
          Mu: function () {
            n.Du();
          },
          Bu: function () {
            try {
              __MUTATEo();
              return 0;
            } catch (n) {
              __MUTATEo();
              return 0;
            }
          },
          Lu: function (n) {
            e = n;
            e._u();
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {} ENDEDIT*/
    },
    3840: function (n, e, o) {
    /* ADS EDIT
      const r = function () {
        let n;
        let e;
        let i;
        let r;
        function c() {
          if (window.CrazyGames) {
            n = window[i.ls("CrazyGames")][i.ls("CrazySDK")][i.ls("getInstance")]();
            n[i.ls("init")]();
            n.addEventListener("adStarted", function () {});
            n.addEventListener("adFinished", function () {
              r._u();
            });
            n.addEventListener("adError", function () {
              r._u();
            });
            n.addEventListener("bannerRendered", function (n) {});
            n.addEventListener("bannerError", function (n) {});
            s();
          } else {
            setTimeout(c, 100);
          }
        }
        function s() {
          try {
            if (e.Cu === 0) {
              const t = {
                [i.ls("containerId")]: "lostworld-io_300x250_2",
                [i.ls("size")]: "300x250"
              };
              const e = {
                [i.ls("containerId")]: "lostworld-io_970x250",
                [i.ls("size")]: "728x90"
              };
              n[i.ls("requestBanner")]([t, e]);
            }
          } catch (n) {}
        }
        let u = 0;
        return {
          ys: function () {
            e = o(5299);
            i = o(3543);
            try {
              r = document;
              s = "script";
              u = "crazygames-sdk";
              f = r.getElementsByTagName(s)[0];
              if (!r.getElementById(u)) {
                (a = r.createElement(s)).tu = u;
                a.src = "https://sdk.crazygames.com/crazygames-sdk-v1.js";
                f.parentNode.insertBefore(a, f);
              }
              document.getElementById("lostworld-io_300x250_1").style.width = "300px";
              document.getElementById("lostworld-io_300x250_1").style.height = "250px";
              document.getElementById("lostworld-io_300x250_2").style.width = "300px";
              document.getElementById("lostworld-io_300x250_2").style.height = "250px";
              document.getElementById("lostworld-io_970x250").style.width = "970px";
              document.getElementById("lostworld-io_970x250").style.height = "250px";
              c();
            } catch (n) {}
            var r;
            var s;
            var u;
            var a;
            var f;
          },
          refresh: s,
          Mu: function () {
            e.Du("https://images.crazygames.com/crazygames-sdk/300x250.png");
          },
          Bu: function () {
            try {
              n[i.ls("requestAd")]("rewarded");
              return 1;
            } catch (n) {
              __MUTATEo();
              return 0;
            }
          },
          Lu: function (o) {
            r = o;
            const s = Date.now();
            if (s - u > 60000 && e.Cu === 0) {
              u = s;
              n[i.ls("requestAd")]("midgame");
            } else {
              r._u();
            }
          }
        };
      }();
      try {
        n.exports = r;
      } catch (n) {} ENDEDIT*/
    },
    8582: function (n, e, o) {
    /* ADS EDIT
      const i = function () {
        let n;
        let e;
        let i;
        let r = 0;
        return {
          ys: function () {
            n = o(5299);
            e = o(3543);
            try {
              window[e.ls("GD_OPTIONS")] = {};
              const n = window[e.ls("GD_OPTIONS")];
              n[e.ls("gameId")] = "f5f7201758da41ceb7437a19b243de05";
              n[e.ls("onEvent")] = function (n) {
                switch (n[e.ls("name")]) {
                  case "SDK_READY":
                    if (r === 0) {
                      r = 1;
                      const n = {
                        [e.ls("containerId")]: "lostworld-io_300x250_1"
                      };
                      window[e.ls("gdsdk")][e.ls("showAd")](window[e.ls("gdsdk")][e.ls("AdType")][e.ls("Display")], n);
                      const o = {
                        [e.ls("containerId")]: "lostworld-io_300x250_2"
                      };
                      window[e.ls("gdsdk")][e.ls("showAd")](window[e.ls("gdsdk")][e.ls("AdType")][e.ls("Display")], o);
                      const i = {
                        [e.ls("containerId")]: "lostworld-io_970x250"
                      };
                      window[e.ls("gdsdk")][e.ls("showAd")](window[e.ls("gdsdk")][e.ls("AdType")][e.ls("Display")], i);
                    }
                    break;
                  case "AD_ERROR":
                  case "SDK_GAME_START":
                    i._u();
                }
              };
              s = document;
              u = "script";
              a = "gamedistribution-jssdk";
              l = s.getElementsByTagName(u)[0];
              if (!s.getElementById(a)) {
                (f = s.createElement(u)).tu = a;
                f.src = "https://html5.api.gamedistribution.com/main.min.js";
                l.parentNode.insertBefore(f, l);
              }
            } catch (n) {}
            var s;
            var u;
            var a;
            var f;
            var l;
          },
          refresh: function () {},
          Mu: function () {
            e.request("https://tracker.gamedock.io/v1/events-tracker/track/gd/event/pageview", function () {
              n.Cu = 0;
            }, function (t) {
              if (t.status === 405) {
                n.Cu = 0;
              } else {
                n.Cu = 1;
                n.Tu();
              }
            });
          },
          Bu: function () {
            try {
              if (window[e.ls("gdsdk")] !== undefined && window[e.ls("gdsdk")][e.ls("showAd")] !== undefined && n.Cu === 0) {
                n.Hu();
                window[e.ls("gdsdk")][e.ls("showAd")]("rewarded");
                return 1;
              } else {
                n.xu();
                return 0;
              }
            } catch (t) {
              n.xu();
              return 0;
            }
          },
          Lu: function (t) {
            i = t;
            if (window[e.ls("gdsdk")] !== undefined && window[e.ls("gdsdk")][e.ls("showAd")] !== undefined && n.Cu === 0) {
              window[e.ls("gdsdk")][e.ls("showAd")]();
            } else {
              i._u();
            }
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {} ENDEDIT*/
    },
    9705: function (n, e, o) {
    /* ADS EDIT
      const i = function () {
        let n;
        let e;
        let i;
        let r = 0;
        return {
          ys: function () {
            n = o(5299);
            e = o(3543);
            try {
              window[e.ls("SDK_OPTIONS")] = {};
              window[e.ls("SDK_OPTIONS")][e.ls("gameId")] = "00b2pc8ju437t9b85uea23lhsmojbk2c";
              window[e.ls("SDK_OPTIONS")][e.ls("onEvent")] = function (n) {
                switch (n[e.ls("name")]) {
                  case "SDK_READY":
                    if (r === 0) {
                      r = 1;
                    }
                    break;
                  case "AD_ERROR":
                  case "SDK_GAME_START":
                    i._u();
                }
              };
              s = document;
              u = "script";
              a = "gamemonetize-sdk";
              f = s.getElementsByTagName(u)[0];
              if (!s.getElementById(a)) {
                (s = s.createElement(u)).tu = a;
                s.src = "https://api.gamemonetize.com/sdk.js";
                f.parentNode.insertBefore(s, f);
              }
              const t = n.Cu;
              n.Cu = 1;
              n.Tu();
              n.Cu = t;
            } catch (n) {}
            var s;
            var u;
            var a;
            var f;
          },
          refresh: function () {},
          Mu: function () {
            e.request("https://tracker.gamedock.io/v1/events-tracker/track/gd/event/pageview", function () {
              n.Cu = 0;
            }, function (t) {
              if (t.status === 405) {
                n.Cu = 0;
              } else {
                n.Cu = 1;
                n.Tu();
              }
            });
          },
          Bu: function () {
            try {
              if (window[e.ls("sdk")] !== undefined && window[e.ls("sdk")][e.ls("showBanner")] !== undefined && n.Cu === 0) {
                n.Hu();
                window[e.ls("sdk")][e.ls("showBanner")]();
                return 1;
              } else {
                n.xu();
                return 0;
              }
            } catch (t) {
              n.xu();
              return 0;
            }
          },
          Lu: function (o) {
            i = o;
            if (window[e.ls("sdk")] !== undefined && window[e.ls("sdk")][e.ls("showBanner")] !== undefined && n.Cu === 0) {
              window[e.ls("sdk")][e.ls("showBanner")]();
            } else {
              i._u();
            }
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {} ENDEDIT*/
    },
    48: function (n, t, e) {
      const o = e(5397);
      n.exports = function () {
        this.ku = o.qc;
      };
    },
    8557: function (n, e, o) {
      "use strict";

      o.r(e);
      o.d(e, {
        Gu: function () {
          return He;
        },
        Eu: function () {
          return oi;
        },
        Uu: function () {
          return zi;
        },
        Yu: function () {
          return to;
        },
        ju: function () {
          return rc;
        },
        Nu: function () {
          return Lr;
        },
        Ou: function () {
          return Ar;
        },
        Pu: function () {
          return Cr;
        },
        Su: function () {
          return yi;
        },
        qu: function () {
          return uo;
        },
        Ku: function () {
          return wo;
        },
        canvas: function () {
          return Re;
        },
        Ju: function () {
          return tc;
        },
        Iu: function () {
          return Ui;
        },
        Zu: function () {
          return Oo;
        },
        Vu: function () {
          return Gi;
        },
        Wu: function () {
          return fo;
        },
        Xu: function () {
          return Ao;
        },
        Fu: function () {
          return xi;
        },
        Qu: function () {
          return So;
        },
        Ru: function () {
          return Di;
        },
        $u: function () {
          return Ei;
        },
        na: function () {
          return To;
        },
        ta: function () {
          return Bi;
        },
        connect: function () {
          return gr;
        },
        ea: function () {
          return Eo;
        },
        oa: function () {
          return Hi;
        },
        ia: function () {
          return ki;
        },
        ra: function () {
          return Ci;
        },
        ca: function () {
          return $e;
        },
        sa: function () {
          return Zi;
        },
        ua: function () {
          return Ji;
        },
        aa: function () {
          return Ii;
        },
        default: function () {
          return Nr;
        },
        fa: function () {
          return Pr;
        },
        la: function () {
          return Er;
        },
        ha: function () {
          return Or;
        },
        da: function () {
          return jr;
        },
        ma: function () {
          return Co;
        },
        ga: function () {
          return Gr;
        },
        va: function () {
          return Yr;
        },
        wa: function () {
          return qr;
        },
        ba: function () {
          return lr;
        },
        ya: function () {
          return pi;
        },
        za: function () {
          return zr;
        },
        _a: function () {
          return Xi;
        },
        Ma: function () {
          return Kr;
        },
        Da: function () {
          return $i;
        },
        Ba: function () {
          return Yi;
        },
        La: function () {
          return Ti;
        },
        Ca: function () {
          return Po;
        },
        Aa: function () {
          return no;
        },
        ys: function () {
          return _r;
        },
        pa: function () {
          return nr;
        },
        Ta: function () {
          return Dr;
        },
        xa: function () {
          return Xr;
        },
        Ha: function () {
          return _o;
        },
        ka: function () {
          return ko;
        },
        Ga: function () {
          return Ho;
        },
        Ea: function () {
          return ro;
        },
        Ua: function () {
          return lo;
        },
        Ya: function () {
          return Ur;
        },
        ja: function () {
          return dr;
        },
        Na: function () {
          return mr;
        },
        Oa: function () {
          return _i;
        },
        Pa: function () {
          return Go;
        },
        Sa: function () {
          return No;
        },
        qa: function () {
          return mo;
        },
        Ka: function () {
          return Ai;
        },
        Ja: function () {
          return Li;
        },
        Ia: function () {
          return Yo;
        },
        Za: function () {
          return jo;
        },
        Va: function () {
          return go;
        },
        Wa: function () {
          return rr;
        },
        Xa: function () {
          return cr;
        },
        Fa: function () {
          return sr;
        },
        Qa: function () {
          return Mo;
        },
        Ra: function () {
          return Do;
        },
        _u: function () {
          return nc;
        },
        $a: function () {
          return ho;
        },
        nf: function () {
          return yc;
        },
        tf: function () {
          return pc;
        },
        ef: function () {
          return dc;
        },
        if: function () {
          return Ec;
        },
        rf: function () {
          return uc;
        },
        cf: function () {
          return Lc;
        },
        sf: function () {
          return Fr;
        },
        uf: function () {
          return wc;
        },
        af: function () {
          return bc;
        },
        ff: function () {
          return Wr;
        },
        lf: function () {
          return ac;
        },
        hf: function () {
          return hc;
        },
        df: function () {
          return Yc;
        },
        mf: function () {
          return cc;
        },
        gf: function () {
          return sc;
        },
        vf: function () {
          return oc;
        },
        wf: function () {
          return Rr;
        },
        bf: function () {
          return Uc;
        },
        yf: function () {
          return Dc;
        },
        zf: function () {
          return Qr;
        },
        _f: function () {
          return Hc;
        },
        Mf: function () {
          return _c;
        },
        Df: function () {
          return gc;
        },
        Bf: function () {
          return lc;
        },
        Lf: function () {
          return Zr;
        },
        Cf: function () {
          return ic;
        },
        Af: function () {
          return Vr;
        },
        pf: function () {
          return vc;
        },
        Tf: function () {
          return ec;
        },
        xf: function () {
          return Cc;
        },
        Hf: function () {
          return $r;
        },
        kf: function () {
          return zc;
        },
        Gf: function () {
          return Ac;
        },
        Ef: function () {
          return mc;
        },
        Uf: function () {
          return fc;
        },
        Yf: function () {
          return Bc;
        },
        jf: function () {
          return kc;
        },
        Nf: function () {
          return Gc;
        },
        Of: function () {
          return xc;
        },
        Pf: function () {
          return Tc;
        },
        Sf: function () {
          return er;
        },
        qf: function () {
          return Oi;
        },
        Kf: function () {
          return zo;
        },
        Jf: function () {
          return ji;
        },
        If: function () {
          return ao;
        },
        Zf: function () {
          return po;
        },
        Vf: function () {
          return Uo;
        },
        Wf: function () {
          return Mc;
        },
        Xf: function () {
          return vr;
        },
        Ff: function () {
          return Sr;
        },
        Qf: function () {
          return Br;
        },
        resize: function () {
          return yr;
        },
        scale: function () {
          return io;
        },
        Rf: function () {
          return Si;
        },
        $f: function () {
          return Bo;
        },
        nl: function () {
          return Lo;
        },
        tl: function () {
          return Pi;
        },
        el: function () {
          return Ki;
        },
        ol: function () {
          return qi;
        },
        il: function () {
          return jc;
        },
        rl: function () {
          return ts;
        },
        cl: function () {
          return Kc;
        },
        sl: function () {
          return $c;
        },
        ul: function () {
          return es;
        },
        al: function () {
          return rs;
        },
        fl: function () {
          return Oc;
        },
        ll: function () {
          return Qc;
        },
        hl: function () {
          return Xc;
        },
        dl: function () {
          return Fc;
        },
        ml: function () {
          return Rc;
        },
        gl: function () {
          return Pc;
        },
        vl: function () {
          return Sc;
        },
        wl: function () {
          return Wc;
        },
        bl: function () {
          return qc;
        },
        yl: function () {
          return Jc;
        },
        zl: function () {
          return is;
        },
        _l: function () {
          return os;
        },
        Ml: function () {
          return ns;
        },
        Dl: function () {
          return cs;
        },
        Bl: function () {
          return Zc;
        },
        Ll: function () {
          return Ic;
        },
        Cl: function () {
          return Vc;
        },
        Al: function () {
          return Nc;
        },
        pl: function () {
          return vo;
        },
        Tl: function () {
          return Mi;
        },
        xl: function () {
          return br;
        },
        Hl: function () {
          return wr;
        },
        kl: function () {
          return ei;
        },
        Gl: function () {
          return $o;
        },
        El: function () {
          return Io;
        },
        Ul: function () {
          return bi;
        },
        Yl: function () {
          return Fo;
        },
        jl: function () {
          return Zo;
        },
        Nl: function () {
          return Xo;
        },
        Ol: function () {
          return ti;
        },
        Pl: function () {
          return Ro;
        },
        Sl: function () {
          return ni;
        },
        ql: function () {
          return Qo;
        },
        Kl: function () {
          return Vo;
        },
        Jl: function () {
          return Wo;
        },
        Il: function () {
          return xo;
        },
        Zl: function () {
          return bo;
        },
        Vl: function () {
          return yo;
        },
        Wl: function () {
          return so;
        },
        Xl: function () {
          return Fi;
        },
        Fl: function () {
          return Jo;
        },
        Ql: function () {
          return Qi;
        },
        Rl: function () {
          return Ko;
        },
        $l: function () {
          return hr;
        },
        nh: function () {
          return Ri;
        },
        th: function () {
          return xr;
        },
        eh: function () {
          return qo;
        },
        oh: function () {
          return oo;
        },
        ih: function () {
          return ur;
        },
        rh: function () {
          return fr;
        },
        sh: function () {
          return ar;
        },
        $s: function () {
          return Mr;
        },
        uh: function () {
          return kr;
        },
        ah: function () {
          return Wi;
        },
        fh: function () {
          return ir;
        },
        lh: function () {
          return Hr;
        },
        hh: function () {
          return Ni;
        },
        dh: function () {
          return eo;
        },
        mh: function () {
          return co;
        }
      });
      var r = o(7251);
      var c = o.n(r);
      var s = o(1917);
      var u = o.n(s);
      var a = o(3255);
      var f = o.n(a);
      var l = o(5397);
      var h = o.n(l);
      var d = o(3555);
      var m = o.n(d);
      var g = o(48);
      var v = o.n(g);
      let w = new Map();
      let b = [];
      let y = [];
      function z() {
        w = new Map();
        b = [];
        let n = b;
        for (let t in u()) {
          n[u()[t]] = [];
        }
        let t = y;
        for (let n in u()) {
          t[u()[n]] = [];
        }
      }
      function _(n, e, o) {
        const r = (n.gh | n.wh << 8) * e;
        const c = n.bh | n.yh << 8;
        n.zh += Math.cos(n._h) * r;
        n.Mh += Math.sin(n._h) * r;
        n.range += r;
        if (n.range >= c) {
          n.range -= c;
          n.zh -= n.range * Math.cos(n._h);
          n.Mh -= n.range * Math.sin(n._h);
          n.active = false;
        }
      }
      function M(n, t, e) {
        n.Dh += t * 1000;
        const o = Math.min(1.71, n.Dh / 171);
        n.zh = n.Bh + (n.Lh - n.Bh) * o;
        n.Mh = n.Ch + (n.Ah - n.Ch) * o;
        if (n.tu !== po && e <= n.ph && e >= n.Th) {
          let t = n.ph - n.Th;
          let o = (e - n.Th) / t;
          n._h = m().xh(n.Hh, n.kh, o);
        }
      }
      function D(n, t) {
        let e = b[u().an];
        let o = e.length;
        const i = t - 1000 / c().Gh;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().zn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().qn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().Hn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().xn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().Un];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().En];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().Gn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().Tn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().Wn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          M(e[t], n, i);
        }
        e = b[u().bn];
        o = e.length;
        for (let t = 0; t < o; t++) {
          _(e[t], n);
        }
        e = b[u().Bn];
        o = e.length;
        for (let n = 0; n < o; n++) {
          (r = e[n])._h = r.kh;
        }
        var r;
      }
      function B(n) {
        if (y[n].length > 0) {
          let t = y[n].pop();
          t.ku = h().qc;
          return t;
        }
        return new (v())();
      }
      function L(n, t, e, o, i, r, c, s, u, a, f, l, d, m, g, v, b) {
        let y = w.get(t) || B(n);
        if (y.ku & h().qc) {
          p(y, n, t, e, o, i, r, c, s, u, a, f, l, d, m, g, v, b);
          C(y);
          return;
        }
        y.Eh = e;
        y.Bh = y.zh;
        y.Ch = y.Mh;
        y.Lh = i;
        y.Ah = r;
        y.ku = o;
        y.Hh = y.kh;
        y.kh = c;
        y.gh = s;
        y.wh = u;
        y.bh = a;
        y.yh = f;
        y.Uh = l;
        y.Yh = d;
        y.jh = m;
        y.Nh = g;
        y.Oh = v;
        y.Th = y.ph;
        y.ph = b;
        y.Dh = 0;
      }
      function C(n) {
        const e = b[n.type];
        const o = e.length;
        e[o] = n;
        n.Ph = o;
        if (!w.has(n.tu)) {
          w.set(n.tu, n);
        }
      }
      function A(n, t) {
        let e = w.get(n);
        if (!e) {
          return;
        }
        w.delete(n);
        const o = b[e.type];
        const i = e.Ph;
        const r = o.length - 1;
        if (r !== i) {
          const n = o[r];
          o[r] = o[i];
          o[i] = n;
          n.Ph = i;
        }
        y[e.type].push(e);
        o.pop();
      }
      function p(n, t, e, o, i, r, c, s, a, l, h, d, g, v, w, b, y, z) {
        n.type = t;
        n.tu = e;
        n.Eh = o;
        n.zh = n.Bh = n.Lh = r;
        n.Mh = n.Ch = n.Ah = c;
        n._h = n.Hh = n.kh = s;
        n.ku = i;
        n.gh = a;
        n.wh = l;
        n.bh = h;
        n.yh = d;
        n.Uh = g;
        n.Yh = v;
        n.jh = w;
        n.Nh = b;
        n.Oh = y;
        n.Sh = new (m().qh)(1, 0, 1, 0, 1, 1);
        n.Kh = Date.now();
        n.Th = 0;
        n.ph = z;
        n.Dh = 0;
        n.Jh = null;
        n.Ih = false;
        switch (t) {
          case u().an:
            break;
          case u().Bn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Ho, f().To]
            };
            break;
          case u().zn:
          case u().Hn:
          case u().xn:
          case u().Un:
          case u().Gn:
          case u().En:
          case u().Tn:
          case u().Wn:
            break;
          case u().fn:
          case u().Pn:
          case u().Sn:
          case u().jn:
          case u().Nn:
          case u().On:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Ho]
            };
            break;
          case u().hn:
          case u().dn:
          case u().Jn:
          case u().Ln:
          case u().Cn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().xo]
            };
            break;
          case u().An:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Ho]
            };
            break;
          case u().wn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().To]
            };
            break;
          case u().tn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().tn]
            };
            break;
          case u().Zn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Zn]
            };
            break;
          case u().yn:
            n.Wh = Math.PI / 4;
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().tn, f().To]
            };
            break;
          case u().In:
            n.Wh = Math.PI / 4;
            break;
          case u().Mn:
            n.Wh = Math.PI / 2;
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().tn, f().To]
            };
            break;
          case u().W:
          case u().gn:
          case u().Kn:
          case u().Yn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().To]
            };
            break;
          case u().pn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Ho]
            };
            break;
          case u()._n:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().To]
            };
            break;
          case u().V:
          case u().$:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Ho]
            };
            break;
          case u().vn:
          case u().kn:
          case u().mn:
          case u().ln:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().To]
            };
            break;
          case u().Vn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().Xh]
            };
            break;
          case u().Dn:
            n.Jh = {
              active: false,
              Zh: 0,
              Vh: [f().To]
            };
            break;
          case u().bn:
            n.active = true;
            n.range = 0;
        }
      }
      z();
      let T = false;
      try {
        T = window.localStorage && true;
      } catch (n) {}
      if (!T) {
        Object.defineProperty(window, "localStorage", {
          value: {
            Fh: {},
            setItem: function (n, t) {
              return this.Fh[n] = t + "";
            },
            getItem: function (n) {
              if (this.Fh.hasOwnProperty(n)) {
                return this.Fh[n];
              } else {
                return undefined;
              }
            },
            removeItem: function (n) {
              return delete this.Fh[n];
            },
            clear: function () {
              return this.Fh = {};
            }
          }
        });
      }
      let x = function n(e, o, i) {
        function r(n) {
          D = n;
          B = true;
          return function () {
            while (B) {
              var n = u();
              w[n]();
            }
            return M[0];
          }();
        }
        function c() {
          return e[D++] | e[D++] << 8 | e[D++] << 16 | e[D++] << 24;
        }
        function s() {
          let n = e[D++];
          if (n & 128) {
            return n & 127;
          } else {
            return n & 127 | e[D++] << 7;
          }
        }
        function u() {
          return e[D++];
        }
        function a(n, t) {
          M[n] = t;
        }
        function f(n) {
          var t;
          var e;
          var o;
          t = [];
          e = 0;
          for (; e < n; e++) {
            o = _[i[6]]();
            t[n - e - 1] = o;
          }
          return t;
        }
        const l = [];
        let h = 0;
        if (i) {
          for (let n = 0; n < 5; n++) {
            i.push(i.shift());
          }
        }
        var d = e ? n : function () {};
        var m = function (n) {
          return typeof n == "object";
        };
        var g = m(globalThis) ? globalThis : m(window) ? window : self;
        var v = [];
        var w = [function () {
          a(u(), function (n) {
            var t = z;
            let e = function () {
              var e;
              var c;
              var s;
              var u;
              var f;
              var l;
              var h;
              var d;
              var m;
              var g;
              var v;
              var w;
              var b;
              var y;
              var C = M;
              M = [];
              a(0, undefined);
              a(1, arguments);
              e = o[n];
              c = z;
              s = e[2];
              u = e[3];
              z = [];
              f = 0;
              for (; f < s; f++) {
                z[f] = {
                  Qh: undefined
                };
              }
              for (l = 0; l < u[i[0]]; l += 2) {
                h = u[l + 0];
                d = u[l + 1];
                z[h] = t[d];
              }
              m = _;
              _ = [];
              g = L;
              L = this;
              b = D;
              y = e[4];
              try {
                v = r(y);
              } catch (n) {
                w = n;
              }
              _ = m;
              L = g;
              D = b;
              z = c;
              M = C;
              B = true;
              if (w) {
                throw w;
              }
              return v;
            };
            l[h++] = e;
            return e;
          }(e[D++] | e[D++] << 8));
        }, function () {
          var n = c();
          var t = u();
          z[n].Qh = M[t];
        }, function () {
          var n = u();
          var t = s();
          a(n, v[t]);
        }, function () {
          var n = u();
          _.push(M[n]);
        }, function () {
          a(u(), u());
        }, function () {
          a(u(), f(s()));
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          var o = f(u());
          a(n, (t = M[t])[M[e]][i[10]](t, o));
        }, function () {
          var n = u();
          var t = v[c()];
          (function (n) {
            if (!(n in g)) {
              throw new ReferenceError(n + " is not defined");
            }
          })(t);
          a(n, g[t]);
        }, function () {
          a(u(), c());
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] * M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] + M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = f(u());
          a(n, M[t][i[10]](g, e));
        }, function () {
          var n = u();
          var t = c();
          a(n, z[t].Qh);
        }, function () {
          var n = u();
          for (var t = f(s()), e = {}, o = 0; o < t[i[0]]; o += 3) {
            switch (t[o + 0]) {
              case 0:
                e[t[o + 1]] = t[o + 2];
                break;
              case 1:
                Object[i[13]](e, t[o + 1], {
                  get: t[o + 2]
                });
                break;
              case 2:
                Object[i[13]](e, t[o + 1], {
                  set: t[o + 2]
                });
            }
          }
          a(n, e);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t][M[e]]);
        }, function () {
          a(u(), !M[u()]);
        }, function () {
          var n = u();
          var t = u();
          a(n, M[t]);
        }, function () {
          var n = c();
          var t = u();
          if (!M[t]) {
            D = n;
          }
        }, function () {
          var n = u();
          var t = c();
          let e = c();
          a(n, RegExp(v[t], v[e]));
        }, function () {
          a(u(), typeof M[u()]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] !== M[e]);
        }, function () {
          var n = c();
          D = n;
        }, function () {
          var n = u();
          var t = M[u()];
          var e = M[u()];
          var o = M[u()];
          a(n, t[e] = o);
        }, function () {
          B = false;
        }, function () {
          a(u(), !!u());
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] < M[e]);
        }, function () {
          var n = u();
          var t = c();
          a(n, u() ? ++z[t].Qh : z[t].Qh++);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] ^ M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] >>> M[e]);
        }, function () {
          a(u(), (y[0] = e[D++], y[1] = e[D++], y[2] = e[D++], y[3] = e[D++], y[4] = e[D++], y[5] = e[D++], y[6] = e[D++], y[7] = e[D++], b[0]));
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] & M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] > M[e]);
        }, function () {
          var e;
          var o;
          var r;
          a(u(), (e = M[u()], o = f(u()), r = [null], Array[i[11]].push[i[10]](r, o), new (Function[i[11]].bind[i[10]](e, r))()));
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] % M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] << M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] - M[e]);
        }, function () {
          var n = u();
          var t = u();
          var e = u();
          a(n, M[t] === M[e]);
        }, function () {
          for (var e = u() | u() << 8, o = "", i = 0; i < e; i++) {
            o += String.fromCharCode(u());
          }
          v.push(o);
        }, function () {
          D = 0;
        }];
        var b = new Float64Array(1);
        var y = new Uint8Array(b[i[5]]);
        var z = [];
        var _ = [];
        var M = [];
        var D = 0;
        var B = false;
        var L = null;
        (function () {
          e = function (n, t) {
            var e;
            var o;
            var r;
            var c;
            var s;
            var u;
            var a;
            var f;
            var l;
            var h;
            var m;
            var g;
            var v;
            var w;
            o = 0;
            r = (e = d) ? "" + e : "";
            c = 0;
            for (; c < r[i[0]]; c++) {
              o = Math[i[2]](31, o) + r[i[1]](c) | 0;
            }
            o = 1922100408;
            h = (l = (f = n[i[3]](/[^A-Za-z0-9+/]/g, ""))[i[0]]) * 3 + 1 >> 2;
            m = new Uint8Array(h);
            g = 0;
            v = 0;
            w = 0;
            for (; w < l; w++) {
              u = w & 3;
              g |= ((a = f[i[1]](w)) > 64 && a < 91 ? a - 65 : a > 96 && a < 123 ? a - 71 : a > 47 && a < 58 ? a + 4 : a === 43 ? 62 : a === 47 ? 63 : 0) << (3 - u) * 6;
              if (u === 3 || l - w == 1) {
                for (s = 0; s < 3 && v < h; s++, v++) {
                  o = (o + 1) % 255;
                  m[v] = g >>> (16 >>> s & 24) & 255 ^ o;
                }
                g = 0;
              }
            }
            return m;
          }(e);
          z = [];
          for (var n = 0; n < o[0][2]; n++) {
            z[n] = {
              Qh: undefined
            };
          }
          _ = [];
          M = [];
          D = o[0][4];
          B = false;
          L = null;
          r(o[0][4]);
        })();
        return l;
      }("qaiqrKyur7CxsLO2t7a2ubm6u769vLzAwMDDxMXExcpJycnMz8rP09PW0b3W1NPat9nZ2N+43OLl4Izn5+Llxero7+6d7e3085Pw9vH0mfv7/vmZ/vwEA24ABgEEKgsLDglkDgwLEn4RERAXehQaHRh/Hx8aHUUiICcmVyUlLSu7KS+sKCsyMjMxN7cwNTw6Ozo/PT4/QkZAQERFRkdLTEpIT0VNF0tRUlRQUVZXWFtf3lpbWlpgaWc7f2Vmbmxvb2FpbmpsdXp3cXZ3c/d7fHp+en19eoSE5oCBgYPui4yOjv+Oi4uV5ZGWkZASlZoYnJ+Zn5+doiOkpqCnp6asqaqrqaqrq7CxsrCxubOzuLm6uLm5u7/DxMDGQsbDx83OysjJwMtM09TV1tPV1tfa21Ld2Njc3OLlYuDg5eLv6Oru7+iB7ev09Z3w8PHylPv9/v+d/voEBW4AAAECVAsNDg94DgoLFH4RFxARZBQcHR56HxkaG0ciJicgQCUjLS2mKS6sKCo0MzMxNrcwMz07Ozo5PT4/RENGw0dBRkNBSUlPSEkZTFRVVjZXUVJTOlpeX1gOXVtkZQ1gYGFiBGttbm8HbmprdBRxd3BxAnR8fH7yfn//eYWFgIKGhwSBjIyIio2Ljo+QlZCXHZeUHZKcnpmdmp6foKSlpq+lpqekq62rrK2gq7WzvbGwpbK1qZW4u7y5ub3MwcLDyMDAx8jJxMjOyMHK097R1sTR1cfb3cuV3t3e3Ofl7uPk5eri7enq6+Lv6ur/9PD89vDm9Prp+Pjtf/wAAQAEBwkGBwgLD4YCCQ0KEhScHRcRExQbCxkUHB0eHyAhIiEhtSAjKywrOy4pPisyIJcxNDUyMDo1Ojs8PzuuTkJARldARUVL215JSU5eS1JQWlNUVVJbXFlaW1xWXFtgYGtjZGVka2phamtsYmptYHN2YqZ3dnd6bKF5fH1ye4mBgoOUh4KGgomKi46PjA+RmpKTlJeSlYiYlpucnZyToqCio6SpoquoqaqoqKaqrbGwv7O0tbKwvLW6u7y/vCzAwsjD0sDCxcvFz8HMzc7A09TDvtDV1tTa2k7Y39rdyuDh4uHhc+Dl6+zr5Onv/5vz8fL29vBi9P31//r8/f4MAw4DBAUFBQMLDwoPDwkNBRESExYQgREbGx8ZCdcdHyAjIbcnJiEkPSkqKy4ouCkyMjcyNjCuOTs7Pzc5MT4/QFVAQEFUjERISUhJTtlNTVxTU1NUVVpSVFlaW19YVVpiYGFmY2BzZ2hpaGn7a21qcnNnuXd1dnV77Xl4e35rf4CBgIESg4OEioiLhYyNjoqXlIuTlJWSlZiamJmeB52drKOso6SlpaWsq6qorq+sNLOzvrG2tba3tLq0u7y9vbzLwsDCx8bCxMjKycnPUc3M3NLf09TV1dTc2trY39/dQuPi7uDm5ebn5Ovn6+zt7e378/Hy9/f79XT6+Pz+4/4AAQAAmwMCBQsICQ8HCQsOERoSExQRA3ocGRoWGJ0fECAhIicoISknKCktLigtLi8yMrc1NjA1Nzw6OjE5Pz0/Q0pCVUZBQ0RPS0ZLTE1MTPBRV19UQ1JVW1xeX1xcTl9gYWZnYGVndmhpam9oaW5uYnFyc3Bxcnd5anp7fHl6e4CAloOEhYKDjImLnoyNjouUlZKSgpWWl5ydnpudip6foKWmp6Wkvqeoqa6nqKKur7C2t7e0tba1uzy8ubm+vrvDw8jGxsbGxMXJ3MnIyM3N0lHR0dTX2Nfb297Zmd7c2+KT4eHg55Tk6u3ohO/v6u2C8vD29nD09Hn///n//PwDgwQBAQYHBhEJCgsODwyPExMSERsVFRUcG2kYHhkcayMjJiFFJiQjKkopKSgvRSwyNDC2Nja3MT07OTo+Prw5QkRBQkVfRkdIS0hJzE5MT1JBUlBWUVQ+W1teWTJeXFtiAmFhYGcKZGptaB5vb2ptFHJwd3YQdXV8ewl4fnh894KCA4WBh4WGiooIjY6IjY6RipKTlJeUlRiamJuejJ6coqWg1qenoqXbqqivrsitrbSzwLC2sbTEu7u+ud++vLvCs8HBwMevxMrNyLvPz8rNpNLQ1tZf1NRZ39/Z39zc3GLn4Obn5Of76Onq6eDv4e/w8fXw8PX29/r8f/34/vsABQcHDgYCAggMGAsaCQwMFR0WHBQVFhAdHRobHB8dmiYjJyAkISUhIiwoKCwuPS8mMzY2Nzk0ODg5Ojw/OT4/QENHxkJBRUJITU9DRk5KSlBURlNCUVRUXVte219ZXlt1YWFnYGEgZGxtbh5vaWprHnJ2d3AWdXN8fQ54eHl6FoOFhofrhoKDjOeJj4mJBo2VEJSQkJCXlZ0bnJ+fmJ+evaGio6Cnoierraqvuq2tq7S1wrCwsbLFu72+v9O+urvEtcHHwMGpxMzNzr/PycrLqdLW19Cl1dPc3b/Y2NjaVuLkY+Xn4ePm6uxo7eju6+7x7/Lz9PH083j6/vv46v4DBQYHcAYCAwxmCQ8ICV0MFBUWZxcREhNqGh4fGHQdGyQlTCAgISJAKy0vL6QvK642MjY2NTcztT49OT49PCE/QEFGT0BKRkdITk9PTE1OTVPUVFFRVlZTW1NQXl5eXlx4YXRhYGBlcHBrampsbW5vcnZwUnR1dnV723R+fn58fCOPgIaHhIeHiImIjI6sjo+Qk5ExmpCUlJqaOZuehJ6JpKShoaOhgqeoqaipDqOtq7KzsBa6sbW1ursfvb+5vL/HwuPDxMXExWrHzsjOz8xs3NLT09TVwNLc29nX2d3e3+Dx4ubz8uLi6Ofp6uns7u/w8fHx93X39vj5+vj+/lgBAwIDBAYKBAoJCgsOCJYBEhIXEhcVFhcaHRgbHRkeHyAjLiEgJSYnJCwqKywtNywyNCPpPDU2ND86Pjs8PTw6xUdAQEFFSkJLSUpLRU5MSlNSVVBQVVZXWlz9XV5eW15jY25hZmVmZ2pswm1vb2tufHRzc3R1fHV9ent6fH1+fZqDhoOEhYaS+IGKi4CPj4+QkYKTloKBk5qZlJidn5+foKGioKCmpqapqaqrr6WtQA4cbL+2tLa3uKK/uL68vL/AwcfLwZIIAYnFyMrMzc7U09TQ0tfV1tfb3dnb3dne3+Di7uDg5ebn5Ovq6+zt7Opo//bx8ezz9PzoK/L8/fsMBAYDBAUFAgQMCgsMDQwLuRcRFhAUFxIYGRoYEB4cHyAhLichJSYnMywpLy8oJiqBSAWtNzAxMjw5Ojs+OZQ5Q0RGQUVHRkdISkZIT01OT1xVV1NUVU1SW11ZXlRYyztVPmFmY2BiZ2hpaG/Ga21qdHNzcHR1dnRien57fH1+arCIgoOIhoSHiImGj46Njo+UlIKPlpGTjJ2amJiZlZv0akonoKGio6OoqaqprgeorLWzsL+2tra3uLW/uLy9vrvEzN7FwcHdw8rPyc/EyfthYhPR19PR0tfY2djddtvc2+bj+eXn5+fl6Onq7eDr7e/w8f7x9/X29/z66uf4//0bAgQHBwYOBGPD4Y4PDgkMFBESExYRvBEeGh4ZEBkcHyAhLiAmJSYnLCsnNykuLDQyNTcwNj00ApaL+Dg+Ojw7QEFCQUHvQENKTEhQSUtKTlNRUlNRSFNXWFlaW1ytH1dknp18ZGlgZGhpanVuaWhmdnRwf3Z3dnd4fX97YHl8eoqEhIeUhYOQn42Pi4KJj4qRkZKTlJGakpiZmpufmJmagaGio6ahDaGurK6qvK2ouKe9tLe0tba0vr68qry9vr3EbcTGwsHHxcxRxM3JycrL0M7X1dDU1tfY2d/X2d3e3+Dw2ujk5ePyz+Lq6/vp6u/+9/P39fX29/j/9v/8/f4AAgYEACQGBwgLDKAKDwoJEQESEQMCDhUZCHUQHB0cCkEqIiMzISAnJi0rLS0tLi8wNT41NDU2Nzs/PT0dPT4/QkXpRUdDQkZYSUlcW0lNT15VU1BVVVZXWF1WWFxdXl9jYmVgRWVmZ2ptwW1qbmpuYHF0ZGN5cHp4eXprfHtpaISHgo2AhICGiImKi4iJiI6elZOVlZSWl5idnp2ek5qepqCgo6SloqOuqqSvrauvrLCxsrews7O2ubm6u7q5uLbBw8LDxMPCwTbIycvMzcjD1sLS09TEgNvY2dzc2tne3+Dj5mbi5uDj6O3uFOXr7evz9/X18PX29/r9Xf3/+/oBAAMDBAUFEl4FCgsADg4PEBEREBMWGhcYGRgfsRsYHCQgIyckJSYhJC8uKywtLCuoPzE1MDQzNzg5OTw/Ez4/QE1GRkRFRkRMaU5ITUxIT1BRVldQVVdQWFlaX1BZWV9gYW5gYWVmZ3Fvbmh9gmJvcHd+dXJ1dnd0en17fH1ye4eBgoOHgYqDjImKi46KJ4mYlZWSgpKQlJCDnZycnZ6ftQeuo6SpoaGoqaqppDWgrLe5s7u0tba0vLq6uru9vr/DzcHExMXGy8DBysvM1MnM2MCq3tTV0dvf39rb3NHW2ODh4u/n4+bn6OXs7Ozt7uH08vT/8vT29/ji+f/66/gHCQEPAgQGBwgFCQkMDQ4FGBcRHxcWFhcYOBwTHxwfHyAhJDkiIiYnKCk/ICEtLiM2NzIzNCU2MS8uPj08Mz0+RkBCQ0RFRUNOSUtKTE1OSVRXUlJWVVZXXlVcWVxdXlNjYWJjZGdu/2ZuaWN1ZWhoYVV8c3R9en96eXp7f3Vyd4CBgoOGgi+BjoGNio2Ojo+Ql56VlZWWl5yen7mUm5mTp6Cio6SGoK+vpa2orK2upbi3tbK1tba3sLWyury9vrPHwMLDxNvAz8/Iy8vMzcjV1tPS09TVw3XV2drX2tPe3+Dwj+3k5eDr7ujq6+zq6evw8fLx/HDw9P/x+vP07dkAAQsEBw0FAA8ODgsMDQwHtxcRFBwUHB8eGhsaHB0eFzVMLCMkKS4oKCkqKS+CJCk4Mj4wNTU2NzIxPDgsPTYoV0VKQ0pGR09JSUpLTE5KR1FfUVJcVFdXWFlZX1RfUFxhaWNhZGVmZGxhaWVvbGZuc3Fyc3d5fnl4eXpqs3N+f4iWl0yKhYaLgImKi4yMmo+QkZqfnJSWl5iYj5ucnZaTqKOio6SksKeoqaKnpK6ur7CwpbO0tb6gvLG6tb+8tr7AwcLDx8nOx8jJysjEysbu0NHS0dd+0NHQ2tvL3NvJyOTn4u3n5ODm6Onq6+/h6O/w8fLw8vLw1vj5+vn/VvgIBwECFAUOEB8NAgsCDg8HERESExQWGh8YGRobHxUZFwEhIiMmJo0hLiEpKjwtKDgnNTQzOjY3MTk5Ojs8PjI5QEFCQ0dDQUFpSUpLTk7lSVhXUVJEVV5AT11SW1JeX1dhYWJjZGZqb3Rpamtobm9ldnlxcmh1dnd+dXxnfH1+e4Oho4uChoKEiK2Mg4+cu5+QkZSfkrWWl5ianJyakZ6foK2hvqSlpqmgr6mLr6Wuo7ivsrO0u7C0sLWypLy9vrnDx8rCxcTGx8jKxsjNzc7PweHC09TWztTZyPHL3N3dyv3x4uPx1fbn6Pzf++zt4ufw8fLz9vNu+f/x/Pr+/f4ABgYEBAQFBwgJDQcLDg4PEB0UERQVFg4QHhwKzg0eHygtKiMkJSYrLioqKywhKS8wMTI/MDY2Nzg3Mzw4MTorQEFCWENMQlFMQUxMQElZT1BRXlRAVVZXUV9eXFBaSF9gYWhnYmJqYH1pamtma2pofHZkc3R1V3N+fntvfH1+e5qFgYOEhYaS2ZmKi5uBioWQkZKCcYWWl5yOj36MnZ6bpKKjt6SlpqOsrb+qua2ur7S1tki1o7a3uL2+v7+8qb/AwcbUwMHGyc/IzsrMzc7P19XW0trS19PZ2Nrb3NrS2+Hh4uPm4n7p7u3t6u7t7u/29fTz9fb29/j/9v3//f4ADQUBBAUGHgwPDRrNHA4PFB0WExQVFhsfGhobHBEYHiAhIi8sJiYnKCcjLSQhJjcwMTIoMjw+ITA9PT0wNSU/QEFORVxFRkdBTkJNQEtUT1BRWFtTU1pRQVlaW1ZaVllsZ3hjZGVHb29va3NsbW5nanlxc3R1dmI4aHp7a3l2f46Hg4uFhYaHiI+Gg4yNjo+TmZWbtZWWl5qfMZ2blZiesKGltLOhoaemr6usra2ur7C3vrS0tba3u769vJ29vr/Cx2nFzMLAxtjJwtzbycbP3tfT29XV1tfY39bT3N3e3+Pp5evF5ebn6u9B7evl6O7g8fXk4/Hx9/b/+/z9/f4AAQQHAwQIAQkOCwoMDQ4JHBYSExQVFRAUHhobHB0dGCcmLiMkJSohCCkqKyIlKSk8NxMzNDU4MDA/Nj0ePT4/TklFRUZD9kFPQUxJTU9OT1BWXlRRVVZXVF9YW1xdXVlrZ2ViaGJnZ2hpfmNqan+kYnFye2x9d2a+a3p7dGjGbYCBl0iWhYaLj4uKi4yPiBeelZWVhJWSgI+dnpuSm5+boaGio6SjqqOoqaqrrqsLi7e1tLK1tba3v6m6vKuqm7/A5MHDqaS24szJoKSlo+vF0KK3p4C8u7K3rK7+2N2TvpSJx+Xkl4eJjIaHzu/tiYqE1PTzu5eckpuN3/X8mZtmaGxmVHdpd217fnIpDg54dXM3FRRxZH5ufGg+FR1wflZIRUJQSlQCLildQkJJQVgVOTJfW1ZXQ1FWVB40PVZQMzUsIikgY1FIYWInIy4vIzg+ISd9KX4kKDU1NCx0d3pkYRYGFxFDb2gNBQgZAAsBBFR7cwEbEhIeEBQeGFh2f+fk9s7h6NLorY+K1O3px+vjtJ6T+Pr19vTK7vTu/Pn6haaixMHR79PNxI+srN7L2/nF196Rs7bb3dfdz9SYur+ita2i4cDGsamlv67pzs68ubb31dSjt7utvOj+2N2ttofTx+fkr7Wopszj65+ZnIaelpuVjdDz94uWlo2Z2PgAUnZxbWthIgEJenljeWF7aWF3NhMVZHJodXt4eTgWH2ZUTEBQTElJDSEqX0N+Wl1ZX1UWCjV3dXt9f317dXd1Cw0PDQsVFxUbHR8dGxUXFTEzMTcxMzE/MTMxNzEzMS8RExEXERMRHxETWlpeXlpaRkZKSlFwdhEUFhUJWXt+HOjg8MLwoIyH6+Hr+c/i6urR5beXlPz74vS8lpv67/Hy48nD0efKwsKNv6rMydnrw9Xc193AxvTO+9XbyM/z39Kl5MbDpbGppe3Dyp6lo7r3kaOgsq3w19fi/N7bv7yys8Y=", [[0, -1, 32, [], 4866], [1, 0, 34, [2, 0, 3, 1, 4, 2, 5, 3, 6, 4, 7, 5, 8, 6, 9, 7, 10, 8, 11, 9, 12, 10, 13, 11, 14, 12, 15, 13, 16, 14, 17, 15, 18, 16, 19, 17, 20, 18, 21, 19, 22, 20, 23, 21, 24, 22, 25, 23, 26, 24, 27, 25, 28, 26, 29, 27, 30, 28, 31, 29, 32, 30, 33, 31], 1975], [2, 0, 37, [5, 0, 6, 1, 7, 2, 8, 3, 9, 4, 10, 5, 11, 6, 12, 7, 13, 8, 14, 9, 15, 10, 16, 11, 17, 12, 18, 13, 19, 14, 20, 15, 21, 16, 22, 17, 23, 18, 24, 19, 25, 20, 26, 21, 27, 22, 28, 23, 29, 24, 30, 25, 31, 26, 32, 27, 33, 28, 34, 29, 35, 30, 36, 31], 2101], [3, 0, 38, [6, 0, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7, 14, 8, 15, 9, 16, 10, 17, 11, 18, 12, 19, 13, 20, 14, 21, 15, 22, 16, 23, 17, 24, 18, 25, 19, 26, 20, 27, 21, 28, 22, 29, 23, 30, 24, 31, 25, 32, 26, 33, 27, 34, 28, 35, 29, 36, 30, 37, 31], 2277], [4, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 2773], [5, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 2813], [6, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 2873], [7, 0, 32, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31], 2913], [8, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 2928], [9, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 2968], [10, 0, 32, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31], 3008], [11, 0, 40, [9, 0, 10, 1, 11, 2, 12, 3, 13, 4, 14, 5, 15, 6, 16, 7, 17, 8, 18, 9, 19, 10, 20, 11, 21, 13, 22, 14, 23, 15, 24, 16, 25, 17, 26, 18, 27, 19, 28, 20, 29, 21, 30, 22, 31, 23, 32, 24, 33, 25, 34, 26, 35, 27, 36, 28, 37, 29, 38, 30, 39, 31], 3019], [12, 0, 36, [4, 0, 5, 1, 6, 2, 7, 3, 8, 4, 9, 5, 10, 6, 11, 7, 12, 8, 13, 9, 14, 10, 15, 11, 16, 12, 17, 13, 18, 14, 19, 15, 20, 16, 21, 17, 22, 18, 23, 19, 24, 20, 25, 21, 26, 22, 27, 23, 28, 24, 29, 25, 30, 26, 31, 27, 32, 28, 33, 29, 34, 30, 35, 31], 3459], [13, 0, 36, [4, 0, 5, 1, 6, 2, 7, 3, 8, 4, 9, 5, 10, 6, 11, 7, 12, 8, 13, 9, 14, 10, 15, 11, 16, 12, 17, 13, 18, 14, 19, 15, 20, 16, 21, 17, 22, 18, 23, 19, 24, 20, 25, 21, 26, 22, 27, 23, 28, 24, 29, 25, 30, 26, 31, 27, 32, 28, 33, 29, 34, 30, 35, 31], 3721], [14, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 3840], [15, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 3880], [16, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 3920], [17, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 3960], [18, 0, 36, [4, 0, 5, 1, 6, 2, 7, 3, 8, 4, 9, 5, 10, 6, 11, 7, 12, 8, 13, 9, 14, 10, 15, 11, 16, 12, 17, 13, 18, 14, 19, 15, 20, 16, 21, 17, 22, 18, 23, 19, 24, 20, 25, 21, 26, 22, 27, 23, 28, 24, 29, 25, 30, 26, 31, 27, 32, 28, 33, 29, 34, 30, 35, 31], 4000], [19, 0, 32, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31], 4307], [20, 0, 36, [4, 0, 5, 1, 6, 2, 7, 3, 8, 4, 9, 5, 10, 6, 11, 7, 12, 8, 13, 9, 14, 10, 15, 11, 16, 12, 17, 13, 18, 14, 19, 15, 20, 16, 21, 17, 22, 18, 23, 19, 24, 20, 25, 21, 26, 22, 27, 23, 28, 24, 29, 25, 30, 26, 31, 27, 32, 28, 33, 29, 34, 30, 35, 31], 4362], [21, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 4546], [22, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 4586], [23, 0, 33, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31], 4626], [24, 0, 35, [3, 0, 4, 1, 5, 2, 6, 3, 7, 4, 8, 5, 9, 6, 10, 7, 11, 8, 12, 9, 13, 10, 14, 11, 15, 12, 16, 13, 17, 14, 18, 15, 19, 16, 20, 17, 21, 18, 22, 19, 23, 20, 24, 21, 25, 22, 26, 23, 27, 24, 28, 25, 29, 26, 30, 27, 31, 28, 32, 29, 33, 30, 34, 31], 4666], [25, 1, 35, [1, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 28, 27, 29, 28, 30, 29, 31, 30, 32, 31, 33, 32, 34, 33], 4829]], ["constructor", "apply", "prototype", "iterator", "defineProperty", "length", "charCodeAt", "imul", "replace", "abs", "buffer", "pop", "toString", "search"]);
      (function () {
        var n;
        var e;
        var i;
        var r;
        var c;
        var s;
        var u;
        var a;
        var f;
        var l;
        var h;
        var d;
        let m = (...n) => new Uint8Array(...n);
        let g = (...n) => new Uint16Array(...n);
        function v() {
          this.Qh = g(16);
          this.Rh = g(288);
        }
        function w(n, t) {
          this.$h = n;
          this.nd = 0;
          this.td = 0;
          this.ed = 0;
          this.od = t;
          this.rd = 0;
          this.sd = new v();
          this.ud = new v();
        }
        function b(n, t, e, o) {
          var i;
          var r;
          for (i = 0; e > i; ++i) {
            n[i] = 0;
          }
          for (i = 0; 30 - e > i; ++i) {
            n[i + e] = i / e | 0;
          }
          r = o;
          i = 0;
          for (; i < 30; ++i) {
            t[i] = r;
            r += 1 << n[i];
          }
        }
        function y(n, t, e, o) {
          var i;
          var r;
          for (i = 0; i < 16; ++i) {
            n.Qh[i] = 0;
          }
          for (i = 0; o > i; ++i) {
            n.Qh[t[e + i]]++;
          }
          n.Qh[0] = 0;
          r = 0;
          i = 0;
          for (; i < 16; ++i) {
            d[i] = r;
            r += n.Qh[i];
          }
          for (i = 0; o > i; ++i) {
            if (t[e + i]) {
              n.Rh[d[t[e + i]]++] = i;
            }
          }
        }
        function z(n) {
          if (!n.ed--) {
            n.td = n.$h[n.nd++];
            n.ed = 7;
          }
          var t = n.td & 1;
          n.td >>>= 1;
          return t;
        }
        function _(n, t, e) {
          if (!t) {
            return e;
          }
          while (n.ed < 24) {
            n.td |= n.$h[n.nd++] << n.ed;
            n.ed += 8;
          }
          var o = n.td & 65535 >>> 16 - t;
          n.td >>>= t;
          n.ed -= t;
          return o + e;
        }
        function M(n, t) {
          var e;
          var o;
          var i;
          var r;
          while (n.ed < 24) {
            n.td |= n.$h[n.nd++] << n.ed;
            n.ed += 8;
          }
          e = 0;
          o = 0;
          i = 0;
          r = n.td;
          do {
            o = o * 2 + (r & 1);
            r >>>= 1;
            ++i;
            e += t.Qh[i];
            o -= t.Qh[i];
          } while (o >= 0);
          n.td = r;
          n.ed -= i;
          return t.Rh[e + o];
        }
        function D(n, t, e) {
          var o;
          var i;
          var r;
          var c;
          var s;
          var u;
          var a = _(n, 5, 257);
          var d = _(n, 5, 1);
          var m = _(n, 4, 4);
          for (o = 0; o < 19; ++o) {
            h[o] = 0;
          }
          for (o = 0; m > o; ++o) {
            c = _(n, 3, 0);
            h[f[o]] = c;
          }
          y(l, h, 0, 19);
          i = 0;
          while (a + d > i) {
            switch (s = M(n, l)) {
              case 16:
                u = h[i - 1];
                r = _(n, 2, 3);
                for (; r; --r) {
                  h[i++] = u;
                }
                break;
              case 17:
                for (r = _(n, 3, 3); r; --r) {
                  h[i++] = 0;
                }
                break;
              case 18:
                for (r = _(n, 7, 11); r; --r) {
                  h[i++] = 0;
                }
                break;
              default:
                h[i++] = s;
            }
          }
          y(t, h, 0, a);
          y(e, h, a, d);
        }
        function B(t, e, o) {
          var i;
          var r;
          var f;
          var l;
          var h;
          while (true) {
            if ((i = M(t, e)) === 256) {
              return n;
            }
            if (i < 256) {
              t.od[t.rd++] = i;
            } else {
              r = _(t, c[i -= 257], s[i]);
              f = M(t, o);
              h = l = t.rd - _(t, u[f], a[f]);
              for (; l + r > h; ++h) {
                t.od[t.rd++] = t.od[h];
              }
            }
          }
        }
        function L(t) {
          var o;
          var i;
          while (t.ed > 8) {
            t.nd--;
            t.ed -= 8;
          }
          if ((o = (o = t.$h[t.nd + 1]) * 256 + t.$h[t.nd]) !== (~(t.$h[t.nd + 3] * 256 + t.$h[t.nd + 2]) & 65535)) {
            return e;
          }
          t.nd += 4;
          i = o;
          for (; i; --i) {
            t.od[t.rd++] = t.$h[t.nd++];
          }
          t.ed = 0;
          return n;
        }
        function C(o, c) {
          var u;
          var a;
          var f = new w(o, c);
          do {
            u = z(f);
            switch (_(f, 2, 0)) {
              case 0:
                a = L(f);
                break;
              case 1:
                a = B(f, i, r);
                break;
              case 2:
                D(f, f.sd, f.ud);
                a = B(f, f.sd, f.ud);
                break;
              default:
                a = e;
            }
            if (a !== n) {
              throw Error("Data error");
            }
          } while (!u);
          if (f.rd < f.od.length) {
            if (typeof f.od.slice == "function") {
              return f.od.slice(0, f.rd);
            } else {
              return f.od.subarray(0, f.rd);
            }
          } else {
            return f.od;
          }
        }
        function A(n, e = 0) {
          var i;
          var r;
          var c;
          var s;
          var u;
          var a;
          var f = n.replace(/[^A-Za-z0-9+/]/g, "");
          var l = f.length;
          var h = e ? Math.ceil((l * 3 + 1 >> 2) / e) * e : l * 3 + 1 >> 2;
          var d = m(h);
          c = 0;
          s = 0;
          u = 0;
          for (; l > u; u++) {
            r = u & 3;
            c |= ((a = f.charCodeAt(u)) > 64 && a < 91 ? a - 65 : a > 96 && a < 123 ? a - 71 : a > 47 && a < 58 ? a + 4 : a === 43 ? 62 : a === 47 ? 63 : 0) << (3 - r) * 6;
            if (r === 3 || l - u == 1) {
              for (i = 0; i < 3 && h > s; i++, s++) {
                d[s] = c >>> (16 >>> i & 24) & 255;
              }
              c = 0;
            }
          }
          return d;
        }
        n = 0;
        e = -3;
        i = new v();
        r = new v();
        c = m(30);
        s = g(30);
        u = m(30);
        a = g(30);
        f = m([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
        l = new v();
        h = m(320);
        d = g(16);
        ((n, t) => {
          var e;
          for (e = 0; e < 7; ++e) {
            n.Qh[e] = 0;
          }
          n.Qh[7] = 24;
          n.Qh[8] = 152;
          n.Qh[9] = 112;
          e = 0;
          for (; e < 24; ++e) {
            n.Rh[e] = 256 + e;
          }
          for (e = 0; e < 144; ++e) {
            n.Rh[24 + e] = e;
          }
          for (e = 0; e < 8; ++e) {
            n.Rh[168 + e] = 280 + e;
          }
          for (e = 0; e < 112; ++e) {
            n.Rh[176 + e] = 144 + e;
          }
          for (e = 0; e < 5; ++e) {
            t.Qh[e] = 0;
          }
          t.Qh[5] = 32;
          e = 0;
          for (; e < 32; ++e) {
            t.Rh[e] = e;
          }
        })(i, r);
        b(c, s, 4, 3);
        b(u, a, 2, 1);
        c[28] = 0;
        s[28] = 258;
        (function (n, e = {}) {
          let r = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : e;
          let c = r;
          let s = A("AecCAAA9UbGO00AQ3Tc73sRxQqQIVigFOglSnFJdHVnIB7dCCqAr7qTrUJT4EkuJjWIfJwp+hYoPoKKGloKKmh/gJ5hx7mjejt+bN2/W63s3dX5UN/ti2Xi7yj9447nJ68Z3t9Vy0RRV6Xmzz6+9uy3KVXXr6d0z311Vy5tdXjb+4Tpvzra51vXpx4vF+u1il3tXXO/bc5uX62bjh8uqbKTl5b2N6/eL0sdFWeb7VxdvXvvecrPYv6hWedZcGnMJmADzBKBAdmDBgSPHljM+gZCxMRgALlDnEeOXMeY5g/j4qRnxLuMRVwpbhUKhVmgUjhQWCqXC6j9333I+4BhWahODecDoBooDehlO5JtiRAfNHY4OzxidGSEKSBwIc2ZMwGNsYWQbiOTOxNhyf8iYGRCpxzEkqav+bkDfgTHGV7QN3cB91QPiQIOMNBrpNxHPDSaMGPEhvqf2njikL3EEmmsU8Zj+3sWjjUfL/dZ4Qqwex8SBHjjSOyU0IpnWJ1H7oibtZRhzIozpp9hGpKMS0drFpgywEHYqr4GZPJCzsEIgRMORM5nTd4oeW4ux3Yv/yhpw+kknwYhJNrKQaTqEQpS4SLqZozF/pnbx9IuekZlwZEmX/37YYir/k1JdKVXmigz66fCu6qU/cKg66Snay7qJoc7xPw==");
          let u = !!s[0];
          let a = u ? s[1] | s[2] << 8 | s[3] << 16 | s[4] << 24 : s.length;
          let f = u ? m(a) : m(s.buffer, 5, s.length - 5);
          if (u) {
            C(m(s.buffer, 5, s.length - 5), f);
          }
          let l = 0;
          let h = {};
          let d = [];
          let g = [];
          let v = [];
          let w = [];
          let b = 0;
          let y = null;
          let z = null;
          let _ = [];
          let M = null;
          e.ad = {};
          e.fd = o(4733);
          let D = new Float64Array(1);
          function B() {
            let n = 0;
            let t = 0;
            let e = 0;
            while (e = f[l++], n |= (e & 127) << t, (e & 128) != 0) {
              t += 7;
            }
            return n;
          }
          function L() {
            return f[l++] | f[l++] << 8 | f[l++] << 16 | f[l++] << 24;
          }
          function p() {
            let t = B();
            let e = "";
            for (let o = 0; t > o; o++) {
              e += String.fromCharCode(B());
            }
            return e;
          }
          function T(n, t) {
            let e = h;
            return function o() {
              let i = b;
              let r = {};
              b = n;
              let s = h;
              h = r;
              h[n] = {};
              let u = w[n];
              let a = u.length;
              for (let n = 0; a > n; n++) {
                let t = u[n];
                let o = e[t];
                r[t] = o;
              }
              let f = d;
              let m = l;
              let g = y;
              let v = z;
              let D = c;
              let B = _;
              let L = null;
              let C = null;
              d = [];
              _ = [];
              l = t;
              y = o;
              z = arguments;
              c = this;
              try {
                L = x();
              } catch (n) {
                if (_.length) {
                  let t = _.pop();
                  l = t;
                  M = n;
                  L = x();
                } else {
                  C = n;
                }
              }
              _ = B;
              l = m;
              d = f;
              y = g;
              h = s;
              b = i;
              z = v;
              c = D;
              if (C) {
                throw C;
              }
              return L;
            };
          }
          function x() {
            while (true) {
              let n = f[l++];
              switch (n) {
                case 35:
                  h[b][B()] = z;
                  break;
                case 18:
                  d[f[l++]] = B();
                  break;
                case 88:
                  d[f[l++]] = f[l++] ? ++h[B()][B()] : h[B()][B()]++;
                  break;
                case 37:
                  d[f[l++]] = d[f[l++]];
                  break;
                case 21:
                  d[f[l++]] = T(B(), L());
                  break;
                case 70:
                  d[f[l++]] = g[B()];
                  break;
                case 30:
                  d[f[l++]] = RegExp(g[B()], g[B()]);
                  break;
                case 69:
                  d[f[l++]] = d[f[l++]] != d[f[l++]];
                  break;
                case 24:
                case 3:
                  d[f[l++]] = d[f[l++]] == d[f[l++]];
                  break;
                case 75:
                  d[f[l++]] = d[f[l++]] < d[f[l++]];
                  break;
                case 65:
                  v.push(d[f[l++]]);
                  break;
                case 63:
                  d[f[l++]] = d[f[l++]][d[f[l++]]] = d[f[l++]];
                  break;
                case 6:
                  d[f[l++]] = d[f[l++]][d[f[l++]]];
                  break;
                case 49:
                  {
                    let n = B();
                    let t = Array(n);
                    for (let e = 0; n > e; e++) {
                      t[n - e - 1] = v.pop();
                    }
                    let e = f[l++];
                    let o = f[l++];
                    let i = f[l++];
                    let r = d[o];
                    let c = d[i];
                    d[e] = r[c].apply(r, t);
                    break;
                  }
                case 13:
                  {
                    let n = f[l++];
                    let t = !!f[l++];
                    let o = B();
                    let i = g[o];
                    if (i in e) {
                      d[n] = e[i];
                      break;
                    }
                    if (t && !(i in r)) {
                      throw new ReferenceError(i + " is not defined");
                    }
                    d[n] = r[i];
                    break;
                  }
                case 80:
                  {
                    let n = B();
                    let t = Array(n);
                    for (let e = 0; n > e; e++) {
                      t[n - e - 1] = v.pop();
                    }
                    d[f[l++]] = t;
                  }
                  break;
                case 59:
                  d[f[l++]] = h[B()][B()];
                  break;
                case 43:
                  d[f[l++]] = h[B()][B()] = d[f[l++]];
                  break;
                case 9:
                  h[B()][B()] = d[f[l++]];
                  break;
                case 26:
                  {
                    let n = f[l++];
                    let t = L();
                    if (!d[n]) {
                      l = t;
                    }
                    break;
                  }
                case 61:
                  {
                    let n = L();
                    l = n;
                    break;
                  }
                case 41:
                case 7:
                  return d[0];
                default:
                  throw "u" + n;
              }
            }
          }
          m(D.buffer);
          (() => {
            for (l = 0;;) {
              let n = f[l++];
              if (n === 22) {
                g.push(p());
              } else {
                if (n !== 85) {
                  l--;
                  return;
                }
                {
                  let n = B();
                  let t = B();
                  let e = [];
                  for (let n = 0; t > n; n++) {
                    e.push(B());
                  }
                  w[n] = e;
                }
              }
            }
          })();
          T(0, l).call(this);
        })(0, {});
      })();
      const H = x[13];
      const k = x[18];
      const G = x[19];
      const E = x[20];
      const U = x[24];
      var Y = o(5108);
      let j = {
        ld: {},
        hd: function (n, t, e) {
          return n + "-" + t + "x" + e;
        },
        dd: function (n, t, e) {
          t = Math.ceil(t);
          e = Math.ceil(e);
          let r = document.createElement("canvas");
          r.width = t;
          r.height = e;
          j.ld[this.hd(n, t, e)] = r;
          return r;
        },
        md: function (n, t, e) {
          return this.ld[this.hd(n, t, e)];
        },
        gd: function (n, t, e) {
          delete j.ld[this.hd(n, t, e)];
        },
        vd: {},
        wd: function (n, t = 256, e = 256, o = null) {
          t = Math.ceil(t);
          e = Math.ceil(e);
          let c = o ? n + ":" + o : n;
          let s = this.md(c, t, e);
          if (!s) {
            s = this.dd(c, t, e);
            let i = j.vd[n];
            if (i) {
              if (i.xs) {
                this.bd(i, s, o);
              } else {
                i.addEventListener("load", () => this.bd(i, s, o));
              }
            } else {
              let i = new Image();
              i.xs = false;
              i.src = Y.default.Ts(n);
              i.addEventListener("load", () => {
                this.bd(i, s, o);
                i.xs = true;
              });
              i.addEventListener("error", () => {
                delete j.vd[n];
                this.gd(n, t, e);
              });
              this.vd[n] = i;
            }
          }
          return s;
        },
        bd: function (n, t, e) {
          let r = t.getContext("2d");
          r.clearRect(0, 0, t.width, t.height);
          r.drawImage(n, 0, 0, t.width, t.height);
          if (e) {
            r.save();
            r.globalCompositeOperation = "source-atop";
            r.fillStyle = e;
            r.fillRect(0, 0, t.width, t.height);
            r.restore();
          }
        },
        yd: function (n) {
          return "/img/icon/" + n + ".png?v=1923912";
        },
        zd: function (n) {
          return "/img/ui/" + n + ".png?v=1923912";
        },
        _d: function (n) {
          return "/img/hats/" + n + ".png?v=1923912";
        },
        Md: function (n, t = false) {
          return "/img/entity/" + n + ".png?v=1923912";
        },
        Dd: function (n) {
          return "/img/items/" + n + ".png?v=1923912";
        },
        Bd: function (n) {
          return "/img/skins/" + n + ".png?v=1923912";
        },
        Ld: function (n) {
          return "/img/decorations/" + n + ".png?v=1923912";
        },
        Cd: function (n) {
          return m().Ad(n);
        }
      };
      var N = j;
      var O = o(6597);
      var P = o.n(O);
      var S = o(9847);
      var q = o.n(S);
      const K = [];
      function J(n, t, e, o, i, r, c, s, u, a, f, l) {
        this.pd = n;
        this.Td = t;
        this.xd = e;
        this.Hd = o;
        this.kd = i;
        this.Gd = r > 0 ? r : 0;
        this.Ed = c;
        this.Ud = s;
        this.Yd = u > 0 ? u : 0;
        this.jd = a;
        this.Nd = f;
        this.Od = l > 0 ? l : 0;
      }
      K[P().Ur] = [];
      for (let n = 0; n < 20; n++) {
        K[P().Ur][n] = N.Cd(N.Bd("game-rank" + n));
      }
      K[P().Go] = [];
      K[P().Eo] = [];
      K[P().Er] = [];
      K[P().Jr] = [];
      for (let n = 0; n < q().ru; n++) {
        K[P().Go][n] = N.Cd(N.Bd("body" + n));
        K[P().Eo][n] = N.Cd(N.Bd("arm" + n));
      }
      for (let n = 0; n < q().cu; n++) {
        K[P().Er][n] = N.Cd(N.Bd("accessory" + n));
      }
      for (let n = 0; n < q().su; n++) {
        K[P().Jr][n] = N.Cd(N.Bd("back" + n));
      }
      K[P().Uo] = N.wd(N.Md("skull"), 45, 45);
      K[P().fn] = N.Cd(N.Md("rock"));
      K[P().jn] = N.Cd(N.Md("cave_stone0"));
      K[P().Nn] = N.Cd(N.Md("cave_stone1"));
      K[P().On] = N.Cd(N.Md("cave_stone2"));
      K[P().Pn] = N.Cd(N.Md("ice0"));
      K[P().Sn] = N.Cd(N.Md("ice1"));
      K[P().Yo] = N.Cd(N.Md("resource_background"));
      K[P().jo] = null;
      K[P().No] = null;
      K[P().Oo] = null;
      K[P().hn] = N.Cd(N.Md("tree"));
      K[P().ur] = N.Cd(N.Md("palm_tree"));
      K[P()._i] = N.Cd(N.Md("cherry_tree"));
      K[P().dn] = N.Cd(N.Md("bush"));
      K[P().tn] = N.Cd(N.Md("gold"));
      K[P().Zn] = N.Cd(N.Md("ruby"));
      K[P().wn] = N.Cd(N.Md("lootbox"));
      K[P().Po] = null;
      K[P().bn] = N.Cd(N.Md("bullet"));
      K[P().gn] = N.Cd(N.Md("wall"));
      K[P().W] = N.Cd(N.Md("trap"));
      K[P().V] = N.Cd(N.Md("boost"));
      K[P().mn] = N.Cd(N.Md("spike"));
      K[P().vn] = N.Cd(N.Md("platform"));
      K[P().$] = N.Cd(N.Md("heal_pad"));
      K[P().To] = N.Cd(N.Md("wood"));
      K[P().xo] = N.Cd(N.Md("leaf"));
      K[P().Ho] = N.Cd(N.Md("stone"));
      K[P().qo] = N.Cd(N.Md("particle_gold"));
      K[P().Pd] = N.Cd(N.Md("particle_ruby"));
      K[P().Jo] = N.wd(N.Md("health-gauge-background"), 210, 40);
      K[P().Ko] = N.wd(N.Md("health-gauge-front"), 210, 40);
      K[P().ht] = N.Cd(N.Md("stone_sword"));
      K[P().Ut] = N.Cd(N.Dd("g_stick"));
      K[P().Yt] = N.Cd(N.Dd("d_stick"));
      K[P().jt] = N.Cd(N.Dd("r_stick"));
      K[P().Ot] = N.Cd(N.Dd("g_cutspear"));
      K[P().Nt] = N.Cd(N.Dd("d_cutspear"));
      K[P().se] = N.Cd(N.Dd("r_cutspear"));
      K[P().Pt] = N.Cd(N.Dd("g_toolhammer"));
      K[P().St] = N.Cd(N.Dd("d_toolhammer"));
      K[P().qt] = N.Cd(N.Dd("r_toolhammer"));
      K[P().Ar] = N.Cd(N.Md("inv_g_stick"));
      K[P().Nr] = N.Cd(N.Md("inv_d_stick"));
      K[P().Or] = N.Cd(N.Md("inv_r_stick"));
      K[P().Tr] = N.Cd(N.Md("inv_g_cutspear"));
      K[P().pr] = N.Cd(N.Md("inv_d_cutspear"));
      K[P().kc] = N.Cd(N.Md("inv_r_cutspear"));
      K[P().Hr] = N.Cd(N.Md("inv_g_toolhammer"));
      K[P().kr] = N.Cd(N.Md("inv_d_toolhammer"));
      K[P().Gr] = N.Cd(N.Md("inv_r_toolhammer"));
      K[P().ae] = N.Cd(N.Dd("g_sword"));
      K[P().fe] = N.Cd(N.Dd("d_sword"));
      K[P().le] = N.Cd(N.Dd("r_sword"));
      K[P().Ec] = N.Cd(N.Md("inv_g_sword"));
      K[P().Uc] = N.Cd(N.Md("inv_d_sword"));
      K[P().Yc] = N.Cd(N.Md("inv_r_sword"));
      K[P().Ct] = N.Cd(N.Dd("g_axe"));
      K[P().Lt] = N.Cd(N.Dd("d_axe"));
      K[P().he] = N.Cd(N.Dd("r_axe"));
      K[P().br] = N.Cd(N.Md("inv_g_axe"));
      K[P().wr] = N.Cd(N.Md("inv_d_axe"));
      K[P().Nc] = N.Cd(N.Md("inv_r_axe"));
      K[P().Tt] = N.Cd(N.Dd("g_great_axe"));
      K[P().At] = N.Cd(N.Dd("d_great_axe"));
      K[P().de] = N.Cd(N.Dd("r_great_axe"));
      K[P().Br] = N.Cd(N.Md("inv_g_great_axe"));
      K[P().yr] = N.Cd(N.Md("inv_d_great_axe"));
      K[P().jc] = N.Cd(N.Md("inv_r_great_axe"));
      K[P().tc] = N.Cd(N.zd("indicator_enemy"));
      K[P().nc] = N.Cd(N.zd("indicator_friendly"));
      K[P().Ht] = N.Cd(N.Dd("g_katana"));
      K[P().xt] = N.Cd(N.Dd("d_katana"));
      K[P().Et] = N.Cd(N.Dd("c_katana"));
      K[P()._r] = N.Cd(N.Md("inv_g_katana"));
      K[P().zr] = N.Cd(N.Md("inv_d_katana"));
      K[P().Cr] = N.Cd(N.Md("inv_c_katana"));
      K[P().Gt] = N.Cd(N.Dd("g_spear"));
      K[P().kt] = N.Cd(N.Dd("d_spear"));
      K[P().ue] = N.Cd(N.Dd("r_spear"));
      K[P().Dr] = N.Cd(N.Md("inv_g_spear"));
      K[P().Mr] = N.Cd(N.Md("inv_d_spear"));
      K[P().Gc] = N.Cd(N.Md("inv_r_spear"));
      K[P().Xt] = N.Cd(N.Dd("meme"));
      K[P().Oc] = N.Cd(N.Md("inv_meme"));
      K[P().Ft] = N.Cd(N.Dd("scythe"));
      K[P().Pc] = N.Cd(N.Md("inv_scythe"));
      K[P().X] = N.Cd(N.Dd("bat"));
      K[P().lt] = N.Cd(N.Md("stone_toolhammer"));
      K[P().dt] = N.Cd(N.Md("stone_spear"));
      K[P().S] = N.Cd(N.Md("s_musket"));
      K[P().Qo] = N.Cd(N.Md("stone_axe"));
      K[P().qr] = N.Cd(N.Md("stone_axe"));
      K[P().Bt] = N.Cd(N.Md("great_axe"));
      K[P().bt] = N.Cd(N.Md("cookie"));
      K[P().Yn] = N.Cd(N.Md("chest"));
      K[P().vi] = N.Cd(N.Md("map"));
      K[P().Z] = N.Cd(N.Md("shield"));
      K[P().zn] = N.Cd(N.Md("cow"));
      K[P().Un] = N.Cd(N.Md("fireball"));
      K[P().Hn] = N.Cd(N.Md("gcow"));
      K[P().Tn] = N.Cd(N.Md("shark"));
      K[P().xn] = N.Cd(N.Md("wolf"));
      K[P().qn] = N.Cd(N.Md("duck"));
      K[P().Wn] = N.Cd(N.Md("crocodile"));
      K[P().Kt] = N.Cd(N.Dd("pearl"));
      K[P().gc] = N.Cd(N.Md("inv_pearl"));
      K[P().Kn] = N.Cd(N.Md("teleporter"));
      K[P().mc] = N.Cd(N.Md("inv_teleporter"));
      K[P().Vn] = N.Cd(N.Md("ice_spike"));
      K[P().wc] = N.Cd(N.Md("inv_ice_spike"));
      K[P().vc] = N.Cd(N.Dd("ice_spike"));
      K[P().yc] = N.Cd(N.Md("g_hammer"));
      K[P().zc] = N.Cd(N.Md("inv_g_hammer"));
      K[P()._c] = N.Cd(N.Md("d_hammer"));
      K[P().Mc] = N.Cd(N.Md("inv_d_hammer"));
      K[P().Dc] = N.Cd(N.Md("r_hammer"));
      K[P().Bc] = N.Cd(N.Md("inv_r_hammer"));
      K[P().Lc] = N.Cd(N.Md("g_bat"));
      K[P().Cc] = N.Cd(N.Md("inv_g_bat"));
      K[P().Ac] = N.Cd(N.Md("d_bat"));
      K[P().Tc] = N.Cd(N.Md("inv_d_bat"));
      K[P().xc] = N.Cd(N.Md("r_bat"));
      K[P().Hc] = N.Cd(N.Md("inv_r_bat"));
      K[P().Wr] = N.Cd(N.Md("inv_r_dagger"));
      K[P().Rr] = N.Cd(N.Md("r_dagger"));
      let I = [];
      K[P().En] = I;
      I[1] = [[N.Cd(N.Md("mammoth_tail")), new J(-40, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 7, Math.PI / 7, 2000)], [N.Cd(N.Md("mammoth_body")), new J(0, 0, 0, 0, 0, 0, 0, 0, 0, Math.PI / 20, -Math.PI / 20, 1600)], [N.Cd(N.Md("mammoth_head")), new J(100, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 10, Math.PI / 10, 1000)]];
      I[0] = [[N.Cd(N.Md("mammoth_tail")), new J(-40, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 7, Math.PI / 7, 2000)], [N.Cd(N.Md("mammoth_body")), new J(0, 0, 0, 0, 0, 0, 0, 0, 0, Math.PI / 20, -Math.PI / 20, 1600)], [N.Cd(N.Md("mammoth_head_angry")), new J(100, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 10, Math.PI / 10, 1000)]];
      K[P().Gn] = [[N.Cd(N.Md("dragon_2_body")), new J(-50, 0, 0, 2, -2, 1200, 0, 0, 0, Math.PI / 40, -Math.PI / 40, 1800)], [N.Cd(N.Md("dragon_2_left_wing")), new J(10, -40, Math.PI / 5, 0, 0, 0, 0, 0, 0, -Math.PI / 5, 0, 1600)], [N.Cd(N.Md("dragon_2_right_wing")), new J(10, 40, -Math.PI / 5, 0, 0, 0, 0, 0, 0, Math.PI / 5, 0, 1600)], [N.Cd(N.Md("dragon_2_head")), new J(50, 0, 0, -3, 3, 1000, 0, 0, 0, -Math.PI / 40, Math.PI / 40, 1400)]];
      K[P().pi] = N.Cd(N.Md("turret_base"));
      K[P().Ai] = N.Cd(N.Md("turret_top"));
      K[P().Ci] = N.Cd(N.Md("turret_assembled"));
      K[P().ln] = N.Cd(N.Md("hard_spike"));
      K[P().q] = N.Cd(N.Md("bow"));
      K[P().Ui] = N.Cd(N.Md("arrow"));
      K[P().Ln] = N.Cd(N.Md("wood_farm"));
      K[P().Cn] = N.Cd(N.Md("wood_farm_cherry"));
      K[P().An] = N.Cd(N.Md("stone_farm"));
      K[P()._t] = N.Cd(N.Md("bush"));
      K[P().Sr] = N.Cd(N.zd("currency"));
      K[P().oi] = N.Cd(N.Md("hat_1"));
      K[P().ri] = N.Cd(N.Md("hat_2"));
      K[P().ci] = N.Cd(N.Md("hat_3"));
      K[P().ui] = N.Cd(N.Md("hat_4"));
      K[P().ai] = N.Cd(N.Md("hat_5"));
      K[P().fi] = N.Cd(N.Md("hat_6"));
      K[P().Jn] = N.Cd(N.Md("cactus"));
      K[P().In] = N.Cd(N.Md("tornado"));
      K[P().Oi] = N.Cd(N.Md("hat_7"));
      K[P().hr] = N.Cd(N.Md("hat_8"));
      K[P().gr] = N.Cd(N.Md("hat_9"));
      K[P().Kr] = N.Cd(N.Md("hat_10"));
      K[P().$r] = N.Cd(N.Md("hat_11"));
      K[P().bc] = N.Cd(N.Md("hat_14"));
      K[P().wt] = N.Cd(N.Md("apple"));
      K[P().K] = N.Cd(N.Md("stick"));
      K[P().Dn] = N.Cd(N.Md("big_spike"));
      K[P().Yi] = N.Cd(N.Md("map_cross"));
      K[P().zt] = N.Cd(N.Md("katana"));
      K[P().Mt] = N.Cd(N.Md("Xbow"));
      K[P().Ji] = N.Cd(N.Md("map_dot"));
      K[P().ec] = N.Cd(N.Md("our_dot"));
      K[P()._n] = N.Cd(N.Md("bed"));
      K[P().pn] = N.Cd(N.Md("castle_wall"));
      K[P().Dt] = N.Cd(N.Md("cut_spear"));
      K[P().Ni] = N.Cd(N.Md("team_crown"));
      K[P().Lr] = null;
      K[P().Bi] = N.Cd(N.Md("skid_hat"));
      K[P().yt] = N.Cd(N.Md("hammer"));
      K[P().hi] = null;
      K[P().ei] = N.Cd(N.Md("toggle-button-out1"));
      K[P().qi] = N.Cd(N.Md("clan_button_out"));
      K[P().Pi] = N.Cd(N.Md("hat_button_out"));
      K[P().Si] = N.Cd(N.Md("close_button_out"));
      K[P().Ki] = N.Cd(N.Md("chat_button_out"));
      K[P().Ii] = N.Cd(N.Md("inv_cut_spear"));
      K[P().Zo] = N.Cd(N.Md("inv_stone_toolhammer"));
      K[P().Io] = N.Cd(N.Md("inv_stone_sword"));
      K[P().Ir] = N.Cd(N.Md("inv_s_dagger"));
      K[P().Xr] = N.Cd(N.Md("s_dagger"));
      K[P().Zr] = N.Cd(N.Md("inv_g_dagger"));
      K[P().Fr] = N.Cd(N.Dd("g_dagger"));
      K[P().Vr] = N.Cd(N.Md("inv_d_dagger"));
      K[P().Qr] = N.Cd(N.Dd("d_dagger"));
      K[P().ac] = N.Cd(N.Md("inv_c_dagger"));
      K[P().uc] = N.Cd(N.Dd("c_dagger"));
      K[P().oc] = N.Cd(N.Md("inv_s_healing_staff"));
      K[P().fc] = N.Cd(N.Md("s_healing_staff"));
      K[P().ic] = N.Cd(N.Md("inv_g_healing_staff"));
      K[P().lc] = N.Cd(N.Dd("g_healing_staff"));
      K[P().rc] = N.Cd(N.Md("inv_d_healing_staff"));
      K[P().hc] = N.Cd(N.Dd("d_healing_staff"));
      K[P().cc] = N.Cd(N.Md("inv_r_healing_staff"));
      K[P().dc] = N.Cd(N.Dd("r_healing_staff"));
      K[P().Wo] = N.Cd(N.Md("inv_stone_spear"));
      K[P().Xo] = N.Cd(N.Md("inv_stone_axe"));
      K[P().sr] = N.Cd(N.Md("inv_great_axe"));
      K[P().li] = N.Cd(N.Md("inv_cookie"));
      K[P().Vo] = N.Cd(N.Md("inv_musket"));
      K[P().Fo] = N.Cd(N.Md("inv_wood_wall"));
      K[P().Zi] = N.Cd(N.Md("inv_castle_wall"));
      K[P().$o] = N.Cd(N.Md("inv_spike"));
      K[P().Ro] = N.Cd(N.Md("inv_boost"));
      K[P().ni] = N.Cd(N.Md("inv_platform"));
      K[P().ti] = N.Cd(N.Md("inv_trap"));
      K[P().sc] = N.Cd(N.Md("inv_heal_pad"));
      K[P().ii] = N.Cd(N.Md("inv_apple"));
      K[P().si] = N.Cd(N.Md("inv_stone_shield"));
      K[P().vr] = N.Cd(N.Md("inv_bat"));
      K[P().gi] = N.Cd(N.Md("inv_windmill"));
      K[P().mi] = N.Cd(N.Md("windmill_top"));
      K[P().wi] = N.Cd(N.Md("windmill_base"));
      K[P().bi] = N.Cd(N.Md("windmill_assembled"));
      K[P().di] = N.Cd(N.Md("inv_stick"));
      K[P().yi] = N.Cd(N.Md("inv_hammer"));
      K[P().zi] = N.Cd(N.Md("inv_bed"));
      K[P().Mi] = N.Cd(N.Md("inv_katana"));
      K[P().Di] = N.Cd(N.Md("inv_big_spike"));
      K[P().Li] = N.Cd(N.Md("inv_hard_spike"));
      K[P().Ti] = N.Cd(N.Md("inv_turret"));
      K[P().Hi] = N.Cd(N.Md("inv_wood_farm"));
      K[P().xi] = N.Cd(N.Md("inv_wood_farm_cherry"));
      K[P().ki] = N.Cd(N.Md("inv_stone_farm"));
      K[P().Gi] = N.Cd(N.Md("inv_bush"));
      K[P().Ei] = N.Cd(N.Md("inv_bow"));
      K[P().ji] = N.Cd(N.Md("inv_xbow"));
      K[P().Vi] = N.Cd(N.Dd("wall"));
      K[P().Wi] = N.Cd(N.Dd("spike"));
      K[P().Xi] = N.Cd(N.Dd("castle_wall"));
      K[P().Fi] = N.Cd(N.Dd("boost"));
      K[P().Qi] = N.Cd(N.Dd("trap"));
      K[P().Sd] = N.Cd(N.Dd("heal_pad"));
      K[P().Ri] = N.Cd(N.Dd("stone_farm"));
      K[P().$i] = N.Cd(N.Dd("berry_farm"));
      K[P().nr] = N.Cd(N.Dd("wood_farm_cherry"));
      K[P().tr] = N.Cd(N.Dd("wood_farm"));
      K[P().er] = N.Cd(N.Dd("hard_spike"));
      K[P().ir] = N.Cd(N.Dd("castle_spike"));
      K[P().rr] = N.Cd(N.Dd("platform"));
      K[P().cr] = N.Cd(N.Dd("bed"));
      K[P().kn] = N.Cd(N.Md("roof"));
      K[P().Pr] = N.Cd(N.Md("inv_roof"));
      K[P().Yr] = N.Cd(N.Md("clan_accept"));
      K[P().jr] = N.Cd(N.Md("clan_decline"));
      var Z = K;
      var V = o(9299);
      var W = o.n(V);
      var X = o(4002);
      var F = o.n(X);
      var Q = o(1624);
      var R = o.n(Q);
      var $ = o(3287);
      var nn = o.n($);
      var tn = o(3970);
      var en = o.n(tn);
      var on = o(4613);
      var rn = o.n(on);
      const cn = new WeakMap();
      let sn;
      let un = false;
      let an = null;
      let fn = 1;
      function ln() {
        const t = Y.default.qd();
        if (an !== null && sn === t) {
          return an;
        }
        const e = parseFloat(Y.default.Kd("shadow_offset_x"));
        const o = parseFloat(Y.default.Kd("shadow_offset_y"));
        const r = parseFloat(Y.default.Kd("shadow_darkness"));
        const c = parseFloat(Y.default.Kd("shadow_blur"));
        const s = Y.default.Kd("shadow_color");
        an = {
          Jd: isFinite(e) ? e : 10,
          Id: isFinite(o) ? o : 7,
          Zd: isFinite(r) && r > 0 && r <= 1 ? r : 0.35,
          blur: isFinite(c) && c >= 0 ? c : 0,
          color: typeof s == "string" && s.charAt(0) === "#" ? s : "#000000"
        };
        sn = t;
        return an;
      }
      function hn(n, t) {
        if (!n || !n.width || !n.height) {
          return null;
        }
        try {
          const o = document.createElement("canvas");
          o.width = n.width;
          o.height = n.height;
          const i = o.getContext("2d");
          i.drawImage(n, 0, 0);
          i.globalCompositeOperation = "source-in";
          i.fillStyle = t || "#000";
          i.fillRect(0, 0, o.width, o.height);
          i.getImageData(0, 0, 1, 1);
          return o;
        } catch (n) {
          return null;
        }
      }
      function dn(n) {
        if (!n) {
          return null;
        }
        const t = ln().color;
        let e = cn.get(n);
        if (e === undefined || e.color !== t) {
          e = {
            color: t,
            canvas: hn(n, t)
          };
          cn.set(n, e);
        }
        return e.canvas;
      }
      const mn = {
        Vd: function (n, t, e, o, r, c) {
          if (un) {
            return;
          }
          if (!t) {
            return;
          }
          if (t.Wd !== undefined && t.Wd !== rn().at) {
            return;
          }
          if (!t.width || !t.height) {
            return;
          }
          const u = dn(t);
          if (!u) {
            return;
          }
          const a = ln();
          const f = n.getTransform();
          n.save();
          n.setTransform(f.a, f.b, f.c, f.d, f.e + a.Jd * fn, f.f + a.Id * fn);
          if (a.blur > 0) {
            n.filter = "blur(" + a.blur + "px)";
          }
          n.globalAlpha = a.Zd;
          n.drawImage(u, e, o, r, c);
          n.restore();
        },
        Xd: function (n) {
          un = !!n;
        },
        Fd: function () {
          an = null;
          sn = undefined;
        },
        Qd: function (n) {
          fn = isFinite(n) && n >= 0 ? n : 1;
        }
      };
      var gn = mn;
      let vn = null;
      function wn() {
        if (vn === null) {
          try {
            vn = o(8557) || false;
          } catch (n) {
            vn = false;
          }
        }
        const n = vn && vn.Eu;
        return typeof n == "function" && n();
      }
      let bn = 1;
      function yn(n) {
        bn = typeof n == "number" && n >= 0 && n < 1 ? n : 1;
      }
      function zn(n, t) {
        let o;
        let r = Date.now();
        let c = 0;
        const s = bn < 1;
        if (s) {
          n.globalAlpha = bn;
        }
        o = b[u().Tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().Tn, n, t);
        }
        o = b[u().Wn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().Wn, n, t);
        }
        o = b[u().vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().vn, n, t);
        }
        o = b[u().V];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().V, n, t);
        }
        o = b[u().Kn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Kn, n, t);
        }
        o = b[u()._n];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P()._n, n, t);
        }
        o = b[u().W];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().W, n, t);
        }
        o = b[u().$];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().$, n, t);
        }
        o = b[u().wn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().wn, n, t);
        }
        o = b[u().An];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().An, n, t);
        }
        o = b[u().fn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().fn, n, t);
        }
        o = b[u().Pn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Pn, n, t);
        }
        o = b[u().Sn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Sn, n, t);
        }
        o = b[u().jn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().jn, n, t);
        }
        o = b[u().Nn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Nn, n, t);
        }
        o = b[u().On];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().On, n, t);
        }
        o = b[u().tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().tn, n, t);
        }
        o = b[u().Zn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Zn, n, t);
        }
        o = b[u().bn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          if (!(o[t].ku & h().Vc)) {
            Tn(o[t], o[t].Uh, P().Po, n);
          }
        }
        o = b[u().qn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().qn, n, t);
        }
        o = b[u().an];
        c = o.length;
        for (let e = 0; e < c; e++) {
          if (!(o[e].ku & h().Vc)) {
            Hn(o[e], n, t);
          }
        }
        o = b[u().xn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().xn, n, t);
        }
        o = b[u().Un];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().Un, n, t);
        }
        o = b[u().zn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().zn, n, t);
        }
        o = b[u().Hn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().Hn, n, t);
        }
        o = b[u().En];
        c = o.length;
        for (let t = 0; t < c; t++) {
          const e = o[t];
          An(e, P().En, n, r - e.Kh, e.ku & h().Wc ? 0 : 1);
        }
        o = b[u().mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().mn, n, t);
        }
        o = b[u().ln];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().ln, n, t);
        }
        o = b[u().Vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Vn, n, t);
        }
        o = b[u().Yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Yn, n, t);
        }
        o = b[u().gn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().gn, n, t);
        }
        o = b[u().pn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().pn, n, t);
        }
        o = b[u().Bn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().pi, n, t);
        }
        o = b[u().Bn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Ai, n, t);
        }
        o = b[u().Dn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Dn, n, t);
        }
        o = b[u().yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().wi, n, t);
        }
        o = b[u().Mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().wi, n, t);
        }
        o = b[u().dn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().dn, n, t);
        }
        o = b[u().Jn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().Jn, n, t);
        }
        o = b[u().Gn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          const e = o[t];
          An(e, P().Gn, n, r - e.Kh);
        }
        o = b[u().Ln];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          xn(e, P().Ln, n, t);
        }
        o = b[u().Cn];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          xn(e, P().Cn, n, t);
        }
        o = b[u().hn];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          xn(e, e.gh === en().k ? P().hn : e.gh === en().G ? P()._i : e.gh === en().U ? P().ur : P().qr, n, t);
        }
        o = b[u().an];
        c = o.length;
        for (let e = 0; e < c; e++) {
          if (o[e].ku & h().Vc) {
            Hn(o[e], n, t);
          }
        }
        o = b[u().kn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().kn, n, t);
        }
        o = b[u().In];
        c = o.length;
        for (let e = 0; e < c; e++) {
          pn(o[e], P().In, n, t);
        }
        o = b[u().yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().mi, n, t);
        }
        o = b[u().Mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          xn(o[e], P().mi, n, t);
        }
        o = b[u().bn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          if (o[t].ku & h().Vc) {
            Tn(o[t], o[t].Uh, P().Po, n);
          }
        }
        if (s) {
          n.globalAlpha = 1;
        }
      }
      let _n = false;
      function Mn(n) {
        _n = !!n;
      }
      function Dn(n) {
        if (!_n) {
          return;
        }
        const e = Y.default.Kd("collision_color") || "#ff3b3b";
        const o = parseFloat(Y.default.Kd("collision_width"));
        const r = isFinite(o) && o > 0 ? o : 3;
        const c = Y.default.Kd("collision_opacity");
        const s = c === null || c === "" || c === undefined ? 0.6 : parseFloat(c) || 0;
        const a = Y.default.Kd("collision_follow_shake");
        const f = a === "1" || a === "true";
        n.save();
        n.globalAlpha = s;
        n.strokeStyle = e;
        n.lineWidth = r;
        for (let e = 0; e < b.length; e++) {
          const o = b[e];
          if (!o || !o.length) {
            continue;
          }
          const i = nn()[e];
          const r = i && i.Rd;
          if (!r) {
            continue;
          }
          const c = e === u().an;
          for (let e = 0; e < o.length; e++) {
            const i = o[e];
            let s = r;
            if (c) {
              if (i.ku & h().Sc) {
                continue;
              }
              if (i.wh === F().Xn) {
                s = nn()[u().dn].Rd;
              }
            }
            let a = i.zh;
            let l = i.Mh;
            if (f && i.Jh && i.Sh && i.Sh.value) {
              const n = i.Sh.value;
              a += Math.cos(i.Jh.Zh) * 10 * n;
              l += Math.sin(i.Jh.Zh) * 10 * n;
            }
            n.beginPath();
            n.arc(a, l, s, 0, Math.PI * 2);
            n.stroke();
          }
        }
        n.restore();
      }
      function Bn(n, t) {
        const o = Z[n.Oh];
        if (!o || !o.$d) {
          return;
        }
        t.save();
        t.translate(n.zh, n.Mh);
        const r = n.Sh.value;
        const c = n._h - r;
        t.rotate(c);
        if (n.nm) {
          t.globalAlpha = 0.5;
        }
        m().tm(t, o, -o.$d.om / 2, -o.$d.im / 2, o.$d.om, o.$d.im);
        t.restore();
      }
      function Ln(n, t, e) {
        const r = Z[P().Ko];
        const c = Z[P().Jo];
        const s = nn()[n.type].Rd + 50;
        const u = 0.5;
        t.fillStyle = e ? Y.default.Kd("healthbar_player_color") || "#a4cc4f" : Y.default.Kd("healthbar_enemy_color") || "#cc5151";
        t.drawImage(c, n.zh - u * c.width / 2, n.Mh - u * c.height + s, u * c.width, u * c.height);
        let a = u * r.width;
        let f = n.yh / 255 * (a - 10);
        const l = n.zh - a / 2 + 5;
        const h = n.Mh - u * r.height + s + 5;
        const d = u * r.height - 10;
        const m = Y.default.Kd("healthbar_bg_color");
        if (m) {
          const n = t.fillStyle;
          t.fillStyle = m;
          t.fillRect(l, h, a - 10, d);
          t.fillStyle = n;
        }
        t.fillRect(l, h, f, d);
        t.drawImage(r, n.zh - u * r.width / 2, n.Mh - u * r.height + s, u * r.width, u * r.height);
      }
      function Cn(n, t, e, o) {
        let c = 0;
        if (t.Gd !== 0) {
          let n = o % t.Gd / t.Gd;
          if (Math.floor(o / t.Gd) % 2 == 0) {
            n = 1 - n;
          }
          c = t.Hd + n * (t.kd - t.Hd);
        }
        let s = 0;
        if (t.Yd !== 0) {
          let n = o % t.Yd / t.Yd;
          if (Math.floor(o / t.Yd) % 2 == 0) {
            n = 1 - n;
          }
          s = t.Ed + n * (t.Ud - t.Ed);
        }
        if (t.pd !== 0 || t.Td !== 0 || c !== 0 || s !== 0) {
          c += t.pd;
          s += t.Td;
          e.translate(c, s);
        }
        let u = 0;
        if (t.Od !== 0) {
          let n = o % t.Od / t.Od;
          if (Math.floor(o / t.Od) % 2 == 0) {
            n = 1 - n;
          }
          u = t.jd + n * (t.Nd - t.jd);
        }
        if (t.xd || u !== 0) {
          u += t.xd;
          e.rotate(u);
        }
        m().tm(e, n, -n.$d.om / 2, -n.$d.im / 2, n.$d.om, n.$d.im);
        if (u !== 0) {
          e.rotate(-u);
        }
        if (c !== 0 || s !== 0) {
          e.translate(-c, -s);
        }
      }
      function An(n, t, e, o, i = -1) {
        let r;
        r = i !== -1 ? Z[t][i] : Z[t];
        e.save();
        e.translate(n.zh, n.Mh);
        e.rotate(n._h);
        const c = r.length;
        for (let n = 0; n < c; n++) {
          const t = r[n];
          Cn(t[0], t[1], e, o);
        }
        e.restore();
      }
      function pn(n, t, e, o) {
        const c = Z[t];
        e.save();
        if (n.Wh) {
          n._h += n.Wh * o;
        }
        e.translate(n.zh, n.Mh);
        e.rotate(n._h);
        if (wn()) {
          gn.Vd(e, c.$d, -c.$d.om / 2, -c.$d.im / 2, c.$d.om, c.$d.im);
        }
        m().tm(e, c, -c.$d.om / 2, -c.$d.im / 2, c.$d.om, c.$d.im);
        e.restore();
      }
      function Tn(n, t, e, o, r) {
        if (!n.active) {
          return;
        }
        const c = Z[t];
        Z[e];
        n.range;
        o.save();
        o.translate(n.zh, n.Mh);
        o.rotate(n._h);
        m().tm(o, c, -c.$d.om / 2, -c.$d.im / 2, c.$d.om, c.$d.im);
        o.restore();
      }
      function xn(n, t, e, o) {
        let c = 0;
        let s = 0;
        let u = 0;
        if (n.Sh.value) {
          n.Sh.$s(o);
          u = n.Sh.value;
        } else if (n.Jh.active && !n.Sh.value) {
          n.Sh.$s(o);
          n.Jh.active = false;
          u = n.Sh.value;
        }
        if (u) {
          c = Math.cos(n.Jh.Zh) * 10 * u;
          s = Math.sin(n.Jh.Zh) * 10 * u;
        }
        if (n.Wh) {
          n._h += n.Wh * o;
        }
        const a = t !== P().wi ? n._h : 0;
        e.save();
        e.translate(n.zh + c, n.Mh + s);
        e.rotate(a);
        const f = Z[t];
        if (wn()) {
          gn.Vd(e, f.$d, -f.$d.om / 2, -f.$d.im / 2, f.$d.om, f.$d.im);
        }
        m().tm(e, f, -f.$d.om / 2, -f.$d.im / 2, f.$d.om, f.$d.im);
        e.restore();
      }
      function Hn(n, t, e) {
        if (n.Oh && !n.nm) {
          return;
        }
        const r = W()[n.gh];
        t.save();
        t.translate(n.zh, n.Mh);
        if (n.Sh.value) {
          n.Sh.$s(e);
        }
        const c = n.wh ? R()[n.wh] : null;
        const s = c ? c.Jd : 0;
        const u = n.ku & h().Wc ? Z[P().Bi] : c ? Z[c.rm] : null;
        const a = 70;
        const f = Z[r.rm];
        const l = n.Uh || 0;
        const d = Z[P().Go][l];
        const g = Z[P().Eo][l];
        const v = n.Yh || 0;
        const w = Z[P().Er][v];
        const b = n.Nh || 0;
        const y = Z[P().Jr][b];
        const z = n.Sh.value;
        const _ = n._h - z;
        if (!(n.ku & h().Sc)) {
          const e = wn();
          if (e) {
            gn.Vd(t, d.$d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
            gn.Xd(true);
          }
          try {
            switch (r.sm) {
              case 0:
                t.rotate(_);
                if (e) {
                  gn.Vd(t, f.$d, 29 - f.$d.om / 2 + r.Jd, -48 + r.Id, f.$d.om, f.$d.im);
                }
                m().tm(t, f, 29 - f.$d.om / 2 + r.Jd, -48 + r.Id, f.$d.om, f.$d.im);
                if (!c || c.rm !== P().$i) {
                  if (b !== 0) {
                    if (e) {
                      gn.Vd(t, y.$d, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                    }
                    m().tm(t, y, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                  }
                  if (e) {
                    gn.Vd(t, g.$d, a / 3 - g.$d.om / 2, a / 3 - g.$d.im / 2, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, a / 3 - g.$d.om / 2, a / 3 - g.$d.im / 2, g.$d.om, g.$d.im);
                  t.save();
                  t.translate(a / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.$d.om / 2, -g.$d.im / 2);
                  if (e) {
                    gn.Vd(t, g.$d, 0, 0, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, 0, 0, g.$d.om, g.$d.im);
                  t.restore();
                  if (e) {
                    gn.Vd(t, d.$d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  }
                  m().tm(t, d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  if (v !== 0) {
                    if (e) {
                      gn.Vd(t, w.$d, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                    }
                    m().tm(t, w, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                  }
                }
                if (u) {
                  if (e) {
                    gn.Vd(t, u.$d, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                  }
                  m().tm(t, u, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                }
                break;
              case 1:
                t.rotate(n._h);
                if (e) {
                  gn.Vd(t, f.$d, a / (0.9 + z * 0.05) - f.$d.om / 2 - r.Jd, -f.$d.im / 2 + r.Id, f.$d.om, f.$d.im);
                }
                m().tm(t, f, a / (0.9 + z * 0.05) - f.$d.om / 2 - r.Jd, -f.$d.im / 2 + r.Id, f.$d.om, f.$d.im);
                if (!c || c.rm !== P().$i) {
                  if (b !== 0) {
                    if (e) {
                      gn.Vd(t, y.$d, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                    }
                    m().tm(t, y, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                  }
                  if (e) {
                    gn.Vd(t, g.$d, a / (2.3 + z * 0.1) - g.$d.om / 2, 17.5 - g.$d.im / 2, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, a / (2.3 + z * 0.1) - g.$d.om / 2, 17.5 - g.$d.im / 2, g.$d.om, g.$d.im);
                  t.save();
                  t.translate(a / (1.3 - z * 0.15), -17.5);
                  t.scale(1, -1);
                  t.translate(-g.$d.om / 2, -g.$d.im / 2);
                  if (e) {
                    gn.Vd(t, g.$d, 0, 0, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, 0, 0, g.$d.om, g.$d.im);
                  t.restore();
                  if (e) {
                    gn.Vd(t, d.$d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  }
                  m().tm(t, d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  if (v !== 0) {
                    if (e) {
                      gn.Vd(t, w.$d, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                    }
                    m().tm(t, w, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                  }
                }
                if (u) {
                  if (e) {
                    gn.Vd(t, u.$d, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                  }
                  m().tm(t, u, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                }
                break;
              case 2:
                t.rotate(_);
                if (e) {
                  gn.Vd(t, f.$d, 35 - r.Jd, -f.$d.im / 2 + r.Id, f.$d.om, f.$d.im);
                }
                m().tm(t, f, 35 - r.Jd, -f.$d.im / 2 + r.Id, f.$d.om, f.$d.im);
                if (!c || c.rm !== P().$i) {
                  if (b !== 0) {
                    if (e) {
                      gn.Vd(t, y.$d, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                    }
                    m().tm(t, y, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                  }
                  if (e) {
                    gn.Vd(t, g.$d, a / 3 - g.$d.om / 2, a / 3 - g.$d.im / 2, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, a / 3 - g.$d.om / 2, a / 3 - g.$d.im / 2, g.$d.om, g.$d.im);
                  t.save();
                  t.translate(a / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.$d.om / 2, -g.$d.im / 2);
                  if (e) {
                    gn.Vd(t, g.$d, 0, 0, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, 0, 0, g.$d.om, g.$d.im);
                  t.restore();
                  if (e) {
                    gn.Vd(t, d.$d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  }
                  m().tm(t, d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  if (v !== 0) {
                    if (e) {
                      gn.Vd(t, w.$d, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                    }
                    m().tm(t, w, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                  }
                }
                if (u) {
                  if (e) {
                    gn.Vd(t, u.$d, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                  }
                  m().tm(t, u, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                }
                break;
              case 3:
                t.rotate(n._h);
                let i = z * 7;
                if (e) {
                  gn.Vd(t, f.$d, 29 - f.$d.om / 2 + r.Jd + i, -48 + r.Id, f.$d.om, f.$d.im);
                }
                m().tm(t, f, 29 - f.$d.om / 2 + r.Jd + i, -48 + r.Id, f.$d.om, f.$d.im);
                if (!c || c.rm !== P().$i) {
                  if (b !== 0) {
                    if (e) {
                      gn.Vd(t, y.$d, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                    }
                    m().tm(t, y, -y.$d.om / 2, -y.$d.im / 2, y.$d.om, y.$d.im);
                  }
                  if (e) {
                    gn.Vd(t, g.$d, a / 3 - g.$d.om / 2 + i, a / 3 - g.$d.im / 2, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, a / 3 - g.$d.om / 2 + i, a / 3 - g.$d.im / 2, g.$d.om, g.$d.im);
                  t.save();
                  t.translate(a / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.$d.om / 2, -g.$d.im / 2);
                  if (e) {
                    gn.Vd(t, g.$d, 0, 0, g.$d.om, g.$d.im);
                  }
                  m().tm(t, g, 0, 0, g.$d.om, g.$d.im);
                  t.restore();
                  if (e) {
                    gn.Vd(t, d.$d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  }
                  m().tm(t, d, -d.$d.om / 2, -d.$d.im / 2, d.$d.om, d.$d.im);
                  if (v !== 0) {
                    if (e) {
                      gn.Vd(t, w.$d, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                    }
                    m().tm(t, w, -w.$d.om / 2, -w.$d.im / 2, w.$d.om, w.$d.im);
                  }
                }
                if (u) {
                  if (e) {
                    gn.Vd(t, u.$d, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                  }
                  m().tm(t, u, -u.$d.om / 2 - s, -u.$d.im / 2, u.$d.om, u.$d.im);
                }
            }
          } finally {
            gn.Xd(false);
          }
        }
        t.restore();
      }
      // KEYBINDS EDIT
      /*function kn() {
        try {
          localStorage.setItem(rt, JSON.stringify(ct));
        } catch (n) {}
      }
      document.getElementById("reset-keybinds").addEventListener("click", function (n) {
        Object.assign(ct, it);
        kn();
        lt();
      });*/
      // ENDEDIT
      let Gn = 0;
      const En = Gn++;
      const Un = Gn++;
      const Yn = Gn++;
      const jn = Gn++;
      const Nn = Gn++;
      const On = Gn++;
      const Pn = Gn++;
      const Sn = Gn++;
      const qn = Gn++;
      const Kn = Gn++;
      const Jn = Gn++;
      const In = Gn++;
      const Zn = Gn++;
      const Vn = Gn++;
      const Wn = Gn++;
      const Xn = Gn++;
      const Fn = Gn++;
      const Qn = Gn++;
      const Rn = Gn++;
      const $n = Gn++;
      const nt = Gn++;
      const tt = Gn++;
      const et = Gn++;
      const ot = Gn++;
      const ct/*it*/ = /*Object.freeze(*/{ // KEYBINDS EDIT ENDEDIT
        [En]: "KeyW",
        [Un]: "KeyS",
        [Yn]: "KeyD",
        [jn]: "KeyA",
        [Nn]: "KeyF",
        [On]: "KeyQ",
        [Pn]: "Space",
        [Sn]: "KeyR",
        [qn]: "KeyR", // ALWAYS KeyR
        [Kn]: "KeyG",
        [Jn]: "KeyT",
        [In]: "KeyN",
        [Zn]: "KeyX",
        [Vn]: "KeyE",
        [Wn]: "ArrowUp",
        [Xn]: "ArrowRight",
        [Fn]: "ArrowDown",
        [Qn]: "ArrowLeft",
        [Rn]: "Escape",
        [$n]: "Enter",
        [nt]: "KeyL",
        [tt]: "KeyC",
        [et]: "KeyB",
        [ot]: "KeyP"
      }//); // KEYBINDS EDIT ENDEDIT
      // KEYBINDS EDIT
      function mapToId(map) {
        switch (map) {
            case "for-spike":
                return Sn
                break
            case "for-food":
                return On
                break
            case "for-trap":
                return Nn
                break
            case "for-windmill":
                return Kn
                break
            case "for-platform":
                return Jn
                break
            case "for-bed":
                return In
                break
            case "for-shop":
                return tt
                break
            case "for-clan":
                return et
                break
            case "for-golden-cow-interact":
                return nt
                break
            case "for-lock-angle":
                return Zn
                break
            case "for-auto-hit":
                return Vn
                break
            case "for-pack-builder":
                return ot
                break
            }
        }
    
        const inverseKeyTransform = (t) => {
            if (/^[A-Z]$/.test(t)) {
                return `Key${t}`;
            } else if (/^\d$/.test(t)) {
                return `Digit${t}`;
            } else if (["Up", "Down", "Left", "Right"].includes(t)) {
                return `Arrow${t}`;
            } else {
                return t;
            }
        };
    
        window.globalSettings.keybinds.update = ()=>{
            const map = window.globalSettings.keybinds.map
            const keys = Object.keys(map)
            for (let i=0; i < keys.length; i++) {
                ct[mapToId(keys[i])] = inverseKeyTransform(map[keys[i]])
            }
        };
    
        if (window.globalSettings.keybinds.map) {
            window.globalSettings.keybinds.update()
        };
        // ENDEDIT
      /*KEYBINDS EDIT
      const rt = "keybinds";
      const ct = function () {
        var t = undefined;
        try {
          t = localStorage.getItem(rt);
        } catch (n) {}
        if (!t) {
          return Object.assign({}, it);
        }
        try {
          let e = Object.assign(Object.assign({}, it), JSON.parse(t));
          if (e[On] === "Space") {
            e[On] = it[On];
          }
          if (e[Nn] === "Space") {
            e[Nn] = it[Nn];
          }
          if (e[Sn] === "Space") {
            e[Sn] = it[Sn];
          }
          if (e[qn] === "Space") {
            e[qn] = it[qn];
          }
          if (e[Kn] === "Space") {
            e[Kn] = it[Kn];
          }
          if (e[Jn] === "Space") {
            e[Jn] = it[Jn];
          }
          if (e[In] === "Space") {
            e[In] = it[In];
          }
          return e;
        } catch {
          return Object.assign({}, it);
        }
      }();
      lt();
      const st = Array.from(document.getElementsByClassName("keybind-setting"));
      function ut(n) {
        return atob(btoa(n));
      }
      let at = null;
      function ft(n) {
        if (n.startsWith("Key")) {
          return n.slice(3);
        } else if (n.startsWith("Digit") || n.startsWith("Arrow")) {
          return n.slice(5);
        } else {
          return n;
        }
      }
      function lt() {
        document.getElementById("for-spike").innerText = ft(ct[Sn]);
        document.getElementById("for-trap").innerText = ft(ct[Nn]);
        document.getElementById("for-food").innerText = ft(ct[On]);
        document.getElementById("for-shop").innerText = ft(ct[tt]);
        document.getElementById("for-clan").innerText = ft(ct[et]);
        document.getElementById("for-windmill").innerText = ft(ct[Kn]);
        document.getElementById("for-platform").innerText = ft(ct[Jn]);
        document.getElementById("for-bed").innerText = ft(ct[In]);
        const t = document.getElementById("for-pack-builder");
        if (t) {
          t.innerText = ft(ct[ot]);
        }
      }
      st.forEach(n => n.addEventListener("click", function () {
        at = n[ut("id")];
        document.getElementById(at).innerText = "PRESS";
      }));
      window.addEventListener("keydown", function (n) {
        if (!at) {
          return;
        }
        n.preventDefault();
        const t = n.code;
        if (t !== "Space") {
          switch (at) {
            case "for-spike":
              ct[Sn] = t;
              break;
            case "for-trap":
              ct[Nn] = t;
              break;
            case "for-food":
              ct[On] = t;
              break;
            case "for-windmill":
              ct[Kn] = t;
              break;
            case "for-platform":
              ct[Jn] = t;
              break;
            case "for-bed":
              ct[In] = t;
              break;
            case "for-shop":
              ct[tt] = t;
              break;
            case "for-clan":
              ct[et] = t;
              break;
            case "for-pack-builder":
              ct[ot] = t;
              break;
            default:
              throw Error("Unknown key type");
          }
          kn();
          lt();
          at = null;
        }
      });*/
      // ENDEDIT
      let ht = false;
      let dt = {
        tu: -1,
        um: 0,
        am: 0,
        fm: 0,
        lm: 0
      };
      let mt = {
        tu: -1,
        um: 0,
        am: 0,
        fm: 0,
        lm: 0
      };
      let gt = 0;
      let vt = 0;
      let wt = {};
      let bt = 0;
      let yt = false;
      let zt = 0;
      let _t = 0;
      let Mt = 0;
      let Dt = false;
      function Bt(n) {
        // KEYR EDIT
        let fakeKeyup = false;
        // ENDEDIT
        const e = n.code;
        if ((Oo || Po || So) && e === ct[Rn] && !wt[e]) {
          if (Oo) {
            Fi(false);
          }
          if (So) {
            Qi(false);
          }
          if (Po) {
            xr(false);
          }
        }
        if (document.activeElement.type !== "text") {
          if (!Oo && !wt[e] && e === ct[$n]) {
            if (So) {
              Qi(false);
            }
            if (Po) {
              xr(false);
            }
            Fi(true);
            n.preventDefault();
            return;
          }
          if (!Oo) {
            if (n.code === ct[Zn] && !wt[e]) {
              wr(!jo);
            }
            if (e === ct[Vn] && !wt[e]) {
              br(!Yo);
              Oc(Yo);
            }
          }
          if (e === ct[On] && !wt[e]) {
            Ic(2);
          }
          if (e === ct[Nn] && !wt[e]) {
            Ic(7);
            Ic(10);
            Ic(11);
          }
          // KEYR EDIT
          /*if (window.globalSettings.noSpikeOnReload.enabled) {
              if (n === Qt[_t] && n !== Qt[Mt] && !Ft[n]) { // custom key if custom key is not KeyR
                br(4);
              } else if (n === "KeyR" && !Ft[n]) { // KeyR and when custom key is KeyR
                if (!t.ctrlKey && !t.metaKey) {
                  br(4);
                } else {
                  Ft[n] = false; // set KeyR as released (keyup)
                  fakeKeyup = true; // dont set KeyR as down at the end of the function (!!!!!!!)
                }
              }
          } else {
              if (n === Qt[_t] && n !== Qt[Mt] && !Ft[n]) { // custom key if custom key is not KeyR
                br(4);
              } else if (n === "KeyR" && !Ft[n]) { // KeyR and when custom key is KeyR
                if (!t.ctrlKey && !t.metaKey) {
                  br(4);
                } else {
                  br(4);
                  Ft[n] = false; // set KeyR as released (keyup)
                  fakeKeyup = true; // dont set KeyR as down at the end of the function (!!!!!!!)
                }
              }
          }*/
          if (e === ct[Sn] && !wt[e] || e === ct[qn] && !wt[e]) {
            Ic(4);
          }
          // ENDEDIT
          if (e === ct[Kn] && !wt[e]) {
            Ic(5);
          }
          if (e === ct[Jn] && !wt[e]) {
            Ic(8);
          }
          if (e === ct[In] && !wt[e]) {
            Ic(9);
          }
          if (e !== "Space" && !isNaN(Number(n.key)) && !wt[e]) {
            if (Number(n.key) - 1 >= 0) {
              Zc(lo.hm[Number(n.key) - 1]);
            }
          }
          if (e === ct[Pn] && !wt[e]) {
            Sc(Xi());
          }
          if (e === ct[En] || e === ct[Wn]) {
            gt |= 1;
          }
          if (e === ct[Yn] || e === ct[Xn]) {
            gt |= 8;
          }
          if (e === ct[nt] && Ho) {
            Kc(Ho);
          }
          if (e === ct[jn] || e === ct[Qn]) {
            gt |= 4;
          }
          if (e === ct[Un] || e === ct[Fn]) {
            gt |= 2;
          }
          wt[e] = true;
        }
      }
      function Lt(n) {
        const t = n.code;
        if (t === ct[Pn]) {
          qc();
        }
        if (t === ct[Yn] || t === ct[Xn]) {
          gt &= -9;
        }
        if (t === ct[En] || t === ct[Wn]) {
          gt &= -2;
        }
        if (t === ct[jn] || t === ct[Qn]) {
          gt &= -5;
        }
        if (t === ct[Un] || t === ct[Fn]) {
          gt &= -3;
        }
        if (t === ct[nt]) {
          yt = false;
        }
        if (t === ct[tt] && !Oo) {
          if (So) {
            Qi(false);
          }
          Fi(false);
          xr(!Po);
        }
        if (t === ct[et] && !Oo) {
          if (Po) {
            xr(false);
          }
          Fi(false);
          Qi(!So);
        }
        if (t === ct[ot] && !Oo) {
          er();
        }
        if (t === ct[Rn] && Ur()) {
          hr(true);
        }
        wt[t] = false;
      }
      function Ct(n) {
        ht = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          ir(e.pageX, e.pageY);
          if (ur(Bo, Lo)) {
            break;
          }
          if (e.pageX < document.body.scrollWidth / 2 && dt.tu === -1) {
            dt.tu = e.identifier;
            dt.um = dt.fm = e.pageX;
            dt.am = dt.lm = e.pageY;
          } else if (e.pageX > document.body.scrollWidth / 2 && mt.tu === -1) {
            mt.tu = e.identifier;
            mt.um = mt.fm = e.pageX;
            mt.am = mt.lm = e.pageY;
          }
        }
      }
      function At(n) {
        ht = true;
        n.preventDefault();
        n.stopPropagation();
        for (let t of n.changedTouches) {
          if (t.identifier === dt.tu) {
            dt.fm = t.pageX;
            dt.lm = t.pageY;
          } else if (t.identifier === mt.tu) {
            mt.fm = t.pageX;
            mt.lm = t.pageY;
          }
        }
      }
      function pt(n) {
        ht = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          ir(e.pageX, e.pageY);
          if (ar(Bo, Lo)) {
            break;
          }
          if (e.identifier === dt.tu) {
            dt.tu = -1;
          } else if (e.identifier === mt.tu) {
            mt.tu = -1;
          }
        }
      }
      function Tt(n) {
        Qc(n);
        vt = n;
        Mt = 0;
      }
      function xt(n) {
        Dt = false;
        Pc(n);
      }
      function Ht(n) {
        Dt = true;
        Xc(n);
      }
      function kt(n) {
        Wc(n);
        zt = n;
        _t = 0;
      }
      function Gt(n) {
        ht = n;
      }
      function Et(n) {
        _t += n;
        Mt += n;
      }
      var Ut = function (n, e, o) {
        return {
          zh: 0,
          Mh: 0,
          width: e,
          height: o,
          ku: 0,
          rm: n,
          dm: function (n) {
            const o = this.rm;
            m().tm(n, o, this.zh, this.Mh, this.width, this.height);
          },
          gm: function (n, t, e) {
            if (m().vm(n, t, this.zh, this.Mh, this.width, this.height)) {
              this.ku = 1;
              return true;
            } else {
              this.ku = 0;
              return false;
            }
          }
        };
      };
      var Yt = o(6399);
      var jt = o.n(Yt);
      var Nt = {
        wm: [],
        bm: [],
        hm: [],
        ym: [],
        zm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        _m: [],
        Mm: {
          width: 400,
          height: 20,
          zh: 0,
          Mh: 0,
          Dm: 0,
          Bm: "#F2C39F",
          Lm: "#5D3A37",
          Cm: "#5D3A37",
          background: m().Am(400, 20, 10, "#5D3A37"),
          dm: function (n) {
            if (this.Lm && this.Lm !== this.Cm) {
              this.Cm = this.Lm;
              this.background = m().Am(this.width, this.height, 10, this.Lm);
            }
            n.drawImage(this.background, this.zh, this.Mh);
            n.beginPath();
            n.fillStyle = this.Bm || "#F2C39F";
            if (this.Dm) {
              m().pm(n, this.zh + 5, this.Mh + 5, (this.width - 10) * this.Dm, this.height - 10, 5);
            }
            n.fill();
          }
        },
        Tm: 0,
        ns: 0,
        xm: 0,
        Hm: -1,
        km: m().Gm("0", 24, "#AE4D57", "#222222"),
        Em: m().Gm("0", 24, "#935F3B", "#222222"),
        Um: m().Gm("0", 24, "#7B7A91", "#222222"),
        Ym: m().Gm("0", 24, "#FFD700", "#222222"),
        jm: m().Gm("0", 24, "#FFFFFF", "#222222"),
        Nm: m().Gm("0", 24, "#FFFFFF", "#222222"),
        Om: null,
        Pm: {
          Sm: -1,
          zm: 0,
          qm: m().Gm(" ", 23, ""),
          Km: m().Gm(" ", 23, ""),
          Jm: m().Gm(" ", 23, ""),
          Im: m().Gm(" ", 23, ""),
          Zm: m().Gm(" ", 23, ""),
          Vm: m().Gm(" ", 23, ""),
          Wm: m().Gm(" ", 23, ""),
          dm: function (n, t, e, o, r, c) {
            const u = W()[t];
            if (t !== this.Sm) {
              this.Sm = t;
              m().Xm(this.qm, u.js, 23, "#eec39d");
              m().Xm(this.Km, e + "/" + o, 23, "#fff");
              if (u.Fm) {
                m().Xm(this.Jm, "" + u.Fm[0], 23, "#ad4e56");
                m().Xm(this.Im, "" + u.Fm[1], 23, "#9c7e66");
                m().Xm(this.Zm, "" + u.Fm[2], 23, "#ffffff");
                m().Xm(this.Vm, "" + u.Fm[3], 23, "#e3b32c");
              }
              m().Xm(this.Wm, u.description, 23, "#fff");
              this.zm = e;
            } else if (this.zm !== e) {
              m().Xm(this.Km, e + "/" + o, 23, "#fff");
              this.zm = e;
            }
            const a = Math.max(this.qm.width + u.Qm === 2 ? this.Km.width : 0, u.Fm ? this.Jm.width + this.Im.width + this.Zm.width + this.Vm.width : 0, this.Wm.width) + 40;
            n.beginPath();
            n.fillStyle = "#4f403c";
            m().pm(n, r, c, a, u.Fm ? 150 : 110, 10);
            n.fill();
            c += 20;
            r += 20;
            n.drawImage(this.qm, r, c);
            if (u.Qm === 2) {
              n.drawImage(this.Km, r + this.qm.width, c);
            }
            if (u.Fm) {
              n.drawImage(this.Jm, r, c + 40);
              n.drawImage(this.Im, r + this.Jm.width, c + 40);
              n.drawImage(this.Zm, r + this.Jm.width + this.Im.width, c + 40);
              n.drawImage(this.Vm, r + this.Jm.width + this.Im.width + this.Zm.width, c + 40);
            }
            n.drawImage(this.Wm, r + 0, c + (u.Fm ? 80 : 40));
          }
        },
        Rm: function (n) {
          return Math.floor(n * 10) / 10;
        },
        $m: function (n) {
          if (n < 1000) {
            return n;
          } else if (n < 10000) {
            return this.Rm(n / 1000, 2) + "k";
          } else if (n < 1000000) {
            return Math.floor(n / 1000) + "k";
          } else if (n < 10000000) {
            return this.Rm(n / 1000000, 2) + "m";
          } else if (n < 1000000000) {
            return Math.floor(n / 1000000) + "m";
          } else {
            return Math.floor(n / 1000000000) + "b";
          }
        },
        ng: function (n, t, e, o) {
          if (this._m[jt().J] !== n) {
            m().Xm(this.km, this.$m(n), 24, "#AE4D57", "#222222");
          }
          if (this._m[jt().ko] !== t) {
            m().Xm(this.Em, this.$m(t), 24, "#935F3B", "#222222");
          }
          if (this._m[jt().Ho] !== e) {
            m().Xm(this.Um, this.$m(e), 24, "#7B7A91", "#222222");
          }
          if (this._m[jt().tn] !== o) {
            m().Xm(this.Ym, o + "", 24, "#FFD700", "#222222");
          }
          this._m[jt().J] = n;
          this._m[jt().ko] = t;
          this._m[jt().Ho] = e;
          this._m[jt().tn] = o;
        },
        tg: function (n) {
          const e = Math.floor(m().eg(this.xm));
          this.xm = n;
          const o = Math.floor(m().eg(this.xm));
          this.Mm.Dm = Math.floor((m().eg(this.xm) - o) * 100) / 100;
          if (e !== o) {
            this.Om = m().Xm(this.Om, "AGE " + o, 24, "#FFFFFF", "#222222");
          }
        },
        og: function (n) {
          this.jm = m().Xm(this.jm, n, 24, "#FFFFFF", "#222222");
          this.Tm = n;
        },
        ig: function () {
          this.ns = 0;
          this.Nm = m().Xm(this.Nm, this.ns, 24, "#FFFFFF", "#222222");
        },
        rg: function (n) {
          this.ns += n;
          this.Nm = m().Xm(this.Nm, this.ns, 24, "#FFFFFF", "#222222");
        },
        $s: function () {
          this.bm.length = 0;
          for (let n = 0; n < this.hm.length; n++) {
            this.bm.push(Ut(Z[W()[this.hm[n]].cg], 100, 100));
          }
        },
        sg: function () {
          this.wm.length = 0;
          for (let t = 0; t < this.ym.length; t++) {
            this.wm.push(Ut(Z[W()[this.ym[t]].cg], 100, 100));
          }
        }
      };
      const Ot = {
        ug: N.Cd(N.Md("leaderboard")),
        ca: null,
        ag: Ut(Z[P().Si], 38.5, 42.5),
        fg: true,
        zh: 0,
        Mh: 0,
        width: 250,
        height: 330,
        lg: [],
        hg: [],
        dm: function (n, t) {
          m().tm(n, this.ug, this.zh, this.Mh, this.width, this.height);
          for (let o = 0, i = this.lg; o < i.length; o++) {
            const r = t.dg[i[o]];
            n.drawImage(this.hg[o] ||= m().Gm(o + 1 + ".", c().mg, c().gg[o] ? c().gg[o] : c().vg, c().wg), this.zh + 8, this.Mh + 57 + o * 27);
            n.drawImage(r.bg ||= m().Gm(r.js, c().mg, c().vg, c().wg), this.zh + 40, this.Mh + 57 + o * 27);
            n.drawImage(r.yg ||= m().Gm(m().zg(r.$c), c().mg, c().vg, c().wg), this.zh + 40 + 145, this.Mh + 57 + o * 27);
          }
        },
        $s: function (n, t) {
          this.lg.length = 0;
          let e = [];
          for (let n = 0; n < t.length; n++) {
            e.push(t[n][0]);
          }
          this.lg = e;
        }
      };
      var Pt = Ot;
      var St = {
        ug: m().Gm("", 50, "#fff", "#222"),
        active: false,
        _g: 0,
        Mg: 0.7,
        Cf: function (n, t = 1) {
          if (this._g <= 0) {
            this._g = t;
          }
          m().Xm(this.ug, n, 50, "#fff", "#222");
        },
        $s: function (n) {
          this._g -= n * this.Mg;
          if (this._g < 0) {
            this._g = 0;
          }
        }
      };
      o(9435);
      const qt = function () {
        this.ys = function (n, e, o, i, r, c) {
          this.zh = n;
          this.Mh = e;
          this.Dg = c;
          this.Mg = o;
          this._g = 400;
          this.Bg = Math.random() > 0.5 ? 1 : -1;
          this.ug = this.ug ? m().Xm(this.ug, r, 45, this.Dg) : m().Gm(r, 35, this.Dg);
          this.scale = 1;
          this.Lg = this.scale;
          this.Cg = 2.5;
          this.Ag = 0.02;
          this.Mg = 0.18;
        };
        this.$s = function (n) {
          if (this._g) {
            this._g -= n;
            this.Mh -= this.Mg * n;
            this.scale += this.Ag * n;
            if (this.scale >= this.Cg) {
              this.scale = this.Cg;
              this.Ag *= -1;
            } else if (this.scale <= this.Lg) {
              this.scale = this.Lg;
              this.Ag = 0;
            }
            if (this._g <= 0) {
              this._g = 0;
            }
          }
        };
        this.yu = function (n) {
          const o = this.ug;
          const i = this.scale;
          n.globalAlpha = i;
          n.drawImage(o, this.zh - i * o.width / 2, this.Mh - i * (o.height / 2), o.width * i, i * o.height);
          n.globalAlpha = 1;
        };
      };
      const Kt = function () {
        this.ys = function (n, t) {
          this.parent = t;
          this._g = 3000;
          if (this.ug) {
            m().Xm(this.ug, n, 25, "#fff", null, null, "rgba(0,0,0,.25)", 5);
          } else {
            this.ug = m().Gm(n, 25, "#fff", null, null, "rgba(0,0,0,.25)", 5);
          }
        };
        this.yu = function (n, e) {
          if (this._g) {
            this._g -= e;
          }
          if (this._g < 0) {
            this._g = 0;
            this.parent = null;
            return;
          }
          const i = this.ug;
          const r = this.parent;
          n.drawImage(i, r.zh - i.width / 2, r.Mh - i.height / 2 - 120);
        };
      };
      var Jt = o(9281);
      var It = o.n(Jt);
      var Zt = o(5599);
      var Vt = o.n(Zt);
      var Wt = o(2936);
      var Xt = o.n(Wt);
      function Ft(n, t, e, o, r, c) {
        n.beginPath();
        n.arc(t, e, r, 0, Math.PI * 2);
        n.fillStyle = "#313131";
        n.fill();
        n.beginPath();
        n.arc(t, e, o, 0, Math.PI * 2);
        n.fillStyle = c;
        n.fill();
      }
      const Qt = {
        [u().zn]: null,
        [u().Tn]: null,
        [u().xn]: null,
        [u().Hn]: null,
        [u().Gn]: null,
        [u().qn]: null,
        [u().En]: null
      };
      var Rt = Qt;
      o(9882);
      const $t = {
        SFRA: ["EU#1 Frankfurt", 1],
        SFRA2: ["EU#2 Frankfurt", 1],
        SFRA2BIS: ["EU#2 Frankfurt", 1],
        SCA: ["USA#1 California", 1],
        SCA2: ["USA#2 California", 1],
        SGP: ["AS#1 Singapore", 1],
        SGP2: ["AS#2 Singapore", 1],
        SGP3: ["AS#3 Singapore", 1],
        SGP3BIS: ["AS#3 Singapore", 1],
        FRA1FFA: ["EU#1 Frankfurt", 0],
        CA1FFA: ["USA#1 California", 0],
        SGP1FFA: ["AS#1 Singapore", 0],
        CA1EVENT: ["USA#1 California", 2],
        FR1EVENT: ["EU#1 Frankfurt", 2],
        BRSGP: ["BR Singapore1", 3],
        BRSG2: ["BR Singapore2", 0],
        BRSCA: ["BR California 1", 3],
        BRSCA2: ["BR California 2", 0],
        BRFRA: ["BR Frankfurt 1", 0],
        BRFRA2: ["BR Frankfurt 2", 0]
      };
      function ne(n, t) {
        this.region = n;
        this.index = t;
        this.ping = 9999;
        this.url = "https://" + n + ".sploop.io/ping";
        let o = this;
        let r = +new Date();
        var c = new XMLHttpRequest();
        c.open("GET", this.url, true);
        c.onreadystatechange = function () {
          if (this.readyState === 4 && !this.ping) {
            o.ping = +new Date() - r;
          }
        };
        try {
          c.send(null);
        } catch (n) {}
      }
      var te = o(9282);
      var ee = o.n(te);
      var oe = o(7160);
      var ie = o.n(oe);
      var re = o(9657);
      var ce = o.n(re);
      var se = o(3424);
      var ue = o.n(se);
      var ae = o(3543);
      var fe = o.n(ae);
      var le = o(2190);
      var he = o.n(le);
      var de = o(6078);
      var me = o.n(de);
      var ge = o(5299);
      var ve = o.n(ge);
      const we = Object.create(null);
      var be = function (n) {
        if (!n) {
          return null;
        }
        const e = Y.default.Kd(n);
        if (!e || e.charAt(0) === "#") {
          return null;
        }
        let o = we[n];
        if (o && o.url === e) {
          return o.Es;
        }
        o = {
          url: e,
          Es: null
        };
        we[n] = o;
        const r = new Image();
        r.crossOrigin = "anonymous";
        r.onload = function () {
          if (r.width && r.height) {
            o.Es = r;
          }
        };
        r.onerror = function () {
          o.Es = null;
        };
        r.src = e;
        return null;
      };
      var ye = function (n) {
        if (!n) {
          return null;
        }
        const e = Y.default.Kd(n);
        if (typeof e == "string" && e.charAt(0) === "#") {
          return e;
        } else {
          return null;
        }
      };
      function ze(n, t) {
        return {
          key: "img/entity/" + n + ".png",
          js: t,
          src: "/img/entity/" + n + ".png",
          control: "image"
        };
      }
      function _e(n, t) {
        return {
          key: "img/items/" + n + ".png",
          js: t,
          src: "/img/items/" + n + ".png",
          control: "image"
        };
      }
      function Me(n, t) {
        return {
          key: "img/skins/" + n + ".png",
          js: t,
          src: "/img/skins/" + n + ".png",
          control: "image"
        };
      }
      function De(n, t) {
        return {
          key: "img/entity/" + n + ".png",
          js: t,
          src: "/img/entity/" + n + ".png",
          control: "image"
        };
      }
      function Be(n, t, e) {
        return {
          key: n,
          js: t,
          pg: e,
          control: "biome"
        };
      }
      function Le(n, t, e) {
        return {
          key: n,
          js: t,
          pg: e,
          control: "color"
        };
      }
      function Ce(n, t, e, o, i) {
        return {
          key: n,
          js: t,
          Tg: e,
          min: o,
          max: i,
          control: "number"
        };
      }
      function Ae(n, t, e, o, r, c) {
        return {
          key: n,
          js: t,
          Tg: e,
          min: o,
          max: r,
          step: c,
          control: "range"
        };
      }
      var pe = [{
        tu: "resources",
        xg: "Resources",
        Hg: [ze("tree", "Tree"), ze("palm_tree", "Palm Tree"), ze("cherry_tree", "Cherry Tree"), ze("bush", "Bush"), ze("cactus", "Cactus"), ze("rock", "Rock"), ze("cave_stone0", "Cave Stone I"), ze("cave_stone1", "Cave Stone II"), ze("cave_stone2", "Cave Stone III"), ze("ice0", "Ice I"), ze("ice1", "Ice II"), ze("gold", "Gold"), ze("ruby", "Ruby")]
      }, {
        tu: "hats",
        xg: "Hats",
        Hg: [_e("berry_farm", "Bush Hat"), ze("hat_1", "Berserker Gear"), ze("hat_2", "Jungle Gear"), ze("hat_3", "Crystal Gear"), ze("hat_4", "Spike Gear"), ze("hat_5", "Immunity Gear"), ze("hat_6", "Boost Hat"), ze("hat_7", "Apple Hat"), ze("hat_8", "Scuba Gear"), ze("hat_9", "Hood"), ze("hat_10", "Pumpkin King's Curse"), ze("hat_11", "Demolist"), ze("hat_14", "Winter Hat"), ze("skid_hat", "Skid Hat")]
      }, {
        tu: "weapons",
        xg: "Weapons",
        Hg: [ze("stone_sword", "Stone Sword"), De("inv_stone_sword", "Stone Sword Icon"), _e("g_sword", "Gold Sword"), _e("d_sword", "Diamond Sword"), _e("r_sword", "Ruby Sword"), ze("s_dagger", "Stone Dagger"), De("inv_s_dagger", "Stone Dagger Icon"), _e("g_dagger", "Gold Dagger"), De("inv_g_dagger", "Gold Dagger Icon"), _e("d_dagger", "Diamond Dagger"), De("inv_d_dagger", "Diamond Dagger Icon"), _e("c_dagger", "Crystal Dagger"), De("inv_c_dagger", "Crystal Dagger Icon"), ze("r_dagger", "Ruby Dagger"), De("inv_r_dagger", "Ruby Dagger Icon"), ze("katana", "Katana"), De("inv_katana", "Katana Icon"), _e("g_katana", "Gold Katana"), De("inv_g_katana", "Gold Katana Icon"), _e("d_katana", "Diamond Katana"), De("inv_d_katana", "Diamond Katana Icon"), _e("c_katana", "Crystal Katana"), De("inv_c_katana", "Crystal Katana Icon"), ze("stone_spear", "Stone Spear"), De("inv_stone_spear", "Stone Spear Icon"), _e("g_spear", "Gold Spear"), De("inv_g_spear", "Gold Spear Icon"), _e("d_spear", "Diamond Spear"), De("inv_d_spear", "Diamond Spear Icon"), _e("r_spear", "Ruby Spear"), De("inv_r_spear", "Ruby Spear Icon"), ze("cut_spear", "Stone Cut Spear"), De("inv_cut_spear", "Stone Cut Spear Icon"), _e("g_cutspear", "Gold Cut Spear"), De("inv_g_cutspear", "Gold Cut Spear Icon"), _e("d_cutspear", "Diamond Cut Spear"), De("inv_d_cutspear", "Diamond Cut Spear Icon"), _e("r_cutspear", "Ruby Cut Spear"), De("inv_r_cutspear", "Ruby Cut Spear Icon"), ze("stone_axe", "Stone Axe"), De("inv_stone_axe", "Stone Axe Icon"), _e("g_axe", "Gold Axe"), De("inv_g_axe", "Gold Axe Icon"), _e("d_axe", "Diamond Axe"), De("inv_d_axe", "Diamond Axe Icon"), _e("r_axe", "Ruby Axe"), De("inv_r_axe", "Ruby Axe Icon"), ze("great_axe", "Stone Great Axe"), De("inv_great_axe", "Stone Great Axe Icon"), _e("g_great_axe", "Gold Great Axe"), De("inv_g_great_axe", "Gold Great Axe Icon"), _e("d_great_axe", "Diamond Great Axe"), De("inv_d_great_axe", "Diamond Great Axe Icon"), _e("r_great_axe", "Ruby Great Axe"), De("inv_r_great_axe", "Ruby Great Axe Icon"), ze("stone_toolhammer", "Stone Toolhammer"), De("inv_stone_toolhammer", "Stone Toolhammer Icon"), _e("g_toolhammer", "Gold Toolhammer"), De("inv_g_toolhammer", "Gold Toolhammer Icon"), _e("d_toolhammer", "Diamond Toolhammer"), De("inv_d_toolhammer", "Diamond Toolhammer Icon"), _e("r_toolhammer", "Ruby Toolhammer"), De("inv_r_toolhammer", "Ruby Toolhammer Icon"), ze("hammer", "Stone Hammer"), De("inv_hammer", "Stone Hammer Icon"), ze("g_hammer", "Gold Hammer"), De("inv_g_hammer", "Gold Hammer Icon"), ze("d_hammer", "Diamond Hammer"), De("inv_d_hammer", "Diamond Hammer Icon"), ze("r_hammer", "Ruby Hammer"), De("inv_r_hammer", "Ruby Hammer Icon"), _e("bat", "Stone Bat"), De("inv_bat", "Stone Bat Icon"), ze("g_bat", "Gold Bat"), De("inv_g_bat", "Gold Bat Icon"), ze("d_bat", "Diamond Bat"), De("inv_d_bat", "Diamond Bat Icon"), ze("r_bat", "Ruby Bat"), De("inv_r_bat", "Ruby Bat Icon"), ze("stick", "Stone Stick"), De("inv_stick", "Stone Stick Icon"), _e("g_stick", "Gold Stick"), De("inv_g_stick", "Gold Stick Icon"), _e("d_stick", "Diamond Stick"), De("inv_d_stick", "Diamond Stick Icon"), _e("r_stick", "Ruby Stick"), De("inv_r_stick", "Ruby Stick Icon"), ze("s_healing_staff", "Stone Healing Staff"), De("inv_s_healing_staff", "Stone Healing Staff Icon"), _e("g_healing_staff", "Gold Healing Staff"), De("inv_g_healing_staff", "Gold Healing Staff Icon"), _e("d_healing_staff", "Diamond Healing Staff"), De("inv_d_healing_staff", "Diamond Healing Staff Icon"), _e("r_healing_staff", "Ruby Healing Staff"), De("inv_r_healing_staff", "Ruby Healing Staff Icon"), _e("scythe", "Scythe"), De("inv_scythe", "Scythe Icon"), _e("meme", "Meme"), De("inv_meme", "Meme Icon"), ze("s_musket", "Musket"), De("inv_musket", "Musket Icon"), ze("bow", "Bow"), De("inv_bow", "Bow Icon"), ze("Xbow", "Crossbow"), De("inv_xbow", "Crossbow Icon"), ze("arrow", "Arrow"), _e("pearl", "Pearl"), De("inv_pearl", "Pearl Icon"), ze("shield", "Shield"), De("inv_stone_shield", "Shield Icon"), ze("apple", "Apple"), De("inv_apple", "Apple Icon"), ze("cookie", "Cookie"), De("inv_cookie", "Cookie Icon")]
      }, {
        tu: "animals",
        xg: "Animals",
        Hg: [Me("body0", "Player Body"), Me("arm0", "Player Hands"), ze("cow", "Cow"), ze("gcow", "Golden Cow"), ze("wolf", "Wolf"), ze("shark", "Shark"), ze("duck", "Duck"), ze("crocodile", "Crocodile"), ze("tornado", "Tornado"), ze("mammoth_body", "Mammoth Body"), ze("mammoth_head", "Mammoth Head"), ze("mammoth_head_angry", "Mammoth Head (Angry)"), ze("mammoth_tail", "Mammoth Tail"), ze("dragon_2_body", "Dragon Body"), ze("dragon_2_head", "Dragon Head"), ze("dragon_2_left_wing", "Dragon Left Wing"), ze("dragon_2_right_wing", "Dragon Right Wing"), ze("fireball", "Fireball"), ze("bullet", "Bullet"), ze("cannonball", "Cannonball")]
      }, {
        tu: "buildings",
        xg: "Buildings",
        Hg: [ze("wall", "Wood Wall"), De("inv_wood_wall", "Wood Wall Icon"), ze("castle_wall", "Stone Wall"), De("inv_castle_wall", "Stone Wall Icon"), ze("spike", "Spike"), De("inv_spike", "Spike Icon"), ze("big_spike", "Big Spike"), De("inv_big_spike", "Big Spike Icon"), ze("hard_spike", "Hard Spike"), De("inv_hard_spike", "Hard Spike Icon"), ze("trap", "Trap"), De("inv_trap", "Trap Icon"), ze("boost", "Boost Pad"), De("inv_boost", "Boost Pad Icon"), ze("platform", "Platform"), De("inv_platform", "Platform Icon"), ze("heal_pad", "Heal Pad"), De("inv_heal_pad", "Heal Pad Icon"), ze("windmill", "Windmill"), De("inv_windmill", "Windmill Icon"), ze("windmill_base", "Windmill Base"), ze("windmill_top", "Windmill Top"), ze("windmill_assembled", "Windmill (Assembled)"), ze("turret_base", "Turret Base"), ze("turret_top", "Turret Top"), ze("turret_assembled", "Turret (Assembled)"), De("inv_turret", "Turret Icon"), ze("bed", "Bed"), De("inv_bed", "Bed Icon"), ze("roof", "Roof"), De("inv_roof", "Roof Icon"), ze("teleporter", "Teleporter"), De("inv_teleporter", "Teleporter Icon"), ze("ice_spike", "Ice Spike"), De("inv_ice_spike", "Ice Spike Icon"), ze("wood_farm", "Wood Farm"), De("inv_wood_farm", "Wood Farm Icon"), ze("wood_farm_cherry", "Cherry Farm"), De("inv_wood_farm_cherry", "Cherry Farm Icon"), ze("stone_farm", "Stone Farm"), De("inv_stone_farm", "Stone Farm Icon"), De("inv_bush", "Berry Farm Icon"), ze("chest", "Chest"), ze("lootbox", "Lootbox")]
      }, {
        tu: "backgrounds",
        xg: "Backgrounds",
        Hg: [Be("snow_background_texture", "Snow Biome", "#ece5db"), Be("plains_background_texture", "Plains Biome", "#788F57"), Be("beach_background_texture", "Beach Biome", "#fcefbb"), Be("river_background_texture", "River / Ocean Biome", "#2a8b9b"), Be("desert_background_texture", "Desert Biome", "#b38354"), Le("oob_color", "Out of Bounds", "#81aa4a"), Ce("grid_cell_width", "Grid Cell Width", 80, 10, 400), Ce("grid_cell_height", "Grid Cell Height", 80, 10, 400), Ae("grid_opacity", "Grid Opacity", 0.06, 0, 1, 0.01), Le("grid_color", "Grid Colour", "#000000")]
      }, {
        tu: "shadows",
        xg: "Shadows",
        Hg: [Ae("shadow_offset_x", "Offset X (px)", 10, -50, 50, 1), Ae("shadow_offset_y", "Offset Y (px)", 7, -50, 50, 1), Ae("shadow_darkness", "Darkness", 0.35, 0, 1, 0.05), Le("shadow_color", "Shadow Colour", "#000000"), Ae("shadow_blur", "Blur (px)", 0, 0, 20, 1)]
      }, {
        tu: "hud",
        xg: "HUD",
        Hg: [{
          key: "hud_font",
          js: "HUD Font",
          control: "font"
        }, Le("healthbar_player_color", "Player Healthbar", "#a4cc4f"), Le("healthbar_enemy_color", "Enemy Healthbar", "#cc5151"), Le("healthbar_bg_color", "Healthbar Background", "#3a4030"), Le("damage_color", "Damage Number", "#ffffff"), Le("heal_color", "Heal Number", "#8ecc51"), Le("player_name_color", "Player Name", "#ffffff"), Le("mob_name_color", "Mob Name", "#ffffff"), Le("clan_tag_color", "Clan / Team Tag", "#96c949"), Le("age_color", "Age / Score", "#ffffff"), Le("name_outline_color", "Name Outline", "#222222"), Ce("name_outline_width", "Name Outline Width", 7, 0, 20), Le("age_bar_color", "Age Gauge Fill", "#f2c39f"), Le("age_bar_bg_color", "Age Gauge Background", "#5d3a37"), Le("minimap_dot_color", "Minimap Dots", "#ffffff"), Le("minimap_self_color", "Minimap (You)", "#3bd1ff"), Le("collision_color", "Collision Outline", "#ff3b3b"), Ae("collision_opacity", "Collision Opacity", 0.6, 0, 1, 0.05), Ce("collision_width", "Collision Width", 3, 1, 20), {
          key: "collision_follow_shake",
          js: "Collision Follows Shake",
          Tg: false,
          control: "checkbox"
        }, ze("map", "Minimap"), ze("team_crown", "Crown"), ze("resource_background", "Resource Disc"), ze("skull", "Death Skull"), ze("toggle-button-out1", "Top-Right Button"), ze("leaderboard", "Leaderboard Background"), ze("close_button_out", "Leaderboard Icon"), ze("clan_button_out", "Clan Icon"), ze("hat_button_out", "Hat Icon"), ze("chat_button_out", "Chat Icon")]
      }];
      "contentWindow";
      "iframe";
      [].pop.constructor("return this")();
      "document";
      "createElement";
      "body";
      "appendChild";
      "display";
      "style";
      "none";
      "WebSocket";
      var Te = o(9629);
      var xe = o.n(Te);
      o(9082);
      o(1872);
      o(9605);
      o(6820);
      o(7644);
      const He = [u().yn, u().Mn];
      let ke = 1;
      let Ge = WebSocket;
      let Ee = null;
      let Ue = {};
      function Ye(n) {
        if (Ee && Ee.readyState === 1) {
          if (typeof n != "string" && c().kg !== 1) {
            k(n);
          }
          Ee.send(n);
        }
      }
      Ue.ys = function () {};
      Ue.encode = function () {
        while (true);
      };
      Ue.decode = null;
      window.____ = Ue;
      Date.now();
      let je = function () {
        var t = Object.prototype.toString;
        var e = Function.prototype.toString;
        var o = /^\[object .+?Constructor\]$/;
        var r = RegExp("^" + (t + "").replace(/[.*+?^${}()|[\]\/\\]/g, "\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function c(i) {
          var s = typeof i;
          if (s == "function") {
            return r.test(e.call(i));
          } else {
            return i && s == "object" && o.test(t.call(i)) || false;
          }
        }
        let s = c + "" + Math.random();
        c["toString"] = () => s;
        return c;
      }();
      function Ne() {
        while (!je(Ge));
      }
      const Oe = Ne + "";
      Ne["toString"] = () => Oe + Math.floor(Math.random() * 10);
      setTimeout(Ne, 7000 + Math.random() * 10000);
      setTimeout(() => Ne(), 7000 + Math.random() * 10000);
      setTimeout(function () {
        Ne();
      }, 7000 + Math.random() * 10000);
      Ne();
      let Pe = 236891;//null;
      function Se(n) {
        return n.map(n => String.fromCharCode(n)).join("");
      }
      /*if (typeof EXTERNAL == "function") {
        Pe = U(EXTERNAL, GLOB);
      }*/
      const qe = new TextDecoder();
      const Ke = Se([119, 115, 115]);
      const Je = Se([119, 115]);
      const Ie = Se([58, 47, 47]);
      const Ze = Se([47, 119, 115]);
      const Ve = Number(Se([52, 52, 51]));
      const We = Se([58]);
      function Xe(n) {
        let t = 0;
        for (let e = 0; e < n.length; e++) {
          t += n[e];
        }
        return t / n.length;
      }
      function Fe(n) {
        const e = n.length;
        const o = Xe(n);
        return Math.sqrt(n.map(n => Math.pow(n - o, 2)).reduce((n, t) => n + t) / e);
      }
      const Qe = new TextEncoder();
      let Re = document.getElementById("game-canvas");
      let $e = Re.getContext("2d");
      let no = false;
      let to = Pe;
      let eo = 0;
      let oo = null;
      let io = 1;
      let ro = {
        zh: 0,
        Mh: 0,
        w: 0,
        ed: 0
      };
      let co = null;
      let so = new function () {
        this.Gg = [];
        this.Eg = [];
        this.Ug = [];
        this.Yg = function (n, e) {
          const i = Z[P().vi];
          const r = Si - i.$d.im - 10;
          let c = 0;
          let s = 0;
          for (var u = 0; u < this.Ug.length; ++u) {
            const n = this.Ug[u];
            if (n._g && c < 5) {
              c++;
              s = Math.max(n.text.length, s);
            }
          }
          if (c) {
            n.fillStyle = "rgba(0, 0, 0, .1)";
            n.fillRect(10, r - (c + 1) * 50 + 20, s * 11, c * 50 + 5);
          }
          n.font = "20px " + m().jg();
          n.fillStyle = "white";
          let a = 0;
          for (u = 0; u < this.Ug.length;) {
            const t = this.Ug[u];
            if (t._g) {
              t._g -= e * 1000;
              if (t._g < 0) {
                t._g = 0;
              }
              if (a < c) {
                n.fillText(t.text, 10, r - (c - a) * 50);
              }
              a++;
              u++;
            } else {
              this.Ug.shift();
            }
          }
        };
        this.$s = function (n, t) {
          for (var e = 0; e < this.Gg.length; ++e) {
            if (this.Gg[e]._g) {
              this.Gg[e].$s(t);
              this.Gg[e].yu(n);
            }
          }
          for (let e, o = 0; o < this.Eg.length; o++) {
            e = this.Eg[o];
            if (e._g) {
              e.yu(n, t);
            }
          }
        };
        this.Ng = function (n, t, e, o, i, r, c) {
          var s;
          for (var u = 0; u < this.Gg.length; ++u) {
            if (!this.Gg[u]._g) {
              s = this.Gg[u];
              break;
            }
          }
          if (!s) {
            s = new qt();
            this.Gg.push(s);
          }
          s.ys(n, t, e, o, i, r, c);
        };
        this.Og = function (n, t) {
          let e = {
            _g: 5000,
            text: t
          };
          this.Ug.push(e);
        };
        this.Pg = function (n, e) {
          var i;
          for (var r = 0; r < this.Eg.length; ++r) {
            if (!this.Eg[r]._g || this.Eg[r].parent && this.Eg[r].parent.tu === e.tu) {
              i = this.Eg[r];
              break;
            }
          }
          if (!i) {
            i = new Kt();
            this.Eg.push(i);
          }
          i.ys(n, e);
        };
      }();
      let uo = new function () {
        this.zh = c().Sg / 2;
        this.Mh = c().qg / 2;
        this.Kg = 0;
        this.Jg = "D";
        this.Jg += "s";
        this.Jg += "y";
        this.Jg += "n";
        this.Jg += "c";
        this.Ig = Nr + "";
        this.Ig = this.Ig.indexOf(this.Jg);
        this.Zg = "r";
        this.Zg += "e";
        this.Zg += "p";
        this.Zg += "e";
        this.Zg += "a";
        this.Zg += "t";
        this.Zg += "e";
        this.Zg += "r";
        this.Vg = "W";
        this.Vg += "S";
        this.Vg += "S";
        this.Vg += "e";
        this.Vg += "r";
        this.Vg += "v";
        this.Vg += "e";
        this.Vg += "r";
        this.Vg += "s";
        this.Wg = "a";
        this.Wg += "l";
        this.Wg += "l";
        this.Wg += "i";
        this.Wg += "e";
        this.Wg += "s";
        this.Xg = function (n, t) {
          this.zh = n;
          this.Mh = t;
          this.Jd = 0;
          this.Id = 0;
        };
        this.$s = function (n, e, o) {
          o *= 1000;
          let r = m().Fg(this.zh, this.Mh, n, e);
          let c = m().Qg(this.zh, this.Mh, n, e);
          let s = Math.min(r * 0.01 * o, r);
          if (s > 0.01) {
            this.zh += s * Math.cos(c);
            this.Mh += s * Math.sin(c);
          } else {
            this.zh = n;
            this.Mh = e;
          }
          this.Jd = n - this.zh | 0;
          this.Id = e - this.Mh | 0;
          if (this.Ig !== -1 || window[this.Zg] !== undefined || window[this.Jg] !== undefined || window[this.Wg] !== undefined || window[this.Vg] !== undefined) {
            this.Kg++;
            if (this.Kg >= 1000) {
              this.zh = undefined;
            }
          }
        };
      }();
      let ao = new function () {
        this.dg = [];
        this.Rg = function (n, t, e) {
          this.dg[n] = {
            tu: n,
            js: t,
            $c: e,
            $g: false,
            xg: null,
            bg: null,
            yg: null
          };
        };
        this.nv = function (n) {
          this.dg[n].js = "";
          this.dg[n].$c = 0;
          this.dg[n].$g = false;
        };
        this.tv = function (n, t, e, o) {
          this.dg[n].js = t;
          this.dg[n].$c = e;
          this.dg[n].$g = o;
          this.dg[n].xg = null;
          this.dg[n].bg = null;
          this.dg[n].yg = null;
        };
        this.ev = function (n, t) {
          this.dg[n].$c = t;
          if (this.dg[n].yg) {
            m().Xm(this.dg[n].yg, m().zg(t), c().mg, c().vg, c().wg);
          }
        };
      }();
      let fo = new function () {
        this.ys = function () {
          this.ov = [];
          this.iv = [];
        };
        this.rv = [Ut(Z[P().Yr], 107, 107), Ut(Z[P().jr], 107, 107)];
        this.ov = [];
        this.cv = function () {
          this.ov.length = 0;
        };
        this.sv = function (n) {
          this.ov.push(n);
        };
        this.iv = [];
        this.uv = function (n, t) {
          this.iv[n] = {
            js: t,
            active: false,
            xg: null,
            Eh: 0
          };
        };
        this.av = function (n) {
          this.iv[n].xg = null;
          this.iv[n].js = "";
          this.iv[n].active = false;
          this.iv[n].Eh = 0;
        };
        this.fv = function (n, t, e) {
          this.iv[n].Eh = t;
          this.iv[n].js = e;
          this.iv[n].active = true;
          this.iv[n].xg = null;
        };
      }();
      let lo = Nt;
      let ho = St;
      let mo = Pt;
      let go = new function () {
        this.ys = function () {
          this.lv = [];
          this.hv = null;
          this.dv = null;
        };
        this.mv = function (n) {
          this.dv = n;
        };
        this.gv = function () {
          this.dv = null;
        };
        this.vv = function () {
          this.lv.length = 0;
        };
        this.wv = function (n, t) {
          if (this.hv) {
            this.hv.zh = n;
            this.hv.Mh = t;
          } else {
            this.hv = new (Xt())(n, t);
          }
        };
        this.bv = function (n, t) {
          this.lv.push([n, t]);
        };
        this.yv = function (n) {
          const o = Z[P().vi];
          const i = Z[P().Ji];
          const r = Z[P().ec];
          const s = Si - o.$d.im;
          n.translate(5, s - 5);
          m().tm(n, o, 0, 0, o.$d.om, o.$d.im);
          const u = Y.default.Kd("minimap_dot_color");
          for (let t = 0; t < this.lv.length; t++) {
            const e = o.$d.om * this.lv[t][0];
            const r = o.$d.im * this.lv[t][1];
            if (u) {
              Ft(n, e, r, 6, 8, u);
            } else {
              m().tm(n, i, e - i.$d.om / 2, r - i.$d.im / 2, i.$d.om, i.$d.im);
            }
          }
          if (this.dv) {
            let t = Z[P().Ni];
            let e = this.dv;
            m().tm(n, t, o.$d.om * e.zh - t.$d.om / 2, o.$d.im * e.Mh - t.$d.im / 2, t.$d.om, t.$d.im);
          }
          if (po) {
            let t = w.get(po);
            if (t) {
              const i = Y.default.Kd("minimap_self_color");
              const s = o.$d.om * t.zh / c().Sg;
              const u = o.$d.im * t.Mh / c().qg;
              if (i) {
                Ft(n, s, u, 5.5, 9, i);
              } else {
                m().tm(n, r, s - r.$d.om / 2, u - r.$d.im / 2, r.$d.om, r.$d.im);
              }
            }
          }
          if (this.hv) {
            let t = Z[P().Yi];
            let e = this.hv;
            m().tm(n, t, o.$d.om * e.zh / c().Sg - t.$d.om / 2, o.$d.im * e.Mh / c().qg - t.$d.im / 2, t.$d.om, t.$d.im);
          }
          if (bo.yu) {
            const t = o.$d.om;
            const i = o.$d.im;
            const r = t / c().Sg;
            const s = i / c().qg;
            n.globalAlpha = 0.3;
            n.fillStyle = "red";
            n.fillRect(0, 0, t, bo.zv * s);
            n.fillRect(0, 0, bo._v * r, i);
            const u = i - bo.Mv * s;
            const a = t - bo.Dv * r;
            n.fillRect(0, bo.Mv * s, t, u);
            n.fillRect(bo.Dv * r, 0, a, i);
            n.globalAlpha = 0.7;
            n.strokeStyle = "#fff";
            const f = bo.Bv - bo.Lv;
            const l = bo.Cv - bo.Av;
            n.strokeRect(bo.Lv * r, bo.Av * s, f * r, l * s);
            n.globalAlpha = 1;
          }
          n.translate(-5, 5 - s);
        };
        this.ys();
      }();
      let vo = new function (n) {
        const e = this;
        const o = q().get("ffa-mode");
        const r = q().get("sandbox-mode");
        const c = q().get("battleroyale-mode");
        const s = q().get("event-mode");
        const u = q().get("server-select");
        let a = o;
        function f(n) {
          u.innerHTML = "";
          const t = e.pv;
          for (let e = 0; e < t.length; e++) {
            const o = t[e];
            const i = o.r;
            const r = $t[i];
            if (r[1] !== n) {
              continue;
            }
            const c = o.d;
            c[0];
            const s = c[1];
            Cr(r[0], 0, s, i);
          }
        }
        function l() {
          if (a === o) {
            return 0;
          } else {
            a = o;
            r.classList.remove("dark-blue-button-5-active");
            s.classList.remove("dark-blue-button-5-active");
            c.classList.remove("dark-blue-button-5-active");
            o.classList.add("dark-blue-button-5-active");
            f(0);
            return 1;
          }
        }
        function h() {
          if (a === r) {
            return 0;
          } else {
            a = r;
            o.classList.remove("dark-blue-button-5-active");
            s.classList.remove("dark-blue-button-5-active");
            c.classList.remove("dark-blue-button-5-active");
            r.classList.add("dark-blue-button-5-active");
            f(1);
            return 1;
          }
        }
        function d() {
          if (a === s) {
            return 0;
          } else {
            a = s;
            r.classList.remove("dark-blue-button-5-active");
            o.classList.remove("dark-blue-button-5-active");
            s.classList.remove("dark-blue-button-5-active");
            c.classList.remove("dark-blue-button-5-active");
            s.classList.add("dark-blue-button-5-active");
            f(2);
            return 1;
          }
        }
        function g() {
          const o = Math.floor(Math.random() * Mi.options.length);
          Mi.selectedIndex = o;
          const i = Mi.options[o].getAttribute("region");
          e.Tv(i);
        }
        function v() {
          l();
          g();
          tc(0);
        }
        function w() {
          if (a !== c) {
            a = c;
            r.classList.remove("dark-blue-button-5-active");
            s.classList.remove("dark-blue-button-5-active");
            o.classList.remove("dark-blue-button-5-active");
            c.classList.add("dark-blue-button-5-active");
            f(3);
          }
          g();
          tc(0);
        }
        function b() {
          h();
          g();
          tc(0);
        }
        function y(n) {
          const i = [0, 0];
          const r = e.pv;
          for (let t = 0; t < r.length; t++) {
            const e = r[t].r;
            const o = $t[e][1];
            if (e === n.region) {
              if (o === 1) {
                h();
              } else if (o === 0) {
                l();
              } else if (o === 2) {
                d();
              }
              Mi.selectedIndex = i[o];
              return;
            }
            i[o] += 1;
          }
        }
        o.addEventListener("click", function () {
          if (a !== o) {
            if (eo === 1) {
              const n = q().vs["progress-loss"];
              n.next = v;
              n.show();
            } else {
              v();
            }
          }
        });
        c.addEventListener("click", function () {
          if (a !== c) {
            if (eo === 1) {
              const n = q().vs["progress-loss"];
              n.next = w;
              n.show();
            } else {
              w();
            }
          }
        });
        r.addEventListener("click", function () {
          if (a !== r) {
            if (eo === 1) {
              const n = q().vs["progress-loss"];
              n.next = v;
              n.show();
            } else {
              b();
            }
          }
        });
        s.addEventListener("click", function () {
          if (a !== s) {
            if (eo === 1) {
              const t = q().vs["progress-loss"];
              if (a === o) {
                t.next = v;
              } else if (a === r) {
                t.next = b;
              }
              t.show();
            } else {
              d();
              g();
              tc(0);
            }
          }
        });
        this.pv = [];
        this.xv = null;
        this.Hv = function () {
          q().ou("Loading Sploop.io");
          let e = this;
          var o = new XMLHttpRequest();
          o.overrideMimeType("application/json");
          o.open("GET", "https://sploop.io/servers", true);
          o.onload = function () {
            e.pv = JSON.parse(o.responseText) || [];
            e.kv();
          };
          o.onabort = o.onerror = function () {
            q().iu();
            alert("Unable to reach matchmaker");
          };
          o.send(null);
        };
        this.Gv = function (n) {
          q().iu();
          this.Ev();
          n.sort((n, t) => n.ping - t.ping);
          let o = n[0];
          if (o) {
            const n = $t[o.region];
            gr(true, o.region + ".sploop.io", "80", m().Uv() || (m().Yv("0"), 0), n ? n[0] : "???");
            y(o);
          } else {
            alert("Matchmaking: UNABLE TO FIND GAME");
          }
        };
        this.kv = function () {
          let n = [];
          for (let t = 0, e = this.pv; t < e.length; t++) {
            if ($t[e[t].r][1] !== 2) {
              n.push(new ne(e[t].r, t));
            }
          }
          setTimeout(() => {
            this.Gv(n);
          }, 1500);
        };
        this.Tv = function (n) {
          const i = e.pv;
          for (let t = 0; t < i.length; t++) {
            const e = i[t];
            if (e.r === n) {
              gr(true, e.r === "DEV" ? "localhost" : e.r + ".sploop.io", "80", m().Uv() || (m().Yv("0"), 0));
              return;
            }
          }
        };
        this.jv = function (n) {
          let t = this.pv[n];
          if (t) {
            gr(true, t.r === "DEV" ? "localhost" : t.r + ".sploop.io", "80", m().Uv() || (m().Yv("0"), 0));
          }
        };
        this.Ev = function () {
          if (this.pv.length === 0) {
            return alert("Matchmaking: game is updating, please wait.");
          }
          for (let t, e, o = 0; o < this.pv.length; o++) {
            e = this.pv[o];
            t = e.d;
            if (t) {
              e.r;
              t[0];
              t[1];
              f(0);
            }
          }
        };
      }();
      let wo = false;
      const bo = {
        _v: 0,
        zv: 0,
        Dv: 0,
        Mv: 0,
        yu: false,
        Nv: 0,
        Ov: 0,
        Pv: 0,
        Sv: 0,
        Lv: 0,
        Av: 0,
        Bv: 0,
        Cv: 0,
        qv: false,
        transition: 0,
        Kv: 0,
        Jv(n, t, e, o) {
          this._v = n;
          this.zv = t;
          this.Dv = e;
          this.Mv = o;
        },
        Iv(n, t, e, o) {
          this.Lv = n;
          this.Zv = t;
          this.Bv = e;
          this.Cv = o;
        },
        Vv(n = 0, t = 10) {
          this.Kv = n;
          this.transition = t;
          this.qv = true;
        }
      };
      bo.Vv(0, 40);
      let yo = {
        Wv: 0,
        Xv: 0,
        Fv: 0,
        Qv: 0
      };
      let zo = 1;
      let _o = false;
      let Mo = 0;
      let Do = 0;
      let Bo = 0;
      let Lo = 0;
      let Co = false;
      let Ao = 0;
      let po = 0;
      let To = 0;
      let xo = 0;
      let Ho = 0;
      let ko = [];
      let Go = Date.now();
      let Eo = 0.2;
      let Uo = false;
      let Yo = false;
      let jo = false;
      let No = +new Date();
      let Oo = false;
      let Po = false;
      let So = false;
      let qo = Ut(Z[P().Pi], 38.5, 42.5);
      let Ko = Ut(Z[P().qi], 38.5, 42.5);
      let Jo = Ut(Z[P().Ki], 38.5, 42.5);
      let Io = false;
      let Zo = true;
      let Vo = true;
      let Wo = false;
      let Xo = false;
      let Fo = false;
      let Qo = false;
      let Ro = mi("setting_shadows", false);
      let $o = mi("setting_biome_textures", false);
      let ni = mi("setting_show_collisions", false);
      let ti = vi("setting_shadow_offset", 100);
      let ei = vi("setting_asset_opacity", 1);
      function oi() {
        return Ro;
      }
      function ii() {
        return Y.default.Kd("player_name_color") || c().Rv;
      }
      function ri() {
        return Y.default.Kd("mob_name_color") || c().Rv;
      }
      function ci() {
        for (const n in Rt) {
          Rt[n] = null;
        }
        if (ao && ao.dg) {
          for (const n in ao.dg) {
            const t = ao.dg[n];
            if (t) {
              t.xg = null;
            }
          }
        }
        if (lo) {
          lo.Om = null;
        }
      }
      let si = null;
      let ui = 0;
      function ai(n) {
        return /^data:/i.test(n) || /^(https?:|blob:)/i.test(n) || /\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(n);
      }
      function fi() {
        const t = Y.default.Kd("hud_font");
        const e = typeof t == "string" ? t.trim() : "";
        if (!e) {
          si = null;
          m().$v("");
          ci();
          return;
        }
        if (ai(e)) {
          li(e);
        } else {
          si = null;
          m().$v(e);
          ci();
        }
      }
      function li(n) {
        if (si === n) {
          return;
        }
        si = n;
        if (typeof FontFace != "function") {
          return;
        }
        const e = "PackHudFont" + ++ui;
        let o;
        try {
          o = new FontFace(e, "url(\"" + n.replace(/"/g, "%22") + "\")");
        } catch (n) {
          return;
        }
        o[(0, ae.ls)("load")]().then(function (t) {
          if (si === n) {
            try {
              document[(0, ae.ls)("fonts")][(0, ae.ls)("add")](t);
            } catch (n) {}
            m().$v(e);
            ci();
          }
        }).catch(function () {
          if (si === n) {
            m().$v("");
            ci();
          }
        });
      }
      function hi() {
        m().nw(Y.default.Kd("name_outline_color"));
        m().tw(parseFloat(Y.default.Kd("name_outline_width")));
        ci();
      }
      function di() {
        fi();
        hi();
      }
      function mi(n, t) {
        try {
          const t = window.localStorage.getItem(n);
          if (t === "1") {
            return true;
          }
          if (t === "0") {
            return false;
          }
        } catch (n) {}
        return t;
      }
      function gi(n, t) {
        try {
          window.localStorage.setItem(n, t ? "1" : "0");
        } catch (n) {}
      }
      function vi(n, t) {
        try {
          const t = window.localStorage.getItem(n);
          if (t !== null) {
            const n = parseFloat(t);
            if (isFinite(n)) {
              return n;
            }
          }
        } catch (n) {}
        return t;
      }
      function wi(n, t) {
        try {
          window.localStorage.setItem(n, t + "");
        } catch (n) {}
      }
      Y.default.ew(n => m().ow(n));
      Y.default.iw(di);
      let bi = false;
      let yi = {
        Fv: 0,
        Qv: 0,
        Wv: 0,
        Xv: 0
      };
      let zi = -1;
      let _i = {};
      let Mi = null;
      let Di = null;
      let Bi = null;
      let Li = null;
      let Ci = null;
      let Ai = null;
      let pi = null;
      let Ti = null;
      let xi = null;
      let Hi = null;
      let ki = null;
      let Gi = null;
      let Ei = null;
      let Ui = null;
      let Yi = null;
      let ji = null;
      let Ni = null;
      let Oi = null;
      let Pi = 0;
      let Si = 0;
      let qi = 0;
      let Ki = 0;
      let Ji = fe().bs("IP");
      let Ii = fe().bs("PORT");
      let Zi = fe().bs("SSL") === "off";
      let Vi = null;
      function Wi() {
        io = Math.max(Ki / c().rw, qi / c().cw);
      }
      function Xi() {
        if (jo) {
          return zt;
        } else {
          return m().Qg(window.innerWidth / 2, window.innerHeight / 2, Mo, Do);
        }
      }
      function Fi(n) {
        if (!n || !Oo && !Po) {
          Gi.style.display = n ? "block" : "none";
          Oo = n;
          Ui.blur();
          if (n) {
            Ui.focus();
          }
        }
      }
      function Qi(n) {
        Ei.style.display = n ? "block" : "none";
        if (n) {
          if (Oo) {
            Fi(false);
          }
          if (Po) {
            xr(false);
          }
        }
        So = n;
        if (n && !Ao) {
          Mc();
        }
      }
      function Ri(n) {
        if (n) {
          if (Oo) {
            Fi(false);
          }
          if (Po) {
            xr(false);
          }
        }
        pi.style.display = n ? "block" : "none";
      }
      function $i() {
        Mi = document.getElementById("server-select");
        Di = document.getElementById("clan-title");
        Bi = document.getElementById("clan-menu-close-button");
        Li = document.getElementById("leave_clan");
        Ci = document.getElementById("create_clan");
        Ai = document.getElementById("leave-clan-button");
        pi = document.getElementById("game_over_popup");
        Ti = document.getElementById("hat_menu_content");
        xi = document.getElementById("clan_menu_content");
        Hi = document.getElementById("create-clan-button");
        ki = document.getElementById("clan-menu-clan-name-input");
        Gi = document.getElementById("chat-wrapper");
        Ei = document.getElementById("clan-menu");
        Ui = document.getElementById("chat");
        Yi = document.getElementById("hat-menu");
        ji = document.getElementById("play");
        Ni = document.getElementById("nickname");
        window.onbeforeunload = function () {
          return "Are you sure you want to leave the tab?";
        };
      }
      function nr() {
        Re.oncontextmenu = () => false;
        Re.onmousedown = n => rr(n);
        Re.onmouseup = n => sr(n);
        window.addEventListener("mousemove", n => cr(n), false);
        window.onkeydown = n => dr(n);
        window.onkeyup = n => mr(n);
        window.addEventListener("resize", n => yr(), false);
        Re.addEventListener("touchstart", n => Ct(n), false);
        Re.addEventListener("touchmove", n => At(n), false);
        Re.addEventListener("touchend", n => pt(n), false);
        Re.addEventListener("touchcancel", n => pt(n), false);
        Re.addEventListener("touchleave", n => pt(n), false);
        ji.addEventListener("click", n => ec());
        Bi.addEventListener("mousedown", n => {
          Qi(!So);
        });
        Ai.addEventListener("mousedown", n => {
          rs();
        });
        Mi.addEventListener("change", n => {
          let t = Mi.selectedIndex;
          const e = Mi.options[t].getAttribute("region");
          vo.Tv(e);
        });
        document.getElementById("hat-menu-close-button").addEventListener("mousedown", n => {
          xr(false);
        });
        document.getElementById("native-render-toggle").addEventListener("change", t => {
          Fo = t.currentTarget.checked;
          yr();
        });
        document.getElementById("native-helper-toggle").addEventListener("change", t => {
          Vo = t.currentTarget.checked;
          yr();
        });
        document.getElementById("display-ping-toggle").addEventListener("change", n => {
          Io = n.currentTarget.checked;
        });
        document.getElementById("grid-toggle").addEventListener("change", t => {
          Zo = t.currentTarget.checked;
        });
        document.getElementById("particle-toggle").addEventListener("change", t => {
          Xo = t.currentTarget.checked;
        });
        tr();
        Hi.addEventListener("click", n => {
          ts(ki.value);
        });
        Ui.addEventListener("blur", () => {
          Ui.value = "";
          Fi(false);
        });
        Ui.addEventListener("keypress", n => {
          if (Oo && n.key === "Enter") {
            n.preventDefault();
            let t = Ui.value.trim();
            Fi(false);
            const e = "moderator";
            if (t.length === 0) {
              return;
            }
            if (t === "/show") {
              Wo = !me() || !me().fs || me().fs[fe().ls(e)] !== 1 || 2;
              return;
            }
            if (t === "/hide") {
              Wo = false;
              return;
            }
            switch (t.split(" ")[0]) {
              case "texture_reload":
                Z.forEach(n => {
                  if (n && n.$d) {
                    n.$d = {
                      Wd: rn().ut
                    };
                  }
                });
                break;
              case "id":
                ao.dg.forEach(n => {});
                break;
              default:
                jc(t);
            }
          }
        });
      }
      function tr() {
        const t = document.getElementById("shadows-toggle");
        if (t) {
          t.checked = Ro;
          t.addEventListener("change", n => {
            Ro = n.currentTarget.checked;
            gi("setting_shadows", Ro);
          });
        }
        const e = document.getElementById("show-collisions-toggle");
        if (e) {
          e.checked = ni;
          Mn(ni);
          e.addEventListener("change", t => {
            ni = t.currentTarget.checked;
            gi("setting_show_collisions", ni);
            Mn(ni);
          });
        }
        const o = document.getElementById("biome-textures-toggle");
        if (o) {
          o.checked = $o;
          o.addEventListener("change", t => {
            $o = t.currentTarget.checked;
            gi("setting_biome_textures", $o);
          });
        }
        const r = document.getElementById("asset-opacity-slider");
        const c = document.getElementById("asset-opacity-value");
        if (r) {
          const t = t => isFinite(t) ? Math.min(1, Math.max(0, t)) : 1;
          ei = t(ei);
          yn(ei);
          r.value = ei + "";
          if (c) {
            c.textContent = ei.toFixed(2);
          }
          r.addEventListener("input", e => {
            ei = t(parseFloat(e.currentTarget.value));
            yn(ei);
            if (c) {
              c.textContent = ei.toFixed(2);
            }
            wi("setting_asset_opacity", ei);
          });
        }
        or();
      }
      function er() {
        if (Vi) {
          Vi(false);
        }
      }
      function or() {
        const e = document.getElementById("texture-pack-build");
        const o = document.getElementById("pack-builder-nav");
        const r = document.getElementById("pack-builder-grid");
        const c = document.getElementById("pack-builder-name");
        const s = document.getElementById("pack-builder-author");
        const u = document.getElementById("pack-builder-version");
        const a = document.getElementById("pack-builder-file");
        const f = document.getElementById("pack-builder-import");
        if (!e || !o || !r) {
          return;
        }
        const l = Object.create(null);
        const h = Object.create(null);
        let d = null;
        const g = n => n === "1" || n === "true";
        function v(t, e) {
          if (t.control === "image") {
            Y.default.sw(t.key, e);
            m().ow(t.key);
          } else {
            Y.default.uw(t.key, e);
            if (t.key.indexOf("shadow_") === 0) {
              gn.Fd();
            } else if (t.key === "hud_font") {
              fi();
            } else if (t.key === "name_outline_color" || t.key === "name_outline_width") {
              hi();
            } else if (t.key === "player_name_color" || t.key === "mob_name_color" || t.key === "clan_tag_color" || t.key === "age_color") {
              ci();
            }
          }
        }
        function w(t, e, o) {
          if (o && o.charAt(0) === "#") {
            t.style.backgroundImage = "";
            t.style.backgroundColor = o;
          } else if (o) {
            t.style.backgroundColor = "";
            t.style.backgroundImage = "url(\"" + o.replace(/"/g, "%22") + "\")";
          } else if (e.src) {
            t.style.backgroundColor = "";
            t.style.backgroundImage = "url(\"" + e.src + "\")";
          } else {
            t.style.backgroundImage = "";
            t.style.backgroundColor = e.pg || "#141414";
          }
        }
        function b(t) {
          const o = t.control || "image";
          const i = document.createElement("div");
          i.className = "pb-asset";
          const r = document.createElement("div");
          r.className = "pb-thumb" + (o === "checkbox" ? "" : " pb-toggle");
          const c = document.createElement("img");
          c.className = "pb-eye";
          c.src = "img/ui/spectator.png";
          c.draggable = false;
          r.appendChild(c);
          const s = document.createElement("span");
          function u() {
            const i = !!h[t.key];
            if (o === "number" || o === "range") {
              r.style.backgroundImage = "";
              r.style.backgroundColor = "#1c1f18";
              s.style.fontFamily = "";
              const e = l[t.key];
              s.textContent = i ? "" : (e != null && e !== "" ? e : t.Tg ?? "") + "";
            } else if (o === "font") {
              r.style.backgroundImage = "";
              r.style.backgroundColor = "#1c1f18";
              const e = i ? "" : l[t.key] || "";
              s.style.fontFamily = e && !ai(e) ? e : i ? "" : m().jg();
              s.textContent = i ? "" : "Aa";
            } else if (o === "checkbox") {
              r.style.backgroundImage = "";
              s.style.fontFamily = "";
              const e = g(l[t.key]);
              r.style.backgroundColor = e ? "#2f3a1c" : "#3a1c1c";
              s.style.color = e ? "#b5de53" : "#e34343";
              s.textContent = e ? "On" : "Off";
            } else {
              s.style.fontFamily = "";
              s.textContent = "";
              w(r, t, i ? "" : l[t.key] || "");
            }
          }
          s.className = "pb-thumb-val";
          r.appendChild(s);
          i.appendChild(r);
          const f = document.createElement("div");
          f.className = "pb-meta";
          const b = document.createElement("div");
          b.className = "pb-name text-shadowed-3";
          b.textContent = t.js;
          f.appendChild(b);
          const y = document.createElement("div");
          y.className = "pb-row";
          let z = null;
          function _(n, o) {
            if (n) {
              l[t.key] = n;
            } else {
              delete l[t.key];
            }
            if (o && z) {
              z.value = n || "";
            }
            u();
            if (!h[t.key]) {
              v(t, n || "");
            }
          }
          if (o === "color" || o === "biome") {
            const n = document.createElement("input");
            n.className = "pb-color";
            n.type = "color";
            const o = l[t.key];
            n.value = o && o.charAt(0) === "#" ? o : t.pg || "#000000";
            n.addEventListener("input", () => _(n.value, true));
            y.appendChild(n);
          }
          if (o === "number") {
            const n = document.createElement("input");
            n.className = "pb-input pb-num";
            n.type = "number";
            if (t.min != null) {
              n.min = t.min;
            }
            if (t.max != null) {
              n.max = t.max;
            }
            n.placeholder = t.Tg != null ? t.Tg + "" : "";
            n.value = l[t.key] || "";
            z = n;
            n.addEventListener("input", () => _(n.value.trim(), false));
            y.appendChild(n);
          }
          if (o === "range") {
            const n = document.createElement("input");
            n.className = "pb-range";
            n.type = "range";
            n.min = t.min ?? 0;
            n.max = t.max ?? 1;
            n.step = t.step ?? 0.01;
            const o = l[t.key];
            n.value = o !== undefined && o !== "" ? o : t.Tg ?? 0;
            const i = document.createElement("span");
            i.className = "pb-range-val setting-info";
            i.textContent = n.value;
            const r = () => {
              const t = parseFloat(n.min);
              const o = parseFloat(n.max);
              const i = o > t ? (parseFloat(n.value) - t) / (o - t) * 100 : 0;
              n.style.setProperty("--pb-fill", i + "%");
            };
            r();
            n.addEventListener("input", () => {
              i.textContent = n.value;
              r();
              _(n.value, false);
            });
            y.appendChild(n);
            y.appendChild(i);
          }
          if (o === "checkbox") {
            const n = document.createElement("div");
            n.className = "pb-check";
            const o = () => {
              const i = g(l[t.key]);
              n.classList.toggle("pb-check--on", i);
              n.textContent = i ? "ON" : "OFF";
            };
            o();
            n.addEventListener("click", () => {
              _(g(l[t.key]) ? "" : "1", false);
              o();
            });
            y.appendChild(n);
          }
          if (o === "image" || o === "biome") {
            const n = document.createElement("input");
            n.className = "pb-input";
            n.type = "text";
            n.placeholder = o === "biome" ? "#colour or tiled image URL" : "Image URL";
            n.value = l[t.key] || "";
            z = n;
            n.addEventListener("input", () => {
              const i = n.value.trim();
              if (i) {
                l[t.key] = i;
              } else {
                delete l[t.key];
              }
              u();
            });
            n.addEventListener("change", () => {
              if (!h[t.key]) {
                v(t, n.value.trim());
              }
            });
            y.appendChild(n);
            const i = document.createElement("div");
            i.className = "pb-upload";
            i.textContent = "Upload";
            i.addEventListener("click", () => {
              d = {
                set: n => _(n, true)
              };
              if (a) {
                a.accept = "image/*";
                a.value = "";
                a.click();
              }
            });
            y.appendChild(i);
          }
          if (o === "font") {
            const n = document.createElement("input");
            n.className = "pb-input";
            n.type = "text";
            n.placeholder = "Font name, or upload a font file";
            n.value = l[t.key] || "";
            z = n;
            n.addEventListener("input", () => {
              const e = n.value.trim();
              if (e) {
                l[t.key] = e;
              } else {
                delete l[t.key];
              }
              u();
            });
            n.addEventListener("change", () => {
              if (!h[t.key]) {
                v(t, n.value.trim());
              }
            });
            y.appendChild(n);
            const o = document.createElement("div");
            o.className = "pb-upload";
            o.textContent = "Upload";
            o.addEventListener("click", () => {
              d = {
                set: n => _(n, true)
              };
              if (a) {
                a.accept = ".ttf,.otf,.woff,.woff2,font/*";
                a.value = "";
                a.click();
              }
            });
            y.appendChild(o);
          }
          f.appendChild(y);
          i.appendChild(f);
          if (o !== "checkbox") {
            if (h[t.key]) {
              i.classList.add("pb-asset--disabled");
            }
            r.addEventListener("click", () => {
              if (h[t.key]) {
                delete h[t.key];
                i.classList.remove("pb-asset--disabled");
              } else {
                h[t.key] = true;
                i.classList.add("pb-asset--disabled");
              }
              u();
              v(t, h[t.key] ? "" : l[t.key] || "");
            });
          }
          u();
          return i;
        }
        Y.default.aw(true);
        const y = [];
        const z = [];
        function _(t) {
          for (let n = 0; n < y.length; n++) {
            const o = n === t;
            y[n].style.display = o ? y[n].classList.contains("pb-saves") ? "flex" : "grid" : "none";
            z[n].classList.toggle("nav-button-active", o);
            z[n].classList.toggle("nav-button-text", !o);
          }
          if (t === 0) {
            k();
          }
          r.scrollTop = 0;
        }
        function M(t, e) {
          const r = document.createElement("div");
          r.className = "pb-tab nav-button-text";
          r.textContent = t;
          r.addEventListener("click", () => _(e));
          o.appendChild(r);
          z.push(r);
        }
        M("Saves", 0);
        const D = document.createElement("div");
        D.className = "pb-saves";
        const B = document.createElement("div");
        B.className = "pb-saves-actions";
        const L = document.createElement("div");
        L.className = "button-type-1 green-button text-shadowed-3 pb-saves-btn";
        L.textContent = "SAVE CURRENT PACK";
        const C = document.createElement("div");
        C.className = "button-type-1 dark-blue-button text-shadowed-3 pb-saves-btn";
        C.textContent = "IMPORT .JSON";
        const A = document.createElement("div");
        A.className = "button-type-1 red-button text-shadowed-3 pb-saves-btn";
        A.textContent = "RESET TO DEFAULT";
        B.appendChild(L);
        B.appendChild(C);
        B.appendChild(A);
        D.appendChild(B);
        const p = document.createElement("div");
        function T() {
          const e = {};
          const o = c ? c.value.trim() : "";
          if (o) {
            e[(0, ae.ls)("_name")] = o;
          }
          const i = s ? s.value.trim() : "";
          if (i) {
            e[(0, ae.ls)("_author")] = i;
          }
          const r = u ? u.value.trim() : "";
          if (r) {
            const n = Number(r);
            e[(0, ae.ls)("_version")] = isNaN(n) ? r : n;
          }
          for (const n in l) {
            if (h[n]) {
              continue;
            }
            const o = l[n];
            if (typeof o == "string" && o.trim()) {
              e[n] = o.trim();
            }
          }
          return e;
        }
        function x(t) {
          let o = 0;
          for (const n in t) {
            if (n.charAt(0) !== "_") {
              o++;
            }
          }
          return o;
        }
        function H(t, e) {
          const i = new Blob([t], {
            type: "application/json"
          });
          const r = URL.createObjectURL(i);
          const c = document.createElement("a");
          c.href = r;
          c.download = (e || "texture-pack").replace(/[^a-z0-9_\-]+/gi, "_") + ".json";
          document.body.appendChild(c);
          c.click();
          document.body.removeChild(c);
          setTimeout(() => URL.revokeObjectURL(r), 0);
        }
        function k() {
          if (!p) {
            return;
          }
          p.innerHTML = "";
          const e = Y.default.fw();
          const o = Y.default.qd();
          if (!e.length) {
            const n = document.createElement("div");
            n.className = "pb-saves-empty setting-info";
            n.textContent = "No saved packs yet. Edit some assets, set a Name, then Save Current Pack.";
            p.appendChild(n);
            return;
          }
          e.forEach(n => {
            const i = n.tu === o;
            const r = document.createElement("div");
            r.className = "pb-save-row" + (i ? " pb-save-row--active" : "");
            const c = document.createElement("div");
            c.className = "pb-save-info";
            const s = document.createElement("div");
            s.className = "pb-save-title text-shadowed-3";
            s.textContent = n.js + (i ? "  (active)" : "");
            const u = document.createElement("div");
            u.className = "pb-save-sub setting-info";
            u.textContent = "Version " + (n.version || "-") + "   ·   by " + (n.lw || "Unknown");
            c.appendChild(s);
            c.appendChild(u);
            r.appendChild(c);
            const a = document.createElement("div");
            a.className = "pb-save-row-actions";
            const f = document.createElement("div");
            f.className = "button-type-1 text-shadowed-3 pb-save-action " + (i ? "red-button" : "green-button");
            f.textContent = i ? "UNLOAD" : "LOAD";
            f.addEventListener("click", () => {
              if (i) {
                P();
              } else {
                O(n.tu);
              }
            });
            const l = document.createElement("div");
            l.className = "button-type-1 blue-button text-shadowed-3 pb-save-action";
            l.textContent = "EXPORT";
            l.addEventListener("click", () => {
              const t = Y.default.hw(n.tu);
              if (t) {
                H(t, n.js);
              }
            });
            const h = document.createElement("div");
            h.className = "button-type-1 red-button text-shadowed-3 pb-save-action";
            h.textContent = "DELETE";
            h.addEventListener("click", () => {
              if (confirm("Delete pack \"" + n.js + "\"?")) {
                Y.default.dw(n.tu);
                k();
              }
            });
            a.appendChild(f);
            a.appendChild(l);
            a.appendChild(h);
            r.appendChild(a);
            p.appendChild(r);
          });
        }
        function G() {
          for (let n = 0; n < pe.length; n++) {
            const e = y[n + 1];
            if (!e) {
              continue;
            }
            e.innerHTML = "";
            const o = pe[n].Hg;
            for (let n = 0; n < o.length; n++) {
              e.appendChild(b(o[n]));
            }
          }
        }
        function E() {
          gn.Fd();
          di();
          m().mw();
        }
        function U(t) {
          const o = t[(0, ae.ls)("_name")];
          if (c) {
            c.value = typeof o == "string" ? o : "";
          }
          const i = t[(0, ae.ls)("_author")];
          if (s) {
            s.value = typeof i == "string" ? i : "";
          }
          const r = t[(0, ae.ls)("_version")];
          if (u) {
            u.value = r != null && r !== "" ? r + "" : "";
          }
        }
        function j(n) {
          for (const n in l) {
            delete l[n];
          }
          for (const n in h) {
            delete h[n];
          }
          for (const t in n) {
            if (t.charAt(0) !== "_" && typeof n[t] == "string") {
              l[t] = n[t];
            }
          }
          U(n);
          G();
        }
        function N() {
          for (const n in l) {
            return;
          }
          const n = Y.default.gw();
          if (n) {
            j(n);
          }
        }
        function O(t) {
          if (!Y.default.ww(t)) {
            return;
          }
          const o = Y.default.gw();
          if (o) {
            j(o);
            E();
            k();
          } else {
            window.location.reload();
          }
        }
        function P() {
          Y.default.ww(null);
          for (const n in l) {
            delete l[n];
          }
          for (const n in h) {
            delete h[n];
          }
          if (c) {
            c.value = "";
          }
          if (s) {
            s.value = "";
          }
          if (u) {
            u.value = "";
          }
          G();
          E();
          k();
        }
        function S(t) {
          const o = q().vs && q().vs["pack-builder"];
          if (!o) {
            return;
          }
          const i = document.getElementById("pop-pack-builder");
          if (i && i.style.display === "flex") {
            if (t) {
              o.hide();
            }
            return;
          }
          N();
          const r = q().vs.settings;
          if (r) {
            r.hide();
          }
          k();
          o.show();
        }
        p.className = "pb-saves-list scrollbar";
        D.appendChild(p);
        r.appendChild(D);
        y.push(D);
        pe.forEach((t, e) => {
          const i = e + 1;
          M(t.xg, i);
          const c = document.createElement("div");
          c.className = "pb-section";
          for (let n = 0; n < t.Hg.length; n++) {
            c.appendChild(b(t.Hg[n]));
          }
          r.appendChild(c);
          y.push(c);
        });
        _(0);
        if (a) {
          a.addEventListener("change", () => {
            const n = d;
            d = null;
            const e = a.files && a.files[0];
            if (!n || !e) {
              return;
            }
            const o = new FileReader();
            o.onload = () => {
              const i = (o.result || "") + "";
              if (i) {
                n.set(i);
              }
            };
            o.readAsDataURL(e);
          });
        }
        L.addEventListener("click", () => {
          const e = T();
          if (x(e) === 0) {
            alert("Set at least one asset (and a Name) before saving.");
            return;
          }
          const o = c && c.value.trim() || "My Pack";
          const i = JSON.stringify(e);
          const r = Y.default.qd();
          if (r) {
            if (!Y.default.bw(r, o, i)) {
              alert("Could not save the pack. Browser storage may be full (uploaded images can be large, try image URLs instead).");
              return;
            }
          } else {
            const n = Y.default.yw(o, i);
            if (!n) {
              alert("Could not save the pack. Browser storage may be full (uploaded images can be large, try image URLs instead).");
              return;
            }
            Y.default.ww(n);
          }
          k();
        });
        A.addEventListener("click", () => {
          if (confirm("Reset everything to the game defaults? This deactivates the current pack; your saved packs are kept.")) {
            P();
          }
        });
        if (C && f) {
          C.addEventListener("click", () => {
            f.value = "";
            f.click();
          });
          f.addEventListener("change", () => {
            const e = f.files && f.files[0];
            if (!e) {
              return;
            }
            const o = new FileReader();
            o.onload = () => {
              const n = e[(0, ae.ls)("name")];
              const t = typeof n == "string" ? n.replace(/\.json$/i, "") : "";
              if (Y.default.yw(t, (o.result || "") + "")) {
                k();
              } else {
                alert("Could not parse that .json pack.");
              }
            };
            o.onerror = () => alert("Could not read the file.");
            o.readAsText(e);
          });
        }
        Vi = S;
        e.addEventListener("click", () => S(true));
      }
      function ir(n, t) {
        Bo = n * zo / io;
        Lo = t * zo / io;
      }
      function rr(n) {
        if (!n.isTrusted) {
          return;
        }
        if (!n.target) {
          return;
        }
        if (!n.type) {
          return;
        }
        const e = Date.now();
        const o = (e - Go) / 1000;
        Go = e;
        ko.push(o);
        if (ko.length >= 32) {
          const n = 1 / Xe(ko);
          const t = Fe(ko);
          let e = false;
          if (n > 40 || n > 10 && t < 0.0001 || n > 20 && t < 0.001) {
            e = true;
          }
          Uo = !!e;
          ko.length = 0;
        }
        if (!Uo || !(o > Uo)) {
          Gt(false);
          Mo = n.clientX;
          Do = n.clientY;
          ir(Mo, Do);
          if (!ur(Bo, Lo)) {
            Sc(Xi());
          }
        }
      }
      function cr(n) {
        if (n.isTrusted) {
          Gt(false);
          Mo = n.clientX;
          Do = n.clientY;
          ir(Mo, Do);
          fr(Bo, Lo);
        }
      }
      function sr(n) {
        if (n.isTrusted) {
          Mo = n.clientX;
          Do = n.clientY;
          ir(Mo, Do);
          ar(Bo, Lo);
          qc();
        }
      }
      function ur(n, t) {
        let o = false;
        for (let e = 0, i = lo.bm; e < i.length; e++) {
          if (i[e].gm(n, t)) {
            Zc(lo.hm[e]);
            if (ht && W()[lo.hm[e]].Qm === 3) {
              Pc(zt);
            }
            o = true;
          }
        }
        for (let i = 0, r = lo.wm; i < r.length; i++) {
          if (r[i].gm(n, t)) {
            Vc(lo.ym[i]);
            o = true;
          }
        }
        if (Ao) {
          for (let e = 0, i = fo.rv; e < i.length; e++) {
            if (fo.ov[0] && i[e].gm(n, t)) {
              o = true;
            }
          }
        }
        if (Jo.gm(n, t)) {
          o = true;
        }
        if (qo.gm(n, t)) {
          o = true;
        }
        if (Ko.gm(n, t)) {
          o = true;
        }
        if (mo.ag.gm(n, t)) {
          o = true;
        }
        return o;
      }
      function ar(n, t) {
        for (let e = 0, o = lo.bm; e < o.length; e++) {
          o[e].gm(n, t);
        }
        for (let e = 0, o = lo.wm; e < o.length; e++) {
          o[e].gm(n, t);
        }
        for (let o = 0, i = fo.rv; o < i.length; o++) {
          if (i[o].gm(n, t) && fo.ov[0]) {
            os(o === 0);
            fo.ov.shift();
          }
        }
        if (Jo.gm(n, t)) {
          Fi(!Oo);
        }
        if (qo.gm(n, t)) {
          xr(!Po);
        }
        if (Ko.gm(n, t)) {
          Qi(!So);
        }
        if (mo.ag.gm(n, t)) {
          mo.fg = !mo.fg;
        }
      }
      function fr(n, t) {
        for (let o = 0, i = lo.bm; o < i.length; o++) {
          i[o].gm(n, t);
        }
        for (let e = 0, o = lo.wm; e < o.length; e++) {
          o[e].gm(n, t);
        }
        for (let e = 0, o = fo.rv; e < o.length; e++) {
          o[e].gm(n, t);
        }
        mo.ag.gm(n, t);
      }
      function lr() {
        homepage.classList.add("fade-in");
      }
      function hr(n) {
        const o = q().get("homepage");
        if (n) {
          const n = lr;
          setTimeout(function () {
            o.classList.remove("fade-in");
            o.style.display = "flex";
            setTimeout(n, 50);
          }, 10);
        } else {
          o.style.display = "none";
        }
      }
      function dr(n) {
        if (no && n instanceof window.KeyboardEvent && n.isTrusted && n.target) {
          Bt(n);
        }
      }
      function mr(n) {
        if (no && n instanceof window.KeyboardEvent && n.isTrusted && n.target) {
          Lt(n);
        }
      }
      function gr(n, t, e, o, r) {
        _i.zw = n;
        _i._w = t;
        _i.port = e;
        _i.Mw = o;
        _i.js = r;
        zi = 1;
        if (Ji && Ii) {
          n = Zi || false;
          t = Ji;
          e = Ii;
        }
        r = r || "a server";
        q().ou("Connecting to " + r + "...");
        if (Ee) {
          Ee.close();
        }
        _o = false;
        no = false;
        To = 0;
        po = 0;
        wo = false;
        bo.yu = false;
        Ee = new Ge("" + (n ? Ke : Je) + Ie + t + We + (n ? Ve : e) + Ze);
        Br();
        z();
        go.ys();
        fo.ys();
        mc();
        Ee.binaryType = "arraybuffer";
        Ee.onclose = n => {
          q().iu();
          Wr(n);
          zi = 0;
          //EDIT
          entityUids = {}
          toRender = []
          //ENDEDIT
        };
        Ee.Dw = n => {
          q().iu();
          zi = 0;
        };
        Ee.onopen = n => {
          q().iu();
          Vr();
          zi = 2;
        };
        Ee.onmessage = n => {
          Zr(n);
        };
      }
      function vr() {
        aiptag.cmd.display.push(function () {
          aipDisplayTag.display("lostworld-io_300x250_2");
        });
        aiptag.cmd.display.push(function () {
          aipDisplayTag.display("lostworld-io_300x250_1");
        });
      }
      function wr(n) {
        jo = n;
      }
      function br(n) {
        Yo = n;
      }
      function yr() {
        zo = Fo ? window.devicePixelRatio : 1;
        Re.width = window.innerWidth * zo;
        Re.height = window.innerHeight * zo;
        Re.style.width = window.innerWidth + "px";
        Re.style.height = window.innerHeight + "px";
        qi = Re.width;
        Ki = Re.height;
        Wi();
        window.innerHeight;
        window.innerWidth;
        Pi = Re.width / io;
        Si = Re.height / io;
        $e.setTransform(io, 0, 0, io, 0, 0);
        Hr();
      }
      // ZOOM EDIT
      window.globalSettings.zoom.reset = ()=>{
        window.globalSettings.zoom.scale = 1
        yr()
      }
      // ENDEDIT
      function zr(n = true) {
        var e = new XMLHttpRequest();
        e.open("GET", "https://token.sploop.io/" + to + "?v=" + Math.random() * 100000, true);
        e.send(null);
        e.onreadystatechange = function () {
          if (e.readyState === 4 && e.status === 200) {
            t = e.responseText;
            const o = x[11](t, 13, 9, 252);
            oo = o;
            if (n) {
              vo.Hv();
            }
          }
          var t;
        };
      }
      function _r() {
        yr();
        Mr();
        zr();
      }
      function Mr() {
        $e.clearRect(0, 0, Pi, Si);
        const t = Y.default.Kd("oob_color");
        if (t) {
          $e.fillStyle = t;
          $e.fillRect(0, 0, Pi, Si);
        }
        const e = +new Date();
        const o = (e - No) / 1000;
        No = e;
        const r = w.get(xo);
        if (r) {
          uo.$s(r.zh, r.Mh, o);
        }
        if (_o) {
          if (ke > 0) {
            ke++;
            if (ke > 6000) {
              Array.prototype.pop = Array.prototype.shift;
              ke = 0;
            }
          }
          D(o, e);
          if (po) {
            kr(o);
          }
        }
        $e.save();
        qr($e, o);
        $e.restore();
        if (no) {
          $e.save();
          Yr($e, o);
          $e.restore();
        } else {
          he().yu();
        }

        // RENDER EDIT
        if (window.globalSettings.coords.enabled) {
          //map margins are 5px
          const map = Z[P().vi]
          const mapTop = Si-map.$d.im-5;
          const mapWidth = map.$d.om;
          
          $e.save();
          $e.font = "17px Baloo Paaji";
          $e.textAlign = "center";
          $e.textBaseline = "bottom";
          $e.lineWidth = 4;
          $e.lineJoin = "round";
          $e.strokeStyle = "#000";
          $e.fillStyle = "#fff";
          
          const text = coords[0]+", "+coords[1];
          $e.strokeText(text, mapWidth/2+5, mapTop-5);
          $e.fillText(text, mapWidth/2+5, mapTop-5);
          
          $e.restore();
        }
        
        if (window.globalSettings.zoom.showLabel) {
          $e.save();
          $e.font = "17px Baloo Paaji";
          $e.textAlign = "center";
          $e.textBaseline = "top";
          $e.lineWidth = 4;
          $e.lineJoin = "round";
          $e.strokeStyle = "#000";
          $e.fillStyle = "#fff";
          const text = Number(window.globalSettings.zoom.scale.toFixed(5))+"x";
          $e.strokeText(text, Pi / 2, 10);
          $e.fillText(text, Pi / 2, 10);
          $e.restore();
        }

        $e.save();
        // orig translate: $e.translate(Pi * 0.5 - uo.zh, Si * 0.5 - uo.Mh);
        //translate to zoomed world space
        //ZOOM EDIT
        $e.translate(Pi * 0.5, Si * 0.5);
        $e.scale(window.globalSettings.zoom.scale, window.globalSettings.zoom.scale);
        $e.translate(-Pi * 0.5, -Si * 0.5);
        $e.translate(Pi * 0.5 - uo.zh, Si * 0.5 - uo.Mh);
        for (let i=0; i < toRender.length; i++) {
            if (toRender[i][0] === 0 && window.globalSettings.hitboxes.enabled) { // circles
              $e.beginPath();
              $e.arc(toRender[i][1], toRender[i][2], toRender[i][3], 0, Math.PI * 2);
              $e.strokeStyle = toRender[i][4];
              $e.lineWidth = 1;
              $e.stroke();
            }
            if (toRender[i][0] === 1 && window.globalSettings.centerPoint.enabled) { // points
              $e.beginPath();
              $e.arc(toRender[i][1], toRender[i][2], 1, 0, Math.PI * 2);
              $e.fillStyle = toRender[i][3];
              $e.lineWidth = 1;
              $e.fill();
            }
            if (toRender[i][0] === 3 && window.globalSettings.placementAngles.enabled) { // lines
              $e.beginPath();
              $e.moveTo(toRender[i][1], toRender[i][2]);
              $e.lineTo(toRender[i][3], toRender[i][4]);
              $e.strokeStyle = toRender[i][5];
              $e.lineWidth = 1;
              $e.stroke();
            }
            if (toRender[i][0] === 4) { // shaded semicircles ///////////window.globalSettings.weaponRanges.enabled
                const angle = toRender[i][4]
                $e.globalAlpha = .333
                $e.beginPath();
                $e.arc(toRender[i][1], toRender[i][2], toRender[i][3], angle-(Math.PI/2), angle+(Math.PI/2), false);
                $e.fillStyle = toRender[i][5];
                $e.fill();
                $e.globalAlpha = 1
            }
        }
        $e.restore();
        // ENDEDIT
        window.requestAnimationFrame(Mr);
      }
      function Dr() {
        for (let n = 1; n < R().length; n++) {
          Ar(n, 0);
        }
      }
      function Br() {
        for (let t, e = 1; e < R().length; e++) {
          t = R()[e];
          if (t !== undefined && t.Bw === 2) {
            t.Bw = 1;
            document.getElementsByClassName("hat_action_button")[e - 1].innerHTML = "EQUIP";
          }
        }
      }
      function Lr(n, t, e, o) {
        const c = m().Lw({
          Cw: "menu-item subcontent-bg",
          parent: xi
        });
        m().Lw({
          parent: c,
          Cw: "header",
          tag: "p",
          text: t ? ao.dg[n].js : fo.iv[n].js
        });
        if (t && e && n !== To || !t) {
          const e = m().Lw({
            parent: c,
            Cw: "menu-pricing"
          });
          m().Lw({
            parent: e,
            Cw: "orange-button text-shadowed-3 action clan_action_button",
            Aw: t ? "KICK" : "JOIN",
            tag: "button",
            onmouseup: t ? n => {
              if (n.isTrusted) {
                es(o);
              }
            } : t => {
              if (t.isTrusted) {
                is(n);
              }
            }
          });
        }
      }
      function Cr(n, t, e, o) {
        const c = n + " - " + e;
        m().Lw({
          parent: Mi,
          tag: "option",
          text: c
        }).setAttribute("region", o);
      }
      function Ar(n, t) {
        if (R()[n] === undefined) {
          return;
        }
        const o = R()[n].Fm || "";
        const r = R()[n].js || "";
        const c = R()[n].description || "";
        const s = t === 1 ? "EQUIP" : t === 2 ? "UNEQUIP" : "BUY";
        const u = m().Lw({
          Cw: "menu-item",
          parent: Ti,
          style: R()[n].pw ? "display:none" : ""
        });
        m().Lw({
          tag: "img",
          src: Z[R()[n].rm].src,
          parent: u
        });
        const a = m().Lw({
          parent: u,
          Cw: "column-flex column-flex-extra"
        });
        m().Lw({
          parent: a,
          Cw: "header",
          tag: "p",
          Aw: r
        });
        m().Lw({
          parent: a,
          Cw: "description",
          tag: "p",
          Aw: c
        });
        const f = m().Lw({
          parent: u,
          Cw: "menu-pricing"
        });
        m().Lw({
          parent: f,
          Cw: "pricing hat_price_tag",
          Aw: o,
          tag: "p"
        });
        m().Lw({
          parent: f,
          Cw: "orange-button text-shadowed-3 action hat_action_button",
          Aw: s,
          tag: "button",
          onmouseup: t => {
            if (t.isTrusted && t.target && Po) {
              cs(n);
            }
          }
        });
      }
      function pr(n) {
        Yi.style.display = n ? "flex" : "none";
        if (n) {
          if (So) {
            Qi(false);
          }
          if (Oo) {
            Fi(false);
          }
        }
        Po = n;
      }
      $i();
      nr();
      Dr();
      _r();
      let Tr = false;
      function xr(n) {
        if (n) {
          return !Tr && (Tr = true, void setTimeout(() => {
            pr(n);
            Tr = false;
          }, Math.random() * 100 + 50));
        } else {
          return pr(n);
        }
      }
      function Hr() {
        for (let t = 0, e = Nt.bm; t < e.length; t++) {
          let o = e[t];
          o.zh = Pi / 2 - e.length * 107 / 2 + t * 107;
          o.Mh = Si - o.height - 5;
        }
        for (let t = 0, e = Nt.wm; t < e.length; t++) {
          let o = e[t];
          o.zh = Pi / 2 - e.length * 107 / 2 + t * 107;
          o.Mh = 5;
        }
        const t = lo.Mm;
        t.zh = Pi / 2 - t.width / 2;
        t.Mh = Si - 100 - 10 - t.height;
        const e = mo.ag;
        e.zh = Pi - e.width - 11;
        e.Mh = 5;
        Ko.Mh = 5;
        Ko.zh = e.zh - e.width - 11;
        qo.Mh = 5;
        qo.zh = Ko.zh - Ko.width - 11;
        Jo.Mh = 5;
        Jo.zh = qo.zh - qo.width - 11;
        const o = mo;
        o.Mh = 0;
        o.zh = Pi - o.width - 5;
        for (let t = 0, e = fo.rv; t < e.length; t++) {
          let i = e[t];
          i.zh = Pi - e.length * 107 + t * 107;
          i.Mh = o.height + 110;
        }
      }
      function kr(n) {
        Et(n);
        if (ht) {
          let n = dt;
          let e = mt;
          if (e.tu !== -1) {
            if (m().Fg(e.um, e.am, e.fm, e.lm) > 5) {
              let n = m().Qg(e.um, e.am, e.fm, e.lm);
              if (w.get(po)) {
                w.get(po)._h = n;
              }
              if (n !== zt && _t >= c().Tw) {
                Wc(t = n);
                zt = t;
                _t = 0;
              }
              if (!Dt) {
                Ht(n);
              }
            }
          } else if (Dt) {
            xt(zt);
          }
          if (m().Fg(n.um, n.am, n.fm, n.lm) > 5) {
            if (n.tu !== -1) {
              let t = m().Qg(n.um, n.am, n.fm, n.lm);
              if (t !== vt && Mt >= c().Tw) {
                Tt(t);
              }
            } else if (vt !== null) {
              vt = null;
              Rc();
            }
          }
        } else {
          const n = Xi();
          if (w.get(po)) {
            w.get(po)._h = n;
          }
          if (n !== zt && _t >= c().Tw) {
            kt(n);
          }
        }
        var t;
        const e = document.activeElement.type === "text" ? 0 : gt;
        if (e !== bt) {
          $c(e);
          bt = e;
        }
      }
      function Gr(n) {
        const e = Z[P().Yo];
        m().tm(n, e, Pi - e.$d.om, Si - e.$d.im - 5, e.$d.om, e.$d.im);
        const o = lo.km;
        n.drawImage(o, Pi - o.width - 5, Si - e.$d.im + 15);
        const r = lo.Um;
        n.drawImage(r, Pi - r.width - 5, Si - e.$d.im + 69);
        const c = lo.Em;
        n.drawImage(c, Pi - c.width - 5, Si - e.$d.im + 122);
        const s = lo.Ym;
        n.drawImage(s, Pi - s.width - 5, Si - e.$d.im + 186);
      }
      function Er(n, t, e) {
        for (let n, e = 0, o = fo.rv; e < o.length; e++) {
          n = o[e];
          n.dm(t);
        }
        let o = ao.dg[n];
        let i = fo.rv[0];
        t.drawImage(o.xg = m().Gm(o.js, c().xw, ii(), "#222222"), i.zh, i.Mh - o.xg.height);
      }
      function Ur() {
        return xo !== po;
      }
      function Yr(n, t) {
        const o = Ur();
        const r = lo.Mm;
        if (!o) {
          r.Bm = Y.default.Kd("age_bar_color") || "#F2C39F";
          r.Lm = Y.default.Kd("age_bar_bg_color") || "#5D3A37";
          r.dm(n);
        }
        if (!o) {
          lo.Om ||= m().Gm("AGE 0", 24, Y.default.Kd("age_color") || "#fff", "#222");
          const t = lo.Om;
          n.drawImage(t, Pi * 0.5 - t.width * 0.5, r.Mh - t.height);
          for (let t, e = 0, o = lo.bm; e < o.length; e++) {
            t = o[e];
            t.dm(n);
            if (t.ku === 1 && !ht) {
              let o = lo.hm[e];
              let i = W()[o].Hw;
              lo.Pm.dm(n, o, lo.zm[i], c().kw[i], t.zh, t.Mh - 150);
            }
          }
          for (let t, e = 0, o = lo.wm; e < o.length; e++) {
            if (e === 0) {
              Z[P().hi] ||= m().Gm("Choose item", 40, "#fff");
              const t = Z[P().hi];
              n.drawImage(t, Pi * 0.5 - t.width * 0.5, 110);
            }
            t = o[e];
            t.dm(n);
            if (t.ku === 1 && !ht) {
              let o = lo.ym[e];
              let i = W()[o].Hw;
              lo.Pm.dm(n, o, lo.zm[i], c().kw[i], t.zh, t.Mh + t.height);
            }
          }
        }
        if (mo.fg) {
          mo.dm(n, ao);
          const t = Z[P().Uo];
          n.drawImage(t, Pi - t.width - 5, 350);
          const o = lo.jm;
          const i = lo.Nm;
          n.drawImage(o, Pi - t.width - 10 - o.width, 350 + t.height / 2 - o.height / 2);
          if (lo.ns > 0) {
            n.translate(0, 50);
            let o = Z[P().Sr];
            m().tm(n, o, Pi - 50 - 5, 350);
            n.drawImage(i, Pi - t.width - 10 - i.width, 350 + t.height / 2 - i.height / 2);
            n.translate(0, -50);
          }
        }
        go.yv(n);
        qo.dm(n);
        Jo.dm(n);
        Ko.dm(n);
        mo.ag.dm(n);
        Gr(n);
        so.Yg(n, t);
        if (ho._g) {
          ho.$s(t);
          const o = 0.7 + Math.min(1, m().Ew.Gw(ho._g)) / 2;
          const i = ho.ug;
          const r = i.width * o || 1;
          const c = i.height * o || 1;
          n.save();
          n.globalAlpha = ho._g;
          n.drawImage(ho.ug, Pi * 0.5 - r / 2, 50 - c / 2, r, c);
          n.restore();
        }
        if (dt.tu !== -1) {
          jr(n, dt.um, dt.am, dt.fm, dt.lm);
        }
        if (mt.tu !== -1) {
          jr(n, mt.um, mt.am, mt.fm, mt.lm);
        }
        if (fo.ov[0]) {
          Er(fo.ov[0], n);
        }
        if (Io && Oi) {
          n.drawImage(Oi, 0, 0);
        }
      }
      function jr(n, t, e, o, r) {
        n.save();
        let s = zo / io;
        let u = o - t;
        let a = r - e;
        n.beginPath();
        n.arc(t * s, e * s, 90, 0, Math.PI * 2, false);
        n.closePath();
        n.fillStyle = "rgba(79, 64, 60, 0.6)";
        n.fill();
        let f = u;
        let l = a;
        let h = Math.sqrt(f ** 2 + l ** 2);
        let d = h > 90 ? h / 90 : 1;
        f /= d;
        l /= d;
        n.beginPath();
        n.arc(t * s + f, e * s + l, 45, 0, Math.PI * 2, false);
        n.closePath();
        n.fillStyle = "#fff";
        n.fill();
        n.restore();
      }
      function Nr(n, t) {
        let o = Z[P().Ni];
        for (let t = 0, i = b[u().an], r = i.length; t < r; t++) {
          const r = i[t];
          const s = ao.dg[r.Eh];
          const u = R()[r.wh];
          if (!(r.ku & h().Sc) && (!u.Uw || r.Eh === To)) {
            let t = r.bh ? fo.iv[r.bh] : null;
            let i = t && t.length !== 0 ? t.xg = m().Gm("[" + t.js + "]", c().xw, Y.default.Kd("clan_tag_color") || "#96C949", "#222222") : null;
            let u = t && t.Eh === r.Eh;
            const a = s.xg ||= m().Gm(s.js, c().xw, ii(), "#222222");
            let f = a.width + (i ? i.width + (u ? o.$d.om : 0) : 0);
            r.nm = Math.floor(r.zh / 5) !== Math.floor(r.Bh / 5) || Math.floor(r.Mh / 5) !== Math.floor(r.Ch / 5) || Math.floor(r._h) !== Math.floor(r.Hh) ? 1 : 0;
            if ((!r.Oh || r.nm) && i) {
              n.drawImage(i, r.zh - f / 2, r.Mh - c().Yw - i.height / 2);
            }
            if (!r.Oh || r.nm) {
              n.drawImage(a, r.zh - f / 2 + (i ? i.width : 0), r.Mh - c().Yw - a.height / 2);
            }
            let l = 0;
            if (r.jh > 0 && (!r.Oh || r.nm)) {
              const t = Z[P().Ur][r.jh - 1];
              l += t.$d.om;
              m().tm(n, t, r.zh - f / 2 + (i ? i.width : 0) + a.width, r.Mh - c().Yw - t.$d.im / 2 - 6, t.$d.om, t.$d.im);
            }
            if (u) {
              m().tm(n, o, r.zh - f / 2 + (i ? i.width : 0) + l + a.width + 4, r.Mh - c().Yw - o.$d.im - 6);
            }
            if (!r.Oh || r.nm) {
              Ln(r, n, Ao && Ao === r.bh || To && To === r.Eh);
            }
            if (r.Oh > 0) {
              Bn(r, n);
            }
          }
        }
        if (Vo) {
          for (let t = 0; t < He.length; t++) {
            const e = b[He[t]];
            for (let t = 0; t < e.length; t++) {
              const o = e[t];
              if (To && To === o.Eh) {
                const t = Z[P().tc];
                m().tm(n, t, o.zh - t.$d.om / 2, o.Mh - t.$d.im / 2, t.$d.om, t.$d.im);
              }
            }
          }
        }
        for (let t, o = 0, i = b[u().zn], r = i.length; o < r; o++) {
          t = i[o];
          Rt[u().zn] ||= m().Gm("Cow", c().xw, ri(), "#222222");
          const e = Rt[u().zn];
          n.drawImage(e, t.zh - e.width / 2, t.Mh - c().Yw - e.height / 2);
          Ln(t, n, false);
        }
        for (let t, e = 0, o = b[u().qn], i = o.length; e < i; e++) {
          t = o[e];
          Rt[u().qn] ||= m().Gm("Duck", c().xw, ri(), "#222222");
          const i = Rt[u().qn];
          n.drawImage(i, t.zh - i.width / 2, t.Mh - c().Yw - i.height / 2);
          Ln(t, n, false);
        }
        let r = null;
        let s = 0;
        let a = w.get(po);
        for (let t, o = 0, i = b[u().Hn], f = i.length; o < f; o++) {
          t = i[o];
          if (a) {
            let n = m().Fg(a.zh, a.Mh, t.zh, t.Mh);
            if (n < c().jw && (!r || n < s)) {
              r = t;
              s = n;
            }
          }
          Rt[u().Hn] ||= m().Gm("Golden Cow", c().xw, ri(), "#222222");
          const f = Rt[u().Hn];
          n.drawImage(f, t.zh - f.width / 2, t.Mh - c().Yw - f.height / 2);
          Ln(t, n, false);
        }
        for (let t, o = 0, i = b[u().Tn], r = i.length; o < r; o++) {
          t = i[o];
          Rt[u().Tn] ||= m().Gm("Shark", c().xw, ri(), "#222222");
          const r = Rt[u().Tn];
          n.drawImage(r, t.zh - r.width / 2, t.Mh - c().Yw - r.height / 2);
          Ln(t, n, false);
        }
        for (let t, e = 0, o = b[u().Wn], i = o.length; e < i; e++) {
          t = o[e];
          Rt[u().Wn] ||= m().Gm("Crocodile", c().xw, ri(), "#222222");
          const i = Rt[u().Wn];
          n.drawImage(i, t.zh - i.width / 2, t.Mh - c().Yw - i.height / 2);
          Ln(t, n, false);
        }
        for (let t, o = 0, i = b[u().xn], r = i.length; o < r; o++) {
          t = i[o];
          Rt[u().xn] ||= m().Gm("Wolf", c().xw, ri(), "#222222");
          const r = Rt[u().xn];
          n.drawImage(r, t.zh - r.width / 2, t.Mh - c().Yw - r.height / 2);
          Ln(t, n, false);
        }
        if (r) {
          Ho = r.tu;
          Z[P().Lr] ||= m().Gm("[Interact]", 24, "#fff", "#222222");
          const t = Z[P().Lr];
          n.drawImage(t, r.zh - t.width / 2, r.Mh - 40 - t.height / 2);
        } else {
          Ho &&= 0;
        }
        for (let t, o = 0, i = b[u().En], r = i.length; o < r; o++) {
          t = i[o];
          Rt[u().En] ||= m().Gm("Mammoth", c().xw, ri(), "#222222");
          const r = Rt[u().En];
          n.drawImage(r, t.zh - r.width / 2, t.Mh - c().Yw - r.height / 2);
          Ln(t, n, false);
        }
        for (let t, o = 0, i = b[u().Gn], r = i.length; o < r; o++) {
          t = i[o];
          Rt[u().Gn] ||= m().Gm("Dragon", c().xw, ri(), "#222222");
          const r = Rt[u().Gn];
          n.drawImage(r, t.zh - r.width / 2, t.Mh - c().Yw - r.height / 2);
          Ln(t, n, false);
        }
        for (let t = 0, o = b[u().an], i = o.length; t < i; t++) {
          const e = o[t];
          const i = ao.dg[e.Eh];
          const r = R()[e.wh];
          if (Wo > (r.Uw ?? false)) {
            const t = i.Nw ||= m().Gm("ID " + i.tu, c().xw, "#00FFFF", "#000000");
            n.drawImage(t, e.zh - t.width / 2, e.Mh - c().Yw - 52.5);
          }
        }
      }
      function Or(n, t, e, o) {
        const s = parseFloat(Y.default.Kd("grid_cell_width")) || c().Ow;
        const u = parseFloat(Y.default.Kd("grid_cell_height")) || c().Ow;
        const a = Y.default.Kd("grid_opacity");
        const f = a === null || a === "" || a === undefined ? 0.06 : parseFloat(a) || 0;
        const l = Y.default.Kd("grid_color") || "#000000";
        const h = Math.floor(t / s) * s;
        const d = Math.floor(e / u) * u;
        const m = (qi + s) / o;
        const g = (Ki + u) / o;
        n.save();
        n.lineWidth = 4;
        n.globalAlpha = f;
        n.strokeStyle = l;
        n.beginPath();
        // GRID EDIT
        if (window.globalSettings.grid.limit) {
            const lo = window.globalSettings.accurateWorldBoundaries.enabled?150:160;
            const hi = window.globalSettings.accurateWorldBoundaries.enabled?9850:9840;
            const clamp = v=>Math.min(Math.max(v, lo), hi);
            for (let t = 0; t <= m; t += s) {
              const x = h+t;
              if (x<lo || x>hi) continue;
              n.moveTo(x, clamp(d));
              n.lineTo(x, clamp(d+g));
            }
            for (let t = 0; t <= g; t += u) {
              const y = d+t;
              if (y<lo || y>hi) continue;
              n.moveTo(clamp(h), y);
              n.lineTo(clamp(h+m), y);
            }
        } else {
            for (let t = 0; t <= m; t += s) {
              n.moveTo(h + t, d);
              n.lineTo(h + t, d + g);
            }
            for (let t = 0; t <= g; t += u) {
              n.moveTo(h, d + t);
              n.lineTo(h + m, d + t);
            }
        }
        // ENDEDIT
        n.stroke();
        n.restore();
      }
      function Pr(n, t) {
        // ZOOM EDIT
        yi.Wv = uo.zh - (Pi * 0.5)/window.globalSettings.zoom.scale;
        yi.Xv = uo.Mh - (Si * 0.5)/window.globalSettings.zoom.scale;
        yi.Fv = uo.zh + (Pi * 0.5)/window.globalSettings.zoom.scale;
        yi.Qv = uo.Mh + (Si * 0.5)/window.globalSettings.zoom.scale;
        // ENDEDIT
        let o = ro;
        for (let t, i = 0, r = ee().length; i < r; i++) {
          // WORLD BOUND EDIT
          t = window.globalSettings.accurateWorldBoundaries.enabled?window.globalSettings.accurateWorldBoundaries.bounds[i]:ee()[i];
          // ENDEDIT
          if (m().Pw(o, t, yi)) {
            let i = ye(t.Sw);
            let r = !i && $o ? be(t.Sw) : null;
            if (r) {
              let t = Math.min(o.w, r.width);
              let i = Math.min(o.ed, r.height);
              n.drawImage(r, 0, r.height - i, t, i, o.zh, o.Mh, o.w, o.ed);
            } else {
              n.fillStyle = i || t.Bm;
              n.fillRect(o.zh, o.Mh, o.w, o.ed);
            }
          }
        }
      }
      function Sr(n, t) {
        if (bo.qv) {
          bo.Kv += t;
          if (bo.Kv <= bo.transition) {
            bo._v = m().Ih(bo.Nv, bo.Lv, bo.Kv / bo.transition);
            bo.zv = m().Ih(bo.Ov, bo.Av, bo.Kv / bo.transition);
            bo.Dv = m().Ih(bo.Pv, bo.Bv, bo.Kv / bo.transition);
            bo.Mv = m().Ih(bo.Sv, bo.Cv, bo.Kv / bo.transition);
          } else {
            bo.qv = false;
            bo._v = bo.Lv;
            bo.zv = bo.Av;
            bo.Dv = bo.Bv;
            bo.Mv = bo.Cv;
          }
        }
        n.globalAlpha = 0.3;
        n.fillStyle = "red";
        let o = yo;
        let r = ro;
        o.Wv = 0;
        o.Xv = 0;
        o.Fv = c().Sg;
        o.Qv = bo.zv;
        if (m().Pw(r, o, yi)) {
          n.fillRect(r.zh, r.Mh, r.w, r.ed);
        }
        o.Wv = 0;
        o.Xv = 0;
        o.Fv = bo._v;
        o.Qv = c().qg;
        if (m().Pw(r, o, yi)) {
          n.fillRect(r.zh, r.Mh, r.w, r.ed);
        }
        o.Wv = bo.Dv;
        o.Xv = 0;
        o.Fv = c().Sg;
        o.Qv = c().qg;
        if (m().Pw(r, o, yi)) {
          n.fillRect(r.zh, r.Mh, r.w, r.ed);
        }
        o.Wv = 0;
        o.Xv = bo.Mv;
        o.Fv = c().Sg;
        o.Qv = c().qg;
        if (m().Pw(r, o, yi)) {
          n.fillRect(r.zh, r.Mh, r.w, r.ed);
        }
        n.globalAlpha = 1;
      }
      function qr(n, t) {
        // ZOOM EDIT
        n.translate(Pi * 0.5, Si * 0.5);
        n.scale(window.globalSettings.zoom.scale, window.globalSettings.zoom.scale);
        n.translate(-Pi * 0.5, -Si * 0.5);
        // ENDEDIT
        
        n.translate(Pi * 0.5 - uo.zh, Si * 0.5 - uo.Mh);
        Pr(n);
        if (/*Zo*/window.globalSettings.grid.enabled) { // ZOOM EDIT ENDEDIT
          Or(n, uo.zh - (Pi * 0.5)/window.globalSettings.zoom.scale, uo.Mh - (Si * 0.5)/window.globalSettings.zoom.scale, io*window.globalSettings.zoom.scale); //ZOOM EDIT ENDEDIT
        }
        zn(n, t);
        Dn(n);
        if (bo.yu) {
          Sr(n, t);
        }
        Nr(n);
        so.$s(n, t * 1000);
      }
      function Kr(n) {
        for (let t in It().me) {
          if (It().me[t] === n) {
            return t;
          }
        }
      }
      let Jr = new Uint8Array(4096);
      let Ir = 0;
      function Zr(n) {
        const e = n.data;
        if (typeof e == "string") {
          const n = JSON.parse(e);
          switch (n[0]) {
            case It().me.Be:
              Qr(n);
              break;
            case It().me.Qe:
              Rr(n);
              break;
            case It().me.Fe:
              Ee.send(window[fe().ls("solve")](n[1]));
              break;
            case It().me.ve:
              Uc(n);
              break;
            case It().me.Ee:
              xc(n);
              break;
            case It().me._e:
              pc(n);
              break;
            case It().me.Ae:
              uc(n);
              break;
            case It().me.pe:
              oc();
              break;
            case It().me.Ce:
              Bc(n);
              break;
            case It().me.De:
              lc(n);
              break;
            case It().me.xe:
              ic(n[1]);
              break;
            case It().me.Xe:
              ac(n);
          }
        } else {
          let n = new Uint8Array(e);
          Ir = n.byteLength;
          if (c().kg !== 1) {
            E(Jr, n);
          } else {
            Jr = n;
          }
          switch (Jr[0]) {
            case It().me.ge:
              Gc();
              break;
            case It().me.ze:
              Hc();
              break;
            case It().me.Ue:
              Tc();
              break;
            case It().me.we:
              Ec();
              break;
            case It().me.He:
              $r();
              break;
            case It().me.ye:
              kc();
              break;
            case It().me.Le:
              Ac();
              break;
            case It().me.Ne:
              Cc();
              break;
            case It().me.Te:
              fc();
              break;
            case It().me.Ge:
              Lc();
              break;
            case It().me.be:
              break;
            case It().me.Me:
              dc();
              break;
            case It().me.ke:
              Dc();
              break;
            case It().me.Oe:
              gc();
              break;
            case It().me.Re:
              Fr();
              break;
            case It().me.Ie:
              hc();
              break;
            case It().me.Se:
              yc();
              break;
            case It().me.Pe:
              mc();
              break;
            case It().me.qe:
              zc();
              break;
            case It().me.Ke:
              _c();
              break;
            case It().me.Je:
              bc();
              break;
            case It().me.Ze:
              wc();
              break;
            case It().me.je:
              vc();
              break;
            case It().me.We:
              sc();
              break;
            case It().me.Ve:
              cc();
          }
        }
      }
      function Vr() {
        G();
      }
      function Wr(n) {
        switch (n.code) {
          case It().po.qw:
            alert("disconnected: Banned");
            break;
          case It().po.Kw:
            alert("disconnected: Kicked");
            break;
          case It().po.Jw:
            alert("disconnected: not iNITIALISED");
            break;
          case It().po.Iw:
            alert("disconnected: player already exists");
            break;
          case It().po.Zw:
            alert("disconnected: is hacker");
            break;
          case It().po.Vw:
            alert("disconnected: token invalid, try reloading?");
            break;
          case It().po.Ww:
            alert("disconnected: unknown");
            break;
          case It().po.Xw:
            Xr();
            break;
          case It().po.Fw:
            alert("Client Encryption unable to be established, try reloading?");
            break;
          case 1006:
            alert("Your internet has disconnected, you have been banned or kicked, or a error has occurred");
        }
        _o = false;
        no = false;
      }
      function Xr() {
        zr(false);
      }
      function Fr() {
        let t = Jr[1] | Jr[2] << 8;
        const e = qe.decode(new Uint8Array(Jr.buffer, 3, Ir - 3));
        so.Og(t, (ao.dg[t] ? ao.dg[t].js : "XX") + ": " + e);
      }
      function Qr(n) {
        To = n[1];
        const e = n[2];
        for (let n = 0; n < e + 1; n++) {
          ao.Rg(n, "", 0);
        }
        for (let n = 0; n < 20; n++) {
          fo.uv(n, "", 0);
        }
        for (let e, o = 0, i = n[3]; o < i.length; o++) {
          e = i[o];
          ao.tv(e[0], bi ? "Sploop" + e[0] : e[1], e[2], true);
        }
        for (let t, e = 0, o = n[4]; e < o.length; e++) {
          t = o[e];
          fo.fv(t[0], t[1], t[2]);
        }
        Mc();
        const o = n[5];
        if (o) {
          switch (o[0]) {
            case "BR":
              {
                const [n, e, i, r, c, s, u, a, f, l, h, d, m, g, v, w] = o;
                bo.yu = true;
                bo.qv = e;
                bo.Kv = i;
                bo.transition = r;
                bo._v = c;
                bo.zv = s;
                bo.Dv = u;
                bo.Mv = a;
                bo.Nv = f;
                bo.Ov = l;
                bo.Pv = h;
                bo.Sv = d;
                bo.Lv = m;
                bo.Av = g;
                bo.Bv = v;
                bo.Cv = w;
                break;
              }
          }
        }
        _o = true;
      }
      function Rr(n) {
        switch (n[1]) {
          case "BR":
            {
              const [t, e, o, i, r, c, s, u, a, f, l, h, d, m, g, v, w] = n;
              bo.qv = o;
              bo.Kv = i;
              bo.transition = r;
              bo._v = c;
              bo.zv = s;
              bo.Dv = u;
              bo.Mv = a;
              bo.Nv = f;
              bo.Ov = l;
              bo.Pv = h;
              bo.Sv = d;
              bo.Lv = m;
              bo.Av = g;
              bo.Bv = v;
              bo.Cv = w;
              break;
            }
        }
      }
      function $r() {
        const n = Jr[1] | Jr[2] << 8;
        const t = w.get(n);
        if (t) {
          t.bh = Jr[3];
          t.yh = Jr[4];
        }
      }
      function nc() {
        if (wo) {
          if (zi === 0) {
            gr(_i.zw, _i._w, _i.port, _i.Mw, _i.js);
          } else {
            if (!_o) {
              return;
            }
            ns(Ni.value);
            eo = 1;
          }
        }
      }
      function tc(n) {
        eo = n;
      }
      function ec() {
        nc();
      }
      function oc(n) {
        //ve().Au(); ADS EDIT ENDEDIT
        lo.ig();
        go.wv(uo.zh, uo.Mh);
        Br();
        po = xo = 0;
        no = false;
        gt = 0;
        lo.ym.length = 0;
        hr(true);
        me().refresh();
      }
      function ic(n) {
        ho.Cf(n, 3);
      }
      function rc(n, t, e) {
        switch (n) {
          case ce().Hn:
          case ce().Gn:
          case ce().En:
            ho.Cf(ue()[n].description, 3);
            break;
          default:
            ho.Cf("An event is underway!");
        }
        go.mv(new (Xt())(t / 255, e / 255));
      }
      function cc() {
        rc(Jr[1], Jr[2], Jr[3]);
      }
      function sc() {
        ho.Cf("Event has ended.");
        go.gv();
      }
      function uc(n) {
        lo.og(n[1][Vt().nn]);
      }
      function ac(n) {
        lo.rg(n[1]);
      }
      function fc() {
        const n = Math.max(0, Jr[1] | Jr[2] << 8 | Jr[3] << 16 | Jr[4] << 24);
        const t = Jr[5] | Jr[6] << 8 | Jr[7] << 16 | Jr[8] << 24;
        const e = Jr[9] | Jr[10] << 8 | Jr[11] << 16 | Jr[12] << 24;
        const o = Jr[13] | Jr[14] << 8 | Jr[15] << 16 | Jr[16] << 24;
        const i = Jr[17] | Jr[18] << 8 | Jr[19] << 16 | Jr[20] << 24;
        lo.tg(n);
        lo.ng(t, e, o, i);
      }
      function lc(n) {
        for (let t = 0; t < n[1].length; t++) {
          ao.ev(n[1][t][0], n[1][t][1]);
        }
        mo.$s(ao, n[1]);
      }
      function hc() {
        for (let n = 1; n < Ir; n++) {
          lo.zm[n - 1] = Jr[n];
        }
      }
      function dc() {
        for (let n = 1; n < Ir; n += 5) {
          const t = Jr[n];
          const e = Jr[n + 1] | Jr[n + 2] << 8;
          const o = Jr[n + 3];
          let i = Jr[n + 4];
          const r = w.get(e);
          if (r) {
            switch (t) {
              case ie().H:
                if (r.Jh && !r.Sh.value) {
                  let n = m().Qw(o);
                  r.Jh.active = true;
                  r.Jh.Zh = n;
                  r.Sh.Rw = r.Sh.$w = 10;
                }
                break;
              case ie().p:
                let n = i ? Math.PI / 2 : Math.PI;
                let t = W()[o];
                r.Sh.max = n;
                r.Sh.min = 0;
                const e = t.reload / 1000;
                r.Sh.$w = r.Sh.max / (e * 0.25);
                r.Sh.Rw = r.Sh.max / (e * 0.75);
                r.Sh.$s(0.01);
            }
          }
        }
      }
      function mc() {
        go.vv();
        Ci.style.display = "block";
        Li.style.display = "none";
        Ao = null;
        fo.ov.length = 0;
        Di.innerHTML = "Clans";
        Mc();
      }
      function gc() {
        Ci.style.display = "none";
        Li.style.display = "block";
        let n = Jr[1];
        let t = Jr[2];
        Ao = n;
        Di.innerText = fo.iv[Ao].js;
        m().nb(xi);
        for (let n = 3; n < Ir; n++) {
          Lr(Jr[n], true, t, n - 3);
        }
      }
      function vc() {
        Jc(Jr[1]);
      }
      function wc() {
        go.vv();
        for (let n = 1; n < Ir; n += 3) {
          let t = Jr[n + 0];
          let e = Jr[n + 1] / 255;
          let o = Jr[n + 2] / 255;
          if (t && t !== To) {
            go.bv(e, o);
          }
        }
      }
      function bc() {
        let n = Jr[1];
        m().nb(xi);
        for (let t = 2; t < Ir; t++) {
          Lr(Jr[t], true, n, t - 2);
        }
      }
      function yc() {
        let n = Jr[1];
        let t = Jr[2];
        let e = qe.decode(new Uint8Array(Jr.buffer, 3, Ir - 3));
        fo.fv(n, t, e);
        if (!n && So) {
          Mc();
        }
      }
      function zc() {
        let n = Jr[1];
        fo.av(n);
        if (!n && So) {
          Mc();
        }
      }
      function _c() {
        for (let n = 1; n < Ir; n++) {
          fo.sv(Jr[n]);
        }
      }
      function Mc() {
        m().nb(xi);
        for (let t, e = 0, o = fo.iv; e < o.length; e++) {
          t = o[e];
          if (t.active) {
            Lr(e, false, false);
          }
        }
      }
      function Dc() {
        for (let t = 1; t < Ir; t += 2) {
          const e = Jr[t];
          const o = Jr[t + 1];
          const i = o === 1 ? "EQUIP" : o === 2 ? "UNEQUIP" : "BUY";
          R()[e].Bw = o;
          document.getElementsByClassName("hat_price_tag")[e - 1].style.display = o === 1 || o === 2 ? "none" : "block";
          document.getElementsByClassName("hat_action_button")[e - 1].innerHTML = i;
        }
      }
      function Bc(n) {
        const e = w.get(n[2]);
        if (e) {
          so.Ng(e.zh, e.Mh, 0.18, 800, n[1], n[3] === 0 ? Y.default.Kd("damage_color") || "#fff" : Y.default.Kd("heal_color") || "#8ecc51");
        }
      }
      function Lc() {
        const t = Jr[1] | Jr[2] << 8;
        const e = qe.decode(new Uint8Array(Jr.buffer, 3, Ir - 3));
        const o = w.get(t);
        if (!!o || !bi || o.Eh !== To && (!Ao || Ao !== o.bh)) {
          so.Pg(e, o);
        }
      }
      function Cc() {
        let t = Jr[1] | Jr[2] << 8;
        Oi = m().Gm(t + "ms", c().xw, c().Rv, "#222222");
      }
      function Ac() {
        const n = Jr[1];
        ao.nv(n);
        mo.$s(ao);
      }
      function pc(n) {
        ao.tv(n[1], bi ? "Sploop" + n[1] : n[2], 0, true);
      }
      function Tc() {
        lo.ym.length = 0;
        lo.sg();
        Hr();
      }
      function xc(n) {
        const t = n[1];
        for (let n = 0; n < t.length; n++) {
          lo.ym.push(t[n]);
        }
        lo.sg();
        Hr();
      }
      function Hc() {
        if (Ir > 1) {
          lo.hm.length = 0;
          for (let n = 1; n < Ir; n++) {
            lo.hm.push(Jr[n]);
          }
          lo.$s();
          Hr();
        }
      }
      function kc() {
        no = true;
        hr(false);
        po = Jr[1] | Jr[2] << 8;
        xo = Jr[3] | Jr[4] << 8;
      }
      function Gc() {
        // EDIT
        toRender = []
        // ENDEDIT
        const n = +new Date();
        for (let t = 1; t < Ir; t += 19) {
          const e = Jr[t + 8];
          const o = Jr[t + 2] | Jr[t + 3] << 8;
          const i = Jr[t + 10];
            // EDIT
            if (window.globalSettings.coords.enabled) {
                if (o === xo) {
                  const x = Jr[t + 4] | Jr[t + 5] << 8;
                  const y = Jr[t + 6] | Jr[t + 7] << 8;
                  if (x !== coords[0] || y !== coords[1]) {
                    coords[0] = x
                    coords[1] = y
                  }
                }
            }
            // ENDEDIT
          if (e & h().qc) {
            A(o);
            //EDIT
            delete entityUids[o]
            //ENDEDIT
          } else {
            L(Jr[t], o, Jr[t + 1], Jr[t + 8], Jr[t + 4] | Jr[t + 5] << 8, Jr[t + 6] | Jr[t + 7] << 8, m().Qw(Jr[t + 9]), i, Jr[t + 11], Jr[t + 12], Jr[t + 13], Jr[t + 14], Jr[t + 15], Jr[t + 16], Jr[t + 17], Jr[t + 18], n);
            //EDIT
            entityUids[o] = [Jr[t], Jr[t + 4] | Jr[t + 5] << 8, Jr[t + 6] | Jr[t + 7] << 8, radiusMap[Jr[t]], Jr[t+10], Jr[t + 9] / 255 * (Math.PI*2) - Math.PI]
            //ENDEDIT
          }
        }
        //EDIT
        let reordered = [];
        let keys = Object.keys(entityUids);
        for (let i=0; i < keys.length; i++) {
          const entity = entityUids[keys[i]];
          if (window.globalSettings.hitboxes.enabled) toRender.push([0, entity[1], entity[2], entity[3], "red"]); // hitboxes
          if (window.globalSettings.centerPoint.enabled) toRender.push([1, entity[1], entity[2], "red"]); // center dots
          if (window.globalSettings.placementAngles.enabled) toRender.push([3, entity[1], entity[2], entity[1]+entity[3]*Math.cos(entity[5]), entity[2]+entity[3]*Math.sin(entity[5]), "red"]); // angles

          // ranges and hitbox on held items
          if (entity[0] === 0) { // if player
              if (rangeMap[entity[4]] && window.globalSettings.weaponRanges.enabled) { // if item held has a range
                  toRender.push([4, entity[1], entity[2], rangeMap[entity[4]], entity[5], "red"]);
              } else if (itemIdToEntityIdMap[entity[4]]) { // else if held item has a radius
                  const xOffset = itemIdToOffsetsMap[entity[4]].spriteXOffsetPx
                  const yOffset = itemIdToOffsetsMap[entity[4]].spriteYOffsetPx
                  const spriteWidth = itemIdToOffsetsMap[entity[4]].spriteWidth
                  const spriteHeight = itemIdToOffsetsMap[entity[4]].spriteHeight
                  //const localX = 70 / (0.9 * 0.05) - itemIdToOffsetsMap[entity[4]].spriteWidth / 2 - xOffset;
                  //const localY = -itemIdToOffsetsMap[entity[4]].spriteHeight / 2 + yOffset;
                  //const localX = 29 - itemIdToOffsetsMap[entity[4]].spriteWidth / 2 + xOffset;
                  //const localY = -48 + yOffset;
                  let xpos = entity[1] + xOffset*Math.cos(entity[5]) - yOffset*Math.sin(entity[5]) + 35
                  let ypos = entity[2] + xOffset*Math.sin(entity[5]) + yOffset*Math.cos(entity[5]) + 35
                  console.log(xpos, ypos)
                  toRender.push([0, xpos, ypos, radiusMap[itemIdToEntityIdMap[entity[4]]], "red"]);
                  //const worldX = localX * Math.cos(entity[5]) - localY * Math.sin(entity[5]);
                  //const worldY = localX * Math.sin(entity[5]) + localY * Math.cos(entity[5]);
              }
          }

          // basing reference lines
          if (window.globalSettings.basingReferenceLines.enabled) {
            if (entity[0] === 19 || entity[0] === 20 || entity[0] === 21 || entity[0] === 5) { // only tree/stone/bush
              reordered.push({x:entity[1],y:entity[2],r:entity[3]});
            }
          }
        }

        // basing reference lines
        if (window.globalSettings.basingReferenceLines.enabled) {
            const pairs = findAllPairsWithinX(reordered, 10); // find all buildings within 10 units
            for (let i=0; i < pairs.length; i++) {
                const _35Holo = getFittedCircleCenter(pairs[i][0], pairs[i][1], 35);
                toRender.push([0, _35Holo.pointA.x, _35Holo.pointA.y, 35, "blue"]);
                toRender.push([0, _35Holo.pointB.x, _35Holo.pointB.y, 35, "blue"]);
                toRender.push([4, _35Holo.pointA.x, _35Holo.pointA.y, 165, _35Holo.angle+Math.PI]);
                toRender.push([4, _35Holo.pointB.x, _35Holo.pointB.y, 165, _35Holo.angle]);

                const _40Holo = getFittedCircleCenter(pairs[i][0], pairs[i][1], 40);
                toRender.push([0, _40Holo.pointA.x, _40Holo.pointA.y, 40, "yellow"]);
                toRender.push([0, _40Holo.pointB.x, _40Holo.pointB.y, 40, "yellow"]);
            
                const _42Holo = getFittedCircleCenter(pairs[i][0], pairs[i][1], 42);
                toRender.push([0, _42Holo.pointA.x, _42Holo.pointA.y, 42, "red"]);
                toRender.push([0, _42Holo.pointB.x, _42Holo.pointB.y, 42, "red"]);
            }
        }
        //ENDEDIT
      }
      function Ec() {
        To = Jr[1];
        const t = xe()(To, window[(0, ae.ls)("getMemTo")]());
        H(t[0], t[1], t[2], t[3]);
        ke = window["_$"]();
        const e = oo;
        Ye(new Uint8Array([It().$e.no, Jr[1], ...t, ...e]));
        wo = true;
      }
      function Uc(n) {
        hr(false);
        no = true;
        po = xo = n[1];
        ao.tv(To, n[2], n[3], true);
        lo.tg(n[3]);
        lo.hm = n[4];
        let t = n[5];
        lo.ng(t[0], t[1], t[2], t[3]);
        uc([It().me.Ae, n[6]]);
        if (n[7]) {
          rc(n[7][1], n[7][2], n[7][3]);
        }
        lo.$s();
        lo.sg();
        Hr();
      }
      function Yc() {}
      function jc(n) {
        Ye(new Uint8Array([It().$e.lo, ...Qe.encode(n)]));
      }
      function Nc(n) {
        Ye(new Uint8Array([It().$e.Ao, n]));
      }
      function Oc(n) {
        Ye(new Uint8Array([It().$e.vo, +n]));
      }
      function Pc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Ye(new Uint8Array([It().$e._o, n & 255, n >> 8 & 255]));
      }
      function Sc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Ye(new Uint8Array([It().$e.ro, n & 255, n >> 8 & 255]));
      }
      function qc() {
        Ye(new Uint8Array([It().$e.co]));
      }
      function Kc(n) {
        Ye(new Uint8Array([It().$e.uo, n & 255, n >> 8]));
      }
      function Jc(n) {
        Ye(new Uint8Array([It().$e.mo, n]));
      }
      function Ic(n) {
        Ye(new Uint8Array([It().$e.ao, n]));
      }
      function Zc(n) {
        if (n != null) {
          Ye(new Uint8Array([It().$e.io, n]));
        }
      }
      function Vc(n) {
        Ye(new Uint8Array([It().$e.ho, n]));
      }
      function Wc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Ye(new Uint8Array([It().$e.oo, n & 255, n >> 8 & 255]));
      }
      function Xc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Ye(new Uint8Array([It().$e.yo, n & 255, n >> 8 & 255]));
      }
      function Fc() {
        Ye(new Uint8Array([It().$e.zo]));
      }
      function Qc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Ye(new Uint8Array([It().$e.wo, n & 255, n >> 8 & 255]));
      }
      function Rc() {
        Ye(new Uint8Array([It().$e.bo]));
      }
      function $c(n) {
        Ye(new Uint8Array([It().$e.eo, n]));
      }
      function ns(n) {
        const e = fe().getData("skin");
        const o = fe().getData("accessory");
        const r = fe().getData("back");
        const c = [It().$e.so, n, e, "FFFFFEEEEGGBBBAAA", o, undefined, undefined, r];
        const s = fe().getData("accToken", "");
        const u = fe().getData("accMail", "");
        if (s && u) {
          c[5] = u;
          c[6] = s;
        } else {
          c[5] = 0;
          c[6] = 0;
        }
        Ye(JSON.stringify(c));
      }
      function ts(n) {
        Ye(new Uint8Array([It().$e.Co, ...Qe.encode(n)]));
      }
      function es(n) {
        Ye(new Uint8Array([It().$e.Lo, n]));
      }
      function os(n) {
        Ye(new Uint8Array([It().$e.Bo, n]));
      }
      function is(n) {
        Ye(new Uint8Array([It().$e.Do, n]));
      }
      function rs() {
        Ye(new Uint8Array([It().$e.Mo]));
      }
      function cs(n) {
        Ye(new Uint8Array([It().$e.fo, n]));
      }
      new Uint8Array(1000);
    },
    5108: function (n, e, o) {
      "use strict";

      o.r(e);
      var r = o(3543);
      const c = "texturePacks";
      const s = "activeTexturePackId";
      const u = new Set(["_name", "_author", "_version", "_id"]);
      let a = null;
      let f = Object.create(null);
      let l = Object.create(null);
      let h = false;
      const d = "packs";
      let m = null;
      let g = Object.create(null);
      let v = false;
      let w = null;
      let b = null;
      function y(n, t) {
        if (m) {
          try {
            m.transaction(d, "readwrite").objectStore(d).put(t, n);
          } catch (n) {}
        }
      }
      function z(n) {
        if (m) {
          try {
            m.transaction(d, "readwrite").objectStore(d).delete(n);
          } catch (n) {}
        }
      }
      function _(n) {
        if (typeof n != "string" || n.length === 0) {
          return "";
        }
        let e = n.indexOf("?");
        if (e !== -1) {
          n = n.slice(0, e);
        }
        e = n.indexOf("#");
        if (e !== -1) {
          n = n.slice(0, e);
        }
        const o = n.indexOf("://");
        if (o !== -1) {
          const e = n.indexOf("/", o + 3);
          n = e === -1 ? "" : n.slice(e);
        }
        if (n.charAt(0) === "/") {
          n = n.slice(1);
        }
        return n;
      }
      function M(n) {
        const e = n.lastIndexOf("/");
        const o = e === -1 ? n : n.slice(e + 1);
        const r = o.lastIndexOf(".");
        if (r === -1) {
          return o;
        } else {
          return o.slice(0, r);
        }
      }
      function D(n) {
        if (!Array.isArray(n) || n.length === 0) {
          return false;
        }
        const e = n[0];
        return e && typeof e == "object" && Array.isArray(e[(0, r.ls)("rules")]);
      }
      function B(n) {
        const t = Object.create(null);
        for (const e in n) {
          if (u.has(e)) {
            continue;
          }
          const o = n[e];
          if (typeof o != "string" || o.length === 0) {
            continue;
          }
          const i = _(e);
          if (i) {
            t[i] = o;
          }
          const r = M(i || e);
          if (r && !t[r]) {
            t[r] = o;
          }
        }
        return t;
      }
      function L(n) {
        const e = Object.create(null);
        for (let o = 0; o < n.length; o++) {
          const i = n[o];
          if (!i || i[(0, r.ls)("enabled")] === false) {
            continue;
          }
          const c = i[(0, r.ls)("rules")];
          if (Array.isArray(c)) {
            for (let n = 0; n < c.length; n++) {
              const o = c[n];
              if (!o || o[(0, r.ls)("enabled")] === false) {
                continue;
              }
              const i = o[(0, r.ls)("criteria")];
              const s = o[(0, r.ls)("actions")];
              if (!i || !Array.isArray(s) || s.length === 0) {
                continue;
              }
              const u = s[0];
              if (!u || u[(0, r.ls)("type")] !== "redirect-to" || !u[(0, r.ls)("details")]) {
                continue;
              }
              const a = u[(0, r.ls)("details")][(0, r.ls)("value")];
              if (typeof a != "string" || a.length === 0) {
                continue;
              }
              const f = _(i[(0, r.ls)("value")] || "");
              if (f) {
                e[f] = a;
              }
              const l = M(f);
              if (l && !e[l]) {
                e[l] = a;
              }
            }
          }
        }
        return e;
      }
      function C() {
        return g;
      }
      function A() {
        f = Object.create(null);
        l = Object.create(null);
        if (!a) {
          return;
        }
        const t = C()[a];
        if (!t) {
          return;
        }
        let e;
        try {
          e = JSON.parse(t[(0, r.ls)("data")]);
        } catch (n) {
          return;
        }
        if (D(e)) {
          f = L(e);
        } else {
          f = B(e);
          for (const t in e) {
            if (typeof e[t] == "string") {
              l[t] = e[t];
            }
          }
        }
      }
      function p() {
        let t = null;
        try {
          t = window.localStorage.getItem(c);
        } catch (n) {
          return;
        }
        if (t) {
          try {
            const n = JSON.parse(t);
            if (n && typeof n == "object") {
              for (const t in n) {
                const e = n[t];
                if (e && typeof e == "object" && !g[t]) {
                  g[t] = e;
                  y(t, e);
                }
              }
            }
          } catch (n) {}
          if (m) {
            try {
              window.localStorage.removeItem(c);
            } catch (n) {}
          }
        }
      }
      function T(n) {
        const t = C();
        if (n !== null && !t[n]) {
          return false;
        }
        try {
          if (n === null) {
            window.localStorage.removeItem(s);
          } else {
            window.localStorage.setItem(s, n);
          }
        } catch (n) {
          return false;
        }
        a = n;
        A();
        return true;
      }
      (function () {
        try {
          a = window.localStorage.getItem(s) || null;
        } catch (n) {
          a = null;
        }
        A();
        new Promise(function (n) {
          let t;
          try {
            if (!window.indexedDB) {
              n(null);
              return;
            }
            t = window.indexedDB.open("sploopTexturePacks", 1);
          } catch (t) {
            n(null);
            return;
          }
          t.onupgradeneeded = function () {
            try {
              const n = t.result;
              if (!n.objectStoreNames.contains(d)) {
                n.createObjectStore(d);
              }
            } catch (n) {}
          };
          t.onsuccess = function () {
            n(t.result);
          };
          t.onerror = function () {
            n(null);
          };
        }).then(function (n) {
          m = n;
          return new Promise(function (n) {
            const t = Object.create(null);
            if (!m) {
              n(t);
              return;
            }
            let e;
            try {
              e = m.transaction(d, "readonly").objectStore(d).openCursor();
            } catch (e) {
              n(t);
              return;
            }
            e.onsuccess = function () {
              const o = e.result;
              if (o) {
                try {
                  const n = o.value;
                  if (n && typeof n == "object") {
                    t[o.key] = n;
                  }
                } catch (n) {}
                o.continue();
              } else {
                n(t);
              }
            };
            e.onerror = function () {
              n(t);
            };
          });
        }).then(function (n) {
          g = n;
          p();
          v = true;
          A();
          if (w) {
            for (const n in f) {
              w(n);
            }
          }
          if (b) {
            b();
          }
        }).catch(function () {
          v = true;
        });
      })();
      const x = {
        Ts: function (n) {
          if (!n || typeof n != "string") {
            return n;
          }
          if (a === null && !h) {
            return n;
          }
          const t = _(n);
          return f[t] || f[M(t)] || n;
        },
        Kd: function (n) {
          const t = l[n];
          if (typeof t == "string" && t.length > 0) {
            return t;
          } else {
            return null;
          }
        },
        fw: function () {
          const n = C();
          const t = [];
          for (const e in n) {
            const o = n[e];
            let i = "";
            let c = "";
            try {
              const n = JSON.parse(o[(0, r.ls)("data")]);
              if (n && typeof n == "object") {
                const t = n[(0, r.ls)("_author")];
                if (typeof t == "string") {
                  i = t;
                }
                const e = n[(0, r.ls)("_version")];
                if (e != null) {
                  c = e + "";
                }
              }
            } catch (n) {}
            t.push({
              tu: e,
              js: o && o[(0, r.ls)("name")] || e,
              lw: i,
              version: c
            });
          }
          return t;
        },
        hw: function (n) {
          const e = C()[n];
          if (e && typeof e[(0, r.ls)("data")] == "string") {
            return e[(0, r.ls)("data")];
          } else {
            return null;
          }
        },
        qd: function () {
          return a;
        },
        gw: function () {
          if (!a) {
            return null;
          }
          const t = C()[a];
          if (!t) {
            return null;
          }
          try {
            const e = JSON.parse(t[(0, r.ls)("data")]);
            if (e && typeof e == "object" && !Array.isArray(e)) {
              return e;
            } else {
              return null;
            }
          } catch (n) {
            return null;
          }
        },
        ww: T,
        yw: function (n, t) {
          let o;
          try {
            o = JSON.parse(t);
          } catch (n) {
            return null;
          }
          if (!o || typeof o != "object" && !Array.isArray(o)) {
            return null;
          }
          const c = C();
          const s = Array.isArray(o) ? undefined : o[(0, r.ls)("_name")];
          const u = typeof s == "string" && s || n || "Untitled Pack";
          const a = "pack-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1000000).toString(36);
          const f = {
            [(0, r.ls)("name")]: u,
            [(0, r.ls)("data")]: t
          };
          c[a] = f;
          y(a, f);
          return a;
        },
        bw: function (n, t, e) {
          try {
            JSON.parse(e);
          } catch (n) {
            return false;
          }
          const c = C();
          if (!c[n]) {
            return false;
          }
          const s = {};
          s[(0, r.ls)("name")] = t || c[n][(0, r.ls)("name")] || "Untitled Pack";
          s[(0, r.ls)("data")] = e;
          c[n] = s;
          y(n, s);
          if (a === n) {
            A();
          }
          return true;
        },
        dw: function (n) {
          const t = C();
          return !!t[n] && (delete t[n], z(n), a === n && T(null), true);
        },
        tb: function () {
          for (const n in g) {
            z(n);
          }
          g = Object.create(null);
          T(null);
        },
        aw: function (n) {
          h = !!n;
        },
        uw: function (n, t) {
          if (n) {
            if (typeof t == "string" && t.length > 0) {
              l[n] = t;
            } else {
              delete l[n];
            }
          }
        },
        sw: function (n, t) {
          const o = _(n);
          if (o) {
            if (typeof t == "string" && t.length > 0) {
              f[o] = t;
            } else {
              delete f[o];
              delete f[M(o)];
            }
          }
        },
        ew: function (n) {
          w = typeof n == "function" ? n : null;
          if (v && w) {
            for (const n in f) {
              w(n);
            }
          }
        },
        iw: function (n) {
          b = typeof n == "function" ? n : null;
          if (v && b) {
            b();
          }
        }
      };
      e.default = x;
    },
    2639: function (n) {
      function e(n) {
        var o;
        var i = "0123456789ABCDEF";
        var r = "";
        for (var c = 0; c < n.length; c++) {
          o = n.charCodeAt(c);
          r += i.charAt(o >>> 4 & 15) + i.charAt(o & 15);
        }
        return r;
      }
      function o(n) {
        for (var o = Array(n.length >> 2), i = 0; i < o.length; i++) {
          o[i] = 0;
        }
        for (i = 0; i < n.length * 8; i += 8) {
          o[i >> 5] |= (n.charCodeAt(i / 8) & 255) << i % 32;
        }
        return o;
      }
      function i(n) {
        var t = "";
        for (var e = 0; e < n.length * 32; e += 8) {
          t += String.fromCharCode(n[e >> 5] >>> e % 32 & 255);
        }
        return t;
      }
      function r(n, t) {
        n[t >> 5] |= 128 << t % 32;
        n[14 + (t + 64 >>> 9 << 4)] = t;
        var e = 1732584193;
        var o = -271733879;
        var i = -1732584194;
        var r = 271733878;
        for (var c = 0; c < n.length; c += 16) {
          var h = e;
          var d = o;
          var m = i;
          var g = r;
          o = f(o = f(o = f(o = f(o = a(o = a(o = a(o = a(o = u(o = u(o = u(o = u(o = s(o = s(o = s(o = s(o, i = s(i, r = s(r, e = s(e, o, i, r, n[c + 0], 7, -680876936), o, i, n[c + 1], 12, -389564586), e, o, n[c + 2], 17, 606105819), r, e, n[c + 3], 22, -1044525330), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 4], 7, -176418897), o, i, n[c + 5], 12, 1200080426), e, o, n[c + 6], 17, -1473231341), r, e, n[c + 7], 22, -45705983), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 8], 7, 1770035416), o, i, n[c + 9], 12, -1958414417), e, o, n[c + 10], 17, -42063), r, e, n[c + 11], 22, -1990404162), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 12], 7, 1804603682), o, i, n[c + 13], 12, -40341101), e, o, n[c + 14], 17, -1502002290), r, e, n[c + 15], 22, 1236535329), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 1], 5, -165796510), o, i, n[c + 6], 9, -1069501632), e, o, n[c + 11], 14, 643717713), r, e, n[c + 0], 20, -373897302), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 5], 5, -701558691), o, i, n[c + 10], 9, 38016083), e, o, n[c + 15], 14, -660478335), r, e, n[c + 4], 20, -405537848), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 9], 5, 568446438), o, i, n[c + 14], 9, -1019803690), e, o, n[c + 3], 14, -187363961), r, e, n[c + 8], 20, 1163531501), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 13], 5, -1444681467), o, i, n[c + 2], 9, -51403784), e, o, n[c + 7], 14, 1735328473), r, e, n[c + 12], 20, -1926607734), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 5], 4, -378558), o, i, n[c + 8], 11, -2022574463), e, o, n[c + 11], 16, 1839030562), r, e, n[c + 14], 23, -35309556), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 1], 4, -1530992060), o, i, n[c + 4], 11, 1272893353), e, o, n[c + 7], 16, -155497632), r, e, n[c + 10], 23, -1094730640), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 13], 4, 681279174), o, i, n[c + 0], 11, -358537222), e, o, n[c + 3], 16, -722521979), r, e, n[c + 6], 23, 76029189), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 9], 4, -640364487), o, i, n[c + 12], 11, -421815835), e, o, n[c + 15], 16, 530742520), r, e, n[c + 2], 23, -995338651), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 0], 6, -198630844), o, i, n[c + 7], 10, 1126891415), e, o, n[c + 14], 15, -1416354905), r, e, n[c + 5], 21, -57434055), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 12], 6, 1700485571), o, i, n[c + 3], 10, -1894986606), e, o, n[c + 10], 15, -1051523), r, e, n[c + 1], 21, -2054922799), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 8], 6, 1873313359), o, i, n[c + 15], 10, -30611744), e, o, n[c + 6], 15, -1560198380), r, e, n[c + 13], 21, 1309151649), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 4], 6, -145523070), o, i, n[c + 11], 10, -1120210379), e, o, n[c + 2], 15, 718787259), r, e, n[c + 9], 21, -343485551);
          e = l(e, h);
          o = l(o, d);
          i = l(i, m);
          r = l(r, g);
        }
        return [e, o, i, r];
      }
      function c(n, t, e, o, i, r) {
        return l(h(l(l(t, n), l(o, r)), i), e);
      }
      function s(n, t, e, o, i, r, s) {
        return c(t & e | ~t & o, n, t, i, r, s);
      }
      function u(n, t, e, o, i, r, s) {
        return c(t & o | e & ~o, n, t, i, r, s);
      }
      function a(n, t, e, o, i, r, s) {
        return c(t ^ e ^ o, n, t, i, r, s);
      }
      function f(n, t, e, o, i, r, s) {
        return c(e ^ (t | ~o), n, t, i, r, s);
      }
      function l(n, t) {
        var e = (n & 65535) + (t & 65535);
        return (n >> 16) + (t >> 16) + (e >> 16) << 16 | e & 65535;
      }
      function h(n, t) {
        return n << t | n >>> 32 - t;
      }
      __MUTATEoQQ = function (n) {
        return e(i(r(o(n), n.length * 8))).toLowerCase();
      };
      try {
        n.exports = __MUTATEoQQ;
      } catch (n) {}
    },
    3543: function (n) {
      function e(n, e, o, i) {
        let c = new Date();
        c.setTime(c.getTime() + o * 24 * 60 * 60 * 1000);
        let s = "expires=" + c.toUTCString();
        let u = i ? ";domain=" + i : "";
        document.cookie = n + "=" + encodeURIComponent(e) + ";" + s + ";path=/" + u;
      }
      function o(n) {
        let t = n + "=";
        var e = "";
        try {
          e = decodeURIComponent(document.cookie);
        } catch (n) {
          return "";
        }
        let o = e.split(";");
        for (let n = 0; n < o.length; n++) {
          let e = o[n];
          while (e.charAt(0) == " ") {
            e = e.substring(1);
          }
          if (e.indexOf(t) == 0) {
            return e.substring(t.length, e.length);
          }
        }
        return "";
      }
      const i = {
        request: function (n, e, o) {
          const r = new XMLHttpRequest();
          r.open("GET", n);
          r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          r.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              if (e !== undefined) {
                e(r.responseText);
              }
            } else if (this.readyState == 4 && o !== undefined) {
              o(this);
            }
          };
          r.send();
        },
        getData: function (n) {
          let t = o(n);
          if (!t) {
            try {
              t = window.localStorage.getItem(n);
            } catch (n) {}
          }
          return t || "";
        },
        setData: function (n, o, i) {
          e(n, o, 365, i);
          try {
            window.localStorage.setItem(n, o);
          } catch (n) {}
        },
        eb: function (n, e, o) {
          e = e ? 1 : 0;
          const r = 3600000;
          const c = r * 24;
          const s = Math.floor(n / c);
          const u = Math.floor((n %= c) / r);
          const a = Math.floor((n %= r) / 60000);
          n %= 60000;
          let f = "";
          if (e === 1) {
            if (s !== 0) {
              f += s + "d";
            }
            if (u !== 0) {
              f += u + "h";
            }
            if (a !== 0) {
              f += a;
            }
          } else {
            if (s !== 0) {
              f += s + "d ";
            }
            if (u !== 0) {
              f += u + "h ";
            }
            if (a !== 0) {
              f += a + "min ";
            }
            if (o === 1 || s === 0 & u == 0 && a === 0) {
              f += Math.floor(n / 1000) + "s";
            }
          }
          return f;
        },
        ob: function (n, t) {
          return Number(Math.round(n + "e" + t) + "e-" + t);
        },
        bs: function (n, e) {
          e ||= window.location.href;
          n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          let i = RegExp("[\\?&]" + n + "=([^&#]*)").exec(e);
          if (i == null) {
            return null;
          } else {
            return i[1];
          }
        },
        ls: function (n) {
          return n + "";
        },
        eu: function (n) {
          let o = "";
          for (let t = 0; t < n; t++) {
            o += Math.floor(Math.random() * 16).toString(16);
          }
          return o.toUpperCase();
        }
      };
      try {
        n.exports = i;
      } catch (n) {}
    },
    4733: function (n) {
      function t(n) {
        var t = Error("Cannot find module '" + n + "'");
        t.code = "MODULE_NOT_FOUND";
        throw t;
      }
      t.keys = function () {
        return [];
      };
      t.resolve = t;
      t.tu = 4733;
      n.exports = t;
    },
    9282: function (n, e, o) {
      const r = o(3970);
      const c = o(7251);
      let s = [];
      s[r.G] = {
        Wv: 160,
        Xv: 160,
        Fv: c.Sg - 160,
        Qv: c.qg * 5 / 20,
        Bm: "#ece5db",
        Sw: "snow_background_texture"
      };
      s[r.k] = {
        Wv: 160,
        Xv: c.qg * 5 / 20,
        Fv: c.Sg - 160,
        Qv: c.qg * 15 / 20,
        Bm: "#788F57",
        Sw: "plains_background_texture"
      };
      s[r.U] = {
        Wv: 160,
        Xv: c.qg * 15 / 20,
        Fv: c.Sg - 160,
        Qv: c.qg * 16 / 20,
        Bm: "#fcefbb",
        Sw: "beach_background_texture"
      };
      s[r.Y] = {
        Wv: 160,
        Xv: c.qg * 16 / 20,
        Fv: c.Sg - 160,
        Qv: c.qg - 1000,
        Bm: "#2a8b9b",
        Sw: "river_background_texture"
      };
      s[r.j] = {
        Wv: 160,
        Xv: c.qg - 1000,
        Fv: c.Sg - 160,
        Qv: c.qg - 160,
        Bm: "#b38354",
        Sw: "desert_background_texture"
      };
      n.exports = s;
    },
    7251: function (n) {
      const o = {
        kg: 1,
        cw: 1824,
        rw: 1026,
        ib: 130,
        Gh: 9,
        rb: 1 / 3,
        version: 7,
        Tw: 1 / 6,
        Ow: 80,
        cb: 150,
        Sg: 10000,
        qg: 10000
      };
      o.sb = Math.PI / 2;
      o.ub = 255;
      o.Rv = "#FFFFFF";
      o.xw = 28;
      o.Yw = 70;
      o.ab = 60;
      o.jw = 240;
      o.mg = 17;
      o.gg = ["#FFD700", "#C0C0C0", "#CD7F32"];
      o.vg = "#FFFFFF";
      o.fb = 5;
      o.wg = "#2D3030";
      o.lb = 1 / 12;
      o.kw = [0, 0, 0, 100, 30, 8, 2, 12, 32, 1, 2, 4];
      o.hb = 2000;
      o.mb = 5000;
      o.gb = 10000;
      o.vb = false;
      n.exports = o;
    },
    3287: function (n, t, e) {
      const o = e(3950);
      const i = e(3970);
      const r = e(9055);
      const c = e(1917);
      const s = [];
      s[c.an] = {
        Rd: 35,
        wb: 100,
        bb: r.en
      };
      s[c.vn] = {
        Rd: 60,
        wb: 300,
        bb: r.en
      };
      s[c.kn] = {
        Rd: 50,
        wb: 300,
        bb: r.en
      };
      s[c.V] = {
        Rd: 40,
        wb: 300,
        bb: r.en
      };
      s[c.dn] = {
        Rd: 50,
        bb: r.en,
        yb: 1
      };
      s[c.Jn] = {
        Rd: 50,
        bb: r.en,
        yb: 5,
        zb: 20
      };
      s[c.In] = {
        Rd: 220,
        bb: r.N,
        yb: 5,
        zb: 1
      };
      s[c.tn] = {
        Rd: 76,
        bb: r.en,
        _b: 15
      };
      s[c.Zn] = {
        Rd: 100,
        bb: r.en,
        _b: 35
      };
      s[c.fn] = {
        Rd: 75,
        bb: r.en,
        Mb: 1
      };
      s[c.jn] = {
        Rd: 92,
        bb: r.en,
        Mb: 1
      };
      s[c.Pn] = {
        Rd: 92,
        bb: r.en,
        Mb: 0
      };
      s[c.Sn] = {
        Rd: 20,
        bb: r.en,
        Mb: 0
      };
      s[c.Nn] = {
        Rd: 92,
        bb: r.en,
        Mb: 1
      };
      s[c.On] = {
        Rd: 58,
        bb: r.en,
        Mb: 1
      };
      s[c.hn] = {
        Rd: 90,
        bb: r.en,
        Db: 1
      };
      s[c.Ln] = {
        Rd: 80,
        bb: r.en,
        Db: 1
      };
      s[c.Cn] = {
        Rd: 80,
        bb: r.en,
        Db: 1
      };
      s[c.An] = {
        Rd: 60,
        bb: r.en,
        Mb: 1
      };
      s[c.mn] = {
        zb: 20,
        Rd: 45,
        wb: 380,
        Bb: 20,
        bb: r.en
      };
      s[c.ln] = {
        zb: 35,
        Rd: 45,
        wb: 500,
        bb: r.en
      };
      s[c.Vn] = {
        zb: 45,
        Rd: 45,
        wb: 500,
        bb: r.en
      };
      s[c.Dn] = {
        zb: 10,
        Rd: 42,
        wb: 1200,
        Bb: 24,
        bb: r.en
      };
      s[c.gn] = {
        Rd: 45,
        wb: 380,
        bb: r.en
      };
      s[c.Yn] = {
        Rd: 45,
        wb: 380,
        bb: r.en,
        _b: 70,
        ns: 20
      };
      s[c.pn] = {
        Rd: 59,
        wb: 1750,
        bb: r.en
      };
      s[c.Bn] = {
        Rd: 45,
        wb: 800,
        bb: r.en
      };
      s[c._n] = {
        Rd: 50,
        wb: 380,
        bb: r.en
      };
      s[c.W] = {
        Rd: 40,
        wb: 500,
        bb: r.en
      };
      s[c.$] = {
        Rd: 40,
        wb: 250,
        bb: r.en
      };
      s[c.zn] = {
        Rd: 90,
        wb: 380,
        bb: r.en,
        Lb: 1.6,
        Cb: o.M | o.L,
        Ab: i.k
      };
      s[c.qn] = {
        Rd: 20,
        wb: 380,
        bb: r.en,
        Lb: 1.6,
        Cb: o.M | o.L,
        Ab: i.k
      };
      s[c.Hn] = {
        Rd: 90,
        wb: 1000,
        bb: r.en,
        Lb: 1.6,
        Cb: o.M | o.C,
        zb: 19
      };
      s[c.Tn] = {
        Rd: 90,
        wb: 380,
        bb: r.en,
        Lb: 1.2,
        Cb: o.M | o.A | o.C,
        zb: 14,
        Ab: i.Y
      };
      s[c.Wn] = {
        Rd: 90,
        wb: 450,
        bb: r.en,
        Lb: 1.2,
        Cb: o.M | o.A | o.C,
        zb: 14,
        Ab: i.Y
      };
      s[c.xn] = {
        Rd: 50,
        wb: 380,
        bb: r.en,
        Lb: 1.6,
        Cb: o.M | o.C,
        zb: 14,
        Ab: i.k
      };
      s[c.Un] = {
        Rd: 100,
        wb: 380,
        bb: r.en,
        Lb: 0.4,
        Cb: o.M,
        zb: 15,
        Ab: i.k
      };
      s[c.En] = {
        Rd: 90,
        wb: 5000,
        bb: r.en,
        Lb: 1.6,
        Cb: o.M | o.C,
        zb: 30,
        Ab: i.G
      };
      s[c.Gn] = {
        Rd: 100,
        wb: 5000,
        bb: r.en,
        Lb: 1.15,
        Cb: o.M | o.C,
        zb: 30,
        Ab: i.k
      };
      s[c.wn] = {
        Rd: 40,
        wb: 4,
        bb: r.en
      };
      s[c.yn] = {
        Rd: 45,
        wb: 400,
        bb: r.en
      };
      s[c.Mn] = {
        Rd: 54,
        wb: 400,
        bb: r.en
      };
      s[c.Kn] = {
        Rd: 35,
        wb: 150,
        bb: r.en
      };
      n.exports = s;
    },
    3424: function (n, t, e) {
      const o = e(9657);
      const i = [];
      i[o.Hn] = {
        description: "A Golden Cow has appeared!",
        duration: 240
      };
      i[o.Gn] = {
        description: "A Dragon has appeared!",
        duration: 480
      };
      i[o.En] = {
        description: "A Mammoth has appeared!",
        duration: 480
      };
      n.exports = i;
    },
    1624: function (n, e, o) {
      const r = o(4002);
      const c = o(6597);
      const s = [];
      s[r.N] = {};
      s[r.Xn] = {
        rm: c.$i,
        Fm: 250,
        Jd: 0,
        description: "Become a bush",
        js: "Bush Hat",
        Uw: true
      };
      s[r.Fn] = {
        rm: c.oi,
        Fm: 5000,
        description: "Increased melee damage",
        Jd: 10,
        pb: 1.25,
        Tb: 0.85,
        js: "Berserker Gear"
      };
      s[r.Qn] = {
        rm: c.ri,
        Fm: 3000,
        description: "Regenerate health",
        Jd: 13,
        xb: 25,
        js: "Jungle Gear"
      };
      s[r.Rn] = {
        rm: c.ci,
        Fm: 5000,
        description: "Receive reduced damage",
        Jd: 10,
        Hb: 0.75,
        Tb: 0.95,
        js: "Crystal Gear"
      };
      s[r.$n] = {
        rm: c.ui,
        Fm: 1000,
        description: "Attackers receive damage",
        Jd: 10,
        kb: 0.45,
        js: "Spike Gear"
      };
      s[r.nt] = {
        rm: c.ai,
        Fm: 4000,
        description: "Gain more health",
        Jd: 15,
        wb: 130,
        js: "Immunity Gear"
      };
      s[r.tt] = {
        rm: c.fi,
        Fm: 1500,
        description: "Move quicker",
        Jd: 23,
        Tb: 1.23,
        js: "Boost Hat"
      };
      s[r.et] = {
        rm: c.Oi,
        Fm: 150,
        description: "Apples become more succulent",
        Jd: 5,
        Tb: 1.05,
        js: "Apple Hat"
      };
      s[r.ot] = {
        rm: c.hr,
        Fm: 4000,
        description: "Move fast in ocean",
        Jd: 5,
        Tb: 0.75,
        Gb: 1.5,
        js: "Scuba Gear"
      };
      s[r.it] = {
        rm: c.gr,
        Fm: 3500,
        description: "Become invisible when still",
        Jd: 5,
        js: "Hood",
        Uw: true
      };
      s[r.rt] = {
        rm: c.$r,
        Fm: 4000,
        description: "Destroy buildings faster",
        Jd: 10,
        js: "Demolist",
        Tb: 0.3
      };
      s[r.st] = {
        rm: c.Kr,
        Fm: 1000,
        description: "Its curse makes you kill",
        Jd: 2,
        js: "Pumpking's Curse",
        Tb: 1.15,
        kb: 0.3,
        Gb: 0.7,
        pb: 1.15,
        wb: 120,
        pw: true
      };
      s[r.ct] = {
        rm: c.bc,
        Fm: 700,
        description: "Move fast in the snow",
        Jd: 0,
        Tb: 1,
        Eb: 1.7,
        js: "Winter Hat"
      };
      n.exports = s;
    },
    9299: function (n, e, o) {
      const r = o(1917);
      const c = o(6410);
      const s = o(6597);
      const u = o(7262);
      const a = o(3266);
      const f = [];
      f[c.lt] = {
        tu: c.lt,
        ym: c.Pt,
        Ub: a.tn,
        cg: s.Zo,
        rm: s.lt,
        js: "Tool Hammer",
        description: "Gather materials",
        range: 80,
        Hw: 0,
        Bb: 25,
        reload: 300,
        Yb: 30,
        jb: 200,
        Qm: 0,
        sm: 0,
        Id: -3.5,
        Jd: 1
      };
      f[c.Pt] = {
        tu: c.Pt,
        ym: c.St,
        Ub: a.Fc,
        cg: s.Hr,
        rm: s.Pt,
        js: "Gold Tool Hammer",
        description: "Gather materials",
        range: 80,
        Hw: 0,
        Bb: 32,
        reload: 300,
        Yb: 30,
        jb: 200,
        Qm: 0,
        sm: 0,
        Id: -3.5,
        Jd: 1
      };
      f[c.St] = {
        tu: c.St,
        ym: c.qt,
        Ub: a.Qc,
        cg: s.kr,
        rm: s.St,
        js: "Diamond Tool Hammer",
        description: "Gather materials",
        range: 80,
        Hw: 0,
        Bb: 38,
        reload: 300,
        Yb: 30,
        jb: 200,
        Qm: 0,
        sm: 0,
        Id: -3.5,
        Jd: 1
      };
      f[c.qt] = {
        tu: c.qt,
        cg: s.Gr,
        rm: s.qt,
        js: "Ruby Tool Hammer",
        description: "Gather materials",
        range: 80,
        Hw: 0,
        Bb: 41,
        reload: 300,
        Yb: 30,
        jb: 200,
        Qm: 0,
        sm: 0,
        Id: -3.5,
        Jd: 1
      };
      f[c.ht] = {
        tu: c.ht,
        ym: c.ae,
        Ub: a.tn,
        Nb: u.N,
        Ob: u.O,
        cg: s.Io,
        rm: s.ht,
        js: "Stone Sword",
        description: "Sharp and pointy",
        range: 135,
        jb: 250,
        Hw: 0,
        Bb: 35,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: -8,
        Jd: -4
      };
      f[c.ae] = {
        tu: c.ae,
        ym: c.fe,
        Ub: a.Fc,
        Nb: u.N,
        Ob: u.O,
        cg: s.ae,
        rm: s.ae,
        js: "Gold Sword",
        description: "Sharp and pointy",
        range: 135,
        jb: 250,
        Hw: 0,
        Bb: 38,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: -8,
        Jd: -4
      };
      f[c.fe] = {
        tu: c.fe,
        ym: c.le,
        Ub: a.Qc,
        Nb: u.N,
        Ob: u.O,
        cg: s.fe,
        rm: s.fe,
        js: "Diamond Sword",
        description: "Sharp and pointy",
        range: 135,
        jb: 250,
        Hw: 0,
        Bb: 42,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: -8,
        Jd: -4
      };
      f[c.le] = {
        tu: c.le,
        Nb: u.N,
        Ob: u.O,
        cg: s.le,
        rm: s.le,
        js: "Ruby Sword",
        description: "Sharp and pointy",
        range: 135,
        jb: 250,
        Hw: 0,
        Bb: 46,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: -8,
        Jd: -4
      };
      f[c.Wt] = {
        tu: c.Wt,
        Nb: u.N,
        Ob: u.F,
        cg: s.ac,
        rm: s.uc,
        js: "Crystal Dagger",
        description: "A stubbier sword",
        range: 80,
        jb: 100,
        Hw: 0,
        Bb: 34,
        reload: 150,
        Pb: 1.08,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 20
      };
      f[c.Vt] = {
        tu: c.Vt,
        Nb: u.N,
        Ob: u.F,
        cg: s.Wr,
        rm: s.Rr,
        js: "Ruby Dagger",
        description: "A stubbier sword",
        range: 80,
        jb: 100,
        Hw: 0,
        Bb: 34,
        reload: 150,
        Pb: 1.08,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 20
      };
      f[c.Zt] = {
        tu: c.Zt,
        ym: c.Vt,
        Ub: a.Qc,
        Nb: u.N,
        Ob: u.F,
        cg: s.Vr,
        rm: s.Qr,
        js: "Diamond Dagger",
        description: "A stubbier sword",
        range: 80,
        jb: 100,
        Hw: 0,
        Bb: 32,
        reload: 150,
        Pb: 1.07,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 20
      };
      f[c.It] = {
        ym: c.Zt,
        Ub: a.Fc,
        tu: c.It,
        Nb: u.N,
        Ob: u.F,
        cg: s.Zr,
        rm: s.Fr,
        js: "Gold Dagger",
        description: "A stubbier sword",
        range: 80,
        jb: 100,
        Hw: 0,
        Bb: 30,
        reload: 150,
        Pb: 1.06,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 20
      };
      f[c.Jt] = {
        ym: c.It,
        Ub: a.tn,
        tu: c.Jt,
        Nb: u.N,
        Ob: u.F,
        cg: s.Ir,
        rm: s.Xr,
        js: "Stone Dagger",
        description: "A stubbier sword",
        range: 80,
        jb: 100,
        Hw: 0,
        Bb: 28,
        reload: 150,
        Pb: 1.05,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 20
      };
      f[c.zt] = {
        tu: c.zt,
        ym: c.Ht,
        Ub: a.tn,
        Nb: u.O,
        Ob: u.O,
        cg: s.Mi,
        rm: s.zt,
        js: "Katana",
        description: "Excellent melee weapon",
        range: 140,
        jb: 150,
        Hw: 0,
        Bb: 40,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: 1,
        Jd: 3
      };
      f[c.Ht] = {
        tu: c.Ht,
        ym: c.xt,
        Ub: a.Fc,
        Nb: u.O,
        Ob: u.O,
        cg: s._r,
        rm: s.Ht,
        js: "Gold Katana",
        description: "Excellent melee weapon",
        range: 140,
        jb: 150,
        Hw: 0,
        Bb: 43,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: 1,
        Jd: 3
      };
      f[c.xt] = {
        tu: c.xt,
        ym: c.Et,
        Ub: a.Qc,
        Nb: u.O,
        Ob: u.O,
        cg: s.zr,
        rm: s.xt,
        js: "Diamond Katana",
        description: "Excellent melee weapon",
        range: 140,
        jb: 150,
        Hw: 0,
        Bb: 46.5,
        reload: 300,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: 1,
        Jd: 3
      };
      f[c.Et] = {
        tu: c.Et,
        Nb: u.O,
        Ob: u.O,
        cg: s.Cr,
        rm: s.Et,
        js: "Chillrend",
        description: "A powerful force flows through this blade.",
        range: 140,
        jb: 150,
        Hw: 0,
        Bb: 48.5,
        reload: 300,
        Pb: 0.9,
        Qm: 0,
        sm: 0,
        Id: 1,
        Jd: 3
      };
      f[c.Ft] = {
        tu: c.Ft,
        Nb: u.O,
        Ob: u.O,
        cg: s.Pc,
        rm: s.Ft,
        js: "Daedric Scythe",
        description: "Whispers fill the air",
        range: 160,
        jb: 150,
        Hw: 0,
        Bb: 52,
        reload: 450,
        Pb: 0.85,
        Qm: 0,
        sm: 0,
        Id: -5,
        Jd: 20
      };
      f[c.K] = {
        tu: c.K,
        ym: c.Ut,
        Ub: a.tn,
        Nb: u.N,
        Ob: u.K,
        cg: s.di,
        rm: s.K,
        js: "Stick",
        description: "Gathers resources quickly",
        range: 100,
        Hw: 0,
        Bb: 1,
        reload: 400,
        Qm: 0,
        jb: 60,
        sm: 0,
        Id: 4,
        Jd: 0,
        Sb: 7,
        qb: 7,
        Kb: 7,
        Jb: 4
      };
      f[c.Ut] = {
        tu: c.Ut,
        ym: c.Yt,
        Ub: a.Fc,
        Nb: u.N,
        Ob: u.K,
        cg: s.Ar,
        rm: s.Ut,
        js: "Gold Stick",
        description: "Gathers resources quickly",
        range: 100,
        Hw: 0,
        Bb: 1,
        reload: 400,
        Qm: 0,
        jb: 60,
        sm: 0,
        Id: 4,
        Jd: 0,
        Sb: 8,
        qb: 8,
        Kb: 8,
        Jb: 5
      };
      f[c.Yt] = {
        tu: c.Yt,
        ym: c.jt,
        Ub: a.Qc,
        Nb: u.N,
        Ob: u.K,
        cg: s.Nr,
        rm: s.Yt,
        js: "Diamond Stick",
        description: "Gathers resources quickly",
        range: 100,
        Hw: 0,
        Bb: 1,
        reload: 400,
        Qm: 0,
        jb: 60,
        sm: 0,
        Id: 4,
        Jd: 0,
        Sb: 9,
        qb: 9,
        Kb: 9,
        Jb: 6
      };
      f[c.jt] = {
        tu: c.jt,
        Nb: u.N,
        Ob: u.K,
        cg: s.Or,
        rm: s.jt,
        js: "Ruby Stick",
        description: "Gathers resources quickly",
        range: 100,
        Hw: 0,
        Bb: 1,
        reload: 400,
        Qm: 0,
        jb: 60,
        sm: 0,
        Id: 4,
        Jd: 0,
        Sb: 10,
        qb: 10,
        Kb: 10,
        Jb: 7
      };
      f[c.dt] = {
        tu: c.dt,
        ym: c.Gt,
        Ub: a.tn,
        Nb: u.N,
        Ob: u.P,
        cg: s.Wo,
        rm: s.dt,
        js: "Stone Spear",
        description: "Long melee range",
        range: 160,
        Hw: 0,
        Bb: 49,
        Pb: 0.81,
        jb: 375,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: 2
      };
      f[c.kt] = {
        tu: c.kt,
        ym: c.ue,
        Ub: a.Qc,
        Nb: u.N,
        Ob: u.P,
        cg: s.Mr,
        rm: s.kt,
        js: "Diamond Spear",
        description: "Long melee range",
        range: 160,
        Hw: 0,
        Bb: 53,
        Pb: 0.81,
        jb: 375,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: 2
      };
      f[c.ue] = {
        tu: c.ue,
        Nb: u.N,
        Ob: u.P,
        cg: s.Gc,
        rm: s.ue,
        js: "Ruby Spear",
        description: "Long melee range",
        range: 160,
        Hw: 0,
        Bb: 56,
        Pb: 0.81,
        jb: 375,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: 2
      };
      f[c.Gt] = {
        tu: c.Gt,
        ym: c.kt,
        Ub: a.Fc,
        Nb: u.N,
        Ob: u.P,
        cg: s.Dr,
        rm: s.Gt,
        js: "Gold Spear",
        description: "Long melee range",
        range: 160,
        Hw: 0,
        Bb: 51,
        Pb: 0.81,
        jb: 375,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: 2
      };
      f[c.Dt] = {
        tu: c.Dt,
        ym: c.Ot,
        Ub: a.tn,
        Nb: u.P,
        Ob: u.P,
        cg: s.Ii,
        rm: s.Dt,
        js: "Naginata",
        description: "Long melee range",
        range: 165,
        Hw: 0,
        Bb: 52,
        Pb: 0.81,
        jb: 400,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: -4
      };
      f[c.Ot] = {
        tu: c.Ot,
        ym: c.Nt,
        Ub: a.Fc,
        Nb: u.P,
        Ob: u.P,
        cg: s.Tr,
        rm: s.Ot,
        js: "Gold Naginata",
        description: "Long melee range",
        range: 165,
        Hw: 0,
        Bb: 54,
        Pb: 0.81,
        jb: 400,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: -4
      };
      f[c.Nt] = {
        tu: c.Nt,
        ym: c.se,
        Ub: a.Qc,
        Nb: u.P,
        Ob: u.P,
        cg: s.pr,
        rm: s.Nt,
        js: "Diamond Naginata",
        description: "Long melee range",
        range: 165,
        Hw: 0,
        Bb: 56,
        Pb: 0.81,
        jb: 400,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: -4
      };
      f[c.se] = {
        tu: c.se,
        Nb: u.P,
        Ob: u.P,
        cg: s.kc,
        rm: s.se,
        js: "Ruby Naginata",
        description: "Long melee range",
        range: 165,
        Hw: 0,
        Bb: 59,
        Pb: 0.81,
        jb: 400,
        reload: 700,
        Qm: 0,
        sm: 0,
        Id: 0,
        Jd: -4
      };
      f[c.X] = {
        tu: c.X,
        ym: c.ie,
        Ub: a.tn,
        Nb: u.N,
        Ob: u.X,
        cg: s.vr,
        rm: s.X,
        js: "Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Hw: 0,
        Bb: 28,
        Pb: 0.92,
        jb: 870,
        reload: 600,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 2
      };
      f[c.ie] = {
        tu: c.ie,
        ym: c.re,
        Ub: a.Fc,
        Ob: u.X,
        cg: s.Cc,
        rm: s.Lc,
        js: "Golden Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Hw: 0,
        Bb: 28,
        Pb: 0.92,
        jb: 970,
        reload: 600,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 2
      };
      f[c.re] = {
        tu: c.re,
        ym: c.ce,
        Ub: a.Qc,
        Ob: u.X,
        cg: s.Tc,
        rm: s.Ac,
        js: "Diamond Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Hw: 0,
        Bb: 28,
        Pb: 0.92,
        jb: 1070,
        reload: 600,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 2
      };
      f[c.ce] = {
        tu: c.ce,
        Ob: u.X,
        cg: s.Hc,
        rm: s.xc,
        js: "Ruby Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Hw: 0,
        Bb: 28,
        Pb: 0.92,
        jb: 1170,
        reload: 600,
        Qm: 0,
        sm: 0,
        Id: 10,
        Jd: 2
      };
      f[c.Xt] = {
        tu: c.Xt,
        ym: c.Ft,
        Ub: a.Fc,
        Nb: u.N,
        Ob: u.N,
        cg: s.Oc,
        rm: s.Xt,
        js: "Secret Item",
        description: "Dont leak how to get it :)",
        range: 115,
        Hw: 0,
        Bb: 28,
        Pb: 0.92,
        jb: 1570,
        reload: 1250,
        Qm: 0,
        sm: 0,
        Id: 40,
        Jd: 40
      };
      f[c.yt] = {
        tu: c.yt,
        ym: c.te,
        Ub: a.tn,
        Nb: u.N,
        Ob: u.N,
        cg: s.yi,
        rm: s.yt,
        js: "Hammer",
        description: "Breaks structures faster",
        range: 80,
        Hw: 1,
        Bb: 12,
        Yb: 76,
        Pb: 0.89,
        jb: 200,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 5,
        Jd: 2
      };
      f[c.te] = {
        tu: c.te,
        ym: c.ee,
        Ub: a.Fc,
        cg: s.zc,
        rm: s.yc,
        js: "Golden Hammer",
        description: "Breaks structures faster",
        range: 80,
        Hw: 1,
        Bb: 15,
        Yb: 79,
        Pb: 0.89,
        jb: 200,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 5,
        Jd: 2
      };
      f[c.ee] = {
        tu: c.ee,
        ym: c.oe,
        Ub: a.Qc,
        cg: s.Mc,
        rm: s._c,
        js: "Diamond Hammer",
        description: "Breaks structures faster",
        range: 80,
        Hw: 1,
        Bb: 18,
        Yb: 82,
        Pb: 0.89,
        jb: 200,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 5,
        Jd: 2
      };
      f[c.oe] = {
        tu: c.oe,
        cg: s.Bc,
        rm: s.Dc,
        js: "Ruby Hammer",
        description: "Breaks structures faster",
        range: 80,
        Hw: 1,
        Bb: 21,
        Yb: 85,
        Pb: 0.89,
        jb: 200,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 5,
        Jd: 2
      };
      f[c.gt] = {
        tu: c.gt,
        ym: c.Ct,
        Ub: a.tn,
        Nb: u.N,
        Ob: u.I,
        cg: s.Xo,
        rm: s.Qo,
        js: "Stone Axe",
        description: "Gathers materials faster",
        range: 90,
        Hw: 0,
        Bb: 30,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: -2,
        Jd: 2,
        Sb: 2,
        qb: 2,
        Kb: 2,
        Jb: 2
      };
      f[c.Ct] = {
        tu: c.Ct,
        ym: c.Lt,
        Ub: a.Fc,
        Nb: u.N,
        Ob: u.I,
        cg: s.br,
        rm: s.Ct,
        js: "Gold Axe",
        description: "Gathers materials faster",
        range: 90,
        Hw: 0,
        Bb: 33,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: -2,
        Jd: 2,
        Sb: 2,
        qb: 2,
        Kb: 2,
        Jb: 2
      };
      f[c.Lt] = {
        tu: c.Lt,
        ym: c.he,
        Ub: a.Qc,
        Nb: u.N,
        Ob: u.I,
        cg: s.wr,
        rm: s.Lt,
        js: "Diamond Axe",
        description: "Gathers materials faster",
        range: 90,
        Hw: 0,
        Bb: 36,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: -2,
        Jd: 2,
        Sb: 2,
        qb: 2,
        Kb: 2,
        Jb: 2
      };
      f[c.he] = {
        tu: c.he,
        Nb: u.N,
        Ob: u.I,
        cg: s.Nc,
        rm: s.he,
        js: "Diamond Axe",
        description: "Gathers materials faster",
        range: 90,
        Hw: 0,
        Bb: 39,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: -2,
        Jd: 2,
        Sb: 2,
        qb: 2,
        Kb: 2,
        Jb: 2
      };
      f[c.Bt] = {
        tu: c.Bt,
        ym: c.Tt,
        Ub: a.tn,
        Nb: u.I,
        Ob: u.I,
        cg: s.sr,
        rm: s.Bt,
        js: "Great Axe",
        description: "More powerful axe.",
        range: 94,
        Hw: 0,
        Bb: 43,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 4,
        Jd: 2,
        Sb: 4,
        qb: 4,
        Kb: 4,
        Jb: 2
      };
      f[c.Tt] = {
        tu: c.Tt,
        ym: c.At,
        Ub: a.Fc,
        Nb: u.I,
        Ob: u.I,
        cg: s.Br,
        rm: s.Tt,
        js: "Gold Great Axe",
        description: "More powerful axe.",
        range: 94,
        Hw: 0,
        Bb: 42,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 4,
        Jd: 2,
        Sb: 4,
        qb: 4,
        Kb: 4,
        Jb: 2
      };
      f[c.At] = {
        tu: c.At,
        ym: c.de,
        Ub: a.Qc,
        Nb: u.I,
        Ob: u.I,
        cg: s.yr,
        rm: s.At,
        js: "Diamond Great Axe",
        description: "More powerful axe.",
        range: 94,
        Hw: 0,
        Bb: 46,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 4,
        Jd: 2,
        Sb: 4,
        qb: 4,
        Kb: 4,
        Jb: 2
      };
      f[c.de] = {
        tu: c.de,
        Nb: u.I,
        Ob: u.I,
        cg: s.jc,
        rm: s.de,
        js: "Ruby Great Axe",
        description: "More powerful axe.",
        range: 94,
        Hw: 0,
        Bb: 50,
        jb: 250,
        reload: 400,
        Qm: 0,
        sm: 0,
        Id: 4,
        Jd: 2,
        Sb: 4,
        qb: 4,
        Kb: 4,
        Jb: 2
      };
      f[c.S] = {
        tu: c.S,
        Fm: [0, 0, 10, 0],
        Nb: u.q,
        Ib: u.O,
        Ob: u.S,
        cg: s.Vo,
        rm: s.S,
        js: "Stone Musket",
        description: "Deal Long Range Damage",
        range: 1000,
        Hw: 1,
        Bb: 49,
        reload: 1500,
        Zb: s.bn,
        Mg: 2100,
        Qm: 1,
        sm: 1,
        Pb: 0.63,
        Id: 0,
        Jd: 0
      };
      f[c.q] = {
        tu: c.q,
        Fm: [0, 4, 0, 0],
        Nb: u.N,
        Ob: u.q,
        cg: s.Ei,
        rm: s.q,
        js: "Bow",
        description: "Deal Long Range Damage",
        range: 800,
        Hw: 1,
        Bb: 25,
        reload: 600,
        Zb: s.Ui,
        Mg: 1700,
        Qm: 1,
        sm: 1,
        Pb: 0.75,
        Id: 0,
        Jd: 35
      };
      f[c.Kt] = {
        tu: c.Kt,
        Fm: [80, 80, 80, 80],
        Nb: u.N,
        Ob: u.Z,
        cg: s.gc,
        rm: s.Kt,
        js: "Pearl",
        description: "Teleport on impact",
        range: 800,
        Hw: 1,
        Bb: 10,
        reload: 7500,
        Zb: s.Kt,
        Mg: 1500,
        Qm: 1,
        sm: 1,
        Pb: 0.5,
        Id: 0,
        Jd: 35
      };
      f[c.Mt] = {
        tu: c.Mt,
        Fm: [0, 10, 0, 0],
        Nb: u.q,
        Ob: u.q | u.K | u.I,
        cg: s.ji,
        rm: s.Mt,
        js: "XBow",
        description: "Rapid fire bow",
        range: 800,
        Hw: 1,
        Bb: 27,
        reload: 235,
        Zb: s.Ui,
        Mg: 1700,
        Qm: 1,
        sm: 1,
        Pb: 0.5,
        Id: 0,
        Jd: 30
      };
      f[c.vt] = {
        tu: c.vt,
        Fm: [0, 10, 0, 0],
        cg: s.Fo,
        rm: s.Vi,
        js: "Wood Wall",
        description: "A sturdy wall",
        Hw: 3,
        Qm: 2,
        Vb: 5,
        Id: 0,
        Jd: 15,
        Wb: r.gn,
        sm: 2
      };
      f[c.Kn] = {
        tu: c.Kn,
        Fm: [0, 50, 50, 0],
        Nb: u.I | u.K | u.X,
        Ob: u.N,
        cg: s.mc,
        rm: s.Kn,
        js: "Teleporter",
        description: "Teleports to location on map",
        Hw: 9,
        Qm: 2,
        Vb: 5,
        Id: 0,
        Jd: 15,
        Wb: r.Kn,
        sm: 2
      };
      f[c.pn] = {
        tu: c.pn,
        Fm: [0, 0, 35, 10],
        Nb: u.N,
        Ob: u.N,
        cg: s.Zi,
        rm: s.Xi,
        js: "Castle Wall",
        description: "A very sturdy wall",
        Hw: 3,
        Qm: 2,
        Vb: 8,
        Id: 0,
        Jd: 13,
        Wb: r.pn,
        sm: 2
      };
      f[c.Bn] = {
        tu: c.Bn,
        Fm: [0, 200, 150, 10],
        Nb: u.N,
        Ob: u.N,
        cg: s.Ti,
        rm: s.Ci,
        js: "Turret",
        description: "Defence for your base",
        Hw: 10,
        Qm: 2,
        Vb: 6,
        Id: 0,
        Jd: 25,
        Wb: r.Bn,
        sm: 2
      };
      f[c._n] = {
        tu: c._n,
        Nb: u.N,
        Ob: u.N,
        Fm: [0, 200, 200, 200],
        cg: s.zi,
        rm: s.cr,
        js: "Cosy Bed",
        description: "Respawn at the bed",
        Hw: 9,
        Qm: 2,
        Vb: 8,
        Id: 0,
        Jd: 25,
        Wb: r._n,
        sm: 2
      };
      f[c.yn] = {
        tu: c.yn,
        Fm: [0, 50, 10, 0],
        cg: s.gi,
        rm: s.bi,
        js: "Windmill",
        description: "Generates score over time",
        Hw: 5,
        Qm: 2,
        Vb: -5,
        Id: 0,
        Jd: 38,
        Wb: r.yn,
        sm: 2
      };
      f[c.Mn] = {
        tu: c.Mn,
        Fm: [0, 100, 50, 0],
        Nb: u.N,
        Ob: u.N,
        cg: s.gi,
        rm: s.bi,
        js: "Powermill",
        description: "Generates more score over time",
        Hw: 5,
        Qm: 2,
        Vb: 5,
        Id: 0,
        Jd: 38,
        Wb: r.Mn,
        sm: 2
      };
      f[c.mn] = {
        tu: c.mn,
        Fm: [0, 20, 5, 0],
        cg: s.$o,
        rm: s.Wi,
        js: "Spike",
        description: "Sharp defence",
        Hw: 4,
        Qm: 2,
        Vb: 2,
        Id: 0,
        Jd: 15,
        Wb: r.mn,
        sm: 2
      };
      f[c.ln] = {
        tu: c.ln,
        Nb: u.N,
        Ob: u.N,
        Fm: [0, 30, 10, 0],
        cg: s.Li,
        rm: s.er,
        js: "Hard Spike",
        description: "Sharper defence",
        Hw: 4,
        Qm: 2,
        Vb: 2,
        Id: 0,
        Jd: 15,
        Wb: r.ln,
        sm: 2
      };
      f[c.Vn] = {
        tu: c.Vn,
        Nb: u.V,
        Ob: u.N,
        Fm: [0, 40, 20, 10],
        cg: s.wc,
        rm: s.vc,
        js: "Ice Spike",
        description: "Even Sharper defence",
        Hw: 4,
        Qm: 2,
        Vb: 2,
        Id: 0,
        Jd: 15,
        Wb: r.Vn,
        sm: 2
      };
      f[c.Cn] = {
        tu: c.Cn,
        Nb: u.N,
        Ob: u.N,
        Fm: [0, 200, 0, 0],
        cg: s.xi,
        rm: s.nr,
        js: "Cherry wood farm",
        description: "Used for decoration and wood",
        Hw: 6,
        Qm: 2,
        Vb: 3,
        Id: 0,
        Jd: 47,
        Wb: r.Cn,
        sm: 2
      };
      f[c.Ln] = {
        tu: c.Ln,
        Nb: u.N,
        Ob: u.N,
        Fm: [0, 200, 0, 0],
        cg: s.Hi,
        rm: s.tr,
        js: "Wood farm",
        description: "Used for decoration and wood",
        Hw: 6,
        Qm: 2,
        Vb: 3,
        Id: 0,
        Jd: 47,
        Wb: r.Ln,
        sm: 2
      };
      f[c.An] = {
        tu: c.An,
        Nb: u.N,
        Ob: u.N,
        Fm: [0, 0, 200, 0],
        cg: s.ki,
        rm: s.Ri,
        js: "Stone farm",
        description: "Used for decoration and stone",
        Hw: 6,
        Qm: 2,
        Vb: 3,
        Id: 0,
        Jd: 20,
        Wb: r.An,
        sm: 2
      };
      f[c._t] = {
        tu: c._t,
        Nb: u.N,
        Ob: u.N,
        Fm: [200, 0, 0, 0],
        cg: s.Gi,
        rm: s.$i,
        js: "Berry farm",
        description: "Used for decoration and berries",
        Hw: 6,
        Qm: 2,
        Vb: 3,
        Id: 0,
        Jd: 17,
        Wb: r.dn,
        sm: 2
      };
      f[c.Dn] = {
        tu: c.Dn,
        Fm: [0, 30, 30, 0],
        Nb: u.I | u.K,
        Ob: u.N,
        cg: s.Di,
        rm: s.ir,
        js: "Castle Spike",
        description: "Great for bases",
        Hw: 4,
        Qm: 2,
        Vb: -8,
        Id: 0,
        Jd: 14,
        Wb: r.Dn,
        sm: 2
      };
      f[c.V] = {
        tu: c.V,
        Fm: [0, 5, 20, 0],
        Nb: u.N,
        Ob: u.V,
        cg: s.Ro,
        rm: s.Fi,
        js: "Boost",
        description: "Provides a thrust",
        Hw: 7,
        Qm: 2,
        Vb: -5,
        Id: 0,
        Jd: 3,
        Wb: r.V,
        sm: 2
      };
      f[c.W] = {
        tu: c.W,
        Fm: [0, 30, 30, 0],
        Nb: u.N,
        Ob: u.W,
        cg: s.ti,
        rm: s.Qi,
        js: "Trap",
        description: "Snared enemies are stuck",
        Hw: 7,
        Qm: 2,
        Vb: 2,
        Id: 0,
        Jd: 26,
        Wb: r.W,
        sm: 2
      };
      f[c.$] = {
        tu: c.$,
        Fm: [25, 80, 50, 0],
        Xb: 4,
        Nb: u.N,
        Ob: u.$,
        cg: s.sc,
        rm: s.Sd,
        js: "Heal Pad",
        description: "Allies around you are healed",
        Hw: 11,
        Qm: 2,
        Vb: 2,
        Id: 0,
        Jd: 26,
        Wb: r.$,
        sm: 2,
        Fb: 10,
        reload: 500,
        range: 300
      };
      f[c.vn] = {
        tu: c.vn,
        Fm: [0, 20, 0, 0],
        Nb: u.N,
        Ob: u.vn,
        cg: s.ni,
        rm: s.rr,
        js: "Platform",
        description: "Shoot over structures",
        Hw: 8,
        Qm: 2,
        Vb: -2,
        Id: 0,
        Jd: 8,
        Wb: r.vn,
        sm: 2
      };
      f[c.kn] = {
        tu: c.kn,
        Fm: [0, 20, 0, 0],
        Nb: u.N,
        Ob: u.vn,
        cg: s.Pr,
        rm: s.kn,
        js: "Roof",
        description: "Take cover from projectiles",
        Hw: 8,
        Qm: 2,
        Vb: 0,
        Id: 0,
        Jd: 15,
        Wb: r.kn,
        sm: 2
      };
      f[c.wt] = {
        tu: c.wt,
        Fm: [10, 0, 0, 0],
        cg: s.ii,
        rm: s.wt,
        js: "Apple",
        description: "Heals you",
        Hw: 2,
        Qm: 3,
        Fb: 20,
        Id: 0,
        Jd: 22,
        sm: 2
      };
      f[c.bt] = {
        tu: c.bt,
        Fm: [15, 0, 0, 0],
        Nb: u.N,
        Ob: u.J,
        cg: s.li,
        rm: s.bt,
        js: "Cookie",
        description: "Heals you",
        Hw: 2,
        Qm: 3,
        Fb: 35,
        Id: 0,
        Jd: 22,
        sm: 2
      };
      f[c.Z] = {
        tu: c.Z,
        Nb: u.N,
        Ob: u.Z,
        cg: s.si,
        rm: s.Z,
        js: "Shield",
        description: "Reduces damage",
        Hw: 1,
        Qm: 0,
        Pb: 0.7,
        Qb: 0.75,
        range: 55,
        jb: 350,
        Bb: 15,
        Yb: 40,
        reload: 500,
        Id: -15,
        Jd: 10,
        sm: 3
      };
      f[c.ne] = {
        tu: c.ne,
        Nb: u.N,
        Ob: u.R,
        cg: s.cc,
        rm: s.dc,
        js: "Ruby Healing Staff",
        description: "Make peace, not war",
        range: 140,
        jb: 100,
        Hw: 0,
        Bb: 30,
        Fb: 30,
        reload: 500,
        Qm: 0,
        sm: 0,
        Id: -30,
        Jd: 0
      };
      f[c.$t] = {
        ym: c.ne,
        Ub: a.Qc,
        tu: c.$t,
        Nb: u.N,
        Ob: u.R,
        cg: s.rc,
        rm: s.hc,
        js: "Diamond Healing Staff",
        description: "Make peace, not war",
        range: 140,
        jb: 100,
        Hw: 0,
        Bb: 27,
        Fb: 27,
        reload: 500,
        Qm: 0,
        sm: 0,
        Id: -30,
        Jd: 0
      };
      f[c.Rt] = {
        ym: c.$t,
        Ub: a.Fc,
        tu: c.Rt,
        Nb: u.N,
        Ob: u.R,
        cg: s.ic,
        rm: s.lc,
        js: "Gold Healing Staff",
        description: "Make peace, not war",
        range: 140,
        jb: 100,
        Hw: 0,
        Bb: 24,
        Fb: 24,
        reload: 500,
        Qm: 0,
        sm: 0,
        Id: -30,
        Jd: 0
      };
      f[c.Qt] = {
        ym: c.Rt,
        Ub: a.tn,
        tu: c.Qt,
        Nb: u.N,
        Ob: u.R,
        cg: s.oc,
        rm: s.fc,
        js: "Healing Staff",
        description: "Make peace, not war",
        range: 140,
        jb: 100,
        Hw: 0,
        Bb: 21,
        Fb: 21,
        reload: 500,
        Qm: 0,
        sm: 0,
        Id: -30,
        Jd: 0
      };
      n.exports = f;
    },
    9435: function (n, t, e) {
      const o = e(3255);
      const i = e(6597);
      const r = [];
      r[o.xo] = {
        rm: i.xo,
        _g: 500,
        _h: 0,
        _g: 1,
        Rb: 150,
        $b: 2
      };
      r[o.To] = {
        rm: i.To,
        _g: 500,
        _h: 0,
        _g: 1,
        Rb: 150,
        $b: 2
      };
      r[o.Ho] = {
        rm: i.Ho,
        _g: 500,
        _h: 0,
        _g: 1,
        Rb: 150,
        $b: 2
      };
      r[o.tn] = {
        rm: i.qo,
        _g: 500,
        _h: 0,
        _g: 1,
        Rb: 100,
        $b: 2
      };
      n.exports = r;
    },
    1122: function (n, t, e) {
      const o = e(3028);
      const i = e(9623);
      n.exports = function (n) {
        n = i(n || "");
        return o(n(), n(), n(), n());
      };
    },
    2936: function (n) {
      n.exports = function (n, t) {
        this.zh = n || 0;
        this.Mh = t || 0;
      };
    },
    9629: function (n, t, e) {
      const o = e(6112);
      const i = e(1122);
      n.exports = function (n, t) {
        const e = o("" + n, "" + t);
        const r = i(e);
        return [~~(r() * 246), ~~(r() * 255), ~~(r() * 255), ~~(r() * 255)];
      };
    },
    6112: function (n, e, o) {
      const r = o(9303);
      const c = o(3235);
      const s = o(9869);
      const u = o(1318);
      const a = o(6217);
      const f = o(1552);
      n.exports = function (n, t) {
        t = t || 0;
        const o = (n = n || "").length % 16;
        const l = n.length - o;
        let h = [0, t];
        let d = [0, t];
        let m = [0, 0];
        let g = [0, 0];
        const v = [2277735313, 289559509];
        const w = [1291169091, 658871167];
        let b;
        for (b = 0; b < l; b += 16) {
          m = [n.charCodeAt(b + 4) & 255 | (n.charCodeAt(b + 5) & 255) << 8 | (n.charCodeAt(b + 6) & 255) << 16 | (n.charCodeAt(b + 7) & 255) << 24, n.charCodeAt(b) & 255 | (n.charCodeAt(b + 1) & 255) << 8 | (n.charCodeAt(b + 2) & 255) << 16 | (n.charCodeAt(b + 3) & 255) << 24];
          g = [n.charCodeAt(b + 12) & 255 | (n.charCodeAt(b + 13) & 255) << 8 | (n.charCodeAt(b + 14) & 255) << 16 | (n.charCodeAt(b + 15) & 255) << 24, n.charCodeAt(b + 8) & 255 | (n.charCodeAt(b + 9) & 255) << 8 | (n.charCodeAt(b + 10) & 255) << 16 | (n.charCodeAt(b + 11) & 255) << 24];
          m = c(m, v);
          m = s(m, 31);
          m = c(m, w);
          h = a(h, m);
          h = s(h, 27);
          h = r(h, d);
          h = r(c(h, [0, 5]), [0, 1390208809]);
          g = c(g, w);
          g = s(g, 33);
          g = c(g, v);
          d = a(d, g);
          d = s(d, 31);
          d = r(d, h);
          d = r(c(d, [0, 5]), [0, 944331445]);
        }
        m = [0, 0];
        g = [0, 0];
        switch (o) {
          case 15:
            g = a(g, u([0, n.charCodeAt(b + 14)], 48));
          case 14:
            g = a(g, u([0, n.charCodeAt(b + 13)], 40));
          case 13:
            g = a(g, u([0, n.charCodeAt(b + 12)], 32));
          case 12:
            g = a(g, u([0, n.charCodeAt(b + 11)], 24));
          case 11:
            g = a(g, u([0, n.charCodeAt(b + 10)], 16));
          case 10:
            g = a(g, u([0, n.charCodeAt(b + 9)], 8));
          case 9:
            g = a(g, [0, n.charCodeAt(b + 8)]);
            g = c(g, w);
            g = s(g, 33);
            g = c(g, v);
            d = a(d, g);
          case 8:
            m = a(m, u([0, n.charCodeAt(b + 7)], 56));
          case 7:
            m = a(m, u([0, n.charCodeAt(b + 6)], 48));
          case 6:
            m = a(m, u([0, n.charCodeAt(b + 5)], 40));
          case 5:
            m = a(m, u([0, n.charCodeAt(b + 4)], 32));
          case 4:
            m = a(m, u([0, n.charCodeAt(b + 3)], 24));
          case 3:
            m = a(m, u([0, n.charCodeAt(b + 2)], 16));
          case 2:
            m = a(m, u([0, n.charCodeAt(b + 1)], 8));
          case 1:
            m = a(m, [0, n.charCodeAt(b)]);
            m = c(m, v);
            m = s(m, 31);
            m = c(m, w);
            h = a(h, m);
        }
        h = a(h, [0, n.length]);
        d = a(d, [0, n.length]);
        h = r(h, d);
        d = r(d, h);
        h = f(h);
        d = f(d);
        h = r(h, d);
        d = r(d, h);
        return ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[1] >>> 0).toString(16)).slice(-8);
      };
    },
    9882: function (n) {
      n.exports = function () {
        this.ys = function (n, t, e, o) {
          this.ny = n;
          this.ty = t;
          this.ey = e;
          this.oy = o;
        };
        this.iy = function (n) {
          let e = n.length;
          for (let t = 0; t < e; t++) {
            n[t] = n[t] ^ this.ny;
            this.ny = (this.oy * this.ny + this.ey + this.ty) % this.ey;
          }
        };
      };
    },
    3028: function (n) {
      n.exports = function (n, t, e, o) {
        return function () {
          var i = (n >>>= 0) + (t >>>= 0) | 0;
          n = t ^ t >>> 9;
          t = (e >>>= 0) + (e << 3) | 0;
          e = (e = e << 21 | e >>> 11) + (i = i + (o = 1 + (o >>>= 0) | 0) | 0) | 0;
          return (i >>> 0) / 4294967296;
        };
      };
    },
    9303: function (n) {
      n.exports = function (n, t) {
        n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
        t = [t[0] >>> 16, t[0] & 65535, t[1] >>> 16, t[1] & 65535];
        const e = [0, 0, 0, 0];
        e[3] += n[3] + t[3];
        e[2] += e[3] >>> 16;
        e[3] &= 65535;
        e[2] += n[2] + t[2];
        e[1] += e[2] >>> 16;
        e[2] &= 65535;
        e[1] += n[1] + t[1];
        e[0] += e[1] >>> 16;
        e[1] &= 65535;
        e[0] += n[0] + t[0];
        e[0] &= 65535;
        return [e[0] << 16 | e[1], e[2] << 16 | e[3]];
      };
    },
    1552: function (n, e, o) {
      const r = o(3235);
      const c = o(6217);
      n.exports = function (n) {
        n = c(n, [0, n[0] >>> 1]);
        n = r(n, [4283543511, 3981806797]);
        n = c(n, [0, n[0] >>> 1]);
        n = r(n, [3301882366, 444984403]);
        return c(n, [0, n[0] >>> 1]);
      };
    },
    1318: function (n) {
      n.exports = function (n, t) {
        if ((t %= 64) == 0) {
          return n;
        } else if (t < 32) {
          return [n[0] << t | n[1] >>> 32 - t, n[1] << t];
        } else {
          return [n[1] << t - 32, 0];
        }
      };
    },
    3235: function (n) {
      n.exports = function (n, t) {
        n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
        t = [t[0] >>> 16, t[0] & 65535, t[1] >>> 16, t[1] & 65535];
        const e = [0, 0, 0, 0];
        e[3] += n[3] * t[3];
        e[2] += e[3] >>> 16;
        e[3] &= 65535;
        e[2] += n[2] * t[3];
        e[1] += e[2] >>> 16;
        e[2] &= 65535;
        e[2] += n[3] * t[2];
        e[1] += e[2] >>> 16;
        e[2] &= 65535;
        e[1] += n[1] * t[3];
        e[0] += e[1] >>> 16;
        e[1] &= 65535;
        e[1] += n[2] * t[2];
        e[0] += e[1] >>> 16;
        e[1] &= 65535;
        e[1] += n[3] * t[1];
        e[0] += e[1] >>> 16;
        e[1] &= 65535;
        e[0] += n[0] * t[3] + n[1] * t[2] + n[2] * t[1] + n[3] * t[0];
        e[0] &= 65535;
        return [e[0] << 16 | e[1], e[2] << 16 | e[3]];
      };
    },
    9869: function (n) {
      n.exports = function (n, t) {
        if ((t %= 64) == 32) {
          return [n[1], n[0]];
        } else if (t < 32) {
          return [n[0] << t | n[1] >>> 32 - t, n[1] << t | n[0] >>> 32 - t];
        } else {
          t -= 32;
          return [n[1] << t | n[0] >>> 32 - t, n[0] << t | n[1] >>> 32 - t];
        }
      };
    },
    6217: function (n) {
      n.exports = function (n, t) {
        return [n[0] ^ t[0], n[1] ^ t[1]];
      };
    },
    9623: function (n) {
      n.exports = function (n) {
        for (var o = 0, i = n.length ^ 1779033703; o < n.length; o++) {
          i = (i = Math.imul(i ^ n.charCodeAt(o), 3432918353)) << 13 | i >>> 19;
        }
        return function () {
          i = Math.imul(i ^ i >>> 16, 2246822507);
          i = Math.imul(i ^ i >>> 13, 3266489909);
          return (i ^= i >>> 16) >>> 0;
        };
      };
    },
    3555: function (n, e, o) {
      const r = o(4613);
      const c = [];
      let s = "Baloo Paaji";
      let u = "";
      let a = 7;
      let f = null;
      let l = false;
      function h(n) {
        if (!l) {
          l = true;
          try {
            let n = o(5108);
            if (n && n.default) {
              n = n.default;
            }
            if (n && typeof n.Ts == "function") {
              f = n;
            }
          } catch (n) {}
        }
        if (f) {
          return f.Ts(n);
        } else {
          return n;
        }
      }
      n.exports = {
        sy: (n, t) => n.zh < t.zh + t.w && n.zh + n.w > t.zh && n.Mh < t.Mh + t.ed && n.Mh + n.ed > t.Mh,
        Fg: function (n, t, e, o) {
          return Math.sqrt((t - o) ** 2 + (n - e) ** 2);
        },
        Qg: function (n, t, e, o) {
          return Math.atan2(o - t, e - n);
        },
        uy: function (n, t) {
          var e = Math.PI * 2;
          var o = (t - n) % e;
          return o * 2 % e - o;
        },
        ly: function (n) {
          return n[Math.floor(Math.random() * n.length)];
        },
        hy(n, t, e, o, i, r, c) {
          var s = [i - n, r - t];
          var u = [e - n, o - t];
          var a = this.my(u, u);
          var f = this.my(s, u) / a;
          var l = [u[0] * (f = (f = f < 0 ? 0 : f) > 1 ? 1 : f) + n - i, u[1] * f + t - r];
          return this.my(l, l) <= c * c;
        },
        my: (n, t) => n[0] * t[0] + n[1] * t[1],
        gy: function (n, t, e, o) {
          return n * e + t * o;
        },
        my: (n, t) => n[0] * t[0] + n[1] * t[1],
        xh: function (n, t, e) {
          return n + this.uy(n, t) * e;
        },
        Ih: function (n, t, e) {
          return n * (1 - e) + t * e;
        },
        vy: (n, t, e) => n >= e.Wv && n <= e.Fv && t >= e.Xv && t <= e.Qv,
        vm: (n, t, e, o, i, r) => n >= e && n <= e + i && t >= o && t <= o + r,
        wy: (n, t, e) => n < t ? t : n > e ? e : n,
        by: (n, t) => Math.floor(Math.random() * (t - n + 1)) + n,
        qh: function (n, e, o, i, r, c) {
          this.dir = n;
          this.value = e;
          this.max = o;
          this.min = i;
          this.$w = r;
          this.Rw = c;
          this.$s = function (n) {
            if (this.dir) {
              var e = this.value + n * this.$w;
              if (e > this.max) {
                e = this.max;
                this.dir = false;
              }
              this.value = e;
            } else {
              if ((e = this.value - n * this.Rw) < this.min) {
                e = this.min;
                this.dir = true;
              }
              this.value = e;
            }
          };
          return false;
        },
        Ew: {
          yy: n => n,
          zy: n => n * n,
          _y: n => n * (2 - n),
          My: n => n < 0.5 ? n * 2 * n : (4 - n * 2) * n - 1,
          Dy: n => n * n * n,
          By: n => --n * n * n + 1,
          Ly: n => n < 0.5 ? n * 4 * n * n : (n - 1) * (n * 2 - 2) * (n * 2 - 2) + 1,
          Cy: n => n * n * n * n,
          Ay: n => 1 - --n * n * n * n,
          py: n => n < 0.5 ? n * 8 * n * n * n : 1 - --n * 8 * n * n * n,
          Ty: n => n * n * n * n * n,
          xy: n => 1 + --n * n * n * n * n,
          Gw: n => n < 0.5 ? n * 16 * n * n * n * n : 1 + --n * 16 * n * n * n * n,
          Hy: n => -Math.pow(2, (n -= 1) * 10) * Math.sin(Math.PI * 2 * (n - 0.1) / 0.4),
          ky: n => -Math.pow(2, n * 10) * Math.sin(Math.PI * 2 * (n - 0.1) / 0.4) + 1,
          Gy: n => Math.sin(n),
          Ey: n => n * -15 * (n - 1.3)
        },
        pm: (n, t, e, o, r, c) => {
          if (o < c * 2) {
            c = o / 2;
          }
          if (r < c * 2) {
            c = r / 2;
          }
          if (c < 0) {
            c = 0;
          }
          n.beginPath();
          n.moveTo(t + c, e);
          n.arcTo(t + o, e, t + o, e + r, c);
          n.arcTo(t + o, e + r, t, e + r, c);
          n.arcTo(t, e + r, t, e, c);
          n.arcTo(t, e, t + o, e, c);
          n.closePath();
          return n;
        },
        Uy: n => Math.floor((n + Math.PI) / 6.283185307179586 * 255) & 255,
        Qw: n => n / 255 * 6.283185307179586 - Math.PI,
        Yy(n) {
          if (n > 2147483647) {
            throw "number too large. number shouldn't be > 2**31-1";
          }
          if (n < -2147483648) {
            throw "number too far negative, number shouldn't be < 2**31";
          }
          for (var e = 0, o = n, r = ""; e < 32; o <<= 1) {
            e++;
            r += (o >>> 31) + "";
          }
          return r.replace(/\B(?=(.{8})+(?!.))/g, " ");
        },
        jy: function (n) {
          return [n & 255, n >> 8 & 255];
        },
        Am: function (n, t, e, o) {
          const i = document.createElement("canvas");
          i.width = n;
          i.height = t;
          const r = i.getContext("2d");
          r.beginPath();
          r.fillStyle = o;
          this.pm(r, 0, 0, n, t, e);
          r.fill();
          return i;
        },
        zg: n => n > 9999999 ? Math.floor(n / 1000000) + "M" : n > 999999 ? Math.floor(n / 1000000 * 100) / 100 + "M" : n > 99999 ? (Math.floor(n / 1000) + "K").replace(".0", "") : n > 9999 ? (Math.floor(n / 1000 * 10) / 10 + "K").replace(".0", "") : n > 0 ? Math.floor(n) : n + "",
        $v: function (n) {
          if (n = typeof n == "string" ? n.trim() : "") {
            if (/\s/.test(n) && !/["']/.test(n)) {
              n = "\"" + n + "\"";
            }
          } else {
            n = "Baloo Paaji";
          }
          s = n;
        },
        jg: function () {
          return s;
        },
        nw: function (n) {
          u = typeof n == "string" && n.charAt(0) === "#" ? n : "";
        },
        tw: function (n) {
          a = typeof n == "number" && isFinite(n) && n >= 0 ? n : 7;
        },
        Ny: function (n, t, e, o, r, c, f, l, h) {
          const m = n.getContext("2d");
          c = c ? c * 1 : 0;
          var g = Math.floor(e * 1);
          m.font = e * 1 + "px " + s;
          l *= 1;
          var v = f ? l * 2 : 0;
          h = h ? Math.min(m.measureText(t).width + 2 + v, h) : m.measureText(t).width + 2 + v + 10;
          g = (g + c) * 1 + v + 10;
          h = Math.ceil(h);
          g = Math.ceil(g);
          n.width = h;
          n.height = g;
          if (f) {
            m.fillStyle = f;
            this.pm(m, 0, 0, h, g, l * 2);
            m.fill();
            m.translate(l, l);
          }
          m.textBaseline = "middle";
          m.font = e * 1 + "px " + s;
          m.fillStyle = o;
          const w = u || r;
          m.lineWidth = a;
          m.lineJoin = "round";
          if (w) {
            m.strokeStyle = w;
            m.strokeText(t, 5, (g - v) / 2, h);
          }
          m.fillText(t, 5, (g - v) / 2, h);
          return n;
        },
        Xm: function (n, t, e, o, i, r, c, s, u) {
          return this.Ny(n, t, e, o, i, r, c, s, u);
        },
        Gm: function (n, t, e, o, r, c, s, u) {
          const f = document.createElement("canvas");
          return this.Ny(f, n, t, e, o, r, c, s, u);
        },
        eg: n => Math.log(1 + n) ** 2.4 / 13,
        nb(n) {
          while (n.firstChild) {
            n.removeChild(n.lastChild);
          }
        },
        Lw(n) {
          const e = document.createElement(n.tag || "div");
          if (n.src) {
            e.src = n.src;
          }
          if (n.Aw) {
            e.innerHTML = n.Aw;
          }
          if (n.Cw) {
            e.className = n.Cw;
          }
          if (n.onclick) {
            e.onclick = n.onclick;
          }
          if (n.onmouseup) {
            e.onmouseup = n.onmouseup;
          }
          if (n.style) {
            e.style = n.style;
          }
          if (n.text) {
            e.innerText = n.text;
          }
          if (n.parent) {
            n.parent.appendChild(e);
          }
          return e;
        },
        Oy: n => true,
        Py: function (n) {
          return {
            src: n,
            $d: {
              Wd: r.ut
            }
          };
        },
        Sy: function () {
          this.Wd = r.at;
          this.om = this.width / 2;
          this.im = this.height / 2;
        },
        qy: function () {
          this.Wd = r.ut;
        },
        Ky: function (n, t) {
          if (t === undefined || t.Wd !== r.ft) {
            (t = new Image()).Wd = r.ft;
            t.onload = this.Sy;
            t.onerror = this.qy;
            t.src = h(n);
          }
          return t;
        },
        Uv: () => new URL(window.location).searchParams.get("game"),
        Yv(n) {},
        Ad: function (n, t) {
          let e = this.Py(n);
          c.push(e);
          if (t) {
            e.$d = this.Ky(e.src, e.$d);
          }
          return e;
        },
        ow: function (n) {
          if (!n) {
            return;
          }
          const e = this;
          for (let o = 0; o < c.length; o++) {
            const i = c[o];
            if (!i || typeof i.src != "string" || i.src.indexOf(n) === -1) {
              continue;
            }
            if (!i.$d || i.$d.Wd !== r.at) {
              continue;
            }
            const s = new Image();
            s.Wd = r.ft;
            s.onerror = e.qy;
            s.onload = function () {
              e.Sy.call(s);
              i.$d = s;
            };
            s.src = h(i.src);
          }
        },
        mw: function () {
          const n = this;
          for (let t = 0; t < c.length; t++) {
            const e = c[t];
            if (!e || typeof e.src != "string") {
              continue;
            }
            if (!e.$d || e.$d.Wd !== r.at) {
              continue;
            }
            const o = new Image();
            o.Wd = r.ft;
            o.onerror = n.qy;
            o.onload = function () {
              n.Sy.call(o);
              e.$d = o;
            };
            o.src = h(e.src);
          }
        },
        tm: function (n, t, e, o, c, s) {
          const a = t.$d;
          if (a.Wd === r.at) {
            n.drawImage(a, e, o, c || a.width, s || a.height);
          } else {
            t.$d = this.Ky(t.src, t.$d);
          }
        },
        Jy: function (n, t) {
          return n.Wv < t.Fv && n.Fv > t.Wv && n.Xv < t.Qv && n.Qv > t.Xv;
        },
        Pw: function (n, t, e) {
          return !!this.Jy(e, t) && (n.zh = Math.max(t.Wv, e.Wv), n.Mh = Math.max(t.Xv, e.Xv), n.w = Math.min(e.Fv, t.Fv) - n.zh, n.ed = Math.min(e.Qv, t.Qv) - n.Mh, true);
        },
        Iy(n, t) {
          if (n.length !== t.length) {
            return false;
          }
          for (let e = 0; e < n.length; e++) {
            if (n[e] !== t[e]) {
              return false;
            }
          }
          return true;
        }
      };
    },
    2072: function (n) {
      "use strict";

      n.exports = "Resources\n\nVarious resources can be collected in Sploop. The number of resources you have collected is displayed in the bottom right. Gold Bars are displayed on the right above the kill counter\n\nWood\nimg/entity/tree.png\n- Used for building\n- Given by trees, cherry trees and palm trees\n- Present in the plains and winter biomes\n\nStone\nimg/entity/stone.png\n- Used for building\n- Only given by rocks\n- Present in the plains and winter biomes\n\nFood\nimg/entity/bush.png\n- Used for healing and some building\n- Given by bushes and cacti, cacti give 5x more food\n- Present in plains, winter and desert biomes\n\nGold\nimg/entity/gold.png\n- Used to climb leaderboards and rank up your account\n- Can be used to buy hats that give different advantages through the hat shop\n- Also used for some buildings\n- Given by windmills (see items section), gold mines (15 gold per hit), ruby (75 gold per hit) and chests (70 gold per hit)\n- Present in plains and desert biomes\n\nGold Bars\nimg/ui/currency.png\n- Used to buy cosmetics in the shop\n- Given by killing bosses and breaking their chest\n- Different bosses drop different amounts\n\n!HTML\n<span class=\"subcontent-title\">\n\tAbove the inventory is the age bar, which fills up as you kill enemies and collect resources to unlock new items.\n\t<br>\n\tOnce you reach level 4, you can choose to receive a tree, rock, or bush and place it down. More info in the items section\n</span>\n!HTML\n\n!New Section\n\nWeapons\n\nThere is a wide range of weapons in Sploop, each with its unique purpose.\n\nSword & Katana\nimg/entity/inv_stone_sword.png\nimg/entity/inv_katana.png\n- Used for attacking enemies or mobs\n- Sword deals 35 damage, Katana deals 40\n- Good attack speed\n- Most commonly used for PvP combat due to its strength\n\nStick\nimg/entity/inv_stick.png\n- Used for gathering lots of resources\n- Gathers 7x the resources per hit compared to regular weapons (apart from axe)\n- Extremely bad in combat, deals 1 damage per hit\n\n!New Section\n\nGamemodes\n\nThere are 3 main gamemodes in Sploop, each with a different purpose\n\nClassic\n- Players spawn with 100 food, 100 wood, 100 stone, 100 gold\n- Farming gold to rank up\n- Gold Bars can also be farmed here, but it is significantly easier to do in Sandbox\n- Killing and dying affects your KDR\n\nSandbox\n- Spawn with 100k of each resource\n- Gold farmed IS NOT counted towards your account, but Gold Bars are\n- Killing or dying will not affect your KDR\n\nEvent\n- Used to host official events\n- Gold and Gold Bars cannot be farmed here\n- Moderators can manage this space with less restrictions\n- Join the official Sploop Discord to be notified when events happen (click the Discord button on the homepage)\n\n!New Section\n\nBasing\n\nBasing is used to protect players from enemies. It can be especially useful to prevent raids by other players when farming large amounts of resources\n\nBase Walling\n- Trees can be used as indestructible walls that block projectiles like arrows or turrets\n- Stone farms block players but projectiles can be shot over them\n- Trees and stones can be used in combination, with stones on the side closer to the base allowing turrets to shoot anyone that gets past the trees but stuck in front of the stones, while protecting turrets and players from projectiles outside the base wall\n- Castle spikes are useful as they damage enemies breaking them, which can be used to slow enemies down\n\nBase Defence\n- Turrets are useful to kill or slow players before they manage to deal much damage to the base\n- 4 turrets are required to kill a player if they shoot at the same time, 6 are required if the player has crystal or immunity gear\n- Placing the turrets at different angles and not all clumped together reduces the effectiveness of shields, but means the area where all 6 turrets can target a player is reduced\n- Placing traps around the base slows players down, and prevents roof placing allowing turrets to be more effective\n- Defenders with katanas will help fight any intruders\n- Players on platforms with XBows can also be very annoying to raiders\n- Make sure all AFK players have roofs above them to prevent raiders from using bows or muskets to kill them\n- All players who helped build base walls or defences should have placed a bed down, so if they die the builds they placed down do not get removed\n\n!New Section\n\nBosses\n\nBosses are the only way to get Gold Bars, which spawn at random spots in the arctic biome.\n\nChests\nimg/entity/chest.png\n- Chests are dropped by bosses when they are killed\n- When broken, chests give the player who broke the chest a certain amount of Gold Bars\n- Chests also give players gold when hit.\n- A stick can be used to farm gold from chests as it deals very little damage to the chest, although it will eventually break\n\nDragon\nimg/entity/dragon_2_head.png\n- Chest: 30 img/ui/currency.png\n- Spawns inside a lava arena\n- Attacks by charging at closest player and shoots fireballs\n- Fireballs push the player and constantly deal damage to the player\n- Fireballs can be avoided by standing on top of a platform\n\nMammoth\nimg/entity/mammoth_head.png\n- Chest: 40 img/ui/currency.png\n- Spawns inside an ice arena\n- Attacks by charging at closest player\n\nGolden Cow\nimg/entity/gcow.png\n- Chest: 20 img/ui/currency.png\n- Attacks by charging at closest player\n- Only boss that can be trapped\n- Roams free around the map without an arena\n- Can be used to obtain a secret weapon\n- Gives 100 gold when hit with any weapon\n\n!New Section\n\nPvP\n\nThe 2 main methods of PvP in Sploop are using traps and spikes\n\nTraps\nimg/entity/trap.png\n- Trap PvP is about control and planning\n- Traps can be used to prevent players from moving\n- This works best with spikes, which can be placed next to a trapped player to kill them quickly\n- Players can also be pushed into spikes if they are not placed close enough\n\nBoosts\nimg/entity/boost.png\n- Boost PvP is about speed and surprise\n- Stepping on a boost launches you forward\n- This can give enemies little time to react\n- Most effective when spikes are placed right after, where the boost pushes you and the enemy forward into the spikes you just placed\n- Boosts can also be used to build traps, and a player wearing hood or bush can use a bat or another boost to push them into the trap\n";
    }
  };
  var c = {};
  function s(n) {
    var t = c[n];
    if (t !== undefined) {
      return t.exports;
    }
    var e = c[n] = {
      exports: {}
    };
    r[n](e, e.exports, s);
    return e.exports;
  }
  s.n = function (n) {
    var t = n && n.Zy ? function () {
      return n.default;
    } : function () {
      return n;
    };
    s.d(t, {
      a: t
    });
    return t;
  };
  s.d = function (n, t) {
    for (var e in t) {
      if (s.Rh(t, e) && !s.Rh(n, e)) {
        Object.defineProperty(n, e, {
          Vy: true,
          get: t[e]
        });
      }
    }
  };
  s.Rh = function (n, t) {
    return Object.prototype.hasOwnProperty.call(n, t);
  };
  s.r = function (n) {
    if (typeof Symbol != "undefined" && Symbol.toStringTag) {
      Object.defineProperty(n, Symbol.toStringTag, {
        value: "Module"
      });
    }
    Object.defineProperty(n, "xM", {
      value: true
    });
  };
  s(8557);
})();
