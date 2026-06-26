//1e46eba7f6fca2ae6663.js
//!! - bugs or potential bugs
//EDIT n, END EDIT n - deviations from original source code
//add n to all EDIT/ENDEDITs
// ADS EDIT removes ad loading
// ZOOM EDIT shows where its modified to custom zoom not ui
// GRID EDIT shows where its modified to custom grid rendering
// WORLD BOUND EDIT shows where its modified to accurate world boundaries
// KEYBINDS EDIT shows where its modified to take keybinds from custom bettersploop settings instead of default keybinds localstorage

//EDIT
let entityUids = {}
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
const accurateBoundaries = {
    world: [
        {
            "Ww": 150,
            "Ow": 2500,
            "Zw": 9850,
            "Iw": 7500,
            "bk": "#788F57",
            "Vp": "plains_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 150,
            "Zw": 9850,
            "Iw": 2500,
            "bk": "#ece5db",
            "Vp": "snow_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 7500,
            "Zw": 9850,
            "Iw": 8000,
            "bk": "#fcefbb",
            "Vp": "beach_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 8000,
            "Zw": 9850,
            "Iw": 9000,
            "bk": "#2a8b9b",
            "Vp": "river_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 9000,
            "Zw": 9850,
            "Iw": 9850,
            "bk": "#b38354",
            "Vp": "desert_background_texture"
        }
    ],
    biome: [
        {
            "Ww": 160,
            "Ow": 2500,
            "Zw": 9840,
            "Iw": 7499,
            "bk": "#788F57",
            "Vp": "plains_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 160,
            "Zw": 9840,
            "Iw": 2499,
            "bk": "#ece5db",
            "Vp": "snow_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 7500,
            "Zw": 9840,
            "Iw": 7999,
            "bk": "#fcefbb",
            "Vp": "beach_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 8000,
            "Zw": 9840,
            "Iw": 8999,
            "bk": "#2a8b9b",
            "Vp": "river_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 9000,
            "Zw": 9840,
            "Iw": 9840,
            "bk": "#b38354",
            "Vp": "desert_background_texture"
        }
    ],
    both: [
        {
            "Ww": 150,
            "Ow": 2500,
            "Zw": 9850,
            "Iw": 7499,
            "bk": "#788F57",
            "Vp": "plains_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 150,
            "Zw": 9850,
            "Iw": 2499,
            "bk": "#ece5db",
            "Vp": "snow_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 7500,
            "Zw": 9850,
            "Iw": 7999,
            "bk": "#fcefbb",
            "Vp": "beach_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 8000,
            "Zw": 9850,
            "Iw": 8999,
            "bk": "#2a8b9b",
            "Vp": "river_background_texture"
        },
        {
            "Ww": 150,
            "Ow": 9000,
            "Zw": 9850,
            "Iw": 9850,
            "bk": "#b38354",
            "Vp": "desert_background_texture"
        }
    ],
    default: [
        {
            "Ww": 160,
            "Ow": 2500,
            "Zw": 9840,
            "Iw": 7500,
            "bk": "#788F57",
            "Vp": "plains_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 160,
            "Zw": 9840,
            "Iw": 2500,
            "bk": "#ece5db",
            "Vp": "snow_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 7500,
            "Zw": 9840,
            "Iw": 8000,
            "bk": "#fcefbb",
            "Vp": "beach_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 8000,
            "Zw": 9840,
            "Iw": 9000,
            "bk": "#2a8b9b",
            "Vp": "river_background_texture"
        },
        {
            "Ww": 160,
            "Ow": 9000,
            "Zw": 9840,
            "Iw": 9840,
            "bk": "#b38354",
            "Vp": "desert_background_texture"
        }
    ]
}
//ENDEDIT
;(function () {
  var r = {
    3950: function (n) {
      n.exports = {
        v: 1,
        M: 2,
        T: 4,
        k: 8,
        A: 16,
        B: 32
      };
    },
    7160: function (n) {
      n.exports = {
        D: 0,
        C: 1,
        U: 2
      };
    },
    3970: function (n) {
      n.exports = {
        H: 0,
        L: 1,
        S: 2,
        G: 3,
        N: 4
      };
    },
    7262: function (n) {
      n.exports = {
        J: 1,
        Y: 2,
        I: 4,
        F: 8,
        j: 16,
        O: 32,
        P: 64,
        q: 128,
        R: 256,
        V: 512,
        W: 1024,
        Z: 2048,
        K: 4096,
        X: 8192,
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
        J: 0,
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
      n.exports.an = i;
      n.exports.sn = r;
    },
    1917: function (n) {
      n.exports = {
        un: 0,
        fn: 1,
        ln: 2,
        dn: 3,
        tn: 4,
        hn: 5,
        W: 6,
        mn: 7,
        gn: 8,
        wn: 9,
        V: 10,
        pn: 11,
        _n: 12,
        vn: 13,
        bn: 14,
        yn: 15,
        Mn: 16,
        Tn: 17,
        kn: 18,
        An: 19,
        Bn: 20,
        Dn: 21,
        En: 22,
        xn: 23,
        Cn: 24,
        zn: 25,
        Un: 26,
        Hn: 27,
        Ln: 28,
        Sn: 29,
        Gn: 30,
        Nn: 31,
        Jn: 32,
        Yn: 33,
        In: 34,
        Fn: 35,
        jn: 36,
        On: 37,
        Pn: 38,
        qn: 39,
        Rn: 40,
        $: 41,
        Vn: 42,
        Qn: 43
      };
    },
    9657: function (n) {
      n.exports = {
        zn: 0,
        Hn: 1,
        Ln: 2
      };
    },
    4002: function (n) {
      n.exports = {
        J: 0,
        Wn: 1,
        Zn: 2,
        Kn: 3,
        Xn: 4,
        $n: 5,
        nt: 6,
        tt: 7,
        et: 8,
        ot: 9,
        it: 10,
        rt: 11,
        ct: 12,
        at: 13
      };
    },
    4613: function (n) {
      n.exports = {
        st: 0,
        ut: 1,
        ft: 2
      };
    },
    6410: function (n) {
      n.exports = {
        lt: 0,
        dt: 1,
        ht: 2,
        gt: 3,
        F: 4,
        wt: 5,
        V: 6,
        mn: 7,
        wn: 8,
        W: 9,
        _t: 10,
        R: 11,
        vt: 12,
        O: 13,
        vn: 14,
        bt: 15,
        yn: 16,
        yt: 17,
        Tn: 18,
        Mn: 19,
        ln: 20,
        kn: 21,
        Bn: 22,
        An: 23,
        Mt: 24,
        Dn: 25,
        j: 26,
        Tt: 27,
        kt: 28,
        En: 29,
        At: 30,
        Z: 31,
        Bt: 32,
        Dt: 33,
        Et: 34,
        xt: 35,
        Ct: 36,
        zt: 37,
        Ut: 38,
        Ht: 39,
        Lt: 40,
        St: 41,
        Gt: 42,
        Nt: 43,
        Jt: 44,
        Yt: 45,
        It: 46,
        Ft: 47,
        jt: 48,
        Un: 49,
        Ot: 50,
        On: 51,
        Pt: 52,
        qt: 53,
        Rt: 54,
        Vt: 55,
        Qt: 56,
        Wt: 57,
        Zt: 58,
        Kt: 59,
        Xt: 60,
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
        ae: 72,
        se: 73,
        ue: 74,
        fe: 75,
        le: 76,
        de: 77,
        he: 78
      };
    },
    9281: function (n) {
      n.exports = {
        me: {
          ge: 20,
          we: 35,
          pe: 25,
          _e: 26,
          ve: 9,
          be: 2,
          ye: 32,
          Me: 29,
          Te: 3,
          ke: 33,
          Ae: 31,
          Be: 6,
          De: 22,
          Ee: 19,
          xe: 8,
          Ce: 28,
          ze: 13,
          Ue: 5,
          He: 30,
          Le: 14,
          Se: 34,
          Ge: 11,
          Ne: 0,
          Je: 15,
          Ye: 24,
          Ie: 27,
          Fe: 4,
          je: 1,
          Oe: 17,
          Pe: 16,
          qe: 36,
          Re: 10,
          Ve: 37,
          Qe: 21,
          We: 23,
          Ze: 12,
          Ke: 7,
          Xe: 18
        },
        $e: {
          no: 11,
          eo: 6,
          oo: 13,
          io: 2,
          ro: 19,
          co: 18,
          ao: 10,
          so: 20,
          uo: 0,
          fo: 5,
          lo: 7,
          do: 14,
          ho: 12,
          mo: 3,
          wo: 23,
          po: 1,
          _o: 15,
          vo: 9,
          bo: 4,
          yo: 8,
          Mo: 24,
          To: 21,
          ko: 17,
          Ao: 25,
          Bo: 22,
          Do: 16
        },
        Eo: {}
      };
    },
    3255: function (n) {
      n.exports = {
        xo: 0,
        Co: 1,
        tn: 2,
        zo: 3
      };
    },
    6399: function (n) {
      n.exports = {
        P: 0,
        Uo: 1,
        zo: 2,
        tn: 3
      };
    },
    6597: function (n) {
      n.exports = {
        Ho: 0,
        Lo: 1,
        So: 2,
        fn: 3,
        Go: 4,
        No: 5,
        Jo: 6,
        Yo: 7,
        dn: 8,
        hn: 9,
        tn: 10,
        gn: 11,
        mn: 12,
        W: 13,
        V: 14,
        wn: 15,
        Io: 16,
        _n: 17,
        Fo: 17,
        Co: 18,
        xo: 19,
        jo: 20,
        zo: 21,
        Oo: 22,
        Po: 23,
        dt: 24,
        lt: 25,
        ht: 26,
        F: 27,
        qo: 28,
        Ro: 29,
        Vo: 30,
        Qo: 31,
        Wo: 32,
        Zo: 33,
        pn: 34,
        Ko: 35,
        Xo: 36,
        $o: 37,
        ni: 38,
        ti: 39,
        ei: 40,
        oi: 41,
        _t: 42,
        ii: 43,
        ri: 44,
        ci: 45,
        R: 46,
        ai: 47,
        si: 48,
        ui: 49,
        fi: 50,
        vt: 51,
        li: 52,
        di: 53,
        O: 54,
        hi: 55,
        mi: 56,
        gi: 57,
        bn: 58,
        wi: 59,
        pi: 60,
        _i: 61,
        bt: 62,
        vi: 63,
        yn: 64,
        bi: 65,
        yi: 66,
        yt: 67,
        Mi: 68,
        Ti: 69,
        Tn: 70,
        ki: 71,
        ln: 72,
        Ai: 73,
        Bi: 74,
        Di: 75,
        Ei: 76,
        xi: 77,
        Ci: 78,
        Bn: 79,
        zi: 80,
        An: 81,
        Dn: 82,
        Ui: 83,
        Mt: 84,
        Hi: 85,
        Li: 86,
        j: 87,
        Si: 88,
        Gi: 89,
        Ni: 90,
        Tt: 91,
        Ji: 92,
        Yi: 93,
        Ii: 94,
        Fi: 95,
        ji: 96,
        Oi: 97,
        Pi: 98,
        kt: 99,
        qi: 100,
        Ri: 101,
        En: 102,
        Vi: 103,
        Qi: 104,
        Wi: 105,
        Zi: 106,
        Ki: 107,
        Xi: 108,
        $i: 109,
        nr: 110,
        tr: 111,
        er: 112,
        ir: 113,
        rr: 114,
        cr: 115,
        At: 116,
        ar: 117,
        sr: 118,
        ur: 119,
        lr: 120,
        dr: 121,
        hr: 122,
        mr: 123,
        xn: 124,
        Cn: 125,
        gr: 126,
        Z: 127,
        wr: 128,
        zn: 129,
        Bt: 130,
        pr: 131,
        Dt: 132,
        _r: 133,
        Et: 134,
        vr: 135,
        Ct: 136,
        br: 137,
        zt: 138,
        yr: 139,
        Ut: 140,
        Mr: 141,
        Ht: 142,
        Tr: 143,
        xt: 144,
        kr: 145,
        Ar: 146,
        Br: 147,
        Lt: 148,
        St: 149,
        Dr: 150,
        Gt: 151,
        Nt: 152,
        Jt: 153,
        Er: 154,
        Yt: 155,
        Cr: 156,
        It: 157,
        zr: 158,
        Ft: 159,
        Ur: 160,
        jt: 161,
        Hr: 162,
        Lr: 163,
        Sr: 164,
        Gr: 165,
        Nr: 166,
        Jr: 167,
        Yr: 168,
        Un: 169,
        Ir: 170,
        Sn: 171,
        Nn: 172,
        Jn: 173,
        Yn: 174,
        Gn: 175,
        Fr: 176,
        Ln: 177,
        Hn: 178,
        In: 179,
        Fn: 180,
        jn: 181,
        Ot: 182,
        On: 183,
        jr: 184,
        Or: 185,
        Pn: 186,
        qn: 187,
        Pr: 188,
        qr: 189,
        Rr: 190,
        Vr: 191,
        Qr: 192,
        Wr: 193,
        Zr: 194,
        Kr: 195,
        Xr: 196,
        $r: 197,
        Wt: 198,
        Zt: 199,
        nc: 200,
        tc: 201,
        ec: 202,
        Rn: 203,
        oc: 204,
        ic: 205,
        rc: 206,
        cc: 207,
        $: 208,
        ac: 209,
        Qr: 210,
        Xr: 211,
        sc: 212,
        uc: 213,
        fc: 214,
        lc: 215,
        dc: 216,
        hc: 217,
        mc: 218,
        gc: 219,
        Vn: 220,
        wc: 221,
        _c: 222,
        vc: 223,
        bc: 224,
        yc: 226,
        Mc: 227,
        Tc: 228,
        kc: 229,
        Ac: 230,
        Bc: 231,
        Dc: 232,
        Ec: 233,
        xc: 234,
        Cc: 235,
        zc: 236,
        Xr: 237,
        Qr: 238,
        ae: 239,
        Uc: 240,
        se: 241,
        Hc: 242,
        ue: 243,
        Lc: 244,
        fe: 245,
        Sc: 246,
        le: 247,
        Gc: 248,
        se: 249,
        Hc: 250,
        he: 251,
        Nc: 252,
        de: 253,
        Jc: 254,
        Yc: 255,
        Ic: 256,
        Qn: 257
      };
    },
    5397: function (n) {
      n.exports = {
        Fc: 1,
        jc: 2,
        Oc: 4,
        Pc: 8,
        qc: 16,
        Rc: 32,
        Vc: 64,
        Qc: 128,
        Wc: 256
      };
    },
    3266: function (n) {
      n.exports = {
        tn: 1,
        Zc: 2,
        Kc: 3
      };
    },
    6078: function (n, e, o) {
      try {
        __MUTATEoO0 = o(9847);
        __MUTATEOQ0 = o(2677);
        __MUTATE0Q = o(2190);
        __MUTATE0 = o(2639);
        __MUTATEQo = o(3543);
      } catch (n) {}
      const i = function () {
        const e = "nickname";
        const o = "currency";
        const r = "score";
        const c = "death";
        const a = "kill";
        const s = "https://account.sploop.io:443/";
        const u = [["logged-content", "flex"]];
        const f = [["login-content", "flex"]];
        const l = {};
        const d = [{
          Xc: "wood",
          $c: 0,
          na: 10,
          ta: 30,
          ea: 20,
          oa: 20,
          ia: 0
        }, {
          Xc: "stone",
          $c: 100000,
          na: 20,
          ta: 60,
          ea: 30,
          oa: 30,
          ia: 0
        }, {
          Xc: "copper",
          $c: 900000,
          na: 30,
          ta: 100,
          ea: 40,
          oa: 40,
          ia: 100
        }, {
          Xc: "bronze",
          $c: 2100000,
          na: 40,
          ta: 150,
          ea: 60,
          oa: 60,
          ia: 200
        }, {
          Xc: "silver",
          $c: 6100000,
          na: 50,
          ta: 200,
          ea: 80,
          oa: 80,
          ia: 300
        }, {
          Xc: "gold",
          $c: 10100000,
          na: 60,
          ta: 300,
          ea: 100,
          oa: 100,
          ia: 400
        }, {
          Xc: "diamond",
          $c: 20100000,
          na: 70,
          ta: 400,
          ea: 120,
          oa: 120,
          ia: 500
        }, {
          Xc: "emerald",
          $c: 35100000,
          na: 80,
          ta: 500,
          ea: 140,
          oa: 140,
          ia: 600
        }, {
          Xc: "ruby",
          $c: 66100000,
          na: 90,
          ta: 600,
          ea: 170,
          oa: 170,
          ia: 700
        }, {
          Xc: "platinum",
          $c: 116100000,
          na: 100,
          ta: 800,
          ea: 200,
          oa: 200,
          ia: 800
        }, {
          Xc: "amber",
          $c: 196100000,
          na: 120,
          ta: 1000,
          ea: 240,
          oa: 240,
          ia: 1000
        }, {
          Xc: "mystic",
          $c: 296100000,
          na: 140,
          ta: 1200,
          ea: 280,
          oa: 280,
          ia: 1200
        }, {
          Xc: "divine",
          $c: 496100000,
          na: 160,
          ta: 1400,
          ea: 320,
          oa: 320,
          ia: 1400
        }, {
          Xc: "immortal",
          $c: 696100000,
          na: 180,
          ta: 1600,
          ea: 360,
          oa: 360,
          ia: 1600
        }, {
          Xc: "draconic",
          $c: 896100000,
          na: 200,
          ta: 1800,
          ea: 400,
          oa: 400,
          ia: 1800
        }, {
          Xc: "celestial",
          $c: 1096100000,
          na: 220,
          ta: 2000,
          ea: 440,
          oa: 440,
          ia: 2000
        }, {
          Xc: "astral",
          $c: 1296100000,
          na: 240,
          ta: 2200,
          ea: 480,
          oa: 480,
          ia: 2200
        }, {
          Xc: "radiant",
          $c: 1696100000,
          na: 260,
          ta: 2400,
          ea: 520,
          oa: 520,
          ia: 2400
        }, {
          Xc: "eternal",
          $c: 3296100000,
          na: 280,
          ta: 2600,
          ea: 560,
          oa: 560,
          ia: 2600
        }];
        const h = __MUTATEoO0.get("main-login-button");
        const m = __MUTATEoO0.get("main-sign-up-button");
        const g = __MUTATEoO0.get("login-button");
        const w = __MUTATEoO0.get("signup-button");
        const p = __MUTATEoO0.get("profile-login-button");
        const _ = __MUTATEoO0.get("profile-sign-up-button");
        const v = __MUTATEoO0.get("enter-password");
        const b = __MUTATEoO0.get("enter-new-password");
        const y = __MUTATEoO0.get("error-password");
        const M = __MUTATEoO0.get("enter-username");
        const T = __MUTATEoO0.get("error-username");
        const k = __MUTATEoO0.get("enter-mail");
        const A = __MUTATEoO0.get("error-mail");
        const B = __MUTATEoO0.get("send-email");
        const D = __MUTATEoO0.get("login");
        const E = __MUTATEoO0.get("register");
        const x = __MUTATEoO0.get("send-mail-password");
        const C = __MUTATEoO0.get("validate-new-password");
        const z = __MUTATEoO0.get("forgot-password");
        const U = __MUTATEoO0.get("logout");
        const H = __MUTATEoO0.get("change-username");
        const L = __MUTATEoO0.get("change-username-button");
        const S = __MUTATEoO0.get("account-required");
        const G = __MUTATEoO0.get("ranking-rank");
        const N = __MUTATEoO0.get("ranking-score-daily");
        const J = __MUTATEoO0.get("ranking-score-month");
        const Y = __MUTATEoO0.get("ranking-score-all");
        const I = __MUTATEoO0.get("ranking-kill-daily");
        const F = __MUTATEoO0.get("ranking-kill-month");
        const j = __MUTATEoO0.get("ranking-kill-all");
        const O = __MUTATEoO0.get("ranking-ranks-container");
        const P = __MUTATEoO0.get("ranking-rank-container");
        const q = __MUTATEoO0.get("ranking-middle-main");
        const R = __MUTATEoO0.get("ranking2-middle-main");
        const V = [G, N, J, Y, I, F, j];
        let Q = 0;
        let W = {
          ra: "",
          ca: "",
          hash: ""
        };
        function Z(n) {
          const t = d.length;
          for (let e = 0; e < t; e++) {
            if (n < d[e].$c) {
              return e - 1;
            }
          }
          return t - 1;
        }
        function K(t) {
          nn();
          R.style.display = "none";
          q.style.display = "inline-block";
          const o = JSON.parse(t);
          let i = 1;
          for (let n = o.length - 1; n >= 0; n--) {
            const t = o[n];
            const r = t[0];
            const c = t[1];
            const a = t[2];
            const s = document.createElement("div");
            s.classList.add("subcontent-bg");
            s.classList.add("table-line");
            s.innerHTML = "<div class=\"ranking-rank\"> #" + i + " </div><div class=\"ranking-name\"></div><div class=\"ranking-score\"> " + r.toLocaleString() + " </div>";
            __MUTATEoO0.get("ranking-name", s).innerText = c + "#" + a;
            O.appendChild(s);
            i++;
          }
          __MUTATEoO0.aa();
        }
        function X() {
          return i.sa[__MUTATEQo.ua(o)];
        }
        function $(t) {
          nn();
          q.style.display = "none";
          R.style.display = "inline-block";
          const o = JSON.parse(t);
          let i = 1;
          for (let n = o.length - 1; n >= 0; n--) {
            const t = o[n];
            const r = t[0];
            const c = Z(r);
            const a = t[1];
            const s = t[2];
            const u = document.createElement("div");
            u.classList.add("subcontent-bg");
            u.classList.add("table-line");
            u.innerHTML = "<div class=\"ranking-rank\"> #" + i + " </div><div class=\"ranking-badge\"><img draggable=\"false\" src=\"img/ui/rank" + c + ".png\"></div><div class=\"ranking-name\"></div><div class=\"ranking-score\"> " + r.toLocaleString() + " </div>";
            __MUTATEoO0.get("ranking-name", u).innerText = a + "#" + s;
            P.appendChild(u);
            i++;
          }
          __MUTATEoO0.aa();
        }
        function nn() {
          O.innerHTML = "";
          P.innerHTML = "";
        }
        function tn(t, e, o) {
          const r = V.length;
          for (let n = 0; n < r; n++) {
            V[n].classList.remove("dark-blue-button-2-active");
          }
          t.classList.add("dark-blue-button-2-active");
          if (e === "ranking") {
            const n = s + "rankingScore";
            __MUTATEQo.request(n, $);
          } else {
            const n = s + "leaderboards?time=" + o + "&type=" + e;
            __MUTATEQo.request(n, K);
          }
          __MUTATEoO0.fa("Getting the leaderboard...");
        }
        function en(t) {
          __MUTATEoO0.aa();
          if (t === "1") {
            __MUTATEoO0.get("password-ok").style.display = "inline-block";
          } else {
            __MUTATEoO0.get("password-nok").style.display = "inline-block";
          }
        }
        function on(t) {
          __MUTATEoO0.aa();
          if (t === "1") {
            __MUTATEoO0.get("link-sent-ok").style.display = "inline-block";
          } else {
            __MUTATEoO0.get("link-sent-nok").style.display = "inline-block";
          }
        }
        function rn() {
          if (W.ra) {
            B.value = W.ra;
          }
          __MUTATEoO0.get("link-sent-ok").style.display = "none";
          __MUTATEoO0.get("link-sent-nok").style.display = "none";
          __MUTATEoO0.get("loading-mail-box").style.display = "none";
          x.style.display = "inline-block";
        }
        function cn() {
          y.style.visibility = "hidden";
          T.style.visibility = "hidden";
          A.style.visibility = "hidden";
        }
        function an(t) {
          W.ra = t[__MUTATEQo.ua("id")];
          __MUTATEQo.setData("accMail", W.ra);
          W.ca = t[__MUTATEQo.ua("token")];
          __MUTATEQo.setData("accToken", W.ca);
          i.sa = t;
          const u = t[__MUTATEQo.ua(e)] + "#" + t[__MUTATEQo.ua("counter")];
          __MUTATEoO0.get("nickname-value").innerText = u;
          __MUTATEoO0.get("currency-value").innerText = t[__MUTATEQo.ua(o)].toLocaleString();
          const f = t[__MUTATEQo.ua(e)];
          H.value = f;
          L.style.display = "none";
          const l = __MUTATEoO0.get("profile-bg");
          for (let n = 0; n < d.length; n++) {
            l.classList.remove("profile-bg" + n);
          }
          __MUTATEoO0.get("total-score").innerText = t[__MUTATEQo.ua(r)].toLocaleString();
          __MUTATEoO0.get("total-death").innerText = t[__MUTATEQo.ua(c)].toLocaleString();
          __MUTATEoO0.get("total-kill").innerText = t[__MUTATEQo.ua(a)].toLocaleString();
          __MUTATEoO0.get("best-kill").innerText = t[__MUTATEQo.ua("bestKill")].toLocaleString();
          __MUTATEoO0.get("kill-death").innerText = (t[__MUTATEQo.ua(a)] / (t[__MUTATEQo.ua(c)] || 1)).toLocaleString();
          const h = t[__MUTATEQo.ua(r)];
          const m = Z(h);
          l.classList.add("profile-bg" + m);
          __MUTATEoO0.get("profile-rank").src = "img/ui/big-rank" + m + ".png";
          __MUTATEoO0.get("rank").src = "img/ui/rank" + m + ".png";
          if (m >= d.length - 1) {
            __MUTATEoO0.get("profile-next-rank-container").style.display = "none";
          } else {
            const n = d[m + 1];
            __MUTATEoO0.get("score-left-value").innerText = Math.floor(n.$c - h).toLocaleString();
            __MUTATEoO0.get("profile-next-rank-container").style.display = "flex";
            __MUTATEoO0.get("profile-from-rank").src = "img/ui/rank" + m + ".png";
            __MUTATEoO0.get("profile-to-rank").src = "img/ui/rank" + (m + 1) + ".png";
          }
          const g = t[__MUTATEQo.ua("bestScore")];
          let w = "";
          for (let n = 0; n < g.length; n++) {
            w += "<div class=\"subcontent-bg table-line\"><div class=\"ranking-rank\"> #" + (n + 1) + " </div><div class=\"ranking-score best-score\" id=\"best-score-value0\"> " + g[n][0].toLocaleString() + " </div></div>";
          }
          __MUTATEoO0.get("ranks-container").innerHTML = w;
        }
        function sn(n) {
          gn(n);
          const t = __MUTATEoO0.views.shop;
          t.la();
          t.da();
        }
        function un() {
          if (X() >= 100) {
            const n = s + "changename?nickname=" + H.value + "&mail=" + W.ra + "&token=" + W.ca;
            __MUTATEQo.request(n, gn);
            __MUTATEoO0.fa("Changing name...");
          }
        }
        function fn() {
          if (H.value !== i.sa[__MUTATEQo.ua(e)]) {
            L.style.display = "flex";
          } else {
            L.style.display = "none";
          }
        }
        function ln() {
          const e = __MUTATEQo.getData("accMail");
          if (e) {
            W.ra = e;
          }
          const o = __MUTATEQo.getData("accToken");
          if (o) {
            W.ca = o;
          }
          if (e && o) {
            return 1;
          } else {
            return 0;
          }
        }
        function dn() {
          if (Q !== 1) {
            Q = 1;
            for (let n = 0; n < f.length; n++) {
              const e = __MUTATEoO0.get(f[n][0]);
              e.classList.remove("fade-in");
              e.style.display = "none";
            }
            for (let n = 0; n < u.length; n++) {
              const t = u[n];
              __MUTATEoO0.get(t[0]).style.display = t[1];
            }
            setTimeout(function () {
              for (let t = 0; t < u.length; t++) {
                __MUTATEoO0.get(u[t][0]).classList.add("fade-in");
              }
            }, 50);
            __MUTATEoO0.get("profile-content").classList.remove("blur");
            __MUTATEoO0.get("shop-content").classList.remove("blur");
            mn();
          }
        }
        function hn() {
          if (Q === 0) {
            S.style.display = "flex";
          }
        }
        function mn() {
          S.style.display = "none";
        }
        function gn(t) {
          __MUTATEoO0.aa();
          if (t === "notFound") {
            A.innerText = "This account does not exist";
            A.style.visibility = "visible";
            pn();
            return;
          } else if (t === "tooMany") {
            y.innerText = "Try again in 10 minutes";
            y.style.visibility = "visible";
            pn();
            return;
          } else if (t === "wrongPassword") {
            y.innerText = "Wrong password";
            y.style.visibility = "visible";
            pn();
            return;
          } else if (t === "0" || t === "error") {
            y.innerText = "Unknown error";
            y.style.visibility = "visible";
            pn();
            return;
          } else {
            an(JSON.parse(t));
            __MUTATEoO0.ha.login.hide();
            dn();
            return;
          }
        }
        function wn() {
          Q = 0;
          for (let n = 0; n < u.length; n++) {
            const e = __MUTATEoO0.get(u[n][0]);
            e.classList.remove("fade-in");
            e.style.display = "none";
          }
          for (let n = 0; n < f.length; n++) {
            const e = f[n];
            __MUTATEoO0.get(e[0]).style.display = e[1];
          }
          setTimeout(function () {
            for (let t = 0; t < f.length; t++) {
              __MUTATEoO0.get(f[t][0]).classList.add("fade-in");
            }
          }, 50);
          __MUTATEoO0.get("profile-content").classList.add("blur");
          __MUTATEoO0.get("shop-content").classList.add("blur");
        }
        function pn() {
          i.sa = l;
          Q = 0;
          __MUTATEQo.setData("accToken", "");
          __MUTATEQo.setData("skin", "0");
          __MUTATEQo.setData("accessory", "0");
          __MUTATEQo.setData("back", "0");
          wn();
        }
        function _n() {
          const e = v.value;
          if (e.length < 4) {
            y.innerText = "The password is too short";
            y.style.visibility = "visible";
            return;
          } else {
            W.hash = __MUTATE0(e);
            return W.hash;
          }
        }
        function vn() {
          const e = M.value;
          if (e.length < 1) {
            T.innerText = "The nickname is too short";
            T.style.visibility = "visible";
            return;
          } else {
            return e;
          }
        }
        function bn() {
          let e = k.value;
          try {
            e = e.trim();
          } catch (n) {}
          if (e.indexOf("@") === -1 || e.indexOf(".") === -1 || e.length < 6) {
            A.innerText = "The Email Address is incorrect!";
            A.style.visibility = "visible";
            return;
          } else {
            W.ra = e;
            return e.toLowerCase();
          }
        }
        function yn() {
          cn();
          const n = _n();
          const t = vn();
          const e = bn();
          if (n === undefined || t === undefined || e === undefined) {
            return;
          }
          const o = s + "register?nickname=" + t + "&mail=" + e + "&hash=" + n;
          __MUTATEoO0.fa("Creating...");
          __MUTATEQo.request(o, Mn);
        }
        function Mn(t) {
          __MUTATEoO0.aa();
          cn();
          if (t === "exists") {
            A.innerText = "This mail is already taken";
            A.style.visibility = "visible";
            return;
          }
          if (t === "tooMany") {
            y.innerText = "Try again later";
            y.style.visibility = "visible";
          } else if (t === "0" || t === "error") {
            y.innerText = "Unknown error";
            y.style.visibility = "visible";
            return;
          }
          an(JSON.parse(t));
          __MUTATEoO0.ha.login.hide();
          dn();
        }
        function Tn() {
          __MUTATEoO0.aa();
        }
        function kn() {
          cn();
          const n = _n();
          const t = bn();
          if (n === undefined || t === undefined) {
            return;
          }
          const e = s + "login?mail=" + W.ra + "&hash=" + W.hash;
          __MUTATEoO0.fa("Connecting...");
          __MUTATEQo.request(e, gn, Tn);
        }
        function An(t, e) {
          cn();
          const i = s + "tokenLogin?mail=" + t + "&token=" + e;
          __MUTATEQo.request(i, gn);
        }
        function rn() {
          __MUTATEoO0.ha.login.hide();
          __MUTATEoO0.ha["forgot-password"].show();
        }
        function Bn() {
          cn();
          const e = __MUTATEoO0.ha.login;
          e.show();
          __MUTATEoO0.get("pop-title", e.ma).innerText = "LOGIN";
          w.classList.remove("login-button-active");
          g.classList.add("login-button-active");
          __MUTATEoO0.get("enter-username-title").style.display = "none";
          M.style.display = "none";
          T.style.visibility = "hidden";
          E.style.display = "none";
          D.style.display = "inline-block";
        }
        function Dn() {
          cn();
          const e = __MUTATEoO0.ha.login;
          e.show();
          __MUTATEoO0.get("pop-title", e.ma).innerText = "SIGN UP";
          g.classList.remove("login-button-active");
          w.classList.add("login-button-active");
          __MUTATEoO0.get("enter-username-title").style.display = "flex";
          M.style.display = "flex";
          D.style.display = "none";
          E.style.display = "inline-block";
        }
        x.addEventListener("click", function () {
          const n = s + "forgot?mail=" + B.value;
          __MUTATEQo.request(n, on);
          x.style.display = "none";
          __MUTATEoO0.fa("Sending...");
        });
        C.addEventListener("click", function () {
          const e = s + "restore?mail=" + __MUTATEQo.ga("mail") + "&token=" + __MUTATEQo.ga("restore") + "&hash=" + __MUTATE0(b.value);
          __MUTATEQo.request(e, en);
          __MUTATEoO0.fa("Changing your password...");
          C.style.display = "none";
        });
        return {
          wa: function () {
            h.addEventListener("click", Bn);
            m.addEventListener("click", Dn);
            g.addEventListener("click", Bn);
            w.addEventListener("click", Dn);
            p.addEventListener("click", Bn);
            _.addEventListener("click", Dn);
            z.addEventListener("click", rn);
            E.addEventListener("click", yn);
            D.addEventListener("click", kn);
            U.addEventListener("click", function () {
              pn();
              hn();
            });
            H.addEventListener("input", fn);
            L.addEventListener("click", un);
            L.style.display = "none";
            if (ln() === 1) {
              __MUTATEoO0.fa("Connecting...");
              An(W.ra, W.ca);
            } else {
              wn();
              if (__MUTATEQo.ga("mail") && __MUTATEQo.ga("restore")) {
                __MUTATEoO0.ha["new-password"].show();
              }
            }
            G.addEventListener("click", function () {
              tn(G, "ranking");
            });
            N.addEventListener("click", function () {
              tn(N, "score", "day");
            });
            J.addEventListener("click", function () {
              tn(J, "score", "month");
            });
            Y.addEventListener("click", function () {
              tn(Y, "score", "all");
            });
            I.addEventListener("click", function () {
              tn(I, "kill", "day");
            });
            F.addEventListener("click", function () {
              tn(F, "kill", "month");
            });
            j.addEventListener("click", function () {
              tn(j, "kill", "all");
            });
            const e = __MUTATEoO0.views.ranking;
            e.da = function () {
              tn(G, "ranking");
            };
            e.la = function () {
              nn();
            };
            const o = __MUTATEoO0.views.profile;
            o.da = function () {
              i.pa();
            };
            o.la = function () {
              i._a();
            };
          },
          refresh: function () {
            if (Q === 1) {
              An(W.ra, W.ca);
            }
          },
          va: function () {
            An(W.ra, W.ca);
          },
          ba: X,
          ya: function (n) {
            return i.sa[__MUTATEQo.ua(n)] || [];
          },
          Ma: function (n, t, e, o, i) {
            if (X() >= o) {
              const o = s + "cosmetic?type=" + n + "&index=" + e + "&mail=" + W.ra + "&token=" + W.ca;
              __MUTATEQo.request(o, sn);
              __MUTATEoO0.fa("Buying the " + t + " " + n + "...");
            }
          },
          Ta: function () {
            if (Q === 1) {
              return 1;
            } else {
              return 0;
            }
          },
          ka: an,
          pa: hn,
          _a: mn,
          sa: l,
          Aa: d
        };
      }();
      i.wa();
      try {
        n.exports = i;
      } catch (n) {}
    },
    7644: function () {
      var n;
      var e;
      var o = document.getElementById("main-content");
      var i = getComputedStyle(o).height;
      for (var r = ["profile", "shop", "game", "skins", "ranking"], c = 0; c < r.length; c++) {
        n = r[c];
        e = undefined;
        (e = document.getElementById("nav-" + n)).addEventListener("click", function () {
          i = getComputedStyle(o).height;
        }, {
          capture: true
        });
        e.addEventListener("click", function () {
          var e = getComputedStyle(o).height;
          o.style.height = i;
          requestAnimationFrame(function () {
            o.style.height = e;
            setTimeout(function () {
              o.style.height = "";
            }, 300);
          });
        });
      }
    },
    2677: function (n, e, o) {
      let i = null;
      let r = false;
      function c(n) {
        if (!r) {
          r = true;
          try {
            let n = o(5108);
            if (n && n.default) {
              n = n.default;
            }
            if (n && typeof n.Ba == "function") {
              i = n;
            }
          } catch (n) {}
        }
        if (i) {
          return i.Ba(n);
        } else {
          return n;
        }
      }
      const a = function () {
        const n = {};
        function t() {
          this.Da = 1;
          this.Ea = this.width / 2;
          this.xa = this.height / 2;
          this.onload = null;
          this.onerror = null;
        }
        function e() {
          this.Da = 0;
        }
        return {
          Ca: function (t, e) {
            const o = n[t];
            if (o !== undefined) {
              return o;
            } else {
              n[t] = {
                src: t,
                za: e === undefined ? {
                  Da: 0
                } : e
              };
              return n[t];
            }
          },
          Ua: function (n, o) {
            if (o === undefined || o.Da !== 2) {
              (o = new Image()).Da = 2;
              o.onload = t;
              o.onerror = e;
              o.src = c(n);
            }
            return o;
          },
          Ha: n
        };
      }();
      try {
        n.exports = a;
      } catch (n) {}
    },
    9847: function (n, e, o) {
      try {
        __MUTATEOQ0 = o(2677);
        __MUTATE0Q = o(2190);
        __MUTATEQo = o(3543);
        __MUTATEoO = o(4071);
      } catch (n) {}
      const i = function () {
        const e = 1.4;
        const o = [];
        o[0] = __MUTATEoO.cn;
        const i = o[0];
        o[1] = __MUTATEoO.an;
        const r = o[1];
        o[2] = __MUTATEoO.sn;
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
        for (let n = 0; n < c.length; n++) {
          if (!c[n]) {
            throw "error";
          }
          c[n][1] = n;
        }
        const a = [];
        a[0] = "skin";
        a[1] = "accessory";
        a[2] = "back";
        const s = function () {};
        const u = ["profile", "shop", "game", "skins", "ranking"];
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
        const d = [];
        const h = [];
        const m = l("homepage");
        const g = l("middle-wrap");
        const w = l("top-wrap-left");
        const p = l("top-wrap-right");
        const _ = l("bottom-wrap");
        const v = l("cross-promo");
        const b = l("pop-ui");
        const y = l("changelog");
        const M = l("settings");
        const T = l("policy");
        const k = l("new-changelog");
        const A = l("spectator");
        const B = l("spectator-close");
        const D = [l("middle-wrap")];
        const E = l("waiting");
        const x = l("waiting-text");
        const C = l("small-waiting");
        const z = l("small-waiting-text");
        const U = l("landscape");
        const H = l("skins-middle-main");
        const L = l("skin-description");
        const S = l("skins-category");
        const G = l("accessory-category");
        const N = l("back-category");
        const J = l("shop-skins-middle-main");
        const Y = l("shop-skin-description");
        const I = l("shop-skins-category");
        const F = l("shop-accessory-category");
        const j = l("shop-back-category");
        const O = l("shop-price");
        const P = l("shop-can-buy");
        const q = l("shop-buy");
        const R = l("shop-currency-logo");
        const V = l("change-server");
        const Q = l("do-not-change-server");
        const W = l("nickname");
        let Z;
        let K;
        let X;
        let $ = "";
        let nn = "";
        let tn = 0;
        let en = 0;
        let on = 0;
        let rn = 0;
        let cn = 0;
        let an = -1;
        function sn() {
          E.classList.add("fade-in");
        }
        function un() {
          C.classList.add("fade-in");
        }
        function fn(e) {
          const i = this;
          h[e] = this;
          this.La = "pop-" + e;
          this.ma = l(this.La);
          this.style = this.ma.style;
          this.ma.addEventListener("click", function (n) {
            n.stopPropagation();
          });
          this.hide = function () {
            b.style.display = "none";
            i.style.display = "none";
            K = undefined;
          };
          this.transition = function () {
            b.classList.add("fade-in");
            i.ma.classList.add("popup-fade-in");
          };
          this.show = function () {
            if (K === undefined) {
              K = i;
              b.classList.remove("fade-in");
              i.ma.classList.remove("popup-fade-in");
              b.style.display = "flex";
              i.style.display = "flex";
              setTimeout(i.transition, 50);
            }
          };
          l("pop-close-button", this.ma).addEventListener("click", this.hide);
        }
        function ln(e) {
          this.da = s;
          this.la = s;
          const i = this;
          d[e] = this;
          this.La = e + "-content";
          this.Sa = "nav-" + e;
          this.ma = l(this.La);
          this.style = this.ma.style;
          this.Ga = l(this.Sa);
          this.Na = l("nav-button-text", this.Ga);
          this.hide = function () {
            i.style.display = "none";
            i.Na.classList.remove("nav-button-active");
            i.Na.classList.add("nav-button-text");
            i.la();
          };
          this.transition = function () {
            i.ma.classList.add("fade-in");
          };
          this.show = function () {
            if (Z !== i) {
              if (Z) {
                Z.hide();
              }
              Z = i;
              i.ma.classList.remove("fade-in");
              i.style.display = "flex";
              i.Na.classList.remove("nav-button-text");
              i.Na.classList.add("nav-button-active");
              setTimeout(i.transition, 50);
              i.da();
            }
          };
          this.Ga.addEventListener("click", this.show);
          this.hide();
        }
        function dn() {
          let e = 0;
          let o = 0;
          e = window.innerWidth / 1270;
          o = window.innerHeight / 685;
          if (window.innerWidth > window.innerHeight * 0.9) {
            U.style.display = "none";
          } else {
            U.style.display = "flex";
          }
          const i = Math.min(1, Math.min(e, o));
          g.style.transform = "scale(" + i + ")";
          w.style.transform = "scale(" + i + ")";
          p.style.transform = "scale(" + i + ")";
          _.style.transform = "scale(" + i + ")";
          v.style.transform = "scale(" + i + ")";
          v.style.top = Math.floor(i * 70) + "px";
          const r = l("pop-ui");
          r.style.transform = "scale(" + i + ")";
          const c = Math.ceil(1 / i * 100) - 100;
          r.style.left = "-" + c / 2 + "%";
          r.style.top = "-" + c / 2 + "%";
          r.style.width = 100 + c + "%";
          r.style.height = 100 + c + "%";
        }
        function hn() {
          if (cn === 0) {
            cn = 1;
            B.style.display = "inline-block";
            for (let n of D) {
              n.style.display = "none";
            }
          } else {
            cn = 0;
            B.style.display = "none";
            for (let n of D) {
              n.style.display = "flex";
            }
          }
        }
        function mn(n, t, e) {
          return (1 - e) * n + e * t;
        }
        function gn(n) {
          n.Ja = mn(n.Ja, n.Ya, 0.1);
          n.Ia = mn(n.Ia, n.Fa, 0.1);
          n.ja = mn(n.ja, n.Oa, 0.1);
          n.Pa = mn(n.Pa, n.qa, 0.1);
        }
        function wn(t, i, r) {
          const a = l(t);
          this.Ra = new __MUTATE0Q.Va(a, i, 186, 196, gn);
          this.Ra.Ya = 0;
          this.Ra.Fa = 0;
          this.Ra.Oa = 1;
          this.Ra.qa = 1;
          const s = Math.min(o[0].length - 1, __MUTATEQo.getData("skin") || 0);
          const u = Math.min(o[1].length - 1, __MUTATEQo.getData("accessory") || 0);
          const f = Math.min(o[2].length - 1, __MUTATEQo.getData("back") || 0);
          this.Ra.Qa("img/skins/back" + f + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const d = this.Ra.Wa[0];
          this.Ra.Qa("img/skins/arm" + s + ".png", 58, 151, Math.PI / 2, e, e, 1);
          const h = this.Ra.Wa[1];
          this.Ra.Qa("img/skins/arm" + s + ".png", 128, 151, Math.PI / 2, e, -1.4, 1);
          const m = this.Ra.Wa[2];
          this.Ra.Qa("img/skins/body" + s + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const g = this.Ra.Wa[3];
          this.Ra.Qa("img/skins/accessory" + u + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const w = this.Ra.Wa[4];
          this.Za = function (n, t) {
            let i = "";
            if (n === "skin") {
              i = o[0][t][0];
              g.Ka = __MUTATEOQ0.Ca("img/skins/body" + t + ".png");
              h.Ka = __MUTATEOQ0.Ca("img/skins/arm" + t + ".png");
              m.Ka = h.Ka;
            } else if (n === "accessory") {
              i = o[1][t][0];
              w.Ka = __MUTATEOQ0.Ca("img/skins/accessory" + t + ".png");
            } else if (n === "back") {
              i = o[2][t][0];
              d.Ka = __MUTATEOQ0.Ca("img/skins/back" + t + ".png");
            }
            r.innerText = i;
            nn = i;
          };
        }
        function pn(t) {
          S.classList.remove("dark-blue-button-4-active");
          G.classList.remove("dark-blue-button-4-active");
          N.classList.remove("dark-blue-button-4-active");
          I.classList.remove("dark-blue-button-4-active");
          F.classList.remove("dark-blue-button-4-active");
          j.classList.remove("dark-blue-button-4-active");
          t.classList.add("dark-blue-button-4-active");
        }
        function _n(t, e, o) {
          t.addEventListener("click", function () {
            if (X !== undefined) {
              X.classList.remove("skin-active");
            }
            X = t;
            t.classList.add("skin-active");
            __MUTATEQo.setData(e, o);
            d.skins.skinSelector.Za(e, o);
          });
        }
        function vn(t, e, o, i) {
          t.addEventListener("click", function () {
            $ = e;
            en = o;
            tn = i;
            if (X !== undefined) {
              X.classList.remove("skin-active");
            }
            X = t;
            t.classList.add("skin-active");
            O.innerText = i;
            q.style.display = "flex";
            if (__MUTATE0O0o0oo.ba() >= i) {
              q.classList.remove("yellow-button-active");
              P.innerText = "BUY";
              P.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
              O.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
              R.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
            } else {
              q.classList.add("yellow-button-active");
              P.innerText = "NEED";
              P.style.cursor = "";
              O.style.cursor = "";
              R.style.cursor = "";
            }
            d.shop.skinSelector.Za(e, o);
          });
        }
        function bn(n, t) {
          return n[2] - t[2];
        }
        function yn(t, e, i, r) {
          if (an === t) {
            return;
          }
          an = t;
          pn(e);
          r.innerHTML = "";
          const s = a[t];
          const u = o[t].slice().sort(bn);
          const f = u.length;
          const h = __MUTATE0O0o0oo.ya(s);
          let m = document.createElement("div");
          m.classList.add("skins-line");
          let g = 0;
          let w = 0;
          for (let n = 0; n < f; n++) {
            let t = u[n];
            let e = t[2];
            let o = t[1];
            if (i === 1 && e !== 0 && h.indexOf(o) === -1) {
              continue;
            }
            if (i === 2 && (e === 0 || h.indexOf(o) !== -1)) {
              continue;
            }
            let a = document.createElement("img");
            a.Xa = s + o;
            a.draggable = "false";
            a.src = "img/ui/" + s + o + ".png";
            a.classList.add("skin");
            m.appendChild(a);
            if (i === 1) {
              _n(a, s, o);
            } else if (i === 2) {
              vn(a, s, o, e);
            }
            if (g === 0 || (g + 1) % 5 != 0 && n !== f - 1) {
              w = 1;
            } else {
              r.appendChild(m);
              m = document.createElement("div");
              m.classList.add("skins-line");
              w = 0;
            }
            g++;
          }
          if (w === 1) {
            r.appendChild(m);
          }
          const p = Math.min(u.length - 1, __MUTATEQo.getData(s) || 0);
          X = l(s + p);
          if (X) {
            X.classList.add("skin-active");
            d.skins.skinSelector.Za(s, p);
          }
        }
        function Mn(t, e, o, i) {
          const c = d.skins;
          const a = d.shop;
          c.skinSelector.Ra.Ya = t;
          c.skinSelector.Ra.Fa = e;
          c.skinSelector.Ra.Oa = o;
          c.skinSelector.Ra.qa = i;
          a.skinSelector.Ra.Ya = t;
          a.skinSelector.Ra.Fa = e;
          a.skinSelector.Ra.Oa = o;
          a.skinSelector.Ra.qa = i;
        }
        function Tn(n) {
          Mn(0, 0, 1, 1);
          X = undefined;
          an = -1;
          n.innerHTML = "";
        }
        b.addEventListener("click", function () {
          if (K !== undefined) {
            K.hide();
          }
        });
        (function () {
          l("version").innerText = 10;
          for (let n in u) {
            new ln(u[n]);
          }
          for (let n in f) {
            new fn(f[n]);
          }
          y.addEventListener("click", function () {
            __MUTATEQo.setData("gameVersion", 10);
            h.changelog.show();
            k.style.display = "none";
          });
          const e = "_atgam";
          if (!__MUTATEQo.getData(e)) {
            __MUTATEQo.setData(e, "GM" + __MUTATEQo.$a(1) + "." + __MUTATEQo.$a(4) + "." + __MUTATEQo.$a(16), ".sploop.io");
          }
          M.addEventListener("click", function () {
            h.settings.show();
          });
          T.addEventListener("click", function () {
            h.policy.show();
          });
          A.addEventListener("click", hn);
          B.addEventListener("click", hn);
          const o = d.skins;
          o.skinSelector = new wn("skin-box", "skin-selector", L);
          o.da = function () {
            const e = Number(__MUTATEQo.getData("skin")) || 0;
            o.skinSelector.Za("skin", e);
            const i = Number(__MUTATEQo.getData("accessory")) || 0;
            o.skinSelector.Za("accessory", i);
            const r = Number(__MUTATEQo.getData("back")) || 0;
            o.skinSelector.Za("back", r);
            o.skinSelector.Ra.wa();
            yn(0, S, 1, H);
          };
          o.la = function () {
            o.skinSelector.Ra.remove();
            Tn(H);
          };
          G.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            yn(1, G, 1, H);
          });
          N.addEventListener("click", function () {
            Mn(27.900000000000006, 58.80000000000001, 0.7, 0.7);
            yn(2, N, 1, H);
          });
          S.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            yn(0, S, 1, H);
          });
          const i = d.shop;
          i.skinSelector = new wn("shop-skin-box", "shop-skin-selector", Y);
          i.da = function () {
            i.skinSelector.Ra.wa();
            __MUTATE0O0o0oo.pa();
            const e = Number(__MUTATEQo.getData("skin")) || 0;
            i.skinSelector.Za("skin", e);
            const o = Number(__MUTATEQo.getData("accessory")) || 0;
            i.skinSelector.Za("accessory", o);
            const r = Number(__MUTATEQo.getData("back")) || 0;
            i.skinSelector.Za("back", r);
            q.style.display = "none";
            yn(0, I, 2, J);
          };
          i.la = function () {
            __MUTATE0O0o0oo._a();
            i.skinSelector.Ra.remove();
            Tn(J);
          };
          j.addEventListener("click", function () {
            Mn(27.900000000000006, 58.80000000000001, 0.7, 0.7);
            yn(2, j, 2, J);
          });
          F.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            yn(1, F, 2, J);
          });
          I.addEventListener("click", function () {
            Mn(0, 0, 1, 1);
            yn(0, I, 2, J);
          });
          q.addEventListener("click", function () {
            __MUTATE0O0o0oo.Ma($, nn, en, tn);
          });
          V.addEventListener("click", function () {
            const n = h["progress-loss"];
            n.hide();
            n.next();
          });
          Q.addEventListener("click", function () {
            h["progress-loss"].hide();
          });
          window.addEventListener("resize", dn, false);
          dn();
          m.style.display = "flex";
          d.game.show();
          W.addEventListener("input", function () {
            __MUTATEQo.setData("nickname", W.value);
          });
          W.value = __MUTATEQo.getData("nickname") || "";
          const r = Number(__MUTATEQo.getData("gameVersion")) || 0;
          k.style.display = r === 10 ? "none" : "flex";
        })();
        return {
          get: l,
          views: d,
          ha: h,
          fa: function (t) {
            on++;
            E.classList.remove("fade-in");
            E.style.display = "flex";
            x.innerText = t;
            setTimeout(sn, 0);
          },
          aa: function () {
            on = Math.max(0, on - 1);
            if (on <= 0) {
              E.style.display = "none";
            }
          },
          ns: function (t) {
            rn++;
            C.classList.remove("fade-in");
            C.style.display = "flex";
            z.innerText = t;
            setTimeout(un, 0);
          },
          ts: function () {
            rn = Math.max(0, rn - 1);
            if (rn <= 0) {
              C.style.display = "none";
            }
          },
          es: i.length,
          os: r.length,
          rs: c.length
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
      var a = document.getElementById("ranking-fullscreen");
      var s = document.getElementById("rank-fullscreen-close");
      var u = [document.getElementById("ranking-middle-main"), document.getElementById("ranking2-middle-main")];
      for (var f = ["profile", "shop", "game", "skins"], l = 0; l < f.length; l++) {
        e = f[l];
        document.getElementById("nav-" + e).addEventListener("click", function () {
          if (u[0].classList.contains("rank-fullscreen")) {
            h();
          }
          a.parentElement.style.display = "none";
        });
      }
      document.getElementById("nav-ranking").addEventListener("click", function () {
        a.parentElement.style.display = "flex";
      });
      var d = [];
      for (l = 0; l < u.length; l++) {
        d.push({
          parent: u[l].parentElement,
          nextSibling: u[l].nextElementSibling
        });
      }
      function h() {
        s.style.display = "none";
        a.src = "img/ui/fullscreen.png";
        for (var e = 0; e < u.length; e++) {
          var o = u[e];
          o.classList.remove("rank-fullscreen");
          var i = d[e];
          if (i.nextSibling && i.nextSibling.parentNode === i.parent) {
            i.parent.insertBefore(o, i.nextSibling);
          } else {
            i.parent.appendChild(o);
          }
        }
      }
      function m() {
        a.src = "img/ui/unfullscreen.png";
        for (var e = 0; e < u.length; e++) {
          document.body.appendChild(u[e]);
          u[e].classList.add("rank-fullscreen");
        }
        s.style.display = "flex";
      }
      s.addEventListener("click", h);
      a.onclick = function () {
        if (u[0].classList.contains("rank-fullscreen")) {
          h();
        } else {
          m();
        }
      };
      document.addEventListener("keydown", function (t) {
        if (t.key === "Escape" && u[0].classList.contains("rank-fullscreen")) {
          h();
        }
      });
      o.onmousedown = function () {
        o.classList.add("dark-blue-button-2-active");
      };
      o.onclick = function () {
        u[0].style.display = "none";
        u[1].style.display = "inline-block";
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
      for (var g = 0; g < u.length; g++) {
        u[g].classList.add("scrollbar");
      }
    },
    9082: function (n, e, o) {
      var r = "";
      var c = 0;
      var a = 0;
      for (var s = o(2072).split("\n"), u = 0; u < s.length; u++) {
        var f = s[u].trim();
        if (f) {
          if (f !== "!HTML") {
            if (f !== "!New Section") {
              if (f.indexOf("img/") !== -1 && a !== 5 && f[0] !== "i") {
                f = f.replace(/(img\/.*\.png)/, "<img class=\"tutorial-img\" src=\"$1\">");
              }
              if (a === 0) {
                a = 1;
                r += "<div class=\"tutorial-page subcontent-bg\"><h2 class=\"subcontent-title\">" + f + "</h2>";
              } else if (a === 1) {
                a = 2;
                r += "<span class=\"subcontent-title\">" + f + "</span><br>";
              } else if (a === 2) {
                a = 4;
                r += "<br><div class=\"tutorial-title-container\"><span class=\"subcontent-title tutorial-title\">" + f + "</span>";
              } else if (a === 4) {
                if (f[0] === "-") {
                  a = 3;
                  r += "</div><ul><li><b>•</b> " + f.slice(2) + "</li>";
                } else if (f[0] === "i") {
                  r += "<img class=\"tutorial-img\" src=\"" + f + "\">";
                }
              } else if (a === 3) {
                r += "<li><b>•</b> " + f.slice(2) + "</li>";
              } else if (a === 5) {
                r += f;
              }
            } else {
              r += "</div>";
              a = 0;
            }
          } else if (a === 5) {
            a = c;
          } else {
            c = a;
            a = 5;
          }
        } else if (a === 3) {
          a = 2;
          r += "</ul>";
        }
      }
      if (a === 3) {
        r += "</ul>";
      } else if (a === 4) {
        r += "</div>";
      }
      r += "</div>";
      var l = document.getElementById("tutorial-pages-container");
      if (l) {
        l.insertAdjacentHTML("beforeend", r);
      }
    },
    2190: function (r, c, a) {
      try {
        __MUTATEOQ0 = a(2677);
        __MUTATEQo = a(3543);
      } catch (n) {}
      const s = function () {
        const r = function () {};
        const c = [];
        let a;
        function s(r) {
          const s = r.Ka.za;
          if (s.Da !== 1) {
            r.Ka.za = __MUTATEOQ0.Ua(r.Ka.src, s);
            return;
          }
          const u = r.cs * s.width / 2;
          const f = r.ss * s.height / 2;
          a.save();
          a.translate(r.us, r.fs);
          a.rotate(r.ls);
          a.scale(r.ds, r.hs);
          if (r.gs !== 1) {
            a.globalAlpha = r.gs;
          }
          a.drawImage(s, -u / 2, -f / 2, u, f);
          a.restore();
        }
        function u(n, t, e, o, i, r, c) {
          this.Ka = __MUTATEOQ0.Ca(n);
          this.us = t || 0;
          this.fs = e || 0;
          this.ls = o || 0;
          this.cs = Math.abs(i) || 1;
          this.ss = Math.abs(r) || 1;
          this.ds = i > 0 ? 1 : -1;
          this.hs = r > 0 ? 1 : -1;
          this.gs = c || 1;
        }
        return {
          Va: function (n, e, o, i, f) {
            const l = this;
            if (f === undefined) {
              f = r;
            }
            this.Wa = [];
            this.Xc = e;
            this.Ja = 0;
            this.Ia = 0;
            this.ja = 1;
            this.Pa = 1;
            this.isActive = 0;
            this.wa = function () {
              n.innerHTML = "<canvas id=\"" + e + "\"></canvas>";
              l.ws = document.getElementById(e);
              l.ps = l.ws.getContext("2d");
              l.ws.width = o;
              l.ws.height = i;
              l.isActive = 1;
              c.push(l);
            };
            this.remove = function () {
              l.isActive = 0;
              c.splice(c.indexOf(l), 1);
              n.innerHTML = "";
              l.ws = undefined;
              l.ps = undefined;
            };
            this._s = function () {
              l.remove();
              l.Wa.length = 0;
            };
            this.Qa = function (n, t, e, o, i, r, c) {
              const a = new u(n, t, e, o, i, r, c);
              l.Wa.push(a);
            };
            this.vs = function () {
              if (l.isActive === 0) {
                return;
              }
              const n = a;
              a = l.ps;
              a.clearRect(0, 0, o, i);
              a.save();
              a.translate(l.Ja, l.Ia);
              a.scale(l.ja, l.Pa);
              f(l);
              const t = l.Wa.length;
              for (let n = 0; n < t; n++) {
                s(l.Wa[n]);
              }
              a.restore();
              a = n;
            };
          },
          vs: function () {
            const n = c.length;
            for (let t = 0; t < n; t++) {
              c[t].vs();
            }
          }
        };
      }();
      try {
        r.exports = s;
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
      for (var a = o.querySelectorAll("h2.subcontent-title"), s = 1; s < a.length; s++) {
        (function (t) {
          var o = document.createElement("li");
          o.textContent = a[t].textContent;
          o.classList.add("pop-close");
          o.onclick = function () {
            a[t].parentElement.scrollIntoView({
              bs: "start",
              behavior: "smooth"
            });
          };
          i.appendChild(o);
        })(s);
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
      var u = document.getElementById("acceptPolicyButton");
      if (u) {
        u.onclick = function () {
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
      const i = function () {
        let n;
        let e;
        return {
          wa: function () {
            n = o(5299);
            try {
              r = document;
              c = "script";
              a = "gamedistribution-jssdk";
              u = r.getElementsByTagName(c)[0];
              if (!r.getElementById(a)) {
                (s = r.createElement(c)).Xa = a;
                s.src = "https://api.adinplay.com/libs/aiptag/pub/LSI/lostworld.io/tag.min.js";
                u.parentNode.insertBefore(s, u);
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
                      e.ys();
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
                    e.ys();
                  },
                  AIP_REMOVE: function () {}
                });
              });
            } catch (n) {}
            var r;
            var c;
            var a;
            var s;
            var u;
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
          Ms: function () {
            n.Ts();
          },
          ks: function () {
            try {
              if (window.adplayer !== undefined) {
                startReward();
                window.aiptag.cmd.player.push(function () {
                  window.adplayer.startPreRoll();
                });
                return 1;
              } else {
                __MUTATEoo();
                return 0;
              }
            } catch (n) {
              __MUTATEoo();
              return 0;
            }
          },
          As: function (n) {
            e = n;
            e.ys();
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {}
    },
    5299: function (n, e, o) {
      try {
        __MUTATE0O0o0oo = o(6078);
        __MUTATEoO0 = o(9847);
        __MUTATEQo = o(3543);
        __MUTATEoQQ = o(1174);
        __MUTATEo = o(3840);
        __MUTATEQO = o(8582);
        __MUTATEOOOo = o(9705);
        CPMStarAds = o(5438);
      } catch (n) {}
      let r;
      function c() {
        if (n.exports.Bs === 1) {
          try {
            __MUTATEoO0.get("lostworld-io_970x250").innerHTML = "<a href=\"https://taming.io\" onclick=\"try{Widget.sendAdd('taming.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/taming92.png\"></img></a>";
            __MUTATEoO0.get("lostworld-io_300x250_1").innerHTML = "<a href=\"https://shootup.io\" onclick=\"try{Widget.sendAdd('shootup.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/shootup32.png\"></img></a>";
            __MUTATEoO0.get("lostworld-io_300x250_2").innerHTML = "<a href=\"https://webgames.io\" onclick=\"try{Widget.sendAdd('webgames.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/webgames32.png\"></img></a>";
          } catch (n) {}
        }
      }
      Date.now();
      try {
        n.exports = {};
        n.exports.Ds = function (n) {
          r.refresh();
        };
        n.exports.As = function (n) {
          r.As(n);
        };
        n.exports.Es = r;
        n.exports.Bs = 0;
        n.exports.xs = c;
        n.exports.Ts = function (t) {
          t = t || "https://api.adinplay.com/libs/aiptag/assets/adsbygoogle.js";
          __MUTATEQo.request(t, undefined, function () {
            n.exports.Bs = 1;
            c();
          });
        };
        n.exports.Cs = function () {
          adblockerPopup.openClosePopup();
        };
        n.exports.zs = function () {};
      } catch (n) {}
      (function () {
        const t = __MUTATEQo.ga("ref");
        if (t === "crazygames") {
          r = __MUTATEo;
          const n = __MUTATEoO0.get("shop-io-games");
          n[__MUTATEQo.ua("onclick")] = function () {};
          n[__MUTATEQo.ua("href")] = "https://www.crazygames.com/c/io";
        } else if (t === "gamedistribution") {
          __MUTATEoO0.get("cross-promo").style.display = "none";
          r = __MUTATEQO;
        } else if (t === "gamemonetize") {
          r = __MUTATEOOOo;
        } else {
          r = CPMStarAds;
          __MUTATEoO0.get("iogames").style.display = "none";
        }
        __MUTATEoO0.get("da-left").innerHTML = "<div id='lostworld-io_300x250_1'></div>";
        __MUTATEoO0.get("da-right").innerHTML = "<div id='lostworld-io_300x250_2'></div>";
        __MUTATEoO0.get("da-bottom").innerHTML = "<div id='lostworld-io_970x250'></div>";
        r.wa();
        r.Ms();
      })();
    },
    5438: function (n, e, o) {
      const i = function () {
        let n;
        let e;
        let i;
        return {
          wa: function () {
            n = o(5299);
            i = o(3543);
            try {
              (function () {
                var e = i.ua("824_52651_gameapi");
                var o = i.ua("cpmstarx");
                var r = window[o] = window[o] || {};
                var c = Math.round(Math.random() * 999999);
                var s = document.createElement("script");
                s[i.ua("type")] = "text/javascript";
                s[i.ua("async")] = true;
                s[i.ua("onerror")] = function () {
                  var o = function (n) {
                    if (n && typeof n == "object" && a[i.ua("fail")]) {
                      a[i.ua("fail")]();
                    }
                  };
                  if (r && Array.isArray(r[i.ua("cmd")]) && r[i.ua("cmd")].forEach(o)) {
                    r[i.ua("cmd")].length = 0;
                  }
                  cpmstarAPI = window[i.ua("_" + e)] = o;
                };
                var u = document.location[i.ua("protocol")];
                var f = u == "https:" || u == "file:" ? "https://server" : "//cdn";
                if (window.location[i.ua("hash")] == "#cpmstarDev") {
                  f = "//dev.server";
                }
                if (window.location[i.ua("hash")] == "#cpmstarStaging") {
                  f = "//staging.server";
                }
                s.src = f + ".cpmstar.com/cached/zonefiles/" + e + ".js?rnd=" + c;
                var l = document.getElementsByTagName("script")[0];
                l.parentNode.insertBefore(s, l);
                cpmstarAPI = function (t) {
                  (r[i.ua("cmd")] = r[i.ua("cmd")] || []).push(t);
                };
                cpmstarAPI;
              })();
              const n = document.createElement("script");
              n.setAttribute("src", "https://ssl.cdne.cpmstar.com/cached/js/lib.js");
              document.head.appendChild(n);
              (function () {
                var t = window;
                var o = 86200;
                document.getElementById("lostworld-io_300x250_1").classList.add("div-" + o);
                var r = i.ua("cpmstarx");
                var c = t.document.getElementsByClassName("div-" + o);
                var a = c.length - 1;
                var s = c[a];
                const u = {
                  [i.ua("kind")]: "asynctagfetch",
                  [i.ua("el")]: s,
                  [i.ua("pid")]: o,
                  [i.ua("pindex")]: a
                };
                t[r] = t[r] || {};
                (t[r][i.ua("libcmd")] = t[r][i.ua("libcmd")] || []).push(u);
              })();
              (function () {
                var t = window;
                var o = 86185;
                document.getElementById("lostworld-io_300x250_2").classList.add("div-" + o);
                var r = i.ua("cpmstarx");
                var c = t.document.getElementsByClassName("div-" + o);
                var a = c.length - 1;
                var s = c[a];
                const u = {
                  [i.ua("kind")]: "asynctagfetch",
                  [i.ua("el")]: s,
                  [i.ua("pid")]: o,
                  [i.ua("pindex")]: a
                };
                t[r] = t[r] || {};
                (t[r][i.ua("libcmd")] = t[r][i.ua("libcmd")] || []).push(u);
              })();
              (function () {
                var t = window;
                var o = 86183;
                document.getElementById("lostworld-io_970x250").classList.add("div-" + o);
                var r = i.ua("cpmstarx");
                var c = t.document.getElementsByClassName("div-" + o);
                var a = c.length - 1;
                var s = c[a];
                const u = {
                  [i.ua("kind")]: "asynctagfetch",
                  [i.ua("el")]: s,
                  [i.ua("pid")]: o,
                  [i.ua("pindex")]: a
                };
                t[r] = t[r] || {};
                (t[r][i.ua("libcmd")] = t[r][i.ua("libcmd")] || []).push(u);
              })();
            } catch (n) {}
          },
          refresh: function () {
            try {
              const t = {
                [i.ua("kind")]: "adcmd",
                [i.ua("command")]: "refresh",
                [i.ua("module")]: "POOL 86183"
              };
              cpmstarAPI(t);
              const e = {
                [i.ua("kind")]: "adcmd",
                [i.ua("command")]: "refresh",
                [i.ua("module")]: "POOL 86185"
              };
              cpmstarAPI(e);
              const o = {
                [i.ua("kind")]: "adcmd",
                [i.ua("command")]: "refresh",
                [i.ua("module")]: "POOL 86200"
              };
              cpmstarAPI(o);
            } catch (n) {}
          },
          Ms: function () {
            n.Ts();
          },
          ks: function () {
            try {
              __MUTATEoo();
              return 0;
            } catch (n) {
              __MUTATEoo();
              return 0;
            }
          },
          As: function (n) {
            e = n;
            e.ys();
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {}
    },
    3840: function (n, e, o) {
      const r = function () {
        let n;
        let e;
        let i;
        let r;
        function c() {
          if (window.CrazyGames) {
            n = window[i.ua("CrazyGames")][i.ua("CrazySDK")][i.ua("getInstance")]();
            n[i.ua("init")]();
            n.addEventListener("adStarted", function () {});
            n.addEventListener("adFinished", function () {
              r.ys();
            });
            n.addEventListener("adError", function () {
              r.ys();
            });
            n.addEventListener("bannerRendered", function (n) {});
            n.addEventListener("bannerError", function (n) {});
            a();
          } else {
            setTimeout(c, 100);
          }
        }
        function a() {
          try {
            if (e.Bs === 0) {
              const t = {
                [i.ua("containerId")]: "lostworld-io_300x250_2",
                [i.ua("size")]: "300x250"
              };
              const e = {
                [i.ua("containerId")]: "lostworld-io_970x250",
                [i.ua("size")]: "728x90"
              };
              n[i.ua("requestBanner")]([t, e]);
            }
          } catch (n) {}
        }
        let s = 0;
        return {
          wa: function () {
            e = o(5299);
            i = o(3543);
            try {
              r = document;
              a = "script";
              s = "crazygames-sdk";
              f = r.getElementsByTagName(a)[0];
              if (!r.getElementById(s)) {
                (u = r.createElement(a)).Xa = s;
                u.src = "https://sdk.crazygames.com/crazygames-sdk-v1.js";
                f.parentNode.insertBefore(u, f);
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
            var a;
            var s;
            var u;
            var f;
          },
          refresh: a,
          Ms: function () {
            e.Ts("https://images.crazygames.com/crazygames-sdk/300x250.png");
          },
          ks: function () {
            try {
              n[i.ua("requestAd")]("rewarded");
              return 1;
            } catch (n) {
              __MUTATEoo();
              return 0;
            }
          },
          As: function (o) {
            r = o;
            const a = Date.now();
            if (a - s > 60000 && e.Bs === 0) {
              s = a;
              n[i.ua("requestAd")]("midgame");
            } else {
              r.ys();
            }
          }
        };
      }();
      try {
        n.exports = r;
      } catch (n) {}
    },
    8582: function (n, e, o) {
      const i = function () {
        let n;
        let e;
        let i;
        let r = 0;
        return {
          wa: function () {
            n = o(5299);
            e = o(3543);
            try {
              window[e.ua("GD_OPTIONS")] = {};
              const n = window[e.ua("GD_OPTIONS")];
              n[e.ua("gameId")] = "f5f7201758da41ceb7437a19b243de05";
              n[e.ua("onEvent")] = function (n) {
                switch (n[e.ua("name")]) {
                  case "SDK_READY":
                    if (r === 0) {
                      r = 1;
                      const n = {
                        [e.ua("containerId")]: "lostworld-io_300x250_1"
                      };
                      window[e.ua("gdsdk")][e.ua("showAd")](window[e.ua("gdsdk")][e.ua("AdType")][e.ua("Display")], n);
                      const t = {
                        [e.ua("containerId")]: "lostworld-io_300x250_2"
                      };
                      window[e.ua("gdsdk")][e.ua("showAd")](window[e.ua("gdsdk")][e.ua("AdType")][e.ua("Display")], t);
                      const i = {
                        [e.ua("containerId")]: "lostworld-io_970x250"
                      };
                      window[e.ua("gdsdk")][e.ua("showAd")](window[e.ua("gdsdk")][e.ua("AdType")][e.ua("Display")], i);
                    }
                    break;
                  case "AD_ERROR":
                  case "SDK_GAME_START":
                    i.ys();
                }
              };
              a = document;
              s = "script";
              u = "gamedistribution-jssdk";
              l = a.getElementsByTagName(s)[0];
              if (!a.getElementById(u)) {
                (f = a.createElement(s)).Xa = u;
                f.src = "https://html5.api.gamedistribution.com/main.min.js";
                l.parentNode.insertBefore(f, l);
              }
            } catch (n) {}
            var a;
            var s;
            var u;
            var f;
            var l;
          },
          refresh: function () {},
          Ms: function () {
            e.request("https://tracker.gamedock.io/v1/events-tracker/track/gd/event/pageview", function () {
              n.Bs = 0;
            }, function (t) {
              if (t.status === 405) {
                n.Bs = 0;
              } else {
                n.Bs = 1;
                n.xs();
              }
            });
          },
          ks: function () {
            try {
              if (window[e.ua("gdsdk")] !== undefined && window[e.ua("gdsdk")][e.ua("showAd")] !== undefined && n.Bs === 0) {
                n.zs();
                window[e.ua("gdsdk")][e.ua("showAd")]("rewarded");
                return 1;
              } else {
                n.Cs();
                return 0;
              }
            } catch (t) {
              n.Cs();
              return 0;
            }
          },
          As: function (o) {
            i = o;
            if (window[e.ua("gdsdk")] !== undefined && window[e.ua("gdsdk")][e.ua("showAd")] !== undefined && n.Bs === 0) {
              window[e.ua("gdsdk")][e.ua("showAd")]();
            } else {
              i.ys();
            }
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {}
    },
    9705: function (n, e, o) {
      const i = function () {
        let n;
        let e;
        let i;
        let r = 0;
        return {
          wa: function () {
            n = o(5299);
            e = o(3543);
            try {
              window[e.ua("SDK_OPTIONS")] = {};
              window[e.ua("SDK_OPTIONS")][e.ua("gameId")] = "00b2pc8ju437t9b85uea23lhsmojbk2c";
              window[e.ua("SDK_OPTIONS")][e.ua("onEvent")] = function (n) {
                switch (n[e.ua("name")]) {
                  case "SDK_READY":
                    if (r === 0) {
                      r = 1;
                    }
                    break;
                  case "AD_ERROR":
                  case "SDK_GAME_START":
                    i.ys();
                }
              };
              a = document;
              s = "script";
              u = "gamemonetize-sdk";
              f = a.getElementsByTagName(s)[0];
              if (!a.getElementById(u)) {
                (a = a.createElement(s)).Xa = u;
                a.src = "https://api.gamemonetize.com/sdk.js";
                f.parentNode.insertBefore(a, f);
              }
              const t = n.Bs;
              n.Bs = 1;
              n.xs();
              n.Bs = t;
            } catch (n) {}
            var a;
            var s;
            var u;
            var f;
          },
          refresh: function () {},
          Ms: function () {
            e.request("https://tracker.gamedock.io/v1/events-tracker/track/gd/event/pageview", function () {
              n.Bs = 0;
            }, function (t) {
              if (t.status === 405) {
                n.Bs = 0;
              } else {
                n.Bs = 1;
                n.xs();
              }
            });
          },
          ks: function () {
            try {
              if (window[e.ua("sdk")] !== undefined && window[e.ua("sdk")][e.ua("showBanner")] !== undefined && n.Bs === 0) {
                n.zs();
                window[e.ua("sdk")][e.ua("showBanner")]();
                return 1;
              } else {
                n.Cs();
                return 0;
              }
            } catch (t) {
              n.Cs();
              return 0;
            }
          },
          As: function (o) {
            i = o;
            if (window[e.ua("sdk")] !== undefined && window[e.ua("sdk")][e.ua("showBanner")] !== undefined && n.Bs === 0) {
              window[e.ua("sdk")][e.ua("showBanner")]();
            } else {
              i.ys();
            }
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {}
    },
    48: function (n, t, e) {
      const o = e(5397);
      n.exports = function () {
        this.Us = o.jc;
      };
    },
    8557: function (n, e, o) {
      "use strict";

      o.r(e);
      o.d(e, {
        Hs: function () {
          return xe;
        },
        Ls: function () {
          return ti;
        },
        Ss: function () {
          return _i;
        },
        Gs: function () {
          return $e;
        },
        Ns: function () {
          return oc;
        },
        Js: function () {
          return Tr;
        },
        Ys: function () {
          return Ar;
        },
        Is: function () {
          return kr;
        },
        Fs: function () {
          return pi;
        },
        js: function () {
          return co;
        },
        Os: function () {
          return go;
        },
        canvas: function () {
          return Ze;
        },
        Ps: function () {
          return $r;
        },
        qs: function () {
          return Hi;
        },
        Rs: function () {
          return No;
        },
        Vs: function () {
          return zi;
        },
        Qs: function () {
          return so;
        },
        Ws: function () {
          return Ao;
        },
        Zs: function () {
          return Ei;
        },
        Ks: function () {
          return Yo;
        },
        Xs: function () {
          return yi;
        },
        $s: function () {
          return Ui;
        },
        nu: function () {
          return Do;
        },
        tu: function () {
          return Mi;
        },
        connect: function () {
          return hr;
        },
        eu: function () {
          return Uo;
        },
        ou: function () {
          return xi;
        },
        iu: function () {
          return Ci;
        },
        ru: function () {
          return ki;
        },
        cu: function () {
          return Ke;
        },
        au: function () {
          return Pi;
        },
        su: function () {
          return ji;
        },
        uu: function () {
          return Oi;
        },
        default: function () {
          return Gr;
        },
        fu: function () {
          return Jr;
        },
        lu: function () {
          return Ur;
        },
        du: function () {
          return Nr;
        },
        hu: function () {
          return Sr;
        },
        mu: function () {
          return ko;
        },
        gu: function () {
          return zr;
        },
        wu: function () {
          return Lr;
        },
        pu: function () {
          return Ir;
        },
        _u: function () {
          return ur;
        },
        vu: function () {
          return Bi;
        },
        bu: function () {
          return _r;
        },
        yu: function () {
          return Vi;
        },
        Mu: function () {
          return Fr;
        },
        Tu: function () {
          return Ki;
        },
        ku: function () {
          return Li;
        },
        Au: function () {
          return Di;
        },
        Bu: function () {
          return Jo;
        },
        Du: function () {
          return Xe;
        },
        wa: function () {
          return vr;
        },
        Eu: function () {
          return Xi;
        },
        xu: function () {
          return yr;
        },
        Cu: function () {
          return Vr;
        },
        zu: function () {
          return vo;
        },
        Uu: function () {
          return Co;
        },
        Hu: function () {
          return xo;
        },
        Lu: function () {
          return oo;
        },
        Su: function () {
          return uo;
        },
        Gu: function () {
          return Hr;
        },
        Nu: function () {
          return lr;
        },
        Ju: function () {
          return dr;
        },
        Yu: function () {
          return vi;
        },
        Iu: function () {
          return zo;
        },
        Fu: function () {
          return Go;
        },
        ju: function () {
          return lo;
        },
        Ou: function () {
          return Ai;
        },
        Pu: function () {
          return Ti;
        },
        qu: function () {
          return Lo;
        },
        Ru: function () {
          return So;
        },
        Vu: function () {
          return ho;
        },
        Qu: function () {
          return or;
        },
        Wu: function () {
          return ir;
        },
        Zu: function () {
          return rr;
        },
        Ku: function () {
          return bo;
        },
        Xu: function () {
          return yo;
        },
        ys: function () {
          return Xr;
        },
        $u: function () {
          return fo;
        },
        nf: function () {
          return pc;
        },
        tf: function () {
          return Bc;
        },
        ef: function () {
          return lc;
        },
        if: function () {
          return Uc;
        },
        rf: function () {
          return cc;
        },
        cf: function () {
          return Tc;
        },
        af: function () {
          return Qr;
        },
        sf: function () {
          return gc;
        },
        uf: function () {
          return wc;
        },
        ff: function () {
          return Rr;
        },
        lf: function () {
          return ac;
        },
        df: function () {
          return fc;
        },
        hf: function () {
          return Lc;
        },
        mf: function () {
          return ic;
        },
        gf: function () {
          return rc;
        },
        wf: function () {
          return tc;
        },
        pf: function () {
          return Zr;
        },
        _f: function () {
          return Hc;
        },
        vf: function () {
          return yc;
        },
        bf: function () {
          return Wr;
        },
        yf: function () {
          return xc;
        },
        Mf: function () {
          return vc;
        },
        Tf: function () {
          return hc;
        },
        kf: function () {
          return uc;
        },
        Af: function () {
          return Pr;
        },
        Bf: function () {
          return ec;
        },
        Df: function () {
          return qr;
        },
        Ef: function () {
          return mc;
        },
        xf: function () {
          return nc;
        },
        Cf: function () {
          return kc;
        },
        zf: function () {
          return Kr;
        },
        Uf: function () {
          return _c;
        },
        Hf: function () {
          return Ac;
        },
        Lf: function () {
          return dc;
        },
        Sf: function () {
          return sc;
        },
        Gf: function () {
          return Mc;
        },
        Nf: function () {
          return Cc;
        },
        Jf: function () {
          return zc;
        },
        Yf: function () {
          return Ec;
        },
        If: function () {
          return Dc;
        },
        Ff: function () {
          return nr;
        },
        jf: function () {
          return Ni;
        },
        Of: function () {
          return _o;
        },
        Pf: function () {
          return Si;
        },
        qf: function () {
          return ao;
        },
        Rf: function () {
          return Bo;
        },
        Vf: function () {
          return Ho;
        },
        Qf: function () {
          return bc;
        },
        Wf: function () {
          return mr;
        },
        Zf: function () {
          return Yr;
        },
        Kf: function () {
          return Mr;
        },
        resize: function () {
          return pr;
        },
        scale: function () {
          return eo;
        },
        Xf: function () {
          return Yi;
        },
        $f: function () {
          return Mo;
        },
        nl: function () {
          return To;
        },
        tl: function () {
          return Ji;
        },
        el: function () {
          return Fi;
        },
        ol: function () {
          return Ii;
        },
        il: function () {
          return Sc;
        },
        rl: function () {
          return $c;
        },
        cl: function () {
          return Fc;
        },
        al: function () {
          return Kc;
        },
        sl: function () {
          return na;
        },
        ul: function () {
          return oa;
        },
        fl: function () {
          return Nc;
        },
        ll: function () {
          return Wc;
        },
        dl: function () {
          return Vc;
        },
        hl: function () {
          return Qc;
        },
        ml: function () {
          return Zc;
        },
        gl: function () {
          return Jc;
        },
        wl: function () {
          return Yc;
        },
        pl: function () {
          return Rc;
        },
        _l: function () {
          return Ic;
        },
        vl: function () {
          return jc;
        },
        bl: function () {
          return ea;
        },
        yl: function () {
          return ta;
        },
        Ml: function () {
          return Xc;
        },
        Tl: function () {
          return ia;
        },
        kl: function () {
          return Pc;
        },
        Al: function () {
          return Oc;
        },
        Bl: function () {
          return qc;
        },
        Dl: function () {
          return Gc;
        },
        El: function () {
          return mo;
        },
        xl: function () {
          return bi;
        },
        Cl: function () {
          return wr;
        },
        zl: function () {
          return gr;
        },
        Ul: function () {
          return ni;
        },
        Hl: function () {
          return Ko;
        },
        Ll: function () {
          return Oo;
        },
        Sl: function () {
          return wi;
        },
        Gl: function () {
          return Qo;
        },
        Nl: function () {
          return Po;
        },
        Jl: function () {
          return Vo;
        },
        Yl: function () {
          return $o;
        },
        Il: function () {
          return Zo;
        },
        Fl: function () {
          return Xo;
        },
        jl: function () {
          return Wo;
        },
        Ol: function () {
          return qo;
        },
        Pl: function () {
          return Ro;
        },
        ql: function () {
          return Eo;
        },
        Rl: function () {
          return wo;
        },
        Vl: function () {
          return po;
        },
        Ql: function () {
          return ro;
        },
        Wl: function () {
          return Qi;
        },
        Zl: function () {
          return jo;
        },
        Kl: function () {
          return Wi;
        },
        Xl: function () {
          return Fo;
        },
        $l: function () {
          return fr;
        },
        nd: function () {
          return Zi;
        },
        td: function () {
          return Er;
        },
        ed: function () {
          return Io;
        },
        od: function () {
          return to;
        },
        rd: function () {
          return cr;
        },
        ad: function () {
          return sr;
        },
        sd: function () {
          return ar;
        },
        Za: function () {
          return br;
        },
        ud: function () {
          return Cr;
        },
        fd: function () {
          return Ri;
        },
        ld: function () {
          return er;
        },
        dd: function () {
          return xr;
        },
        hd: function () {
          return Gi;
        },
        md: function () {
          return no;
        },
        gd: function () {
          return io;
        }
      });
      var r = o(7251);
      var c = o.n(r);
      var a = o(1917);
      var s = o.n(a);
      var u = o(3255);
      var f = o.n(u);
      var l = o(5397);
      var d = o.n(l);
      var h = o(3555);
      var m = o.n(h);
      var g = o(48);
      var w = o.n(g);
      let p = new Map();
      let _ = [];
      let v = [];
      function b() {
        p = new Map();
        _ = [];
        let n = _;
        for (let t in s()) {
          n[s()[t]] = [];
        }
        let t = v;
        for (let n in s()) {
          t[s()[n]] = [];
        }
      }
      function y(n, e, o) {
        const r = (n.wd | n.pd << 8) * e;
        const c = n._d | n.vd << 8;
        n.bd += Math.cos(n.yd) * r;
        n.Md += Math.sin(n.yd) * r;
        n.range += r;
        if (n.range >= c) {
          n.range -= c;
          n.bd -= n.range * Math.cos(n.yd);
          n.Md -= n.range * Math.sin(n.yd);
          n.active = false;
        }
      }
      function M(n, e, o) {
        n.Td += e * 1000;
        const r = Math.min(1.71, n.Td / 171);
        n.bd = n.kd + (n.Ad - n.kd) * r;
        n.Md = n.Bd + (n.Dd - n.Bd) * r;
        if (n.Xa !== Bo && o <= n.Ed && o >= n.xd) {
          let t = n.Ed - n.xd;
          let e = (o - n.xd) / t;
          n.yd = m().Cd(n.zd, n.Ud, e);
        }
      }
      function T(n, e) {
        let i = _[s().un];
        let r = i.length;
        const a = e - 1000 / c().Hd;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().bn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().jn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().zn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().Cn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().Sn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().Ln];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().Hn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().xn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s().Qn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          M(i[t], n, a);
        }
        i = _[s()._n];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n);
        }
        i = _[s().kn];
        r = i.length;
        for (let n = 0; n < r; n++) {
          (u = i[n]).yd = u.Ud;
        }
        var u;
      }
      function k(n) {
        if (v[n].length > 0) {
          let t = v[n].pop();
          t.Us = d().jc;
          return t;
        }
        return new (w())();
      }
      function A(n, t, e, o, i, r, c, a, s, u, f, l, h, m, g, w, _) {
        let v = p.get(t) || k(n);
        if (v.Us & d().jc) {
          E(v, n, t, e, o, i, r, c, a, s, u, f, l, h, m, g, w, _);
          B(v);
          return;
        }
        v.Ld = e;
        v.kd = v.bd;
        v.Bd = v.Md;
        v.Ad = i;
        v.Dd = r;
        v.Us = o;
        v.zd = v.Ud;
        v.Ud = c;
        v.wd = a;
        v.pd = s;
        v._d = u;
        v.vd = f;
        v.Sd = l;
        v.Gd = h;
        v.Nd = m;
        v.Jd = g;
        v.Yd = w;
        v.xd = v.Ed;
        v.Ed = _;
        v.Td = 0;
      }
      function B(n) {
        const o = _[n.type];
        const i = o.length;
        o[i] = n;
        n.Id = i;
        if (!p.has(n.Xa)) {
          p.set(n.Xa, n);
        }
      }
      function D(n, e) {
        let i = p.get(n);
        if (!i) {
          return;
        }
        p.delete(n);
        const r = _[i.type];
        const c = i.Id;
        const a = r.length - 1;
        if (a !== c) {
          const n = r[a];
          r[a] = r[c];
          r[c] = n;
          n.Id = c;
        }
        v[i.type].push(i);
        r.pop();
      }
      function E(n, e, o, i, r, c, a, u, l, d, h, g, w, p, _, v, b, y) {
        n.type = e;
        n.Xa = o;
        n.Ld = i;
        n.bd = n.kd = n.Ad = c;
        n.Md = n.Bd = n.Dd = a;
        n.yd = n.zd = n.Ud = u;
        n.Us = r;
        n.wd = l;
        n.pd = d;
        n._d = h;
        n.vd = g;
        n.Sd = w;
        n.Gd = p;
        n.Nd = _;
        n.Jd = v;
        n.Yd = b;
        n.Fd = new (m().jd)(1, 0, 1, 0, 1, 1);
        n.Od = Date.now();
        n.xd = 0;
        n.Ed = y;
        n.Td = 0;
        n.Pd = null;
        n.qd = false;
        switch (e) {
          case s().un:
            break;
          case s().kn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().zo, f().xo]
            };
            break;
          case s().bn:
          case s().zn:
          case s().Cn:
          case s().Sn:
          case s().Hn:
          case s().Ln:
          case s().xn:
          case s().Qn:
            break;
          case s().fn:
          case s().In:
          case s().Fn:
          case s().Nn:
          case s().Jn:
          case s().Yn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().zo]
            };
            break;
          case s().dn:
          case s().hn:
          case s().Pn:
          case s().An:
          case s().Bn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().Co]
            };
            break;
          case s().Dn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().zo]
            };
            break;
          case s().pn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().xo]
            };
            break;
          case s().tn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().tn]
            };
            break;
          case s().Rn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().Rn]
            };
            break;
          case s().vn:
            n.Qd = Math.PI / 4;
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().tn, f().xo]
            };
            break;
          case s().qn:
            n.Qd = Math.PI / 4;
            break;
          case s().Mn:
            n.Qd = Math.PI / 2;
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().tn, f().xo]
            };
            break;
          case s().W:
          case s().gn:
          case s().On:
          case s().Gn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().xo]
            };
            break;
          case s().En:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().zo]
            };
            break;
          case s().yn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().xo]
            };
            break;
          case s().V:
          case s().$:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().zo]
            };
            break;
          case s().wn:
          case s().Un:
          case s().mn:
          case s().ln:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().xo]
            };
            break;
          case s().Vn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().Wd]
            };
            break;
          case s().Tn:
            n.Pd = {
              active: false,
              Rd: 0,
              Vd: [f().xo]
            };
            break;
          case s()._n:
            n.active = true;
            n.range = 0;
        }
      }
      b();
      let x = false;
      try {
        x = window.localStorage && true;
      } catch (n) {}
      if (!x) {
        Object.defineProperty(window, "localStorage", {
          value: {
            Zd: {},
            setItem: function (n, t) {
              return this.Zd[n] = t + "";
            },
            getItem: function (n) {
              if (this.Zd.hasOwnProperty(n)) {
                return this.Zd[n];
              } else {
                return undefined;
              }
            },
            removeItem: function (n) {
              return delete this.Zd[n];
            },
            clear: function () {
              return this.Zd = {};
            }
          }
        });
      }
      let C = function n(e, o, i) {
        function r(n) {
          T = n;
          k = true;
          return function () {
            while (k) {
              var n = s();
              p[n]();
            }
            return M[0];
          }();
        }
        function c() {
          return e[T++] | e[T++] << 8 | e[T++] << 16 | e[T++] << 24;
        }
        function a() {
          let n = e[T++];
          if (n & 128) {
            return n & 127;
          } else {
            return n & 127 | e[T++] << 7;
          }
        }
        function s() {
          return e[T++];
        }
        function u(n, t) {
          M[n] = t;
        }
        function f(n) {
          var t;
          var e;
          var o;
          t = [];
          e = 0;
          for (; e < n; e++) {
            o = y[i[6]]();
            t[n - e - 1] = o;
          }
          return t;
        }
        const l = [];
        let d = 0;
        if (i) {
          for (let n = 0; n < 5; n++) {
            i.push(i.shift());
          }
        }
        var h = e ? n : function () {};
        var m = function (n) {
          return typeof n == "object";
        };
        var g = m(globalThis) ? globalThis : m(window) ? window : self;
        var w = [];
        var p = [function () {
          u(s(), function (n) {
            var t = b;
            let e = function () {
              var e;
              var c;
              var a;
              var s;
              var f;
              var l;
              var d;
              var h;
              var m;
              var g;
              var w;
              var p;
              var _;
              var v;
              var B = M;
              M = [];
              u(0, undefined);
              u(1, arguments);
              e = o[n];
              c = b;
              a = e[2];
              s = e[3];
              b = [];
              f = 0;
              for (; f < a; f++) {
                b[f] = {
                  Kd: undefined
                };
              }
              for (l = 0; l < s[i[0]]; l += 2) {
                d = s[l + 0];
                h = s[l + 1];
                b[d] = t[h];
              }
              m = y;
              y = [];
              g = A;
              A = this;
              _ = T;
              v = e[4];
              try {
                w = r(v);
              } catch (n) {
                p = n;
              }
              y = m;
              A = g;
              T = _;
              b = c;
              M = B;
              k = true;
              if (p) {
                throw p;
              }
              return w;
            };
            l[d++] = e;
            return e;
          }(e[T++] | e[T++] << 8));
        }, function () {
          var n = c();
          var t = s();
          b[n].Kd = M[t];
        }, function () {
          var n = s();
          var t = a();
          u(n, w[t]);
        }, function () {
          var n = s();
          y.push(M[n]);
        }, function () {
          u(s(), s());
        }, function () {
          u(s(), f(a()));
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          var o = f(s());
          u(n, (t = M[t])[M[e]][i[10]](t, o));
        }, function () {
          var n = s();
          var t = w[c()];
          (function (n) {
            if (!(n in g)) {
              throw new ReferenceError(n + " is not defined");
            }
          })(t);
          u(n, g[t]);
        }, function () {
          u(s(), c());
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] * M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] + M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = f(s());
          u(n, M[t][i[10]](g, e));
        }, function () {
          var n = s();
          var t = c();
          u(n, b[t].Kd);
        }, function () {
          var n = s();
          for (var t = f(a()), e = {}, o = 0; o < t[i[0]]; o += 3) {
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
          u(n, e);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t][M[e]]);
        }, function () {
          u(s(), !M[s()]);
        }, function () {
          var n = s();
          var t = s();
          u(n, M[t]);
        }, function () {
          var n = c();
          var t = s();
          if (!M[t]) {
            T = n;
          }
        }, function () {
          var n = s();
          var t = c();
          let e = c();
          u(n, RegExp(w[t], w[e]));
        }, function () {
          u(s(), typeof M[s()]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] !== M[e]);
        }, function () {
          var n = c();
          T = n;
        }, function () {
          var n = s();
          var t = M[s()];
          var e = M[s()];
          var o = M[s()];
          u(n, t[e] = o);
        }, function () {
          k = false;
        }, function () {
          u(s(), !!s());
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] < M[e]);
        }, function () {
          var n = s();
          var t = c();
          u(n, s() ? ++b[t].Kd : b[t].Kd++);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] ^ M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] >>> M[e]);
        }, function () {
          u(s(), (v[0] = e[T++], v[1] = e[T++], v[2] = e[T++], v[3] = e[T++], v[4] = e[T++], v[5] = e[T++], v[6] = e[T++], v[7] = e[T++], _[0]));
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] & M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] > M[e]);
        }, function () {
          var e;
          var o;
          var r;
          u(s(), (e = M[s()], o = f(s()), r = [null], Array[i[11]].push[i[10]](r, o), new (Function[i[11]].bind[i[10]](e, r))()));
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] % M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] << M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] - M[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, M[t] === M[e]);
        }, function () {
          for (var e = s() | s() << 8, o = "", i = 0; i < e; i++) {
            o += String.fromCharCode(s());
          }
          w.push(o);
        }, function () {
          T = 0;
        }];
        var _ = new Float64Array(1);
        var v = new Uint8Array(_[i[5]]);
        var b = [];
        var y = [];
        var M = [];
        var T = 0;
        var k = false;
        var A = null;
        (function () {
          e = function (n, t) {
            var e;
            var o;
            var r;
            var c;
            var a;
            var s;
            var u;
            var f;
            var l;
            var d;
            var m;
            var g;
            var w;
            var p;
            o = 0;
            r = (e = h) ? "" + e : "";
            c = 0;
            for (; c < r[i[0]]; c++) {
              o = Math[i[2]](31, o) + r[i[1]](c) | 0;
            }
            o = 1922100408;
            d = (l = (f = n[i[3]](/[^A-Za-z0-9+/]/g, ""))[i[0]]) * 3 + 1 >> 2;
            m = new Uint8Array(d);
            g = 0;
            w = 0;
            p = 0;
            for (; p < l; p++) {
              s = p & 3;
              g |= ((u = f[i[1]](p)) > 64 && u < 91 ? u - 65 : u > 96 && u < 123 ? u - 71 : u > 47 && u < 58 ? u + 4 : u === 43 ? 62 : u === 47 ? 63 : 0) << (3 - s) * 6;
              if (s === 3 || l - p == 1) {
                for (a = 0; a < 3 && w < d; a++, w++) {
                  o = (o + 1) % 255;
                  m[w] = g >>> (16 >>> a & 24) & 255 ^ o;
                }
                g = 0;
              }
            }
            return m;
          }(e);
          b = [];
          for (var n = 0; n < o[0][2]; n++) {
            b[n] = {
              Kd: undefined
            };
          }
          y = [];
          M = [];
          T = o[0][4];
          k = false;
          A = null;
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
        var a;
        var s;
        var u;
        var f;
        var l;
        var d;
        var h;
        let m = (...n) => new Uint8Array(...n);
        let g = (...n) => new Uint16Array(...n);
        function w() {
          this.Kd = g(16);
          this.Xd = g(288);
        }
        function p(n, t) {
          this.$d = n;
          this.nh = 0;
          this.th = 0;
          this.eh = 0;
          this.oh = t;
          this.ih = 0;
          this.rh = new w();
          this.ah = new w();
        }
        function _(n, t, e, o) {
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
        function v(n, t, e, o) {
          var i;
          var r;
          for (i = 0; i < 16; ++i) {
            n.Kd[i] = 0;
          }
          for (i = 0; o > i; ++i) {
            n.Kd[t[e + i]]++;
          }
          n.Kd[0] = 0;
          r = 0;
          i = 0;
          for (; i < 16; ++i) {
            h[i] = r;
            r += n.Kd[i];
          }
          for (i = 0; o > i; ++i) {
            if (t[e + i]) {
              n.Xd[h[t[e + i]]++] = i;
            }
          }
        }
        function b(n) {
          if (!n.eh--) {
            n.th = n.$d[n.nh++];
            n.eh = 7;
          }
          var t = n.th & 1;
          n.th >>>= 1;
          return t;
        }
        function y(n, t, e) {
          if (!t) {
            return e;
          }
          while (n.eh < 24) {
            n.th |= n.$d[n.nh++] << n.eh;
            n.eh += 8;
          }
          var o = n.th & 65535 >>> 16 - t;
          n.th >>>= t;
          n.eh -= t;
          return o + e;
        }
        function M(n, t) {
          var e;
          var o;
          var i;
          var r;
          while (n.eh < 24) {
            n.th |= n.$d[n.nh++] << n.eh;
            n.eh += 8;
          }
          e = 0;
          o = 0;
          i = 0;
          r = n.th;
          do {
            o = o * 2 + (r & 1);
            r >>>= 1;
            ++i;
            e += t.Kd[i];
            o -= t.Kd[i];
          } while (o >= 0);
          n.th = r;
          n.eh -= i;
          return t.Xd[e + o];
        }
        function T(n, t, e) {
          var o;
          var i;
          var r;
          var c;
          var a;
          var s;
          var u = y(n, 5, 257);
          var h = y(n, 5, 1);
          var m = y(n, 4, 4);
          for (o = 0; o < 19; ++o) {
            d[o] = 0;
          }
          for (o = 0; m > o; ++o) {
            c = y(n, 3, 0);
            d[f[o]] = c;
          }
          v(l, d, 0, 19);
          i = 0;
          while (u + h > i) {
            switch (a = M(n, l)) {
              case 16:
                s = d[i - 1];
                r = y(n, 2, 3);
                for (; r; --r) {
                  d[i++] = s;
                }
                break;
              case 17:
                for (r = y(n, 3, 3); r; --r) {
                  d[i++] = 0;
                }
                break;
              case 18:
                for (r = y(n, 7, 11); r; --r) {
                  d[i++] = 0;
                }
                break;
              default:
                d[i++] = a;
            }
          }
          v(t, d, 0, u);
          v(e, d, u, h);
        }
        function k(t, e, o) {
          var i;
          var r;
          var f;
          var l;
          var d;
          while (true) {
            if ((i = M(t, e)) === 256) {
              return n;
            }
            if (i < 256) {
              t.oh[t.ih++] = i;
            } else {
              r = y(t, c[i -= 257], a[i]);
              f = M(t, o);
              d = l = t.ih - y(t, s[f], u[f]);
              for (; l + r > d; ++d) {
                t.oh[t.ih++] = t.oh[d];
              }
            }
          }
        }
        function A(t) {
          var o;
          var i;
          while (t.eh > 8) {
            t.nh--;
            t.eh -= 8;
          }
          if ((o = (o = t.$d[t.nh + 1]) * 256 + t.$d[t.nh]) !== (~(t.$d[t.nh + 3] * 256 + t.$d[t.nh + 2]) & 65535)) {
            return e;
          }
          t.nh += 4;
          i = o;
          for (; i; --i) {
            t.oh[t.ih++] = t.$d[t.nh++];
          }
          t.eh = 0;
          return n;
        }
        function B(o, c) {
          var s;
          var u;
          var f = new p(o, c);
          do {
            s = b(f);
            switch (y(f, 2, 0)) {
              case 0:
                u = A(f);
                break;
              case 1:
                u = k(f, i, r);
                break;
              case 2:
                T(f, f.rh, f.ah);
                u = k(f, f.rh, f.ah);
                break;
              default:
                u = e;
            }
            if (u !== n) {
              throw Error("Data error");
            }
          } while (!s);
          if (f.ih < f.oh.length) {
            if (typeof f.oh.slice == "function") {
              return f.oh.slice(0, f.ih);
            } else {
              return f.oh.subarray(0, f.ih);
            }
          } else {
            return f.oh;
          }
        }
        function D(n, e = 0) {
          var i;
          var r;
          var c;
          var a;
          var s;
          var u;
          var f = n.replace(/[^A-Za-z0-9+/]/g, "");
          var l = f.length;
          var d = e ? Math.ceil((l * 3 + 1 >> 2) / e) * e : l * 3 + 1 >> 2;
          var h = m(d);
          c = 0;
          a = 0;
          s = 0;
          for (; l > s; s++) {
            r = s & 3;
            c |= ((u = f.charCodeAt(s)) > 64 && u < 91 ? u - 65 : u > 96 && u < 123 ? u - 71 : u > 47 && u < 58 ? u + 4 : u === 43 ? 62 : u === 47 ? 63 : 0) << (3 - r) * 6;
            if (r === 3 || l - s == 1) {
              for (i = 0; i < 3 && d > a; i++, a++) {
                h[a] = c >>> (16 >>> i & 24) & 255;
              }
              c = 0;
            }
          }
          return h;
        }
        n = 0;
        e = -3;
        i = new w();
        r = new w();
        c = m(30);
        a = g(30);
        s = m(30);
        u = g(30);
        f = m([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
        l = new w();
        d = m(320);
        h = g(16);
        ((n, t) => {
          var e;
          for (e = 0; e < 7; ++e) {
            n.Kd[e] = 0;
          }
          n.Kd[7] = 24;
          n.Kd[8] = 152;
          n.Kd[9] = 112;
          e = 0;
          for (; e < 24; ++e) {
            n.Xd[e] = 256 + e;
          }
          for (e = 0; e < 144; ++e) {
            n.Xd[24 + e] = e;
          }
          for (e = 0; e < 8; ++e) {
            n.Xd[168 + e] = 280 + e;
          }
          for (e = 0; e < 112; ++e) {
            n.Xd[176 + e] = 144 + e;
          }
          for (e = 0; e < 5; ++e) {
            t.Kd[e] = 0;
          }
          t.Kd[5] = 32;
          e = 0;
          for (; e < 32; ++e) {
            t.Xd[e] = e;
          }
        })(i, r);
        _(c, a, 4, 3);
        _(s, u, 2, 1);
        c[28] = 0;
        a[28] = 258;
        (function (n, e = {}) {
          let r = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : e;
          let c = r;
          let a = D("AecCAAA9UbGO00AQ3Tc73sRxQqQIVigFOglSnFJdHVnIB7dCCqAr7qTrUJT4EkuJjWIfJwp+hYoPoKKGloKKmh/gJ5hx7mjejt+bN2/W63s3dX5UN/ti2Xi7yj9447nJ68Z3t9Vy0RRV6Xmzz6+9uy3KVXXr6d0z311Vy5tdXjb+4Tpvzra51vXpx4vF+u1il3tXXO/bc5uX62bjh8uqbKTl5b2N6/eL0sdFWeb7VxdvXvvecrPYv6hWedZcGnMJmADzBKBAdmDBgSPHljM+gZCxMRgALlDnEeOXMeY5g/j4qRnxLuMRVwpbhUKhVmgUjhQWCqXC6j9333I+4BhWahODecDoBooDehlO5JtiRAfNHY4OzxidGSEKSBwIc2ZMwGNsYWQbiOTOxNhyf8iYGRCpxzEkqav+bkDfgTHGV7QN3cB91QPiQIOMNBrpNxHPDSaMGPEhvqf2njikL3EEmmsU8Zj+3sWjjUfL/dZ4Qqwex8SBHjjSOyU0IpnWJ1H7oibtZRhzIozpp9hGpKMS0drFpgywEHYqr4GZPJCzsEIgRMORM5nTd4oeW4ux3Yv/yhpw+kknwYhJNrKQaTqEQpS4SLqZozF/pnbx9IuekZlwZEmX/37YYir/k1JdKVXmigz66fCu6qU/cKg66Snay7qJoc7xPw==");
          let s = !!a[0];
          let u = s ? a[1] | a[2] << 8 | a[3] << 16 | a[4] << 24 : a.length;
          let f = s ? m(u) : m(a.buffer, 5, a.length - 5);
          if (s) {
            B(m(a.buffer, 5, a.length - 5), f);
          }
          let l = 0;
          let d = {};
          let h = [];
          let g = [];
          let w = [];
          let p = [];
          let _ = 0;
          let v = null;
          let b = null;
          let y = [];
          let M = null;
          e.sh = {};
          e.uh = o(4733);
          let T = new Float64Array(1);
          function k() {
            let n = 0;
            let t = 0;
            let e = 0;
            while (e = f[l++], n |= (e & 127) << t, (e & 128) != 0) {
              t += 7;
            }
            return n;
          }
          function A() {
            return f[l++] | f[l++] << 8 | f[l++] << 16 | f[l++] << 24;
          }
          function E() {
            let t = k();
            let e = "";
            for (let o = 0; t > o; o++) {
              e += String.fromCharCode(k());
            }
            return e;
          }
          function x(n, e) {
            let o = d;
            return function i() {
              let a = _;
              let s = {};
              _ = n;
              let u = d;
              d = s;
              d[n] = {};
              let f = p[n];
              let m = f.length;
              for (let n = 0; m > n; n++) {
                let t = f[n];
                let e = o[t];
                s[t] = e;
              }
              let g = h;
              let w = l;
              let T = v;
              let k = b;
              let A = c;
              let B = y;
              let D = null;
              let E = null;
              h = [];
              y = [];
              l = e;
              v = i;
              b = arguments;
              c = this;
              try {
                D = C();
              } catch (n) {
                if (y.length) {
                  let t = y.pop();
                  l = t;
                  M = n;
                  D = C();
                } else {
                  E = n;
                }
              }
              y = B;
              l = w;
              h = g;
              v = T;
              d = u;
              _ = a;
              b = k;
              c = A;
              if (E) {
                throw E;
              }
              return D;
            };
          }
          function C() {
            while (true) {
              let n = f[l++];
              switch (n) {
                case 35:
                  d[_][k()] = b;
                  break;
                case 18:
                  h[f[l++]] = k();
                  break;
                case 88:
                  h[f[l++]] = f[l++] ? ++d[k()][k()] : d[k()][k()]++;
                  break;
                case 37:
                  h[f[l++]] = h[f[l++]];
                  break;
                case 21:
                  h[f[l++]] = x(k(), A());
                  break;
                case 70:
                  h[f[l++]] = g[k()];
                  break;
                case 30:
                  h[f[l++]] = RegExp(g[k()], g[k()]);
                  break;
                case 69:
                  h[f[l++]] = h[f[l++]] != h[f[l++]];
                  break;
                case 24:
                case 3:
                  h[f[l++]] = h[f[l++]] == h[f[l++]];
                  break;
                case 75:
                  h[f[l++]] = h[f[l++]] < h[f[l++]];
                  break;
                case 65:
                  w.push(h[f[l++]]);
                  break;
                case 63:
                  h[f[l++]] = h[f[l++]][h[f[l++]]] = h[f[l++]];
                  break;
                case 6:
                  h[f[l++]] = h[f[l++]][h[f[l++]]];
                  break;
                case 49:
                  {
                    let n = k();
                    let t = Array(n);
                    for (let e = 0; n > e; e++) {
                      t[n - e - 1] = w.pop();
                    }
                    let e = f[l++];
                    let o = f[l++];
                    let i = f[l++];
                    let r = h[o];
                    let c = h[i];
                    h[e] = r[c].apply(r, t);
                    break;
                  }
                case 13:
                  {
                    let n = f[l++];
                    let t = !!f[l++];
                    let o = k();
                    let i = g[o];
                    if (i in e) {
                      h[n] = e[i];
                      break;
                    }
                    if (t && !(i in r)) {
                      throw new ReferenceError(i + " is not defined");
                    }
                    h[n] = r[i];
                    break;
                  }
                case 80:
                  {
                    let n = k();
                    let t = Array(n);
                    for (let e = 0; n > e; e++) {
                      t[n - e - 1] = w.pop();
                    }
                    h[f[l++]] = t;
                  }
                  break;
                case 59:
                  h[f[l++]] = d[k()][k()];
                  break;
                case 43:
                  h[f[l++]] = d[k()][k()] = h[f[l++]];
                  break;
                case 9:
                  d[k()][k()] = h[f[l++]];
                  break;
                case 26:
                  {
                    let n = f[l++];
                    let t = A();
                    if (!h[n]) {
                      l = t;
                    }
                    break;
                  }
                case 61:
                  {
                    let n = A();
                    l = n;
                    break;
                  }
                case 41:
                case 7:
                  return h[0];
                default:
                  throw "u" + n;
              }
            }
          }
          m(T.buffer);
          (() => {
            for (l = 0;;) {
              let n = f[l++];
              if (n === 22) {
                g.push(E());
              } else {
                if (n !== 85) {
                  l--;
                  return;
                }
                {
                  let n = k();
                  let t = k();
                  let e = [];
                  for (let n = 0; t > n; n++) {
                    e.push(k());
                  }
                  p[n] = e;
                }
              }
            }
          })();
          x(0, l).call(this);
        })(0, {});
      })();
      const z = C[13];
      const U = C[18];
      const H = C[19];
      const L = C[20];
      const S = C[24];
      var G = o(5108);
      let N = {
        fh: {},
        lh: function (n, t, e) {
          return n + "-" + t + "x" + e;
        },
        dh: function (n, t, e) {
          t = Math.ceil(t);
          e = Math.ceil(e);
          let o = document.createElement("canvas");
          o.width = t;
          o.height = e;
          N.fh[this.lh(n, t, e)] = o;
          return o;
        },
        hh: function (n, t, e) {
          return this.fh[this.lh(n, t, e)];
        },
        mh: function (n, t, e) {
          delete N.fh[this.lh(n, t, e)];
        },
        gh: {},
        wh: function (n, t = 256, e = 256, o = null) {
          t = Math.ceil(t);
          e = Math.ceil(e);
          let c = o ? n + ":" + o : n;
          let a = this.hh(c, t, e);
          if (!a) {
            a = this.dh(c, t, e);
            let i = N.gh[n];
            if (i) {
              if (i.Da) {
                this.ph(i, a, o);
              } else {
                i.addEventListener("load", () => this.ph(i, a, o));
              }
            } else {
              let i = new Image();
              i.Da = false;
              i.src = G.default.Ba(n);
              i.addEventListener("load", () => {
                this.ph(i, a, o);
                i.Da = true;
              });
              i.addEventListener("error", () => {
                delete N.gh[n];
                this.mh(n, t, e);
              });
              this.gh[n] = i;
            }
          }
          return a;
        },
        ph: function (n, t, e) {
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
        _h: function (n) {
          return "/img/icon/" + n + ".png?v=1923912";
        },
        bh: function (n) {
          return "/img/ui/" + n + ".png?v=1923912";
        },
        yh: function (n) {
          return "/img/hats/" + n + ".png?v=1923912";
        },
        Mh: function (n, t = false) {
          return "/img/entity/" + n + ".png?v=1923912";
        },
        Th: function (n) {
          return "/img/items/" + n + ".png?v=1923912";
        },
        kh: function (n) {
          return "/img/skins/" + n + ".png?v=1923912";
        },
        Ah: function (n) {
          return "/img/decorations/" + n + ".png?v=1923912";
        },
        Bh: function (n) {
          return m().Dh(n);
        }
      };
      var J = N;
      var Y = o(6597);
      var I = o.n(Y);
      var F = o(9847);
      var j = o.n(F);
      const O = [];
      function P(n, t, e, o, i, r, c, a, s, u, f, l) {
        this.Eh = n;
        this.xh = t;
        this.Ch = e;
        this.zh = o;
        this.Uh = i;
        this.Hh = r > 0 ? r : 0;
        this.Lh = c;
        this.Sh = a;
        this.Gh = s > 0 ? s : 0;
        this.Nh = u;
        this.Jh = f;
        this.Yh = l > 0 ? l : 0;
      }
      O[I().Sr] = [];
      for (let n = 0; n < 20; n++) {
        O[I().Sr][n] = J.Bh(J.kh("game-rank" + n));
      }
      O[I().Ho] = [];
      O[I().Lo] = [];
      O[I().Lr] = [];
      O[I().Pr] = [];
      for (let n = 0; n < j().es; n++) {
        O[I().Ho][n] = J.Bh(J.kh("body" + n));
        O[I().Lo][n] = J.Bh(J.kh("arm" + n));
      }
      for (let n = 0; n < j().os; n++) {
        O[I().Lr][n] = J.Bh(J.kh("accessory" + n));
      }
      for (let n = 0; n < j().rs; n++) {
        O[I().Pr][n] = J.Bh(J.kh("back" + n));
      }
      O[I().So] = J.wh(J.Mh("skull"), 45, 45);
      O[I().fn] = J.Bh(J.Mh("rock"));
      O[I().Nn] = J.Bh(J.Mh("cave_stone0"));
      O[I().Jn] = J.Bh(J.Mh("cave_stone1"));
      O[I().Yn] = J.Bh(J.Mh("cave_stone2"));
      O[I().In] = J.Bh(J.Mh("ice0"));
      O[I().Fn] = J.Bh(J.Mh("ice1"));
      O[I().Go] = J.Bh(J.Mh("resource_background"));
      O[I().No] = null;
      O[I().Jo] = null;
      O[I().Yo] = null;
      O[I().dn] = J.Bh(J.Mh("tree"));
      O[I().sr] = J.Bh(J.Mh("palm_tree"));
      O[I().yi] = J.Bh(J.Mh("cherry_tree"));
      O[I().hn] = J.Bh(J.Mh("bush"));
      O[I().tn] = J.Bh(J.Mh("gold"));
      O[I().Rn] = J.Bh(J.Mh("ruby"));
      O[I().pn] = J.Bh(J.Mh("lootbox"));
      O[I().Io] = null;
      O[I()._n] = J.Bh(J.Mh("bullet"));
      O[I().gn] = J.Bh(J.Mh("wall"));
      O[I().W] = J.Bh(J.Mh("trap"));
      O[I().V] = J.Bh(J.Mh("boost"));
      O[I().mn] = J.Bh(J.Mh("spike"));
      O[I().wn] = J.Bh(J.Mh("platform"));
      O[I().$] = J.Bh(J.Mh("heal_pad"));
      O[I().xo] = J.Bh(J.Mh("wood"));
      O[I().Co] = J.Bh(J.Mh("leaf"));
      O[I().zo] = J.Bh(J.Mh("stone"));
      O[I().jo] = J.Bh(J.Mh("particle_gold"));
      O[I().Ih] = J.Bh(J.Mh("particle_ruby"));
      O[I().Po] = J.wh(J.Mh("health-gauge-background"), 210, 40);
      O[I().Oo] = J.wh(J.Mh("health-gauge-front"), 210, 40);
      O[I().dt] = J.Bh(J.Mh("stone_sword"));
      O[I().St] = J.Bh(J.Th("g_stick"));
      O[I().Gt] = J.Bh(J.Th("d_stick"));
      O[I().Nt] = J.Bh(J.Th("r_stick"));
      O[I().Yt] = J.Bh(J.Th("g_cutspear"));
      O[I().Jt] = J.Bh(J.Th("d_cutspear"));
      O[I().ae] = J.Bh(J.Th("r_cutspear"));
      O[I().It] = J.Bh(J.Th("g_toolhammer"));
      O[I().Ft] = J.Bh(J.Th("d_toolhammer"));
      O[I().jt] = J.Bh(J.Th("r_toolhammer"));
      O[I().Dr] = J.Bh(J.Mh("inv_g_stick"));
      O[I().Jr] = J.Bh(J.Mh("inv_d_stick"));
      O[I().Yr] = J.Bh(J.Mh("inv_r_stick"));
      O[I().Cr] = J.Bh(J.Mh("inv_g_cutspear"));
      O[I().Er] = J.Bh(J.Mh("inv_d_cutspear"));
      O[I().Uc] = J.Bh(J.Mh("inv_r_cutspear"));
      O[I().zr] = J.Bh(J.Mh("inv_g_toolhammer"));
      O[I().Ur] = J.Bh(J.Mh("inv_d_toolhammer"));
      O[I().Hr] = J.Bh(J.Mh("inv_r_toolhammer"));
      O[I().ue] = J.Bh(J.Th("g_sword"));
      O[I().fe] = J.Bh(J.Th("d_sword"));
      O[I().le] = J.Bh(J.Th("r_sword"));
      O[I().Lc] = J.Bh(J.Mh("inv_g_sword"));
      O[I().Sc] = J.Bh(J.Mh("inv_d_sword"));
      O[I().Gc] = J.Bh(J.Mh("inv_r_sword"));
      O[I().Dt] = J.Bh(J.Th("g_axe"));
      O[I().Bt] = J.Bh(J.Th("d_axe"));
      O[I().de] = J.Bh(J.Th("r_axe"));
      O[I()._r] = J.Bh(J.Mh("inv_g_axe"));
      O[I().pr] = J.Bh(J.Mh("inv_d_axe"));
      O[I().Jc] = J.Bh(J.Mh("inv_r_axe"));
      O[I().xt] = J.Bh(J.Th("g_great_axe"));
      O[I().Et] = J.Bh(J.Th("d_great_axe"));
      O[I().he] = J.Bh(J.Th("r_great_axe"));
      O[I().kr] = J.Bh(J.Mh("inv_g_great_axe"));
      O[I().vr] = J.Bh(J.Mh("inv_d_great_axe"));
      O[I().Nc] = J.Bh(J.Mh("inv_r_great_axe"));
      O[I().tc] = J.Bh(J.bh("indicator_enemy"));
      O[I().nc] = J.Bh(J.bh("indicator_friendly"));
      O[I().zt] = J.Bh(J.Th("g_katana"));
      O[I().Ct] = J.Bh(J.Th("d_katana"));
      O[I().Lt] = J.Bh(J.Th("c_katana"));
      O[I().yr] = J.Bh(J.Mh("inv_g_katana"));
      O[I().br] = J.Bh(J.Mh("inv_d_katana"));
      O[I().Br] = J.Bh(J.Mh("inv_c_katana"));
      O[I().Ht] = J.Bh(J.Th("g_spear"));
      O[I().Ut] = J.Bh(J.Th("d_spear"));
      O[I().se] = J.Bh(J.Th("r_spear"));
      O[I().Tr] = J.Bh(J.Mh("inv_g_spear"));
      O[I().Mr] = J.Bh(J.Mh("inv_d_spear"));
      O[I().Hc] = J.Bh(J.Mh("inv_r_spear"));
      O[I().Wt] = J.Bh(J.Th("meme"));
      O[I().Yc] = J.Bh(J.Mh("inv_meme"));
      O[I().Zt] = J.Bh(J.Th("scythe"));
      O[I().Ic] = J.Bh(J.Mh("inv_scythe"));
      O[I().Z] = J.Bh(J.Th("bat"));
      O[I().lt] = J.Bh(J.Mh("stone_toolhammer"));
      O[I().ht] = J.Bh(J.Mh("stone_spear"));
      O[I().F] = J.Bh(J.Mh("s_musket"));
      O[I().Ko] = J.Bh(J.Mh("stone_axe"));
      O[I().jr] = J.Bh(J.Mh("stone_axe"));
      O[I().At] = J.Bh(J.Mh("great_axe"));
      O[I().vt] = J.Bh(J.Mh("cookie"));
      O[I().Gn] = J.Bh(J.Mh("chest"));
      O[I().wi] = J.Bh(J.Mh("map"));
      O[I().R] = J.Bh(J.Mh("shield"));
      O[I().bn] = J.Bh(J.Mh("cow"));
      O[I().Sn] = J.Bh(J.Mh("fireball"));
      O[I().zn] = J.Bh(J.Mh("gcow"));
      O[I().xn] = J.Bh(J.Mh("shark"));
      O[I().Cn] = J.Bh(J.Mh("wolf"));
      O[I().jn] = J.Bh(J.Mh("duck"));
      O[I().Qn] = J.Bh(J.Mh("crocodile"));
      O[I().Ot] = J.Bh(J.Th("pearl"));
      O[I().gc] = J.Bh(J.Mh("inv_pearl"));
      O[I().On] = J.Bh(J.Mh("teleporter"));
      O[I().mc] = J.Bh(J.Mh("inv_teleporter"));
      O[I().Vn] = J.Bh(J.Mh("ice_spike"));
      O[I()._c] = J.Bh(J.Mh("inv_ice_spike"));
      O[I().wc] = J.Bh(J.Th("ice_spike"));
      O[I().bc] = J.Bh(J.Mh("g_hammer"));
      O[I().yc] = J.Bh(J.Mh("inv_g_hammer"));
      O[I().Mc] = J.Bh(J.Mh("d_hammer"));
      O[I().Tc] = J.Bh(J.Mh("inv_d_hammer"));
      O[I().kc] = J.Bh(J.Mh("r_hammer"));
      O[I().Ac] = J.Bh(J.Mh("inv_r_hammer"));
      O[I().Bc] = J.Bh(J.Mh("g_bat"));
      O[I().Dc] = J.Bh(J.Mh("inv_g_bat"));
      O[I().Ec] = J.Bh(J.Mh("d_bat"));
      O[I().xc] = J.Bh(J.Mh("inv_d_bat"));
      O[I().Cc] = J.Bh(J.Mh("r_bat"));
      O[I().zc] = J.Bh(J.Mh("inv_r_bat"));
      O[I().Qr] = J.Bh(J.Mh("inv_r_dagger"));
      O[I().Xr] = J.Bh(J.Mh("r_dagger"));
      let q = [];
      O[I().Ln] = q;
      q[1] = [[J.Bh(J.Mh("mammoth_tail")), new P(-40, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 7, Math.PI / 7, 2000)], [J.Bh(J.Mh("mammoth_body")), new P(0, 0, 0, 0, 0, 0, 0, 0, 0, Math.PI / 20, -Math.PI / 20, 1600)], [J.Bh(J.Mh("mammoth_head")), new P(100, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 10, Math.PI / 10, 1000)]];
      q[0] = [[J.Bh(J.Mh("mammoth_tail")), new P(-40, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 7, Math.PI / 7, 2000)], [J.Bh(J.Mh("mammoth_body")), new P(0, 0, 0, 0, 0, 0, 0, 0, 0, Math.PI / 20, -Math.PI / 20, 1600)], [J.Bh(J.Mh("mammoth_head_angry")), new P(100, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 10, Math.PI / 10, 1000)]];
      O[I().Hn] = [[J.Bh(J.Mh("dragon_2_body")), new P(-50, 0, 0, 2, -2, 1200, 0, 0, 0, Math.PI / 40, -Math.PI / 40, 1800)], [J.Bh(J.Mh("dragon_2_left_wing")), new P(10, -40, Math.PI / 5, 0, 0, 0, 0, 0, 0, -Math.PI / 5, 0, 1600)], [J.Bh(J.Mh("dragon_2_right_wing")), new P(10, 40, -Math.PI / 5, 0, 0, 0, 0, 0, 0, Math.PI / 5, 0, 1600)], [J.Bh(J.Mh("dragon_2_head")), new P(50, 0, 0, -3, 3, 1000, 0, 0, 0, -Math.PI / 40, Math.PI / 40, 1400)]];
      O[I().Ei] = J.Bh(J.Mh("turret_base"));
      O[I().Di] = J.Bh(J.Mh("turret_top"));
      O[I().Bi] = J.Bh(J.Mh("turret_assembled"));
      O[I().ln] = J.Bh(J.Mh("hard_spike"));
      O[I().j] = J.Bh(J.Mh("bow"));
      O[I().Si] = J.Bh(J.Mh("arrow"));
      O[I().An] = J.Bh(J.Mh("wood_farm"));
      O[I().Bn] = J.Bh(J.Mh("wood_farm_cherry"));
      O[I().Dn] = J.Bh(J.Mh("stone_farm"));
      O[I().Mt] = J.Bh(J.Mh("bush"));
      O[I().Fr] = J.Bh(J.bh("currency"));
      O[I().oi] = J.Bh(J.Mh("hat_1"));
      O[I().ri] = J.Bh(J.Mh("hat_2"));
      O[I().ci] = J.Bh(J.Mh("hat_3"));
      O[I().si] = J.Bh(J.Mh("hat_4"));
      O[I().ui] = J.Bh(J.Mh("hat_5"));
      O[I().fi] = J.Bh(J.Mh("hat_6"));
      O[I().Pn] = J.Bh(J.Mh("cactus"));
      O[I().qn] = J.Bh(J.Mh("tornado"));
      O[I().Yi] = J.Bh(J.Mh("hat_7"));
      O[I().dr] = J.Bh(J.Mh("hat_8"));
      O[I().gr] = J.Bh(J.Mh("hat_9"));
      O[I().Or] = J.Bh(J.Mh("hat_10"));
      O[I().$r] = J.Bh(J.Mh("hat_11"));
      O[I().vc] = J.Bh(J.Mh("hat_14"));
      O[I()._t] = J.Bh(J.Mh("apple"));
      O[I().O] = J.Bh(J.Mh("stick"));
      O[I().Tn] = J.Bh(J.Mh("big_spike"));
      O[I().Gi] = J.Bh(J.Mh("map_cross"));
      O[I().yt] = J.Bh(J.Mh("katana"));
      O[I().Tt] = J.Bh(J.Mh("Xbow"));
      O[I().Pi] = J.Bh(J.Mh("map_dot"));
      O[I().ec] = J.Bh(J.Mh("our_dot"));
      O[I().yn] = J.Bh(J.Mh("bed"));
      O[I().En] = J.Bh(J.Mh("castle_wall"));
      O[I().kt] = J.Bh(J.Mh("cut_spear"));
      O[I().Ji] = J.Bh(J.Mh("team_crown"));
      O[I().Ar] = null;
      O[I().ki] = J.Bh(J.Mh("skid_hat"));
      O[I().bt] = J.Bh(J.Mh("hammer"));
      O[I().di] = null;
      O[I().ei] = J.Bh(J.Mh("toggle-button-out1"));
      O[I().ji] = J.Bh(J.Mh("clan_button_out"));
      O[I().Ii] = J.Bh(J.Mh("hat_button_out"));
      O[I().Fi] = J.Bh(J.Mh("close_button_out"));
      O[I().Oi] = J.Bh(J.Mh("chat_button_out"));
      O[I().qi] = J.Bh(J.Mh("inv_cut_spear"));
      O[I().Ro] = J.Bh(J.Mh("inv_stone_toolhammer"));
      O[I().qo] = J.Bh(J.Mh("inv_stone_sword"));
      O[I().qr] = J.Bh(J.Mh("inv_s_dagger"));
      O[I().Wr] = J.Bh(J.Mh("s_dagger"));
      O[I().Rr] = J.Bh(J.Mh("inv_g_dagger"));
      O[I().Zr] = J.Bh(J.Th("g_dagger"));
      O[I().Vr] = J.Bh(J.Mh("inv_d_dagger"));
      O[I().Kr] = J.Bh(J.Th("d_dagger"));
      O[I().uc] = J.Bh(J.Mh("inv_c_dagger"));
      O[I().sc] = J.Bh(J.Th("c_dagger"));
      O[I().oc] = J.Bh(J.Mh("inv_s_healing_staff"));
      O[I().fc] = J.Bh(J.Mh("s_healing_staff"));
      O[I().ic] = J.Bh(J.Mh("inv_g_healing_staff"));
      O[I().lc] = J.Bh(J.Th("g_healing_staff"));
      O[I().rc] = J.Bh(J.Mh("inv_d_healing_staff"));
      O[I().dc] = J.Bh(J.Th("d_healing_staff"));
      O[I().cc] = J.Bh(J.Mh("inv_r_healing_staff"));
      O[I().hc] = J.Bh(J.Th("r_healing_staff"));
      O[I().Qo] = J.Bh(J.Mh("inv_stone_spear"));
      O[I().Wo] = J.Bh(J.Mh("inv_stone_axe"));
      O[I().ar] = J.Bh(J.Mh("inv_great_axe"));
      O[I().li] = J.Bh(J.Mh("inv_cookie"));
      O[I().Vo] = J.Bh(J.Mh("inv_musket"));
      O[I().Zo] = J.Bh(J.Mh("inv_wood_wall"));
      O[I().Ri] = J.Bh(J.Mh("inv_castle_wall"));
      O[I().$o] = J.Bh(J.Mh("inv_spike"));
      O[I().Xo] = J.Bh(J.Mh("inv_boost"));
      O[I().ni] = J.Bh(J.Mh("inv_platform"));
      O[I().ti] = J.Bh(J.Mh("inv_trap"));
      O[I().ac] = J.Bh(J.Mh("inv_heal_pad"));
      O[I().ii] = J.Bh(J.Mh("inv_apple"));
      O[I().ai] = J.Bh(J.Mh("inv_stone_shield"));
      O[I().wr] = J.Bh(J.Mh("inv_bat"));
      O[I().gi] = J.Bh(J.Mh("inv_windmill"));
      O[I().mi] = J.Bh(J.Mh("windmill_top"));
      O[I().pi] = J.Bh(J.Mh("windmill_base"));
      O[I()._i] = J.Bh(J.Mh("windmill_assembled"));
      O[I().hi] = J.Bh(J.Mh("inv_stick"));
      O[I().vi] = J.Bh(J.Mh("inv_hammer"));
      O[I().bi] = J.Bh(J.Mh("inv_bed"));
      O[I().Mi] = J.Bh(J.Mh("inv_katana"));
      O[I().Ti] = J.Bh(J.Mh("inv_big_spike"));
      O[I().Ai] = J.Bh(J.Mh("inv_hard_spike"));
      O[I().xi] = J.Bh(J.Mh("inv_turret"));
      O[I().zi] = J.Bh(J.Mh("inv_wood_farm"));
      O[I().Ci] = J.Bh(J.Mh("inv_wood_farm_cherry"));
      O[I().Ui] = J.Bh(J.Mh("inv_stone_farm"));
      O[I().Hi] = J.Bh(J.Mh("inv_bush"));
      O[I().Li] = J.Bh(J.Mh("inv_bow"));
      O[I().Ni] = J.Bh(J.Mh("inv_xbow"));
      O[I().Vi] = J.Bh(J.Th("wall"));
      O[I().Qi] = J.Bh(J.Th("spike"));
      O[I().Wi] = J.Bh(J.Th("castle_wall"));
      O[I().Zi] = J.Bh(J.Th("boost"));
      O[I().Ki] = J.Bh(J.Th("trap"));
      O[I().Fh] = J.Bh(J.Th("heal_pad"));
      O[I().Xi] = J.Bh(J.Th("stone_farm"));
      O[I().$i] = J.Bh(J.Th("berry_farm"));
      O[I().nr] = J.Bh(J.Th("wood_farm_cherry"));
      O[I().tr] = J.Bh(J.Th("wood_farm"));
      O[I().er] = J.Bh(J.Th("hard_spike"));
      O[I().ir] = J.Bh(J.Th("castle_spike"));
      O[I().rr] = J.Bh(J.Th("platform"));
      O[I().cr] = J.Bh(J.Th("bed"));
      O[I().Un] = J.Bh(J.Mh("roof"));
      O[I().Ir] = J.Bh(J.Mh("inv_roof"));
      O[I().Gr] = J.Bh(J.Mh("clan_accept"));
      O[I().Nr] = J.Bh(J.Mh("clan_decline"));
      var R = O;
      var V = o(9299);
      var Q = o.n(V);
      var W = o(1624);
      var Z = o.n(W);
      var K = o(3287);
      var X = o.n(K);
      var $ = o(3970);
      var nn = o.n($);
      var tn = o(4613);
      var en = o.n(tn);
      const on = new WeakMap();
      let rn;
      let cn = false;
      let an = null;
      let sn = 1;
      function un() {
        const t = G.default.jh();
        if (an !== null && rn === t) {
          return an;
        }
        const e = parseFloat(G.default.Oh("shadow_offset_x"));
        const o = parseFloat(G.default.Oh("shadow_offset_y"));
        const r = parseFloat(G.default.Oh("shadow_darkness"));
        const c = parseFloat(G.default.Oh("shadow_blur"));
        const a = G.default.Oh("shadow_color");
        an = {
          Ph: isFinite(e) ? e : 10,
          qh: isFinite(o) ? o : 7,
          Rh: isFinite(r) && r > 0 && r <= 1 ? r : 0.35,
          blur: isFinite(c) && c >= 0 ? c : 0,
          color: typeof a == "string" && a.charAt(0) === "#" ? a : "#000000"
        };
        rn = t;
        return an;
      }
      function fn(n, t) {
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
      function ln(n) {
        if (!n) {
          return null;
        }
        const e = un().color;
        let o = on.get(n);
        if (o === undefined || o.color !== e) {
          o = {
            color: e,
            canvas: fn(n, e)
          };
          on.set(n, o);
        }
        return o.canvas;
      }
      const dn = {
        Vh: function (n, t, e, o, r, c) {
          if (cn) {
            return;
          }
          if (!t) {
            return;
          }
          if (t.Qh !== undefined && t.Qh !== en().ut) {
            return;
          }
          if (!t.width || !t.height) {
            return;
          }
          const s = ln(t);
          if (!s) {
            return;
          }
          const u = un();
          const f = n.getTransform();
          n.save();
          n.setTransform(f.a, f.b, f.c, f.d, f.e + u.Ph * sn, f.f + u.qh * sn);
          if (u.blur > 0) {
            n.filter = "blur(" + u.blur + "px)";
          }
          n.globalAlpha = u.Rh;
          n.drawImage(s, e, o, r, c);
          n.restore();
        },
        Wh: function (n) {
          cn = !!n;
        },
        Zh: function () {
          an = null;
          rn = undefined;
        },
        Kh: function (n) {
          sn = isFinite(n) && n >= 0 ? n : 1;
        }
      };
      var hn = dn;
      let mn = null;
      function gn() {
        if (mn === null) {
          try {
            mn = o(8557) || false;
          } catch (n) {
            mn = false;
          }
        }
        const n = mn && mn.Ls;
        return typeof n == "function" && n();
      }
      let wn = 1;
      function pn(n) {
        wn = typeof n == "number" && n >= 0 && n < 1 ? n : 1;
      }
      function _n(n, t) {
        let o;
        let r = Date.now();
        let c = 0;
        const a = wn < 1;
        if (a) {
          n.globalAlpha = wn;
        }
        o = _[s().xn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().xn, n, t);
        }
        o = _[s().Qn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().Qn, n, t);
        }
        o = _[s().wn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().wn, n, t);
        }
        o = _[s().V];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().V, n, t);
        }
        o = _[s().On];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().On, n, t);
        }
        o = _[s().yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().yn, n, t);
        }
        o = _[s().W];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().W, n, t);
        }
        o = _[s().$];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().$, n, t);
        }
        o = _[s().pn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().pn, n, t);
        }
        o = _[s().Dn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Dn, n, t);
        }
        o = _[s().fn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().fn, n, t);
        }
        o = _[s().In];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().In, n, t);
        }
        o = _[s().Fn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Fn, n, t);
        }
        o = _[s().Nn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Nn, n, t);
        }
        o = _[s().Jn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Jn, n, t);
        }
        o = _[s().Yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Yn, n, t);
        }
        o = _[s().tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().tn, n, t);
        }
        o = _[s().Rn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Rn, n, t);
        }
        o = _[s()._n];
        c = o.length;
        for (let t = 0; t < c; t++) {
          if (!(o[t].Us & d().Vc)) {
            Dn(o[t], o[t].Sd, I().Io, n);
          }
        }
        o = _[s().jn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().jn, n, t);
        }
        o = _[s().un];
        c = o.length;
        for (let e = 0; e < c; e++) {
          if (!(o[e].Us & d().Vc)) {
            xn(o[e], n, t);
          }
        }
        o = _[s().Cn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().Cn, n, t);
        }
        o = _[s().Sn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().Sn, n, t);
        }
        o = _[s().bn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().bn, n, t);
        }
        o = _[s().zn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().zn, n, t);
        }
        o = _[s().Ln];
        c = o.length;
        for (let t = 0; t < c; t++) {
          const e = o[t];
          An(e, I().Ln, n, r - e.Od, e.Us & d().Qc ? 0 : 1);
        }
        o = _[s().mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().mn, n, t);
        }
        o = _[s().ln];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().ln, n, t);
        }
        o = _[s().Vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Vn, n, t);
        }
        o = _[s().Gn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Gn, n, t);
        }
        o = _[s().gn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().gn, n, t);
        }
        o = _[s().En];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().En, n, t);
        }
        o = _[s().kn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Ei, n, t);
        }
        o = _[s().kn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Di, n, t);
        }
        o = _[s().Tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Tn, n, t);
        }
        o = _[s().vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().pi, n, t);
        }
        o = _[s().Mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().pi, n, t);
        }
        o = _[s().hn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().hn, n, t);
        }
        o = _[s().Pn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Pn, n, t);
        }
        o = _[s().Hn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          const e = o[t];
          An(e, I().Hn, n, r - e.Od);
        }
        o = _[s().An];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          En(e, I().An, n, t);
        }
        o = _[s().Bn];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          En(e, I().Bn, n, t);
        }
        o = _[s().dn];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          En(e, e.wd === nn().H ? I().dn : e.wd === nn().L ? I().yi : e.wd === nn().S ? I().sr : I().jr, n, t);
        }
        o = _[s().un];
        c = o.length;
        for (let e = 0; e < c; e++) {
          if (o[e].Us & d().Vc) {
            xn(o[e], n, t);
          }
        }
        o = _[s().Un];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().Un, n, t);
        }
        o = _[s().qn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Bn(o[e], I().qn, n, t);
        }
        o = _[s().vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().mi, n, t);
        }
        o = _[s().Mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          En(o[e], I().mi, n, t);
        }
        o = _[s()._n];
        c = o.length;
        for (let t = 0; t < c; t++) {
          if (o[t].Us & d().Vc) {
            Dn(o[t], o[t].Sd, I().Io, n);
          }
        }
        if (a) {
          n.globalAlpha = 1;
        }
      }
      let vn = false;
      function bn(n) {
        vn = !!n;
      }
      function yn(n) {
        if (!vn) {
          return;
        }
        const e = G.default.Oh("collision_color") || "#ff3b3b";
        const o = parseFloat(G.default.Oh("collision_width"));
        const r = isFinite(o) && o > 0 ? o : 3;
        const c = G.default.Oh("collision_opacity");
        const a = c === null || c === "" || c === undefined ? 0.6 : parseFloat(c) || 0;
        const s = G.default.Oh("collision_follow_shake");
        const u = s === "1" || s === "true";
        n.save();
        n.globalAlpha = a;
        n.strokeStyle = e;
        n.lineWidth = r;
        for (let e = 0; e < _.length; e++) {
          const o = _[e];
          if (!o || !o.length) {
            continue;
          }
          const i = X()[e];
          const r = i && i.Xh;
          if (r) {
            for (let t = 0; t < o.length; t++) {
              const e = o[t];
              let i = e.bd;
              let c = e.Md;
              if (u && e.Pd && e.Fd && e.Fd.value) {
                const n = e.Fd.value;
                i += Math.cos(e.Pd.Rd) * 10 * n;
                c += Math.sin(e.Pd.Rd) * 10 * n;
              }
              n.beginPath();
              n.arc(i, c, r, 0, Math.PI * 2);
              n.stroke();
            }
          }
        }
        n.restore();
      }
      function Mn(n, t) {
        const o = R[n.Yd];
        if (!o || !o.$h) {
          return;
        }
        t.save();
        t.translate(n.bd, n.Md);
        const r = n.Fd.value;
        const c = n.yd - r;
        t.rotate(c);
        if (n.nm) {
          t.globalAlpha = 0.5;
        }
        m().tm(t, o, -o.$h.om / 2, -o.$h.im / 2, o.$h.om, o.$h.im);
        t.restore();
      }
      function Tn(n, t, e) {
        const r = R[I().Oo];
        const c = R[I().Po];
        const a = X()[n.type].Xh + 50;
        const s = 0.5;
        t.fillStyle = e ? G.default.Oh("healthbar_player_color") || "#a4cc4f" : G.default.Oh("healthbar_enemy_color") || "#cc5151";
        t.drawImage(c, n.bd - s * c.width / 2, n.Md - s * c.height + a, s * c.width, s * c.height);
        let u = s * r.width;
        let f = n.vd / 255 * (u - 10);
        const l = n.bd - u / 2 + 5;
        const d = n.Md - s * r.height + a + 5;
        const h = s * r.height - 10;
        const m = G.default.Oh("healthbar_bg_color");
        if (m) {
          const n = t.fillStyle;
          t.fillStyle = m;
          t.fillRect(l, d, u - 10, h);
          t.fillStyle = n;
        }
        t.fillRect(l, d, f, h);
        t.drawImage(r, n.bd - s * r.width / 2, n.Md - s * r.height + a, s * r.width, s * r.height);
      }
      function kn(n, t, e, o) {
        let c = 0;
        if (t.Hh !== 0) {
          let n = o % t.Hh / t.Hh;
          if (Math.floor(o / t.Hh) % 2 == 0) {
            n = 1 - n;
          }
          c = t.zh + n * (t.Uh - t.zh);
        }
        let a = 0;
        if (t.Gh !== 0) {
          let n = o % t.Gh / t.Gh;
          if (Math.floor(o / t.Gh) % 2 == 0) {
            n = 1 - n;
          }
          a = t.Lh + n * (t.Sh - t.Lh);
        }
        if (t.Eh !== 0 || t.xh !== 0 || c !== 0 || a !== 0) {
          c += t.Eh;
          a += t.xh;
          e.translate(c, a);
        }
        let s = 0;
        if (t.Yh !== 0) {
          let n = o % t.Yh / t.Yh;
          if (Math.floor(o / t.Yh) % 2 == 0) {
            n = 1 - n;
          }
          s = t.Nh + n * (t.Jh - t.Nh);
        }
        if (t.Ch || s !== 0) {
          s += t.Ch;
          e.rotate(s);
        }
        m().tm(e, n, -n.$h.om / 2, -n.$h.im / 2, n.$h.om, n.$h.im);
        if (s !== 0) {
          e.rotate(-s);
        }
        if (c !== 0 || a !== 0) {
          e.translate(-c, -a);
        }
      }
      function An(n, t, e, o, i = -1) {
        let r;
        r = i !== -1 ? R[t][i] : R[t];
        e.save();
        e.translate(n.bd, n.Md);
        e.rotate(n.yd);
        const c = r.length;
        for (let n = 0; n < c; n++) {
          const t = r[n];
          kn(t[0], t[1], e, o);
        }
        e.restore();
      }
      function Bn(n, t, e, o) {
        const i = R[t];
        e.save();
        if (n.Qd) {
          n.yd += n.Qd * o;
        }
        e.translate(n.bd, n.Md);
        e.rotate(n.yd);
        if (gn()) {
          hn.Vh(e, i.$h, -i.$h.om / 2, -i.$h.im / 2, i.$h.om, i.$h.im);
        }
        m().tm(e, i, -i.$h.om / 2, -i.$h.im / 2, i.$h.om, i.$h.im);
        e.restore();
      }
      function Dn(n, t, e, o, r) {
        if (!n.active) {
          return;
        }
        const a = R[t];
        R[e];
        n.range;
        o.save();
        o.translate(n.bd, n.Md);
        o.rotate(n.yd);
        m().tm(o, a, -a.$h.om / 2, -a.$h.im / 2, a.$h.om, a.$h.im);
        o.restore();
      }
      function En(n, t, e, o) {
        let c = 0;
        let a = 0;
        let s = 0;
        if (n.Fd.value) {
          n.Fd.Za(o);
          s = n.Fd.value;
        } else if (n.Pd.active && !n.Fd.value) {
          n.Fd.Za(o);
          n.Pd.active = false;
          s = n.Fd.value;
        }
        if (s) {
          c = Math.cos(n.Pd.Rd) * 10 * s;
          a = Math.sin(n.Pd.Rd) * 10 * s;
        }
        if (n.Qd) {
          n.yd += n.Qd * o;
        }
        const u = t !== I().pi ? n.yd : 0;
        e.save();
        e.translate(n.bd + c, n.Md + a);
        e.rotate(u);
        const f = R[t];
        if (gn()) {
          hn.Vh(e, f.$h, -f.$h.om / 2, -f.$h.im / 2, f.$h.om, f.$h.im);
        }
        m().tm(e, f, -f.$h.om / 2, -f.$h.im / 2, f.$h.om, f.$h.im);
        e.restore();
      }
      function xn(n, t, e) {
        if (n.Yd && !n.nm) {
          return;
        }
        const r = Q()[n.wd];
        t.save();
        t.translate(n.bd, n.Md);
        if (n.Fd.value) {
          n.Fd.Za(e);
        }
        const c = n.pd ? Z()[n.pd] : null;
        const a = c ? c.Ph : 0;
        const s = n.Us & d().Qc ? R[I().ki] : c ? R[c.rm] : null;
        const u = 70;
        const f = R[r.rm];
        const l = n.Sd || 0;
        const h = R[I().Ho][l];
        const g = R[I().Lo][l];
        const w = n.Gd || 0;
        const p = R[I().Lr][w];
        const _ = n.Jd || 0;
        const v = R[I().Pr][_];
        const b = n.Fd.value;
        const y = n.yd - b;
        if (!(n.Us & d().Fc)) {
          const e = gn();
          if (e) {
            hn.Vh(t, h.$h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
            hn.Wh(true);
          }
          try {
            switch (r.am) {
              case 0:
                t.rotate(y);
                if (e) {
                  hn.Vh(t, f.$h, 29 - f.$h.om / 2 + r.Ph, -48 + r.qh, f.$h.om, f.$h.im);
                }
                m().tm(t, f, 29 - f.$h.om / 2 + r.Ph, -48 + r.qh, f.$h.om, f.$h.im);
                if (!c || c.rm !== I().$i) {
                  if (_ !== 0) {
                    if (e) {
                      hn.Vh(t, v.$h, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                    }
                    m().tm(t, v, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                  }
                  if (e) {
                    hn.Vh(t, g.$h, u / 3 - g.$h.om / 2, u / 3 - g.$h.im / 2, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, u / 3 - g.$h.om / 2, u / 3 - g.$h.im / 2, g.$h.om, g.$h.im);
                  t.save();
                  t.translate(u / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.$h.om / 2, -g.$h.im / 2);
                  if (e) {
                    hn.Vh(t, g.$h, 0, 0, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, 0, 0, g.$h.om, g.$h.im);
                  t.restore();
                  if (e) {
                    hn.Vh(t, h.$h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  }
                  m().tm(t, h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  if (w !== 0) {
                    if (e) {
                      hn.Vh(t, p.$h, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                    }
                    m().tm(t, p, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                  }
                }
                if (s) {
                  if (e) {
                    hn.Vh(t, s.$h, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                  }
                  m().tm(t, s, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                }
                break;
              case 1:
                t.rotate(n.yd);
                if (e) {
                  hn.Vh(t, f.$h, u / (0.9 + b * 0.05) - f.$h.om / 2 - r.Ph, -f.$h.im / 2 + r.qh, f.$h.om, f.$h.im);
                }
                m().tm(t, f, u / (0.9 + b * 0.05) - f.$h.om / 2 - r.Ph, -f.$h.im / 2 + r.qh, f.$h.om, f.$h.im);
                if (!c || c.rm !== I().$i) {
                  if (_ !== 0) {
                    if (e) {
                      hn.Vh(t, v.$h, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                    }
                    m().tm(t, v, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                  }
                  if (e) {
                    hn.Vh(t, g.$h, u / (2.3 + b * 0.1) - g.$h.om / 2, 17.5 - g.$h.im / 2, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, u / (2.3 + b * 0.1) - g.$h.om / 2, 17.5 - g.$h.im / 2, g.$h.om, g.$h.im);
                  t.save();
                  t.translate(u / (1.3 - b * 0.15), -17.5);
                  t.scale(1, -1);
                  t.translate(-g.$h.om / 2, -g.$h.im / 2);
                  if (e) {
                    hn.Vh(t, g.$h, 0, 0, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, 0, 0, g.$h.om, g.$h.im);
                  t.restore();
                  if (e) {
                    hn.Vh(t, h.$h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  }
                  m().tm(t, h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  if (w !== 0) {
                    if (e) {
                      hn.Vh(t, p.$h, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                    }
                    m().tm(t, p, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                  }
                }
                if (s) {
                  if (e) {
                    hn.Vh(t, s.$h, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                  }
                  m().tm(t, s, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                }
                break;
              case 2:
                t.rotate(y);
                if (e) {
                  hn.Vh(t, f.$h, 35 - r.Ph, -f.$h.im / 2 + r.qh, f.$h.om, f.$h.im);
                }
                m().tm(t, f, 35 - r.Ph, -f.$h.im / 2 + r.qh, f.$h.om, f.$h.im);
                if (!c || c.rm !== I().$i) {
                  if (_ !== 0) {
                    if (e) {
                      hn.Vh(t, v.$h, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                    }
                    m().tm(t, v, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                  }
                  if (e) {
                    hn.Vh(t, g.$h, u / 3 - g.$h.om / 2, u / 3 - g.$h.im / 2, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, u / 3 - g.$h.om / 2, u / 3 - g.$h.im / 2, g.$h.om, g.$h.im);
                  t.save();
                  t.translate(u / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.$h.om / 2, -g.$h.im / 2);
                  if (e) {
                    hn.Vh(t, g.$h, 0, 0, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, 0, 0, g.$h.om, g.$h.im);
                  t.restore();
                  if (e) {
                    hn.Vh(t, h.$h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  }
                  m().tm(t, h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  if (w !== 0) {
                    if (e) {
                      hn.Vh(t, p.$h, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                    }
                    m().tm(t, p, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                  }
                }
                if (s) {
                  if (e) {
                    hn.Vh(t, s.$h, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                  }
                  m().tm(t, s, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                }
                break;
              case 3:
                t.rotate(n.yd);
                let i = b * 7;
                if (e) {
                  hn.Vh(t, f.$h, 29 - f.$h.om / 2 + r.Ph + i, -48 + r.qh, f.$h.om, f.$h.im);
                }
                m().tm(t, f, 29 - f.$h.om / 2 + r.Ph + i, -48 + r.qh, f.$h.om, f.$h.im);
                if (!c || c.rm !== I().$i) {
                  if (_ !== 0) {
                    if (e) {
                      hn.Vh(t, v.$h, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                    }
                    m().tm(t, v, -v.$h.om / 2, -v.$h.im / 2, v.$h.om, v.$h.im);
                  }
                  if (e) {
                    hn.Vh(t, g.$h, u / 3 - g.$h.om / 2 + i, u / 3 - g.$h.im / 2, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, u / 3 - g.$h.om / 2 + i, u / 3 - g.$h.im / 2, g.$h.om, g.$h.im);
                  t.save();
                  t.translate(u / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.$h.om / 2, -g.$h.im / 2);
                  if (e) {
                    hn.Vh(t, g.$h, 0, 0, g.$h.om, g.$h.im);
                  }
                  m().tm(t, g, 0, 0, g.$h.om, g.$h.im);
                  t.restore();
                  if (e) {
                    hn.Vh(t, h.$h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  }
                  m().tm(t, h, -h.$h.om / 2, -h.$h.im / 2, h.$h.om, h.$h.im);
                  if (w !== 0) {
                    if (e) {
                      hn.Vh(t, p.$h, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                    }
                    m().tm(t, p, -p.$h.om / 2, -p.$h.im / 2, p.$h.om, p.$h.im);
                  }
                }
                if (s) {
                  if (e) {
                    hn.Vh(t, s.$h, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                  }
                  m().tm(t, s, -s.$h.om / 2 - a, -s.$h.im / 2, s.$h.om, s.$h.im);
                }
            }
          } finally {
            hn.Wh(false);
          }
        }
        t.restore();
      }
      function Cn() {
        try {
          localStorage.setItem(ot, JSON.stringify(it));
        } catch (n) {}
      }
      document.getElementById("reset-keybinds").addEventListener("click", function (n) {
        Object.assign(it, et);
        Cn();
        ut();
      });
      let zn = 0;
      const Un = zn++;
      const Hn = zn++;
      const Ln = zn++;
      const Sn = zn++;
      const Gn = zn++;
      const Nn = zn++;
      const Jn = zn++;
      const Yn = zn++;
      const In = zn++;
      const Fn = zn++;
      const jn = zn++;
      const On = zn++;
      const Pn = zn++;
      const qn = zn++;
      const Rn = zn++;
      const Vn = zn++;
      const Qn = zn++;
      const Wn = zn++;
      const Zn = zn++;
      const Kn = zn++;
      const Xn = zn++;
      const $n = zn++;
      const nt = zn++;
      const tt = zn++;
      const et = Object.freeze({
        [Un]: "KeyW",
        [Hn]: "KeyS",
        [Ln]: "KeyD",
        [Sn]: "KeyA",
        [Gn]: "KeyF",
        [Nn]: "KeyQ",
        [Jn]: "Space",
        [Yn]: "KeyR",
        [In]: "KeyR",
        [Fn]: "KeyG",
        [jn]: "KeyT",
        [On]: "KeyN",
        [Pn]: "KeyX",
        [qn]: "KeyE",
        [Rn]: "ArrowUp",
        [Vn]: "ArrowRight",
        [Qn]: "ArrowDown",
        [Wn]: "ArrowLeft",
        [Zn]: "Escape",
        [Kn]: "Enter",
        [Xn]: "KeyL",
        [$n]: "KeyC",
        [nt]: "KeyB",
        [tt]: "KeyP"
      });
      const ot = "keybinds";
      const it = function () {
        var t = undefined;
        try {
          t = localStorage.getItem(ot);
        } catch (n) {}
        if (!t) {
          return Object.assign({}, et);
        }
        try {
          let e = Object.assign(Object.assign({}, et), JSON.parse(t));
          if (e[Nn] === "Space") {
            e[Nn] = et[Nn];
          }
          if (e[Gn] === "Space") {
            e[Gn] = et[Gn];
          }
          if (e[Yn] === "Space") {
            e[Yn] = et[Yn];
          }
          if (e[In] === "Space") {
            e[In] = et[In];
          }
          if (e[Fn] === "Space") {
            e[Fn] = et[Fn];
          }
          if (e[jn] === "Space") {
            e[jn] = et[jn];
          }
          if (e[On] === "Space") {
            e[On] = et[On];
          }
          return e;
        } catch {
          return Object.assign({}, et);
        }
      }();
      ut();
      const rt = Array.from(document.getElementsByClassName("keybind-setting"));
      function ct(n) {
        return atob(btoa(n));
      }
      let at = null;
      function st(n) {
        if (n.startsWith("Key")) {
          return n.slice(3);
        } else if (n.startsWith("Digit") || n.startsWith("Arrow")) {
          return n.slice(5);
        } else {
          return n;
        }
      }
      function ut() {
        document.getElementById("for-spike").innerText = st(it[Yn]);
        document.getElementById("for-trap").innerText = st(it[Gn]);
        document.getElementById("for-food").innerText = st(it[Nn]);
        document.getElementById("for-shop").innerText = st(it[$n]);
        document.getElementById("for-clan").innerText = st(it[nt]);
        document.getElementById("for-windmill").innerText = st(it[Fn]);
        document.getElementById("for-platform").innerText = st(it[jn]);
        document.getElementById("for-bed").innerText = st(it[On]);
        const t = document.getElementById("for-pack-builder");
        if (t) {
          t.innerText = st(it[tt]);
        }
      }
      rt.forEach(n => n.addEventListener("click", function () {
        at = n[ct("id")];
        document.getElementById(at).innerText = "PRESS";
      }));
      window.addEventListener("keydown", function (n) {
        if (!at) {
          return;
        }
        n.preventDefault();
        const e = n.code;
        if (e !== "Space") {
          switch (at) {
            case "for-spike":
              it[Yn] = e;
              break;
            case "for-trap":
              it[Gn] = e;
              break;
            case "for-food":
              it[Nn] = e;
              break;
            case "for-windmill":
              it[Fn] = e;
              break;
            case "for-platform":
              it[jn] = e;
              break;
            case "for-bed":
              it[On] = e;
              break;
            case "for-shop":
              it[$n] = e;
              break;
            case "for-clan":
              it[nt] = e;
              break;
            case "for-pack-builder":
              it[tt] = e;
              break;
            default:
              throw Error("Unknown key type");
          }
          Cn();
          ut();
          at = null;
        }
      });
      let ft = false;
      let lt = {
        Xa: -1,
        sm: 0,
        um: 0,
        fm: 0,
        lm: 0
      };
      let dt = {
        Xa: -1,
        sm: 0,
        um: 0,
        fm: 0,
        lm: 0
      };
      let ht = 0;
      let mt = 0;
      let gt = {};
      let wt = 0;
      let pt = false;
      let _t = 0;
      let vt = 0;
      let bt = 0;
      let yt = false;
      function Mt(n) {
        const t = n.code;
        if ((No || Jo || Yo) && t === it[Zn] && !gt[t]) {
          if (No) {
            Qi(false);
          }
          if (Yo) {
            Wi(false);
          }
          if (Jo) {
            Er(false);
          }
        }
        if (document.activeElement.type !== "text") {
          if (!No && !gt[t] && t === it[Kn]) {
            if (Yo) {
              Wi(false);
            }
            if (Jo) {
              Er(false);
            }
            Qi(true);
            n.preventDefault();
            return;
          }
          if (!No) {
            if (n.code === it[Pn] && !gt[t]) {
              gr(!So);
            }
            if (t === it[qn] && !gt[t]) {
              wr(!Lo);
              Nc(Lo);
            }
          }
          if (t === it[Nn] && !gt[t]) {
            Oc(2);
          }
          if (t === it[Gn] && !gt[t]) {
            Oc(7);
            Oc(10);
            Oc(11);
          }
          if (t === it[Yn] && !gt[t] || t === it[In] && !gt[t]) {
            Oc(4);
          }
          if (t === it[Fn] && !gt[t]) {
            Oc(5);
          }
          if (t === it[jn] && !gt[t]) {
            Oc(8);
          }
          if (t === it[On] && !gt[t]) {
            Oc(9);
          }
          if (t !== "Space" && !isNaN(Number(n.key)) && !gt[t]) {
            if (Number(n.key) - 1 >= 0) {
              Pc(uo.dm[Number(n.key) - 1]);
            }
          }
          if (t === it[Jn] && !gt[t]) {
            Yc(Vi());
          }
          if (t === it[Un] || t === it[Rn]) {
            ht |= 1;
          }
          if (t === it[Ln] || t === it[Vn]) {
            ht |= 8;
          }
          if (t === it[Xn] && xo) {
            Fc(xo);
          }
          if (t === it[Sn] || t === it[Wn]) {
            ht |= 4;
          }
          if (t === it[Hn] || t === it[Qn]) {
            ht |= 2;
          }
          gt[t] = true;
        }
      }
      function Tt(n) {
        const t = n.code;
        if (t === it[Jn]) {
          Ic();
        }
        if (t === it[Ln] || t === it[Vn]) {
          ht &= -9;
        }
        if (t === it[Un] || t === it[Rn]) {
          ht &= -2;
        }
        if (t === it[Sn] || t === it[Wn]) {
          ht &= -5;
        }
        if (t === it[Hn] || t === it[Qn]) {
          ht &= -3;
        }
        if (t === it[Xn]) {
          pt = false;
        }
        if (t === it[$n] && !No) {
          if (Yo) {
            Wi(false);
          }
          Qi(false);
          Er(!Jo);
        }
        if (t === it[nt] && !No) {
          if (Jo) {
            Er(false);
          }
          Qi(false);
          Wi(!Yo);
        }
        if (t === it[tt] && !No) {
          nr();
        }
        if (t === it[Zn] && Hr()) {
          fr(true);
        }
        gt[t] = false;
      }
      function kt(n) {
        ft = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          er(e.pageX, e.pageY);
          if (cr(Mo, To)) {
            break;
          }
          if (e.pageX < document.body.scrollWidth / 2 && lt.Xa === -1) {
            lt.Xa = e.identifier;
            lt.sm = lt.fm = e.pageX;
            lt.um = lt.lm = e.pageY;
          } else if (e.pageX > document.body.scrollWidth / 2 && dt.Xa === -1) {
            dt.Xa = e.identifier;
            dt.sm = dt.fm = e.pageX;
            dt.um = dt.lm = e.pageY;
          }
        }
      }
      function At(n) {
        ft = true;
        n.preventDefault();
        n.stopPropagation();
        for (let t of n.changedTouches) {
          if (t.identifier === lt.Xa) {
            lt.fm = t.pageX;
            lt.lm = t.pageY;
          } else if (t.identifier === dt.Xa) {
            dt.fm = t.pageX;
            dt.lm = t.pageY;
          }
        }
      }
      function Bt(n) {
        ft = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          er(e.pageX, e.pageY);
          if (ar(Mo, To)) {
            break;
          }
          if (e.identifier === lt.Xa) {
            lt.Xa = -1;
          } else if (e.identifier === dt.Xa) {
            dt.Xa = -1;
          }
        }
      }
      function Dt(n) {
        Wc(n);
        mt = n;
        bt = 0;
      }
      function Et(n) {
        yt = false;
        Jc(n);
      }
      function xt(n) {
        yt = true;
        Vc(n);
      }
      function Ct(n) {
        Rc(n);
        _t = n;
        vt = 0;
      }
      function zt(n) {
        ft = n;
      }
      function Ut(n) {
        vt += n;
        bt += n;
      }
      var Ht = function (n, e, o) {
        return {
          bd: 0,
          Md: 0,
          width: e,
          height: o,
          Us: 0,
          rm: n,
          hm: function (n) {
            const o = this.rm;
            m().tm(n, o, this.bd, this.Md, this.width, this.height);
          },
          gm: function (n, t, e) {
            if (m().wm(n, t, this.bd, this.Md, this.width, this.height)) {
              this.Us = 1;
              return true;
            } else {
              this.Us = 0;
              return false;
            }
          }
        };
      };
      var Lt = o(6399);
      var St = o.n(Lt);
      var Gt = {
        pm: [],
        _m: [],
        dm: [],
        vm: [],
        bm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ym: [],
        Mm: {
          width: 400,
          height: 20,
          bd: 0,
          Md: 0,
          Tm: 0,
          km: "#F2C39F",
          Am: "#5D3A37",
          Bm: "#5D3A37",
          background: m().Dm(400, 20, 10, "#5D3A37"),
          hm: function (n) {
            if (this.Am && this.Am !== this.Bm) {
              this.Bm = this.Am;
              this.background = m().Dm(this.width, this.height, 10, this.Am);
            }
            n.drawImage(this.background, this.bd, this.Md);
            n.beginPath();
            n.fillStyle = this.km || "#F2C39F";
            if (this.Tm) {
              m().Em(n, this.bd + 5, this.Md + 5, (this.width - 10) * this.Tm, this.height - 10, 5);
            }
            n.fill();
          }
        },
        xm: 0,
        na: 0,
        Cm: 0,
        zm: -1,
        Um: m().Hm("0", 24, "#AE4D57", "#222222"),
        Lm: m().Hm("0", 24, "#935F3B", "#222222"),
        Sm: m().Hm("0", 24, "#7B7A91", "#222222"),
        Gm: m().Hm("0", 24, "#FFD700", "#222222"),
        Nm: m().Hm("0", 24, "#FFFFFF", "#222222"),
        Jm: m().Hm("0", 24, "#FFFFFF", "#222222"),
        Ym: null,
        Im: {
          Fm: -1,
          bm: 0,
          jm: m().Hm(" ", 23, ""),
          Om: m().Hm(" ", 23, ""),
          Pm: m().Hm(" ", 23, ""),
          qm: m().Hm(" ", 23, ""),
          Rm: m().Hm(" ", 23, ""),
          Vm: m().Hm(" ", 23, ""),
          Qm: m().Hm(" ", 23, ""),
          hm: function (n, t, e, o, r, c) {
            const s = Q()[t];
            if (t !== this.Fm) {
              this.Fm = t;
              m().Wm(this.jm, s.La, 23, "#eec39d");
              m().Wm(this.Om, e + "/" + o, 23, "#fff");
              if (s.Zm) {
                m().Wm(this.Pm, "" + s.Zm[0], 23, "#ad4e56");
                m().Wm(this.qm, "" + s.Zm[1], 23, "#9c7e66");
                m().Wm(this.Rm, "" + s.Zm[2], 23, "#ffffff");
                m().Wm(this.Vm, "" + s.Zm[3], 23, "#e3b32c");
              }
              m().Wm(this.Qm, s.description, 23, "#fff");
              this.bm = e;
            } else if (this.bm !== e) {
              m().Wm(this.Om, e + "/" + o, 23, "#fff");
              this.bm = e;
            }
            const u = Math.max(this.jm.width + s.Km === 2 ? this.Om.width : 0, s.Zm ? this.Pm.width + this.qm.width + this.Rm.width + this.Vm.width : 0, this.Qm.width) + 40;
            n.beginPath();
            n.fillStyle = "#4f403c";
            m().Em(n, r, c, u, s.Zm ? 150 : 110, 10);
            n.fill();
            c += 20;
            r += 20;
            n.drawImage(this.jm, r, c);
            if (s.Km === 2) {
              n.drawImage(this.Om, r + this.jm.width, c);
            }
            if (s.Zm) {
              n.drawImage(this.Pm, r, c + 40);
              n.drawImage(this.qm, r + this.Pm.width, c + 40);
              n.drawImage(this.Rm, r + this.Pm.width + this.qm.width, c + 40);
              n.drawImage(this.Vm, r + this.Pm.width + this.qm.width + this.Rm.width, c + 40);
            }
            n.drawImage(this.Qm, r + 0, c + (s.Zm ? 80 : 40));
          }
        },
        Xm: function (n) {
          return Math.floor(n * 10) / 10;
        },
        $m: function (n) {
          if (n < 1000) {
            return n;
          } else if (n < 10000) {
            return this.Xm(n / 1000, 2) + "k";
          } else if (n < 1000000) {
            return Math.floor(n / 1000) + "k";
          } else if (n < 10000000) {
            return this.Xm(n / 1000000, 2) + "m";
          } else if (n < 1000000000) {
            return Math.floor(n / 1000000) + "m";
          } else {
            return Math.floor(n / 1000000000) + "b";
          }
        },
        ng: function (n, t, e, o) {
          if (this.ym[St().P] !== n) {
            m().Wm(this.Um, this.$m(n), 24, "#AE4D57", "#222222");
          }
          if (this.ym[St().Uo] !== t) {
            m().Wm(this.Lm, this.$m(t), 24, "#935F3B", "#222222");
          }
          if (this.ym[St().zo] !== e) {
            m().Wm(this.Sm, this.$m(e), 24, "#7B7A91", "#222222");
          }
          if (this.ym[St().tn] !== o) {
            m().Wm(this.Gm, o + "", 24, "#FFD700", "#222222");
          }
          this.ym[St().P] = n;
          this.ym[St().Uo] = t;
          this.ym[St().zo] = e;
          this.ym[St().tn] = o;
        },
        tg: function (n) {
          const e = Math.floor(m().eg(this.Cm));
          this.Cm = n;
          const o = Math.floor(m().eg(this.Cm));
          this.Mm.Tm = Math.floor((m().eg(this.Cm) - o) * 100) / 100;
          if (e !== o) {
            this.Ym = m().Wm(this.Ym, "AGE " + o, 24, "#FFFFFF", "#222222");
          }
        },
        og: function (n) {
          this.Nm = m().Wm(this.Nm, n, 24, "#FFFFFF", "#222222");
          this.xm = n;
        },
        ig: function () {
          this.na = 0;
          this.Jm = m().Wm(this.Jm, this.na, 24, "#FFFFFF", "#222222");
        },
        rg: function (n) {
          this.na += n;
          this.Jm = m().Wm(this.Jm, this.na, 24, "#FFFFFF", "#222222");
        },
        Za: function () {
          this._m.length = 0;
          for (let n = 0; n < this.dm.length; n++) {
            this._m.push(Ht(R[Q()[this.dm[n]].cg], 100, 100));
          }
        },
        ag: function () {
          this.pm.length = 0;
          for (let t = 0; t < this.vm.length; t++) {
            this.pm.push(Ht(R[Q()[this.vm[t]].cg], 100, 100));
          }
        }
      };
      const Nt = {
        sg: J.Bh(J.Mh("leaderboard")),
        cu: null,
        ug: Ht(R[I().Fi], 38.5, 42.5),
        fg: true,
        bd: 0,
        Md: 0,
        width: 250,
        height: 330,
        lg: [],
        dg: [],
        hm: function (n, t) {
          m().tm(n, this.sg, this.bd, this.Md, this.width, this.height);
          for (let e = 0, o = this.lg; e < o.length; e++) {
            const i = t.hg[o[e]];
            n.drawImage(this.dg[e] ||= m().Hm(e + 1 + ".", c().mg, c().gg[e] ? c().gg[e] : c().wg, c().pg), this.bd + 8, this.Md + 57 + e * 27);
            n.drawImage(i._g ||= m().Hm(i.La, c().mg, c().wg, c().pg), this.bd + 40, this.Md + 57 + e * 27);
            n.drawImage(i.vg ||= m().Hm(m().bg(i.$c), c().mg, c().wg, c().pg), this.bd + 40 + 145, this.Md + 57 + e * 27);
          }
        },
        Za: function (n, t) {
          this.lg.length = 0;
          let e = [];
          for (let n = 0; n < t.length; n++) {
            e.push(t[n][0]);
          }
          this.lg = e;
        }
      };
      var Jt = Nt;
      var Yt = {
        sg: m().Hm("", 50, "#fff", "#222"),
        active: false,
        yg: 0,
        Mg: 0.7,
        Bf: function (n, t = 1) {
          if (this.yg <= 0) {
            this.yg = t;
          }
          m().Wm(this.sg, n, 50, "#fff", "#222");
        },
        Za: function (n) {
          this.yg -= n * this.Mg;
          if (this.yg < 0) {
            this.yg = 0;
          }
        }
      };
      o(9435);
      const It = function () {
        this.wa = function (n, e, o, i, r, c) {
          this.bd = n;
          this.Md = e;
          this.Tg = c;
          this.Mg = o;
          this.yg = 400;
          this.kg = Math.random() > 0.5 ? 1 : -1;
          this.sg = this.sg ? m().Wm(this.sg, r, 45, this.Tg) : m().Hm(r, 35, this.Tg);
          this.scale = 1;
          this.Ag = this.scale;
          this.Bg = 2.5;
          this.Dg = 0.02;
          this.Mg = 0.18;
        };
        this.Za = function (n) {
          if (this.yg) {
            this.yg -= n;
            this.Md -= this.Mg * n;
            this.scale += this.Dg * n;
            if (this.scale >= this.Bg) {
              this.scale = this.Bg;
              this.Dg *= -1;
            } else if (this.scale <= this.Ag) {
              this.scale = this.Ag;
              this.Dg = 0;
            }
            if (this.yg <= 0) {
              this.yg = 0;
            }
          }
        };
        this.vs = function (n) {
          const o = this.sg;
          const i = this.scale;
          n.globalAlpha = i;
          n.drawImage(o, this.bd - i * o.width / 2, this.Md - i * (o.height / 2), o.width * i, i * o.height);
          n.globalAlpha = 1;
        };
      };
      const Ft = function () {
        this.wa = function (n, e) {
          this.parent = e;
          this.yg = 3000;
          if (this.sg) {
            m().Wm(this.sg, n, 25, "#fff", null, null, "rgba(0,0,0,.25)", 5);
          } else {
            this.sg = m().Hm(n, 25, "#fff", null, null, "rgba(0,0,0,.25)", 5);
          }
        };
        this.vs = function (n, e) {
          if (this.yg) {
            this.yg -= e;
          }
          if (this.yg < 0) {
            this.yg = 0;
            this.parent = null;
            return;
          }
          const i = this.sg;
          const r = this.parent;
          n.drawImage(i, r.bd - i.width / 2, r.Md - i.height / 2 - 120);
        };
      };
      var jt = o(9281);
      var Ot = o.n(jt);
      var Pt = o(5599);
      var qt = o.n(Pt);
      var Rt = o(2936);
      var Vt = o.n(Rt);
      function Qt(n, t, e, o, r, c) {
        n.beginPath();
        n.arc(t, e, r, 0, Math.PI * 2);
        n.fillStyle = "#313131";
        n.fill();
        n.beginPath();
        n.arc(t, e, o, 0, Math.PI * 2);
        n.fillStyle = c;
        n.fill();
      }
      const Wt = {
        [s().bn]: null,
        [s().xn]: null,
        [s().Cn]: null,
        [s().zn]: null,
        [s().Hn]: null,
        [s().jn]: null,
        [s().Ln]: null
      };
      var Zt = Wt;
      o(9882);
      const Kt = {
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
      function Xt(n, t) {
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
      var $t = o(9282);
      var ne = o.n($t);
      var te = o(7160);
      var ee = o.n(te);
      var oe = o(9657);
      var ie = o.n(oe);
      var re = o(3424);
      var ce = o.n(re);
      var ae = o(3543);
      var se = o.n(ae);
      var ue = o(2190);
      var fe = o.n(ue);
      var le = o(6078);
      var de = o.n(le);
      var he = o(5299);
      var me = o.n(he);
      const ge = Object.create(null);
      var we = function (n) {
        if (!n) {
          return null;
        }
        const e = G.default.Oh(n);
        if (!e || e.charAt(0) === "#") {
          return null;
        }
        let o = ge[n];
        if (o && o.url === e) {
          return o.za;
        }
        o = {
          url: e,
          za: null
        };
        ge[n] = o;
        const r = new Image();
        r.crossOrigin = "anonymous";
        r.onload = function () {
          if (r.width && r.height) {
            o.za = r;
          }
        };
        r.onerror = function () {
          o.za = null;
        };
        r.src = e;
        return null;
      };
      var pe = function (n) {
        if (!n) {
          return null;
        }
        const t = G.default.Oh(n);
        if (typeof t == "string" && t.charAt(0) === "#") {
          return t;
        } else {
          return null;
        }
      };
      function _e(n, t) {
        return {
          key: "img/entity/" + n + ".png",
          La: t,
          src: "/img/entity/" + n + ".png",
          control: "image"
        };
      }
      function ve(n, t) {
        return {
          key: "img/items/" + n + ".png",
          La: t,
          src: "/img/items/" + n + ".png",
          control: "image"
        };
      }
      function be(n, t) {
        return {
          key: "img/skins/" + n + ".png",
          La: t,
          src: "/img/skins/" + n + ".png",
          control: "image"
        };
      }
      function ye(n, t) {
        return {
          key: "img/entity/" + n + ".png",
          La: t,
          src: "/img/entity/" + n + ".png",
          control: "image"
        };
      }
      function Me(n, t, e) {
        return {
          key: n,
          La: t,
          Eg: e,
          control: "biome"
        };
      }
      function Te(n, t, e) {
        return {
          key: n,
          La: t,
          Eg: e,
          control: "color"
        };
      }
      function ke(n, t, e, o, i) {
        return {
          key: n,
          La: t,
          xg: e,
          min: o,
          max: i,
          control: "number"
        };
      }
      function Ae(n, t, e, o, i, r) {
        return {
          key: n,
          La: t,
          xg: e,
          min: o,
          max: i,
          step: r,
          control: "range"
        };
      }
      var Be = [{
        Xa: "resources",
        Cg: "Resources",
        zg: [_e("tree", "Tree"), _e("palm_tree", "Palm Tree"), _e("cherry_tree", "Cherry Tree"), _e("bush", "Bush"), _e("cactus", "Cactus"), _e("rock", "Rock"), _e("cave_stone0", "Cave Stone I"), _e("cave_stone1", "Cave Stone II"), _e("cave_stone2", "Cave Stone III"), _e("ice0", "Ice I"), _e("ice1", "Ice II"), _e("gold", "Gold"), _e("ruby", "Ruby")]
      }, {
        Xa: "hats",
        Cg: "Hats",
        zg: [ve("berry_farm", "Bush Hat"), _e("hat_1", "Berserker Gear"), _e("hat_2", "Jungle Gear"), _e("hat_3", "Crystal Gear"), _e("hat_4", "Spike Gear"), _e("hat_5", "Immunity Gear"), _e("hat_6", "Boost Hat"), _e("hat_7", "Apple Hat"), _e("hat_8", "Scuba Gear"), _e("hat_9", "Hood"), _e("hat_10", "Pumpkin King's Curse"), _e("hat_11", "Demolist"), _e("hat_14", "Winter Hat"), _e("skid_hat", "Skid Hat")]
      }, {
        Xa: "weapons",
        Cg: "Weapons",
        zg: [_e("stone_sword", "Stone Sword"), ye("inv_stone_sword", "Stone Sword Icon"), ve("g_sword", "Gold Sword"), ve("d_sword", "Diamond Sword"), ve("r_sword", "Ruby Sword"), _e("s_dagger", "Stone Dagger"), ye("inv_s_dagger", "Stone Dagger Icon"), ve("g_dagger", "Gold Dagger"), ye("inv_g_dagger", "Gold Dagger Icon"), ve("d_dagger", "Diamond Dagger"), ye("inv_d_dagger", "Diamond Dagger Icon"), ve("c_dagger", "Crystal Dagger"), ye("inv_c_dagger", "Crystal Dagger Icon"), _e("r_dagger", "Ruby Dagger"), ye("inv_r_dagger", "Ruby Dagger Icon"), _e("katana", "Katana"), ye("inv_katana", "Katana Icon"), ve("g_katana", "Gold Katana"), ye("inv_g_katana", "Gold Katana Icon"), ve("d_katana", "Diamond Katana"), ye("inv_d_katana", "Diamond Katana Icon"), ve("c_katana", "Crystal Katana"), ye("inv_c_katana", "Crystal Katana Icon"), _e("stone_spear", "Stone Spear"), ye("inv_stone_spear", "Stone Spear Icon"), ve("g_spear", "Gold Spear"), ye("inv_g_spear", "Gold Spear Icon"), ve("d_spear", "Diamond Spear"), ye("inv_d_spear", "Diamond Spear Icon"), ve("r_spear", "Ruby Spear"), ye("inv_r_spear", "Ruby Spear Icon"), _e("cut_spear", "Stone Cut Spear"), ye("inv_cut_spear", "Stone Cut Spear Icon"), ve("g_cutspear", "Gold Cut Spear"), ye("inv_g_cutspear", "Gold Cut Spear Icon"), ve("d_cutspear", "Diamond Cut Spear"), ye("inv_d_cutspear", "Diamond Cut Spear Icon"), ve("r_cutspear", "Ruby Cut Spear"), ye("inv_r_cutspear", "Ruby Cut Spear Icon"), _e("stone_axe", "Stone Axe"), ye("inv_stone_axe", "Stone Axe Icon"), ve("g_axe", "Gold Axe"), ye("inv_g_axe", "Gold Axe Icon"), ve("d_axe", "Diamond Axe"), ye("inv_d_axe", "Diamond Axe Icon"), ve("r_axe", "Ruby Axe"), ye("inv_r_axe", "Ruby Axe Icon"), _e("great_axe", "Stone Great Axe"), ye("inv_great_axe", "Stone Great Axe Icon"), ve("g_great_axe", "Gold Great Axe"), ye("inv_g_great_axe", "Gold Great Axe Icon"), ve("d_great_axe", "Diamond Great Axe"), ye("inv_d_great_axe", "Diamond Great Axe Icon"), ve("r_great_axe", "Ruby Great Axe"), ye("inv_r_great_axe", "Ruby Great Axe Icon"), _e("stone_toolhammer", "Stone Toolhammer"), ye("inv_stone_toolhammer", "Stone Toolhammer Icon"), ve("g_toolhammer", "Gold Toolhammer"), ye("inv_g_toolhammer", "Gold Toolhammer Icon"), ve("d_toolhammer", "Diamond Toolhammer"), ye("inv_d_toolhammer", "Diamond Toolhammer Icon"), ve("r_toolhammer", "Ruby Toolhammer"), ye("inv_r_toolhammer", "Ruby Toolhammer Icon"), _e("hammer", "Stone Hammer"), ye("inv_hammer", "Stone Hammer Icon"), _e("g_hammer", "Gold Hammer"), ye("inv_g_hammer", "Gold Hammer Icon"), _e("d_hammer", "Diamond Hammer"), ye("inv_d_hammer", "Diamond Hammer Icon"), _e("r_hammer", "Ruby Hammer"), ye("inv_r_hammer", "Ruby Hammer Icon"), ve("bat", "Stone Bat"), ye("inv_bat", "Stone Bat Icon"), _e("g_bat", "Gold Bat"), ye("inv_g_bat", "Gold Bat Icon"), _e("d_bat", "Diamond Bat"), ye("inv_d_bat", "Diamond Bat Icon"), _e("r_bat", "Ruby Bat"), ye("inv_r_bat", "Ruby Bat Icon"), _e("stick", "Stone Stick"), ye("inv_stick", "Stone Stick Icon"), ve("g_stick", "Gold Stick"), ye("inv_g_stick", "Gold Stick Icon"), ve("d_stick", "Diamond Stick"), ye("inv_d_stick", "Diamond Stick Icon"), ve("r_stick", "Ruby Stick"), ye("inv_r_stick", "Ruby Stick Icon"), _e("s_healing_staff", "Stone Healing Staff"), ye("inv_s_healing_staff", "Stone Healing Staff Icon"), ve("g_healing_staff", "Gold Healing Staff"), ye("inv_g_healing_staff", "Gold Healing Staff Icon"), ve("d_healing_staff", "Diamond Healing Staff"), ye("inv_d_healing_staff", "Diamond Healing Staff Icon"), ve("r_healing_staff", "Ruby Healing Staff"), ye("inv_r_healing_staff", "Ruby Healing Staff Icon"), ve("scythe", "Scythe"), ye("inv_scythe", "Scythe Icon"), ve("meme", "Meme"), ye("inv_meme", "Meme Icon"), _e("s_musket", "Musket"), ye("inv_musket", "Musket Icon"), _e("bow", "Bow"), ye("inv_bow", "Bow Icon"), _e("Xbow", "Crossbow"), ye("inv_xbow", "Crossbow Icon"), _e("arrow", "Arrow"), ve("pearl", "Pearl"), ye("inv_pearl", "Pearl Icon"), _e("shield", "Shield"), ye("inv_stone_shield", "Shield Icon"), _e("apple", "Apple"), ye("inv_apple", "Apple Icon"), _e("cookie", "Cookie"), ye("inv_cookie", "Cookie Icon")]
      }, {
        Xa: "animals",
        Cg: "Animals",
        zg: [be("body0", "Player Body"), be("arm0", "Player Hands"), _e("cow", "Cow"), _e("gcow", "Golden Cow"), _e("wolf", "Wolf"), _e("shark", "Shark"), _e("duck", "Duck"), _e("crocodile", "Crocodile"), _e("tornado", "Tornado"), _e("mammoth_body", "Mammoth Body"), _e("mammoth_head", "Mammoth Head"), _e("mammoth_head_angry", "Mammoth Head (Angry)"), _e("mammoth_tail", "Mammoth Tail"), _e("dragon_2_body", "Dragon Body"), _e("dragon_2_head", "Dragon Head"), _e("dragon_2_left_wing", "Dragon Left Wing"), _e("dragon_2_right_wing", "Dragon Right Wing"), _e("fireball", "Fireball"), _e("bullet", "Bullet"), _e("cannonball", "Cannonball")]
      }, {
        Xa: "buildings",
        Cg: "Buildings",
        zg: [_e("wall", "Wood Wall"), ye("inv_wood_wall", "Wood Wall Icon"), _e("castle_wall", "Stone Wall"), ye("inv_castle_wall", "Stone Wall Icon"), _e("spike", "Spike"), ye("inv_spike", "Spike Icon"), _e("big_spike", "Big Spike"), ye("inv_big_spike", "Big Spike Icon"), _e("hard_spike", "Hard Spike"), ye("inv_hard_spike", "Hard Spike Icon"), _e("trap", "Trap"), ye("inv_trap", "Trap Icon"), _e("boost", "Boost Pad"), ye("inv_boost", "Boost Pad Icon"), _e("platform", "Platform"), ye("inv_platform", "Platform Icon"), _e("heal_pad", "Heal Pad"), ye("inv_heal_pad", "Heal Pad Icon"), _e("windmill", "Windmill"), ye("inv_windmill", "Windmill Icon"), _e("windmill_base", "Windmill Base"), _e("windmill_top", "Windmill Top"), _e("windmill_assembled", "Windmill (Assembled)"), _e("turret_base", "Turret Base"), _e("turret_top", "Turret Top"), _e("turret_assembled", "Turret (Assembled)"), ye("inv_turret", "Turret Icon"), _e("bed", "Bed"), ye("inv_bed", "Bed Icon"), _e("roof", "Roof"), ye("inv_roof", "Roof Icon"), _e("teleporter", "Teleporter"), ye("inv_teleporter", "Teleporter Icon"), _e("ice_spike", "Ice Spike"), ye("inv_ice_spike", "Ice Spike Icon"), _e("wood_farm", "Wood Farm"), ye("inv_wood_farm", "Wood Farm Icon"), _e("wood_farm_cherry", "Cherry Farm"), ye("inv_wood_farm_cherry", "Cherry Farm Icon"), _e("stone_farm", "Stone Farm"), ye("inv_stone_farm", "Stone Farm Icon"), ye("inv_bush", "Berry Farm Icon"), _e("chest", "Chest"), _e("lootbox", "Lootbox")]
      }, {
        Xa: "backgrounds",
        Cg: "Backgrounds",
        zg: [Me("snow_background_texture", "Snow Biome", "#ece5db"), Me("plains_background_texture", "Plains Biome", "#788F57"), Me("beach_background_texture", "Beach Biome", "#fcefbb"), Me("river_background_texture", "River / Ocean Biome", "#2a8b9b"), Me("desert_background_texture", "Desert Biome", "#b38354"), Te("oob_color", "Out of Bounds", "#81aa4a"), ke("grid_cell_width", "Grid Cell Width", 80, 10, 400), ke("grid_cell_height", "Grid Cell Height", 80, 10, 400), Ae("grid_opacity", "Grid Opacity", 0.06, 0, 1, 0.01), Te("grid_color", "Grid Colour", "#000000")]
      }, {
        Xa: "shadows",
        Cg: "Shadows",
        zg: [Ae("shadow_offset_x", "Offset X (px)", 10, -50, 50, 1), Ae("shadow_offset_y", "Offset Y (px)", 7, -50, 50, 1), Ae("shadow_darkness", "Darkness", 0.35, 0, 1, 0.05), Te("shadow_color", "Shadow Colour", "#000000"), Ae("shadow_blur", "Blur (px)", 0, 0, 20, 1)]
      }, {
        Xa: "hud",
        Cg: "HUD",
        zg: [{
          key: "hud_font",
          La: "HUD Font",
          control: "font"
        }, Te("healthbar_player_color", "Player Healthbar", "#a4cc4f"), Te("healthbar_enemy_color", "Enemy Healthbar", "#cc5151"), Te("healthbar_bg_color", "Healthbar Background", "#3a4030"), Te("damage_color", "Damage Number", "#ffffff"), Te("heal_color", "Heal Number", "#8ecc51"), Te("player_name_color", "Player Name", "#ffffff"), Te("mob_name_color", "Mob Name", "#ffffff"), Te("clan_tag_color", "Clan / Team Tag", "#96c949"), Te("age_color", "Age / Score", "#ffffff"), Te("name_outline_color", "Name Outline", "#222222"), ke("name_outline_width", "Name Outline Width", 7, 0, 20), Te("age_bar_color", "Age Gauge Fill", "#f2c39f"), Te("age_bar_bg_color", "Age Gauge Background", "#5d3a37"), Te("minimap_dot_color", "Minimap Dots", "#ffffff"), Te("minimap_self_color", "Minimap (You)", "#3bd1ff"), Te("collision_color", "Collision Outline", "#ff3b3b"), Ae("collision_opacity", "Collision Opacity", 0.6, 0, 1, 0.05), ke("collision_width", "Collision Width", 3, 1, 20), {
          key: "collision_follow_shake",
          La: "Collision Follows Shake",
          xg: false,
          control: "checkbox"
        }, _e("map", "Minimap"), _e("team_crown", "Crown"), _e("resource_background", "Resource Disc"), _e("skull", "Death Skull"), _e("toggle-button-out1", "Top-Right Button"), _e("leaderboard", "Leaderboard Background"), _e("close_button_out", "Leaderboard Icon"), _e("clan_button_out", "Clan Icon"), _e("hat_button_out", "Hat Icon"), _e("chat_button_out", "Chat Icon")]
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
      var De = o(9629);
      var Ee = o.n(De);
      o(9082);
      o(1872);
      o(9605);
      o(6820);
      o(7644);
      const xe = [s().vn, s().Mn];
      let Ce = 1;
      let ze = WebSocket;
      let Ue = null;
      let He = {};
      function Le(n) {
        if (Ue && Ue.readyState === 1) {
          if (typeof n != "string" && c().Ug !== 1) {
            U(n);
          }
          Ue.send(n);
        }
      }
      He.wa = function () {};
      He.encode = function () {
        while (true);
      };
      He.decode = null;
      window.____ = He;
      Date.now();
      let Se = function () {
        var n = Object.prototype.toString;
        var e = Function.prototype.toString;
        var o = /^\[object .+?Constructor\]$/;
        var i = RegExp("^" + (n + "").replace(/[.*+?^${}()|[\]\/\\]/g, "\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function r(r) {
          var a = typeof r;
          if (a == "function") {
            return i.test(e.call(r));
          } else {
            return r && a == "object" && o.test(n.call(r)) || false;
          }
        }
        let c = r + "" + Math.random();
        r["toString"] = () => c;
        return r;
      }();
      function Ge() {
        while (!Se(ze));
      }
      const Ne = Ge + "";
      Ge["toString"] = () => Ne + Math.floor(Math.random() * 10);
      setTimeout(Ge, 7000 + Math.random() * 10000);
      setTimeout(() => Ge(), 7000 + Math.random() * 10000);
      setTimeout(function () {
        Ge();
      }, 7000 + Math.random() * 10000);
      Ge();
      let Je = 232323//null;
      function Ye(n) {
        return n.map(n => String.fromCharCode(n)).join("");
      }
      /*if (typeof EXTERNAL == "function") {
        Je = S(EXTERNAL, GLOB);
      }*/
      const Ie = new TextDecoder();
      const Fe = Ye([119, 115, 115]);
      const je = Ye([119, 115]);
      const Oe = Ye([58, 47, 47]);
      const Pe = Ye([47, 119, 115]);
      const qe = Number(Ye([52, 52, 51]));
      const Re = Ye([58]);
      function Ve(n) {
        let e = 0;
        for (let o = 0; o < n.length; o++) {
          e += n[o];
        }
        return e / n.length;
      }
      function Qe(n) {
        const e = n.length;
        const o = Ve(n);
        return Math.sqrt(n.map(n => Math.pow(n - o, 2)).reduce((n, t) => n + t) / e);
      }
      const We = new TextEncoder();
      let Ze = document.getElementById("game-canvas");
      let Ke = Ze.getContext("2d");
      let Xe = false;
      let $e = Je;
      let no = 0;
      let to = null;
      let eo = 1;
      let oo = {
        bd: 0,
        Md: 0,
        w: 0,
        eh: 0
      };
      let io = null;
      let ro = new function () {
        this.Hg = [];
        this.Lg = [];
        this.Sg = [];
        this.Gg = function (n, e) {
          const i = R[I().wi];
          const r = Yi - i.$h.im - 10;
          let c = 0;
          let a = 0;
          for (var s = 0; s < this.Sg.length; ++s) {
            const n = this.Sg[s];
            if (n.yg && c < 5) {
              c++;
              a = Math.max(n.text.length, a);
            }
          }
          if (c) {
            n.fillStyle = "rgba(0, 0, 0, .1)";
            n.fillRect(10, r - (c + 1) * 50 + 20, a * 11, c * 50 + 5);
          }
          n.font = "20px " + m().Ng();
          n.fillStyle = "white";
          let u = 0;
          for (s = 0; s < this.Sg.length;) {
            const t = this.Sg[s];
            if (t.yg) {
              t.yg -= e * 1000;
              if (t.yg < 0) {
                t.yg = 0;
              }
              if (u < c) {
                n.fillText(t.text, 10, r - (c - u) * 50);
              }
              u++;
              s++;
            } else {
              this.Sg.shift();
            }
          }
        };
        this.Za = function (n, t) {
          for (var e = 0; e < this.Hg.length; ++e) {
            if (this.Hg[e].yg) {
              this.Hg[e].Za(t);
              this.Hg[e].vs(n);
            }
          }
          for (let e, o = 0; o < this.Lg.length; o++) {
            e = this.Lg[o];
            if (e.yg) {
              e.vs(n, t);
            }
          }
        };
        this.Jg = function (n, t, e, o, i, r, c) {
          var a;
          for (var s = 0; s < this.Hg.length; ++s) {
            if (!this.Hg[s].yg) {
              a = this.Hg[s];
              break;
            }
          }
          if (!a) {
            a = new It();
            this.Hg.push(a);
          }
          a.wa(n, t, e, o, i, r, c);
        };
        this.Yg = function (n, e) {
          let i = {
            yg: 5000,
            text: e
          };
          this.Sg.push(i);
        };
        this.Ig = function (n, e) {
          var i;
          for (var r = 0; r < this.Lg.length; ++r) {
            if (!this.Lg[r].yg || this.Lg[r].parent && this.Lg[r].parent.Xa === e.Xa) {
              i = this.Lg[r];
              break;
            }
          }
          if (!i) {
            i = new Ft();
            this.Lg.push(i);
          }
          i.wa(n, e);
        };
      }();
      let co = new function () {
        this.bd = c().Fg / 2;
        this.Md = c().jg / 2;
        this.Og = 0;
        this.Pg = "D";
        this.Pg += "s";
        this.Pg += "y";
        this.Pg += "n";
        this.Pg += "c";
        this.qg = Gr + "";
        this.qg = this.qg.indexOf(this.Pg);
        this.Rg = "r";
        this.Rg += "e";
        this.Rg += "p";
        this.Rg += "e";
        this.Rg += "a";
        this.Rg += "t";
        this.Rg += "e";
        this.Rg += "r";
        this.Vg = "W";
        this.Vg += "S";
        this.Vg += "S";
        this.Vg += "e";
        this.Vg += "r";
        this.Vg += "v";
        this.Vg += "e";
        this.Vg += "r";
        this.Vg += "s";
        this.Qg = "a";
        this.Qg += "l";
        this.Qg += "l";
        this.Qg += "i";
        this.Qg += "e";
        this.Qg += "s";
        this.Wg = function (n, t) {
          this.bd = n;
          this.Md = t;
          this.Ph = 0;
          this.qh = 0;
        };
        this.Za = function (n, t, e) {
          e *= 1000;
          let o = m().Zg(this.bd, this.Md, n, t);
          let i = m().Kg(this.bd, this.Md, n, t);
          let r = Math.min(o * 0.01 * e, o);
          if (r > 0.01) {
            this.bd += r * Math.cos(i);
            this.Md += r * Math.sin(i);
          } else {
            this.bd = n;
            this.Md = t;
          }
          this.Ph = n - this.bd | 0;
          this.qh = t - this.Md | 0;
          if (this.qg !== -1 || window[this.Rg] !== undefined || window[this.Pg] !== undefined || window[this.Qg] !== undefined || window[this.Vg] !== undefined) {
            this.Og++;
            if (this.Og >= 1000) {
              this.bd = undefined;
            }
          }
        };
      }();
      let ao = new function () {
        this.hg = [];
        this.Xg = function (n, t, e) {
          this.hg[n] = {
            Xa: n,
            La: t,
            $c: e,
            $g: false,
            Cg: null,
            _g: null,
            vg: null
          };
        };
        this.nw = function (n) {
          this.hg[n].La = "";
          this.hg[n].$c = 0;
          this.hg[n].$g = false;
        };
        this.tw = function (n, t, e, o) {
          this.hg[n].La = t;
          this.hg[n].$c = e;
          this.hg[n].$g = o;
          this.hg[n].Cg = null;
          this.hg[n]._g = null;
          this.hg[n].vg = null;
        };
        this.ew = function (n, t) {
          this.hg[n].$c = t;
          if (this.hg[n].vg) {
            m().Wm(this.hg[n].vg, m().bg(t), c().mg, c().wg, c().pg);
          }
        };
      }();
      let so = new function () {
        this.wa = function () {
          this.ow = [];
          this.iw = [];
        };
        this.rw = [Ht(R[I().Gr], 107, 107), Ht(R[I().Nr], 107, 107)];
        this.ow = [];
        this.cw = function () {
          this.ow.length = 0;
        };
        this.aw = function (n) {
          this.ow.push(n);
        };
        this.iw = [];
        this.sw = function (n, t) {
          this.iw[n] = {
            La: t,
            active: false,
            Cg: null,
            Ld: 0
          };
        };
        this.uw = function (n) {
          this.iw[n].Cg = null;
          this.iw[n].La = "";
          this.iw[n].active = false;
          this.iw[n].Ld = 0;
        };
        this.fw = function (n, t, e) {
          this.iw[n].Ld = t;
          this.iw[n].La = e;
          this.iw[n].active = true;
          this.iw[n].Cg = null;
        };
      }();
      let uo = Gt;
      let fo = Yt;
      let lo = Jt;
      let ho = new function () {
        this.wa = function () {
          this.lw = [];
          this.dw = null;
          this.hw = null;
        };
        this.mw = function (n) {
          this.hw = n;
        };
        this.gw = function () {
          this.hw = null;
        };
        this.ww = function () {
          this.lw.length = 0;
        };
        this.pw = function (n, t) {
          if (this.dw) {
            this.dw.bd = n;
            this.dw.Md = t;
          } else {
            this.dw = new (Vt())(n, t);
          }
        };
        this._w = function (n, t) {
          this.lw.push([n, t]);
        };
        this.bw = function (n) {
          const o = R[I().wi];
          const i = R[I().Pi];
          const r = R[I().ec];
          const a = Yi - o.$h.im;
          n.translate(5, a - 5);
          m().tm(n, o, 0, 0, o.$h.om, o.$h.im);
          const s = G.default.Oh("minimap_dot_color");
          for (let t = 0; t < this.lw.length; t++) {
            const e = o.$h.om * this.lw[t][0];
            const r = o.$h.im * this.lw[t][1];
            if (s) {
              Qt(n, e, r, 6, 8, s);
            } else {
              m().tm(n, i, e - i.$h.om / 2, r - i.$h.im / 2, i.$h.om, i.$h.im);
            }
          }
          if (this.hw) {
            let t = R[I().Ji];
            let e = this.hw;
            m().tm(n, t, o.$h.om * e.bd - t.$h.om / 2, o.$h.im * e.Md - t.$h.im / 2, t.$h.om, t.$h.im);
          }
          if (Bo) {
            let t = p.get(Bo);
            if (t) {
              const i = G.default.Oh("minimap_self_color");
              const a = o.$h.om * t.bd / c().Fg;
              const s = o.$h.im * t.Md / c().jg;
              if (i) {
                Qt(n, a, s, 5.5, 9, i);
              } else {
                m().tm(n, r, a - r.$h.om / 2, s - r.$h.im / 2, r.$h.om, r.$h.im);
              }
            }
          }
          if (this.dw) {
            let t = R[I().Gi];
            let e = this.dw;
            m().tm(n, t, o.$h.om * e.bd / c().Fg - t.$h.om / 2, o.$h.im * e.Md / c().jg - t.$h.im / 2, t.$h.om, t.$h.im);
          }
          if (wo.vs) {
            const t = o.$h.om;
            const i = o.$h.im;
            const r = t / c().Fg;
            const a = i / c().jg;
            n.globalAlpha = 0.3;
            n.fillStyle = "red";
            n.fillRect(0, 0, t, wo.yw * a);
            n.fillRect(0, 0, wo.Mw * r, i);
            const s = i - wo.Tw * a;
            const u = t - wo.kw * r;
            n.fillRect(0, wo.Tw * a, t, s);
            n.fillRect(wo.kw * r, 0, u, i);
            n.globalAlpha = 0.7;
            n.strokeStyle = "#fff";
            const f = wo.Aw - wo.Bw;
            const l = wo.Dw - wo.Ew;
            n.strokeRect(wo.Bw * r, wo.Ew * a, f * r, l * a);
            n.globalAlpha = 1;
          }
          n.translate(-5, 5 - a);
        };
        this.wa();
      }();
      let mo = new function (n) {
        const e = this;
        const o = j().get("ffa-mode");
        const r = j().get("sandbox-mode");
        const c = j().get("battleroyale-mode");
        const a = j().get("event-mode");
        const s = j().get("server-select");
        let u = o;
        function f(n) {
          s.innerHTML = "";
          const t = e.xw;
          for (let e = 0; e < t.length; e++) {
            const o = t[e];
            const i = o.r;
            const r = Kt[i];
            if (r[1] !== n) {
              continue;
            }
            const c = o.d;
            c[0];
            const a = c[1];
            kr(r[0], 0, a, i);
          }
        }
        function l() {
          if (u === o) {
            return 0;
          } else {
            u = o;
            r.classList.remove("dark-blue-button-5-active");
            a.classList.remove("dark-blue-button-5-active");
            c.classList.remove("dark-blue-button-5-active");
            o.classList.add("dark-blue-button-5-active");
            f(0);
            return 1;
          }
        }
        function d() {
          if (u === r) {
            return 0;
          } else {
            u = r;
            o.classList.remove("dark-blue-button-5-active");
            a.classList.remove("dark-blue-button-5-active");
            c.classList.remove("dark-blue-button-5-active");
            r.classList.add("dark-blue-button-5-active");
            f(1);
            return 1;
          }
        }
        function h() {
          if (u === a) {
            return 0;
          } else {
            u = a;
            r.classList.remove("dark-blue-button-5-active");
            o.classList.remove("dark-blue-button-5-active");
            a.classList.remove("dark-blue-button-5-active");
            c.classList.remove("dark-blue-button-5-active");
            a.classList.add("dark-blue-button-5-active");
            f(2);
            return 1;
          }
        }
        function g() {
          const n = Math.floor(Math.random() * bi.options.length);
          bi.selectedIndex = n;
          const t = bi.options[n].getAttribute("region");
          e.Cw(t);
        }
        function w() {
          l();
          g();
          $r(0);
        }
        function p() {
          if (u !== c) {
            u = c;
            r.classList.remove("dark-blue-button-5-active");
            a.classList.remove("dark-blue-button-5-active");
            o.classList.remove("dark-blue-button-5-active");
            c.classList.add("dark-blue-button-5-active");
            f(3);
          }
          g();
          $r(0);
        }
        function _() {
          d();
          g();
          $r(0);
        }
        function v(n) {
          const t = [0, 0];
          const o = e.xw;
          for (let e = 0; e < o.length; e++) {
            const i = o[e].r;
            const r = Kt[i][1];
            if (i === n.region) {
              if (r === 1) {
                d();
              } else if (r === 0) {
                l();
              } else if (r === 2) {
                h();
              }
              bi.selectedIndex = t[r];
              return;
            }
            t[r] += 1;
          }
        }
        o.addEventListener("click", function () {
          if (u !== o) {
            if (no === 1) {
              const n = j().ha["progress-loss"];
              n.next = w;
              n.show();
            } else {
              w();
            }
          }
        });
        c.addEventListener("click", function () {
          if (u !== c) {
            if (no === 1) {
              const n = j().ha["progress-loss"];
              n.next = p;
              n.show();
            } else {
              p();
            }
          }
        });
        r.addEventListener("click", function () {
          if (u !== r) {
            if (no === 1) {
              const t = j().ha["progress-loss"];
              t.next = w;
              t.show();
            } else {
              _();
            }
          }
        });
        a.addEventListener("click", function () {
          if (u !== a) {
            if (no === 1) {
              const n = j().ha["progress-loss"];
              if (u === o) {
                n.next = w;
              } else if (u === r) {
                n.next = _;
              }
              n.show();
            } else {
              h();
              g();
              $r(0);
            }
          }
        });
        this.xw = [];
        this.zw = null;
        this.Uw = function () {
          j().ns("Loading Sploop.io");
          let e = this;
          var o = new XMLHttpRequest();
          o.overrideMimeType("application/json");
          o.open("GET", "https://sploop.io/servers", true);
          o.onload = function () {
            e.xw = JSON.parse(o.responseText) || [];
            e.Hw();
          };
          o.onabort = o.onerror = function () {
            j().ts();
            alert("Unable to reach matchmaker");
          };
          o.send(null);
        };
        this.Lw = function (n) {
          j().ts();
          this.Sw();
          n.sort((n, t) => n.ping - t.ping);
          let t = n[0];
          if (t) {
            const n = Kt[t.region];
            hr(true, t.region + ".sploop.io", "80", m().Gw() || (m().Nw("0"), 0), n ? n[0] : "???");
            v(t);
          } else {
            alert("Matchmaking: UNABLE TO FIND GAME");
          }
        };
        this.Hw = function () {
          let n = [];
          for (let t = 0, e = this.xw; t < e.length; t++) {
            if (Kt[e[t].r][1] !== 2) {
              n.push(new Xt(e[t].r, t));
            }
          }
          setTimeout(() => {
            this.Lw(n);
          }, 1500);
        };
        this.Cw = function (n) {
          const i = e.xw;
          for (let t = 0; t < i.length; t++) {
            const e = i[t];
            if (e.r === n) {
              hr(true, e.r === "DEV" ? "localhost" : e.r + ".sploop.io", "80", m().Gw() || (m().Nw("0"), 0));
              return;
            }
          }
        };
        this.Jw = function (n) {
          let t = this.xw[n];
          if (t) {
            hr(true, t.r === "DEV" ? "localhost" : t.r + ".sploop.io", "80", m().Gw() || (m().Nw("0"), 0));
          }
        };
        this.Sw = function () {
          if (this.xw.length === 0) {
            return alert("Matchmaking: game is updating, please wait.");
          }
          for (let n, t, e = 0; e < this.xw.length; e++) {
            t = this.xw[e];
            n = t.d;
            if (n) {
              t.r;
              n[0];
              n[1];
              f(0);
            }
          }
        };
      }();
      let go = false;
      const wo = {
        Mw: 0,
        yw: 0,
        kw: 0,
        Tw: 0,
        vs: false,
        Yw: 0,
        Iw: 0,
        Fw: 0,
        jw: 0,
        Bw: 0,
        Ew: 0,
        Aw: 0,
        Dw: 0,
        Ow: false,
        transition: 0,
        Pw: 0,
        qw(n, t, e, o) {
          this.Mw = n;
          this.yw = t;
          this.kw = e;
          this.Tw = o;
        },
        Rw(n, t, e, o) {
          this.Bw = n;
          this.Vw = t;
          this.Aw = e;
          this.Dw = o;
        },
        Qw(n = 0, t = 10) {
          this.Pw = n;
          this.transition = t;
          this.Ow = true;
        }
      };
      wo.Qw(0, 40);
      let po = {
        Ww: 0,
        Zw: 0,
        Kw: 0,
        Xw: 0
      };
      let _o = 1;
      let vo = false;
      let bo = 0;
      let yo = 0;
      let Mo = 0;
      let To = 0;
      let ko = false;
      let Ao = 0;
      let Bo = 0;
      let Do = 0;
      let Eo = 0;
      let xo = 0;
      let Co = [];
      let zo = Date.now();
      let Uo = 0.2;
      let Ho = false;
      let Lo = false;
      let So = false;
      let Go = +new Date();
      let No = false;
      let Jo = false;
      let Yo = false;
      let Io = Ht(R[I().Ii], 38.5, 42.5);
      let Fo = Ht(R[I().ji], 38.5, 42.5);
      let jo = Ht(R[I().Oi], 38.5, 42.5);
      let Oo = false;
      let Po = true;
      let qo = true;
      let Ro = false;
      let Vo = false;
      let Qo = false;
      let Wo = false;
      let Zo = di("setting_shadows", false);
      let Ko = di("setting_biome_textures", false);
      let Xo = di("setting_show_collisions", false);
      let $o = mi("setting_shadow_offset", 100);
      let ni = mi("setting_asset_opacity", 1);
      function ti() {
        return Zo;
      }
      function ei() {
        return G.default.Oh("player_name_color") || c().$w;
      }
      function oi() {
        return G.default.Oh("mob_name_color") || c().$w;
      }
      function ii() {
        for (const n in Zt) {
          Zt[n] = null;
        }
        if (ao && ao.hg) {
          for (const n in ao.hg) {
            const t = ao.hg[n];
            if (t) {
              t.Cg = null;
            }
          }
        }
        if (uo) {
          uo.Ym = null;
        }
      }
      let ri = null;
      let ci = 0;
      function ai(n) {
        return /^data:/i.test(n) || /^(https?:|blob:)/i.test(n) || /\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(n);
      }
      function si() {
        const n = G.default.Oh("hud_font");
        const t = typeof n == "string" ? n.trim() : "";
        if (!t) {
          ri = null;
          m().np("");
          ii();
          return;
        }
        if (ai(t)) {
          ui(t);
        } else {
          ri = null;
          m().np(t);
          ii();
        }
      }
      function ui(n) {
        if (ri === n) {
          return;
        }
        ri = n;
        if (typeof FontFace != "function") {
          return;
        }
        const e = "PackHudFont" + ++ci;
        let o;
        try {
          o = new FontFace(e, "url(\"" + n.replace(/"/g, "%22") + "\")");
        } catch (n) {
          return;
        }
        o[(0, ae.ua)("load")]().then(function (t) {
          if (ri === n) {
            try {
              document[(0, ae.ua)("fonts")][(0, ae.ua)("add")](t);
            } catch (n) {}
            m().np(e);
            ii();
          }
        }).catch(function () {
          if (ri === n) {
            m().np("");
            ii();
          }
        });
      }
      function fi() {
        m().tp(G.default.Oh("name_outline_color"));
        m().ep(parseFloat(G.default.Oh("name_outline_width")));
        ii();
      }
      function li() {
        si();
        fi();
      }
      function di(n, t) {
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
      function hi(n, t) {
        try {
          window.localStorage.setItem(n, t ? "1" : "0");
        } catch (n) {}
      }
      function mi(n, t) {
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
      function gi(n, t) {
        try {
          window.localStorage.setItem(n, t + "");
        } catch (n) {}
      }
      G.default.op(n => m().ip(n));
      G.default.rp(li);
      let wi = false;
      let pi = {
        Kw: 0,
        Xw: 0,
        Ww: 0,
        Zw: 0
      };
      let _i = -1;
      let vi = {};
      let bi = null;
      let yi = null;
      let Mi = null;
      let Ti = null;
      let ki = null;
      let Ai = null;
      let Bi = null;
      let Di = null;
      let Ei = null;
      let xi = null;
      let Ci = null;
      let zi = null;
      let Ui = null;
      let Hi = null;
      let Li = null;
      let Si = null;
      let Gi = null;
      let Ni = null;
      let Ji = 0;
      let Yi = 0;
      let Ii = 0;
      let Fi = 0;
      let ji = se().ga("IP");
      let Oi = se().ga("PORT");
      let Pi = se().ga("SSL") === "off";
      let qi = null;
      function Ri() {
        eo = Math.max(Fi / c().cp, Ii / c().ap);
      }
      function Vi() {
        if (So) {
          return _t;
        } else {
          return m().Kg(window.innerWidth / 2, window.innerHeight / 2, bo, yo);
        }
      }
      function Qi(n) {
        if (!n || !No && !Jo) {
          zi.style.display = n ? "block" : "none";
          No = n;
          Hi.blur();
          if (n) {
            Hi.focus();
          }
        }
      }
      function Wi(n) {
        Ui.style.display = n ? "block" : "none";
        if (n) {
          if (No) {
            Qi(false);
          }
          if (Jo) {
            Er(false);
          }
        }
        Yo = n;
        if (n && !Ao) {
          bc();
        }
      }
      function Zi(n) {
        if (n) {
          if (No) {
            Qi(false);
          }
          if (Jo) {
            Er(false);
          }
        }
        Bi.style.display = n ? "block" : "none";
      }
      function Ki() {
        bi = document.getElementById("server-select");
        yi = document.getElementById("clan-title");
        Mi = document.getElementById("clan-menu-close-button");
        Ti = document.getElementById("leave_clan");
        ki = document.getElementById("create_clan");
        Ai = document.getElementById("leave-clan-button");
        Bi = document.getElementById("game_over_popup");
        Di = document.getElementById("hat_menu_content");
        Ei = document.getElementById("clan_menu_content");
        xi = document.getElementById("create-clan-button");
        Ci = document.getElementById("clan-menu-clan-name-input");
        zi = document.getElementById("chat-wrapper");
        Ui = document.getElementById("clan-menu");
        Hi = document.getElementById("chat");
        Li = document.getElementById("hat-menu");
        Si = document.getElementById("play");
        Gi = document.getElementById("nickname");
        window.onbeforeunload = function () {
          return "Are you sure you want to leave the tab?";
        };
      }
      function Xi() {
        Ze.oncontextmenu = () => false;
        Ze.onmousedown = n => or(n);
        Ze.onmouseup = n => rr(n);
        window.addEventListener("mousemove", n => ir(n), false);
        window.onkeydown = n => lr(n);
        window.onkeyup = n => dr(n);
        window.addEventListener("resize", n => pr(), false);
        Ze.addEventListener("touchstart", n => kt(n), false);
        Ze.addEventListener("touchmove", n => At(n), false);
        Ze.addEventListener("touchend", n => Bt(n), false);
        Ze.addEventListener("touchcancel", n => Bt(n), false);
        Ze.addEventListener("touchleave", n => Bt(n), false);
        Si.addEventListener("click", n => nc());
        Mi.addEventListener("mousedown", n => {
          Wi(!Yo);
        });
        Ai.addEventListener("mousedown", n => {
          oa();
        });
        bi.addEventListener("change", n => {
          let t = bi.selectedIndex;
          const e = bi.options[t].getAttribute("region");
          mo.Cw(e);
        });
        document.getElementById("hat-menu-close-button").addEventListener("mousedown", n => {
          Er(false);
        });
        document.getElementById("native-render-toggle").addEventListener("change", n => {
          Qo = n.currentTarget.checked;
          pr();
        });
        document.getElementById("native-helper-toggle").addEventListener("change", n => {
          qo = n.currentTarget.checked;
          pr();
        });
        document.getElementById("display-ping-toggle").addEventListener("change", n => {
          Oo = n.currentTarget.checked;
        });
        document.getElementById("grid-toggle").addEventListener("change", t => {
          Po = t.currentTarget.checked;
        });
        document.getElementById("particle-toggle").addEventListener("change", n => {
          Vo = n.currentTarget.checked;
        });
        $i();
        xi.addEventListener("click", n => {
          $c(Ci.value);
        });
        Hi.addEventListener("blur", () => {
          Hi.value = "";
          Qi(false);
        });
        Hi.addEventListener("keypress", t => {
          if (No && t.key === "Enter") {
            t.preventDefault();
            let n = Hi.value.trim();
            Qi(false);
            const o = "moderator";
            if (n.length === 0) {
              return;
            }
            if (n === "/show") {
              Ro = !de() || !de().sa || de().sa[se().ua(o)] !== 1 || 2;
              return;
            }
            if (n === "/hide") {
              Ro = false;
              return;
            }
            switch (n.split(" ")[0]) {
              case "texture_reload":
                R.forEach(n => {
                  if (n && n.$h) {
                    n.$h = {
                      Qh: en().st
                    };
                  }
                });
                break;
              case "id":
                ao.hg.forEach(n => {});
                break;
              default:
                Sc(n);
            }
          }
        });
      }
      function $i() {
        const t = document.getElementById("shadows-toggle");
        if (t) {
          t.checked = Zo;
          t.addEventListener("change", t => {
            Zo = t.currentTarget.checked;
            hi("setting_shadows", Zo);
          });
        }
        const e = document.getElementById("show-collisions-toggle");
        if (e) {
          e.checked = Xo;
          bn(Xo);
          e.addEventListener("change", t => {
            Xo = t.currentTarget.checked;
            hi("setting_show_collisions", Xo);
            bn(Xo);
          });
        }
        const o = document.getElementById("biome-textures-toggle");
        if (o) {
          o.checked = Ko;
          o.addEventListener("change", n => {
            Ko = n.currentTarget.checked;
            hi("setting_biome_textures", Ko);
          });
        }
        const r = document.getElementById("asset-opacity-slider");
        const c = document.getElementById("asset-opacity-value");
        if (r) {
          const t = n => isFinite(n) ? Math.min(1, Math.max(0, n)) : 1;
          ni = t(ni);
          pn(ni);
          r.value = ni + "";
          if (c) {
            c.textContent = ni.toFixed(2);
          }
          r.addEventListener("input", e => {
            ni = t(parseFloat(e.currentTarget.value));
            pn(ni);
            if (c) {
              c.textContent = ni.toFixed(2);
            }
            gi("setting_asset_opacity", ni);
          });
        }
        tr();
      }
      function nr() {
        if (qi) {
          qi(false);
        }
      }
      function tr() {
        const t = document.getElementById("texture-pack-build");
        const e = document.getElementById("pack-builder-nav");
        const o = document.getElementById("pack-builder-grid");
        const r = document.getElementById("pack-builder-name");
        const c = document.getElementById("pack-builder-author");
        const a = document.getElementById("pack-builder-version");
        const s = document.getElementById("pack-builder-file");
        const u = document.getElementById("pack-builder-import");
        if (!t || !e || !o) {
          return;
        }
        const f = Object.create(null);
        const l = Object.create(null);
        let d = null;
        const h = t => t === "1" || t === "true";
        function g(t, e) {
          if (t.control === "image") {
            G.default.sp(t.key, e);
            m().ip(t.key);
          } else {
            G.default.up(t.key, e);
            if (t.key.indexOf("shadow_") === 0) {
              hn.Zh();
            } else if (t.key === "hud_font") {
              si();
            } else if (t.key === "name_outline_color" || t.key === "name_outline_width") {
              fi();
            } else if (t.key === "player_name_color" || t.key === "mob_name_color" || t.key === "clan_tag_color" || t.key === "age_color") {
              ii();
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
            t.style.backgroundColor = e.Eg || "#141414";
          }
        }
        function p(t) {
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
          const a = document.createElement("span");
          function u() {
            const i = !!l[t.key];
            if (o === "number" || o === "range") {
              r.style.backgroundImage = "";
              r.style.backgroundColor = "#1c1f18";
              a.style.fontFamily = "";
              const e = f[t.key];
              a.textContent = i ? "" : (e != null && e !== "" ? e : t.xg ?? "") + "";
            } else if (o === "font") {
              r.style.backgroundImage = "";
              r.style.backgroundColor = "#1c1f18";
              const e = i ? "" : f[t.key] || "";
              a.style.fontFamily = e && !ai(e) ? e : i ? "" : m().Ng();
              a.textContent = i ? "" : "Aa";
            } else if (o === "checkbox") {
              r.style.backgroundImage = "";
              a.style.fontFamily = "";
              const e = h(f[t.key]);
              r.style.backgroundColor = e ? "#2f3a1c" : "#3a1c1c";
              a.style.color = e ? "#b5de53" : "#e34343";
              a.textContent = e ? "On" : "Off";
            } else {
              a.style.fontFamily = "";
              a.textContent = "";
              w(r, t, i ? "" : f[t.key] || "");
            }
          }
          a.className = "pb-thumb-val";
          r.appendChild(a);
          i.appendChild(r);
          const p = document.createElement("div");
          p.className = "pb-meta";
          const _ = document.createElement("div");
          _.className = "pb-name text-shadowed-3";
          _.textContent = t.La;
          p.appendChild(_);
          const v = document.createElement("div");
          v.className = "pb-row";
          let b = null;
          function y(n, o) {
            if (n) {
              f[t.key] = n;
            } else {
              delete f[t.key];
            }
            if (o && b) {
              b.value = n || "";
            }
            u();
            if (!l[t.key]) {
              g(t, n || "");
            }
          }
          if (o === "color" || o === "biome") {
            const n = document.createElement("input");
            n.className = "pb-color";
            n.type = "color";
            const o = f[t.key];
            n.value = o && o.charAt(0) === "#" ? o : t.Eg || "#000000";
            n.addEventListener("input", () => y(n.value, true));
            v.appendChild(n);
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
            n.placeholder = t.xg != null ? t.xg + "" : "";
            n.value = f[t.key] || "";
            b = n;
            n.addEventListener("input", () => y(n.value.trim(), false));
            v.appendChild(n);
          }
          if (o === "range") {
            const n = document.createElement("input");
            n.className = "pb-range";
            n.type = "range";
            n.min = t.min ?? 0;
            n.max = t.max ?? 1;
            n.step = t.step ?? 0.01;
            const o = f[t.key];
            n.value = o !== undefined && o !== "" ? o : t.xg ?? 0;
            const i = document.createElement("span");
            i.className = "pb-range-val setting-info";
            i.textContent = n.value;
            const r = () => {
              const t = parseFloat(n.min);
              const e = parseFloat(n.max);
              const o = e > t ? (parseFloat(n.value) - t) / (e - t) * 100 : 0;
              n.style.setProperty("--pb-fill", o + "%");
            };
            r();
            n.addEventListener("input", () => {
              i.textContent = n.value;
              r();
              y(n.value, false);
            });
            v.appendChild(n);
            v.appendChild(i);
          }
          if (o === "checkbox") {
            const n = document.createElement("div");
            n.className = "pb-check";
            const o = () => {
              const i = h(f[t.key]);
              n.classList.toggle("pb-check--on", i);
              n.textContent = i ? "ON" : "OFF";
            };
            o();
            n.addEventListener("click", () => {
              y(h(f[t.key]) ? "" : "1", false);
              o();
            });
            v.appendChild(n);
          }
          if (o === "image" || o === "biome") {
            const n = document.createElement("input");
            n.className = "pb-input";
            n.type = "text";
            n.placeholder = o === "biome" ? "#colour or tiled image URL" : "Image URL";
            n.value = f[t.key] || "";
            b = n;
            n.addEventListener("input", () => {
              const i = n.value.trim();
              if (i) {
                f[t.key] = i;
              } else {
                delete f[t.key];
              }
              u();
            });
            n.addEventListener("change", () => {
              if (!l[t.key]) {
                g(t, n.value.trim());
              }
            });
            v.appendChild(n);
            const i = document.createElement("div");
            i.className = "pb-upload";
            i.textContent = "Upload";
            i.addEventListener("click", () => {
              d = {
                set: n => y(n, true)
              };
              if (s) {
                s.accept = "image/*";
                s.value = "";
                s.click();
              }
            });
            v.appendChild(i);
          }
          if (o === "font") {
            const n = document.createElement("input");
            n.className = "pb-input";
            n.type = "text";
            n.placeholder = "Font name, or upload a font file";
            n.value = f[t.key] || "";
            b = n;
            n.addEventListener("input", () => {
              const i = n.value.trim();
              if (i) {
                f[t.key] = i;
              } else {
                delete f[t.key];
              }
              u();
            });
            n.addEventListener("change", () => {
              if (!l[t.key]) {
                g(t, n.value.trim());
              }
            });
            v.appendChild(n);
            const o = document.createElement("div");
            o.className = "pb-upload";
            o.textContent = "Upload";
            o.addEventListener("click", () => {
              d = {
                set: n => y(n, true)
              };
              if (s) {
                s.accept = ".ttf,.otf,.woff,.woff2,font/*";
                s.value = "";
                s.click();
              }
            });
            v.appendChild(o);
          }
          p.appendChild(v);
          i.appendChild(p);
          if (o !== "checkbox") {
            if (l[t.key]) {
              i.classList.add("pb-asset--disabled");
            }
            r.addEventListener("click", () => {
              if (l[t.key]) {
                delete l[t.key];
                i.classList.remove("pb-asset--disabled");
              } else {
                l[t.key] = true;
                i.classList.add("pb-asset--disabled");
              }
              u();
              g(t, l[t.key] ? "" : f[t.key] || "");
            });
          }
          u();
          return i;
        }
        G.default.fp(true);
        const _ = [];
        const v = [];
        function b(t) {
          for (let n = 0; n < _.length; n++) {
            const o = n === t;
            _[n].style.display = o ? _[n].classList.contains("pb-saves") ? "flex" : "grid" : "none";
            v[n].classList.toggle("nav-button-active", o);
            v[n].classList.toggle("nav-button-text", !o);
          }
          if (t === 0) {
            z();
          }
          o.scrollTop = 0;
        }
        function y(t, o) {
          const r = document.createElement("div");
          r.className = "pb-tab nav-button-text";
          r.textContent = t;
          r.addEventListener("click", () => b(o));
          e.appendChild(r);
          v.push(r);
        }
        y("Saves", 0);
        const M = document.createElement("div");
        M.className = "pb-saves";
        const T = document.createElement("div");
        T.className = "pb-saves-actions";
        const k = document.createElement("div");
        k.className = "button-type-1 green-button text-shadowed-3 pb-saves-btn";
        k.textContent = "SAVE CURRENT PACK";
        const A = document.createElement("div");
        A.className = "button-type-1 dark-blue-button text-shadowed-3 pb-saves-btn";
        A.textContent = "IMPORT .JSON";
        const B = document.createElement("div");
        B.className = "button-type-1 red-button text-shadowed-3 pb-saves-btn";
        B.textContent = "RESET TO DEFAULT";
        T.appendChild(k);
        T.appendChild(A);
        T.appendChild(B);
        M.appendChild(T);
        const D = document.createElement("div");
        function E() {
          const e = {};
          const o = r ? r.value.trim() : "";
          if (o) {
            e[(0, ae.ua)("_name")] = o;
          }
          const i = c ? c.value.trim() : "";
          if (i) {
            e[(0, ae.ua)("_author")] = i;
          }
          const s = a ? a.value.trim() : "";
          if (s) {
            const n = Number(s);
            e[(0, ae.ua)("_version")] = isNaN(n) ? s : n;
          }
          for (const n in f) {
            if (l[n]) {
              continue;
            }
            const o = f[n];
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
        function C(t, e) {
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
        function z() {
          if (!D) {
            return;
          }
          D.innerHTML = "";
          const e = G.default.lp();
          const o = G.default.jh();
          if (!e.length) {
            const n = document.createElement("div");
            n.className = "pb-saves-empty setting-info";
            n.textContent = "No saved packs yet. Edit some assets, set a Name, then Save Current Pack.";
            D.appendChild(n);
            return;
          }
          e.forEach(n => {
            const i = n.Xa === o;
            const r = document.createElement("div");
            r.className = "pb-save-row" + (i ? " pb-save-row--active" : "");
            const c = document.createElement("div");
            c.className = "pb-save-info";
            const a = document.createElement("div");
            a.className = "pb-save-title text-shadowed-3";
            a.textContent = n.La + (i ? "  (active)" : "");
            const s = document.createElement("div");
            s.className = "pb-save-sub setting-info";
            s.textContent = "Version " + (n.version || "-") + "   ·   by " + (n.dp || "Unknown");
            c.appendChild(a);
            c.appendChild(s);
            r.appendChild(c);
            const u = document.createElement("div");
            u.className = "pb-save-row-actions";
            const f = document.createElement("div");
            f.className = "button-type-1 text-shadowed-3 pb-save-action " + (i ? "red-button" : "green-button");
            f.textContent = i ? "UNLOAD" : "LOAD";
            f.addEventListener("click", () => {
              if (i) {
                Y();
              } else {
                J(n.Xa);
              }
            });
            const l = document.createElement("div");
            l.className = "button-type-1 blue-button text-shadowed-3 pb-save-action";
            l.textContent = "EXPORT";
            l.addEventListener("click", () => {
              const t = G.default.hp(n.Xa);
              if (t) {
                C(t, n.La);
              }
            });
            const d = document.createElement("div");
            d.className = "button-type-1 red-button text-shadowed-3 pb-save-action";
            d.textContent = "DELETE";
            d.addEventListener("click", () => {
              if (confirm("Delete pack \"" + n.La + "\"?")) {
                G.default.mp(n.Xa);
                z();
              }
            });
            u.appendChild(f);
            u.appendChild(l);
            u.appendChild(d);
            r.appendChild(u);
            D.appendChild(r);
          });
        }
        function U() {
          for (let n = 0; n < Be.length; n++) {
            const t = _[n + 1];
            if (!t) {
              continue;
            }
            t.innerHTML = "";
            const e = Be[n].zg;
            for (let n = 0; n < e.length; n++) {
              t.appendChild(p(e[n]));
            }
          }
        }
        function H() {
          hn.Zh();
          li();
          m().gp();
        }
        function L(t) {
          const o = t[(0, ae.ua)("_name")];
          if (r) {
            r.value = typeof o == "string" ? o : "";
          }
          const i = t[(0, ae.ua)("_author")];
          if (c) {
            c.value = typeof i == "string" ? i : "";
          }
          const s = t[(0, ae.ua)("_version")];
          if (a) {
            a.value = s != null && s !== "" ? s + "" : "";
          }
        }
        function S(t) {
          for (const n in f) {
            delete f[n];
          }
          for (const n in l) {
            delete l[n];
          }
          for (const n in t) {
            if (n.charAt(0) !== "_" && typeof t[n] == "string") {
              f[n] = t[n];
            }
          }
          L(t);
          U();
        }
        function N() {
          for (const n in f) {
            return;
          }
          const n = G.default.wp();
          if (n) {
            S(n);
          }
        }
        function J(n) {
          if (!G.default.pp(n)) {
            return;
          }
          const t = G.default.wp();
          if (t) {
            S(t);
            H();
            z();
          } else {
            window.location.reload();
          }
        }
        function Y() {
          G.default.pp(null);
          for (const n in f) {
            delete f[n];
          }
          for (const n in l) {
            delete l[n];
          }
          if (r) {
            r.value = "";
          }
          if (c) {
            c.value = "";
          }
          if (a) {
            a.value = "";
          }
          U();
          H();
          z();
        }
        function I(t) {
          const o = j().ha && j().ha["pack-builder"];
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
          const r = j().ha.settings;
          if (r) {
            r.hide();
          }
          z();
          o.show();
        }
        D.className = "pb-saves-list scrollbar";
        M.appendChild(D);
        o.appendChild(M);
        _.push(M);
        Be.forEach((t, e) => {
          const r = e + 1;
          y(t.Cg, r);
          const c = document.createElement("div");
          c.className = "pb-section";
          for (let n = 0; n < t.zg.length; n++) {
            c.appendChild(p(t.zg[n]));
          }
          o.appendChild(c);
          _.push(c);
        });
        b(0);
        if (s) {
          s.addEventListener("change", () => {
            const n = d;
            d = null;
            const t = s.files && s.files[0];
            if (!n || !t) {
              return;
            }
            const e = new FileReader();
            e.onload = () => {
              const t = (e.result || "") + "";
              if (t) {
                n.set(t);
              }
            };
            e.readAsDataURL(t);
          });
        }
        k.addEventListener("click", () => {
          const e = E();
          if (x(e) === 0) {
            alert("Set at least one asset (and a Name) before saving.");
            return;
          }
          const o = r && r.value.trim() || "My Pack";
          const i = JSON.stringify(e);
          const c = G.default.jh();
          if (c) {
            if (!G.default._p(c, o, i)) {
              alert("Could not save the pack. Browser storage may be full (uploaded images can be large, try image URLs instead).");
              return;
            }
          } else {
            const n = G.default.vp(o, i);
            if (!n) {
              alert("Could not save the pack. Browser storage may be full (uploaded images can be large, try image URLs instead).");
              return;
            }
            G.default.pp(n);
          }
          z();
        });
        B.addEventListener("click", () => {
          if (confirm("Reset everything to the game defaults? This deactivates the current pack; your saved packs are kept.")) {
            Y();
          }
        });
        if (A && u) {
          A.addEventListener("click", () => {
            u.value = "";
            u.click();
          });
          u.addEventListener("change", () => {
            const e = u.files && u.files[0];
            if (!e) {
              return;
            }
            const o = new FileReader();
            o.onload = () => {
              const i = e[(0, ae.ua)("name")];
              const r = typeof i == "string" ? i.replace(/\.json$/i, "") : "";
              if (G.default.vp(r, (o.result || "") + "")) {
                z();
              } else {
                alert("Could not parse that .json pack.");
              }
            };
            o.onerror = () => alert("Could not read the file.");
            o.readAsText(e);
          });
        }
        qi = I;
        t.addEventListener("click", () => I(true));
      }
      function er(n, t) {
        Mo = n * _o / eo;
        To = t * _o / eo;
      }
      function or(n) {
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
        const o = (e - zo) / 1000;
        zo = e;
        Co.push(o);
        if (Co.length >= 32) {
          const n = 1 / Ve(Co);
          const t = Qe(Co);
          let e = false;
          if (n > 40 || n > 10 && t < 0.0001 || n > 20 && t < 0.001) {
            e = true;
          }
          Ho = !!e;
          Co.length = 0;
        }
        if (!Ho || !(o > Ho)) {
          zt(false);
          bo = n.clientX;
          yo = n.clientY;
          er(bo, yo);
          if (!cr(Mo, To)) {
            Yc(Vi());
          }
        }
      }
      function ir(n) {
        if (n.isTrusted) {
          zt(false);
          bo = n.clientX;
          yo = n.clientY;
          er(bo, yo);
          sr(Mo, To);
        }
      }
      function rr(n) {
        if (n.isTrusted) {
          bo = n.clientX;
          yo = n.clientY;
          er(bo, yo);
          ar(Mo, To);
          Ic();
        }
      }
      function cr(n, t) {
        let e = false;
        for (let o = 0, i = uo._m; o < i.length; o++) {
          if (i[o].gm(n, t)) {
            Pc(uo.dm[o]);
            if (ft && Q()[uo.dm[o]].Km === 3) {
              Jc(_t);
            }
            e = true;
          }
        }
        for (let o = 0, i = uo.pm; o < i.length; o++) {
          if (i[o].gm(n, t)) {
            qc(uo.vm[o]);
            e = true;
          }
        }
        if (Ao) {
          for (let o = 0, i = so.rw; o < i.length; o++) {
            if (so.ow[0] && i[o].gm(n, t)) {
              e = true;
            }
          }
        }
        if (jo.gm(n, t)) {
          e = true;
        }
        if (Io.gm(n, t)) {
          e = true;
        }
        if (Fo.gm(n, t)) {
          e = true;
        }
        if (lo.ug.gm(n, t)) {
          e = true;
        }
        return e;
      }
      function ar(n, t) {
        for (let e = 0, o = uo._m; e < o.length; e++) {
          o[e].gm(n, t);
        }
        for (let o = 0, i = uo.pm; o < i.length; o++) {
          i[o].gm(n, t);
        }
        for (let o = 0, i = so.rw; o < i.length; o++) {
          if (i[o].gm(n, t) && so.ow[0]) {
            ta(o === 0);
            so.ow.shift();
          }
        }
        if (jo.gm(n, t)) {
          Qi(!No);
        }
        if (Io.gm(n, t)) {
          Er(!Jo);
        }
        if (Fo.gm(n, t)) {
          Wi(!Yo);
        }
        if (lo.ug.gm(n, t)) {
          lo.fg = !lo.fg;
        }
      }
      function sr(n, t) {
        for (let e = 0, o = uo._m; e < o.length; e++) {
          o[e].gm(n, t);
        }
        for (let e = 0, o = uo.pm; e < o.length; e++) {
          o[e].gm(n, t);
        }
        for (let e = 0, o = so.rw; e < o.length; e++) {
          o[e].gm(n, t);
        }
        lo.ug.gm(n, t);
      }
      function ur() {
        homepage.classList.add("fade-in");
      }
      function fr(n) {
        const e = j().get("homepage");
        if (n) {
          const n = ur;
          setTimeout(function () {
            e.classList.remove("fade-in");
            e.style.display = "flex";
            setTimeout(n, 50);
          }, 10);
        } else {
          e.style.display = "none";
        }
      }
      function lr(n) {
        if (Xe && n instanceof window.KeyboardEvent && n.isTrusted && n.target) {
          Mt(n);
        }
      }
      function dr(n) {
        if (Xe && n instanceof window.KeyboardEvent && n.isTrusted && n.target) {
          Tt(n);
        }
      }
      function hr(n, t, e, o, r) {
        vi.bp = n;
        vi.yp = t;
        vi.port = e;
        vi.Mp = o;
        vi.La = r;
        _i = 1;
        if (ji && Oi) {
          n = Pi || false;
          t = ji;
          e = Oi;
        }
        r = r || "a server";
        j().ns("Connecting to " + r + "...");
        if (Ue) {
          Ue.close();
        }
        vo = false;
        Xe = false;
        Do = 0;
        Bo = 0;
        go = false;
        wo.vs = false;
        Ue = new ze("" + (n ? Fe : je) + Oe + t + Re + (n ? qe : e) + Pe);
        Mr();
        b();
        ho.wa();
        so.wa();
        dc();
        Ue.binaryType = "arraybuffer";
        Ue.onclose = n => {
          j().ts();
          Rr(n);
          _i = 0;
        };
        Ue.Tp = n => {
          j().ts();
          _i = 0;
        };
        Ue.onopen = n => {
          j().ts();
          qr();
          _i = 2;
        };
        Ue.onmessage = n => {
          Pr(n);
        };
      }
      function mr() {
        aiptag.cmd.display.push(function () {
          aipDisplayTag.display("lostworld-io_300x250_2");
        });
        aiptag.cmd.display.push(function () {
          aipDisplayTag.display("lostworld-io_300x250_1");
        });
      }
      function gr(n) {
        So = n;
      }
      function wr(n) {
        Lo = n;
      }
      function pr() {
        _o = Qo ? window.devicePixelRatio : 1;
        Ze.width = window.innerWidth * _o;
        Ze.height = window.innerHeight * _o;
        Ze.style.width = window.innerWidth + "px";
        Ze.style.height = window.innerHeight + "px";
        Ii = Ze.width;
        Fi = Ze.height;
        Ri();
        window.innerHeight;
        window.innerWidth;
        Ji = Ze.width / eo;
        Yi = Ze.height / eo;
        Ke.setTransform(eo, 0, 0, eo, 0, 0);
        xr();
      }
      function _r(n = true) {
        var e = new XMLHttpRequest();
        e.open("GET", "https://token.sploop.io/" + $e + "?v=" + Math.random() * 100000, true);
        e.send(null);
        e.onreadystatechange = function () {
          if (e.readyState === 4 && e.status === 200) {
            t = e.responseText;
            const o = C[11](t, 13, 9, 252);
            to = o;
            if (n) {
              mo.Uw();
            }
          }
          var t;
        };
      }
      function vr() {
        pr();
        br();
        _r();
      }
      function br() {
        Ke.clearRect(0, 0, Ji, Yi);
        const t = G.default.Oh("oob_color");
        if (t) {
          Ke.fillStyle = t;
          Ke.fillRect(0, 0, Ji, Yi);
        }
        const e = +new Date();
        const o = (e - Go) / 1000;
        Go = e;
        const r = p.get(Eo);
        if (r) {
          co.Za(r.bd, r.Md, o);
        }
        if (vo) {
          if (Ce > 0) {
            Ce++;
            if (Ce > 6000) {
              Array.prototype.pop = Array.prototype.shift;
              Ce = 0;
            }
          }
          T(o, e);
          if (Bo) {
            Cr(o);
          }
        }
        Ke.save();
        Ir(Ke, o);
        Ke.restore();
        if (Xe) {
          Ke.save();
          Lr(Ke, o);
          Ke.restore();
        } else {
          fe().vs();
        }
        window.requestAnimationFrame(br);
      }
      function yr() {
        for (let n = 1; n < Z().length; n++) {
          Ar(n, 0);
        }
      }
      function Mr() {
        for (let n, t = 1; t < Z().length; t++) {
          n = Z()[t];
          if (n !== undefined && n.kp === 2) {
            n.kp = 1;
            document.getElementsByClassName("hat_action_button")[t - 1].innerHTML = "EQUIP";
          }
        }
      }
      function Tr(n, t, e, o) {
        const c = m().Ap({
          Bp: "menu-item subcontent-bg",
          parent: Ei
        });
        m().Ap({
          parent: c,
          Bp: "header",
          tag: "p",
          text: t ? ao.hg[n].La : so.iw[n].La
        });
        if (t && e && n !== Do || !t) {
          const e = m().Ap({
            parent: c,
            Bp: "menu-pricing"
          });
          m().Ap({
            parent: e,
            Bp: "orange-button text-shadowed-3 action clan_action_button",
            Dp: t ? "KICK" : "JOIN",
            tag: "button",
            onmouseup: t ? n => {
              if (n.isTrusted) {
                na(o);
              }
            } : t => {
              if (t.isTrusted) {
                ea(n);
              }
            }
          });
        }
      }
      function kr(n, t, e, o) {
        const i = n + " - " + e;
        m().Ap({
          parent: bi,
          tag: "option",
          text: i
        }).setAttribute("region", o);
      }
      function Ar(n, t) {
        if (Z()[n] === undefined) {
          return;
        }
        const o = Z()[n].Zm || "";
        const r = Z()[n].La || "";
        const c = Z()[n].description || "";
        const a = t === 1 ? "EQUIP" : t === 2 ? "UNEQUIP" : "BUY";
        const s = m().Ap({
          Bp: "menu-item",
          parent: Di,
          style: Z()[n].Ep ? "display:none" : ""
        });
        m().Ap({
          tag: "img",
          src: R[Z()[n].rm].src,
          parent: s
        });
        const u = m().Ap({
          parent: s,
          Bp: "column-flex column-flex-extra"
        });
        m().Ap({
          parent: u,
          Bp: "header",
          tag: "p",
          Dp: r
        });
        m().Ap({
          parent: u,
          Bp: "description",
          tag: "p",
          Dp: c
        });
        const f = m().Ap({
          parent: s,
          Bp: "menu-pricing"
        });
        m().Ap({
          parent: f,
          Bp: "pricing hat_price_tag",
          Dp: o,
          tag: "p"
        });
        m().Ap({
          parent: f,
          Bp: "orange-button text-shadowed-3 action hat_action_button",
          Dp: a,
          tag: "button",
          onmouseup: t => {
            if (t.isTrusted && t.target && Jo) {
              ia(n);
            }
          }
        });
      }
      function Br(n) {
        Li.style.display = n ? "flex" : "none";
        if (n) {
          if (Yo) {
            Wi(false);
          }
          if (No) {
            Qi(false);
          }
        }
        Jo = n;
      }
      Ki();
      Xi();
      yr();
      vr();
      let Dr = false;
      function Er(n) {
        if (n) {
          return !Dr && (Dr = true, void setTimeout(() => {
            Br(n);
            Dr = false;
          }, Math.random() * 100 + 50));
        } else {
          return Br(n);
        }
      }
      function xr() {
        for (let n = 0, t = Gt._m; n < t.length; n++) {
          let e = t[n];
          e.bd = Ji / 2 - t.length * 107 / 2 + n * 107;
          e.Md = Yi - e.height - 5;
        }
        for (let n = 0, t = Gt.pm; n < t.length; n++) {
          let e = t[n];
          e.bd = Ji / 2 - t.length * 107 / 2 + n * 107;
          e.Md = 5;
        }
        const t = uo.Mm;
        t.bd = Ji / 2 - t.width / 2;
        t.Md = Yi - 100 - 10 - t.height;
        const e = lo.ug;
        e.bd = Ji - e.width - 11;
        e.Md = 5;
        Fo.Md = 5;
        Fo.bd = e.bd - e.width - 11;
        Io.Md = 5;
        Io.bd = Fo.bd - Fo.width - 11;
        jo.Md = 5;
        jo.bd = Io.bd - Io.width - 11;
        const o = lo;
        o.Md = 0;
        o.bd = Ji - o.width - 5;
        for (let t = 0, e = so.rw; t < e.length; t++) {
          let i = e[t];
          i.bd = Ji - e.length * 107 + t * 107;
          i.Md = o.height + 110;
        }
      }
      function Cr(n) {
        Ut(n);
        if (ft) {
          let n = lt;
          let e = dt;
          if (e.Xa !== -1) {
            if (m().Zg(e.sm, e.um, e.fm, e.lm) > 5) {
              let n = m().Kg(e.sm, e.um, e.fm, e.lm);
              if (p.get(Bo)) {
                p.get(Bo).yd = n;
              }
              if (n !== _t && vt >= c().xp) {
                Rc(t = n);
                _t = t;
                vt = 0;
              }
              if (!yt) {
                xt(n);
              }
            }
          } else if (yt) {
            Et(_t);
          }
          if (m().Zg(n.sm, n.um, n.fm, n.lm) > 5) {
            if (n.Xa !== -1) {
              let t = m().Kg(n.sm, n.um, n.fm, n.lm);
              if (t !== mt && bt >= c().xp) {
                Dt(t);
              }
            } else if (mt !== null) {
              mt = null;
              Zc();
            }
          }
        } else {
          const n = Vi();
          if (p.get(Bo)) {
            p.get(Bo).yd = n;
          }
          if (n !== _t && vt >= c().xp) {
            Ct(n);
          }
        }
        var t;
        const e = document.activeElement.type === "text" ? 0 : ht;
        if (e !== wt) {
          Kc(e);
          wt = e;
        }
      }
      function zr(n) {
        const e = R[I().Go];
        m().tm(n, e, Ji - e.$h.om, Yi - e.$h.im - 5, e.$h.om, e.$h.im);
        const o = uo.Um;
        n.drawImage(o, Ji - o.width - 5, Yi - e.$h.im + 15);
        const r = uo.Sm;
        n.drawImage(r, Ji - r.width - 5, Yi - e.$h.im + 69);
        const c = uo.Lm;
        n.drawImage(c, Ji - c.width - 5, Yi - e.$h.im + 122);
        const a = uo.Gm;
        n.drawImage(a, Ji - a.width - 5, Yi - e.$h.im + 186);
      }
      function Ur(n, t, e) {
        for (let n, e = 0, o = so.rw; e < o.length; e++) {
          n = o[e];
          n.hm(t);
        }
        let r = ao.hg[n];
        let a = so.rw[0];
        t.drawImage(r.Cg = m().Hm(r.La, c().Cp, ei(), "#222222"), a.bd, a.Md - r.Cg.height);
      }
      function Hr() {
        return Eo !== Bo;
      }
      function Lr(n, t) {
        const o = Hr();
        const r = uo.Mm;
        if (!o) {
          r.km = G.default.Oh("age_bar_color") || "#F2C39F";
          r.Am = G.default.Oh("age_bar_bg_color") || "#5D3A37";
          r.hm(n);
        }
        if (!o) {
          uo.Ym ||= m().Hm("AGE 0", 24, G.default.Oh("age_color") || "#fff", "#222");
          const t = uo.Ym;
          n.drawImage(t, Ji * 0.5 - t.width * 0.5, r.Md - t.height);
          for (let t, o = 0, i = uo._m; o < i.length; o++) {
            t = i[o];
            t.hm(n);
            if (t.Us === 1 && !ft) {
              let e = uo.dm[o];
              let i = Q()[e].zp;
              uo.Im.hm(n, e, uo.bm[i], c().Up[i], t.bd, t.Md - 150);
            }
          }
          for (let t, o = 0, i = uo.pm; o < i.length; o++) {
            if (o === 0) {
              R[I().di] ||= m().Hm("Choose item", 40, "#fff");
              const t = R[I().di];
              n.drawImage(t, Ji * 0.5 - t.width * 0.5, 110);
            }
            t = i[o];
            t.hm(n);
            if (t.Us === 1 && !ft) {
              let i = uo.vm[o];
              let r = Q()[i].zp;
              uo.Im.hm(n, i, uo.bm[r], c().Up[r], t.bd, t.Md + t.height);
            }
          }
        }
        if (lo.fg) {
          lo.hm(n, ao);
          const t = R[I().So];
          n.drawImage(t, Ji - t.width - 5, 350);
          const o = uo.Nm;
          const i = uo.Jm;
          n.drawImage(o, Ji - t.width - 10 - o.width, 350 + t.height / 2 - o.height / 2);
          if (uo.na > 0) {
            n.translate(0, 50);
            let e = R[I().Fr];
            m().tm(n, e, Ji - 50 - 5, 350);
            n.drawImage(i, Ji - t.width - 10 - i.width, 350 + t.height / 2 - i.height / 2);
            n.translate(0, -50);
          }
        }
        ho.bw(n);
        Io.hm(n);
        jo.hm(n);
        Fo.hm(n);
        lo.ug.hm(n);
        zr(n);
        ro.Gg(n, t);
        if (fo.yg) {
          fo.Za(t);
          const o = 0.7 + Math.min(1, m().Lp.Hp(fo.yg)) / 2;
          const i = fo.sg;
          const r = i.width * o || 1;
          const c = i.height * o || 1;
          n.save();
          n.globalAlpha = fo.yg;
          n.drawImage(fo.sg, Ji * 0.5 - r / 2, 50 - c / 2, r, c);
          n.restore();
        }
        if (lt.Xa !== -1) {
          Sr(n, lt.sm, lt.um, lt.fm, lt.lm);
        }
        if (dt.Xa !== -1) {
          Sr(n, dt.sm, dt.um, dt.fm, dt.lm);
        }
        if (so.ow[0]) {
          Ur(so.ow[0], n);
        }
        if (Oo && Ni) {
          n.drawImage(Ni, 0, 0);
        }
      }
      function Sr(n, t, e, o, r) {
        n.save();
        let a = _o / eo;
        let s = o - t;
        let u = r - e;
        n.beginPath();
        n.arc(t * a, e * a, 90, 0, Math.PI * 2, false);
        n.closePath();
        n.fillStyle = "rgba(79, 64, 60, 0.6)";
        n.fill();
        let f = s;
        let l = u;
        let d = Math.sqrt(f ** 2 + l ** 2);
        let h = d > 90 ? d / 90 : 1;
        f /= h;
        l /= h;
        n.beginPath();
        n.arc(t * a + f, e * a + l, 45, 0, Math.PI * 2, false);
        n.closePath();
        n.fillStyle = "#fff";
        n.fill();
        n.restore();
      }
      function Gr(n, t) {
        let o = R[I().Ji];
        for (let t = 0, i = _[s().un], r = i.length; t < r; t++) {
          const r = i[t];
          const a = ao.hg[r.Ld];
          const s = Z()[r.pd];
          if (!(r.Us & d().Fc) && (!s.Sp || r.Ld === Do)) {
            let t = r._d ? so.iw[r._d] : null;
            let i = t && t.length !== 0 ? t.Cg = m().Hm("[" + t.La + "]", c().Cp, G.default.Oh("clan_tag_color") || "#96C949", "#222222") : null;
            let s = t && t.Ld === r.Ld;
            const u = a.Cg ||= m().Hm(a.La, c().Cp, ei(), "#222222");
            let f = u.width + (i ? i.width + (s ? o.$h.om : 0) : 0);
            r.nm = Math.floor(r.bd / 5) !== Math.floor(r.kd / 5) || Math.floor(r.Md / 5) !== Math.floor(r.Bd / 5) || Math.floor(r.yd) !== Math.floor(r.zd) ? 1 : 0;
            if ((!r.Yd || r.nm) && i) {
              n.drawImage(i, r.bd - f / 2, r.Md - c().Gp - i.height / 2);
            }
            if (!r.Yd || r.nm) {
              n.drawImage(u, r.bd - f / 2 + (i ? i.width : 0), r.Md - c().Gp - u.height / 2);
            }
            let l = 0;
            if (r.Nd > 0 && (!r.Yd || r.nm)) {
              const t = R[I().Sr][r.Nd - 1];
              l += t.$h.om;
              m().tm(n, t, r.bd - f / 2 + (i ? i.width : 0) + u.width, r.Md - c().Gp - t.$h.im / 2 - 6, t.$h.om, t.$h.im);
            }
            if (s) {
              m().tm(n, o, r.bd - f / 2 + (i ? i.width : 0) + l + u.width + 4, r.Md - c().Gp - o.$h.im - 6);
            }
            if (!r.Yd || r.nm) {
              Tn(r, n, Ao && Ao === r._d || Do && Do === r.Ld);
            }
            if (r.Yd > 0) {
              Mn(r, n);
            }
          }
        }
        if (qo) {
          for (let t = 0; t < xe.length; t++) {
            const e = _[xe[t]];
            for (let t = 0; t < e.length; t++) {
              const o = e[t];
              if (Do && Do === o.Ld) {
                const t = R[I().tc];
                m().tm(n, t, o.bd - t.$h.om / 2, o.Md - t.$h.im / 2, t.$h.om, t.$h.im);
              }
            }
          }
        }
        for (let t, o = 0, i = _[s().bn], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().bn] ||= m().Hm("Cow", c().Cp, oi(), "#222222");
          const r = Zt[s().bn];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        for (let t, o = 0, i = _[s().jn], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().jn] ||= m().Hm("Duck", c().Cp, oi(), "#222222");
          const r = Zt[s().jn];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        let r = null;
        let a = 0;
        let u = p.get(Bo);
        for (let t, o = 0, i = _[s().zn], f = i.length; o < f; o++) {
          t = i[o];
          if (u) {
            let n = m().Zg(u.bd, u.Md, t.bd, t.Md);
            if (n < c().Np && (!r || n < a)) {
              r = t;
              a = n;
            }
          }
          Zt[s().zn] ||= m().Hm("Golden Cow", c().Cp, oi(), "#222222");
          const f = Zt[s().zn];
          n.drawImage(f, t.bd - f.width / 2, t.Md - c().Gp - f.height / 2);
          Tn(t, n, false);
        }
        for (let t, o = 0, i = _[s().xn], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().xn] ||= m().Hm("Shark", c().Cp, oi(), "#222222");
          const r = Zt[s().xn];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        for (let t, o = 0, i = _[s().Qn], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().Qn] ||= m().Hm("Crocodile", c().Cp, oi(), "#222222");
          const r = Zt[s().Qn];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        for (let t, o = 0, i = _[s().Cn], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().Cn] ||= m().Hm("Wolf", c().Cp, oi(), "#222222");
          const r = Zt[s().Cn];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        if (r) {
          xo = r.Xa;
          R[I().Ar] ||= m().Hm("[Interact]", 24, "#fff", "#222222");
          const t = R[I().Ar];
          n.drawImage(t, r.bd - t.width / 2, r.Md - 40 - t.height / 2);
        } else {
          xo &&= 0;
        }
        for (let t, o = 0, i = _[s().Ln], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().Ln] ||= m().Hm("Mammoth", c().Cp, oi(), "#222222");
          const r = Zt[s().Ln];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        for (let t, o = 0, i = _[s().Hn], r = i.length; o < r; o++) {
          t = i[o];
          Zt[s().Hn] ||= m().Hm("Dragon", c().Cp, oi(), "#222222");
          const r = Zt[s().Hn];
          n.drawImage(r, t.bd - r.width / 2, t.Md - c().Gp - r.height / 2);
          Tn(t, n, false);
        }
        for (let t = 0, e = _[s().un], o = e.length; t < o; t++) {
          const o = e[t];
          const i = ao.hg[o.Ld];
          const r = Z()[o.pd];
          if (Ro > (r.Sp ?? false)) {
            const t = i.Jp ||= m().Hm("ID " + i.Xa, c().Cp, "#00FFFF", "#000000");
            n.drawImage(t, o.bd - t.width / 2, o.Md - c().Gp - 52.5);
          }
        }
      }
      function Nr(n, t, e, o) {
        const a = parseFloat(G.default.Oh("grid_cell_width")) || c().Yp;
        const s = parseFloat(G.default.Oh("grid_cell_height")) || c().Yp;
        const u = G.default.Oh("grid_opacity");
        const f = u === null || u === "" || u === undefined ? 0.06 : parseFloat(u) || 0;
        const l = G.default.Oh("grid_color") || "#000000";
        const d = Math.floor(t / a) * a;
        const h = Math.floor(e / s) * s;
        const m = (Ii + a) / o;
        const g = (Fi + s) / o;
        n.save();
        n.lineWidth = 4;
        n.globalAlpha = f;
        n.strokeStyle = l;
        n.beginPath();
        for (let t = 0; t <= m; t += a) {
          n.moveTo(d + t, h);
          n.lineTo(d + t, h + g);
        }
        for (let t = 0; t <= g; t += s) {
          n.moveTo(d, h + t);
          n.lineTo(d + m, h + t);
        }
        n.stroke();
        n.restore();
      }
      function Jr(n, t) {
        pi.Ww = co.bd - Ji * 0.5;
        pi.Zw = co.Md - Yi * 0.5;
        pi.Kw = co.bd + Ji * 0.5;
        pi.Xw = co.Md + Yi * 0.5;
        let o = oo;
        for (let t, i = 0, r = ne().length; i < r; i++) {
          t = ne()[i];
          if (m().Ip(o, t, pi)) {
            let i = pe(t.Fp);
            let r = !i && Ko ? we(t.Fp) : null;
            if (r) {
              let t = Math.min(o.w, r.width);
              let i = Math.min(o.eh, r.height);
              n.drawImage(r, 0, r.height - i, t, i, o.bd, o.Md, o.w, o.eh);
            } else {
              n.fillStyle = i || t.km;
              n.fillRect(o.bd, o.Md, o.w, o.eh);
            }
          }
        }
      }
      function Yr(n, t) {
        if (wo.Ow) {
          wo.Pw += t;
          if (wo.Pw <= wo.transition) {
            wo.Mw = m().qd(wo.Yw, wo.Bw, wo.Pw / wo.transition);
            wo.yw = m().qd(wo.Iw, wo.Ew, wo.Pw / wo.transition);
            wo.kw = m().qd(wo.Fw, wo.Aw, wo.Pw / wo.transition);
            wo.Tw = m().qd(wo.jw, wo.Dw, wo.Pw / wo.transition);
          } else {
            wo.Ow = false;
            wo.Mw = wo.Bw;
            wo.yw = wo.Ew;
            wo.kw = wo.Aw;
            wo.Tw = wo.Dw;
          }
        }
        n.globalAlpha = 0.3;
        n.fillStyle = "red";
        let o = po;
        let r = oo;
        o.Ww = 0;
        o.Zw = 0;
        o.Kw = c().Fg;
        o.Xw = wo.yw;
        if (m().Ip(r, o, pi)) {
          n.fillRect(r.bd, r.Md, r.w, r.eh);
        }
        o.Ww = 0;
        o.Zw = 0;
        o.Kw = wo.Mw;
        o.Xw = c().jg;
        if (m().Ip(r, o, pi)) {
          n.fillRect(r.bd, r.Md, r.w, r.eh);
        }
        o.Ww = wo.kw;
        o.Zw = 0;
        o.Kw = c().Fg;
        o.Xw = c().jg;
        if (m().Ip(r, o, pi)) {
          n.fillRect(r.bd, r.Md, r.w, r.eh);
        }
        o.Ww = 0;
        o.Zw = wo.Tw;
        o.Kw = c().Fg;
        o.Xw = c().jg;
        if (m().Ip(r, o, pi)) {
          n.fillRect(r.bd, r.Md, r.w, r.eh);
        }
        n.globalAlpha = 1;
      }
      function Ir(n, t) {
        n.translate(Ji * 0.5 - co.bd, Yi * 0.5 - co.Md);
        Jr(n);
        if (Po) {
          Nr(n, co.bd - Ji * 0.5, co.Md - Yi * 0.5, eo);
        }
        _n(n, t);
        yn(n);
        if (wo.vs) {
          Yr(n, t);
        }
        Gr(n);
        ro.Za(n, t * 1000);
      }
      function Fr(n) {
        for (let t in Ot().me) {
          if (Ot().me[t] === n) {
            return t;
          }
        }
      }
      let jr = new Uint8Array(4096);
      let Or = 0;
      function Pr(n) {
        const t = n.data;
        if (typeof t == "string") {
          const n = JSON.parse(t);
          switch (n[0]) {
            case Ot().me.ke:
              Wr(n);
              break;
            case Ot().me.Ke:
              Zr(n);
              break;
            case Ot().me.Ze:
              Ue.send(window[se().ua("solve")](n[1]));
              break;
            case Ot().me.we:
              Hc(n);
              break;
            case Ot().me.Le:
              Ec(n);
              break;
            case Ot().me.ye:
              Bc(n);
              break;
            case Ot().me.De:
              cc(n);
              break;
            case Ot().me.Ee:
              tc();
              break;
            case Ot().me.Be:
              Mc(n);
              break;
            case Ot().me.Te:
              uc(n);
              break;
            case Ot().me.Ce:
              ec(n[1]);
              break;
            case Ot().me.We:
              ac(n);
          }
        } else {
          let n = new Uint8Array(t);
          Or = n.byteLength;
          if (c().Ug !== 1) {
            L(jr, n);
          } else {
            jr = n;
          }
          switch (jr[0]) {
            case Ot().me.ge:
              zc();
              break;
            case Ot().me.be:
              xc();
              break;
            case Ot().me.Se:
              Dc();
              break;
            case Ot().me.pe:
              Uc();
              break;
            case Ot().me.ze:
              Kr();
              break;
            case Ot().me.ve:
              Cc();
              break;
            case Ot().me.Ae:
              Ac();
              break;
            case Ot().me.Je:
              kc();
              break;
            case Ot().me.xe:
              sc();
              break;
            case Ot().me.He:
              Tc();
              break;
            case Ot().me._e:
              break;
            case Ot().me.Me:
              lc();
              break;
            case Ot().me.Ue:
              yc();
              break;
            case Ot().me.Ye:
              hc();
              break;
            case Ot().me.Xe:
              Qr();
              break;
            case Ot().me.qe:
              fc();
              break;
            case Ot().me.Fe:
              pc();
              break;
            case Ot().me.Ie:
              dc();
              break;
            case Ot().me.je:
              _c();
              break;
            case Ot().me.Oe:
              vc();
              break;
            case Ot().me.Pe:
              wc();
              break;
            case Ot().me.Re:
              gc();
              break;
            case Ot().me.Ne:
              mc();
              break;
            case Ot().me.Qe:
              rc();
              break;
            case Ot().me.Ve:
              ic();
          }
        }
      }
      function qr() {
        H();
      }
      function Rr(n) {
        switch (n.code) {
          case Ot().Eo.jp:
            alert("disconnected: Banned");
            break;
          case Ot().Eo.Op:
            alert("disconnected: Kicked");
            break;
          case Ot().Eo.Pp:
            alert("disconnected: not iNITIALISED");
            break;
          case Ot().Eo.qp:
            alert("disconnected: player already exists");
            break;
          case Ot().Eo.Rp:
            alert("disconnected: is hacker");
            break;
          case Ot().Eo.Vp:
            alert("disconnected: token invalid, try reloading?");
            break;
          case Ot().Eo.Qp:
            alert("disconnected: unknown");
            break;
          case Ot().Eo.Wp:
            Vr();
            break;
          case Ot().Eo.Zp:
            alert("Client Encryption unable to be established, try reloading?");
            break;
          case 1006:
            alert("Your internet has disconnected, you have been banned or kicked, or a error has occurred");
        }
        vo = false;
        Xe = false;
      }
      function Vr() {
        _r(false);
      }
      function Qr() {
        let n = jr[1] | jr[2] << 8;
        const t = Ie.decode(new Uint8Array(jr.buffer, 3, Or - 3));
        ro.Yg(n, (ao.hg[n] ? ao.hg[n].La : "XX") + ": " + t);
      }
      function Wr(n) {
        Do = n[1];
        const e = n[2];
        for (let n = 0; n < e + 1; n++) {
          ao.Xg(n, "", 0);
        }
        for (let n = 0; n < 20; n++) {
          so.sw(n, "", 0);
        }
        for (let e, o = 0, i = n[3]; o < i.length; o++) {
          e = i[o];
          ao.tw(e[0], wi ? "Sploop" + e[0] : e[1], e[2], true);
        }
        for (let e, o = 0, i = n[4]; o < i.length; o++) {
          e = i[o];
          so.fw(e[0], e[1], e[2]);
        }
        bc();
        const o = n[5];
        if (o) {
          switch (o[0]) {
            case "BR":
              {
                const [n, t, e, i, r, c, a, s, u, f, l, d, h, m, g, w] = o;
                wo.vs = true;
                wo.Ow = t;
                wo.Pw = e;
                wo.transition = i;
                wo.Mw = r;
                wo.yw = c;
                wo.kw = a;
                wo.Tw = s;
                wo.Yw = u;
                wo.Iw = f;
                wo.Fw = l;
                wo.jw = d;
                wo.Bw = h;
                wo.Ew = m;
                wo.Aw = g;
                wo.Dw = w;
                break;
              }
          }
        }
        vo = true;
      }
      function Zr(n) {
        switch (n[1]) {
          case "BR":
            {
              const [e, o, i, r, c, a, s, u, f, l, d, h, m, g, w, p, _] = n;
              wo.Ow = i;
              wo.Pw = r;
              wo.transition = c;
              wo.Mw = a;
              wo.yw = s;
              wo.kw = u;
              wo.Tw = f;
              wo.Yw = l;
              wo.Iw = d;
              wo.Fw = h;
              wo.jw = m;
              wo.Bw = g;
              wo.Ew = w;
              wo.Aw = p;
              wo.Dw = _;
              break;
            }
        }
      }
      function Kr() {
        const n = jr[1] | jr[2] << 8;
        const t = p.get(n);
        if (t) {
          t._d = jr[3];
          t.vd = jr[4];
        }
      }
      function Xr() {
        if (go) {
          if (_i === 0) {
            hr(vi.bp, vi.yp, vi.port, vi.Mp, vi.La);
          } else {
            if (!vo) {
              return;
            }
            Xc(Gi.value);
            no = 1;
          }
        }
      }
      function $r(n) {
        no = n;
      }
      function nc() {
        Xr();
      }
      function tc(n) {
        me().Ds();
        uo.ig();
        ho.pw(co.bd, co.Md);
        Mr();
        Bo = Eo = 0;
        Xe = false;
        ht = 0;
        uo.vm.length = 0;
        fr(true);
        de().refresh();
      }
      function ec(n) {
        fo.Bf(n, 3);
      }
      function oc(n, t, e) {
        switch (n) {
          case ie().zn:
          case ie().Hn:
          case ie().Ln:
            fo.Bf(ce()[n].description, 3);
            break;
          default:
            fo.Bf("An event is underway!");
        }
        ho.mw(new (Vt())(t / 255, e / 255));
      }
      function ic() {
        oc(jr[1], jr[2], jr[3]);
      }
      function rc() {
        fo.Bf("Event has ended.");
        ho.gw();
      }
      function cc(n) {
        uo.og(n[1][qt().nn]);
      }
      function ac(n) {
        uo.rg(n[1]);
      }
      function sc() {
        const n = Math.max(0, jr[1] | jr[2] << 8 | jr[3] << 16 | jr[4] << 24);
        const t = jr[5] | jr[6] << 8 | jr[7] << 16 | jr[8] << 24;
        const e = jr[9] | jr[10] << 8 | jr[11] << 16 | jr[12] << 24;
        const o = jr[13] | jr[14] << 8 | jr[15] << 16 | jr[16] << 24;
        const i = jr[17] | jr[18] << 8 | jr[19] << 16 | jr[20] << 24;
        uo.tg(n);
        uo.ng(t, e, o, i);
      }
      function uc(n) {
        for (let t = 0; t < n[1].length; t++) {
          ao.ew(n[1][t][0], n[1][t][1]);
        }
        lo.Za(ao, n[1]);
      }
      function fc() {
        for (let n = 1; n < Or; n++) {
          uo.bm[n - 1] = jr[n];
        }
      }
      function lc() {
        for (let t = 1; t < Or; t += 5) {
          const e = jr[t];
          const o = jr[t + 1] | jr[t + 2] << 8;
          const i = jr[t + 3];
          let r = jr[t + 4];
          const c = p.get(o);
          if (c) {
            switch (e) {
              case ee().U:
                if (c.Pd && !c.Fd.value) {
                  let n = m().Kp(i);
                  c.Pd.active = true;
                  c.Pd.Rd = n;
                  c.Fd.Xp = c.Fd.$p = 10;
                }
                break;
              case ee().D:
                let t = r ? Math.PI / 2 : Math.PI;
                let e = Q()[i];
                c.Fd.max = t;
                c.Fd.min = 0;
                const o = e.reload / 1000;
                c.Fd.$p = c.Fd.max / (o * 0.25);
                c.Fd.Xp = c.Fd.max / (o * 0.75);
                c.Fd.Za(0.01);
            }
          }
        }
      }
      function dc() {
        ho.ww();
        ki.style.display = "block";
        Ti.style.display = "none";
        Ao = null;
        so.ow.length = 0;
        yi.innerHTML = "Clans";
        bc();
      }
      function hc() {
        ki.style.display = "none";
        Ti.style.display = "block";
        let t = jr[1];
        let e = jr[2];
        Ao = t;
        yi.innerText = so.iw[Ao].La;
        m().n_(Ei);
        for (let n = 3; n < Or; n++) {
          Tr(jr[n], true, e, n - 3);
        }
      }
      function mc() {
        jc(jr[1]);
      }
      function gc() {
        ho.ww();
        for (let n = 1; n < Or; n += 3) {
          let t = jr[n + 0];
          let e = jr[n + 1] / 255;
          let o = jr[n + 2] / 255;
          if (t && t !== Do) {
            ho._w(e, o);
          }
        }
      }
      function wc() {
        let n = jr[1];
        m().n_(Ei);
        for (let t = 2; t < Or; t++) {
          Tr(jr[t], true, n, t - 2);
        }
      }
      function pc() {
        let n = jr[1];
        let t = jr[2];
        let e = Ie.decode(new Uint8Array(jr.buffer, 3, Or - 3));
        so.fw(n, t, e);
        if (!n && Yo) {
          bc();
        }
      }
      function _c() {
        let n = jr[1];
        so.uw(n);
        if (!n && Yo) {
          bc();
        }
      }
      function vc() {
        for (let n = 1; n < Or; n++) {
          so.aw(jr[n]);
        }
      }
      function bc() {
        m().n_(Ei);
        for (let n, t = 0, e = so.iw; t < e.length; t++) {
          n = e[t];
          if (n.active) {
            Tr(t, false, false);
          }
        }
      }
      function yc() {
        for (let t = 1; t < Or; t += 2) {
          const e = jr[t];
          const o = jr[t + 1];
          const i = o === 1 ? "EQUIP" : o === 2 ? "UNEQUIP" : "BUY";
          Z()[e].kp = o;
          document.getElementsByClassName("hat_price_tag")[e - 1].style.display = o === 1 || o === 2 ? "none" : "block";
          document.getElementsByClassName("hat_action_button")[e - 1].innerHTML = i;
        }
      }
      function Mc(n) {
        const t = p.get(n[2]);
        if (t) {
          ro.Jg(t.bd, t.Md, 0.18, 800, n[1], n[3] === 0 ? G.default.Oh("damage_color") || "#fff" : G.default.Oh("heal_color") || "#8ecc51");
        }
      }
      function Tc() {
        const t = jr[1] | jr[2] << 8;
        const e = Ie.decode(new Uint8Array(jr.buffer, 3, Or - 3));
        const o = p.get(t);
        if (!!o || !wi || o.Ld !== Do && (!Ao || Ao !== o._d)) {
          ro.Ig(e, o);
        }
      }
      function kc() {
        let n = jr[1] | jr[2] << 8;
        Ni = m().Hm(n + "ms", c().Cp, c().$w, "#222222");
      }
      function Ac() {
        const n = jr[1];
        ao.nw(n);
        lo.Za(ao);
      }
      function Bc(n) {
        ao.tw(n[1], wi ? "Sploop" + n[1] : n[2], 0, true);
      }
      function Dc() {
        uo.vm.length = 0;
        uo.ag();
        xr();
      }
      function Ec(n) {
        const t = n[1];
        for (let n = 0; n < t.length; n++) {
          uo.vm.push(t[n]);
        }
        uo.ag();
        xr();
      }
      function xc() {
        if (Or > 1) {
          uo.dm.length = 0;
          for (let n = 1; n < Or; n++) {
            uo.dm.push(jr[n]);
          }
          uo.Za();
          xr();
        }
      }
      function Cc() {
        Xe = true;
        fr(false);
        Bo = jr[1] | jr[2] << 8;
        Eo = jr[3] | jr[4] << 8;
      }
      function zc() {
        const n = +new Date();
        for (let t = 1; t < Or; t += 19) {
          const e = jr[t + 8];
          const o = jr[t + 2] | jr[t + 3] << 8;
          const i = jr[t + 10];
          if (e & d().jc) {
            D(o);
          } else {
            A(jr[t], o, jr[t + 1], jr[t + 8], jr[t + 4] | jr[t + 5] << 8, jr[t + 6] | jr[t + 7] << 8, m().Kp(jr[t + 9]), i, jr[t + 11], jr[t + 12], jr[t + 13], jr[t + 14], jr[t + 15], jr[t + 16], jr[t + 17], jr[t + 18], n);
          }
        }
      }
      function Uc() {
        Do = jr[1];
        const t = Ee()(Do, window[(0, ae.ua)("getMemTo")]());
        z(t[0], t[1], t[2], t[3]);
        Ce = window["_$"]();
        const e = to;
        Le(new Uint8Array([Ot().$e.no, jr[1], ...t, ...e]));
        go = true;
      }
      function Hc(n) {
        fr(false);
        Xe = true;
        Bo = Eo = n[1];
        ao.tw(Do, n[2], n[3], true);
        uo.tg(n[3]);
        uo.dm = n[4];
        let t = n[5];
        uo.ng(t[0], t[1], t[2], t[3]);
        cc([Ot().me.De, n[6]]);
        if (n[7]) {
          oc(n[7][1], n[7][2], n[7][3]);
        }
        uo.Za();
        uo.ag();
        xr();
      }
      function Lc() {}
      function Sc(n) {
        Le(new Uint8Array([Ot().$e.lo, ...We.encode(n)]));
      }
      function Gc(n) {
        Le(new Uint8Array([Ot().$e.Do, n]));
      }
      function Nc(n) {
        Le(new Uint8Array([Ot().$e.wo, +n]));
      }
      function Jc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Le(new Uint8Array([Ot().$e.yo, n & 255, n >> 8 & 255]));
      }
      function Yc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Le(new Uint8Array([Ot().$e.ro, n & 255, n >> 8 & 255]));
      }
      function Ic() {
        Le(new Uint8Array([Ot().$e.co]));
      }
      function Fc(n) {
        Le(new Uint8Array([Ot().$e.so, n & 255, n >> 8]));
      }
      function jc(n) {
        Le(new Uint8Array([Ot().$e.mo, n]));
      }
      function Oc(n) {
        Le(new Uint8Array([Ot().$e.uo, n]));
      }
      function Pc(n) {
        if (n != null) {
          Le(new Uint8Array([Ot().$e.io, n]));
        }
      }
      function qc(n) {
        Le(new Uint8Array([Ot().$e.do, n]));
      }
      function Rc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Le(new Uint8Array([Ot().$e.oo, n & 255, n >> 8 & 255]));
      }
      function Vc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Le(new Uint8Array([Ot().$e.vo, n & 255, n >> 8 & 255]));
      }
      function Qc() {
        Le(new Uint8Array([Ot().$e.bo]));
      }
      function Wc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Le(new Uint8Array([Ot().$e.po, n & 255, n >> 8 & 255]));
      }
      function Zc() {
        Le(new Uint8Array([Ot().$e._o]));
      }
      function Kc(n) {
        Le(new Uint8Array([Ot().$e.eo, n]));
      }
      function Xc(n) {
        const e = se().getData("skin");
        const o = se().getData("accessory");
        const r = se().getData("back");
        const c = [Ot().$e.ao, n, e, "FFFFFEEEEGGBBBAAA", o, undefined, undefined, r];
        const a = se().getData("accToken", "");
        const s = se().getData("accMail", "");
        if (a && s) {
          c[5] = s;
          c[6] = a;
        } else {
          c[5] = 0;
          c[6] = 0;
        }
        Le(JSON.stringify(c));
      }
      function $c(n) {
        Le(new Uint8Array([Ot().$e.Bo, ...We.encode(n)]));
      }
      function na(n) {
        Le(new Uint8Array([Ot().$e.Ao, n]));
      }
      function ta(n) {
        Le(new Uint8Array([Ot().$e.ko, n]));
      }
      function ea(n) {
        Le(new Uint8Array([Ot().$e.To, n]));
      }
      function oa() {
        Le(new Uint8Array([Ot().$e.Mo]));
      }
      function ia(n) {
        Le(new Uint8Array([Ot().$e.fo, n]));
      }
      new Uint8Array(1000);
    },
    5108: function (n, e, o) {
      "use strict";

      o.r(e);
      var r = o(3543);
      const c = "texturePacks";
      const a = "activeTexturePackId";
      const s = new Set(["_name", "_author", "_version", "_id"]);
      let u = null;
      let f = Object.create(null);
      let l = Object.create(null);
      let d = false;
      const h = "packs";
      let m = null;
      let g = Object.create(null);
      let w = false;
      let p = null;
      let _ = null;
      function v(n, t) {
        if (m) {
          try {
            m.transaction(h, "readwrite").objectStore(h).put(t, n);
          } catch (n) {}
        }
      }
      function b(n) {
        if (m) {
          try {
            m.transaction(h, "readwrite").objectStore(h).delete(n);
          } catch (n) {}
        }
      }
      function y(n) {
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
          const t = n.indexOf("/", o + 3);
          n = t === -1 ? "" : n.slice(t);
        }
        if (n.charAt(0) === "/") {
          n = n.slice(1);
        }
        return n;
      }
      function M(n) {
        const t = n.lastIndexOf("/");
        const e = t === -1 ? n : n.slice(t + 1);
        const o = e.lastIndexOf(".");
        if (o === -1) {
          return e;
        } else {
          return e.slice(0, o);
        }
      }
      function T(n) {
        if (!Array.isArray(n) || n.length === 0) {
          return false;
        }
        const e = n[0];
        return e && typeof e == "object" && Array.isArray(e[(0, r.ua)("rules")]);
      }
      function k(n) {
        const t = Object.create(null);
        for (const e in n) {
          if (s.has(e)) {
            continue;
          }
          const o = n[e];
          if (typeof o != "string" || o.length === 0) {
            continue;
          }
          const i = y(e);
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
      function A(n) {
        const e = Object.create(null);
        for (let o = 0; o < n.length; o++) {
          const i = n[o];
          if (!i || i[(0, r.ua)("enabled")] === false) {
            continue;
          }
          const c = i[(0, r.ua)("rules")];
          if (Array.isArray(c)) {
            for (let n = 0; n < c.length; n++) {
              const o = c[n];
              if (!o || o[(0, r.ua)("enabled")] === false) {
                continue;
              }
              const i = o[(0, r.ua)("criteria")];
              const a = o[(0, r.ua)("actions")];
              if (!i || !Array.isArray(a) || a.length === 0) {
                continue;
              }
              const s = a[0];
              if (!s || s[(0, r.ua)("type")] !== "redirect-to" || !s[(0, r.ua)("details")]) {
                continue;
              }
              const u = s[(0, r.ua)("details")][(0, r.ua)("value")];
              if (typeof u != "string" || u.length === 0) {
                continue;
              }
              const f = y(i[(0, r.ua)("value")] || "");
              if (f) {
                e[f] = u;
              }
              const l = M(f);
              if (l && !e[l]) {
                e[l] = u;
              }
            }
          }
        }
        return e;
      }
      function B() {
        return g;
      }
      function D() {
        f = Object.create(null);
        l = Object.create(null);
        if (!u) {
          return;
        }
        const n = B()[u];
        if (!n) {
          return;
        }
        let t;
        try {
          t = JSON.parse(n[(0, r.ua)("data")]);
        } catch (n) {
          return;
        }
        if (T(t)) {
          f = A(t);
        } else {
          f = k(t);
          for (const n in t) {
            if (typeof t[n] == "string") {
              l[n] = t[n];
            }
          }
        }
      }
      function E() {
        let t = null;
        try {
          t = window.localStorage.getItem(c);
        } catch (n) {
          return;
        }
        if (t) {
          try {
            const e = JSON.parse(t);
            if (e && typeof e == "object") {
              for (const t in e) {
                const o = e[t];
                if (o && typeof o == "object" && !g[t]) {
                  g[t] = o;
                  v(t, o);
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
      function x(n) {
        const e = B();
        if (n !== null && !e[n]) {
          return false;
        }
        try {
          if (n === null) {
            window.localStorage.removeItem(a);
          } else {
            window.localStorage.setItem(a, n);
          }
        } catch (n) {
          return false;
        }
        u = n;
        D();
        return true;
      }
      (function () {
        try {
          u = window.localStorage.getItem(a) || null;
        } catch (n) {
          u = null;
        }
        D();
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
              if (!n.objectStoreNames.contains(h)) {
                n.createObjectStore(h);
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
            const o = Object.create(null);
            if (!m) {
              n(o);
              return;
            }
            let i;
            try {
              i = m.transaction(h, "readonly").objectStore(h).openCursor();
            } catch (t) {
              n(o);
              return;
            }
            i.onsuccess = function () {
              const r = i.result;
              if (r) {
                try {
                  const n = r.value;
                  if (n && typeof n == "object") {
                    o[r.key] = n;
                  }
                } catch (n) {}
                r.continue();
              } else {
                n(o);
              }
            };
            i.onerror = function () {
              n(o);
            };
          });
        }).then(function (n) {
          g = n;
          E();
          w = true;
          D();
          if (p) {
            for (const n in f) {
              p(n);
            }
          }
          if (_) {
            _();
          }
        }).catch(function () {
          w = true;
        });
      })();
      const C = {
        Ba: function (n) {
          if (!n || typeof n != "string") {
            return n;
          }
          if (u === null && !d) {
            return n;
          }
          const t = y(n);
          return f[t] || f[M(t)] || n;
        },
        Oh: function (n) {
          const e = l[n];
          if (typeof e == "string" && e.length > 0) {
            return e;
          } else {
            return null;
          }
        },
        lp: function () {
          const t = B();
          const e = [];
          for (const o in t) {
            const i = t[o];
            let c = "";
            let a = "";
            try {
              const t = JSON.parse(i[(0, r.ua)("data")]);
              if (t && typeof t == "object") {
                const n = t[(0, r.ua)("_author")];
                if (typeof n == "string") {
                  c = n;
                }
                const e = t[(0, r.ua)("_version")];
                if (e != null) {
                  a = e + "";
                }
              }
            } catch (n) {}
            e.push({
              Xa: o,
              La: i && i[(0, r.ua)("name")] || o,
              dp: c,
              version: a
            });
          }
          return e;
        },
        hp: function (n) {
          const e = B()[n];
          if (e && typeof e[(0, r.ua)("data")] == "string") {
            return e[(0, r.ua)("data")];
          } else {
            return null;
          }
        },
        jh: function () {
          return u;
        },
        wp: function () {
          if (!u) {
            return null;
          }
          const n = B()[u];
          if (!n) {
            return null;
          }
          try {
            const t = JSON.parse(n[(0, r.ua)("data")]);
            if (t && typeof t == "object" && !Array.isArray(t)) {
              return t;
            } else {
              return null;
            }
          } catch (n) {
            return null;
          }
        },
        pp: x,
        vp: function (n, t) {
          let o;
          try {
            o = JSON.parse(t);
          } catch (n) {
            return null;
          }
          if (!o || typeof o != "object" && !Array.isArray(o)) {
            return null;
          }
          const c = B();
          const a = Array.isArray(o) ? undefined : o[(0, r.ua)("_name")];
          const s = typeof a == "string" && a || n || "Untitled Pack";
          const u = "pack-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1000000).toString(36);
          const f = {
            [(0, r.ua)("name")]: s,
            [(0, r.ua)("data")]: t
          };
          c[u] = f;
          v(u, f);
          return u;
        },
        _p: function (n, t, e) {
          try {
            JSON.parse(e);
          } catch (n) {
            return false;
          }
          const c = B();
          if (!c[n]) {
            return false;
          }
          const a = {};
          a[(0, r.ua)("name")] = t || c[n][(0, r.ua)("name")] || "Untitled Pack";
          a[(0, r.ua)("data")] = e;
          c[n] = a;
          v(n, a);
          if (u === n) {
            D();
          }
          return true;
        },
        mp: function (n) {
          const t = B();
          return !!t[n] && (delete t[n], b(n), u === n && x(null), true);
        },
        t_: function () {
          for (const n in g) {
            b(n);
          }
          g = Object.create(null);
          x(null);
        },
        fp: function (n) {
          d = !!n;
        },
        up: function (n, t) {
          if (n) {
            if (typeof t == "string" && t.length > 0) {
              l[n] = t;
            } else {
              delete l[n];
            }
          }
        },
        sp: function (n, t) {
          const o = y(n);
          if (o) {
            if (typeof t == "string" && t.length > 0) {
              f[o] = t;
            } else {
              delete f[o];
              delete f[M(o)];
            }
          }
        },
        op: function (n) {
          p = typeof n == "function" ? n : null;
          if (w && p) {
            for (const n in f) {
              p(n);
            }
          }
        },
        rp: function (n) {
          _ = typeof n == "function" ? n : null;
          if (w && _) {
            _();
          }
        }
      };
      e.default = C;
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
        for (var t = Array(n.length >> 2), e = 0; e < t.length; e++) {
          t[e] = 0;
        }
        for (e = 0; e < n.length * 8; e += 8) {
          t[e >> 5] |= (n.charCodeAt(e / 8) & 255) << e % 32;
        }
        return t;
      }
      function i(n) {
        var o = "";
        for (var i = 0; i < n.length * 32; i += 8) {
          o += String.fromCharCode(n[i >> 5] >>> i % 32 & 255);
        }
        return o;
      }
      function r(n, t) {
        n[t >> 5] |= 128 << t % 32;
        n[14 + (t + 64 >>> 9 << 4)] = t;
        var e = 1732584193;
        var o = -271733879;
        var i = -1732584194;
        var r = 271733878;
        for (var c = 0; c < n.length; c += 16) {
          var d = e;
          var h = o;
          var m = i;
          var g = r;
          o = f(o = f(o = f(o = f(o = u(o = u(o = u(o = u(o = s(o = s(o = s(o = s(o = a(o = a(o = a(o = a(o, i = a(i, r = a(r, e = a(e, o, i, r, n[c + 0], 7, -680876936), o, i, n[c + 1], 12, -389564586), e, o, n[c + 2], 17, 606105819), r, e, n[c + 3], 22, -1044525330), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 4], 7, -176418897), o, i, n[c + 5], 12, 1200080426), e, o, n[c + 6], 17, -1473231341), r, e, n[c + 7], 22, -45705983), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 8], 7, 1770035416), o, i, n[c + 9], 12, -1958414417), e, o, n[c + 10], 17, -42063), r, e, n[c + 11], 22, -1990404162), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 12], 7, 1804603682), o, i, n[c + 13], 12, -40341101), e, o, n[c + 14], 17, -1502002290), r, e, n[c + 15], 22, 1236535329), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 1], 5, -165796510), o, i, n[c + 6], 9, -1069501632), e, o, n[c + 11], 14, 643717713), r, e, n[c + 0], 20, -373897302), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 5], 5, -701558691), o, i, n[c + 10], 9, 38016083), e, o, n[c + 15], 14, -660478335), r, e, n[c + 4], 20, -405537848), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 9], 5, 568446438), o, i, n[c + 14], 9, -1019803690), e, o, n[c + 3], 14, -187363961), r, e, n[c + 8], 20, 1163531501), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 13], 5, -1444681467), o, i, n[c + 2], 9, -51403784), e, o, n[c + 7], 14, 1735328473), r, e, n[c + 12], 20, -1926607734), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 5], 4, -378558), o, i, n[c + 8], 11, -2022574463), e, o, n[c + 11], 16, 1839030562), r, e, n[c + 14], 23, -35309556), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 1], 4, -1530992060), o, i, n[c + 4], 11, 1272893353), e, o, n[c + 7], 16, -155497632), r, e, n[c + 10], 23, -1094730640), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 13], 4, 681279174), o, i, n[c + 0], 11, -358537222), e, o, n[c + 3], 16, -722521979), r, e, n[c + 6], 23, 76029189), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 9], 4, -640364487), o, i, n[c + 12], 11, -421815835), e, o, n[c + 15], 16, 530742520), r, e, n[c + 2], 23, -995338651), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 0], 6, -198630844), o, i, n[c + 7], 10, 1126891415), e, o, n[c + 14], 15, -1416354905), r, e, n[c + 5], 21, -57434055), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 12], 6, 1700485571), o, i, n[c + 3], 10, -1894986606), e, o, n[c + 10], 15, -1051523), r, e, n[c + 1], 21, -2054922799), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 8], 6, 1873313359), o, i, n[c + 15], 10, -30611744), e, o, n[c + 6], 15, -1560198380), r, e, n[c + 13], 21, 1309151649), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 4], 6, -145523070), o, i, n[c + 11], 10, -1120210379), e, o, n[c + 2], 15, 718787259), r, e, n[c + 9], 21, -343485551);
          e = l(e, d);
          o = l(o, h);
          i = l(i, m);
          r = l(r, g);
        }
        return [e, o, i, r];
      }
      function c(n, t, e, o, i, r) {
        return l(d(l(l(t, n), l(o, r)), i), e);
      }
      function a(n, t, e, o, i, r, a) {
        return c(t & e | ~t & o, n, t, i, r, a);
      }
      function s(n, t, e, o, i, r, a) {
        return c(t & o | e & ~o, n, t, i, r, a);
      }
      function u(n, t, e, o, i, r, a) {
        return c(t ^ e ^ o, n, t, i, r, a);
      }
      function f(n, t, e, o, i, r, a) {
        return c(e ^ (t | ~o), n, t, i, r, a);
      }
      function l(n, t) {
        var e = (n & 65535) + (t & 65535);
        return (n >> 16) + (t >> 16) + (e >> 16) << 16 | e & 65535;
      }
      function d(n, t) {
        return n << t | n >>> 32 - t;
      }
      __MUTATE0 = function (n) {
        return e(i(r(o(n), n.length * 8))).toLowerCase();
      };
      try {
        n.exports = __MUTATE0;
      } catch (n) {}
    },
    3543: function (n) {
      function e(n, e, o, i) {
        let c = new Date();
        c.setTime(c.getTime() + o * 24 * 60 * 60 * 1000);
        let a = "expires=" + c.toUTCString();
        let s = i ? ";domain=" + i : "";
        document.cookie = n + "=" + encodeURIComponent(e) + ";" + a + ";path=/" + s;
      }
      function o(n) {
        let o = n + "=";
        var i = "";
        try {
          i = decodeURIComponent(document.cookie);
        } catch (n) {
          return "";
        }
        let r = i.split(";");
        for (let n = 0; n < r.length; n++) {
          let t = r[n];
          while (t.charAt(0) == " ") {
            t = t.substring(1);
          }
          if (t.indexOf(o) == 0) {
            return t.substring(o.length, t.length);
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
        setData: function (n, t, o) {
          e(n, t, 365, o);
          try {
            window.localStorage.setItem(n, t);
          } catch (n) {}
        },
        e_: function (n, e, o) {
          e = e ? 1 : 0;
          const r = 3600000;
          const c = r * 24;
          const a = Math.floor(n / c);
          const s = Math.floor((n %= c) / r);
          const u = Math.floor((n %= r) / 60000);
          n %= 60000;
          let f = "";
          if (e === 1) {
            if (a !== 0) {
              f += a + "d";
            }
            if (s !== 0) {
              f += s + "h";
            }
            if (u !== 0) {
              f += u;
            }
          } else {
            if (a !== 0) {
              f += a + "d ";
            }
            if (s !== 0) {
              f += s + "h ";
            }
            if (u !== 0) {
              f += u + "min ";
            }
            if (o === 1 || a === 0 & s == 0 && u === 0) {
              f += Math.floor(n / 1000) + "s";
            }
          }
          return f;
        },
        o_: function (n, t) {
          return Number(Math.round(n + "e" + t) + "e-" + t);
        },
        ga: function (n, e) {
          e ||= window.location.href;
          n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          let o = RegExp("[\\?&]" + n + "=([^&#]*)").exec(e);
          if (o == null) {
            return null;
          } else {
            return o[1];
          }
        },
        ua: function (n) {
          return n + "";
        },
        $a: function (n) {
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
      t.Xa = 4733;
      n.exports = t;
    },
    9282: function (n, e, o) {
      const r = o(3970);
      const c = o(7251);
      let a = [];
      a[r.L] = {
        Ww: 160,
        Zw: 160,
        Kw: c.Fg - 160,
        Xw: c.jg * 5 / 20,
        km: "#ece5db",
        Fp: "snow_background_texture"
      };
      a[r.H] = {
        Ww: 160,
        Zw: c.jg * 5 / 20,
        Kw: c.Fg - 160,
        Xw: c.jg * 15 / 20,
        km: "#788F57",
        Fp: "plains_background_texture"
      };
      a[r.S] = {
        Ww: 160,
        Zw: c.jg * 15 / 20,
        Kw: c.Fg - 160,
        Xw: c.jg * 16 / 20,
        km: "#fcefbb",
        Fp: "beach_background_texture"
      };
      a[r.G] = {
        Ww: 160,
        Zw: c.jg * 16 / 20,
        Kw: c.Fg - 160,
        Xw: c.jg - 1000,
        km: "#2a8b9b",
        Fp: "river_background_texture"
      };
      a[r.N] = {
        Ww: 160,
        Zw: c.jg - 1000,
        Kw: c.Fg - 160,
        Xw: c.jg - 160,
        km: "#b38354",
        Fp: "desert_background_texture"
      };
      n.exports = a;
    },
    7251: function (n) {
      const o = {
        Ug: 1,
        ap: 1824,
        cp: 1026,
        i_: 130,
        Hd: 9,
        r_: 1 / 3,
        version: 7,
        xp: 1 / 6,
        Yp: 80,
        c_: 150,
        Fg: 10000,
        jg: 10000
      };
      o.a_ = Math.PI / 2;
      o.s_ = 255;
      o.$w = "#FFFFFF";
      o.Cp = 28;
      o.Gp = 70;
      o.u_ = 60;
      o.Np = 240;
      o.mg = 17;
      o.gg = ["#FFD700", "#C0C0C0", "#CD7F32"];
      o.wg = "#FFFFFF";
      o.f_ = 5;
      o.pg = "#2D3030";
      o.l_ = 1 / 12;
      o.Up = [0, 0, 0, 100, 30, 8, 2, 12, 32, 1, 2, 4];
      o.d_ = 2000;
      o.h_ = 5000;
      o.m_ = 10000;
      o.g_ = false;
      n.exports = o;
    },
    3287: function (n, e, o) {
      const r = o(3950);
      const c = o(3970);
      const a = o(9055);
      const s = o(1917);
      const u = [];
      u[s.un] = {
        Xh: 35,
        w_: 100,
        p_: a.en
      };
      u[s.wn] = {
        Xh: 60,
        w_: 300,
        p_: a.en
      };
      u[s.Un] = {
        Xh: 50,
        w_: 300,
        p_: a.en
      };
      u[s.V] = {
        Xh: 40,
        w_: 300,
        p_: a.en
      };
      u[s.hn] = {
        Xh: 50,
        p_: a.en,
        __: 1
      };
      u[s.Pn] = {
        Xh: 50,
        p_: a.en,
        __: 5,
        v_: 20
      };
      u[s.qn] = {
        Xh: 220,
        p_: a.J,
        __: 5,
        v_: 1
      };
      u[s.tn] = {
        Xh: 76,
        p_: a.en,
        b_: 15
      };
      u[s.Rn] = {
        Xh: 100,
        p_: a.en,
        b_: 35
      };
      u[s.fn] = {
        Xh: 75,
        p_: a.en,
        y_: 1
      };
      u[s.Nn] = {
        Xh: 92,
        p_: a.en,
        y_: 1
      };
      u[s.In] = {
        Xh: 92,
        p_: a.en,
        y_: 0
      };
      u[s.Fn] = {
        Xh: 20,
        p_: a.en,
        y_: 0
      };
      u[s.Jn] = {
        Xh: 92,
        p_: a.en,
        y_: 1
      };
      u[s.Yn] = {
        Xh: 58,
        p_: a.en,
        y_: 1
      };
      u[s.dn] = {
        Xh: 90,
        p_: a.en,
        M_: 1
      };
      u[s.An] = {
        Xh: 80,
        p_: a.en,
        M_: 1
      };
      u[s.Bn] = {
        Xh: 80,
        p_: a.en,
        M_: 1
      };
      u[s.Dn] = {
        Xh: 60,
        p_: a.en,
        y_: 1
      };
      u[s.mn] = {
        v_: 20,
        Xh: 45,
        w_: 380,
        T_: 20,
        p_: a.en
      };
      u[s.ln] = {
        v_: 35,
        Xh: 45,
        w_: 500,
        p_: a.en
      };
      u[s.Vn] = {
        v_: 45,
        Xh: 45,
        w_: 500,
        p_: a.en
      };
      u[s.Tn] = {
        v_: 10,
        Xh: 42,
        w_: 1200,
        T_: 24,
        p_: a.en
      };
      u[s.gn] = {
        Xh: 45,
        w_: 380,
        p_: a.en
      };
      u[s.Gn] = {
        Xh: 45,
        w_: 380,
        p_: a.en,
        b_: 70,
        na: 20
      };
      u[s.En] = {
        Xh: 59,
        w_: 1750,
        p_: a.en
      };
      u[s.kn] = {
        Xh: 45,
        w_: 800,
        p_: a.en
      };
      u[s.yn] = {
        Xh: 50,
        w_: 380,
        p_: a.en
      };
      u[s.W] = {
        Xh: 40,
        w_: 500,
        p_: a.en
      };
      u[s.$] = {
        Xh: 40,
        w_: 250,
        p_: a.en
      };
      u[s.bn] = {
        Xh: 90,
        w_: 380,
        p_: a.en,
        k_: 1.6,
        A_: r.v | r.k,
        B_: c.H
      };
      u[s.jn] = {
        Xh: 20,
        w_: 380,
        p_: a.en,
        k_: 1.6,
        A_: r.v | r.k,
        B_: c.H
      };
      u[s.zn] = {
        Xh: 90,
        w_: 1000,
        p_: a.en,
        k_: 1.6,
        A_: r.v | r.A,
        v_: 19
      };
      u[s.xn] = {
        Xh: 90,
        w_: 380,
        p_: a.en,
        k_: 1.2,
        A_: r.v | r.B | r.A,
        v_: 14,
        B_: c.G
      };
      u[s.Qn] = {
        Xh: 90,
        w_: 450,
        p_: a.en,
        k_: 1.2,
        A_: r.v | r.B | r.A,
        v_: 14,
        B_: c.G
      };
      u[s.Cn] = {
        Xh: 50,
        w_: 380,
        p_: a.en,
        k_: 1.6,
        A_: r.v | r.A,
        v_: 14,
        B_: c.H
      };
      u[s.Sn] = {
        Xh: 100,
        w_: 380,
        p_: a.en,
        k_: 0.4,
        A_: r.v,
        v_: 15,
        B_: c.H
      };
      u[s.Ln] = {
        Xh: 90,
        w_: 5000,
        p_: a.en,
        k_: 1.6,
        A_: r.v | r.A,
        v_: 30,
        B_: c.L
      };
      u[s.Hn] = {
        Xh: 100,
        w_: 5000,
        p_: a.en,
        k_: 1.15,
        A_: r.v | r.A,
        v_: 30,
        B_: c.H
      };
      u[s.pn] = {
        Xh: 40,
        w_: 4,
        p_: a.en
      };
      u[s.vn] = {
        Xh: 45,
        w_: 400,
        p_: a.en
      };
      u[s.Mn] = {
        Xh: 54,
        w_: 400,
        p_: a.en
      };
      u[s.On] = {
        Xh: 35,
        w_: 150,
        p_: a.en
      };
      n.exports = u;
    },
    3424: function (n, e, o) {
      const r = o(9657);
      const c = [];
      c[r.zn] = {
        description: "A Golden Cow has appeared!",
        duration: 240
      };
      c[r.Hn] = {
        description: "A Dragon has appeared!",
        duration: 480
      };
      c[r.Ln] = {
        description: "A Mammoth has appeared!",
        duration: 480
      };
      n.exports = c;
    },
    1624: function (n, e, o) {
      const r = o(4002);
      const c = o(6597);
      const a = [];
      a[r.J] = {};
      a[r.Wn] = {
        rm: c.$i,
        Zm: 250,
        Ph: 0,
        description: "Become a bush",
        La: "Bush Hat",
        Sp: true
      };
      a[r.Zn] = {
        rm: c.oi,
        Zm: 5000,
        description: "Increased melee damage",
        Ph: 10,
        D_: 1.25,
        E_: 0.85,
        La: "Berserker Gear"
      };
      a[r.Kn] = {
        rm: c.ri,
        Zm: 3000,
        description: "Regenerate health",
        Ph: 13,
        x_: 25,
        La: "Jungle Gear"
      };
      a[r.Xn] = {
        rm: c.ci,
        Zm: 5000,
        description: "Receive reduced damage",
        Ph: 10,
        C_: 0.75,
        E_: 0.95,
        La: "Crystal Gear"
      };
      a[r.$n] = {
        rm: c.si,
        Zm: 1000,
        description: "Attackers receive damage",
        Ph: 10,
        z_: 0.45,
        La: "Spike Gear"
      };
      a[r.nt] = {
        rm: c.ui,
        Zm: 4000,
        description: "Gain more health",
        Ph: 15,
        w_: 130,
        La: "Immunity Gear"
      };
      a[r.tt] = {
        rm: c.fi,
        Zm: 1500,
        description: "Move quicker",
        Ph: 23,
        E_: 1.23,
        La: "Boost Hat"
      };
      a[r.et] = {
        rm: c.Yi,
        Zm: 150,
        description: "Apples become more succulent",
        Ph: 5,
        E_: 1.05,
        La: "Apple Hat"
      };
      a[r.ot] = {
        rm: c.dr,
        Zm: 4000,
        description: "Move fast in ocean",
        Ph: 5,
        E_: 0.75,
        U_: 1.5,
        La: "Scuba Gear"
      };
      a[r.it] = {
        rm: c.gr,
        Zm: 3500,
        description: "Become invisible when still",
        Ph: 5,
        La: "Hood",
        Sp: true
      };
      a[r.rt] = {
        rm: c.$r,
        Zm: 4000,
        description: "Destroy buildings faster",
        Ph: 10,
        La: "Demolist",
        E_: 0.3
      };
      a[r.at] = {
        rm: c.Or,
        Zm: 1000,
        description: "Its curse makes you kill",
        Ph: 2,
        La: "Pumpking's Curse",
        E_: 1.15,
        z_: 0.3,
        U_: 0.7,
        D_: 1.15,
        w_: 120,
        Ep: true
      };
      a[r.ct] = {
        rm: c.vc,
        Zm: 700,
        description: "Move fast in the snow",
        Ph: 0,
        E_: 1,
        H_: 1.7,
        La: "Winter Hat"
      };
      n.exports = a;
    },
    9299: function (n, e, o) {
      const r = o(1917);
      const c = o(6410);
      const a = o(6597);
      const s = o(7262);
      const u = o(3266);
      const f = [];
      f[c.lt] = {
        Xa: c.lt,
        vm: c.It,
        L_: u.tn,
        cg: a.Ro,
        rm: a.lt,
        La: "Tool Hammer",
        description: "Gather materials",
        range: 80,
        zp: 0,
        T_: 25,
        reload: 300,
        S_: 30,
        G_: 200,
        Km: 0,
        am: 0,
        qh: -3.5,
        Ph: 1
      };
      f[c.It] = {
        Xa: c.It,
        vm: c.Ft,
        L_: u.Zc,
        cg: a.zr,
        rm: a.It,
        La: "Gold Tool Hammer",
        description: "Gather materials",
        range: 80,
        zp: 0,
        T_: 32,
        reload: 300,
        S_: 30,
        G_: 200,
        Km: 0,
        am: 0,
        qh: -3.5,
        Ph: 1
      };
      f[c.Ft] = {
        Xa: c.Ft,
        vm: c.jt,
        L_: u.Kc,
        cg: a.Ur,
        rm: a.Ft,
        La: "Diamond Tool Hammer",
        description: "Gather materials",
        range: 80,
        zp: 0,
        T_: 38,
        reload: 300,
        S_: 30,
        G_: 200,
        Km: 0,
        am: 0,
        qh: -3.5,
        Ph: 1
      };
      f[c.jt] = {
        Xa: c.jt,
        cg: a.Hr,
        rm: a.jt,
        La: "Ruby Tool Hammer",
        description: "Gather materials",
        range: 80,
        zp: 0,
        T_: 41,
        reload: 300,
        S_: 30,
        G_: 200,
        Km: 0,
        am: 0,
        qh: -3.5,
        Ph: 1
      };
      f[c.dt] = {
        Xa: c.dt,
        vm: c.ue,
        L_: u.tn,
        N_: s.J,
        J_: s.Y,
        cg: a.qo,
        rm: a.dt,
        La: "Stone Sword",
        description: "Sharp and pointy",
        range: 135,
        G_: 250,
        zp: 0,
        T_: 35,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: -8,
        Ph: -4
      };
      f[c.ue] = {
        Xa: c.ue,
        vm: c.fe,
        L_: u.Zc,
        N_: s.J,
        J_: s.Y,
        cg: a.ue,
        rm: a.ue,
        La: "Gold Sword",
        description: "Sharp and pointy",
        range: 135,
        G_: 250,
        zp: 0,
        T_: 38,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: -8,
        Ph: -4
      };
      f[c.fe] = {
        Xa: c.fe,
        vm: c.le,
        L_: u.Kc,
        N_: s.J,
        J_: s.Y,
        cg: a.fe,
        rm: a.fe,
        La: "Diamond Sword",
        description: "Sharp and pointy",
        range: 135,
        G_: 250,
        zp: 0,
        T_: 42,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: -8,
        Ph: -4
      };
      f[c.le] = {
        Xa: c.le,
        N_: s.J,
        J_: s.Y,
        cg: a.le,
        rm: a.le,
        La: "Ruby Sword",
        description: "Sharp and pointy",
        range: 135,
        G_: 250,
        zp: 0,
        T_: 46,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: -8,
        Ph: -4
      };
      f[c.Qt] = {
        Xa: c.Qt,
        N_: s.J,
        J_: s.K,
        cg: a.uc,
        rm: a.sc,
        La: "Crystal Dagger",
        description: "A stubbier sword",
        range: 80,
        G_: 100,
        zp: 0,
        T_: 34,
        reload: 150,
        Y_: 1.08,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 20
      };
      f[c.Vt] = {
        Xa: c.Vt,
        N_: s.J,
        J_: s.K,
        cg: a.Qr,
        rm: a.Xr,
        La: "Ruby Dagger",
        description: "A stubbier sword",
        range: 80,
        G_: 100,
        zp: 0,
        T_: 34,
        reload: 150,
        Y_: 1.08,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 20
      };
      f[c.Rt] = {
        Xa: c.Rt,
        vm: c.Vt,
        L_: u.Kc,
        N_: s.J,
        J_: s.K,
        cg: a.Vr,
        rm: a.Kr,
        La: "Diamond Dagger",
        description: "A stubbier sword",
        range: 80,
        G_: 100,
        zp: 0,
        T_: 32,
        reload: 150,
        Y_: 1.07,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 20
      };
      f[c.qt] = {
        vm: c.Rt,
        L_: u.Zc,
        Xa: c.qt,
        N_: s.J,
        J_: s.K,
        cg: a.Rr,
        rm: a.Zr,
        La: "Gold Dagger",
        description: "A stubbier sword",
        range: 80,
        G_: 100,
        zp: 0,
        T_: 30,
        reload: 150,
        Y_: 1.06,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 20
      };
      f[c.Pt] = {
        vm: c.qt,
        L_: u.tn,
        Xa: c.Pt,
        N_: s.J,
        J_: s.K,
        cg: a.qr,
        rm: a.Wr,
        La: "Stone Dagger",
        description: "A stubbier sword",
        range: 80,
        G_: 100,
        zp: 0,
        T_: 28,
        reload: 150,
        Y_: 1.05,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 20
      };
      f[c.yt] = {
        Xa: c.yt,
        vm: c.zt,
        L_: u.tn,
        N_: s.Y,
        J_: s.Y,
        cg: a.Mi,
        rm: a.yt,
        La: "Katana",
        description: "Excellent melee weapon",
        range: 140,
        G_: 150,
        zp: 0,
        T_: 40,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: 1,
        Ph: 3
      };
      f[c.zt] = {
        Xa: c.zt,
        vm: c.Ct,
        L_: u.Zc,
        N_: s.Y,
        J_: s.Y,
        cg: a.yr,
        rm: a.zt,
        La: "Gold Katana",
        description: "Excellent melee weapon",
        range: 140,
        G_: 150,
        zp: 0,
        T_: 43,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: 1,
        Ph: 3
      };
      f[c.Ct] = {
        Xa: c.Ct,
        vm: c.Lt,
        L_: u.Kc,
        N_: s.Y,
        J_: s.Y,
        cg: a.br,
        rm: a.Ct,
        La: "Diamond Katana",
        description: "Excellent melee weapon",
        range: 140,
        G_: 150,
        zp: 0,
        T_: 46.5,
        reload: 300,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: 1,
        Ph: 3
      };
      f[c.Lt] = {
        Xa: c.Lt,
        N_: s.Y,
        J_: s.Y,
        cg: a.Br,
        rm: a.Lt,
        La: "Chillrend",
        description: "A powerful force flows through this blade.",
        range: 140,
        G_: 150,
        zp: 0,
        T_: 48.5,
        reload: 300,
        Y_: 0.9,
        Km: 0,
        am: 0,
        qh: 1,
        Ph: 3
      };
      f[c.Zt] = {
        Xa: c.Zt,
        N_: s.Y,
        J_: s.Y,
        cg: a.Ic,
        rm: a.Zt,
        La: "Daedric Scythe",
        description: "Whispers fill the air",
        range: 160,
        G_: 150,
        zp: 0,
        T_: 52,
        reload: 450,
        Y_: 0.85,
        Km: 0,
        am: 0,
        qh: -5,
        Ph: 20
      };
      f[c.O] = {
        Xa: c.O,
        vm: c.St,
        L_: u.tn,
        N_: s.J,
        J_: s.O,
        cg: a.hi,
        rm: a.O,
        La: "Stick",
        description: "Gathers resources quickly",
        range: 100,
        zp: 0,
        T_: 1,
        reload: 400,
        Km: 0,
        G_: 60,
        am: 0,
        qh: 4,
        Ph: 0,
        I_: 7,
        F_: 7,
        j_: 7,
        O_: 4
      };
      f[c.St] = {
        Xa: c.St,
        vm: c.Gt,
        L_: u.Zc,
        N_: s.J,
        J_: s.O,
        cg: a.Dr,
        rm: a.St,
        La: "Gold Stick",
        description: "Gathers resources quickly",
        range: 100,
        zp: 0,
        T_: 1,
        reload: 400,
        Km: 0,
        G_: 60,
        am: 0,
        qh: 4,
        Ph: 0,
        I_: 8,
        F_: 8,
        j_: 8,
        O_: 5
      };
      f[c.Gt] = {
        Xa: c.Gt,
        vm: c.Nt,
        L_: u.Kc,
        N_: s.J,
        J_: s.O,
        cg: a.Jr,
        rm: a.Gt,
        La: "Diamond Stick",
        description: "Gathers resources quickly",
        range: 100,
        zp: 0,
        T_: 1,
        reload: 400,
        Km: 0,
        G_: 60,
        am: 0,
        qh: 4,
        Ph: 0,
        I_: 9,
        F_: 9,
        j_: 9,
        O_: 6
      };
      f[c.Nt] = {
        Xa: c.Nt,
        N_: s.J,
        J_: s.O,
        cg: a.Yr,
        rm: a.Nt,
        La: "Ruby Stick",
        description: "Gathers resources quickly",
        range: 100,
        zp: 0,
        T_: 1,
        reload: 400,
        Km: 0,
        G_: 60,
        am: 0,
        qh: 4,
        Ph: 0,
        I_: 10,
        F_: 10,
        j_: 10,
        O_: 7
      };
      f[c.ht] = {
        Xa: c.ht,
        vm: c.Ht,
        L_: u.tn,
        N_: s.J,
        J_: s.I,
        cg: a.Qo,
        rm: a.ht,
        La: "Stone Spear",
        description: "Long melee range",
        range: 160,
        zp: 0,
        T_: 49,
        Y_: 0.81,
        G_: 375,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: 2
      };
      f[c.Ut] = {
        Xa: c.Ut,
        vm: c.se,
        L_: u.Kc,
        N_: s.J,
        J_: s.I,
        cg: a.Mr,
        rm: a.Ut,
        La: "Diamond Spear",
        description: "Long melee range",
        range: 160,
        zp: 0,
        T_: 53,
        Y_: 0.81,
        G_: 375,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: 2
      };
      f[c.se] = {
        Xa: c.se,
        N_: s.J,
        J_: s.I,
        cg: a.Hc,
        rm: a.se,
        La: "Ruby Spear",
        description: "Long melee range",
        range: 160,
        zp: 0,
        T_: 56,
        Y_: 0.81,
        G_: 375,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: 2
      };
      f[c.Ht] = {
        Xa: c.Ht,
        vm: c.Ut,
        L_: u.Zc,
        N_: s.J,
        J_: s.I,
        cg: a.Tr,
        rm: a.Ht,
        La: "Gold Spear",
        description: "Long melee range",
        range: 160,
        zp: 0,
        T_: 51,
        Y_: 0.81,
        G_: 375,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: 2
      };
      f[c.kt] = {
        Xa: c.kt,
        vm: c.Yt,
        L_: u.tn,
        N_: s.I,
        J_: s.I,
        cg: a.qi,
        rm: a.kt,
        La: "Naginata",
        description: "Long melee range",
        range: 165,
        zp: 0,
        T_: 52,
        Y_: 0.81,
        G_: 400,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: -4
      };
      f[c.Yt] = {
        Xa: c.Yt,
        vm: c.Jt,
        L_: u.Zc,
        N_: s.I,
        J_: s.I,
        cg: a.Cr,
        rm: a.Yt,
        La: "Gold Naginata",
        description: "Long melee range",
        range: 165,
        zp: 0,
        T_: 54,
        Y_: 0.81,
        G_: 400,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: -4
      };
      f[c.Jt] = {
        Xa: c.Jt,
        vm: c.ae,
        L_: u.Kc,
        N_: s.I,
        J_: s.I,
        cg: a.Er,
        rm: a.Jt,
        La: "Diamond Naginata",
        description: "Long melee range",
        range: 165,
        zp: 0,
        T_: 56,
        Y_: 0.81,
        G_: 400,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: -4
      };
      f[c.ae] = {
        Xa: c.ae,
        N_: s.I,
        J_: s.I,
        cg: a.Uc,
        rm: a.ae,
        La: "Ruby Naginata",
        description: "Long melee range",
        range: 165,
        zp: 0,
        T_: 59,
        Y_: 0.81,
        G_: 400,
        reload: 700,
        Km: 0,
        am: 0,
        qh: 0,
        Ph: -4
      };
      f[c.Z] = {
        Xa: c.Z,
        vm: c.ie,
        L_: u.tn,
        N_: s.J,
        J_: s.Z,
        cg: a.wr,
        rm: a.Z,
        La: "Bat",
        description: "Hit enemies for a home run",
        range: 115,
        zp: 0,
        T_: 28,
        Y_: 0.92,
        G_: 870,
        reload: 600,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 2
      };
      f[c.ie] = {
        Xa: c.ie,
        vm: c.re,
        L_: u.Zc,
        J_: s.Z,
        cg: a.Dc,
        rm: a.Bc,
        La: "Golden Bat",
        description: "Hit enemies for a home run",
        range: 115,
        zp: 0,
        T_: 28,
        Y_: 0.92,
        G_: 970,
        reload: 600,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 2
      };
      f[c.re] = {
        Xa: c.re,
        vm: c.ce,
        L_: u.Kc,
        J_: s.Z,
        cg: a.xc,
        rm: a.Ec,
        La: "Diamond Bat",
        description: "Hit enemies for a home run",
        range: 115,
        zp: 0,
        T_: 28,
        Y_: 0.92,
        G_: 1070,
        reload: 600,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 2
      };
      f[c.ce] = {
        Xa: c.ce,
        J_: s.Z,
        cg: a.zc,
        rm: a.Cc,
        La: "Ruby Bat",
        description: "Hit enemies for a home run",
        range: 115,
        zp: 0,
        T_: 28,
        Y_: 0.92,
        G_: 1170,
        reload: 600,
        Km: 0,
        am: 0,
        qh: 10,
        Ph: 2
      };
      f[c.Wt] = {
        Xa: c.Wt,
        vm: c.Zt,
        L_: u.Zc,
        N_: s.J,
        J_: s.J,
        cg: a.Yc,
        rm: a.Wt,
        La: "Secret Item",
        description: "Dont leak how to get it :)",
        range: 115,
        zp: 0,
        T_: 28,
        Y_: 0.92,
        G_: 1570,
        reload: 1250,
        Km: 0,
        am: 0,
        qh: 40,
        Ph: 40
      };
      f[c.bt] = {
        Xa: c.bt,
        vm: c.te,
        L_: u.tn,
        N_: s.J,
        J_: s.J,
        cg: a.vi,
        rm: a.bt,
        La: "Hammer",
        description: "Breaks structures faster",
        range: 80,
        zp: 1,
        T_: 12,
        S_: 76,
        Y_: 0.89,
        G_: 200,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 5,
        Ph: 2
      };
      f[c.te] = {
        Xa: c.te,
        vm: c.ee,
        L_: u.Zc,
        cg: a.yc,
        rm: a.bc,
        La: "Golden Hammer",
        description: "Breaks structures faster",
        range: 80,
        zp: 1,
        T_: 15,
        S_: 79,
        Y_: 0.89,
        G_: 200,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 5,
        Ph: 2
      };
      f[c.ee] = {
        Xa: c.ee,
        vm: c.oe,
        L_: u.Kc,
        cg: a.Tc,
        rm: a.Mc,
        La: "Diamond Hammer",
        description: "Breaks structures faster",
        range: 80,
        zp: 1,
        T_: 18,
        S_: 82,
        Y_: 0.89,
        G_: 200,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 5,
        Ph: 2
      };
      f[c.oe] = {
        Xa: c.oe,
        cg: a.Ac,
        rm: a.kc,
        La: "Ruby Hammer",
        description: "Breaks structures faster",
        range: 80,
        zp: 1,
        T_: 21,
        S_: 85,
        Y_: 0.89,
        G_: 200,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 5,
        Ph: 2
      };
      f[c.gt] = {
        Xa: c.gt,
        vm: c.Dt,
        L_: u.tn,
        N_: s.J,
        J_: s.q,
        cg: a.Wo,
        rm: a.Ko,
        La: "Stone Axe",
        description: "Gathers materials faster",
        range: 90,
        zp: 0,
        T_: 30,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: -2,
        Ph: 2,
        I_: 2,
        F_: 2,
        j_: 2,
        O_: 2
      };
      f[c.Dt] = {
        Xa: c.Dt,
        vm: c.Bt,
        L_: u.Zc,
        N_: s.J,
        J_: s.q,
        cg: a._r,
        rm: a.Dt,
        La: "Gold Axe",
        description: "Gathers materials faster",
        range: 90,
        zp: 0,
        T_: 33,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: -2,
        Ph: 2,
        I_: 2,
        F_: 2,
        j_: 2,
        O_: 2
      };
      f[c.Bt] = {
        Xa: c.Bt,
        vm: c.de,
        L_: u.Kc,
        N_: s.J,
        J_: s.q,
        cg: a.pr,
        rm: a.Bt,
        La: "Diamond Axe",
        description: "Gathers materials faster",
        range: 90,
        zp: 0,
        T_: 36,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: -2,
        Ph: 2,
        I_: 2,
        F_: 2,
        j_: 2,
        O_: 2
      };
      f[c.de] = {
        Xa: c.de,
        N_: s.J,
        J_: s.q,
        cg: a.Jc,
        rm: a.de,
        La: "Diamond Axe",
        description: "Gathers materials faster",
        range: 90,
        zp: 0,
        T_: 39,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: -2,
        Ph: 2,
        I_: 2,
        F_: 2,
        j_: 2,
        O_: 2
      };
      f[c.At] = {
        Xa: c.At,
        vm: c.xt,
        L_: u.tn,
        N_: s.q,
        J_: s.q,
        cg: a.ar,
        rm: a.At,
        La: "Great Axe",
        description: "More powerful axe.",
        range: 94,
        zp: 0,
        T_: 43,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 4,
        Ph: 2,
        I_: 4,
        F_: 4,
        j_: 4,
        O_: 2
      };
      f[c.xt] = {
        Xa: c.xt,
        vm: c.Et,
        L_: u.Zc,
        N_: s.q,
        J_: s.q,
        cg: a.kr,
        rm: a.xt,
        La: "Gold Great Axe",
        description: "More powerful axe.",
        range: 94,
        zp: 0,
        T_: 42,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 4,
        Ph: 2,
        I_: 4,
        F_: 4,
        j_: 4,
        O_: 2
      };
      f[c.Et] = {
        Xa: c.Et,
        vm: c.he,
        L_: u.Kc,
        N_: s.q,
        J_: s.q,
        cg: a.vr,
        rm: a.Et,
        La: "Diamond Great Axe",
        description: "More powerful axe.",
        range: 94,
        zp: 0,
        T_: 46,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 4,
        Ph: 2,
        I_: 4,
        F_: 4,
        j_: 4,
        O_: 2
      };
      f[c.he] = {
        Xa: c.he,
        N_: s.q,
        J_: s.q,
        cg: a.Nc,
        rm: a.he,
        La: "Ruby Great Axe",
        description: "More powerful axe.",
        range: 94,
        zp: 0,
        T_: 50,
        G_: 250,
        reload: 400,
        Km: 0,
        am: 0,
        qh: 4,
        Ph: 2,
        I_: 4,
        F_: 4,
        j_: 4,
        O_: 2
      };
      f[c.F] = {
        Xa: c.F,
        Zm: [0, 0, 10, 0],
        N_: s.j,
        P_: s.Y,
        J_: s.F,
        cg: a.Vo,
        rm: a.F,
        La: "Stone Musket",
        description: "Deal Long Range Damage",
        range: 1000,
        zp: 1,
        T_: 49,
        reload: 1500,
        q_: a._n,
        Mg: 2100,
        Km: 1,
        am: 1,
        Y_: 0.63,
        qh: 0,
        Ph: 0
      };
      f[c.j] = {
        Xa: c.j,
        Zm: [0, 4, 0, 0],
        N_: s.J,
        J_: s.j,
        cg: a.Li,
        rm: a.j,
        La: "Bow",
        description: "Deal Long Range Damage",
        range: 800,
        zp: 1,
        T_: 25,
        reload: 600,
        q_: a.Si,
        Mg: 1700,
        Km: 1,
        am: 1,
        Y_: 0.75,
        qh: 0,
        Ph: 35
      };
      f[c.Ot] = {
        Xa: c.Ot,
        Zm: [80, 80, 80, 80],
        N_: s.J,
        J_: s.R,
        cg: a.gc,
        rm: a.Ot,
        La: "Pearl",
        description: "Teleport on impact",
        range: 800,
        zp: 1,
        T_: 10,
        reload: 7500,
        q_: a.Ot,
        Mg: 1500,
        Km: 1,
        am: 1,
        Y_: 0.5,
        qh: 0,
        Ph: 35
      };
      f[c.Tt] = {
        Xa: c.Tt,
        Zm: [0, 10, 0, 0],
        N_: s.j,
        J_: s.j | s.O | s.q,
        cg: a.Ni,
        rm: a.Tt,
        La: "XBow",
        description: "Rapid fire bow",
        range: 800,
        zp: 1,
        T_: 27,
        reload: 235,
        q_: a.Si,
        Mg: 1700,
        Km: 1,
        am: 1,
        Y_: 0.5,
        qh: 0,
        Ph: 30
      };
      f[c.wt] = {
        Xa: c.wt,
        Zm: [0, 10, 0, 0],
        cg: a.Zo,
        rm: a.Vi,
        La: "Wood Wall",
        description: "A sturdy wall",
        zp: 3,
        Km: 2,
        R_: 5,
        qh: 0,
        Ph: 15,
        V_: r.gn,
        am: 2
      };
      f[c.On] = {
        Xa: c.On,
        Zm: [0, 50, 50, 0],
        N_: s.q | s.O | s.Z,
        J_: s.J,
        cg: a.mc,
        rm: a.On,
        La: "Teleporter",
        description: "Teleports to location on map",
        zp: 9,
        Km: 2,
        R_: 5,
        qh: 0,
        Ph: 15,
        V_: r.On,
        am: 2
      };
      f[c.En] = {
        Xa: c.En,
        Zm: [0, 0, 35, 10],
        N_: s.J,
        J_: s.J,
        cg: a.Ri,
        rm: a.Wi,
        La: "Castle Wall",
        description: "A very sturdy wall",
        zp: 3,
        Km: 2,
        R_: 8,
        qh: 0,
        Ph: 13,
        V_: r.En,
        am: 2
      };
      f[c.kn] = {
        Xa: c.kn,
        Zm: [0, 200, 150, 10],
        N_: s.J,
        J_: s.J,
        cg: a.xi,
        rm: a.Bi,
        La: "Turret",
        description: "Defence for your base",
        zp: 10,
        Km: 2,
        R_: 6,
        qh: 0,
        Ph: 25,
        V_: r.kn,
        am: 2
      };
      f[c.yn] = {
        Xa: c.yn,
        N_: s.J,
        J_: s.J,
        Zm: [0, 200, 200, 200],
        cg: a.bi,
        rm: a.cr,
        La: "Cosy Bed",
        description: "Respawn at the bed",
        zp: 9,
        Km: 2,
        R_: 8,
        qh: 0,
        Ph: 25,
        V_: r.yn,
        am: 2
      };
      f[c.vn] = {
        Xa: c.vn,
        Zm: [0, 50, 10, 0],
        cg: a.gi,
        rm: a._i,
        La: "Windmill",
        description: "Generates score over time",
        zp: 5,
        Km: 2,
        R_: -5,
        qh: 0,
        Ph: 38,
        V_: r.vn,
        am: 2
      };
      f[c.Mn] = {
        Xa: c.Mn,
        Zm: [0, 100, 50, 0],
        N_: s.J,
        J_: s.J,
        cg: a.gi,
        rm: a._i,
        La: "Powermill",
        description: "Generates more score over time",
        zp: 5,
        Km: 2,
        R_: 5,
        qh: 0,
        Ph: 38,
        V_: r.Mn,
        am: 2
      };
      f[c.mn] = {
        Xa: c.mn,
        Zm: [0, 20, 5, 0],
        cg: a.$o,
        rm: a.Qi,
        La: "Spike",
        description: "Sharp defence",
        zp: 4,
        Km: 2,
        R_: 2,
        qh: 0,
        Ph: 15,
        V_: r.mn,
        am: 2
      };
      f[c.ln] = {
        Xa: c.ln,
        N_: s.J,
        J_: s.J,
        Zm: [0, 30, 10, 0],
        cg: a.Ai,
        rm: a.er,
        La: "Hard Spike",
        description: "Sharper defence",
        zp: 4,
        Km: 2,
        R_: 2,
        qh: 0,
        Ph: 15,
        V_: r.ln,
        am: 2
      };
      f[c.Vn] = {
        Xa: c.Vn,
        N_: s.V,
        J_: s.J,
        Zm: [0, 40, 20, 10],
        cg: a._c,
        rm: a.wc,
        La: "Ice Spike",
        description: "Even Sharper defence",
        zp: 4,
        Km: 2,
        R_: 2,
        qh: 0,
        Ph: 15,
        V_: r.Vn,
        am: 2
      };
      f[c.Bn] = {
        Xa: c.Bn,
        N_: s.J,
        J_: s.J,
        Zm: [0, 200, 0, 0],
        cg: a.Ci,
        rm: a.nr,
        La: "Cherry wood farm",
        description: "Used for decoration and wood",
        zp: 6,
        Km: 2,
        R_: 3,
        qh: 0,
        Ph: 47,
        V_: r.Bn,
        am: 2
      };
      f[c.An] = {
        Xa: c.An,
        N_: s.J,
        J_: s.J,
        Zm: [0, 200, 0, 0],
        cg: a.zi,
        rm: a.tr,
        La: "Wood farm",
        description: "Used for decoration and wood",
        zp: 6,
        Km: 2,
        R_: 3,
        qh: 0,
        Ph: 47,
        V_: r.An,
        am: 2
      };
      f[c.Dn] = {
        Xa: c.Dn,
        N_: s.J,
        J_: s.J,
        Zm: [0, 0, 200, 0],
        cg: a.Ui,
        rm: a.Xi,
        La: "Stone farm",
        description: "Used for decoration and stone",
        zp: 6,
        Km: 2,
        R_: 3,
        qh: 0,
        Ph: 20,
        V_: r.Dn,
        am: 2
      };
      f[c.Mt] = {
        Xa: c.Mt,
        N_: s.J,
        J_: s.J,
        Zm: [200, 0, 0, 0],
        cg: a.Hi,
        rm: a.$i,
        La: "Berry farm",
        description: "Used for decoration and berries",
        zp: 6,
        Km: 2,
        R_: 3,
        qh: 0,
        Ph: 17,
        V_: r.hn,
        am: 2
      };
      f[c.Tn] = {
        Xa: c.Tn,
        Zm: [0, 30, 30, 0],
        N_: s.q | s.O,
        J_: s.J,
        cg: a.Ti,
        rm: a.ir,
        La: "Castle Spike",
        description: "Great for bases",
        zp: 4,
        Km: 2,
        R_: -8,
        qh: 0,
        Ph: 14,
        V_: r.Tn,
        am: 2
      };
      f[c.V] = {
        Xa: c.V,
        Zm: [0, 5, 20, 0],
        N_: s.J,
        J_: s.V,
        cg: a.Xo,
        rm: a.Zi,
        La: "Boost",
        description: "Provides a thrust",
        zp: 7,
        Km: 2,
        R_: -5,
        qh: 0,
        Ph: 3,
        V_: r.V,
        am: 2
      };
      f[c.W] = {
        Xa: c.W,
        Zm: [0, 30, 30, 0],
        N_: s.J,
        J_: s.W,
        cg: a.ti,
        rm: a.Ki,
        La: "Trap",
        description: "Snared enemies are stuck",
        zp: 7,
        Km: 2,
        R_: 2,
        qh: 0,
        Ph: 26,
        V_: r.W,
        am: 2
      };
      f[c.$] = {
        Xa: c.$,
        Zm: [25, 80, 50, 0],
        Q_: 4,
        N_: s.J,
        J_: s.$,
        cg: a.ac,
        rm: a.Fh,
        La: "Heal Pad",
        description: "Allies around you are healed",
        zp: 11,
        Km: 2,
        R_: 2,
        qh: 0,
        Ph: 26,
        V_: r.$,
        am: 2,
        W_: 10,
        reload: 500,
        range: 300
      };
      f[c.wn] = {
        Xa: c.wn,
        Zm: [0, 20, 0, 0],
        N_: s.J,
        J_: s.wn,
        cg: a.ni,
        rm: a.rr,
        La: "Platform",
        description: "Shoot over structures",
        zp: 8,
        Km: 2,
        R_: -2,
        qh: 0,
        Ph: 8,
        V_: r.wn,
        am: 2
      };
      f[c.Un] = {
        Xa: c.Un,
        Zm: [0, 20, 0, 0],
        N_: s.J,
        J_: s.wn,
        cg: a.Ir,
        rm: a.Un,
        La: "Roof",
        description: "Take cover from projectiles",
        zp: 8,
        Km: 2,
        R_: 0,
        qh: 0,
        Ph: 15,
        V_: r.Un,
        am: 2
      };
      f[c._t] = {
        Xa: c._t,
        Zm: [10, 0, 0, 0],
        cg: a.ii,
        rm: a._t,
        La: "Apple",
        description: "Heals you",
        zp: 2,
        Km: 3,
        W_: 20,
        qh: 0,
        Ph: 22,
        am: 2
      };
      f[c.vt] = {
        Xa: c.vt,
        Zm: [15, 0, 0, 0],
        N_: s.J,
        J_: s.P,
        cg: a.li,
        rm: a.vt,
        La: "Cookie",
        description: "Heals you",
        zp: 2,
        Km: 3,
        W_: 35,
        qh: 0,
        Ph: 22,
        am: 2
      };
      f[c.R] = {
        Xa: c.R,
        N_: s.J,
        J_: s.R,
        cg: a.ai,
        rm: a.R,
        La: "Shield",
        description: "Reduces damage",
        zp: 1,
        Km: 0,
        Y_: 0.7,
        Z_: 0.75,
        range: 55,
        G_: 350,
        T_: 15,
        S_: 40,
        reload: 500,
        qh: -15,
        Ph: 10,
        am: 3
      };
      f[c.ne] = {
        Xa: c.ne,
        N_: s.J,
        J_: s.X,
        cg: a.cc,
        rm: a.hc,
        La: "Ruby Healing Staff",
        description: "Make peace, not war",
        range: 140,
        G_: 100,
        zp: 0,
        T_: 30,
        W_: 30,
        reload: 500,
        Km: 0,
        am: 0,
        qh: -30,
        Ph: 0
      };
      f[c.$t] = {
        vm: c.ne,
        L_: u.Kc,
        Xa: c.$t,
        N_: s.J,
        J_: s.X,
        cg: a.rc,
        rm: a.dc,
        La: "Diamond Healing Staff",
        description: "Make peace, not war",
        range: 140,
        G_: 100,
        zp: 0,
        T_: 27,
        W_: 27,
        reload: 500,
        Km: 0,
        am: 0,
        qh: -30,
        Ph: 0
      };
      f[c.Xt] = {
        vm: c.$t,
        L_: u.Zc,
        Xa: c.Xt,
        N_: s.J,
        J_: s.X,
        cg: a.ic,
        rm: a.lc,
        La: "Gold Healing Staff",
        description: "Make peace, not war",
        range: 140,
        G_: 100,
        zp: 0,
        T_: 24,
        W_: 24,
        reload: 500,
        Km: 0,
        am: 0,
        qh: -30,
        Ph: 0
      };
      f[c.Kt] = {
        vm: c.Xt,
        L_: u.tn,
        Xa: c.Kt,
        N_: s.J,
        J_: s.X,
        cg: a.oc,
        rm: a.fc,
        La: "Healing Staff",
        description: "Make peace, not war",
        range: 140,
        G_: 100,
        zp: 0,
        T_: 21,
        W_: 21,
        reload: 500,
        Km: 0,
        am: 0,
        qh: -30,
        Ph: 0
      };
      n.exports = f;
    },
    9435: function (n, t, e) {
      const o = e(3255);
      const i = e(6597);
      const r = [];
      r[o.Co] = {
        rm: i.Co,
        yg: 500,
        yd: 0,
        yg: 1,
        K_: 150,
        X_: 2
      };
      r[o.xo] = {
        rm: i.xo,
        yg: 500,
        yd: 0,
        yg: 1,
        K_: 150,
        X_: 2
      };
      r[o.zo] = {
        rm: i.zo,
        yg: 500,
        yd: 0,
        yg: 1,
        K_: 150,
        X_: 2
      };
      r[o.tn] = {
        rm: i.jo,
        yg: 500,
        yd: 0,
        yg: 1,
        K_: 100,
        X_: 2
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
        this.bd = n || 0;
        this.Md = t || 0;
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
      const a = o(9869);
      const s = o(1318);
      const u = o(6217);
      const f = o(1552);
      n.exports = function (n, t) {
        t = t || 0;
        const o = (n = n || "").length % 16;
        const l = n.length - o;
        let d = [0, t];
        let h = [0, t];
        let m = [0, 0];
        let g = [0, 0];
        const w = [2277735313, 289559509];
        const p = [1291169091, 658871167];
        let _;
        for (_ = 0; _ < l; _ += 16) {
          m = [n.charCodeAt(_ + 4) & 255 | (n.charCodeAt(_ + 5) & 255) << 8 | (n.charCodeAt(_ + 6) & 255) << 16 | (n.charCodeAt(_ + 7) & 255) << 24, n.charCodeAt(_) & 255 | (n.charCodeAt(_ + 1) & 255) << 8 | (n.charCodeAt(_ + 2) & 255) << 16 | (n.charCodeAt(_ + 3) & 255) << 24];
          g = [n.charCodeAt(_ + 12) & 255 | (n.charCodeAt(_ + 13) & 255) << 8 | (n.charCodeAt(_ + 14) & 255) << 16 | (n.charCodeAt(_ + 15) & 255) << 24, n.charCodeAt(_ + 8) & 255 | (n.charCodeAt(_ + 9) & 255) << 8 | (n.charCodeAt(_ + 10) & 255) << 16 | (n.charCodeAt(_ + 11) & 255) << 24];
          m = c(m, w);
          m = a(m, 31);
          m = c(m, p);
          d = u(d, m);
          d = a(d, 27);
          d = r(d, h);
          d = r(c(d, [0, 5]), [0, 1390208809]);
          g = c(g, p);
          g = a(g, 33);
          g = c(g, w);
          h = u(h, g);
          h = a(h, 31);
          h = r(h, d);
          h = r(c(h, [0, 5]), [0, 944331445]);
        }
        m = [0, 0];
        g = [0, 0];
        switch (o) {
          case 15:
            g = u(g, s([0, n.charCodeAt(_ + 14)], 48));
          case 14:
            g = u(g, s([0, n.charCodeAt(_ + 13)], 40));
          case 13:
            g = u(g, s([0, n.charCodeAt(_ + 12)], 32));
          case 12:
            g = u(g, s([0, n.charCodeAt(_ + 11)], 24));
          case 11:
            g = u(g, s([0, n.charCodeAt(_ + 10)], 16));
          case 10:
            g = u(g, s([0, n.charCodeAt(_ + 9)], 8));
          case 9:
            g = u(g, [0, n.charCodeAt(_ + 8)]);
            g = c(g, p);
            g = a(g, 33);
            g = c(g, w);
            h = u(h, g);
          case 8:
            m = u(m, s([0, n.charCodeAt(_ + 7)], 56));
          case 7:
            m = u(m, s([0, n.charCodeAt(_ + 6)], 48));
          case 6:
            m = u(m, s([0, n.charCodeAt(_ + 5)], 40));
          case 5:
            m = u(m, s([0, n.charCodeAt(_ + 4)], 32));
          case 4:
            m = u(m, s([0, n.charCodeAt(_ + 3)], 24));
          case 3:
            m = u(m, s([0, n.charCodeAt(_ + 2)], 16));
          case 2:
            m = u(m, s([0, n.charCodeAt(_ + 1)], 8));
          case 1:
            m = u(m, [0, n.charCodeAt(_)]);
            m = c(m, w);
            m = a(m, 31);
            m = c(m, p);
            d = u(d, m);
        }
        d = u(d, [0, n.length]);
        h = u(h, [0, n.length]);
        d = r(d, h);
        h = r(h, d);
        d = f(d);
        h = f(h);
        d = r(d, h);
        h = r(h, d);
        return ("00000000" + (d[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[1] >>> 0).toString(16)).slice(-8);
      };
    },
    9882: function (n) {
      n.exports = function () {
        this.wa = function (n, t, e, o) {
          this.nv = n;
          this.tv = t;
          this.ev = e;
          this.ov = o;
        };
        this.iv = function (n) {
          let t = n.length;
          for (let e = 0; e < t; e++) {
            n[e] = n[e] ^ this.nv;
            this.nv = (this.ov * this.nv + this.ev + this.tv) % this.ev;
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
    1552: function (n, t, e) {
      const o = e(3235);
      const i = e(6217);
      n.exports = function (n) {
        n = i(n, [0, n[0] >>> 1]);
        n = o(n, [4283543511, 3981806797]);
        n = i(n, [0, n[0] >>> 1]);
        n = o(n, [3301882366, 444984403]);
        return i(n, [0, n[0] >>> 1]);
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
      let a = "Baloo Paaji";
      let s = "";
      let u = 7;
      let f = null;
      let l = false;
      function d(n) {
        if (!l) {
          l = true;
          try {
            let n = o(5108);
            if (n && n.default) {
              n = n.default;
            }
            if (n && typeof n.Ba == "function") {
              f = n;
            }
          } catch (n) {}
        }
        if (f) {
          return f.Ba(n);
        } else {
          return n;
        }
      }
      n.exports = {
        rv: (n, t) => n.bd < t.bd + t.w && n.bd + n.w > t.bd && n.Md < t.Md + t.eh && n.Md + n.eh > t.Md,
        Zg: function (n, t, e, o) {
          return Math.sqrt((t - o) ** 2 + (n - e) ** 2);
        },
        Kg: function (n, t, e, o) {
          return Math.atan2(o - t, e - n);
        },
        cv: function (n, t) {
          var e = Math.PI * 2;
          var o = (t - n) % e;
          return o * 2 % e - o;
        },
        av: function (n) {
          return n[Math.floor(Math.random() * n.length)];
        },
        sv(n, t, e, o, i, r, c) {
          var a = [i - n, r - t];
          var s = [e - n, o - t];
          var u = this.uv(s, s);
          var f = this.uv(a, s) / u;
          var l = [s[0] * (f = (f = f < 0 ? 0 : f) > 1 ? 1 : f) + n - i, s[1] * f + t - r];
          return this.uv(l, l) <= c * c;
        },
        uv: (n, t) => n[0] * t[0] + n[1] * t[1],
        fv: function (n, t, e, o) {
          return n * e + t * o;
        },
        uv: (n, t) => n[0] * t[0] + n[1] * t[1],
        Cd: function (n, t, e) {
          return n + this.cv(n, t) * e;
        },
        qd: function (n, t, e) {
          return n * (1 - e) + t * e;
        },
        lv: (n, t, e) => n >= e.Ww && n <= e.Kw && t >= e.Zw && t <= e.Xw,
        wm: (n, t, e, o, i, r) => n >= e && n <= e + i && t >= o && t <= o + r,
        dv: (n, t, e) => n < t ? t : n > e ? e : n,
        hv: (n, t) => Math.floor(Math.random() * (t - n + 1)) + n,
        jd: function (n, t, e, o, r, c) {
          this.dir = n;
          this.value = t;
          this.max = e;
          this.min = o;
          this.$p = r;
          this.Xp = c;
          this.Za = function (n) {
            if (this.dir) {
              var e = this.value + n * this.$p;
              if (e > this.max) {
                e = this.max;
                this.dir = false;
              }
              this.value = e;
            } else {
              if ((e = this.value - n * this.Xp) < this.min) {
                e = this.min;
                this.dir = true;
              }
              this.value = e;
            }
          };
          return false;
        },
        Lp: {
          mv: n => n,
          gv: n => n * n,
          wv: n => n * (2 - n),
          pv: n => n < 0.5 ? n * 2 * n : (4 - n * 2) * n - 1,
          _v: n => n * n * n,
          vv: n => --n * n * n + 1,
          bv: n => n < 0.5 ? n * 4 * n * n : (n - 1) * (n * 2 - 2) * (n * 2 - 2) + 1,
          yv: n => n * n * n * n,
          Mv: n => 1 - --n * n * n * n,
          Tv: n => n < 0.5 ? n * 8 * n * n * n : 1 - --n * 8 * n * n * n,
          kv: n => n * n * n * n * n,
          Av: n => 1 + --n * n * n * n * n,
          Hp: n => n < 0.5 ? n * 16 * n * n * n * n : 1 + --n * 16 * n * n * n * n,
          Bv: n => -Math.pow(2, (n -= 1) * 10) * Math.sin(Math.PI * 2 * (n - 0.1) / 0.4),
          Dv: n => -Math.pow(2, n * 10) * Math.sin(Math.PI * 2 * (n - 0.1) / 0.4) + 1,
          Ev: n => Math.sin(n),
          xv: n => n * -15 * (n - 1.3)
        },
        Em: (n, t, e, o, r, c) => {
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
        Cv: n => Math.floor((n + Math.PI) / 6.283185307179586 * 255) & 255,
        Kp: n => n / 255 * 6.283185307179586 - Math.PI,
        zv(n) {
          if (n > 2147483647) {
            throw "number too large. number shouldn't be > 2**31-1";
          }
          if (n < -2147483648) {
            throw "number too far negative, number shouldn't be < 2**31";
          }
          for (var t = 0, e = n, o = ""; t < 32; e <<= 1) {
            t++;
            o += (e >>> 31) + "";
          }
          return o.replace(/\B(?=(.{8})+(?!.))/g, " ");
        },
        Uv: function (n) {
          return [n & 255, n >> 8 & 255];
        },
        Dm: function (n, t, e, o) {
          const c = document.createElement("canvas");
          c.width = n;
          c.height = t;
          const a = c.getContext("2d");
          a.beginPath();
          a.fillStyle = o;
          this.Em(a, 0, 0, n, t, e);
          a.fill();
          return c;
        },
        bg: n => n > 9999999 ? Math.floor(n / 1000000) + "M" : n > 999999 ? Math.floor(n / 1000000 * 100) / 100 + "M" : n > 99999 ? (Math.floor(n / 1000) + "K").replace(".0", "") : n > 9999 ? (Math.floor(n / 1000 * 10) / 10 + "K").replace(".0", "") : n > 0 ? Math.floor(n) : n + "",
        np: function (n) {
          if (n = typeof n == "string" ? n.trim() : "") {
            if (/\s/.test(n) && !/["']/.test(n)) {
              n = "\"" + n + "\"";
            }
          } else {
            n = "Baloo Paaji";
          }
          a = n;
        },
        Ng: function () {
          return a;
        },
        tp: function (n) {
          s = typeof n == "string" && n.charAt(0) === "#" ? n : "";
        },
        ep: function (n) {
          u = typeof n == "number" && isFinite(n) && n >= 0 ? n : 7;
        },
        Hv: function (n, t, e, o, r, c, f, l, d) {
          const m = n.getContext("2d");
          c = c ? c * 1 : 0;
          var g = Math.floor(e * 1);
          m.font = e * 1 + "px " + a;
          l *= 1;
          var w = f ? l * 2 : 0;
          d = d ? Math.min(m.measureText(t).width + 2 + w, d) : m.measureText(t).width + 2 + w + 10;
          g = (g + c) * 1 + w + 10;
          d = Math.ceil(d);
          g = Math.ceil(g);
          n.width = d;
          n.height = g;
          if (f) {
            m.fillStyle = f;
            this.Em(m, 0, 0, d, g, l * 2);
            m.fill();
            m.translate(l, l);
          }
          m.textBaseline = "middle";
          m.font = e * 1 + "px " + a;
          m.fillStyle = o;
          const p = s || r;
          m.lineWidth = u;
          m.lineJoin = "round";
          if (p) {
            m.strokeStyle = p;
            m.strokeText(t, 5, (g - w) / 2, d);
          }
          m.fillText(t, 5, (g - w) / 2, d);
          return n;
        },
        Wm: function (n, t, e, o, i, r, c, a, s) {
          return this.Hv(n, t, e, o, i, r, c, a, s);
        },
        Hm: function (n, t, e, o, i, r, c, a) {
          const s = document.createElement("canvas");
          return this.Hv(s, n, t, e, o, i, r, c, a);
        },
        eg: n => Math.log(1 + n) ** 2.4 / 13,
        n_(n) {
          while (n.firstChild) {
            n.removeChild(n.lastChild);
          }
        },
        Ap(n) {
          const e = document.createElement(n.tag || "div");
          if (n.src) {
            e.src = n.src;
          }
          if (n.Dp) {
            e.innerHTML = n.Dp;
          }
          if (n.Bp) {
            e.className = n.Bp;
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
        Lv: n => true,
        Sv: function (n) {
          return {
            src: n,
            $h: {
              Qh: r.st
            }
          };
        },
        Gv: function () {
          this.Qh = r.ut;
          this.om = this.width / 2;
          this.im = this.height / 2;
        },
        Nv: function () {
          this.Qh = r.st;
        },
        Jv: function (n, t) {
          if (t === undefined || t.Qh !== r.ft) {
            (t = new Image()).Qh = r.ft;
            t.onload = this.Gv;
            t.onerror = this.Nv;
            t.src = d(n);
          }
          return t;
        },
        Gw: () => new URL(window.location).searchParams.get("game"),
        Nw(n) {},
        Dh: function (n, t) {
          let e = this.Sv(n);
          c.push(e);
          if (t) {
            e.$h = this.Jv(e.src, e.$h);
          }
          return e;
        },
        ip: function (n) {
          if (!n) {
            return;
          }
          const e = this;
          for (let o = 0; o < c.length; o++) {
            const i = c[o];
            if (!i || typeof i.src != "string" || i.src.indexOf(n) === -1) {
              continue;
            }
            if (!i.$h || i.$h.Qh !== r.ut) {
              continue;
            }
            const a = new Image();
            a.Qh = r.ft;
            a.onerror = e.Nv;
            a.onload = function () {
              e.Gv.call(a);
              i.$h = a;
            };
            a.src = d(i.src);
          }
        },
        gp: function () {
          const n = this;
          for (let t = 0; t < c.length; t++) {
            const e = c[t];
            if (!e || typeof e.src != "string") {
              continue;
            }
            if (!e.$h || e.$h.Qh !== r.ut) {
              continue;
            }
            const o = new Image();
            o.Qh = r.ft;
            o.onerror = n.Nv;
            o.onload = function () {
              n.Gv.call(o);
              e.$h = o;
            };
            o.src = d(e.src);
          }
        },
        tm: function (n, t, e, o, i, c) {
          const a = t.$h;
          if (a.Qh === r.ut) {
            n.drawImage(a, e, o, i || a.width, c || a.height);
          } else {
            t.$h = this.Jv(t.src, t.$h);
          }
        },
        Yv: function (n, t) {
          return n.Ww < t.Kw && n.Kw > t.Ww && n.Zw < t.Xw && n.Xw > t.Zw;
        },
        Ip: function (n, t, e) {
          return !!this.Yv(e, t) && (n.bd = Math.max(t.Ww, e.Ww), n.Md = Math.max(t.Zw, e.Zw), n.w = Math.min(e.Kw, t.Kw) - n.bd, n.eh = Math.min(e.Xw, t.Xw) - n.Md, true);
        },
        Iv(n, t) {
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
  function a(n) {
    var t = c[n];
    if (t !== undefined) {
      return t.exports;
    }
    var e = c[n] = {
      exports: {}
    };
    r[n](e, e.exports, a);
    return e.exports;
  }
  a.n = function (n) {
    var t = n && n.Fv ? function () {
      return n.default;
    } : function () {
      return n;
    };
    a.d(t, {
      a: t
    });
    return t;
  };
  a.d = function (n, t) {
    for (var e in t) {
      if (a.Xd(t, e) && !a.Xd(n, e)) {
        Object.defineProperty(n, e, {
          jv: true,
          get: t[e]
        });
      }
    }
  };
  a.Xd = function (n, e) {
    return Object.prototype.hasOwnProperty.call(n, e);
  };
  a.r = function (n) {
    if (typeof Symbol != "undefined" && Symbol.toStringTag) {
      Object.defineProperty(n, Symbol.toStringTag, {
        value: "Module"
      });
    }
    Object.defineProperty(n, "Fv", {
      value: true
    });
  };
  a(8557);
})();
