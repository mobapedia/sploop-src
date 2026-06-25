//4617ffa828cb9c6f9252.js
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
            "_s": 150,
            "Ms": 2500,
            "ks": 9850,
            "ys": 7500,
            "Us": "#788F57"
        },
        {
            "_s": 150,
            "Ms": 150,
            "ks": 9850,
            "ys": 2500,
            "Us": "#ece5db"
        },
        {
            "_s": 150,
            "Ms": 7500,
            "ks": 9850,
            "ys": 8000,
            "Us": "#fcefbb"
        },
        {
            "_s": 150,
            "Ms": 8000,
            "ks": 9850,
            "ys": 9000,
            "Us": "#2a8b9b"
        },
        {
            "_s": 150,
            "Ms": 9000,
            "ks": 9850,
            "ys": 9850,
            "Us": "#b38354"
        }
    ],
    biome: [
        {
            "_s": 150,
            "Ms": 2500,
            "ks": 9850,
            "ys": 7500,
            "Us": "#788F57"
        },
        {
            "_s": 150,
            "Ms": 150,
            "ks": 9850,
            "ys": 2500,
            "Us": "#ece5db"
        },
        {
            "_s": 150,
            "Ms": 7500,
            "ks": 9850,
            "ys": 8000,
            "Us": "#fcefbb"
        },
        {
            "_s": 150,
            "Ms": 8000,
            "ks": 9850,
            "ys": 9000,
            "Us": "#2a8b9b"
        },
        {
            "_s": 150,
            "Ms": 9000,
            "ks": 9850,
            "ys": 9850,
            "Us": "#b38354"
        }
    ],
    both: [
        {
            "_s": 150,
            "Ms": 2500,
            "ks": 9850,
            "ys": 7500,
            "Us": "#788F57"
        },
        {
            "_s": 150,
            "Ms": 150,
            "ks": 9850,
            "ys": 2500,
            "Us": "#ece5db"
        },
        {
            "_s": 150,
            "Ms": 7500,
            "ks": 9850,
            "ys": 8000,
            "Us": "#fcefbb"
        },
        {
            "_s": 150,
            "Ms": 8000,
            "ks": 9850,
            "ys": 9000,
            "Us": "#2a8b9b"
        },
        {
            "_s": 150,
            "Ms": 9000,
            "ks": 9850,
            "ys": 9850,
            "Us": "#b38354"
        }
    ]
}
//ENDEDIT
;(function () {
  var r = {
    3950: function (n) {
      n.exports = {
        v: 1,
        _: 2,
        M: 4,
        T: 8,
        A: 16,
        L: 32
      };
    },
    7160: function (n) {
      n.exports = {
        C: 0,
        B: 1,
        D: 2
      };
    },
    3970: function (n) {
      n.exports = {
        U: 0,
        S: 1,
        H: 2,
        N: 3,
        G: 4
      };
    },
    7262: function (n) {
      n.exports = {
        V: 1,
        j: 2,
        F: 4,
        P: 8,
        R: 16,
        q: 32,
        Y: 64,
        K: 128,
        W: 256,
        O: 512,
        Z: 1024,
        I: 2048,
        J: 4096,
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
        V: 0,
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
        hn: 3,
        tn: 4,
        dn: 5,
        Z: 6,
        kn: 7,
        gn: 8,
        wn: 9,
        O: 10,
        pn: 11,
        mn: 12,
        vn: 13,
        _n: 14,
        bn: 15,
        yn: 16,
        Mn: 17,
        Tn: 18,
        An: 19,
        Ln: 20,
        xn: 21,
        Cn: 22,
        En: 23,
        Bn: 24,
        Dn: 25,
        zn: 26,
        Un: 27,
        Sn: 28,
        Hn: 29,
        Nn: 30,
        Gn: 31,
        Vn: 32,
        jn: 33,
        Fn: 34,
        Pn: 35,
        Rn: 36,
        qn: 37,
        Yn: 38,
        Kn: 39,
        Wn: 40,
        $: 41,
        On: 42,
        Zn: 43
      };
    },
    9657: function (n) {
      n.exports = {
        Dn: 0,
        Un: 1,
        Sn: 2
      };
    },
    4002: function (n) {
      n.exports = {
        V: 0,
        In: 1,
        Jn: 2,
        Xn: 3,
        Qn: 4,
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
        ht: 1,
        dt: 2,
        kt: 3,
        P: 4,
        gt: 5,
        O: 6,
        kn: 7,
        wn: 8,
        Z: 9,
        wt: 10,
        W: 11,
        vt: 12,
        q: 13,
        vn: 14,
        _t: 15,
        bn: 16,
        bt: 17,
        Mn: 18,
        yn: 19,
        ln: 20,
        Tn: 21,
        Ln: 22,
        An: 23,
        yt: 24,
        xn: 25,
        R: 26,
        Mt: 27,
        Tt: 28,
        Cn: 29,
        At: 30,
        I: 31,
        Lt: 32,
        xt: 33,
        Ct: 34,
        Et: 35,
        Bt: 36,
        Dt: 37,
        zt: 38,
        Ut: 39,
        St: 40,
        Ht: 41,
        Nt: 42,
        Gt: 43,
        Vt: 44,
        jt: 45,
        Ft: 46,
        Pt: 47,
        Rt: 48,
        zn: 49,
        qt: 50,
        qn: 51,
        Yt: 52,
        Kt: 53,
        Wt: 54,
        Ot: 55,
        Zt: 56,
        It: 57,
        Jt: 58,
        Xt: 59,
        Qt: 60,
        $t: 61,
        ne: 62,
        $: 63,
        On: 64,
        te: 65,
        ee: 66,
        oe: 67,
        ie: 68,
        re: 69,
        ce: 70,
        Ot: 71,
        ae: 72,
        se: 73,
        ue: 74,
        fe: 75,
        le: 76,
        he: 77,
        de: 78
      };
    },
    9281: function (n) {
      n.exports = {
        ke: {
          ge: 20,
          we: 35,
          pe: 25,
          me: 26,
          ve: 9,
          _e: 2,
          be: 32,
          ye: 29,
          Me: 3,
          Te: 33,
          Ae: 31,
          Le: 6,
          xe: 22,
          Ce: 19,
          Ee: 8,
          Be: 28,
          De: 13,
          ze: 5,
          Ue: 30,
          Se: 14,
          He: 34,
          Ne: 11,
          Ge: 0,
          Ve: 15,
          je: 24,
          Fe: 27,
          Pe: 4,
          Re: 1,
          qe: 17,
          Ye: 16,
          Ke: 36,
          We: 10,
          Oe: 37,
          Ze: 21,
          Ie: 23,
          Je: 12,
          Xe: 7,
          Qe: 18
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
          ho: 14,
          do: 12,
          ko: 3,
          wo: 23,
          po: 1,
          mo: 15,
          vo: 9,
          _o: 4,
          bo: 8,
          yo: 24,
          Mo: 21,
          To: 17,
          Ao: 25,
          Lo: 22,
          xo: 16
        },
        Co: {}
      };
    },
    3255: function (n) {
      n.exports = {
        Eo: 0,
        Bo: 1,
        tn: 2,
        Do: 3
      };
    },
    6399: function (n) {
      n.exports = {
        Y: 0,
        zo: 1,
        Do: 2,
        tn: 3
      };
    },
    6597: function (n) {
      n.exports = {
        Uo: 0,
        So: 1,
        Ho: 2,
        fn: 3,
        No: 4,
        Go: 5,
        Vo: 6,
        jo: 7,
        hn: 8,
        dn: 9,
        tn: 10,
        gn: 11,
        kn: 12,
        Z: 13,
        O: 14,
        wn: 15,
        Fo: 16,
        mn: 17,
        Po: 17,
        Bo: 18,
        Eo: 19,
        Ro: 20,
        Do: 21,
        qo: 22,
        Yo: 23,
        ht: 24,
        lt: 25,
        dt: 26,
        P: 27,
        Ko: 28,
        Wo: 29,
        Oo: 30,
        Zo: 31,
        Io: 32,
        Jo: 33,
        pn: 34,
        Xo: 35,
        Qo: 36,
        $o: 37,
        ni: 38,
        ti: 39,
        ei: 40,
        oi: 41,
        wt: 42,
        ii: 43,
        ri: 44,
        ci: 45,
        W: 46,
        ai: 47,
        si: 48,
        ui: 49,
        fi: 50,
        vt: 51,
        li: 52,
        hi: 53,
        q: 54,
        di: 55,
        ki: 56,
        gi: 57,
        _n: 58,
        wi: 59,
        pi: 60,
        mi: 61,
        _t: 62,
        vi: 63,
        bn: 64,
        _i: 65,
        bi: 66,
        bt: 67,
        yi: 68,
        Mi: 69,
        Mn: 70,
        Ti: 71,
        ln: 72,
        Ai: 73,
        Li: 74,
        xi: 75,
        Ci: 76,
        Ei: 77,
        Bi: 78,
        Ln: 79,
        Di: 80,
        An: 81,
        xn: 82,
        zi: 83,
        yt: 84,
        Ui: 85,
        Si: 86,
        R: 87,
        Hi: 88,
        Ni: 89,
        Gi: 90,
        Mt: 91,
        Vi: 92,
        ji: 93,
        Fi: 94,
        Pi: 95,
        Ri: 96,
        qi: 97,
        Yi: 98,
        Tt: 99,
        Ki: 100,
        Wi: 101,
        Cn: 102,
        Oi: 103,
        Zi: 104,
        Ii: 105,
        Ji: 106,
        Xi: 107,
        Qi: 108,
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
        hr: 121,
        dr: 122,
        kr: 123,
        En: 124,
        Bn: 125,
        gr: 126,
        I: 127,
        wr: 128,
        Dn: 129,
        Lt: 130,
        pr: 131,
        xt: 132,
        mr: 133,
        Ct: 134,
        vr: 135,
        Bt: 136,
        _r: 137,
        Dt: 138,
        br: 139,
        zt: 140,
        yr: 141,
        Ut: 142,
        Mr: 143,
        Et: 144,
        Tr: 145,
        Ar: 146,
        Lr: 147,
        St: 148,
        Ht: 149,
        Cr: 150,
        Nt: 151,
        Gt: 152,
        Vt: 153,
        Er: 154,
        jt: 155,
        Br: 156,
        Ft: 157,
        Dr: 158,
        Pt: 159,
        zr: 160,
        Rt: 161,
        Ur: 162,
        Sr: 163,
        Hr: 164,
        Nr: 165,
        Gr: 166,
        Vr: 167,
        jr: 168,
        zn: 169,
        Fr: 170,
        Hn: 171,
        Gn: 172,
        Vn: 173,
        jn: 174,
        Nn: 175,
        Pr: 176,
        Sn: 177,
        Un: 178,
        Fn: 179,
        Pn: 180,
        Rn: 181,
        qt: 182,
        qn: 183,
        Rr: 184,
        qr: 185,
        Yn: 186,
        Kn: 187,
        Yr: 188,
        Kr: 189,
        Wr: 190,
        Or: 191,
        Zr: 192,
        Ir: 193,
        Jr: 194,
        Xr: 195,
        Qr: 196,
        $r: 197,
        It: 198,
        Jt: 199,
        nc: 200,
        tc: 201,
        ec: 202,
        Wn: 203,
        oc: 204,
        ic: 205,
        rc: 206,
        cc: 207,
        $: 208,
        ac: 209,
        Zr: 210,
        Qr: 211,
        sc: 212,
        uc: 213,
        fc: 214,
        lc: 215,
        hc: 216,
        dc: 217,
        kc: 218,
        gc: 219,
        On: 220,
        wc: 221,
        mc: 222,
        vc: 223,
        _c: 224,
        bc: 226,
        yc: 227,
        Mc: 228,
        Tc: 229,
        Ac: 230,
        Lc: 231,
        xc: 232,
        Cc: 233,
        Ec: 234,
        Bc: 235,
        Dc: 236,
        Qr: 237,
        Zr: 238,
        ae: 239,
        zc: 240,
        se: 241,
        Uc: 242,
        ue: 243,
        Sc: 244,
        fe: 245,
        Hc: 246,
        le: 247,
        Nc: 248,
        se: 249,
        Uc: 250,
        de: 251,
        Gc: 252,
        he: 253,
        Vc: 254,
        jc: 255,
        Fc: 256,
        Zn: 257
      };
    },
    5397: function (n) {
      n.exports = {
        Pc: 1,
        Rc: 2,
        qc: 4,
        Yc: 8,
        Kc: 16,
        Wc: 32,
        Oc: 64,
        Zc: 128,
        Ic: 256
      };
    },
    3266: function (n) {
      n.exports = {
        tn: 1,
        Jc: 2,
        Xc: 3
      };
    },
    6078: function (n, e, o) {
      try {
        __MUTATE0 = o(9847);
        __MUTATEQ = o(2677);
        __MUTATEQOO = o(2190);
        __MUTATEOO = o(2639);
        __MUTATE000 = o(3543);
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
        const h = [{
          Qc: "wood",
          $c: 0,
          na: 10,
          ta: 30,
          ea: 20,
          oa: 20,
          ia: 0
        }, {
          Qc: "stone",
          $c: 100000,
          na: 20,
          ta: 60,
          ea: 30,
          oa: 30,
          ia: 0
        }, {
          Qc: "copper",
          $c: 900000,
          na: 30,
          ta: 100,
          ea: 40,
          oa: 40,
          ia: 100
        }, {
          Qc: "bronze",
          $c: 2100000,
          na: 40,
          ta: 150,
          ea: 60,
          oa: 60,
          ia: 200
        }, {
          Qc: "silver",
          $c: 6100000,
          na: 50,
          ta: 200,
          ea: 80,
          oa: 80,
          ia: 300
        }, {
          Qc: "gold",
          $c: 10100000,
          na: 60,
          ta: 300,
          ea: 100,
          oa: 100,
          ia: 400
        }, {
          Qc: "diamond",
          $c: 20100000,
          na: 70,
          ta: 400,
          ea: 120,
          oa: 120,
          ia: 500
        }, {
          Qc: "emerald",
          $c: 35100000,
          na: 80,
          ta: 500,
          ea: 140,
          oa: 140,
          ia: 600
        }, {
          Qc: "ruby",
          $c: 66100000,
          na: 90,
          ta: 600,
          ea: 170,
          oa: 170,
          ia: 700
        }, {
          Qc: "platinum",
          $c: 116100000,
          na: 100,
          ta: 800,
          ea: 200,
          oa: 200,
          ia: 800
        }, {
          Qc: "amber",
          $c: 196100000,
          na: 120,
          ta: 1000,
          ea: 240,
          oa: 240,
          ia: 1000
        }, {
          Qc: "mystic",
          $c: 296100000,
          na: 140,
          ta: 1200,
          ea: 280,
          oa: 280,
          ia: 1200
        }, {
          Qc: "divine",
          $c: 496100000,
          na: 160,
          ta: 1400,
          ea: 320,
          oa: 320,
          ia: 1400
        }, {
          Qc: "immortal",
          $c: 696100000,
          na: 180,
          ta: 1600,
          ea: 360,
          oa: 360,
          ia: 1600
        }, {
          Qc: "draconic",
          $c: 896100000,
          na: 200,
          ta: 1800,
          ea: 400,
          oa: 400,
          ia: 1800
        }, {
          Qc: "celestial",
          $c: 1096100000,
          na: 220,
          ta: 2000,
          ea: 440,
          oa: 440,
          ia: 2000
        }, {
          Qc: "astral",
          $c: 1296100000,
          na: 240,
          ta: 2200,
          ea: 480,
          oa: 480,
          ia: 2200
        }, {
          Qc: "radiant",
          $c: 1696100000,
          na: 260,
          ta: 2400,
          ea: 520,
          oa: 520,
          ia: 2400
        }, {
          Qc: "eternal",
          $c: 3296100000,
          na: 280,
          ta: 2600,
          ea: 560,
          oa: 560,
          ia: 2600
        }];
        const d = __MUTATE0.get("main-login-button");
        const k = __MUTATE0.get("main-sign-up-button");
        const g = __MUTATE0.get("login-button");
        const w = __MUTATE0.get("signup-button");
        const p = __MUTATE0.get("profile-login-button");
        const m = __MUTATE0.get("profile-sign-up-button");
        const v = __MUTATE0.get("enter-password");
        const _ = __MUTATE0.get("enter-new-password");
        const b = __MUTATE0.get("error-password");
        const y = __MUTATE0.get("enter-username");
        const M = __MUTATE0.get("error-username");
        const T = __MUTATE0.get("enter-mail");
        const A = __MUTATE0.get("error-mail");
        const L = __MUTATE0.get("send-email");
        const x = __MUTATE0.get("login");
        const C = __MUTATE0.get("register");
        const E = __MUTATE0.get("send-mail-password");
        const B = __MUTATE0.get("validate-new-password");
        const D = __MUTATE0.get("forgot-password");
        const z = __MUTATE0.get("logout");
        const U = __MUTATE0.get("change-username");
        const S = __MUTATE0.get("change-username-button");
        const H = __MUTATE0.get("account-required");
        const N = __MUTATE0.get("ranking-rank");
        const G = __MUTATE0.get("ranking-score-daily");
        const V = __MUTATE0.get("ranking-score-month");
        const j = __MUTATE0.get("ranking-score-all");
        const F = __MUTATE0.get("ranking-kill-daily");
        const P = __MUTATE0.get("ranking-kill-month");
        const R = __MUTATE0.get("ranking-kill-all");
        const q = __MUTATE0.get("ranking-ranks-container");
        const Y = __MUTATE0.get("ranking-rank-container");
        const K = __MUTATE0.get("ranking-middle-main");
        const W = __MUTATE0.get("ranking2-middle-main");
        const O = [N, G, V, j, F, P, R];
        let Z = 0;
        let I = {
          ra: "",
          ca: "",
          hash: ""
        };
        function J(n) {
          const t = h.length;
          for (let e = 0; e < t; e++) {
            if (n < h[e].$c) {
              return e - 1;
            }
          }
          return t - 1;
        }
        function X(t) {
          nn();
          W.style.display = "none";
          K.style.display = "inline-block";
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
            __MUTATE0.get("ranking-name", s).innerText = c + "#" + a;
            q.appendChild(s);
            i++;
          }
          __MUTATE0.aa();
        }
        function Q() {
          return i.sa[__MUTATE000.ua(o)];
        }
        function $(t) {
          nn();
          K.style.display = "none";
          W.style.display = "inline-block";
          const o = JSON.parse(t);
          let i = 1;
          for (let n = o.length - 1; n >= 0; n--) {
            const t = o[n];
            const r = t[0];
            const c = J(r);
            const a = t[1];
            const s = t[2];
            const u = document.createElement("div");
            u.classList.add("subcontent-bg");
            u.classList.add("table-line");
            u.innerHTML = "<div class=\"ranking-rank\"> #" + i + " </div><div class=\"ranking-badge\"><img draggable=\"false\" src=\"img/ui/rank" + c + ".png\"></div><div class=\"ranking-name\"></div><div class=\"ranking-score\"> " + r.toLocaleString() + " </div>";
            __MUTATE0.get("ranking-name", u).innerText = a + "#" + s;
            Y.appendChild(u);
            i++;
          }
          __MUTATE0.aa();
        }
        function nn() {
          q.innerHTML = "";
          Y.innerHTML = "";
        }
        function tn(t, e, o) {
          const r = O.length;
          for (let n = 0; n < r; n++) {
            O[n].classList.remove("dark-blue-button-2-active");
          }
          t.classList.add("dark-blue-button-2-active");
          if (e === "ranking") {
            const n = s + "rankingScore";
            __MUTATE000.request(n, $);
          } else {
            const n = s + "leaderboards?time=" + o + "&type=" + e;
            __MUTATE000.request(n, X);
          }
          __MUTATE0.fa("Getting the leaderboard...");
        }
        function en(t) {
          __MUTATE0.aa();
          if (t === "1") {
            __MUTATE0.get("password-ok").style.display = "inline-block";
          } else {
            __MUTATE0.get("password-nok").style.display = "inline-block";
          }
        }
        function on(n) {
          __MUTATE0.aa();
          if (n === "1") {
            __MUTATE0.get("link-sent-ok").style.display = "inline-block";
          } else {
            __MUTATE0.get("link-sent-nok").style.display = "inline-block";
          }
        }
        function rn() {
          if (I.ra) {
            L.value = I.ra;
          }
          __MUTATE0.get("link-sent-ok").style.display = "none";
          __MUTATE0.get("link-sent-nok").style.display = "none";
          __MUTATE0.get("loading-mail-box").style.display = "none";
          E.style.display = "inline-block";
        }
        function cn() {
          b.style.visibility = "hidden";
          M.style.visibility = "hidden";
          A.style.visibility = "hidden";
        }
        function an(t) {
          I.ra = t[__MUTATE000.ua("id")];
          __MUTATE000.setData("accMail", I.ra);
          I.ca = t[__MUTATE000.ua("token")];
          __MUTATE000.setData("accToken", I.ca);
          i.sa = t;
          const u = t[__MUTATE000.ua(e)] + "#" + t[__MUTATE000.ua("counter")];
          __MUTATE0.get("nickname-value").innerText = u;
          __MUTATE0.get("currency-value").innerText = t[__MUTATE000.ua(o)].toLocaleString();
          const f = t[__MUTATE000.ua(e)];
          U.value = f;
          S.style.display = "none";
          const l = __MUTATE0.get("profile-bg");
          for (let n = 0; n < h.length; n++) {
            l.classList.remove("profile-bg" + n);
          }
          __MUTATE0.get("total-score").innerText = t[__MUTATE000.ua(r)].toLocaleString();
          __MUTATE0.get("total-death").innerText = t[__MUTATE000.ua(c)].toLocaleString();
          __MUTATE0.get("total-kill").innerText = t[__MUTATE000.ua(a)].toLocaleString();
          __MUTATE0.get("best-kill").innerText = t[__MUTATE000.ua("bestKill")].toLocaleString();
          __MUTATE0.get("kill-death").innerText = (t[__MUTATE000.ua(a)] / (t[__MUTATE000.ua(c)] || 1)).toLocaleString();
          const d = t[__MUTATE000.ua(r)];
          const k = J(d);
          l.classList.add("profile-bg" + k);
          __MUTATE0.get("profile-rank").src = "img/ui/big-rank" + k + ".png";
          __MUTATE0.get("rank").src = "img/ui/rank" + k + ".png";
          if (k >= h.length - 1) {
            __MUTATE0.get("profile-next-rank-container").style.display = "none";
          } else {
            const n = h[k + 1];
            __MUTATE0.get("score-left-value").innerText = Math.floor(n.$c - d).toLocaleString();
            __MUTATE0.get("profile-next-rank-container").style.display = "flex";
            __MUTATE0.get("profile-from-rank").src = "img/ui/rank" + k + ".png";
            __MUTATE0.get("profile-to-rank").src = "img/ui/rank" + (k + 1) + ".png";
          }
          const g = t[__MUTATE000.ua("bestScore")];
          let w = "";
          for (let n = 0; n < g.length; n++) {
            w += "<div class=\"subcontent-bg table-line\"><div class=\"ranking-rank\"> #" + (n + 1) + " </div><div class=\"ranking-score best-score\" id=\"best-score-value0\"> " + g[n][0].toLocaleString() + " </div></div>";
          }
          __MUTATE0.get("ranks-container").innerHTML = w;
        }
        function sn(n) {
          gn(n);
          const t = __MUTATE0.views.shop;
          t.la();
          t.ha();
        }
        function un() {
          if (Q() >= 100) {
            const n = s + "changename?nickname=" + U.value + "&mail=" + I.ra + "&token=" + I.ca;
            __MUTATE000.request(n, gn);
            __MUTATE0.fa("Changing name...");
          }
        }
        function fn() {
          if (U.value !== i.sa[__MUTATE000.ua(e)]) {
            S.style.display = "flex";
          } else {
            S.style.display = "none";
          }
        }
        function ln() {
          const n = __MUTATE000.getData("accMail");
          if (n) {
            I.ra = n;
          }
          const t = __MUTATE000.getData("accToken");
          if (t) {
            I.ca = t;
          }
          if (n && t) {
            return 1;
          } else {
            return 0;
          }
        }
        function hn() {
          if (Z !== 1) {
            Z = 1;
            for (let n = 0; n < f.length; n++) {
              const e = __MUTATE0.get(f[n][0]);
              e.classList.remove("fade-in");
              e.style.display = "none";
            }
            for (let n = 0; n < u.length; n++) {
              const t = u[n];
              __MUTATE0.get(t[0]).style.display = t[1];
            }
            setTimeout(function () {
              for (let t = 0; t < u.length; t++) {
                __MUTATE0.get(u[t][0]).classList.add("fade-in");
              }
            }, 50);
            __MUTATE0.get("profile-content").classList.remove("blur");
            __MUTATE0.get("shop-content").classList.remove("blur");
            kn();
          }
        }
        function dn() {
          if (Z === 0) {
            H.style.display = "flex";
          }
        }
        function kn() {
          H.style.display = "none";
        }
        function gn(t) {
          __MUTATE0.aa();
          if (t === "notFound") {
            A.innerText = "This account does not exist";
            A.style.visibility = "visible";
            pn();
            return;
          } else if (t === "tooMany") {
            b.innerText = "Try again in 10 minutes";
            b.style.visibility = "visible";
            pn();
            return;
          } else if (t === "wrongPassword") {
            b.innerText = "Wrong password";
            b.style.visibility = "visible";
            pn();
            return;
          } else if (t === "0" || t === "error") {
            b.innerText = "Unknown error";
            b.style.visibility = "visible";
            pn();
            return;
          } else {
            an(JSON.parse(t));
            __MUTATE0.da.login.hide();
            hn();
            return;
          }
        }
        function wn() {
          Z = 0;
          for (let n = 0; n < u.length; n++) {
            const t = __MUTATE0.get(u[n][0]);
            t.classList.remove("fade-in");
            t.style.display = "none";
          }
          for (let n = 0; n < f.length; n++) {
            const t = f[n];
            __MUTATE0.get(t[0]).style.display = t[1];
          }
          setTimeout(function () {
            for (let t = 0; t < f.length; t++) {
              __MUTATE0.get(f[t][0]).classList.add("fade-in");
            }
          }, 50);
          __MUTATE0.get("profile-content").classList.add("blur");
          __MUTATE0.get("shop-content").classList.add("blur");
        }
        function pn() {
          i.sa = l;
          Z = 0;
          __MUTATE000.setData("accToken", "");
          __MUTATE000.setData("skin", "0");
          __MUTATE000.setData("accessory", "0");
          __MUTATE000.setData("back", "0");
          wn();
        }
        function mn() {
          const e = v.value;
          if (e.length < 4) {
            b.innerText = "The password is too short";
            b.style.visibility = "visible";
            return;
          } else {
            I.hash = __MUTATEOO(e);
            return I.hash;
          }
        }
        function vn() {
          const n = y.value;
          if (n.length < 1) {
            M.innerText = "The nickname is too short";
            M.style.visibility = "visible";
            return;
          } else {
            return n;
          }
        }
        function _n() {
          let e = T.value;
          try {
            e = e.trim();
          } catch (n) {}
          if (e.indexOf("@") === -1 || e.indexOf(".") === -1 || e.length < 6) {
            A.innerText = "The Email Address is incorrect!";
            A.style.visibility = "visible";
            return;
          } else {
            I.ra = e;
            return e.toLowerCase();
          }
        }
        function bn() {
          cn();
          const e = mn();
          const o = vn();
          const i = _n();
          if (e === undefined || o === undefined || i === undefined) {
            return;
          }
          const r = s + "register?nickname=" + o + "&mail=" + i + "&hash=" + e;
          __MUTATE0.fa("Creating...");
          __MUTATE000.request(r, yn);
        }
        function yn(t) {
          __MUTATE0.aa();
          cn();
          if (t === "exists") {
            A.innerText = "This mail is already taken";
            A.style.visibility = "visible";
            return;
          }
          if (t === "tooMany") {
            b.innerText = "Try again later";
            b.style.visibility = "visible";
          } else if (t === "0" || t === "error") {
            b.innerText = "Unknown error";
            b.style.visibility = "visible";
            return;
          }
          an(JSON.parse(t));
          __MUTATE0.da.login.hide();
          hn();
        }
        function Mn() {
          __MUTATE0.aa();
        }
        function Tn() {
          cn();
          const n = mn();
          const t = _n();
          if (n === undefined || t === undefined) {
            return;
          }
          const e = s + "login?mail=" + I.ra + "&hash=" + I.hash;
          __MUTATE0.fa("Connecting...");
          __MUTATE000.request(e, gn, Mn);
        }
        function An(n, t) {
          cn();
          const e = s + "tokenLogin?mail=" + n + "&token=" + t;
          __MUTATE000.request(e, gn);
        }
        function rn() {
          __MUTATE0.da.login.hide();
          __MUTATE0.da["forgot-password"].show();
        }
        function Ln() {
          cn();
          const e = __MUTATE0.da.login;
          e.show();
          __MUTATE0.get("pop-title", e.ka).innerText = "LOGIN";
          w.classList.remove("login-button-active");
          g.classList.add("login-button-active");
          __MUTATE0.get("enter-username-title").style.display = "none";
          y.style.display = "none";
          M.style.visibility = "hidden";
          C.style.display = "none";
          x.style.display = "inline-block";
        }
        function xn() {
          cn();
          const e = __MUTATE0.da.login;
          e.show();
          __MUTATE0.get("pop-title", e.ka).innerText = "SIGN UP";
          g.classList.remove("login-button-active");
          w.classList.add("login-button-active");
          __MUTATE0.get("enter-username-title").style.display = "flex";
          y.style.display = "flex";
          x.style.display = "none";
          C.style.display = "inline-block";
        }
        E.addEventListener("click", function () {
          const t = s + "forgot?mail=" + L.value;
          __MUTATE000.request(t, on);
          E.style.display = "none";
          __MUTATE0.fa("Sending...");
        });
        B.addEventListener("click", function () {
          const e = s + "restore?mail=" + __MUTATE000.ga("mail") + "&token=" + __MUTATE000.ga("restore") + "&hash=" + __MUTATEOO(_.value);
          __MUTATE000.request(e, en);
          __MUTATE0.fa("Changing your password...");
          B.style.display = "none";
        });
        return {
          wa: function () {
            d.addEventListener("click", Ln);
            k.addEventListener("click", xn);
            g.addEventListener("click", Ln);
            w.addEventListener("click", xn);
            p.addEventListener("click", Ln);
            m.addEventListener("click", xn);
            D.addEventListener("click", rn);
            C.addEventListener("click", bn);
            x.addEventListener("click", Tn);
            z.addEventListener("click", function () {
              pn();
              dn();
            });
            U.addEventListener("input", fn);
            S.addEventListener("click", un);
            S.style.display = "none";
            if (ln() === 1) {
              __MUTATE0.fa("Connecting...");
              An(I.ra, I.ca);
            } else {
              wn();
              if (__MUTATE000.ga("mail") && __MUTATE000.ga("restore")) {
                __MUTATE0.da["new-password"].show();
              }
            }
            N.addEventListener("click", function () {
              tn(N, "ranking");
            });
            G.addEventListener("click", function () {
              tn(G, "score", "day");
            });
            V.addEventListener("click", function () {
              tn(V, "score", "month");
            });
            j.addEventListener("click", function () {
              tn(j, "score", "all");
            });
            F.addEventListener("click", function () {
              tn(F, "kill", "day");
            });
            P.addEventListener("click", function () {
              tn(P, "kill", "month");
            });
            R.addEventListener("click", function () {
              tn(R, "kill", "all");
            });
            const e = __MUTATE0.views.ranking;
            e.ha = function () {
              tn(N, "ranking");
            };
            e.la = function () {
              nn();
            };
            const o = __MUTATE0.views.profile;
            o.ha = function () {
              i.pa();
            };
            o.la = function () {
              i.ma();
            };
          },
          refresh: function () {
            if (Z === 1) {
              An(I.ra, I.ca);
            }
          },
          va: function () {
            An(I.ra, I.ca);
          },
          _a: Q,
          ba: function (n) {
            return i.sa[__MUTATE000.ua(n)] || [];
          },
          ya: function (t, e, o, i, r) {
            if (Q() >= i) {
              const n = s + "cosmetic?type=" + t + "&index=" + o + "&mail=" + I.ra + "&token=" + I.ca;
              __MUTATE000.request(n, sn);
              __MUTATE0.fa("Buying the " + e + " " + t + "...");
            }
          },
          Ma: function () {
            if (Z === 1) {
              return 1;
            } else {
              return 0;
            }
          },
          Ta: an,
          pa: dn,
          ma: kn,
          sa: l,
          Aa: h
        };
      }();
      i.wa();
      try {
        n.exports = i;
      } catch (n) {}
    },
    7644: function () {
      var e;
      var o;
      var i = document.getElementById("main-content");
      var r = getComputedStyle(i).height;
      for (var c = ["profile", "shop", "game", "skins", "ranking"], a = 0; a < c.length; a++) {
        e = c[a];
        o = undefined;
        (o = document.getElementById("nav-" + e)).addEventListener("click", function () {
          r = getComputedStyle(i).height;
        }, {
          capture: true
        });
        o.addEventListener("click", function () {
          var e = getComputedStyle(i).height;
          i.style.height = r;
          requestAnimationFrame(function () {
            i.style.height = e;
            setTimeout(function () {
              i.style.height = "";
            }, 300);
          });
        });
      }
    },
    2677: function (r, c, a) {
      let s = null;
      let u = false;
      function f(n) {
        if (!u) {
          u = true;
          try {
            let n = a(5108);
            if (n && n.default) {
              n = n.default;
            }
            if (n && typeof n.La == "function") {
              s = n;
            }
          } catch (n) {}
        }
        if (s) {
          return s.La(n);
        } else {
          return n;
        }
      }
      const l = function () {
        const r = {};
        function c() {
          this.xa = 1;
          this.Ca = this.width / 2;
          this.Ea = this.height / 2;
          this.onload = null;
          this.onerror = null;
        }
        function a() {
          this.xa = 0;
        }
        return {
          Ba: function (n, t) {
            const e = r[n];
            if (e !== undefined) {
              return e;
            } else {
              r[n] = {
                src: n,
                Da: t === undefined ? {
                  xa: 0
                } : t
              };
              return r[n];
            }
          },
          za: function (n, t) {
            if (t === undefined || t.xa !== 2) {
              (t = new Image()).xa = 2;
              t.onload = c;
              t.onerror = a;
              t.src = f(n);
            }
            return t;
          },
          Ua: r
        };
      }();
      try {
        r.exports = l;
      } catch (n) {}
    },
    9847: function (n, e, o) {
      try {
        __MUTATEQ = o(2677);
        __MUTATEQOO = o(2190);
        __MUTATE000 = o(3543);
        __MUTATEQQ = o(4071);
      } catch (n) {}
      const i = function () {
        const e = 1.4;
        const o = [];
        o[0] = __MUTATEQQ.cn;
        const i = o[0];
        o[1] = __MUTATEQQ.an;
        const r = o[1];
        o[2] = __MUTATEQQ.sn;
        const c = o[2];
        for (let t = 0; t < i.length; t++) {
          if (!i[t]) {
            throw "error";
          }
          i[t][1] = t;
        }
        for (let t = 0; t < r.length; t++) {
          if (!r[t]) {
            throw "error";
          }
          r[t][1] = t;
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
        function l(n, t) {
          if ((t = t || document).getElementById) {
            const e = t.getElementById(n);
            if (e) {
              return e;
            }
          }
          if (t.getElementsByClassName) {
            const e = t.getElementsByClassName(n);
            if (e && e[0]) {
              return e[0];
            }
          }
          if (t.getElementsByTagName) {
            const e = t.getElementsByTagName(n);
            if (e && e[0]) {
              return e[0];
            }
          }
        }
        const h = [];
        const d = [];
        const k = l("homepage");
        const g = l("middle-wrap");
        const w = l("top-wrap-left");
        const p = l("top-wrap-right");
        const m = l("bottom-wrap");
        const v = l("cross-promo");
        const _ = l("pop-ui");
        const b = l("changelog");
        const y = l("settings");
        const M = l("policy");
        const T = l("new-changelog");
        const A = l("spectator");
        const L = l("spectator-close");
        const x = [l("middle-wrap")];
        const C = l("waiting");
        const E = l("waiting-text");
        const B = l("small-waiting");
        const D = l("small-waiting-text");
        const z = l("landscape");
        const U = l("skins-middle-main");
        const S = l("skin-description");
        const H = l("skins-category");
        const N = l("accessory-category");
        const G = l("back-category");
        const V = l("shop-skins-middle-main");
        const j = l("shop-skin-description");
        const F = l("shop-skins-category");
        const P = l("shop-accessory-category");
        const R = l("shop-back-category");
        const q = l("shop-price");
        const Y = l("shop-can-buy");
        const K = l("shop-buy");
        const W = l("shop-currency-logo");
        const O = l("change-server");
        const Z = l("do-not-change-server");
        const I = l("nickname");
        let J;
        let X;
        let Q;
        let $ = "";
        let nn = "";
        let tn = 0;
        let en = 0;
        let on = 0;
        let rn = 0;
        let cn = 0;
        let an = -1;
        function sn() {
          C.classList.add("fade-in");
        }
        function un() {
          B.classList.add("fade-in");
        }
        function fn(n) {
          const e = this;
          d[n] = this;
          this.Sa = "pop-" + n;
          this.ka = l(this.Sa);
          this.style = this.ka.style;
          this.ka.addEventListener("click", function (n) {
            n.stopPropagation();
          });
          this.hide = function () {
            _.style.display = "none";
            e.style.display = "none";
            X = undefined;
          };
          this.transition = function () {
            _.classList.add("fade-in");
            e.ka.classList.add("popup-fade-in");
          };
          this.show = function () {
            if (X === undefined) {
              X = e;
              _.classList.remove("fade-in");
              e.ka.classList.remove("popup-fade-in");
              _.style.display = "flex";
              e.style.display = "flex";
              setTimeout(e.transition, 50);
            }
          };
          l("pop-close-button", this.ka).addEventListener("click", this.hide);
        }
        function ln(e) {
          this.ha = s;
          this.la = s;
          const i = this;
          h[e] = this;
          this.Sa = e + "-content";
          this.Ha = "nav-" + e;
          this.ka = l(this.Sa);
          this.style = this.ka.style;
          this.Na = l(this.Ha);
          this.Ga = l("nav-button-text", this.Na);
          this.hide = function () {
            i.style.display = "none";
            i.Ga.classList.remove("nav-button-active");
            i.Ga.classList.add("nav-button-text");
            i.la();
          };
          this.transition = function () {
            i.ka.classList.add("fade-in");
          };
          this.show = function () {
            if (J !== i) {
              if (J) {
                J.hide();
              }
              J = i;
              i.ka.classList.remove("fade-in");
              i.style.display = "flex";
              i.Ga.classList.remove("nav-button-text");
              i.Ga.classList.add("nav-button-active");
              setTimeout(i.transition, 50);
              i.ha();
            }
          };
          this.Na.addEventListener("click", this.show);
          this.hide();
        }
        function hn() {
          let e = 0;
          let o = 0;
          e = window.innerWidth / 1270;
          o = window.innerHeight / 685;
          if (window.innerWidth > window.innerHeight * 0.9) {
            z.style.display = "none";
          } else {
            z.style.display = "flex";
          }
          const i = Math.min(1, Math.min(e, o));
          g.style.transform = "scale(" + i + ")";
          w.style.transform = "scale(" + i + ")";
          p.style.transform = "scale(" + i + ")";
          m.style.transform = "scale(" + i + ")";
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
        function dn() {
          if (cn === 0) {
            cn = 1;
            L.style.display = "inline-block";
            for (let n of x) {
              n.style.display = "none";
            }
          } else {
            cn = 0;
            L.style.display = "none";
            for (let n of x) {
              n.style.display = "flex";
            }
          }
        }
        function kn(n, t, e) {
          return (1 - e) * n + e * t;
        }
        function gn(n) {
          n.Va = kn(n.Va, n.ja, 0.1);
          n.Fa = kn(n.Fa, n.Pa, 0.1);
          n.Ra = kn(n.Ra, n.qa, 0.1);
          n.Ya = kn(n.Ya, n.Ka, 0.1);
        }
        function wn(t, i, r) {
          const a = l(t);
          this.Wa = new __MUTATEQOO.Oa(a, i, 186, 196, gn);
          this.Wa.ja = 0;
          this.Wa.Pa = 0;
          this.Wa.qa = 1;
          this.Wa.Ka = 1;
          const s = Math.min(o[0].length - 1, __MUTATE000.getData("skin") || 0);
          const u = Math.min(o[1].length - 1, __MUTATE000.getData("accessory") || 0);
          const f = Math.min(o[2].length - 1, __MUTATE000.getData("back") || 0);
          this.Wa.Za("img/skins/back" + f + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const h = this.Wa.Ia[0];
          this.Wa.Za("img/skins/arm" + s + ".png", 58, 151, Math.PI / 2, e, e, 1);
          const d = this.Wa.Ia[1];
          this.Wa.Za("img/skins/arm" + s + ".png", 128, 151, Math.PI / 2, e, -1.4, 1);
          const k = this.Wa.Ia[2];
          this.Wa.Za("img/skins/body" + s + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const g = this.Wa.Ia[3];
          this.Wa.Za("img/skins/accessory" + u + ".png", 93, 116, Math.PI / 2, e, e, 1);
          const w = this.Wa.Ia[4];
          this.Ja = function (n, t) {
            let i = "";
            if (n === "skin") {
              i = o[0][t][0];
              g.Xa = __MUTATEQ.Ba("img/skins/body" + t + ".png");
              d.Xa = __MUTATEQ.Ba("img/skins/arm" + t + ".png");
              k.Xa = d.Xa;
            } else if (n === "accessory") {
              i = o[1][t][0];
              w.Xa = __MUTATEQ.Ba("img/skins/accessory" + t + ".png");
            } else if (n === "back") {
              i = o[2][t][0];
              h.Xa = __MUTATEQ.Ba("img/skins/back" + t + ".png");
            }
            r.innerText = i;
            nn = i;
          };
        }
        function pn(t) {
          H.classList.remove("dark-blue-button-4-active");
          N.classList.remove("dark-blue-button-4-active");
          G.classList.remove("dark-blue-button-4-active");
          F.classList.remove("dark-blue-button-4-active");
          P.classList.remove("dark-blue-button-4-active");
          R.classList.remove("dark-blue-button-4-active");
          t.classList.add("dark-blue-button-4-active");
        }
        function mn(n, e, o) {
          n.addEventListener("click", function () {
            if (Q !== undefined) {
              Q.classList.remove("skin-active");
            }
            Q = n;
            n.classList.add("skin-active");
            __MUTATE000.setData(e, o);
            h.skins.skinSelector.Ja(e, o);
          });
        }
        function vn(t, e, o, i) {
          t.addEventListener("click", function () {
            $ = e;
            en = o;
            tn = i;
            if (Q !== undefined) {
              Q.classList.remove("skin-active");
            }
            Q = t;
            t.classList.add("skin-active");
            q.innerText = i;
            K.style.display = "flex";
            if (__MUTATEoo._a() >= i) {
              K.classList.remove("yellow-button-active");
              Y.innerText = "BUY";
              Y.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
              q.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
              W.style.cursor = "url(img/ui/cursor-pointer.png) 6 0, pointer";
            } else {
              K.classList.add("yellow-button-active");
              Y.innerText = "NEED";
              Y.style.cursor = "";
              q.style.cursor = "";
              W.style.cursor = "";
            }
            h.shop.skinSelector.Ja(e, o);
          });
        }
        function _n(n, t) {
          return n[2] - t[2];
        }
        function bn(t, e, i, r) {
          if (an === t) {
            return;
          }
          an = t;
          pn(e);
          r.innerHTML = "";
          const s = a[t];
          const u = o[t].slice().sort(_n);
          const f = u.length;
          const d = __MUTATEoo.ba(s);
          let k = document.createElement("div");
          k.classList.add("skins-line");
          let g = 0;
          let w = 0;
          for (let n = 0; n < f; n++) {
            let t = u[n];
            let e = t[2];
            let o = t[1];
            if (i === 1 && e !== 0 && d.indexOf(o) === -1) {
              continue;
            }
            if (i === 2 && (e === 0 || d.indexOf(o) !== -1)) {
              continue;
            }
            let a = document.createElement("img");
            a.Qa = s + o;
            a.draggable = "false";
            a.src = "img/ui/" + s + o + ".png";
            a.classList.add("skin");
            k.appendChild(a);
            if (i === 1) {
              mn(a, s, o);
            } else if (i === 2) {
              vn(a, s, o, e);
            }
            if (g === 0 || (g + 1) % 5 != 0 && n !== f - 1) {
              w = 1;
            } else {
              r.appendChild(k);
              k = document.createElement("div");
              k.classList.add("skins-line");
              w = 0;
            }
            g++;
          }
          if (w === 1) {
            r.appendChild(k);
          }
          const p = Math.min(u.length - 1, __MUTATE000.getData(s) || 0);
          Q = l(s + p);
          if (Q) {
            Q.classList.add("skin-active");
            h.skins.skinSelector.Ja(s, p);
          }
        }
        function yn(t, e, o, i) {
          const c = h.skins;
          const a = h.shop;
          c.skinSelector.Wa.ja = t;
          c.skinSelector.Wa.Pa = e;
          c.skinSelector.Wa.qa = o;
          c.skinSelector.Wa.Ka = i;
          a.skinSelector.Wa.ja = t;
          a.skinSelector.Wa.Pa = e;
          a.skinSelector.Wa.qa = o;
          a.skinSelector.Wa.Ka = i;
        }
        function Mn(n) {
          yn(0, 0, 1, 1);
          Q = undefined;
          an = -1;
          n.innerHTML = "";
        }
        _.addEventListener("click", function () {
          if (X !== undefined) {
            X.hide();
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
          b.addEventListener("click", function () {
            __MUTATE000.setData("gameVersion", 10);
            d.changelog.show();
            T.style.display = "none";
          });
          const e = "_atgam";
          if (!__MUTATE000.getData(e)) {
            __MUTATE000.setData(e, "GM" + __MUTATE000.$a(1) + "." + __MUTATE000.$a(4) + "." + __MUTATE000.$a(16), ".sploop.io");
          }
          y.addEventListener("click", function () {
            d.settings.show();
          });
          M.addEventListener("click", function () {
            d.policy.show();
          });
          A.addEventListener("click", dn);
          L.addEventListener("click", dn);
          const o = h.skins;
          o.skinSelector = new wn("skin-box", "skin-selector", S);
          o.ha = function () {
            const e = Number(__MUTATE000.getData("skin")) || 0;
            o.skinSelector.Ja("skin", e);
            const i = Number(__MUTATE000.getData("accessory")) || 0;
            o.skinSelector.Ja("accessory", i);
            const r = Number(__MUTATE000.getData("back")) || 0;
            o.skinSelector.Ja("back", r);
            o.skinSelector.Wa.wa();
            bn(0, H, 1, U);
          };
          o.la = function () {
            o.skinSelector.Wa.remove();
            Mn(U);
          };
          N.addEventListener("click", function () {
            yn(0, 0, 1, 1);
            bn(1, N, 1, U);
          });
          G.addEventListener("click", function () {
            yn(27.900000000000006, 58.80000000000001, 0.7, 0.7);
            bn(2, G, 1, U);
          });
          H.addEventListener("click", function () {
            yn(0, 0, 1, 1);
            bn(0, H, 1, U);
          });
          const i = h.shop;
          i.skinSelector = new wn("shop-skin-box", "shop-skin-selector", j);
          i.ha = function () {
            i.skinSelector.Wa.wa();
            __MUTATEoo.pa();
            const e = Number(__MUTATE000.getData("skin")) || 0;
            i.skinSelector.Ja("skin", e);
            const o = Number(__MUTATE000.getData("accessory")) || 0;
            i.skinSelector.Ja("accessory", o);
            const r = Number(__MUTATE000.getData("back")) || 0;
            i.skinSelector.Ja("back", r);
            K.style.display = "none";
            bn(0, F, 2, V);
          };
          i.la = function () {
            __MUTATEoo.ma();
            i.skinSelector.Wa.remove();
            Mn(V);
          };
          R.addEventListener("click", function () {
            yn(27.900000000000006, 58.80000000000001, 0.7, 0.7);
            bn(2, R, 2, V);
          });
          P.addEventListener("click", function () {
            yn(0, 0, 1, 1);
            bn(1, P, 2, V);
          });
          F.addEventListener("click", function () {
            yn(0, 0, 1, 1);
            bn(0, F, 2, V);
          });
          K.addEventListener("click", function () {
            __MUTATEoo.ya($, nn, en, tn);
          });
          O.addEventListener("click", function () {
            const n = d["progress-loss"];
            n.hide();
            n.next();
          });
          Z.addEventListener("click", function () {
            d["progress-loss"].hide();
          });
          window.addEventListener("resize", hn, false);
          hn();
          k.style.display = "flex";
          h.game.show();
          I.addEventListener("input", function () {
            __MUTATE000.setData("nickname", I.value);
          });
          I.value = __MUTATE000.getData("nickname") || "";
          const r = Number(__MUTATE000.getData("gameVersion")) || 0;
          T.style.display = r === 10 ? "none" : "flex";
        })();
        return {
          get: l,
          views: h,
          da: d,
          fa: function (t) {
            on++;
            C.classList.remove("fade-in");
            C.style.display = "flex";
            E.innerText = t;
            setTimeout(sn, 0);
          },
          aa: function () {
            on = Math.max(0, on - 1);
            if (on <= 0) {
              C.style.display = "none";
            }
          },
          ns: function (t) {
            rn++;
            B.classList.remove("fade-in");
            B.style.display = "flex";
            D.innerText = t;
            setTimeout(un, 0);
          },
          ts: function () {
            rn = Math.max(0, rn - 1);
            if (rn <= 0) {
              B.style.display = "none";
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
            d();
          }
          a.parentElement.style.display = "none";
        });
      }
      document.getElementById("nav-ranking").addEventListener("click", function () {
        a.parentElement.style.display = "flex";
      });
      var h = [];
      for (l = 0; l < u.length; l++) {
        h.push({
          parent: u[l].parentElement,
          nextSibling: u[l].nextElementSibling
        });
      }
      function d() {
        s.style.display = "none";
        a.src = "img/ui/fullscreen.png";
        for (var e = 0; e < u.length; e++) {
          var o = u[e];
          o.classList.remove("rank-fullscreen");
          var i = h[e];
          if (i.nextSibling && i.nextSibling.parentNode === i.parent) {
            i.parent.insertBefore(o, i.nextSibling);
          } else {
            i.parent.appendChild(o);
          }
        }
      }
      function k() {
        a.src = "img/ui/unfullscreen.png";
        for (var e = 0; e < u.length; e++) {
          document.body.appendChild(u[e]);
          u[e].classList.add("rank-fullscreen");
        }
        s.style.display = "flex";
      }
      s.addEventListener("click", d);
      a.onclick = function () {
        if (u[0].classList.contains("rank-fullscreen")) {
          d();
        } else {
          k();
        }
      };
      document.addEventListener("keydown", function (t) {
        if (t.key === "Escape" && u[0].classList.contains("rank-fullscreen")) {
          d();
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
    2190: function (n, e, o) {
      try {
        __MUTATEQ = o(2677);
        __MUTATE000 = o(3543);
      } catch (n) {}
      const r = function () {
        const n = function () {};
        const e = [];
        let o;
        function i(n) {
          const i = n.Xa.Da;
          if (i.xa !== 1) {
            n.Xa.Da = __MUTATEQ.za(n.Xa.src, i);
            return;
          }
          const r = n.cs * i.width / 2;
          const c = n.ss * i.height / 2;
          o.save();
          o.translate(n.us, n.fs);
          o.rotate(n.ls);
          o.scale(n.hs, n.ds);
          if (n.ks !== 1) {
            o.globalAlpha = n.ks;
          }
          o.drawImage(i, -r / 2, -c / 2, r, c);
          o.restore();
        }
        function r(n, e, o, i, r, c, a) {
          this.Xa = __MUTATEQ.Ba(n);
          this.us = e || 0;
          this.fs = o || 0;
          this.ls = i || 0;
          this.cs = Math.abs(r) || 1;
          this.ss = Math.abs(c) || 1;
          this.hs = r > 0 ? 1 : -1;
          this.ds = c > 0 ? 1 : -1;
          this.ks = a || 1;
        }
        return {
          Oa: function (c, a, s, u, f) {
            const l = this;
            if (f === undefined) {
              f = n;
            }
            this.Ia = [];
            this.Qc = a;
            this.Va = 0;
            this.Fa = 0;
            this.Ra = 1;
            this.Ya = 1;
            this.isActive = 0;
            this.wa = function () {
              c.innerHTML = "<canvas id=\"" + a + "\"></canvas>";
              l.gs = document.getElementById(a);
              l.ws = l.gs.getContext("2d");
              l.gs.width = s;
              l.gs.height = u;
              l.isActive = 1;
              e.push(l);
            };
            this.remove = function () {
              l.isActive = 0;
              e.splice(e.indexOf(l), 1);
              c.innerHTML = "";
              l.gs = undefined;
              l.ws = undefined;
            };
            this.ps = function () {
              l.remove();
              l.Ia.length = 0;
            };
            this.Za = function (n, e, o, i, c, a, s) {
              const f = new r(n, e, o, i, c, a, s);
              l.Ia.push(f);
            };
            this.vs = function () {
              if (l.isActive === 0) {
                return;
              }
              const n = o;
              o = l.ws;
              o.clearRect(0, 0, s, u);
              o.save();
              o.translate(l.Va, l.Fa);
              o.scale(l.Ra, l.Ya);
              f(l);
              const t = l.Ia.length;
              for (let n = 0; n < t; n++) {
                i(l.Ia[n]);
              }
              o.restore();
              o = n;
            };
          },
          vs: function () {
            const n = e.length;
            for (let t = 0; t < n; t++) {
              e[t].vs();
            }
          }
        };
      }();
      try {
        n.exports = r;
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
      e.addEventListener("click", function (n) {
        if (n.target === e || n.target.classList.contains("pop-close")) {
          e.style.display = "none";
          o.style.display = "none";
        }
      });
      var i = document.getElementById("tutorial-contents");
      var r = document.getElementById("tutorial-scrolltop");
      var c = document.getElementById("tutorial-pages-container");
      for (var a = o.querySelectorAll("h2.subcontent-title"), s = 1; s < a.length; s++) {
        (function (n) {
          var e = document.createElement("li");
          e.textContent = a[n].textContent;
          e.classList.add("pop-close");
          e.onclick = function () {
            a[n].parentElement.scrollIntoView({
              _s: "start",
              behavior: "smooth"
            });
          };
          i.appendChild(e);
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
    /* ADS EDIT
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
                (s = r.createElement(c)).Qa = a;
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
                      e.bs();
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
                    e.bs();
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
          ys: function () {
            n.Ms();
          },
          Ts: function () {
            try {
              if (window.adplayer !== undefined) {
                startReward();
                window.aiptag.cmd.player.push(function () {
                  window.adplayer.startPreRoll();
                });
                return 1;
              } else {
                __MUTATEoQo();
                return 0;
              }
            } catch (n) {
              __MUTATEoQo();
              return 0;
            }
          },
          As: function (n) {
            e = n;
            e.bs();
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {} ENDEDIT*/
    },
    5299: function (n, e, o) {
    /* ADS EDIT
      try {
        __MUTATEoo = o(6078);
        __MUTATE0 = o(9847);
        __MUTATE000 = o(3543);
        __MUTATEoO = o(1174);
        __MUTATEo0Q = o(3840);
        __MUTATEOOO = o(8582);
        __MUTATEOQ = o(9705);
        CPMStarAds = o(5438);
      } catch (n) {}
      let r;
      function c() {
        if (n.exports.Ls === 1) {
          try {
            __MUTATE0.get("lostworld-io_970x250").innerHTML = "<a href=\"https://taming.io\" onclick=\"try{Widget.sendAdd('taming.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/taming92.png\"></img></a>";
            __MUTATE0.get("lostworld-io_300x250_1").innerHTML = "<a href=\"https://shootup.io\" onclick=\"try{Widget.sendAdd('shootup.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/shootup32.png\"></img></a>";
            __MUTATE0.get("lostworld-io_300x250_2").innerHTML = "<a href=\"https://webgames.io\" onclick=\"try{Widget.sendAdd('webgames.io')}catch(e){}\" target=\"_blank\"><img draggable=\"false\" style=\"cursor: url(./img/ui/cursor-pointer.png) 16 0, pointer;\" src=\"./img/ui/webgames32.png\"></img></a>";
          } catch (n) {}
        }
      }
      Date.now();
      try {
        n.exports = {};
        n.exports.xs = function (n) {
          r.refresh();
        };
        n.exports.As = function (n) {
          r.As(n);
        };
        n.exports.Cs = r;
        n.exports.Ls = 0;
        n.exports.Es = c;
        n.exports.Ms = function (t) {
          t = t || "https://api.adinplay.com/libs/aiptag/assets/adsbygoogle.js";
          __MUTATE000.request(t, undefined, function () {
            n.exports.Ls = 1;
            c();
          });
        };
        n.exports.Bs = function () {
          adblockerPopup.openClosePopup();
        };
        n.exports.Ds = function () {};
      } catch (n) {}
      (function () {
        const t = __MUTATE000.ga("ref");
        if (t === "crazygames") {
          r = __MUTATEo0Q;
          const t = __MUTATE0.get("shop-io-games");
          t[__MUTATE000.ua("onclick")] = function () {};
          t[__MUTATE000.ua("href")] = "https://www.crazygames.com/c/io";
        } else if (t === "gamedistribution") {
          __MUTATE0.get("cross-promo").style.display = "none";
          r = __MUTATEOOO;
        } else if (t === "gamemonetize") {
          r = __MUTATEOQ;
        } else {
          r = CPMStarAds;
          __MUTATE0.get("iogames").style.display = "none";
        }
        __MUTATE0.get("da-left").innerHTML = "<div id='lostworld-io_300x250_1'></div>";
        __MUTATE0.get("da-right").innerHTML = "<div id='lostworld-io_300x250_2'></div>";
        __MUTATE0.get("da-bottom").innerHTML = "<div id='lostworld-io_970x250'></div>";
        r.wa();
        r.ys();
      })(); ENDEDIT*/
    },
    5438: function (n, e, o) {
    /* ADS EDIT
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
          ys: function () {
            n.Ms();
          },
          Ts: function () {
            try {
              __MUTATEoQo();
              return 0;
            } catch (n) {
              __MUTATEoQo();
              return 0;
            }
          },
          As: function (n) {
            e = n;
            e.bs();
          }
        };
      }();
      try {
        n.exports = i;
      } catch (n) {} ENDEDIT*/
    },
    3840: function (n, e, o) {
    /* ADS EDIT
      const i = function () {
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
              r.bs();
            });
            n.addEventListener("adError", function () {
              r.bs();
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
            if (e.Ls === 0) {
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
                (u = r.createElement(a)).Qa = s;
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
          ys: function () {
            e.Ms("https://images.crazygames.com/crazygames-sdk/300x250.png");
          },
          Ts: function () {
            try {
              n[i.ua("requestAd")]("rewarded");
              return 1;
            } catch (n) {
              __MUTATEoQo();
              return 0;
            }
          },
          As: function (t) {
            r = t;
            const o = Date.now();
            if (o - s > 60000 && e.Ls === 0) {
              s = o;
              n[i.ua("requestAd")]("midgame");
            } else {
              r.bs();
            }
          }
        };
      }();
      try {
        n.exports = i;
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
                      const o = {
                        [e.ua("containerId")]: "lostworld-io_300x250_2"
                      };
                      window[e.ua("gdsdk")][e.ua("showAd")](window[e.ua("gdsdk")][e.ua("AdType")][e.ua("Display")], o);
                      const i = {
                        [e.ua("containerId")]: "lostworld-io_970x250"
                      };
                      window[e.ua("gdsdk")][e.ua("showAd")](window[e.ua("gdsdk")][e.ua("AdType")][e.ua("Display")], i);
                    }
                    break;
                  case "AD_ERROR":
                  case "SDK_GAME_START":
                    i.bs();
                }
              };
              a = document;
              s = "script";
              u = "gamedistribution-jssdk";
              l = a.getElementsByTagName(s)[0];
              if (!a.getElementById(u)) {
                (f = a.createElement(s)).Qa = u;
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
          ys: function () {
            e.request("https://tracker.gamedock.io/v1/events-tracker/track/gd/event/pageview", function () {
              n.Ls = 0;
            }, function (t) {
              if (t.status === 405) {
                n.Ls = 0;
              } else {
                n.Ls = 1;
                n.Es();
              }
            });
          },
          Ts: function () {
            try {
              if (window[e.ua("gdsdk")] !== undefined && window[e.ua("gdsdk")][e.ua("showAd")] !== undefined && n.Ls === 0) {
                n.Ds();
                window[e.ua("gdsdk")][e.ua("showAd")]("rewarded");
                return 1;
              } else {
                n.Bs();
                return 0;
              }
            } catch (t) {
              n.Bs();
              return 0;
            }
          },
          As: function (o) {
            i = o;
            if (window[e.ua("gdsdk")] !== undefined && window[e.ua("gdsdk")][e.ua("showAd")] !== undefined && n.Ls === 0) {
              window[e.ua("gdsdk")][e.ua("showAd")]();
            } else {
              i.bs();
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
                    i.bs();
                }
              };
              a = document;
              s = "script";
              u = "gamemonetize-sdk";
              f = a.getElementsByTagName(s)[0];
              if (!a.getElementById(u)) {
                (a = a.createElement(s)).Qa = u;
                a.src = "https://api.gamemonetize.com/sdk.js";
                f.parentNode.insertBefore(a, f);
              }
              const t = n.Ls;
              n.Ls = 1;
              n.Es();
              n.Ls = t;
            } catch (n) {}
            var a;
            var s;
            var u;
            var f;
          },
          refresh: function () {},
          ys: function () {
            e.request("https://tracker.gamedock.io/v1/events-tracker/track/gd/event/pageview", function () {
              n.Ls = 0;
            }, function (t) {
              if (t.status === 405) {
                n.Ls = 0;
              } else {
                n.Ls = 1;
                n.Es();
              }
            });
          },
          Ts: function () {
            try {
              if (window[e.ua("sdk")] !== undefined && window[e.ua("sdk")][e.ua("showBanner")] !== undefined && n.Ls === 0) {
                n.Ds();
                window[e.ua("sdk")][e.ua("showBanner")]();
                return 1;
              } else {
                n.Bs();
                return 0;
              }
            } catch (t) {
              n.Bs();
              return 0;
            }
          },
          As: function (o) {
            i = o;
            if (window[e.ua("sdk")] !== undefined && window[e.ua("sdk")][e.ua("showBanner")] !== undefined && n.Ls === 0) {
              window[e.ua("sdk")][e.ua("showBanner")]();
            } else {
              i.bs();
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
        this.zs = o.Rc;
      };
    },
    8557: function (n, e, o) {
      "use strict";

      o.r(e);
      o.d(e, {
        Us: function () {
          return Ae;
        },
        Ss: function () {
          return Jo;
        },
        Hs: function () {
          return li;
        },
        Ns: function () {
          return Ie;
        },
        Gs: function () {
          return Jr;
        },
        Vs: function () {
          return wr;
        },
        js: function () {
          return mr;
        },
        Fs: function () {
          return pr;
        },
        Ps: function () {
          return fi;
        },
        Rs: function () {
          return eo;
        },
        qs: function () {
          return fo;
        },
        canvas: function () {
          return We;
        },
        Ys: function () {
          return Wr;
        },
        Ks: function () {
          return Li;
        },
        Ws: function () {
          return Uo;
        },
        Os: function () {
          return Ti;
        },
        Zs: function () {
          return io;
        },
        Is: function () {
          return bo;
        },
        Js: function () {
          return bi;
        },
        Xs: function () {
          return Ho;
        },
        Qs: function () {
          return ki;
        },
        $s: function () {
          return Ai;
        },
        nu: function () {
          return Mo;
        },
        tu: function () {
          return gi;
        },
        connect: function () {
          return cr;
        },
        eu: function () {
          return Co;
        },
        ou: function () {
          return yi;
        },
        iu: function () {
          return Mi;
        },
        ru: function () {
          return pi;
        },
        cu: function () {
          return Oe;
        },
        au: function () {
          return Gi;
        },
        su: function () {
          return Hi;
        },
        uu: function () {
          return Ni;
        },
        default: function () {
          return Er;
        },
        fu: function () {
          return Dr;
        },
        lu: function () {
          return Ar;
        },
        hu: function () {
          return Br;
        },
        du: function () {
          return Cr;
        },
        ku: function () {
          return _o;
        },
        gu: function () {
          return Tr;
        },
        wu: function () {
          return xr;
        },
        pu: function () {
          return Ur;
        },
        mu: function () {
          return er;
        },
        vu: function () {
          return vi;
        },
        _u: function () {
          return lr;
        },
        bu: function () {
          return Fi;
        },
        yu: function () {
          return Sr;
        },
        Mu: function () {
          return Yi;
        },
        Tu: function () {
          return xi;
        },
        Au: function () {
          return _i;
        },
        Lu: function () {
          return So;
        },
        xu: function () {
          return Ze;
        },
        wa: function () {
          return hr;
        },
        Cu: function () {
          return Ki;
        },
        Eu: function () {
          return kr;
        },
        Bu: function () {
          return Fr;
        },
        Du: function () {
          return go;
        },
        zu: function () {
          return Lo;
        },
        Uu: function () {
          return Ao;
        },
        Su: function () {
          return $e;
        },
        Hu: function () {
          return ro;
        },
        Nu: function () {
          return Lr;
        },
        Gu: function () {
          return ir;
        },
        Vu: function () {
          return rr;
        },
        ju: function () {
          return hi;
        },
        Fu: function () {
          return xo;
        },
        Pu: function () {
          return zo;
        },
        Ru: function () {
          return ao;
        },
        qu: function () {
          return mi;
        },
        Yu: function () {
          return wi;
        },
        Ku: function () {
          return Bo;
        },
        Wu: function () {
          return Do;
        },
        Ou: function () {
          return so;
        },
        Zu: function () {
          return Ji;
        },
        Iu: function () {
          return Xi;
        },
        Ju: function () {
          return Qi;
        },
        Xu: function () {
          return wo;
        },
        Qu: function () {
          return po;
        },
        bs: function () {
          return Kr;
        },
        $u: function () {
          return co;
        },
        nf: function () {
          return fc;
        },
        tf: function () {
          return vc;
        },
        ef: function () {
          return ic;
        },
        if: function () {
          return Ac;
        },
        rf: function () {
          return $r;
        },
        cf: function () {
          return wc;
        },
        af: function () {
          return Pr;
        },
        sf: function () {
          return sc;
        },
        uf: function () {
          return uc;
        },
        ff: function () {
          return jr;
        },
        lf: function () {
          return nc;
        },
        hf: function () {
          return oc;
        },
        df: function () {
          return xc;
        },
        kf: function () {
          return Xr;
        },
        gf: function () {
          return Qr;
        },
        wf: function () {
          return Zr;
        },
        pf: function () {
          return qr;
        },
        mf: function () {
          return Lc;
        },
        vf: function () {
          return kc;
        },
        _f: function () {
          return Rr;
        },
        bf: function () {
          return yc;
        },
        yf: function () {
          return hc;
        },
        Mf: function () {
          return cc;
        },
        Tf: function () {
          return ec;
        },
        Af: function () {
          return Gr;
        },
        Lf: function () {
          return Ir;
        },
        xf: function () {
          return Vr;
        },
        Cf: function () {
          return ac;
        },
        Ef: function () {
          return Or;
        },
        Bf: function () {
          return pc;
        },
        Df: function () {
          return Yr;
        },
        zf: function () {
          return lc;
        },
        Uf: function () {
          return mc;
        },
        Sf: function () {
          return rc;
        },
        Hf: function () {
          return tc;
        },
        Nf: function () {
          return gc;
        },
        Gf: function () {
          return Mc;
        },
        Vf: function () {
          return Tc;
        },
        jf: function () {
          return bc;
        },
        Ff: function () {
          return _c;
        },
        Pf: function () {
          return Oi;
        },
        Rf: function () {
          return Bi;
        },
        qf: function () {
          return ko;
        },
        Yf: function () {
          return Ci;
        },
        Kf: function () {
          return oo;
        },
        Wf: function () {
          return yo;
        },
        Of: function () {
          return Eo;
        },
        Zf: function () {
          return dc;
        },
        If: function () {
          return ar;
        },
        Jf: function () {
          return zr;
        },
        Xf: function () {
          return gr;
        },
        resize: function () {
          return fr;
        },
        scale: function () {
          return Qe;
        },
        Qf: function () {
          return zi;
        },
        $f: function () {
          return mo;
        },
        nl: function () {
          return vo;
        },
        tl: function () {
          return Di;
        },
        el: function () {
          return Si;
        },
        ol: function () {
          return Ui;
        },
        il: function () {
          return Cc;
        },
        rl: function () {
          return Wc;
        },
        cl: function () {
          return Sc;
        },
        al: function () {
          return Yc;
        },
        sl: function () {
          return Oc;
        },
        ul: function () {
          return Jc;
        },
        fl: function () {
          return Bc;
        },
        ll: function () {
          return Rc;
        },
        hl: function () {
          return Fc;
        },
        dl: function () {
          return Pc;
        },
        kl: function () {
          return qc;
        },
        gl: function () {
          return Dc;
        },
        wl: function () {
          return zc;
        },
        pl: function () {
          return jc;
        },
        ml: function () {
          return Uc;
        },
        vl: function () {
          return Hc;
        },
        _l: function () {
          return Ic;
        },
        bl: function () {
          return Zc;
        },
        yl: function () {
          return Kc;
        },
        Ml: function () {
          return Xc;
        },
        Tl: function () {
          return Gc;
        },
        Al: function () {
          return Nc;
        },
        Ll: function () {
          return Vc;
        },
        xl: function () {
          return Ec;
        },
        Cl: function () {
          return uo;
        },
        El: function () {
          return di;
        },
        Bl: function () {
          return ur;
        },
        Dl: function () {
          return sr;
        },
        zl: function () {
          return Oo;
        },
        Ul: function () {
          return jo;
        },
        Sl: function () {
          return ui;
        },
        Hl: function () {
          return Yo;
        },
        Nl: function () {
          return Fo;
        },
        Gl: function () {
          return qo;
        },
        Vl: function () {
          return Io;
        },
        jl: function () {
          return Wo;
        },
        Fl: function () {
          return Zo;
        },
        Pl: function () {
          return Ko;
        },
        Rl: function () {
          return Po;
        },
        ql: function () {
          return Ro;
        },
        Yl: function () {
          return To;
        },
        Kl: function () {
          return lo;
        },
        Wl: function () {
          return ho;
        },
        Ol: function () {
          return to;
        },
        Zl: function () {
          return Pi;
        },
        Il: function () {
          return Vo;
        },
        Jl: function () {
          return Ri;
        },
        Xl: function () {
          return Go;
        },
        Ql: function () {
          return or;
        },
        $l: function () {
          return qi;
        },
        nh: function () {
          return br;
        },
        th: function () {
          return No;
        },
        eh: function () {
          return Xe;
        },
        oh: function () {
          return $i;
        },
        ih: function () {
          return tr;
        },
        rh: function () {
          return nr;
        },
        Ja: function () {
          return dr;
        },
        ah: function () {
          return Mr;
        },
        sh: function () {
          return ji;
        },
        uh: function () {
          return Ii;
        },
        fh: function () {
          return yr;
        },
        lh: function () {
          return Ei;
        },
        hh: function () {
          return Je;
        },
        dh: function () {
          return no;
        }
      });
      var r = o(7251);
      var c = o.n(r);
      var a = o(1917);
      var s = o.n(a);
      var u = o(3255);
      var f = o.n(u);
      var l = o(5397);
      var h = o.n(l);
      var d = o(3555);
      var k = o.n(d);
      var g = o(48);
      var w = o.n(g);
      let p = new Map();
      let m = [];
      let v = [];
      function _() {
        p = new Map();
        m = [];
        let n = m;
        for (let t in s()) {
          n[s()[t]] = [];
        }
        let t = v;
        for (let n in s()) {
          t[s()[n]] = [];
        }
      }
      function b(n, e, o) {
        const r = (n.kh | n.gh << 8) * e;
        const c = n.wh | n.ph << 8;
        n.mh += Math.cos(n._h) * r;
        n.bh += Math.sin(n._h) * r;
        n.range += r;
        if (n.range >= c) {
          n.range -= c;
          n.mh -= n.range * Math.cos(n._h);
          n.bh -= n.range * Math.sin(n._h);
          n.active = false;
        }
      }
      function y(n, e, o) {
        n.yh += e * 1000;
        const r = Math.min(1.71, n.yh / 171);
        n.mh = n.Mh + (n.Th - n.Mh) * r;
        n.bh = n.Ah + (n.Lh - n.Ah) * r;
        if (n.Qa !== yo && o <= n.xh && o >= n.Ch) {
          let t = n.xh - n.Ch;
          let e = (o - n.Ch) / t;
          n._h = k().Eh(n.Bh, n.Dh, e);
        }
      }
      function M(n, e) {
        let i = m[s().un];
        let r = i.length;
        const a = e - 1000 / c().zh;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s()._n];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Rn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Dn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Bn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Hn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Sn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Un];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().En];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().Zn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          y(i[t], n, a);
        }
        i = m[s().mn];
        r = i.length;
        for (let t = 0; t < r; t++) {
          b(i[t], n);
        }
        i = m[s().Tn];
        r = i.length;
        for (let n = 0; n < r; n++) {
          (u = i[n])._h = u.Dh;
        }
        var u;
      }
      function T(n) {
        if (v[n].length > 0) {
          let t = v[n].pop();
          t.zs = h().Rc;
          return t;
        }
        return new (w())();
      }
      function A(n, t, e, o, i, r, c, a, s, u, f, l, d, k, g, w, m) {
        let v = p.get(t) || T(n);
        if (v.zs & h().Rc) {
          C(v, n, t, e, o, i, r, c, a, s, u, f, l, d, k, g, w, m);
          L(v);
          return;
        }
        v.Uh = e;
        v.Mh = v.mh;
        v.Ah = v.bh;
        v.Th = i;
        v.Lh = r;
        v.zs = o;
        v.Bh = v.Dh;
        v.Dh = c;
        v.kh = a;
        v.gh = s;
        v.wh = u;
        v.ph = f;
        v.Sh = l;
        v.Hh = d;
        v.Nh = k;
        v.Gh = g;
        v.Vh = w;
        v.Ch = v.xh;
        v.xh = m;
        v.yh = 0;
      }
      function L(n) {
        const t = m[n.type];
        const e = t.length;
        t[e] = n;
        n.jh = e;
        if (!p.has(n.Qa)) {
          p.set(n.Qa, n);
        }
      }
      function x(n, e) {
        let i = p.get(n);
        if (!i) {
          return;
        }
        p.delete(n);
        const r = m[i.type];
        const c = i.jh;
        const a = r.length - 1;
        if (a !== c) {
          const n = r[a];
          r[a] = r[c];
          r[c] = n;
          n.jh = c;
        }
        v[i.type].push(i);
        r.pop();
      }
      function C(n, e, o, i, r, c, a, u, l, h, d, g, w, p, m, v, _, b) {
        n.type = e;
        n.Qa = o;
        n.Uh = i;
        n.mh = n.Mh = n.Th = c;
        n.bh = n.Ah = n.Lh = a;
        n._h = n.Bh = n.Dh = u;
        n.zs = r;
        n.kh = l;
        n.gh = h;
        n.wh = d;
        n.ph = g;
        n.Sh = w;
        n.Hh = p;
        n.Nh = m;
        n.Gh = v;
        n.Vh = _;
        n.Fh = new (k().Ph)(1, 0, 1, 0, 1, 1);
        n.Rh = Date.now();
        n.Ch = 0;
        n.xh = b;
        n.yh = 0;
        n.qh = null;
        n.Yh = false;
        switch (e) {
          case s().un:
            break;
          case s().Tn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Do, f().Eo]
            };
            break;
          case s()._n:
          case s().Dn:
          case s().Bn:
          case s().Hn:
          case s().Un:
          case s().Sn:
          case s().En:
          case s().Zn:
            break;
          case s().fn:
          case s().Fn:
          case s().Pn:
          case s().Gn:
          case s().Vn:
          case s().jn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Do]
            };
            break;
          case s().hn:
          case s().dn:
          case s().Yn:
          case s().An:
          case s().Ln:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Bo]
            };
            break;
          case s().xn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Do]
            };
            break;
          case s().pn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Eo]
            };
            break;
          case s().tn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().tn]
            };
            break;
          case s().Wn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Wn]
            };
            break;
          case s().vn:
            n.Oh = Math.PI / 4;
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().tn, f().Eo]
            };
            break;
          case s().Kn:
            n.Oh = Math.PI / 4;
            break;
          case s().yn:
            n.Oh = Math.PI / 2;
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().tn, f().Eo]
            };
            break;
          case s().Z:
          case s().gn:
          case s().qn:
          case s().Nn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Eo]
            };
            break;
          case s().Cn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Do]
            };
            break;
          case s().bn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Eo]
            };
            break;
          case s().O:
          case s().$:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Do]
            };
            break;
          case s().wn:
          case s().zn:
          case s().kn:
          case s().ln:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Eo]
            };
            break;
          case s().On:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Zh]
            };
            break;
          case s().Mn:
            n.qh = {
              active: false,
              Kh: 0,
              Wh: [f().Eo]
            };
            break;
          case s().mn:
            n.active = true;
            n.range = 0;
        }
      }
      _();
      let E = false;
      try {
        E = window.localStorage && true;
      } catch (n) {}
      if (!E) {
        Object.defineProperty(window, "localStorage", {
          value: {
            Ih: {},
            setItem: function (n, t) {
              return this.Ih[n] = t + "";
            },
            getItem: function (n) {
              if (this.Ih.hasOwnProperty(n)) {
                return this.Ih[n];
              } else {
                return undefined;
              }
            },
            removeItem: function (n) {
              return delete this.Ih[n];
            },
            clear: function () {
              return this.Ih = {};
            }
          }
        });
      }
      let B = function n(e, o, i) {
        function r(n) {
          M = n;
          T = true;
          return function () {
            while (T) {
              var n = s();
              p[n]();
            }
            return y[0];
          }();
        }
        function c() {
          return e[M++] | e[M++] << 8 | e[M++] << 16 | e[M++] << 24;
        }
        function a() {
          let n = e[M++];
          if (n & 128) {
            return n & 127;
          } else {
            return n & 127 | e[M++] << 7;
          }
        }
        function s() {
          return e[M++];
        }
        function u(n, t) {
          y[n] = t;
        }
        function f(n) {
          var t;
          var e;
          var o;
          t = [];
          e = 0;
          for (; e < n; e++) {
            o = b[i[6]]();
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
        var k = function (n) {
          return typeof n == "object";
        };
        var g = k(globalThis) ? globalThis : k(window) ? window : self;
        var w = [];
        var p = [function () {
          u(s(), function (n) {
            var t = _;
            let e = function () {
              var e;
              var c;
              var a;
              var s;
              var f;
              var l;
              var h;
              var d;
              var k;
              var g;
              var w;
              var p;
              var m;
              var v;
              var L = y;
              y = [];
              u(0, undefined);
              u(1, arguments);
              e = o[n];
              c = _;
              a = e[2];
              s = e[3];
              _ = [];
              f = 0;
              for (; f < a; f++) {
                _[f] = {
                  Jh: undefined
                };
              }
              for (l = 0; l < s[i[0]]; l += 2) {
                h = s[l + 0];
                d = s[l + 1];
                _[h] = t[d];
              }
              k = b;
              b = [];
              g = A;
              A = this;
              m = M;
              v = e[4];
              try {
                w = r(v);
              } catch (n) {
                p = n;
              }
              b = k;
              A = g;
              M = m;
              _ = c;
              y = L;
              T = true;
              if (p) {
                throw p;
              }
              return w;
            };
            l[h++] = e;
            return e;
          }(e[M++] | e[M++] << 8));
        }, function () {
          var n = c();
          var t = s();
          _[n].Jh = y[t];
        }, function () {
          var n = s();
          var t = a();
          u(n, w[t]);
        }, function () {
          var n = s();
          b.push(y[n]);
        }, function () {
          u(s(), s());
        }, function () {
          u(s(), f(a()));
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          var o = f(s());
          u(n, (t = y[t])[y[e]][i[10]](t, o));
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
          u(n, y[t] * y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] + y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = f(s());
          u(n, y[t][i[10]](g, e));
        }, function () {
          var n = s();
          var t = c();
          u(n, _[t].Jh);
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
          u(n, y[t][y[e]]);
        }, function () {
          u(s(), !y[s()]);
        }, function () {
          var n = s();
          var t = s();
          u(n, y[t]);
        }, function () {
          var n = c();
          var t = s();
          if (!y[t]) {
            M = n;
          }
        }, function () {
          var n = s();
          var t = c();
          let e = c();
          u(n, RegExp(w[t], w[e]));
        }, function () {
          u(s(), typeof y[s()]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] !== y[e]);
        }, function () {
          var n = c();
          M = n;
        }, function () {
          var n = s();
          var t = y[s()];
          var e = y[s()];
          var o = y[s()];
          u(n, t[e] = o);
        }, function () {
          T = false;
        }, function () {
          u(s(), !!s());
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] < y[e]);
        }, function () {
          var n = s();
          var t = c();
          u(n, s() ? ++_[t].Jh : _[t].Jh++);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] ^ y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] >>> y[e]);
        }, function () {
          u(s(), (v[0] = e[M++], v[1] = e[M++], v[2] = e[M++], v[3] = e[M++], v[4] = e[M++], v[5] = e[M++], v[6] = e[M++], v[7] = e[M++], m[0]));
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] & y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] > y[e]);
        }, function () {
          var e;
          var o;
          var r;
          u(s(), (e = y[s()], o = f(s()), r = [null], Array[i[11]].push[i[10]](r, o), new (Function[i[11]].bind[i[10]](e, r))()));
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] % y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] << y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] - y[e]);
        }, function () {
          var n = s();
          var t = s();
          var e = s();
          u(n, y[t] === y[e]);
        }, function () {
          for (var n = s() | s() << 8, t = "", e = 0; e < n; e++) {
            t += String.fromCharCode(s());
          }
          w.push(t);
        }, function () {
          M = 0;
        }];
        var m = new Float64Array(1);
        var v = new Uint8Array(m[i[5]]);
        var _ = [];
        var b = [];
        var y = [];
        var M = 0;
        var T = false;
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
            var h;
            var k;
            var g;
            var w;
            var p;
            o = 0;
            r = (e = d) ? "" + e : "";
            c = 0;
            for (; c < r[i[0]]; c++) {
              o = Math[i[2]](31, o) + r[i[1]](c) | 0;
            }
            o = 1922100408;
            h = (l = (f = n[i[3]](/[^A-Za-z0-9+/]/g, ""))[i[0]]) * 3 + 1 >> 2;
            k = new Uint8Array(h);
            g = 0;
            w = 0;
            p = 0;
            for (; p < l; p++) {
              s = p & 3;
              g |= ((u = f[i[1]](p)) > 64 && u < 91 ? u - 65 : u > 96 && u < 123 ? u - 71 : u > 47 && u < 58 ? u + 4 : u === 43 ? 62 : u === 47 ? 63 : 0) << (3 - s) * 6;
              if (s === 3 || l - p == 1) {
                for (a = 0; a < 3 && w < h; a++, w++) {
                  o = (o + 1) % 255;
                  k[w] = g >>> (16 >>> a & 24) & 255 ^ o;
                }
                g = 0;
              }
            }
            return k;
          }(e);
          _ = [];
          for (var n = 0; n < o[0][2]; n++) {
            _[n] = {
              Jh: undefined
            };
          }
          b = [];
          y = [];
          M = o[0][4];
          T = false;
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
        var h;
        var d;
        let k = (...n) => new Uint8Array(...n);
        let g = (...n) => new Uint16Array(...n);
        function w() {
          this.Jh = g(16);
          this.Xh = g(288);
        }
        function p(n, t) {
          this.Qh = n;
          this.$h = 0;
          this.nd = 0;
          this.td = 0;
          this.ed = t;
          this.od = 0;
          this.rd = new w();
          this.ad = new w();
        }
        function m(n, t, e, o) {
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
            n.Jh[i] = 0;
          }
          for (i = 0; o > i; ++i) {
            n.Jh[t[e + i]]++;
          }
          n.Jh[0] = 0;
          r = 0;
          i = 0;
          for (; i < 16; ++i) {
            d[i] = r;
            r += n.Jh[i];
          }
          for (i = 0; o > i; ++i) {
            if (t[e + i]) {
              n.Xh[d[t[e + i]]++] = i;
            }
          }
        }
        function _(n) {
          if (!n.td--) {
            n.nd = n.Qh[n.$h++];
            n.td = 7;
          }
          var t = n.nd & 1;
          n.nd >>>= 1;
          return t;
        }
        function b(n, t, e) {
          if (!t) {
            return e;
          }
          while (n.td < 24) {
            n.nd |= n.Qh[n.$h++] << n.td;
            n.td += 8;
          }
          var o = n.nd & 65535 >>> 16 - t;
          n.nd >>>= t;
          n.td -= t;
          return o + e;
        }
        function y(n, t) {
          var e;
          var o;
          var i;
          var r;
          while (n.td < 24) {
            n.nd |= n.Qh[n.$h++] << n.td;
            n.td += 8;
          }
          e = 0;
          o = 0;
          i = 0;
          r = n.nd;
          do {
            o = o * 2 + (r & 1);
            r >>>= 1;
            ++i;
            e += t.Jh[i];
            o -= t.Jh[i];
          } while (o >= 0);
          n.nd = r;
          n.td -= i;
          return t.Xh[e + o];
        }
        function M(n, t, e) {
          var o;
          var i;
          var r;
          var c;
          var a;
          var s;
          var u = b(n, 5, 257);
          var d = b(n, 5, 1);
          var k = b(n, 4, 4);
          for (o = 0; o < 19; ++o) {
            h[o] = 0;
          }
          for (o = 0; k > o; ++o) {
            c = b(n, 3, 0);
            h[f[o]] = c;
          }
          v(l, h, 0, 19);
          i = 0;
          while (u + d > i) {
            switch (a = y(n, l)) {
              case 16:
                s = h[i - 1];
                r = b(n, 2, 3);
                for (; r; --r) {
                  h[i++] = s;
                }
                break;
              case 17:
                for (r = b(n, 3, 3); r; --r) {
                  h[i++] = 0;
                }
                break;
              case 18:
                for (r = b(n, 7, 11); r; --r) {
                  h[i++] = 0;
                }
                break;
              default:
                h[i++] = a;
            }
          }
          v(t, h, 0, u);
          v(e, h, u, d);
        }
        function T(t, e, o) {
          var i;
          var r;
          var f;
          var l;
          var h;
          while (true) {
            if ((i = y(t, e)) === 256) {
              return n;
            }
            if (i < 256) {
              t.ed[t.od++] = i;
            } else {
              r = b(t, c[i -= 257], a[i]);
              f = y(t, o);
              h = l = t.od - b(t, s[f], u[f]);
              for (; l + r > h; ++h) {
                t.ed[t.od++] = t.ed[h];
              }
            }
          }
        }
        function A(t) {
          var o;
          var i;
          while (t.td > 8) {
            t.$h--;
            t.td -= 8;
          }
          if ((o = (o = t.Qh[t.$h + 1]) * 256 + t.Qh[t.$h]) !== (~(t.Qh[t.$h + 3] * 256 + t.Qh[t.$h + 2]) & 65535)) {
            return e;
          }
          t.$h += 4;
          i = o;
          for (; i; --i) {
            t.ed[t.od++] = t.Qh[t.$h++];
          }
          t.td = 0;
          return n;
        }
        function L(o, c) {
          var s;
          var u;
          var f = new p(o, c);
          do {
            s = _(f);
            switch (b(f, 2, 0)) {
              case 0:
                u = A(f);
                break;
              case 1:
                u = T(f, i, r);
                break;
              case 2:
                M(f, f.rd, f.ad);
                u = T(f, f.rd, f.ad);
                break;
              default:
                u = e;
            }
            if (u !== n) {
              throw Error("Data error");
            }
          } while (!s);
          if (f.od < f.ed.length) {
            if (typeof f.ed.slice == "function") {
              return f.ed.slice(0, f.od);
            } else {
              return f.ed.subarray(0, f.od);
            }
          } else {
            return f.ed;
          }
        }
        function x(n, t = 0) {
          var e;
          var o;
          var i;
          var r;
          var c;
          var a;
          var s = n.replace(/[^A-Za-z0-9+/]/g, "");
          var u = s.length;
          var f = t ? Math.ceil((u * 3 + 1 >> 2) / t) * t : u * 3 + 1 >> 2;
          var l = k(f);
          i = 0;
          r = 0;
          c = 0;
          for (; u > c; c++) {
            o = c & 3;
            i |= ((a = s.charCodeAt(c)) > 64 && a < 91 ? a - 65 : a > 96 && a < 123 ? a - 71 : a > 47 && a < 58 ? a + 4 : a === 43 ? 62 : a === 47 ? 63 : 0) << (3 - o) * 6;
            if (o === 3 || u - c == 1) {
              for (e = 0; e < 3 && f > r; e++, r++) {
                l[r] = i >>> (16 >>> e & 24) & 255;
              }
              i = 0;
            }
          }
          return l;
        }
        n = 0;
        e = -3;
        i = new w();
        r = new w();
        c = k(30);
        a = g(30);
        s = k(30);
        u = g(30);
        f = k([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
        l = new w();
        h = k(320);
        d = g(16);
        ((n, t) => {
          var e;
          for (e = 0; e < 7; ++e) {
            n.Jh[e] = 0;
          }
          n.Jh[7] = 24;
          n.Jh[8] = 152;
          n.Jh[9] = 112;
          e = 0;
          for (; e < 24; ++e) {
            n.Xh[e] = 256 + e;
          }
          for (e = 0; e < 144; ++e) {
            n.Xh[24 + e] = e;
          }
          for (e = 0; e < 8; ++e) {
            n.Xh[168 + e] = 280 + e;
          }
          for (e = 0; e < 112; ++e) {
            n.Xh[176 + e] = 144 + e;
          }
          for (e = 0; e < 5; ++e) {
            t.Jh[e] = 0;
          }
          t.Jh[5] = 32;
          e = 0;
          for (; e < 32; ++e) {
            t.Xh[e] = e;
          }
        })(i, r);
        m(c, a, 4, 3);
        m(s, u, 2, 1);
        c[28] = 0;
        a[28] = 258;
        (function (n, e = {}) {
          let r = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : e;
          let c = r;
          let a = x("AecCAAA9UbGO00AQ3Tc73sRxQqQIVigFOglSnFJdHVnIB7dCCqAr7qTrUJT4EkuJjWIfJwp+hYoPoKKGloKKmh/gJ5hx7mjejt+bN2/W63s3dX5UN/ti2Xi7yj9447nJ68Z3t9Vy0RRV6Xmzz6+9uy3KVXXr6d0z311Vy5tdXjb+4Tpvzra51vXpx4vF+u1il3tXXO/bc5uX62bjh8uqbKTl5b2N6/eL0sdFWeb7VxdvXvvecrPYv6hWedZcGnMJmADzBKBAdmDBgSPHljM+gZCxMRgALlDnEeOXMeY5g/j4qRnxLuMRVwpbhUKhVmgUjhQWCqXC6j9333I+4BhWahODecDoBooDehlO5JtiRAfNHY4OzxidGSEKSBwIc2ZMwGNsYWQbiOTOxNhyf8iYGRCpxzEkqav+bkDfgTHGV7QN3cB91QPiQIOMNBrpNxHPDSaMGPEhvqf2njikL3EEmmsU8Zj+3sWjjUfL/dZ4Qqwex8SBHjjSOyU0IpnWJ1H7oibtZRhzIozpp9hGpKMS0drFpgywEHYqr4GZPJCzsEIgRMORM5nTd4oeW4ux3Yv/yhpw+kknwYhJNrKQaTqEQpS4SLqZozF/pnbx9IuekZlwZEmX/37YYir/k1JdKVXmigz66fCu6qU/cKg66Snay7qJoc7xPw==");
          let s = !!a[0];
          let u = s ? a[1] | a[2] << 8 | a[3] << 16 | a[4] << 24 : a.length;
          let f = s ? k(u) : k(a.buffer, 5, a.length - 5);
          if (s) {
            L(k(a.buffer, 5, a.length - 5), f);
          }
          let l = 0;
          let h = {};
          let d = [];
          let g = [];
          let w = [];
          let p = [];
          let m = 0;
          let v = null;
          let _ = null;
          let b = [];
          let y = null;
          e.sd = {};
          e.ud = o(4733);
          let M = new Float64Array(1);
          function T() {
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
          function C() {
            let n = T();
            let t = "";
            for (let e = 0; n > e; e++) {
              t += String.fromCharCode(T());
            }
            return t;
          }
          function E(n, t) {
            let e = h;
            return function o() {
              let i = m;
              let r = {};
              m = n;
              let a = h;
              h = r;
              h[n] = {};
              let s = p[n];
              let u = s.length;
              for (let n = 0; u > n; n++) {
                let t = s[n];
                let o = e[t];
                r[t] = o;
              }
              let f = d;
              let k = l;
              let g = v;
              let w = _;
              let M = c;
              let T = b;
              let A = null;
              let L = null;
              d = [];
              b = [];
              l = t;
              v = o;
              _ = arguments;
              c = this;
              try {
                A = B();
              } catch (n) {
                if (b.length) {
                  let t = b.pop();
                  l = t;
                  y = n;
                  A = B();
                } else {
                  L = n;
                }
              }
              b = T;
              l = k;
              d = f;
              v = g;
              h = a;
              m = i;
              _ = w;
              c = M;
              if (L) {
                throw L;
              }
              return A;
            };
          }
          function B() {
            while (true) {
              let t = f[l++];
              switch (t) {
                case 35:
                  h[m][T()] = _;
                  break;
                case 18:
                  d[f[l++]] = T();
                  break;
                case 88:
                  d[f[l++]] = f[l++] ? ++h[T()][T()] : h[T()][T()]++;
                  break;
                case 37:
                  d[f[l++]] = d[f[l++]];
                  break;
                case 21:
                  d[f[l++]] = E(T(), A());
                  break;
                case 70:
                  d[f[l++]] = g[T()];
                  break;
                case 30:
                  d[f[l++]] = RegExp(g[T()], g[T()]);
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
                  w.push(d[f[l++]]);
                  break;
                case 63:
                  d[f[l++]] = d[f[l++]][d[f[l++]]] = d[f[l++]];
                  break;
                case 6:
                  d[f[l++]] = d[f[l++]][d[f[l++]]];
                  break;
                case 49:
                  {
                    let t = T();
                    let e = Array(t);
                    for (let n = 0; t > n; n++) {
                      e[t - n - 1] = w.pop();
                    }
                    let o = f[l++];
                    let i = f[l++];
                    let r = f[l++];
                    let c = d[i];
                    let a = d[r];
                    d[o] = c[a].apply(c, e);
                    break;
                  }
                case 13:
                  {
                    let t = f[l++];
                    let o = !!f[l++];
                    let i = T();
                    let c = g[i];
                    if (c in e) {
                      d[t] = e[c];
                      break;
                    }
                    if (o && !(c in r)) {
                      throw new ReferenceError(c + " is not defined");
                    }
                    d[t] = r[c];
                    break;
                  }
                case 80:
                  {
                    let t = T();
                    let e = Array(t);
                    for (let o = 0; t > o; o++) {
                      e[t - o - 1] = w.pop();
                    }
                    d[f[l++]] = e;
                  }
                  break;
                case 59:
                  d[f[l++]] = h[T()][T()];
                  break;
                case 43:
                  d[f[l++]] = h[T()][T()] = d[f[l++]];
                  break;
                case 9:
                  h[T()][T()] = d[f[l++]];
                  break;
                case 26:
                  {
                    let n = f[l++];
                    let t = A();
                    if (!d[n]) {
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
                  return d[0];
                default:
                  throw "u" + t;
              }
            }
          }
          k(M.buffer);
          (() => {
            for (l = 0;;) {
              let n = f[l++];
              if (n === 22) {
                g.push(C());
              } else {
                if (n !== 85) {
                  l--;
                  return;
                }
                {
                  let n = T();
                  let t = T();
                  let e = [];
                  for (let n = 0; t > n; n++) {
                    e.push(T());
                  }
                  p[n] = e;
                }
              }
            }
          })();
          E(0, l).call(this);
        })(0, {});
      })();
      const D = B[13];
      const z = B[18];
      const U = B[19];
      const S = B[20];
      const H = B[24];
      var N = o(5108);
      let G = {
        fd: {},
        ld: function (n, t, e) {
          return n + "-" + t + "x" + e;
        },
        hd: function (n, t, e) {
          t = Math.ceil(t);
          e = Math.ceil(e);
          let r = document.createElement("canvas");
          r.width = t;
          r.height = e;
          G.fd[this.ld(n, t, e)] = r;
          return r;
        },
        dd: function (n, t, e) {
          return this.fd[this.ld(n, t, e)];
        },
        kd: function (n, t, e) {
          delete G.fd[this.ld(n, t, e)];
        },
        gd: {},
        wd: function (n, t = 256, e = 256, o = null) {
          t = Math.ceil(t);
          e = Math.ceil(e);
          let c = o ? n + ":" + o : n;
          let a = this.dd(c, t, e);
          if (!a) {
            a = this.hd(c, t, e);
            let i = G.gd[n];
            if (i) {
              if (i.xa) {
                this.pd(i, a, o);
              } else {
                i.addEventListener("load", () => this.pd(i, a, o));
              }
            } else {
              let i = new Image();
              i.xa = false;
              i.src = N.default.La(n);
              i.addEventListener("load", () => {
                this.pd(i, a, o);
                i.xa = true;
              });
              i.addEventListener("error", () => {
                delete G.gd[n];
                this.kd(n, t, e);
              });
              this.gd[n] = i;
            }
          }
          return a;
        },
        pd: function (n, t, e) {
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
        md: function (n) {
          return "/img/icon/" + n + ".png?v=1923912";
        },
        vd: function (n) {
          return "/img/ui/" + n + ".png?v=1923912";
        },
        _d: function (n) {
          return "/img/hats/" + n + ".png?v=1923912";
        },
        bd: function (n, t = false) {
          return "/img/entity/" + n + ".png?v=1923912";
        },
        yd: function (n) {
          return "/img/items/" + n + ".png?v=1923912";
        },
        Md: function (n) {
          return "/img/skins/" + n + ".png?v=1923912";
        },
        Td: function (n) {
          return "/img/decorations/" + n + ".png?v=1923912";
        },
        Ad: function (n) {
          return k().Ld(n);
        }
      };
      var V = G;
      var j = o(6597);
      var F = o.n(j);
      var P = o(9847);
      var R = o.n(P);
      const q = [];
      function Y(n, t, e, o, i, r, c, a, s, u, f, l) {
        this.xd = n;
        this.Cd = t;
        this.Ed = e;
        this.Bd = o;
        this.Dd = i;
        this.zd = r > 0 ? r : 0;
        this.Ud = c;
        this.Sd = a;
        this.Hd = s > 0 ? s : 0;
        this.Nd = u;
        this.Gd = f;
        this.Vd = l > 0 ? l : 0;
      }
      q[F().Hr] = [];
      for (let n = 0; n < 20; n++) {
        q[F().Hr][n] = V.Ad(V.Md("game-rank" + n));
      }
      q[F().Uo] = [];
      q[F().So] = [];
      q[F().Sr] = [];
      q[F().Yr] = [];
      for (let n = 0; n < R().es; n++) {
        q[F().Uo][n] = V.Ad(V.Md("body" + n));
        q[F().So][n] = V.Ad(V.Md("arm" + n));
      }
      for (let n = 0; n < R().os; n++) {
        q[F().Sr][n] = V.Ad(V.Md("accessory" + n));
      }
      for (let n = 0; n < R().rs; n++) {
        q[F().Yr][n] = V.Ad(V.Md("back" + n));
      }
      q[F().Ho] = V.wd(V.bd("skull"), 45, 45);
      q[F().fn] = V.Ad(V.bd("rock"));
      q[F().Gn] = V.Ad(V.bd("cave_stone0"));
      q[F().Vn] = V.Ad(V.bd("cave_stone1"));
      q[F().jn] = V.Ad(V.bd("cave_stone2"));
      q[F().Fn] = V.Ad(V.bd("ice0"));
      q[F().Pn] = V.Ad(V.bd("ice1"));
      q[F().No] = V.Ad(V.bd("resource_background"));
      q[F().Go] = null;
      q[F().Vo] = null;
      q[F().jo] = null;
      q[F().hn] = V.Ad(V.bd("tree"));
      q[F().sr] = V.Ad(V.bd("palm_tree"));
      q[F().bi] = V.Ad(V.bd("cherry_tree"));
      q[F().dn] = V.Ad(V.bd("bush"));
      q[F().tn] = V.Ad(V.bd("gold"));
      q[F().Wn] = V.Ad(V.bd("ruby"));
      q[F().pn] = V.Ad(V.bd("lootbox"));
      q[F().Fo] = null;
      q[F().mn] = V.Ad(V.bd("bullet"));
      q[F().gn] = V.Ad(V.bd("wall"));
      q[F().Z] = V.Ad(V.bd("trap"));
      q[F().O] = V.Ad(V.bd("boost"));
      q[F().kn] = V.Ad(V.bd("spike"));
      q[F().wn] = V.Ad(V.bd("platform"));
      q[F().$] = V.Ad(V.bd("heal_pad"));
      q[F().Eo] = V.Ad(V.bd("wood"));
      q[F().Bo] = V.Ad(V.bd("leaf"));
      q[F().Do] = V.Ad(V.bd("stone"));
      q[F().Ro] = V.Ad(V.bd("particle_gold"));
      q[F().jd] = V.Ad(V.bd("particle_ruby"));
      q[F().Yo] = V.wd(V.bd("health-gauge-background"), 210, 40);
      q[F().qo] = V.wd(V.bd("health-gauge-front"), 210, 40);
      q[F().ht] = V.Ad(V.bd("stone_sword"));
      q[F().Ht] = V.Ad(V.yd("g_stick"));
      q[F().Nt] = V.Ad(V.yd("d_stick"));
      q[F().Gt] = V.Ad(V.yd("r_stick"));
      q[F().jt] = V.Ad(V.yd("g_cutspear"));
      q[F().Vt] = V.Ad(V.yd("d_cutspear"));
      q[F().ae] = V.Ad(V.yd("r_cutspear"));
      q[F().Ft] = V.Ad(V.yd("g_toolhammer"));
      q[F().Pt] = V.Ad(V.yd("d_toolhammer"));
      q[F().Rt] = V.Ad(V.yd("r_toolhammer"));
      q[F().Cr] = V.Ad(V.bd("inv_g_stick"));
      q[F().Vr] = V.Ad(V.bd("inv_d_stick"));
      q[F().jr] = V.Ad(V.bd("inv_r_stick"));
      q[F().Br] = V.Ad(V.bd("inv_g_cutspear"));
      q[F().Er] = V.Ad(V.bd("inv_d_cutspear"));
      q[F().zc] = V.Ad(V.bd("inv_r_cutspear"));
      q[F().Dr] = V.Ad(V.bd("inv_g_toolhammer"));
      q[F().zr] = V.Ad(V.bd("inv_d_toolhammer"));
      q[F().Ur] = V.Ad(V.bd("inv_r_toolhammer"));
      q[F().ue] = V.Ad(V.yd("g_sword"));
      q[F().fe] = V.Ad(V.yd("d_sword"));
      q[F().le] = V.Ad(V.yd("r_sword"));
      q[F().Sc] = V.Ad(V.bd("inv_g_sword"));
      q[F().Hc] = V.Ad(V.bd("inv_d_sword"));
      q[F().Nc] = V.Ad(V.bd("inv_r_sword"));
      q[F().xt] = V.Ad(V.yd("g_axe"));
      q[F().Lt] = V.Ad(V.yd("d_axe"));
      q[F().he] = V.Ad(V.yd("r_axe"));
      q[F().mr] = V.Ad(V.bd("inv_g_axe"));
      q[F().pr] = V.Ad(V.bd("inv_d_axe"));
      q[F().Vc] = V.Ad(V.bd("inv_r_axe"));
      q[F().Et] = V.Ad(V.yd("g_great_axe"));
      q[F().Ct] = V.Ad(V.yd("d_great_axe"));
      q[F().de] = V.Ad(V.yd("r_great_axe"));
      q[F().Tr] = V.Ad(V.bd("inv_g_great_axe"));
      q[F().vr] = V.Ad(V.bd("inv_d_great_axe"));
      q[F().Gc] = V.Ad(V.bd("inv_r_great_axe"));
      q[F().tc] = V.Ad(V.vd("indicator_enemy"));
      q[F().nc] = V.Ad(V.vd("indicator_friendly"));
      q[F().Dt] = V.Ad(V.yd("g_katana"));
      q[F().Bt] = V.Ad(V.yd("d_katana"));
      q[F().St] = V.Ad(V.yd("c_katana"));
      q[F().br] = V.Ad(V.bd("inv_g_katana"));
      q[F()._r] = V.Ad(V.bd("inv_d_katana"));
      q[F().Lr] = V.Ad(V.bd("inv_c_katana"));
      q[F().Ut] = V.Ad(V.yd("g_spear"));
      q[F().zt] = V.Ad(V.yd("d_spear"));
      q[F().se] = V.Ad(V.yd("r_spear"));
      q[F().Mr] = V.Ad(V.bd("inv_g_spear"));
      q[F().yr] = V.Ad(V.bd("inv_d_spear"));
      q[F().Uc] = V.Ad(V.bd("inv_r_spear"));
      q[F().It] = V.Ad(V.yd("meme"));
      q[F().jc] = V.Ad(V.bd("inv_meme"));
      q[F().Jt] = V.Ad(V.yd("scythe"));
      q[F().Fc] = V.Ad(V.bd("inv_scythe"));
      q[F().I] = V.Ad(V.yd("bat"));
      q[F().lt] = V.Ad(V.bd("stone_toolhammer"));
      q[F().dt] = V.Ad(V.bd("stone_spear"));
      q[F().P] = V.Ad(V.bd("s_musket"));
      q[F().Xo] = V.Ad(V.bd("stone_axe"));
      q[F().Rr] = V.Ad(V.bd("stone_axe"));
      q[F().At] = V.Ad(V.bd("great_axe"));
      q[F().vt] = V.Ad(V.bd("cookie"));
      q[F().Nn] = V.Ad(V.bd("chest"));
      q[F().wi] = V.Ad(V.bd("map"));
      q[F().W] = V.Ad(V.bd("shield"));
      q[F()._n] = V.Ad(V.bd("cow"));
      q[F().Hn] = V.Ad(V.bd("fireball"));
      q[F().Dn] = V.Ad(V.bd("gcow"));
      q[F().En] = V.Ad(V.bd("shark"));
      q[F().Bn] = V.Ad(V.bd("wolf"));
      q[F().Rn] = V.Ad(V.bd("duck"));
      q[F().Zn] = V.Ad(V.bd("crocodile"));
      q[F().qt] = V.Ad(V.yd("pearl"));
      q[F().gc] = V.Ad(V.bd("inv_pearl"));
      q[F().qn] = V.Ad(V.bd("teleporter"));
      q[F().kc] = V.Ad(V.bd("inv_teleporter"));
      q[F().On] = V.Ad(V.bd("ice_spike"));
      q[F().mc] = V.Ad(V.bd("inv_ice_spike"));
      q[F().wc] = V.Ad(V.yd("ice_spike"));
      q[F()._c] = V.Ad(V.bd("g_hammer"));
      q[F().bc] = V.Ad(V.bd("inv_g_hammer"));
      q[F().yc] = V.Ad(V.bd("d_hammer"));
      q[F().Mc] = V.Ad(V.bd("inv_d_hammer"));
      q[F().Tc] = V.Ad(V.bd("r_hammer"));
      q[F().Ac] = V.Ad(V.bd("inv_r_hammer"));
      q[F().Lc] = V.Ad(V.bd("g_bat"));
      q[F().xc] = V.Ad(V.bd("inv_g_bat"));
      q[F().Cc] = V.Ad(V.bd("d_bat"));
      q[F().Ec] = V.Ad(V.bd("inv_d_bat"));
      q[F().Bc] = V.Ad(V.bd("r_bat"));
      q[F().Dc] = V.Ad(V.bd("inv_r_bat"));
      q[F().Zr] = V.Ad(V.bd("inv_r_dagger"));
      q[F().Qr] = V.Ad(V.bd("r_dagger"));
      let K = [];
      q[F().Sn] = K;
      K[1] = [[V.Ad(V.bd("mammoth_tail")), new Y(-40, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 7, Math.PI / 7, 2000)], [V.Ad(V.bd("mammoth_body")), new Y(0, 0, 0, 0, 0, 0, 0, 0, 0, Math.PI / 20, -Math.PI / 20, 1600)], [V.Ad(V.bd("mammoth_head")), new Y(100, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 10, Math.PI / 10, 1000)]];
      K[0] = [[V.Ad(V.bd("mammoth_tail")), new Y(-40, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 7, Math.PI / 7, 2000)], [V.Ad(V.bd("mammoth_body")), new Y(0, 0, 0, 0, 0, 0, 0, 0, 0, Math.PI / 20, -Math.PI / 20, 1600)], [V.Ad(V.bd("mammoth_head_angry")), new Y(100, 0, 0, 0, 0, 0, 0, 0, 0, -Math.PI / 10, Math.PI / 10, 1000)]];
      q[F().Un] = [[V.Ad(V.bd("dragon_2_body")), new Y(-50, 0, 0, 2, -2, 1200, 0, 0, 0, Math.PI / 40, -Math.PI / 40, 1800)], [V.Ad(V.bd("dragon_2_left_wing")), new Y(10, -40, Math.PI / 5, 0, 0, 0, 0, 0, 0, -Math.PI / 5, 0, 1600)], [V.Ad(V.bd("dragon_2_right_wing")), new Y(10, 40, -Math.PI / 5, 0, 0, 0, 0, 0, 0, Math.PI / 5, 0, 1600)], [V.Ad(V.bd("dragon_2_head")), new Y(50, 0, 0, -3, 3, 1000, 0, 0, 0, -Math.PI / 40, Math.PI / 40, 1400)]];
      q[F().Ci] = V.Ad(V.bd("turret_base"));
      q[F().xi] = V.Ad(V.bd("turret_top"));
      q[F().Li] = V.Ad(V.bd("turret_assembled"));
      q[F().ln] = V.Ad(V.bd("hard_spike"));
      q[F().R] = V.Ad(V.bd("bow"));
      q[F().Hi] = V.Ad(V.bd("arrow"));
      q[F().An] = V.Ad(V.bd("wood_farm"));
      q[F().Ln] = V.Ad(V.bd("wood_farm_cherry"));
      q[F().xn] = V.Ad(V.bd("stone_farm"));
      q[F().yt] = V.Ad(V.bd("bush"));
      q[F().Pr] = V.Ad(V.vd("currency"));
      q[F().oi] = V.Ad(V.bd("hat_1"));
      q[F().ri] = V.Ad(V.bd("hat_2"));
      q[F().ci] = V.Ad(V.bd("hat_3"));
      q[F().si] = V.Ad(V.bd("hat_4"));
      q[F().ui] = V.Ad(V.bd("hat_5"));
      q[F().fi] = V.Ad(V.bd("hat_6"));
      q[F().Yn] = V.Ad(V.bd("cactus"));
      q[F().Kn] = V.Ad(V.bd("tornado"));
      q[F().ji] = V.Ad(V.bd("hat_7"));
      q[F().hr] = V.Ad(V.bd("hat_8"));
      q[F().gr] = V.Ad(V.bd("hat_9"));
      q[F().qr] = V.Ad(V.bd("hat_10"));
      q[F().$r] = V.Ad(V.bd("hat_11"));
      q[F().vc] = V.Ad(V.bd("hat_14"));
      q[F().wt] = V.Ad(V.bd("apple"));
      q[F().q] = V.Ad(V.bd("stick"));
      q[F().Mn] = V.Ad(V.bd("big_spike"));
      q[F().Ni] = V.Ad(V.bd("map_cross"));
      q[F().bt] = V.Ad(V.bd("katana"));
      q[F().Mt] = V.Ad(V.bd("Xbow"));
      q[F().Yi] = V.Ad(V.bd("map_dot"));
      q[F().ec] = V.Ad(V.bd("our_dot"));
      q[F().bn] = V.Ad(V.bd("bed"));
      q[F().Cn] = V.Ad(V.bd("castle_wall"));
      q[F().Tt] = V.Ad(V.bd("cut_spear"));
      q[F().Vi] = V.Ad(V.bd("team_crown"));
      q[F().Ar] = null;
      q[F().Ti] = V.Ad(V.bd("skid_hat"));
      q[F()._t] = V.Ad(V.bd("hammer"));
      q[F().hi] = null;
      q[F().ei] = V.Ad(V.bd("toggle-button-out1"));
      q[F().Ri] = V.Ad(V.bd("clan_button_out"));
      q[F().Fi] = V.Ad(V.bd("hat_button_out"));
      q[F().Pi] = V.Ad(V.bd("close_button_out"));
      q[F().qi] = V.Ad(V.bd("chat_button_out"));
      q[F().Ki] = V.Ad(V.bd("inv_cut_spear"));
      q[F().Wo] = V.Ad(V.bd("inv_stone_toolhammer"));
      q[F().Ko] = V.Ad(V.bd("inv_stone_sword"));
      q[F().Kr] = V.Ad(V.bd("inv_s_dagger"));
      q[F().Ir] = V.Ad(V.bd("s_dagger"));
      q[F().Wr] = V.Ad(V.bd("inv_g_dagger"));
      q[F().Jr] = V.Ad(V.yd("g_dagger"));
      q[F().Or] = V.Ad(V.bd("inv_d_dagger"));
      q[F().Xr] = V.Ad(V.yd("d_dagger"));
      q[F().uc] = V.Ad(V.bd("inv_c_dagger"));
      q[F().sc] = V.Ad(V.yd("c_dagger"));
      q[F().oc] = V.Ad(V.bd("inv_s_healing_staff"));
      q[F().fc] = V.Ad(V.bd("s_healing_staff"));
      q[F().ic] = V.Ad(V.bd("inv_g_healing_staff"));
      q[F().lc] = V.Ad(V.yd("g_healing_staff"));
      q[F().rc] = V.Ad(V.bd("inv_d_healing_staff"));
      q[F().hc] = V.Ad(V.yd("d_healing_staff"));
      q[F().cc] = V.Ad(V.bd("inv_r_healing_staff"));
      q[F().dc] = V.Ad(V.yd("r_healing_staff"));
      q[F().Zo] = V.Ad(V.bd("inv_stone_spear"));
      q[F().Io] = V.Ad(V.bd("inv_stone_axe"));
      q[F().ar] = V.Ad(V.bd("inv_great_axe"));
      q[F().li] = V.Ad(V.bd("inv_cookie"));
      q[F().Oo] = V.Ad(V.bd("inv_musket"));
      q[F().Jo] = V.Ad(V.bd("inv_wood_wall"));
      q[F().Wi] = V.Ad(V.bd("inv_castle_wall"));
      q[F().$o] = V.Ad(V.bd("inv_spike"));
      q[F().Qo] = V.Ad(V.bd("inv_boost"));
      q[F().ni] = V.Ad(V.bd("inv_platform"));
      q[F().ti] = V.Ad(V.bd("inv_trap"));
      q[F().ac] = V.Ad(V.bd("inv_heal_pad"));
      q[F().ii] = V.Ad(V.bd("inv_apple"));
      q[F().ai] = V.Ad(V.bd("inv_stone_shield"));
      q[F().wr] = V.Ad(V.bd("inv_bat"));
      q[F().gi] = V.Ad(V.bd("inv_windmill"));
      q[F().ki] = V.Ad(V.bd("windmill_top"));
      q[F().pi] = V.Ad(V.bd("windmill_base"));
      q[F().mi] = V.Ad(V.bd("windmill_assembled"));
      q[F().di] = V.Ad(V.bd("inv_stick"));
      q[F().vi] = V.Ad(V.bd("inv_hammer"));
      q[F()._i] = V.Ad(V.bd("inv_bed"));
      q[F().yi] = V.Ad(V.bd("inv_katana"));
      q[F().Mi] = V.Ad(V.bd("inv_big_spike"));
      q[F().Ai] = V.Ad(V.bd("inv_hard_spike"));
      q[F().Ei] = V.Ad(V.bd("inv_turret"));
      q[F().Di] = V.Ad(V.bd("inv_wood_farm"));
      q[F().Bi] = V.Ad(V.bd("inv_wood_farm_cherry"));
      q[F().zi] = V.Ad(V.bd("inv_stone_farm"));
      q[F().Ui] = V.Ad(V.bd("inv_bush"));
      q[F().Si] = V.Ad(V.bd("inv_bow"));
      q[F().Gi] = V.Ad(V.bd("inv_xbow"));
      q[F().Oi] = V.Ad(V.yd("wall"));
      q[F().Zi] = V.Ad(V.yd("spike"));
      q[F().Ii] = V.Ad(V.yd("castle_wall"));
      q[F().Ji] = V.Ad(V.yd("boost"));
      q[F().Xi] = V.Ad(V.yd("trap"));
      q[F().Fd] = V.Ad(V.yd("heal_pad"));
      q[F().Qi] = V.Ad(V.yd("stone_farm"));
      q[F().$i] = V.Ad(V.yd("berry_farm"));
      q[F().nr] = V.Ad(V.yd("wood_farm_cherry"));
      q[F().tr] = V.Ad(V.yd("wood_farm"));
      q[F().er] = V.Ad(V.yd("hard_spike"));
      q[F().ir] = V.Ad(V.yd("castle_spike"));
      q[F().rr] = V.Ad(V.yd("platform"));
      q[F().cr] = V.Ad(V.yd("bed"));
      q[F().zn] = V.Ad(V.bd("roof"));
      q[F().Fr] = V.Ad(V.bd("inv_roof"));
      q[F().Nr] = V.Ad(V.bd("clan_accept"));
      q[F().Gr] = V.Ad(V.bd("clan_decline"));
      var W = q;
      var O = o(9299);
      var Z = o.n(O);
      var I = o(1624);
      var J = o.n(I);
      var X = o(3287);
      var Q = o.n(X);
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
        const t = N.default.Pd();
        if (an !== null && rn === t) {
          return an;
        }
        const e = parseFloat(N.default.Rd("shadow_offset_x"));
        const o = parseFloat(N.default.Rd("shadow_offset_y"));
        const r = parseFloat(N.default.Rd("shadow_darkness"));
        const c = parseFloat(N.default.Rd("shadow_blur"));
        const a = N.default.Rd("shadow_color");
        an = {
          qd: isFinite(e) ? e : 10,
          Yd: isFinite(o) ? o : 7,
          Kd: isFinite(r) && r > 0 && r <= 1 ? r : 0.35,
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
      const hn = {
        Wd: function (n, t, e, o, r, c) {
          if (cn) {
            return;
          }
          if (!t) {
            return;
          }
          if (t.Od !== undefined && t.Od !== en().ut) {
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
          n.setTransform(f.a, f.b, f.c, f.d, f.e + u.qd * sn, f.f + u.Yd * sn);
          if (u.blur > 0) {
            n.filter = "blur(" + u.blur + "px)";
          }
          n.globalAlpha = u.Kd;
          n.drawImage(s, e, o, r, c);
          n.restore();
        },
        Zd: function (n) {
          cn = !!n;
        },
        Id: function () {
          an = null;
          rn = undefined;
        },
        Jd: function (n) {
          sn = isFinite(n) && n >= 0 ? n : 1;
        }
      };
      var dn = hn;
      let kn = null;
      function gn() {
        if (kn === null) {
          try {
            kn = o(8557) || false;
          } catch (n) {
            kn = false;
          }
        }
        const n = kn && kn.Ss;
        return typeof n == "function" && n();
      }
      function wn(n, t) {
        let o;
        let r = Date.now();
        let c = 0;
        o = m[s().En];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().En, n, t);
        }
        o = m[s().Zn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().Zn, n, t);
        }
        o = m[s().wn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().wn, n, t);
        }
        o = m[s().O];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().O, n, t);
        }
        o = m[s().qn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().qn, n, t);
        }
        o = m[s().bn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().bn, n, t);
        }
        o = m[s().Z];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Z, n, t);
        }
        o = m[s().$];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().$, n, t);
        }
        o = m[s().pn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().pn, n, t);
        }
        o = m[s().xn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().xn, n, t);
        }
        o = m[s().fn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().fn, n, t);
        }
        o = m[s().Fn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Fn, n, t);
        }
        o = m[s().Pn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Pn, n, t);
        }
        o = m[s().Gn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Gn, n, t);
        }
        o = m[s().Vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Vn, n, t);
        }
        o = m[s().jn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().jn, n, t);
        }
        o = m[s().tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().tn, n, t);
        }
        o = m[s().Wn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Wn, n, t);
        }
        o = m[s().mn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          if (!(o[t].zs & h().Oc)) {
            An(o[t], o[t].Sh, F().Fo, n);
          }
        }
        o = m[s().Rn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().Rn, n, t);
        }
        o = m[s().un];
        c = o.length;
        for (let e = 0; e < c; e++) {
          if (!(o[e].zs & h().Oc)) {
            xn(o[e], n, t);
          }
        }
        o = m[s().Bn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().Bn, n, t);
        }
        o = m[s().Hn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().Hn, n, t);
        }
        o = m[s()._n];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F()._n, n, t);
        }
        o = m[s().Dn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().Dn, n, t);
        }
        o = m[s().Sn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          const e = o[t];
          Mn(e, F().Sn, n, r - e.Rh, e.zs & h().Zc ? 0 : 1);
        }
        o = m[s().kn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().kn, n, t);
        }
        o = m[s().ln];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().ln, n, t);
        }
        o = m[s().On];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().On, n, t);
        }
        o = m[s().Nn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Nn, n, t);
        }
        o = m[s().gn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().gn, n, t);
        }
        o = m[s().Cn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Cn, n, t);
        }
        o = m[s().Tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Ci, n, t);
        }
        o = m[s().Tn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().xi, n, t);
        }
        o = m[s().Mn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Mn, n, t);
        }
        o = m[s().vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().pi, n, t);
        }
        o = m[s().yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().pi, n, t);
        }
        o = m[s().dn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().dn, n, t);
        }
        o = m[s().Yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().Yn, n, t);
        }
        o = m[s().Un];
        c = o.length;
        for (let t = 0; t < c; t++) {
          const e = o[t];
          Mn(e, F().Un, n, r - e.Rh);
        }
        o = m[s().An];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          Ln(e, F().An, n, t);
        }
        o = m[s().Ln];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          Ln(e, F().Ln, n, t);
        }
        o = m[s().hn];
        c = o.length;
        for (let e, i = 0; i < c; i++) {
          e = o[i];
          Ln(e, e.kh === nn().U ? F().hn : e.kh === nn().S ? F().bi : e.kh === nn().H ? F().sr : F().Rr, n, t);
        }
        o = m[s().un];
        c = o.length;
        for (let e = 0; e < c; e++) {
          if (o[e].zs & h().Oc) {
            xn(o[e], n, t);
          }
        }
        o = m[s().zn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().zn, n, t);
        }
        o = m[s().Kn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Tn(o[e], F().Kn, n, t);
        }
        o = m[s().vn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().ki, n, t);
        }
        o = m[s().yn];
        c = o.length;
        for (let e = 0; e < c; e++) {
          Ln(o[e], F().ki, n, t);
        }
        o = m[s().mn];
        c = o.length;
        for (let t = 0; t < c; t++) {
          if (o[t].zs & h().Oc) {
            An(o[t], o[t].Sh, F().Fo, n);
          }
        }
      }
      let pn = false;
      function mn(n) {
        pn = !!n;
      }
      function vn(n) {
        if (!pn) {
          return;
        }
        const e = N.default.Rd("collision_color") || "#ff3b3b";
        const o = parseFloat(N.default.Rd("collision_width"));
        const r = isFinite(o) && o > 0 ? o : 3;
        const c = N.default.Rd("collision_opacity");
        const a = c === null || c === "" || c === undefined ? 0.6 : parseFloat(c) || 0;
        n.save();
        n.globalAlpha = a;
        n.strokeStyle = e;
        n.lineWidth = r;
        for (let e = 0; e < m.length; e++) {
          const o = m[e];
          if (!o || !o.length) {
            continue;
          }
          const i = Q()[e];
          const r = i && i.Xd;
          if (r) {
            for (let e = 0; e < o.length; e++) {
              const i = o[e];
              n.beginPath();
              n.arc(i.mh, i.bh, r, 0, Math.PI * 2);
              n.stroke();
            }
          }
        }
        n.restore();
      }
      function _n(n, t) {
        const e = W[n.Vh];
        if (!e || !e.Qd) {
          return;
        }
        t.save();
        t.translate(n.mh, n.bh);
        const o = n.Fh.value;
        const i = n._h - o;
        t.rotate(i);
        if (n.$d) {
          t.globalAlpha = 0.5;
        }
        k().nk(t, e, -e.Qd.tk / 2, -e.Qd.ek / 2, e.Qd.tk, e.Qd.ek);
        t.restore();
      }
      function bn(n, t, e) {
        const r = W[F().qo];
        const c = W[F().Yo];
        const a = Q()[n.type].Xd + 50;
        const s = 0.5;
        t.fillStyle = e ? N.default.Rd("healthbar_player_color") || "#a4cc4f" : N.default.Rd("healthbar_enemy_color") || "#cc5151";
        t.drawImage(c, n.mh - s * c.width / 2, n.bh - s * c.height + a, s * c.width, s * c.height);
        let u = s * r.width;
        let f = n.ph / 255 * (u - 10);
        const l = n.mh - u / 2 + 5;
        const h = n.bh - s * r.height + a + 5;
        const d = s * r.height - 10;
        const k = N.default.Rd("healthbar_bg_color");
        if (k) {
          const n = t.fillStyle;
          t.fillStyle = k;
          t.fillRect(l, h, u - 10, d);
          t.fillStyle = n;
        }
        t.fillRect(l, h, f, d);
        t.drawImage(r, n.mh - s * r.width / 2, n.bh - s * r.height + a, s * r.width, s * r.height);
      }
      function yn(n, t, e, o) {
        let c = 0;
        if (t.zd !== 0) {
          let n = o % t.zd / t.zd;
          if (Math.floor(o / t.zd) % 2 == 0) {
            n = 1 - n;
          }
          c = t.Bd + n * (t.Dd - t.Bd);
        }
        let a = 0;
        if (t.Hd !== 0) {
          let n = o % t.Hd / t.Hd;
          if (Math.floor(o / t.Hd) % 2 == 0) {
            n = 1 - n;
          }
          a = t.Ud + n * (t.Sd - t.Ud);
        }
        if (t.xd !== 0 || t.Cd !== 0 || c !== 0 || a !== 0) {
          c += t.xd;
          a += t.Cd;
          e.translate(c, a);
        }
        let s = 0;
        if (t.Vd !== 0) {
          let n = o % t.Vd / t.Vd;
          if (Math.floor(o / t.Vd) % 2 == 0) {
            n = 1 - n;
          }
          s = t.Nd + n * (t.Gd - t.Nd);
        }
        if (t.Ed || s !== 0) {
          s += t.Ed;
          e.rotate(s);
        }
        k().nk(e, n, -n.Qd.tk / 2, -n.Qd.ek / 2, n.Qd.tk, n.Qd.ek);
        if (s !== 0) {
          e.rotate(-s);
        }
        if (c !== 0 || a !== 0) {
          e.translate(-c, -a);
        }
      }
      function Mn(n, t, e, o, r = -1) {
        let a;
        a = r !== -1 ? W[t][r] : W[t];
        e.save();
        e.translate(n.mh, n.bh);
        e.rotate(n._h);
        const s = a.length;
        for (let n = 0; n < s; n++) {
          const t = a[n];
          yn(t[0], t[1], e, o);
        }
        e.restore();
      }
      function Tn(n, t, e, o) {
        const c = W[t];
        e.save();
        if (n.Oh) {
          n._h += n.Oh * o;
        }
        e.translate(n.mh, n.bh);
        e.rotate(n._h);
        if (gn()) {
          dn.Wd(e, c.Qd, -c.Qd.tk / 2, -c.Qd.ek / 2, c.Qd.tk, c.Qd.ek);
        }
        k().nk(e, c, -c.Qd.tk / 2, -c.Qd.ek / 2, c.Qd.tk, c.Qd.ek);
        e.restore();
      }
      function An(n, t, e, o, r) {
        if (!n.active) {
          return;
        }
        const a = W[t];
        W[e];
        n.range;
        o.save();
        o.translate(n.mh, n.bh);
        o.rotate(n._h);
        k().nk(o, a, -a.Qd.tk / 2, -a.Qd.ek / 2, a.Qd.tk, a.Qd.ek);
        o.restore();
      }
      function Ln(n, t, e, o) {
        let i = 0;
        let r = 0;
        let c = 0;
        if (n.Fh.value) {
          n.Fh.Ja(o);
          c = n.Fh.value;
        } else if (n.qh.active && !n.Fh.value) {
          n.Fh.Ja(o);
          n.qh.active = false;
          c = n.Fh.value;
        }
        if (c) {
          i = Math.cos(n.qh.Kh) * 10 * c;
          r = Math.sin(n.qh.Kh) * 10 * c;
        }
        if (n.Oh) {
          n._h += n.Oh * o;
        }
        const a = t !== F().pi ? n._h : 0;
        e.save();
        e.translate(n.mh + i, n.bh + r);
        e.rotate(a);
        const s = W[t];
        if (gn()) {
          dn.Wd(e, s.Qd, -s.Qd.tk / 2, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
        }
        k().nk(e, s, -s.Qd.tk / 2, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
        e.restore();
      }
      function xn(n, t, e) {
        if (n.Vh && !n.$d) {
          return;
        }
        const r = Z()[n.kh];
        t.save();
        t.translate(n.mh, n.bh);
        if (n.Fh.value) {
          n.Fh.Ja(e);
        }
        const c = n.gh ? J()[n.gh] : null;
        const a = c ? c.qd : 0;
        const s = n.zs & h().Zc ? W[F().Ti] : c ? W[c.ik] : null;
        const u = 70;
        const f = W[r.ik];
        const l = n.Sh || 0;
        const d = W[F().Uo][l];
        const g = W[F().So][l];
        const w = n.Hh || 0;
        const p = W[F().Sr][w];
        const m = n.Gh || 0;
        const v = W[F().Yr][m];
        const _ = n.Fh.value;
        const b = n._h - _;
        if (!(n.zs & h().Pc)) {
          const e = gn();
          if (e) {
            dn.Wd(t, d.Qd, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
            dn.Zd(true);
          }
          try {
            switch (r.rk) {
              case 0:
                t.rotate(b);
                if (e) {
                  dn.Wd(t, f.Qd, 29 - f.Qd.tk / 2 + r.qd, -48 + r.Yd, f.Qd.tk, f.Qd.ek);
                }
                k().nk(t, f, 29 - f.Qd.tk / 2 + r.qd, -48 + r.Yd, f.Qd.tk, f.Qd.ek);
                if (!c || c.ik !== F().$i) {
                  if (m !== 0) {
                    if (e) {
                      dn.Wd(t, v.Qd, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                    }
                    k().nk(t, v, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                  }
                  if (e) {
                    dn.Wd(t, g.Qd, u / 3 - g.Qd.tk / 2, u / 3 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, u / 3 - g.Qd.tk / 2, u / 3 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  t.save();
                  t.translate(u / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.Qd.tk / 2, -g.Qd.ek / 2);
                  if (e) {
                    dn.Wd(t, g.Qd, 0, 0, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, 0, 0, g.Qd.tk, g.Qd.ek);
                  t.restore();
                  if (e) {
                    dn.Wd(t, d.Qd, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  }
                  k().nk(t, d, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  if (w !== 0) {
                    if (e) {
                      dn.Wd(t, p.Qd, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                    }
                    k().nk(t, p, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                  }
                }
                if (s) {
                  if (e) {
                    dn.Wd(t, s.Qd, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                  }
                  k().nk(t, s, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                }
                break;
              case 1:
                t.rotate(n._h);
                if (e) {
                  dn.Wd(t, f.Qd, u / (0.9 + _ * 0.05) - f.Qd.tk / 2 - r.qd, -f.Qd.ek / 2 + r.Yd, f.Qd.tk, f.Qd.ek);
                }
                k().nk(t, f, u / (0.9 + _ * 0.05) - f.Qd.tk / 2 - r.qd, -f.Qd.ek / 2 + r.Yd, f.Qd.tk, f.Qd.ek);
                if (!c || c.ik !== F().$i) {
                  if (m !== 0) {
                    if (e) {
                      dn.Wd(t, v.Qd, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                    }
                    k().nk(t, v, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                  }
                  if (e) {
                    dn.Wd(t, g.Qd, u / (2.3 + _ * 0.1) - g.Qd.tk / 2, 17.5 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, u / (2.3 + _ * 0.1) - g.Qd.tk / 2, 17.5 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  t.save();
                  t.translate(u / (1.3 - _ * 0.15), -17.5);
                  t.scale(1, -1);
                  t.translate(-g.Qd.tk / 2, -g.Qd.ek / 2);
                  if (e) {
                    dn.Wd(t, g.Qd, 0, 0, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, 0, 0, g.Qd.tk, g.Qd.ek);
                  t.restore();
                  if (e) {
                    dn.Wd(t, d.Qd, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  }
                  k().nk(t, d, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  if (w !== 0) {
                    if (e) {
                      dn.Wd(t, p.Qd, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                    }
                    k().nk(t, p, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                  }
                }
                if (s) {
                  if (e) {
                    dn.Wd(t, s.Qd, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                  }
                  k().nk(t, s, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                }
                break;
              case 2:
                t.rotate(b);
                if (e) {
                  dn.Wd(t, f.Qd, 35 - r.qd, -f.Qd.ek / 2 + r.Yd, f.Qd.tk, f.Qd.ek);
                }
                k().nk(t, f, 35 - r.qd, -f.Qd.ek / 2 + r.Yd, f.Qd.tk, f.Qd.ek);
                if (!c || c.ik !== F().$i) {
                  if (m !== 0) {
                    if (e) {
                      dn.Wd(t, v.Qd, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                    }
                    k().nk(t, v, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                  }
                  if (e) {
                    dn.Wd(t, g.Qd, u / 3 - g.Qd.tk / 2, u / 3 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, u / 3 - g.Qd.tk / 2, u / 3 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  t.save();
                  t.translate(u / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.Qd.tk / 2, -g.Qd.ek / 2);
                  if (e) {
                    dn.Wd(t, g.Qd, 0, 0, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, 0, 0, g.Qd.tk, g.Qd.ek);
                  t.restore();
                  if (e) {
                    dn.Wd(t, d.Qd, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  }
                  k().nk(t, d, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  if (w !== 0) {
                    if (e) {
                      dn.Wd(t, p.Qd, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                    }
                    k().nk(t, p, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                  }
                }
                if (s) {
                  if (e) {
                    dn.Wd(t, s.Qd, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                  }
                  k().nk(t, s, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                }
                break;
              case 3:
                t.rotate(n._h);
                let i = _ * 7;
                if (e) {
                  dn.Wd(t, f.Qd, 29 - f.Qd.tk / 2 + r.qd + i, -48 + r.Yd, f.Qd.tk, f.Qd.ek);
                }
                k().nk(t, f, 29 - f.Qd.tk / 2 + r.qd + i, -48 + r.Yd, f.Qd.tk, f.Qd.ek);
                if (!c || c.ik !== F().$i) {
                  if (m !== 0) {
                    if (e) {
                      dn.Wd(t, v.Qd, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                    }
                    k().nk(t, v, -v.Qd.tk / 2, -v.Qd.ek / 2, v.Qd.tk, v.Qd.ek);
                  }
                  if (e) {
                    dn.Wd(t, g.Qd, u / 3 - g.Qd.tk / 2 + i, u / 3 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, u / 3 - g.Qd.tk / 2 + i, u / 3 - g.Qd.ek / 2, g.Qd.tk, g.Qd.ek);
                  t.save();
                  t.translate(u / 3, -70 / 3);
                  t.scale(1, -1);
                  t.translate(-g.Qd.tk / 2, -g.Qd.ek / 2);
                  if (e) {
                    dn.Wd(t, g.Qd, 0, 0, g.Qd.tk, g.Qd.ek);
                  }
                  k().nk(t, g, 0, 0, g.Qd.tk, g.Qd.ek);
                  t.restore();
                  if (e) {
                    dn.Wd(t, d.Qd, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  }
                  k().nk(t, d, -d.Qd.tk / 2, -d.Qd.ek / 2, d.Qd.tk, d.Qd.ek);
                  if (w !== 0) {
                    if (e) {
                      dn.Wd(t, p.Qd, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                    }
                    k().nk(t, p, -p.Qd.tk / 2, -p.Qd.ek / 2, p.Qd.tk, p.Qd.ek);
                  }
                }
                if (s) {
                  if (e) {
                    dn.Wd(t, s.Qd, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                  }
                  k().nk(t, s, -s.Qd.tk / 2 - a, -s.Qd.ek / 2, s.Qd.tk, s.Qd.ek);
                }
            }
          } finally {
            dn.Zd(false);
          }
        }
        t.restore();
      }
      function Cn() {
        try {
          localStorage.setItem(tt, JSON.stringify(et));
        } catch (n) {}
      }
      document.getElementById("reset-keybinds").addEventListener("click", function (n) {
        Object.assign(et, nt);
        Cn();
        at();
      });
      let En = 0;
      const Bn = En++;
      const Dn = En++;
      const zn = En++;
      const Un = En++;
      const Sn = En++;
      const Hn = En++;
      const Nn = En++;
      const Gn = En++;
      const Vn = En++;
      const jn = En++;
      const Fn = En++;
      const Pn = En++;
      const Rn = En++;
      const qn = En++;
      const Yn = En++;
      const Kn = En++;
      const Wn = En++;
      const On = En++;
      const Zn = En++;
      const In = En++;
      const Jn = En++;
      const Xn = En++;
      const Qn = En++;
      const $n = En++;
      const nt = Object.freeze({
        [Bn]: "KeyW",
        [Dn]: "KeyS",
        [zn]: "KeyD",
        [Un]: "KeyA",
        [Sn]: "KeyF",
        [Hn]: "KeyQ",
        [Nn]: "Space",
        [Gn]: "KeyR",
        [Vn]: "KeyR",
        [jn]: "KeyG",
        [Fn]: "KeyT",
        [Pn]: "KeyN",
        [Rn]: "KeyX",
        [qn]: "KeyE",
        [Yn]: "ArrowUp",
        [Kn]: "ArrowRight",
        [Wn]: "ArrowDown",
        [On]: "ArrowLeft",
        [Zn]: "Escape",
        [In]: "Enter",
        [Jn]: "KeyL",
        [Xn]: "KeyC",
        [Qn]: "KeyB",
        [$n]: "KeyP"
      });
      const tt = "keybinds";
      const et = function () {
        var t = undefined;
        try {
          t = localStorage.getItem(tt);
        } catch (n) {}
        if (!t) {
          return Object.assign({}, nt);
        }
        try {
          let e = Object.assign(Object.assign({}, nt), JSON.parse(t));
          if (e[Hn] === "Space") {
            e[Hn] = nt[Hn];
          }
          if (e[Sn] === "Space") {
            e[Sn] = nt[Sn];
          }
          if (e[Gn] === "Space") {
            e[Gn] = nt[Gn];
          }
          if (e[Vn] === "Space") {
            e[Vn] = nt[Vn];
          }
          if (e[jn] === "Space") {
            e[jn] = nt[jn];
          }
          if (e[Fn] === "Space") {
            e[Fn] = nt[Fn];
          }
          if (e[Pn] === "Space") {
            e[Pn] = nt[Pn];
          }
          return e;
        } catch {
          return Object.assign({}, nt);
        }
      }();
      at();
      const ot = Array.from(document.getElementsByClassName("keybind-setting"));
      function it(n) {
        return atob(btoa(n));
      }
      let rt = null;
      function ct(n) {
        if (n.startsWith("Key")) {
          return n.slice(3);
        } else if (n.startsWith("Digit") || n.startsWith("Arrow")) {
          return n.slice(5);
        } else {
          return n;
        }
      }
      function at() {
        document.getElementById("for-spike").innerText = ct(et[Gn]);
        document.getElementById("for-trap").innerText = ct(et[Sn]);
        document.getElementById("for-food").innerText = ct(et[Hn]);
        document.getElementById("for-shop").innerText = ct(et[Xn]);
        document.getElementById("for-clan").innerText = ct(et[Qn]);
        document.getElementById("for-windmill").innerText = ct(et[jn]);
        document.getElementById("for-platform").innerText = ct(et[Fn]);
        document.getElementById("for-bed").innerText = ct(et[Pn]);
        const t = document.getElementById("for-pack-builder");
        if (t) {
          t.innerText = ct(et[$n]);
        }
      }
      ot.forEach(n => n.addEventListener("click", function () {
        rt = n[it("id")];
        document.getElementById(rt).innerText = "PRESS";
      }));
      window.addEventListener("keydown", function (n) {
        if (!rt) {
          return;
        }
        n.preventDefault();
        const e = n.code;
        if (e !== "Space") {
          switch (rt) {
            case "for-spike":
              et[Gn] = e;
              break;
            case "for-trap":
              et[Sn] = e;
              break;
            case "for-food":
              et[Hn] = e;
              break;
            case "for-windmill":
              et[jn] = e;
              break;
            case "for-platform":
              et[Fn] = e;
              break;
            case "for-bed":
              et[Pn] = e;
              break;
            case "for-shop":
              et[Xn] = e;
              break;
            case "for-clan":
              et[Qn] = e;
              break;
            case "for-pack-builder":
              et[$n] = e;
              break;
            default:
              throw Error("Unknown key type");
          }
          Cn();
          at();
          rt = null;
        }
      });
      let st = false;
      let ut = {
        Qa: -1,
        ck: 0,
        ak: 0,
        sk: 0,
        uk: 0
      };
      let ft = {
        Qa: -1,
        ck: 0,
        ak: 0,
        sk: 0,
        uk: 0
      };
      let lt = 0;
      let ht = 0;
      let dt = {};
      let kt = 0;
      let gt = false;
      let wt = 0;
      let pt = 0;
      let mt = 0;
      let vt = false;
      function _t(n) {
        const e = n.code;
        if ((Uo || So || Ho) && e === et[Zn] && !dt[e]) {
          if (Uo) {
            Pi(false);
          }
          if (Ho) {
            Ri(false);
          }
          if (So) {
            br(false);
          }
        }
        if (document.activeElement.type !== "text") {
          if (!Uo && !dt[e] && e === et[In]) {
            if (Ho) {
              Ri(false);
            }
            if (So) {
              br(false);
            }
            Pi(true);
            n.preventDefault();
            return;
          }
          if (!Uo) {
            if (n.code === et[Rn] && !dt[e]) {
              sr(!Do);
            }
            if (e === et[qn] && !dt[e]) {
              ur(!Bo);
              Bc(Bo);
            }
          }
          if (e === et[Hn] && !dt[e]) {
            Nc(2);
          }
          if (e === et[Sn] && !dt[e]) {
            Nc(7);
            Nc(10);
            Nc(11);
          }
          if (e === et[Gn] && !dt[e] || e === et[Vn] && !dt[e]) {
            Nc(4);
          }
          if (e === et[jn] && !dt[e]) {
            Nc(5);
          }
          if (e === et[Fn] && !dt[e]) {
            Nc(8);
          }
          if (e === et[Pn] && !dt[e]) {
            Nc(9);
          }
          if (e !== "Space" && !isNaN(Number(n.key)) && !dt[e]) {
            if (Number(n.key) - 1 >= 0) {
              Gc(ro.fk[Number(n.key) - 1]);
            }
          }
          if (e === et[Nn] && !dt[e]) {
            zc(Fi());
          }
          if (e === et[Bn] || e === et[Yn]) {
            lt |= 1;
          }
          if (e === et[zn] || e === et[Kn]) {
            lt |= 8;
          }
          if (e === et[Jn] && Ao) {
            Sc(Ao);
          }
          if (e === et[Un] || e === et[On]) {
            lt |= 4;
          }
          if (e === et[Dn] || e === et[Wn]) {
            lt |= 2;
          }
          dt[e] = true;
        }
      }
      function bt(n) {
        const t = n.code;
        if (t === et[Nn]) {
          Uc();
        }
        if (t === et[zn] || t === et[Kn]) {
          lt &= -9;
        }
        if (t === et[Bn] || t === et[Yn]) {
          lt &= -2;
        }
        if (t === et[Un] || t === et[On]) {
          lt &= -5;
        }
        if (t === et[Dn] || t === et[Wn]) {
          lt &= -3;
        }
        if (t === et[Jn]) {
          gt = false;
        }
        if (t === et[Xn] && !Uo) {
          if (Ho) {
            Ri(false);
          }
          Pi(false);
          br(!So);
        }
        if (t === et[Qn] && !Uo) {
          if (So) {
            br(false);
          }
          Pi(false);
          Ri(!Ho);
        }
        if (t === et[$n] && !Uo) {
          Oi();
        }
        if (t === et[Zn] && Lr()) {
          or(true);
        }
        dt[t] = false;
      }
      function yt(n) {
        st = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          Ii(e.pageX, e.pageY);
          if ($i(mo, vo)) {
            break;
          }
          if (e.pageX < document.body.scrollWidth / 2 && ut.Qa === -1) {
            ut.Qa = e.identifier;
            ut.ck = ut.sk = e.pageX;
            ut.ak = ut.uk = e.pageY;
          } else if (e.pageX > document.body.scrollWidth / 2 && ft.Qa === -1) {
            ft.Qa = e.identifier;
            ft.ck = ft.sk = e.pageX;
            ft.ak = ft.uk = e.pageY;
          }
        }
      }
      function Mt(n) {
        st = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          if (e.identifier === ut.Qa) {
            ut.sk = e.pageX;
            ut.uk = e.pageY;
          } else if (e.identifier === ft.Qa) {
            ft.sk = e.pageX;
            ft.uk = e.pageY;
          }
        }
      }
      function Tt(n) {
        st = true;
        n.preventDefault();
        n.stopPropagation();
        for (let e of n.changedTouches) {
          Ii(e.pageX, e.pageY);
          if (nr(mo, vo)) {
            break;
          }
          if (e.identifier === ut.Qa) {
            ut.Qa = -1;
          } else if (e.identifier === ft.Qa) {
            ft.Qa = -1;
          }
        }
      }
      function At(n) {
        Rc(n);
        ht = n;
        mt = 0;
      }
      function Lt(n) {
        vt = false;
        Dc(n);
      }
      function xt(n) {
        vt = true;
        Fc(n);
      }
      function Ct(n) {
        jc(n);
        wt = n;
        pt = 0;
      }
      function Et(n) {
        st = n;
      }
      function Bt(n) {
        pt += n;
        mt += n;
      }
      var Dt = function (n, e, o) {
        return {
          mh: 0,
          bh: 0,
          width: e,
          height: o,
          zs: 0,
          ik: n,
          lk: function (n) {
            const o = this.ik;
            k().nk(n, o, this.mh, this.bh, this.width, this.height);
          },
          hk: function (n, t, e) {
            if (k().dk(n, t, this.mh, this.bh, this.width, this.height)) {
              this.zs = 1;
              return true;
            } else {
              this.zs = 0;
              return false;
            }
          }
        };
      };
      var zt = o(6399);
      var Ut = o.n(zt);
      var St = {
        kk: [],
        gk: [],
        fk: [],
        wk: [],
        pk: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mk: [],
        vk: {
          width: 400,
          height: 20,
          mh: 0,
          bh: 0,
          _k: 0,
          bk: "#F2C39F",
          yk: "#5D3A37",
          Mk: "#5D3A37",
          background: k().Tk(400, 20, 10, "#5D3A37"),
          lk: function (n) {
            if (this.yk && this.yk !== this.Mk) {
              this.Mk = this.yk;
              this.background = k().Tk(this.width, this.height, 10, this.yk);
            }
            n.drawImage(this.background, this.mh, this.bh);
            n.beginPath();
            n.fillStyle = this.bk || "#F2C39F";
            if (this._k) {
              k().Ak(n, this.mh + 5, this.bh + 5, (this.width - 10) * this._k, this.height - 10, 5);
            }
            n.fill();
          }
        },
        Lk: 0,
        na: 0,
        xk: 0,
        Ck: -1,
        Ek: k().Bk("0", 24, "#AE4D57", "#222222"),
        Dk: k().Bk("0", 24, "#935F3B", "#222222"),
        zk: k().Bk("0", 24, "#7B7A91", "#222222"),
        Uk: k().Bk("0", 24, "#FFD700", "#222222"),
        Sk: k().Bk("0", 24, "#FFFFFF", "#222222"),
        Hk: k().Bk("0", 24, "#FFFFFF", "#222222"),
        Nk: null,
        Gk: {
          Vk: -1,
          pk: 0,
          jk: k().Bk(" ", 23, ""),
          Fk: k().Bk(" ", 23, ""),
          Pk: k().Bk(" ", 23, ""),
          Rk: k().Bk(" ", 23, ""),
          qk: k().Bk(" ", 23, ""),
          Yk: k().Bk(" ", 23, ""),
          Kk: k().Bk(" ", 23, ""),
          lk: function (n, t, e, o, r, c) {
            const s = Z()[t];
            if (t !== this.Vk) {
              this.Vk = t;
              k().Wk(this.jk, s.Sa, 23, "#eec39d");
              k().Wk(this.Fk, e + "/" + o, 23, "#fff");
              if (s.Ok) {
                k().Wk(this.Pk, "" + s.Ok[0], 23, "#ad4e56");
                k().Wk(this.Rk, "" + s.Ok[1], 23, "#9c7e66");
                k().Wk(this.qk, "" + s.Ok[2], 23, "#ffffff");
                k().Wk(this.Yk, "" + s.Ok[3], 23, "#e3b32c");
              }
              k().Wk(this.Kk, s.description, 23, "#fff");
              this.pk = e;
            } else if (this.pk !== e) {
              k().Wk(this.Fk, e + "/" + o, 23, "#fff");
              this.pk = e;
            }
            const u = Math.max(this.jk.width + s.Zk === 2 ? this.Fk.width : 0, s.Ok ? this.Pk.width + this.Rk.width + this.qk.width + this.Yk.width : 0, this.Kk.width) + 40;
            n.beginPath();
            n.fillStyle = "#4f403c";
            k().Ak(n, r, c, u, s.Ok ? 150 : 110, 10);
            n.fill();
            c += 20;
            r += 20;
            n.drawImage(this.jk, r, c);
            if (s.Zk === 2) {
              n.drawImage(this.Fk, r + this.jk.width, c);
            }
            if (s.Ok) {
              n.drawImage(this.Pk, r, c + 40);
              n.drawImage(this.Rk, r + this.Pk.width, c + 40);
              n.drawImage(this.qk, r + this.Pk.width + this.Rk.width, c + 40);
              n.drawImage(this.Yk, r + this.Pk.width + this.Rk.width + this.qk.width, c + 40);
            }
            n.drawImage(this.Kk, r + 0, c + (s.Ok ? 80 : 40));
          }
        },
        Ik: function (n) {
          return Math.floor(n * 10) / 10;
        },
        Jk: function (n) {
          if (n < 1000) {
            return n;
          } else if (n < 10000) {
            return this.Ik(n / 1000, 2) + "k";
          } else if (n < 1000000) {
            return Math.floor(n / 1000) + "k";
          } else if (n < 10000000) {
            return this.Ik(n / 1000000, 2) + "m";
          } else if (n < 1000000000) {
            return Math.floor(n / 1000000) + "m";
          } else {
            return Math.floor(n / 1000000000) + "b";
          }
        },
        Xk: function (n, t, e, o) {
          if (this.mk[Ut().Y] !== n) {
            k().Wk(this.Ek, this.Jk(n), 24, "#AE4D57", "#222222");
          }
          if (this.mk[Ut().zo] !== t) {
            k().Wk(this.Dk, this.Jk(t), 24, "#935F3B", "#222222");
          }
          if (this.mk[Ut().Do] !== e) {
            k().Wk(this.zk, this.Jk(e), 24, "#7B7A91", "#222222");
          }
          if (this.mk[Ut().tn] !== o) {
            k().Wk(this.Uk, o + "", 24, "#FFD700", "#222222");
          }
          this.mk[Ut().Y] = n;
          this.mk[Ut().zo] = t;
          this.mk[Ut().Do] = e;
          this.mk[Ut().tn] = o;
        },
        Qk: function (n) {
          const e = Math.floor(k().$k(this.xk));
          this.xk = n;
          const o = Math.floor(k().$k(this.xk));
          this.vk._k = Math.floor((k().$k(this.xk) - o) * 100) / 100;
          if (e !== o) {
            this.Nk = k().Wk(this.Nk, "AGE " + o, 24, "#FFFFFF", "#222222");
          }
        },
        ng: function (n) {
          this.Sk = k().Wk(this.Sk, n, 24, "#FFFFFF", "#222222");
          this.Lk = n;
        },
        tg: function () {
          this.na = 0;
          this.Hk = k().Wk(this.Hk, this.na, 24, "#FFFFFF", "#222222");
        },
        eg: function (n) {
          this.na += n;
          this.Hk = k().Wk(this.Hk, this.na, 24, "#FFFFFF", "#222222");
        },
        Ja: function () {
          this.gk.length = 0;
          for (let t = 0; t < this.fk.length; t++) {
            this.gk.push(Dt(W[Z()[this.fk[t]].og], 100, 100));
          }
        },
        ig: function () {
          this.kk.length = 0;
          for (let t = 0; t < this.wk.length; t++) {
            this.kk.push(Dt(W[Z()[this.wk[t]].og], 100, 100));
          }
        }
      };
      const Ht = {
        rg: V.wd(V.bd("leaderboard"), 250, 330),
        cu: null,
        cg: Dt(W[F().Pi], 38.5, 42.5),
        ag: true,
        mh: 0,
        bh: 0,
        width: 250,
        height: 330,
        sg: [],
        ug: [],
        lk: function (n, t) {
          n.drawImage(this.rg, this.mh, this.bh);
          for (let o = 0, i = this.sg; o < i.length; o++) {
            const r = t.fg[i[o]];
            n.drawImage(this.ug[o] ||= k().Bk(o + 1 + ".", c().lg, c().hg[o] ? c().hg[o] : c().dg, c().kg), this.mh + 8, this.bh + 57 + o * 27);
            n.drawImage(r.gg ||= k().Bk(r.Sa, c().lg, c().dg, c().kg), this.mh + 40, this.bh + 57 + o * 27);
            n.drawImage(r.wg ||= k().Bk(k().pg(r.$c), c().lg, c().dg, c().kg), this.mh + 40 + 145, this.bh + 57 + o * 27);
          }
        },
        Ja: function (n, t) {
          this.sg.length = 0;
          let e = [];
          for (let n = 0; n < t.length; n++) {
            e.push(t[n][0]);
          }
          this.sg = e;
        }
      };
      var Nt = Ht;
      var Gt = {
        rg: k().Bk("", 50, "#fff", "#222"),
        active: false,
        mg: 0,
        vg: 0.7,
        Lf: function (n, t = 1) {
          if (this.mg <= 0) {
            this.mg = t;
          }
          k().Wk(this.rg, n, 50, "#fff", "#222");
        },
        Ja: function (n) {
          this.mg -= n * this.vg;
          if (this.mg < 0) {
            this.mg = 0;
          }
        }
      };
      o(9435);
      const Vt = function () {
        this.wa = function (n, e, o, i, r, c) {
          this.mh = n;
          this.bh = e;
          this._g = c;
          this.vg = o;
          this.mg = 400;
          this.bg = Math.random() > 0.5 ? 1 : -1;
          this.rg = this.rg ? k().Wk(this.rg, r, 45, this._g) : k().Bk(r, 35, this._g);
          this.scale = 1;
          this.yg = this.scale;
          this.Mg = 2.5;
          this.Tg = 0.02;
          this.vg = 0.18;
        };
        this.Ja = function (n) {
          if (this.mg) {
            this.mg -= n;
            this.bh -= this.vg * n;
            this.scale += this.Tg * n;
            if (this.scale >= this.Mg) {
              this.scale = this.Mg;
              this.Tg *= -1;
            } else if (this.scale <= this.yg) {
              this.scale = this.yg;
              this.Tg = 0;
            }
            if (this.mg <= 0) {
              this.mg = 0;
            }
          }
        };
        this.vs = function (n) {
          const t = this.rg;
          const e = this.scale;
          n.globalAlpha = e;
          n.drawImage(t, this.mh - e * t.width / 2, this.bh - e * (t.height / 2), t.width * e, e * t.height);
          n.globalAlpha = 1;
        };
      };
      const jt = function () {
        this.wa = function (n, t) {
          this.parent = t;
          this.mg = 3000;
          if (this.rg) {
            k().Wk(this.rg, n, 25, "#fff", null, null, "rgba(0,0,0,.25)", 5);
          } else {
            this.rg = k().Bk(n, 25, "#fff", null, null, "rgba(0,0,0,.25)", 5);
          }
        };
        this.vs = function (n, t) {
          if (this.mg) {
            this.mg -= t;
          }
          if (this.mg < 0) {
            this.mg = 0;
            this.parent = null;
            return;
          }
          const e = this.rg;
          const o = this.parent;
          n.drawImage(e, o.mh - e.width / 2, o.bh - e.height / 2 - 120);
        };
      };
      var Ft = o(9281);
      var Pt = o.n(Ft);
      var Rt = o(5599);
      var qt = o.n(Rt);
      var Yt = o(2936);
      var Kt = o.n(Yt);
      const Wt = {
        [s()._n]: null,
        [s().En]: null,
        [s().Bn]: null,
        [s().Dn]: null,
        [s().Un]: null,
        [s().Rn]: null,
        [s().Sn]: null
      };
      var Ot = Wt;
      o(9882);
      const Zt = {
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
      function It(n, t) {
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
      var Jt = o(9282);
      var Xt = o.n(Jt);
      var Qt = o(7160);
      var $t = o.n(Qt);
      var ne = o(9657);
      var te = o.n(ne);
      var ee = o(3424);
      var oe = o.n(ee);
      var ie = o(3543);
      var re = o.n(ie);
      var ce = o(2190);
      var ae = o.n(ce);
      var se = o(6078);
      var ue = o.n(se);
      var fe = o(5299);
      var le = o.n(fe);
      const he = Object.create(null);
      var de = function (n, t) {
        if (!t) {
          return null;
        }
        const o = N.default.Rd(t);
        if (!o) {
          return null;
        }
        let r = he[t];
        if (r && r.url === o) {
          return r.pattern;
        }
        r = {
          url: o,
          pattern: null,
          Da: null
        };
        he[t] = r;
        const c = new Image();
        c.crossOrigin = "anonymous";
        c.onload = function () {
          try {
            r.pattern = n.createPattern(c, "repeat");
          } catch (n) {
            r.pattern = null;
          }
        };
        c.onerror = function () {
          r.pattern = null;
        };
        c.src = o;
        r.Da = c;
        return null;
      };
      var ke = function (n) {
        if (!n) {
          return null;
        }
        const t = N.default.Rd(n);
        if (typeof t == "string" && t.charAt(0) === "#") {
          return t;
        } else {
          return null;
        }
      };
      function ge(n, t) {
        return {
          key: "img/entity/" + n + ".png",
          Sa: t,
          src: "/img/entity/" + n + ".png",
          control: "image"
        };
      }
      function we(n, t) {
        return {
          key: "img/items/" + n + ".png",
          Sa: t,
          src: "/img/items/" + n + ".png",
          control: "image"
        };
      }
      function pe(n, t) {
        return {
          key: "img/skins/" + n + ".png",
          Sa: t,
          src: "/img/skins/" + n + ".png",
          control: "image"
        };
      }
      function me(n, t, e) {
        return {
          key: n,
          Sa: t,
          Ag: e,
          control: "biome"
        };
      }
      function ve(n, t, e) {
        return {
          key: n,
          Sa: t,
          Ag: e,
          control: "color"
        };
      }
      function _e(n, t, e, o, i) {
        return {
          key: n,
          Sa: t,
          Lg: e,
          min: o,
          max: i,
          control: "number"
        };
      }
      function be(n, t, e, o, i, r) {
        return {
          key: n,
          Sa: t,
          Lg: e,
          min: o,
          max: i,
          step: r,
          control: "range"
        };
      }
      var ye = [{
        Qa: "resources",
        xg: "Resources",
        Cg: [ge("tree", "Tree"), ge("palm_tree", "Palm Tree"), ge("cherry_tree", "Cherry Tree"), ge("bush", "Bush"), ge("cactus", "Cactus"), ge("rock", "Rock"), ge("cave_stone0", "Cave Stone I"), ge("cave_stone1", "Cave Stone II"), ge("cave_stone2", "Cave Stone III"), ge("ice0", "Ice I"), ge("ice1", "Ice II"), ge("gold", "Gold"), ge("ruby", "Ruby")]
      }, {
        Qa: "hats",
        xg: "Hats",
        Cg: [ge("hat_1", "Berserker Gear"), ge("hat_2", "Jungle Gear"), ge("hat_3", "Crystal Gear"), ge("hat_4", "Spike Gear"), ge("hat_5", "Immunity Gear"), ge("hat_6", "Boost Hat"), ge("hat_7", "Apple Hat"), ge("hat_8", "Scuba Gear"), ge("hat_9", "Hood"), ge("hat_10", "Pumpkin King's Curse"), ge("hat_11", "Demolist"), ge("hat_14", "Winter Hat"), ge("skid_hat", "Skid Hat")]
      }, {
        Qa: "weapons",
        xg: "Weapons",
        Cg: [ge("stone_sword", "Stone Sword"), we("g_sword", "Gold Sword"), we("d_sword", "Diamond Sword"), we("r_sword", "Ruby Sword"), ge("s_dagger", "Stone Dagger"), we("g_dagger", "Gold Dagger"), we("d_dagger", "Diamond Dagger"), we("c_dagger", "Crystal Dagger"), ge("r_dagger", "Ruby Dagger"), ge("katana", "Katana"), we("g_katana", "Gold Katana"), we("d_katana", "Diamond Katana"), we("c_katana", "Crystal Katana"), ge("stone_spear", "Stone Spear"), we("g_spear", "Gold Spear"), we("d_spear", "Diamond Spear"), we("r_spear", "Ruby Spear"), ge("cut_spear", "Stone Cut Spear"), we("g_cutspear", "Gold Cut Spear"), we("d_cutspear", "Diamond Cut Spear"), we("r_cutspear", "Ruby Cut Spear"), ge("stone_axe", "Stone Axe"), we("g_axe", "Gold Axe"), we("d_axe", "Diamond Axe"), we("r_axe", "Ruby Axe"), ge("great_axe", "Stone Great Axe"), we("g_great_axe", "Gold Great Axe"), we("d_great_axe", "Diamond Great Axe"), we("r_great_axe", "Ruby Great Axe"), ge("stone_toolhammer", "Stone Toolhammer"), we("g_toolhammer", "Gold Toolhammer"), we("d_toolhammer", "Diamond Toolhammer"), we("r_toolhammer", "Ruby Toolhammer"), ge("hammer", "Stone Hammer"), ge("g_hammer", "Gold Hammer"), ge("d_hammer", "Diamond Hammer"), ge("r_hammer", "Ruby Hammer"), we("bat", "Stone Bat"), ge("g_bat", "Gold Bat"), ge("d_bat", "Diamond Bat"), ge("r_bat", "Ruby Bat"), ge("stick", "Stone Stick"), we("g_stick", "Gold Stick"), we("d_stick", "Diamond Stick"), we("r_stick", "Ruby Stick"), ge("s_healing_staff", "Stone Healing Staff"), we("g_healing_staff", "Gold Healing Staff"), we("d_healing_staff", "Diamond Healing Staff"), we("r_healing_staff", "Ruby Healing Staff"), we("scythe", "Scythe"), we("meme", "Meme"), ge("s_musket", "Musket"), ge("bow", "Bow"), ge("Xbow", "Crossbow"), ge("arrow", "Arrow"), we("pearl", "Pearl"), ge("shield", "Shield")]
      }, {
        Qa: "animals",
        xg: "Animals",
        Cg: [pe("body0", "Player Body"), pe("arm0", "Player Hands"), ge("cow", "Cow"), ge("gcow", "Golden Cow"), ge("wolf", "Wolf"), ge("shark", "Shark"), ge("duck", "Duck"), ge("crocodile", "Crocodile"), ge("tornado", "Tornado"), ge("mammoth_body", "Mammoth Body"), ge("mammoth_head", "Mammoth Head"), ge("mammoth_head_angry", "Mammoth Head (Angry)"), ge("mammoth_tail", "Mammoth Tail"), ge("dragon_2_body", "Dragon Body"), ge("dragon_2_head", "Dragon Head"), ge("dragon_2_left_wing", "Dragon Left Wing"), ge("dragon_2_right_wing", "Dragon Right Wing"), ge("fireball", "Fireball"), ge("bullet", "Bullet"), ge("cannonball", "Cannonball")]
      }, {
        Qa: "buildings",
        xg: "Buildings",
        Cg: [ge("wall", "Wood Wall"), ge("castle_wall", "Stone Wall"), ge("spike", "Spike"), ge("big_spike", "Big Spike"), ge("hard_spike", "Hard Spike"), ge("trap", "Trap"), ge("boost", "Boost Pad"), ge("platform", "Platform"), ge("heal_pad", "Heal Pad"), ge("windmill", "Windmill"), ge("windmill_base", "Windmill Base"), ge("windmill_top", "Windmill Top"), ge("windmill_assembled", "Windmill (Assembled)"), ge("turret_base", "Turret Base"), ge("turret_top", "Turret Top"), ge("turret_assembled", "Turret (Assembled)"), ge("bed", "Bed"), ge("roof", "Roof"), ge("teleporter", "Teleporter"), ge("ice_spike", "Ice Spike"), ge("wood_farm", "Wood Farm"), ge("wood_farm_cherry", "Cherry Farm"), ge("stone_farm", "Stone Farm"), ge("chest", "Chest"), ge("lootbox", "Lootbox")]
      }, {
        Qa: "backgrounds",
        xg: "Backgrounds",
        Cg: [me("snow_background_texture", "Snow Biome", "#ece5db"), me("plains_background_texture", "Plains Biome", "#788F57"), me("beach_background_texture", "Beach Biome", "#fcefbb"), me("river_background_texture", "River / Ocean Biome", "#2a8b9b"), me("desert_background_texture", "Desert Biome", "#b38354"), ve("oob_color", "Out of Bounds", "#81aa4a"), _e("grid_cell_width", "Grid Cell Width", 80, 10, 400), _e("grid_cell_height", "Grid Cell Height", 80, 10, 400), be("grid_opacity", "Grid Opacity", 0.06, 0, 1, 0.01), ve("grid_color", "Grid Colour", "#000000")]
      }, {
        Qa: "shadows",
        xg: "Shadows",
        Cg: [be("shadow_offset_x", "Offset X (px)", 10, -50, 50, 1), be("shadow_offset_y", "Offset Y (px)", 7, -50, 50, 1), be("shadow_darkness", "Darkness", 0.35, 0, 1, 0.05), ve("shadow_color", "Shadow Colour", "#000000"), be("shadow_blur", "Blur (px)", 0, 0, 20, 1)]
      }, {
        Qa: "hud",
        xg: "HUD",
        Cg: [{
          key: "hud_font",
          Sa: "HUD Font",
          control: "font"
        }, ve("healthbar_player_color", "Player Healthbar", "#a4cc4f"), ve("healthbar_enemy_color", "Enemy Healthbar", "#cc5151"), ve("healthbar_bg_color", "Healthbar Background", "#3a4030"), ve("damage_color", "Damage Number", "#ffffff"), ve("heal_color", "Heal Number", "#8ecc51"), ve("player_name_color", "Player Name", "#ffffff"), ve("mob_name_color", "Mob Name", "#ffffff"), ve("clan_tag_color", "Clan / Team Tag", "#96c949"), ve("age_color", "Age / Score", "#ffffff"), ve("name_outline_color", "Name Outline", "#222222"), _e("name_outline_width", "Name Outline Width", 7, 0, 20), ve("age_bar_color", "Age Gauge Fill", "#f2c39f"), ve("age_bar_bg_color", "Age Gauge Background", "#5d3a37"), ve("minimap_dot_color", "Minimap Dots", "#ffffff"), ve("minimap_self_color", "Minimap (You)", "#3bd1ff"), ve("collision_color", "Collision Outline", "#ff3b3b"), be("collision_opacity", "Collision Opacity", 0.6, 0, 1, 0.05), _e("collision_width", "Collision Width", 3, 1, 20), ge("map", "Minimap"), ge("team_crown", "Crown"), ge("resource_background", "Resource Disc"), ge("skull", "Death Skull"), ge("toggle-button-out1", "Top-Right Button")]
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
      var Me = o(9629);
      var Te = o.n(Me);
      o(9082);
      o(1872);
      o(9605);
      o(6820);
      o(7644);
      const Ae = [s().vn, s().yn];
      let Le = 1;
      let xe = WebSocket;
      let Ce = null;
      let Ee = {};
      function Be(n) {
        if (Ce && Ce.readyState === 1) {
          if (typeof n != "string" && c().Eg !== 1) {
            z(n);
          }
          Ce.send(n);
        }
      }
      Ee.wa = function () {};
      Ee.encode = function () {
        while (true);
      };
      Ee.decode = null;
      window.____ = Ee;
      Date.now();
      let De = function () {
        var t = Object.prototype.toString;
        var e = Function.prototype.toString;
        var o = /^\[object .+?Constructor\]$/;
        var r = RegExp("^" + (t + "").replace(/[.*+?^${}()|[\]\/\\]/g, "\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function c(i) {
          var a = typeof i;
          if (a == "function") {
            return r.test(e.call(i));
          } else {
            return i && a == "object" && o.test(t.call(i)) || false;
          }
        }
        let a = c + "" + Math.random();
        c["toString"] = () => a;
        return c;
      }();
      function ze() {
        while (!De(xe));
      }
      const Ue = ze + "";
      ze["toString"] = () => Ue + Math.floor(Math.random() * 10);
      setTimeout(ze, 7000 + Math.random() * 10000);
      setTimeout(() => ze(), 7000 + Math.random() * 10000);
      setTimeout(function () {
        ze();
      }, 7000 + Math.random() * 10000);
      ze();
      let Se = 227392;//null;
      function He(n) {
        return n.map(n => String.fromCharCode(n)).join("");
      }
      /*if (typeof EXTERNAL == "function") {
        Se = H(EXTERNAL, GLOB);
      }*/
      const Ne = new TextDecoder();
      const Ge = He([119, 115, 115]);
      const Ve = He([119, 115]);
      const je = He([58, 47, 47]);
      const Fe = He([47, 119, 115]);
      const Pe = Number(He([52, 52, 51]));
      const Re = He([58]);
      function qe(n) {
        let t = 0;
        for (let e = 0; e < n.length; e++) {
          t += n[e];
        }
        return t / n.length;
      }
      function Ye(n) {
        const e = n.length;
        const o = qe(n);
        return Math.sqrt(n.map(n => Math.pow(n - o, 2)).reduce((n, t) => n + t) / e);
      }
      const Ke = new TextEncoder();
      let We = document.getElementById("game-canvas");
      let Oe = We.getContext("2d");
      let Ze = false;
      let Ie = Se;
      let Je = 0;
      let Xe = null;
      let Qe = 1;
      let $e = {
        mh: 0,
        bh: 0,
        w: 0,
        td: 0
      };
      let no = null;
      let to = new function () {
        this.Bg = [];
        this.Dg = [];
        this.zg = [];
        this.Ug = function (n, e) {
          const i = W[F().wi];
          const r = zi - i.Qd.ek - 10;
          let c = 0;
          let a = 0;
          for (var s = 0; s < this.zg.length; ++s) {
            const n = this.zg[s];
            if (n.mg && c < 5) {
              c++;
              a = Math.max(n.text.length, a);
            }
          }
          if (c) {
            n.fillStyle = "rgba(0, 0, 0, .1)";
            n.fillRect(10, r - (c + 1) * 50 + 20, a * 11, c * 50 + 5);
          }
          n.font = "20px " + k().Sg();
          n.fillStyle = "white";
          let u = 0;
          for (s = 0; s < this.zg.length;) {
            const t = this.zg[s];
            if (t.mg) {
              t.mg -= e * 1000;
              if (t.mg < 0) {
                t.mg = 0;
              }
              if (u < c) {
                n.fillText(t.text, 10, r - (c - u) * 50);
              }
              u++;
              s++;
            } else {
              this.zg.shift();
            }
          }
        };
        this.Ja = function (n, e) {
          for (var i = 0; i < this.Bg.length; ++i) {
            if (this.Bg[i].mg) {
              this.Bg[i].Ja(e);
              this.Bg[i].vs(n);
            }
          }
          for (let t, i = 0; i < this.Dg.length; i++) {
            t = this.Dg[i];
            if (t.mg) {
              t.vs(n, e);
            }
          }
        };
        this.Hg = function (n, t, e, o, i, r, c) {
          var a;
          for (var s = 0; s < this.Bg.length; ++s) {
            if (!this.Bg[s].mg) {
              a = this.Bg[s];
              break;
            }
          }
          if (!a) {
            a = new Vt();
            this.Bg.push(a);
          }
          a.wa(n, t, e, o, i, r, c);
        };
        this.Ng = function (n, t) {
          let e = {
            mg: 5000,
            text: t
          };
          this.zg.push(e);
        };
        this.Gg = function (n, e) {
          var i;
          for (var r = 0; r < this.Dg.length; ++r) {
            if (!this.Dg[r].mg || this.Dg[r].parent && this.Dg[r].parent.Qa === e.Qa) {
              i = this.Dg[r];
              break;
            }
          }
          if (!i) {
            i = new jt();
            this.Dg.push(i);
          }
          i.wa(n, e);
        };
      }();
      let eo = new function () {
        this.mh = c().Vg / 2;
        this.bh = c().jg / 2;
        this.Fg = 0;
        this.Pg = "D";
        this.Pg += "s";
        this.Pg += "y";
        this.Pg += "n";
        this.Pg += "c";
        this.Rg = Er + "";
        this.Rg = this.Rg.indexOf(this.Pg);
        this.qg = "r";
        this.qg += "e";
        this.qg += "p";
        this.qg += "e";
        this.qg += "a";
        this.qg += "t";
        this.qg += "e";
        this.qg += "r";
        this.Yg = "W";
        this.Yg += "S";
        this.Yg += "S";
        this.Yg += "e";
        this.Yg += "r";
        this.Yg += "v";
        this.Yg += "e";
        this.Yg += "r";
        this.Yg += "s";
        this.Kg = "a";
        this.Kg += "l";
        this.Kg += "l";
        this.Kg += "i";
        this.Kg += "e";
        this.Kg += "s";
        this.Wg = function (n, t) {
          this.mh = n;
          this.bh = t;
          this.qd = 0;
          this.Yd = 0;
        };
        this.Ja = function (n, t, e) {
          e *= 1000;
          let o = k().Og(this.mh, this.bh, n, t);
          let i = k().Zg(this.mh, this.bh, n, t);
          let r = Math.min(o * 0.01 * e, o);
          if (r > 0.01) {
            this.mh += r * Math.cos(i);
            this.bh += r * Math.sin(i);
          } else {
            this.mh = n;
            this.bh = t;
          }
          this.qd = n - this.mh | 0;
          this.Yd = t - this.bh | 0;
          if (this.Rg !== -1 || window[this.qg] !== undefined || window[this.Pg] !== undefined || window[this.Kg] !== undefined || window[this.Yg] !== undefined) {
            this.Fg++;
            if (this.Fg >= 1000) {
              this.mh = undefined;
            }
          }
        };
      }();
      let oo = new function () {
        this.fg = [];
        this.Ig = function (n, t, e) {
          this.fg[n] = {
            Qa: n,
            Sa: t,
            $c: e,
            Jg: false,
            xg: null,
            gg: null,
            wg: null
          };
        };
        this.Xg = function (n) {
          this.fg[n].Sa = "";
          this.fg[n].$c = 0;
          this.fg[n].Jg = false;
        };
        this.Qg = function (n, t, e, o) {
          this.fg[n].Sa = t;
          this.fg[n].$c = e;
          this.fg[n].Jg = o;
          this.fg[n].xg = null;
          this.fg[n].gg = null;
          this.fg[n].wg = null;
        };
        this.$g = function (n, t) {
          this.fg[n].$c = t;
          if (this.fg[n].wg) {
            k().Wk(this.fg[n].wg, k().pg(t), c().lg, c().dg, c().kg);
          }
        };
      }();
      let io = new function () {
        this.wa = function () {
          this.nw = [];
          this.tw = [];
        };
        this.ew = [Dt(W[F().Nr], 107, 107), Dt(W[F().Gr], 107, 107)];
        this.nw = [];
        this.ow = function () {
          this.nw.length = 0;
        };
        this.iw = function (n) {
          this.nw.push(n);
        };
        this.tw = [];
        this.rw = function (n, t) {
          this.tw[n] = {
            Sa: t,
            active: false,
            xg: null,
            Uh: 0
          };
        };
        this.cw = function (n) {
          this.tw[n].xg = null;
          this.tw[n].Sa = "";
          this.tw[n].active = false;
          this.tw[n].Uh = 0;
        };
        this.aw = function (n, e, o) {
          this.tw[n].Uh = e;
          this.tw[n].Sa = o;
          this.tw[n].active = true;
          this.tw[n].xg = null;
        };
      }();
      let ro = St;
      let co = Gt;
      let ao = Nt;
      let so = new function () {
        this.wa = function () {
          this.sw = [];
          this.uw = null;
          this.fw = null;
        };
        this.lw = function (n) {
          this.fw = n;
        };
        this.hw = function () {
          this.fw = null;
        };
        this.dw = function () {
          this.sw.length = 0;
        };
        this.kw = function (n, t) {
          if (this.uw) {
            this.uw.mh = n;
            this.uw.bh = t;
          } else {
            this.uw = new (Kt())(n, t);
          }
        };
        this.gw = function (n, t) {
          this.sw.push([n, t]);
        };
        this.ww = function (n) {
          const o = W[F().wi];
          const i = W[F().Yi];
          const r = W[F().ec];
          const a = zi - o.Qd.ek;
          n.translate(5, a - 5);
          k().nk(n, o, 0, 0, o.Qd.tk, o.Qd.ek);
          const s = N.default.Rd("minimap_dot_color");
          for (let t = 0; t < this.sw.length; t++) {
            const e = o.Qd.tk * this.sw[t][0];
            const r = o.Qd.ek * this.sw[t][1];
            if (s) {
              n.fillStyle = s;
              n.beginPath();
              n.arc(e, r, 4, 0, Math.PI * 2);
              n.fill();
            } else {
              k().nk(n, i, e - i.Qd.tk / 2, r - i.Qd.ek / 2, i.Qd.tk, i.Qd.ek);
            }
          }
          if (this.fw) {
            let t = W[F().Vi];
            let e = this.fw;
            k().nk(n, t, o.Qd.tk * e.mh - t.Qd.tk / 2, o.Qd.ek * e.bh - t.Qd.ek / 2, t.Qd.tk, t.Qd.ek);
          }
          if (yo) {
            let t = p.get(yo);
            if (t) {
              const i = N.default.Rd("minimap_self_color");
              const a = o.Qd.tk * t.mh / c().Vg;
              const s = o.Qd.ek * t.bh / c().jg;
              if (i) {
                n.fillStyle = i;
                n.beginPath();
                n.arc(a, s, 5, 0, Math.PI * 2);
                n.fill();
              } else {
                k().nk(n, r, a - r.Qd.tk / 2, s - r.Qd.ek / 2, r.Qd.tk, r.Qd.ek);
              }
            }
          }
          if (this.uw) {
            let t = W[F().Ni];
            let e = this.uw;
            k().nk(n, t, o.Qd.tk * e.mh / c().Vg - t.Qd.tk / 2, o.Qd.ek * e.bh / c().jg - t.Qd.ek / 2, t.Qd.tk, t.Qd.ek);
          }
          if (lo.vs) {
            const t = o.Qd.tk;
            const e = o.Qd.ek;
            const i = t / c().Vg;
            const r = e / c().jg;
            n.globalAlpha = 0.3;
            n.fillStyle = "red";
            n.fillRect(0, 0, t, lo.pw * r);
            n.fillRect(0, 0, lo.mw * i, e);
            const a = e - lo._w * r;
            const s = t - lo.bw * i;
            n.fillRect(0, lo._w * r, t, a);
            n.fillRect(lo.bw * i, 0, s, e);
            n.globalAlpha = 0.7;
            n.strokeStyle = "#fff";
            const u = lo.yw - lo.Mw;
            const f = lo.Tw - lo.Aw;
            n.strokeRect(lo.Mw * i, lo.Aw * r, u * i, f * r);
            n.globalAlpha = 1;
          }
          n.translate(-5, 5 - a);
        };
        this.wa();
      }();
      let uo = new function (n) {
        const e = this;
        const o = R().get("ffa-mode");
        const r = R().get("sandbox-mode");
        const c = R().get("battleroyale-mode");
        const a = R().get("event-mode");
        const s = R().get("server-select");
        let u = o;
        function f(n) {
          s.innerHTML = "";
          const i = e.Lw;
          for (let t = 0; t < i.length; t++) {
            const e = i[t];
            const o = e.r;
            const r = Zt[o];
            if (r[1] !== n) {
              continue;
            }
            const c = e.d;
            c[0];
            const a = c[1];
            pr(r[0], 0, a, o);
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
        function h() {
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
        function d() {
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
          const o = Math.floor(Math.random() * di.options.length);
          di.selectedIndex = o;
          const i = di.options[o].getAttribute("region");
          e.xw(i);
        }
        function w() {
          l();
          g();
          Wr(0);
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
          Wr(0);
        }
        function m() {
          h();
          g();
          Wr(0);
        }
        function v(n) {
          const t = [0, 0];
          const o = e.Lw;
          for (let e = 0; e < o.length; e++) {
            const i = o[e].r;
            const r = Zt[i][1];
            if (i === n.region) {
              if (r === 1) {
                h();
              } else if (r === 0) {
                l();
              } else if (r === 2) {
                d();
              }
              di.selectedIndex = t[r];
              return;
            }
            t[r] += 1;
          }
        }
        o.addEventListener("click", function () {
          if (u !== o) {
            if (Je === 1) {
              const n = R().da["progress-loss"];
              n.next = w;
              n.show();
            } else {
              w();
            }
          }
        });
        c.addEventListener("click", function () {
          if (u !== c) {
            if (Je === 1) {
              const n = R().da["progress-loss"];
              n.next = p;
              n.show();
            } else {
              p();
            }
          }
        });
        r.addEventListener("click", function () {
          if (u !== r) {
            if (Je === 1) {
              const t = R().da["progress-loss"];
              t.next = w;
              t.show();
            } else {
              m();
            }
          }
        });
        a.addEventListener("click", function () {
          if (u !== a) {
            if (Je === 1) {
              const t = R().da["progress-loss"];
              if (u === o) {
                t.next = w;
              } else if (u === r) {
                t.next = m;
              }
              t.show();
            } else {
              d();
              g();
              Wr(0);
            }
          }
        });
        this.Lw = [];
        this.Cw = null;
        this.Ew = function () {
          R().ns("Loading Sploop.io");
          let e = this;
          var o = new XMLHttpRequest();
          o.overrideMimeType("application/json");
          o.open("GET", "https://sploop.io/servers", true);
          o.onload = function () {
            e.Lw = JSON.parse(o.responseText) || [];
            e.Bw();
          };
          o.onabort = o.onerror = function () {
            R().ts();
            alert("Unable to reach matchmaker");
          };
          o.send(null);
        };
        this.Dw = function (n) {
          R().ts();
          this.zw();
          n.sort((n, t) => n.ping - t.ping);
          let o = n[0];
          if (o) {
            const n = Zt[o.region];
            cr(true, o.region + ".sploop.io", "80", k().Uw() || (k().Sw("0"), 0), n ? n[0] : "???");
            v(o);
          } else {
            alert("Matchmaking: UNABLE TO FIND GAME");
          }
        };
        this.Bw = function () {
          let n = [];
          for (let t = 0, e = this.Lw; t < e.length; t++) {
            if (Zt[e[t].r][1] !== 2) {
              n.push(new It(e[t].r, t));
            }
          }
          setTimeout(() => {
            this.Dw(n);
          }, 1500);
        };
        this.xw = function (n) {
          const t = e.Lw;
          for (let e = 0; e < t.length; e++) {
            const o = t[e];
            if (o.r === n) {
              cr(true, o.r === "DEV" ? "localhost" : o.r + ".sploop.io", "80", k().Uw() || (k().Sw("0"), 0));
              return;
            }
          }
        };
        this.Hw = function (n) {
          let o = this.Lw[n];
          if (o) {
            cr(true, o.r === "DEV" ? "localhost" : o.r + ".sploop.io", "80", k().Uw() || (k().Sw("0"), 0));
          }
        };
        this.zw = function () {
          if (this.Lw.length === 0) {
            return alert("Matchmaking: game is updating, please wait.");
          }
          for (let n, t, e = 0; e < this.Lw.length; e++) {
            t = this.Lw[e];
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
      let fo = false;
      const lo = {
        mw: 0,
        pw: 0,
        bw: 0,
        _w: 0,
        vs: false,
        Nw: 0,
        Gw: 0,
        Vw: 0,
        jw: 0,
        Mw: 0,
        Aw: 0,
        yw: 0,
        Tw: 0,
        Fw: false,
        transition: 0,
        Pw: 0,
        Rw(n, t, e, o) {
          this.mw = n;
          this.pw = t;
          this.bw = e;
          this._w = o;
        },
        qw(n, t, e, o) {
          this.Mw = n;
          this.Yw = t;
          this.yw = e;
          this.Tw = o;
        },
        Kw(n = 0, t = 10) {
          this.Pw = n;
          this.transition = t;
          this.Fw = true;
        }
      };
      lo.Kw(0, 40);
      let ho = {
        Ww: 0,
        Ow: 0,
        Zw: 0,
        Iw: 0
      };
      let ko = 1;
      let go = false;
      let wo = 0;
      let po = 0;
      let mo = 0;
      let vo = 0;
      let _o = false;
      let bo = 0;
      let yo = 0;
      let Mo = 0;
      let To = 0;
      let Ao = 0;
      let Lo = [];
      let xo = Date.now();
      let Co = 0.2;
      let Eo = false;
      let Bo = false;
      let Do = false;
      let zo = +new Date();
      let Uo = false;
      let So = false;
      let Ho = false;
      let No = Dt(W[F().Fi], 38.5, 42.5);
      let Go = Dt(W[F().Ri], 38.5, 42.5);
      let Vo = Dt(W[F().qi], 38.5, 42.5);
      let jo = false;
      let Fo = true;
      let Po = true;
      let Ro = false;
      let qo = false;
      let Yo = false;
      let Ko = false;
      let Wo = ai("setting_shadows", false);
      let Oo = ai("setting_biome_textures", false);
      let Zo = ai("setting_show_collisions", false);
      let Io = function (n, t) {
        try {
          const n = window.localStorage.getItem("setting_shadow_offset");
          if (n !== null) {
            const t = parseFloat(n);
            if (isFinite(t)) {
              return t;
            }
          }
        } catch (n) {}
        return 100;
      }();
      function Jo() {
        return Wo;
      }
      function Xo() {
        return N.default.Rd("player_name_color") || c().Jw;
      }
      function Qo() {
        return N.default.Rd("mob_name_color") || c().Jw;
      }
      function $o() {
        for (const n in Ot) {
          Ot[n] = null;
        }
        if (oo && oo.fg) {
          for (const n in oo.fg) {
            const t = oo.fg[n];
            if (t) {
              t.xg = null;
            }
          }
        }
        if (ro) {
          ro.Nk = null;
        }
      }
      let ni = null;
      let ti = 0;
      function ei(n) {
        return /^data:/i.test(n) || /^(https?:|blob:)/i.test(n) || /\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(n);
      }
      function oi() {
        const t = N.default.Rd("hud_font");
        const e = typeof t == "string" ? t.trim() : "";
        if (!e) {
          ni = null;
          k().Xw("");
          $o();
          return;
        }
        if (ei(e)) {
          ii(e);
        } else {
          ni = null;
          k().Xw(e);
          $o();
        }
      }
      function ii(n) {
        if (ni === n) {
          return;
        }
        ni = n;
        if (typeof FontFace != "function") {
          return;
        }
        const e = "PackHudFont" + ++ti;
        let o;
        try {
          o = new FontFace(e, "url(\"" + n.replace(/"/g, "%22") + "\")");
        } catch (n) {
          return;
        }
        o[(0, ie.ua)("load")]().then(function (o) {
          if (ni === n) {
            try {
              document[(0, ie.ua)("fonts")][(0, ie.ua)("add")](o);
            } catch (n) {}
            k().Xw(e);
            $o();
          }
        }).catch(function () {
          if (ni === n) {
            k().Xw("");
            $o();
          }
        });
      }
      function ri() {
        k().Qw(N.default.Rd("name_outline_color"));
        k().$w(parseFloat(N.default.Rd("name_outline_width")));
        $o();
      }
      function ci() {
        oi();
        ri();
      }
      function ai(n, t) {
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
      function si(n, t) {
        try {
          window.localStorage.setItem(n, t ? "1" : "0");
        } catch (n) {}
      }
      N.default.np(n => k().tp(n));
      N.default.ep(ci);
      let ui = false;
      let fi = {
        Zw: 0,
        Iw: 0,
        Ww: 0,
        Ow: 0
      };
      let li = -1;
      let hi = {};
      let di = null;
      let ki = null;
      let gi = null;
      let wi = null;
      let pi = null;
      let mi = null;
      let vi = null;
      let _i = null;
      let bi = null;
      let yi = null;
      let Mi = null;
      let Ti = null;
      let Ai = null;
      let Li = null;
      let xi = null;
      let Ci = null;
      let Ei = null;
      let Bi = null;
      let Di = 0;
      let zi = 0;
      let Ui = 0;
      let Si = 0;
      let Hi = re().ga("IP");
      let Ni = re().ga("PORT");
      let Gi = re().ga("SSL") === "off";
      let Vi = null;
      function ji() {
        Qe = Math.max(Si / c().op, Ui / c().ip);
      }
      function Fi() {
        if (Do) {
          return wt;
        } else {
          return k().Zg(window.innerWidth / 2, window.innerHeight / 2, wo, po);
        }
      }
      function Pi(n) {
        if (!n || !Uo && !So) {
          Ti.style.display = n ? "block" : "none";
          Uo = n;
          Li.blur();
          if (n) {
            Li.focus();
          }
        }
      }
      function Ri(n) {
        Ai.style.display = n ? "block" : "none";
        if (n) {
          if (Uo) {
            Pi(false);
          }
          if (So) {
            br(false);
          }
        }
        Ho = n;
        if (n && !bo) {
          dc();
        }
      }
      function qi(n) {
        if (n) {
          if (Uo) {
            Pi(false);
          }
          if (So) {
            br(false);
          }
        }
        vi.style.display = n ? "block" : "none";
      }
      function Yi() {
        di = document.getElementById("server-select");
        ki = document.getElementById("clan-title");
        gi = document.getElementById("clan-menu-close-button");
        wi = document.getElementById("leave_clan");
        pi = document.getElementById("create_clan");
        mi = document.getElementById("leave-clan-button");
        vi = document.getElementById("game_over_popup");
        _i = document.getElementById("hat_menu_content");
        bi = document.getElementById("clan_menu_content");
        yi = document.getElementById("create-clan-button");
        Mi = document.getElementById("clan-menu-clan-name-input");
        Ti = document.getElementById("chat-wrapper");
        Ai = document.getElementById("clan-menu");
        Li = document.getElementById("chat");
        xi = document.getElementById("hat-menu");
        Ci = document.getElementById("play");
        Ei = document.getElementById("nickname");
        window.onbeforeunload = function () {
          return "Are you sure you want to leave the tab?";
        };
      }
      function Ki() {
        We.oncontextmenu = () => false;
        We.onmousedown = n => Ji(n);
        We.onmouseup = n => Qi(n);
        window.addEventListener("mousemove", n => Xi(n), false);
        window.onkeydown = n => ir(n);
        window.onkeyup = n => rr(n);
        window.addEventListener("resize", n => fr(), false);
        We.addEventListener("touchstart", n => yt(n), false);
        We.addEventListener("touchmove", n => Mt(n), false);
        We.addEventListener("touchend", n => Tt(n), false);
        We.addEventListener("touchcancel", n => Tt(n), false);
        We.addEventListener("touchleave", n => Tt(n), false);
        Ci.addEventListener("click", n => Or());
        gi.addEventListener("mousedown", n => {
          Ri(!Ho);
        });
        mi.addEventListener("mousedown", n => {
          Jc();
        });
        di.addEventListener("change", t => {
          let o = di.selectedIndex;
          const i = di.options[o].getAttribute("region");
          uo.xw(i);
        });
        document.getElementById("hat-menu-close-button").addEventListener("mousedown", n => {
          br(false);
        });
        document.getElementById("native-render-toggle").addEventListener("change", n => {
          Yo = n.currentTarget.checked;
          fr();
        });
        document.getElementById("native-helper-toggle").addEventListener("change", t => {
          Po = t.currentTarget.checked;
          fr();
        });
        document.getElementById("display-ping-toggle").addEventListener("change", n => {
          jo = n.currentTarget.checked;
        });
        document.getElementById("grid-toggle").addEventListener("change", t => {
          Fo = t.currentTarget.checked;
        });
        document.getElementById("particle-toggle").addEventListener("change", n => {
          qo = n.currentTarget.checked;
        });
        Wi();
        yi.addEventListener("click", n => {
          Wc(Mi.value);
        });
        Li.addEventListener("blur", () => {
          Li.value = "";
          Pi(false);
        });
        Li.addEventListener("keypress", t => {
          if (Uo && t.key === "Enter") {
            t.preventDefault();
            let n = Li.value.trim();
            Pi(false);
            const o = "moderator";
            if (n.length === 0) {
              return;
            }
            if (n === "/show") {
              Ro = !ue() || !ue().sa || ue().sa[re().ua(o)] !== 1 || 2;
              return;
            }
            if (n === "/hide") {
              Ro = false;
              return;
            }
            switch (n.split(" ")[0]) {
              case "texture_reload":
                W.forEach(n => {
                  if (n && n.Qd) {
                    n.Qd = {
                      Od: en().st
                    };
                  }
                });
                break;
              case "id":
                oo.fg.forEach(n => {});
                break;
              default:
                Cc(n);
            }
          }
        });
      }
      function Wi() {
        const t = document.getElementById("shadows-toggle");
        if (t) {
          t.checked = Wo;
          t.addEventListener("change", n => {
            Wo = n.currentTarget.checked;
            si("setting_shadows", Wo);
          });
        }
        const e = document.getElementById("show-collisions-toggle");
        if (e) {
          e.checked = Zo;
          mn(Zo);
          e.addEventListener("change", t => {
            Zo = t.currentTarget.checked;
            si("setting_show_collisions", Zo);
            mn(Zo);
          });
        }
        const o = document.getElementById("biome-textures-toggle");
        if (o) {
          o.checked = Oo;
          o.addEventListener("change", t => {
            Oo = t.currentTarget.checked;
            si("setting_biome_textures", Oo);
          });
        }
        Zi();
      }
      function Oi() {
        if (Vi) {
          Vi(false);
        }
      }
      function Zi() {
        const e = document.getElementById("texture-pack-build");
        const o = document.getElementById("pack-builder-nav");
        const r = document.getElementById("pack-builder-grid");
        const c = document.getElementById("pack-builder-name");
        const a = document.getElementById("pack-builder-author");
        const s = document.getElementById("pack-builder-version");
        const u = document.getElementById("pack-builder-file");
        const f = document.getElementById("pack-builder-import");
        if (!e || !o || !r) {
          return;
        }
        const l = Object.create(null);
        const h = Object.create(null);
        let d = null;
        function g(t, e) {
          if (t.control === "image") {
            N.default.rp(t.key, e);
            k().tp(t.key);
          } else {
            N.default.cp(t.key, e);
            if (t.key.indexOf("shadow_") === 0) {
              dn.Id();
            } else if (t.key === "hud_font") {
              oi();
            } else if (t.key === "name_outline_color" || t.key === "name_outline_width") {
              ri();
            } else if (t.key === "player_name_color" || t.key === "mob_name_color" || t.key === "clan_tag_color" || t.key === "age_color") {
              $o();
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
            t.style.backgroundColor = e.Ag || "#141414";
          }
        }
        function p(t) {
          const o = t.control || "image";
          const i = document.createElement("div");
          i.className = "pb-asset";
          const r = document.createElement("div");
          r.className = "pb-thumb pb-toggle";
          const c = document.createElement("img");
          c.className = "pb-eye";
          c.src = "img/ui/spectator.png";
          c.draggable = false;
          r.appendChild(c);
          const a = document.createElement("span");
          function s() {
            const i = !!h[t.key];
            if (o === "number" || o === "range") {
              r.style.backgroundImage = "";
              r.style.backgroundColor = "#1c1f18";
              a.style.fontFamily = "";
              const e = l[t.key];
              a.textContent = i ? "" : (e != null && e !== "" ? e : t.Lg ?? "") + "";
            } else if (o === "font") {
              r.style.backgroundImage = "";
              r.style.backgroundColor = "#1c1f18";
              const e = i ? "" : l[t.key] || "";
              a.style.fontFamily = e && !ei(e) ? e : i ? "" : k().Sg();
              a.textContent = i ? "" : "Aa";
            } else {
              a.style.fontFamily = "";
              a.textContent = "";
              w(r, t, i ? "" : l[t.key] || "");
            }
          }
          a.className = "pb-thumb-val";
          r.appendChild(a);
          i.appendChild(r);
          const f = document.createElement("div");
          f.className = "pb-meta";
          const p = document.createElement("div");
          p.className = "pb-name text-shadowed-3";
          p.textContent = t.Sa;
          f.appendChild(p);
          const m = document.createElement("div");
          m.className = "pb-row";
          let v = null;
          function _(n, o) {
            if (n) {
              l[t.key] = n;
            } else {
              delete l[t.key];
            }
            if (o && v) {
              v.value = n || "";
            }
            s();
            if (!h[t.key]) {
              g(t, n || "");
            }
          }
          if (o === "color" || o === "biome") {
            const n = document.createElement("input");
            n.className = "pb-color";
            n.type = "color";
            const o = l[t.key];
            n.value = o && o.charAt(0) === "#" ? o : t.Ag || "#000000";
            n.addEventListener("input", () => _(n.value, true));
            m.appendChild(n);
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
            n.placeholder = t.Lg != null ? t.Lg + "" : "";
            n.value = l[t.key] || "";
            v = n;
            n.addEventListener("input", () => _(n.value.trim(), false));
            m.appendChild(n);
          }
          if (o === "range") {
            const n = document.createElement("input");
            n.className = "pb-range";
            n.type = "range";
            n.min = t.min ?? 0;
            n.max = t.max ?? 1;
            n.step = t.step ?? 0.01;
            const o = l[t.key];
            n.value = o !== undefined && o !== "" ? o : t.Lg ?? 0;
            const i = document.createElement("span");
            i.className = "pb-range-val setting-info";
            i.textContent = n.value;
            const r = () => {
              const o = parseFloat(n.min);
              const i = parseFloat(n.max);
              const r = i > o ? (parseFloat(n.value) - o) / (i - o) * 100 : 0;
              n.style.setProperty("--pb-fill", r + "%");
            };
            r();
            n.addEventListener("input", () => {
              i.textContent = n.value;
              r();
              _(n.value, false);
            });
            m.appendChild(n);
            m.appendChild(i);
          }
          if (o === "image" || o === "biome") {
            const n = document.createElement("input");
            n.className = "pb-input";
            n.type = "text";
            n.placeholder = o === "biome" ? "#colour or tiled image URL" : "Image URL";
            n.value = l[t.key] || "";
            v = n;
            n.addEventListener("input", () => {
              const i = n.value.trim();
              if (i) {
                l[t.key] = i;
              } else {
                delete l[t.key];
              }
              s();
            });
            n.addEventListener("change", () => {
              if (!h[t.key]) {
                g(t, n.value.trim());
              }
            });
            m.appendChild(n);
            const i = document.createElement("div");
            i.className = "pb-upload";
            i.textContent = "Upload";
            i.addEventListener("click", () => {
              d = {
                set: n => _(n, true)
              };
              if (u) {
                u.accept = "image/*";
                u.value = "";
                u.click();
              }
            });
            m.appendChild(i);
          }
          if (o === "font") {
            const n = document.createElement("input");
            n.className = "pb-input";
            n.type = "text";
            n.placeholder = "Font name, or upload a font file";
            n.value = l[t.key] || "";
            v = n;
            n.addEventListener("input", () => {
              const e = n.value.trim();
              if (e) {
                l[t.key] = e;
              } else {
                delete l[t.key];
              }
              s();
            });
            n.addEventListener("change", () => {
              if (!h[t.key]) {
                g(t, n.value.trim());
              }
            });
            m.appendChild(n);
            const o = document.createElement("div");
            o.className = "pb-upload";
            o.textContent = "Upload";
            o.addEventListener("click", () => {
              d = {
                set: n => _(n, true)
              };
              if (u) {
                u.accept = ".ttf,.otf,.woff,.woff2,font/*";
                u.value = "";
                u.click();
              }
            });
            m.appendChild(o);
          }
          f.appendChild(m);
          i.appendChild(f);
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
            s();
            g(t, h[t.key] ? "" : l[t.key] || "");
          });
          s();
          return i;
        }
        N.default.ap(true);
        const m = [];
        const v = [];
        function _(t) {
          for (let n = 0; n < m.length; n++) {
            const o = n === t;
            m[n].style.display = o ? m[n].classList.contains("pb-saves") ? "flex" : "grid" : "none";
            v[n].classList.toggle("nav-button-active", o);
            v[n].classList.toggle("nav-button-text", !o);
          }
          if (t === 0) {
            D();
          }
          r.scrollTop = 0;
        }
        function b(t, e) {
          const r = document.createElement("div");
          r.className = "pb-tab nav-button-text";
          r.textContent = t;
          r.addEventListener("click", () => _(e));
          o.appendChild(r);
          v.push(r);
        }
        b("Saves", 0);
        const y = document.createElement("div");
        y.className = "pb-saves";
        const M = document.createElement("div");
        M.className = "pb-saves-actions";
        const T = document.createElement("div");
        T.className = "button-type-1 green-button text-shadowed-3 pb-saves-btn";
        T.textContent = "SAVE CURRENT PACK";
        const A = document.createElement("div");
        A.className = "button-type-1 dark-blue-button text-shadowed-3 pb-saves-btn";
        A.textContent = "IMPORT .JSON";
        const L = document.createElement("div");
        L.className = "button-type-1 red-button text-shadowed-3 pb-saves-btn";
        L.textContent = "RESET TO DEFAULT";
        M.appendChild(T);
        M.appendChild(A);
        M.appendChild(L);
        y.appendChild(M);
        const x = document.createElement("div");
        function C() {
          const e = {};
          const o = c ? c.value.trim() : "";
          if (o) {
            e[(0, ie.ua)("_name")] = o;
          }
          const i = a ? a.value.trim() : "";
          if (i) {
            e[(0, ie.ua)("_author")] = i;
          }
          const r = s ? s.value.trim() : "";
          if (r) {
            const n = Number(r);
            e[(0, ie.ua)("_version")] = isNaN(n) ? r : n;
          }
          for (const n in l) {
            if (h[n]) {
              continue;
            }
            const t = l[n];
            if (typeof t == "string" && t.trim()) {
              e[n] = t.trim();
            }
          }
          return e;
        }
        function E(n) {
          let t = 0;
          for (const e in n) {
            if (e.charAt(0) !== "_") {
              t++;
            }
          }
          return t;
        }
        function B(t, e) {
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
        function D() {
          if (!x) {
            return;
          }
          x.innerHTML = "";
          const n = N.default.sp();
          const e = N.default.Pd();
          if (!n.length) {
            const n = document.createElement("div");
            n.className = "pb-saves-empty setting-info";
            n.textContent = "No saved packs yet. Edit some assets, set a Name, then Save Current Pack.";
            x.appendChild(n);
            return;
          }
          n.forEach(n => {
            const i = n.Qa === e;
            const r = document.createElement("div");
            r.className = "pb-save-row" + (i ? " pb-save-row--active" : "");
            const c = document.createElement("div");
            c.className = "pb-save-info";
            const a = document.createElement("div");
            a.className = "pb-save-title text-shadowed-3";
            a.textContent = n.Sa + (i ? "  (active)" : "");
            const s = document.createElement("div");
            s.className = "pb-save-sub setting-info";
            s.textContent = "Version " + (n.version || "-") + "   ·   by " + (n.up || "Unknown");
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
                j();
              } else {
                V(n.Qa);
              }
            });
            const l = document.createElement("div");
            l.className = "button-type-1 blue-button text-shadowed-3 pb-save-action";
            l.textContent = "EXPORT";
            l.addEventListener("click", () => {
              const t = N.default.fp(n.Qa);
              if (t) {
                B(t, n.Sa);
              }
            });
            const h = document.createElement("div");
            h.className = "button-type-1 red-button text-shadowed-3 pb-save-action";
            h.textContent = "DELETE";
            h.addEventListener("click", () => {
              if (confirm("Delete pack \"" + n.Sa + "\"?")) {
                N.default.lp(n.Qa);
                D();
              }
            });
            u.appendChild(f);
            u.appendChild(l);
            u.appendChild(h);
            r.appendChild(u);
            x.appendChild(r);
          });
        }
        function z() {
          for (let n = 0; n < ye.length; n++) {
            const t = m[n + 1];
            if (!t) {
              continue;
            }
            t.innerHTML = "";
            const e = ye[n].Cg;
            for (let n = 0; n < e.length; n++) {
              t.appendChild(p(e[n]));
            }
          }
        }
        function U() {
          dn.Id();
          ci();
          k().hp();
        }
        function S(n) {
          const t = n[(0, ie.ua)("_name")];
          if (c) {
            c.value = typeof t == "string" ? t : "";
          }
          const e = n[(0, ie.ua)("_author")];
          if (a) {
            a.value = typeof e == "string" ? e : "";
          }
          const o = n[(0, ie.ua)("_version")];
          if (s) {
            s.value = o != null && o !== "" ? o + "" : "";
          }
        }
        function H(n) {
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
          S(n);
          z();
        }
        function G() {
          for (const n in l) {
            return;
          }
          const n = N.default.dp();
          if (n) {
            H(n);
          }
        }
        function V(t) {
          if (!N.default.kp(t)) {
            return;
          }
          const o = N.default.dp();
          if (o) {
            H(o);
            U();
            D();
          } else {
            window.location.reload();
          }
        }
        function j() {
          N.default.kp(null);
          for (const n in l) {
            delete l[n];
          }
          for (const n in h) {
            delete h[n];
          }
          if (c) {
            c.value = "";
          }
          if (a) {
            a.value = "";
          }
          if (s) {
            s.value = "";
          }
          z();
          U();
          D();
        }
        function F(t) {
          const o = R().da && R().da["pack-builder"];
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
          G();
          const r = R().da.settings;
          if (r) {
            r.hide();
          }
          D();
          o.show();
        }
        x.className = "pb-saves-list scrollbar";
        y.appendChild(x);
        r.appendChild(y);
        m.push(y);
        ye.forEach((t, e) => {
          const i = e + 1;
          b(t.xg, i);
          const c = document.createElement("div");
          c.className = "pb-section";
          for (let n = 0; n < t.Cg.length; n++) {
            c.appendChild(p(t.Cg[n]));
          }
          r.appendChild(c);
          m.push(c);
        });
        _(0);
        if (u) {
          u.addEventListener("change", () => {
            const e = d;
            d = null;
            const o = u.files && u.files[0];
            if (!e || !o) {
              return;
            }
            const i = new FileReader();
            i.onload = () => {
              const o = (i.result || "") + "";
              if (o) {
                e.set(o);
              }
            };
            i.readAsDataURL(o);
          });
        }
        T.addEventListener("click", () => {
          const e = C();
          if (E(e) === 0) {
            alert("Set at least one asset (and a Name) before saving.");
            return;
          }
          const o = c && c.value.trim() || "My Pack";
          const i = JSON.stringify(e);
          const r = N.default.Pd();
          if (r) {
            if (!N.default.gp(r, o, i)) {
              alert("Could not save the pack. Browser storage may be full (uploaded images can be large, try image URLs instead).");
              return;
            }
          } else {
            const n = N.default.wp(o, i);
            if (!n) {
              alert("Could not save the pack. Browser storage may be full (uploaded images can be large, try image URLs instead).");
              return;
            }
            N.default.kp(n);
          }
          D();
        });
        L.addEventListener("click", () => {
          if (confirm("Reset everything to the game defaults? This deactivates the current pack; your saved packs are kept.")) {
            j();
          }
        });
        if (A && f) {
          A.addEventListener("click", () => {
            f.value = "";
            f.click();
          });
          f.addEventListener("change", () => {
            const n = f.files && f.files[0];
            if (!n) {
              return;
            }
            const t = new FileReader();
            t.onload = () => {
              const e = n[(0, ie.ua)("name")];
              const o = typeof e == "string" ? e.replace(/\.json$/i, "") : "";
              if (N.default.wp(o, (t.result || "") + "")) {
                D();
              } else {
                alert("Could not parse that .json pack.");
              }
            };
            t.onerror = () => alert("Could not read the file.");
            t.readAsText(n);
          });
        }
        Vi = F;
        e.addEventListener("click", () => F(true));
      }
      function Ii(n, t) {
        mo = n * ko / Qe;
        vo = t * ko / Qe;
      }
      function Ji(n) {
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
        const o = (e - xo) / 1000;
        xo = e;
        Lo.push(o);
        if (Lo.length >= 32) {
          const n = 1 / qe(Lo);
          const e = Ye(Lo);
          let o = false;
          if (n > 40 || n > 10 && e < 0.0001 || n > 20 && e < 0.001) {
            o = true;
          }
          Eo = !!o;
          Lo.length = 0;
        }
        if (!Eo || !(o > Eo)) {
          Et(false);
          wo = n.clientX;
          po = n.clientY;
          Ii(wo, po);
          if (!$i(mo, vo)) {
            zc(Fi());
          }
        }
      }
      function Xi(n) {
        if (n.isTrusted) {
          Et(false);
          wo = n.clientX;
          po = n.clientY;
          Ii(wo, po);
          tr(mo, vo);
        }
      }
      function Qi(n) {
        if (n.isTrusted) {
          wo = n.clientX;
          po = n.clientY;
          Ii(wo, po);
          nr(mo, vo);
          Uc();
        }
      }
      function $i(n, t) {
        let o = false;
        for (let e = 0, i = ro.gk; e < i.length; e++) {
          if (i[e].hk(n, t)) {
            Gc(ro.fk[e]);
            if (st && Z()[ro.fk[e]].Zk === 3) {
              Dc(wt);
            }
            o = true;
          }
        }
        for (let e = 0, i = ro.kk; e < i.length; e++) {
          if (i[e].hk(n, t)) {
            Vc(ro.wk[e]);
            o = true;
          }
        }
        if (bo) {
          for (let i = 0, r = io.ew; i < r.length; i++) {
            if (io.nw[0] && r[i].hk(n, t)) {
              o = true;
            }
          }
        }
        if (Vo.hk(n, t)) {
          o = true;
        }
        if (No.hk(n, t)) {
          o = true;
        }
        if (Go.hk(n, t)) {
          o = true;
        }
        if (ao.cg.hk(n, t)) {
          o = true;
        }
        return o;
      }
      function nr(n, t) {
        for (let e = 0, o = ro.gk; e < o.length; e++) {
          o[e].hk(n, t);
        }
        for (let e = 0, o = ro.kk; e < o.length; e++) {
          o[e].hk(n, t);
        }
        for (let o = 0, i = io.ew; o < i.length; o++) {
          if (i[o].hk(n, t) && io.nw[0]) {
            Zc(o === 0);
            io.nw.shift();
          }
        }
        if (Vo.hk(n, t)) {
          Pi(!Uo);
        }
        if (No.hk(n, t)) {
          br(!So);
        }
        if (Go.hk(n, t)) {
          Ri(!Ho);
        }
        if (ao.cg.hk(n, t)) {
          ao.ag = !ao.ag;
        }
      }
      function tr(n, t) {
        for (let e = 0, o = ro.gk; e < o.length; e++) {
          o[e].hk(n, t);
        }
        for (let e = 0, o = ro.kk; e < o.length; e++) {
          o[e].hk(n, t);
        }
        for (let e = 0, o = io.ew; e < o.length; e++) {
          o[e].hk(n, t);
        }
        ao.cg.hk(n, t);
      }
      function er() {
        homepage.classList.add("fade-in");
      }
      function or(n) {
        const e = R().get("homepage");
        if (n) {
          const n = er;
          setTimeout(function () {
            e.classList.remove("fade-in");
            e.style.display = "flex";
            setTimeout(n, 50);
          }, 10);
        } else {
          e.style.display = "none";
        }
      }
      function ir(n) {
        if (Ze && n instanceof window.KeyboardEvent && n.isTrusted && n.target) {
          _t(n);
        }
      }
      function rr(n) {
        if (Ze && n instanceof window.KeyboardEvent && n.isTrusted && n.target) {
          bt(n);
        }
      }
      function cr(n, t, e, o, r) {
        hi.pp = n;
        hi.mp = t;
        hi.port = e;
        hi.vp = o;
        hi.Sa = r;
        li = 1;
        if (Hi && Ni) {
          n = Gi || false;
          t = Hi;
          e = Ni;
        }
        r = r || "a server";
        R().ns("Connecting to " + r + "...");
        if (Ce) {
          Ce.close();
        }
        go = false;
        Ze = false;
        Mo = 0;
        yo = 0;
        fo = false;
        lo.vs = false;
        Ce = new xe("" + (n ? Ge : Ve) + je + t + Re + (n ? Pe : e) + Fe);
        gr();
        _();
        so.wa();
        io.wa();
        rc();
        Ce.binaryType = "arraybuffer";
        Ce.onclose = n => {
          R().ts();
          jr(n);
          li = 0;
        };
        Ce._p = n => {
          R().ts();
          li = 0;
        };
        Ce.onopen = n => {
          R().ts();
          Vr();
          li = 2;
        };
        Ce.onmessage = n => {
          Gr(n);
        };
      }
      function ar() {
        aiptag.cmd.display.push(function () {
          aipDisplayTag.display("lostworld-io_300x250_2");
        });
        aiptag.cmd.display.push(function () {
          aipDisplayTag.display("lostworld-io_300x250_1");
        });
      }
      function sr(n) {
        Do = n;
      }
      function ur(n) {
        Bo = n;
      }
      function fr() {
        ko = Yo ? window.devicePixelRatio : 1;
        We.width = window.innerWidth * ko;
        We.height = window.innerHeight * ko;
        We.style.width = window.innerWidth + "px";
        We.style.height = window.innerHeight + "px";
        Ui = We.width;
        Si = We.height;
        ji();
        window.innerHeight;
        window.innerWidth;
        Di = We.width / Qe;
        zi = We.height / Qe;
        Oe.setTransform(Qe, 0, 0, Qe, 0, 0);
        yr();
      }
      function lr(n = true) {
        var e = new XMLHttpRequest();
        e.open("GET", "https://token.sploop.io/" + Ie + "?v=" + Math.random() * 100000, true);
        e.send(null);
        e.onreadystatechange = function () {
          if (e.readyState === 4 && e.status === 200) {
            o = e.responseText;
            const t = B[11](o, 13, 9, 252);
            Xe = t;
            if (n) {
              uo.Ew();
            }
          }
          var o;
        };
      }
      function hr() {
        fr();
        dr();
        lr();
      }
      function dr() {
        Oe.clearRect(0, 0, Di, zi);
        const t = N.default.Rd("oob_color");
        if (t) {
          Oe.fillStyle = t;
          Oe.fillRect(0, 0, Di, zi);
        }
        const e = +new Date();
        const o = (e - zo) / 1000;
        zo = e;
        const r = p.get(To);
        if (r) {
          eo.Ja(r.mh, r.bh, o);
        }
        if (go) {
          if (Le > 0) {
            Le++;
            if (Le > 6000) {
              Array.prototype.pop = Array.prototype.shift;
              Le = 0;
            }
          }
          M(o, e);
          if (yo) {
            Mr(o);
          }
        }
        Oe.save();
        Ur(Oe, o);
        Oe.restore();
        if (Ze) {
          Oe.save();
          xr(Oe, o);
          Oe.restore();
        } else {
          ae().vs();
        }
        window.requestAnimationFrame(dr);
      }
      function kr() {
        for (let t = 1; t < J().length; t++) {
          mr(t, 0);
        }
      }
      function gr() {
        for (let n, t = 1; t < J().length; t++) {
          n = J()[t];
          if (n !== undefined && n.bp === 2) {
            n.bp = 1;
            document.getElementsByClassName("hat_action_button")[t - 1].innerHTML = "EQUIP";
          }
        }
      }
      function wr(n, t, e, o) {
        const c = k().yp({
          Mp: "menu-item subcontent-bg",
          parent: bi
        });
        k().yp({
          parent: c,
          Mp: "header",
          tag: "p",
          text: t ? oo.fg[n].Sa : io.tw[n].Sa
        });
        if (t && e && n !== Mo || !t) {
          const e = k().yp({
            parent: c,
            Mp: "menu-pricing"
          });
          k().yp({
            parent: e,
            Mp: "orange-button text-shadowed-3 action clan_action_button",
            Tp: t ? "KICK" : "JOIN",
            tag: "button",
            onmouseup: t ? n => {
              if (n.isTrusted) {
                Oc(o);
              }
            } : t => {
              if (t.isTrusted) {
                Ic(n);
              }
            }
          });
        }
      }
      function pr(n, t, e, o) {
        const c = n + " - " + e;
        k().yp({
          parent: di,
          tag: "option",
          text: c
        }).setAttribute("region", o);
      }
      function mr(n, t) {
        if (J()[n] === undefined) {
          return;
        }
        const o = J()[n].Ok || "";
        const r = J()[n].Sa || "";
        const c = J()[n].description || "";
        const a = t === 1 ? "EQUIP" : t === 2 ? "UNEQUIP" : "BUY";
        const s = k().yp({
          Mp: "menu-item",
          parent: _i,
          style: J()[n].Ap ? "display:none" : ""
        });
        k().yp({
          tag: "img",
          src: W[J()[n].ik].src,
          parent: s
        });
        const u = k().yp({
          parent: s,
          Mp: "column-flex column-flex-extra"
        });
        k().yp({
          parent: u,
          Mp: "header",
          tag: "p",
          Tp: r
        });
        k().yp({
          parent: u,
          Mp: "description",
          tag: "p",
          Tp: c
        });
        const f = k().yp({
          parent: s,
          Mp: "menu-pricing"
        });
        k().yp({
          parent: f,
          Mp: "pricing hat_price_tag",
          Tp: o,
          tag: "p"
        });
        k().yp({
          parent: f,
          Mp: "orange-button text-shadowed-3 action hat_action_button",
          Tp: a,
          tag: "button",
          onmouseup: t => {
            if (t.isTrusted && t.target && So) {
              Xc(n);
            }
          }
        });
      }
      function vr(n) {
        xi.style.display = n ? "flex" : "none";
        if (n) {
          if (Ho) {
            Ri(false);
          }
          if (Uo) {
            Pi(false);
          }
        }
        So = n;
      }
      Yi();
      Ki();
      kr();
      hr();
      let _r = false;
      function br(n) {
        if (n) {
          return !_r && (_r = true, void setTimeout(() => {
            vr(n);
            _r = false;
          }, Math.random() * 100 + 50));
        } else {
          return vr(n);
        }
      }
      function yr() {
        for (let t = 0, e = St.gk; t < e.length; t++) {
          let o = e[t];
          o.mh = Di / 2 - e.length * 107 / 2 + t * 107;
          o.bh = zi - o.height - 5;
        }
        for (let n = 0, t = St.kk; n < t.length; n++) {
          let e = t[n];
          e.mh = Di / 2 - t.length * 107 / 2 + n * 107;
          e.bh = 5;
        }
        const t = ro.vk;
        t.mh = Di / 2 - t.width / 2;
        t.bh = zi - 100 - 10 - t.height;
        const e = ao.cg;
        e.mh = Di - e.width - 11;
        e.bh = 5;
        Go.bh = 5;
        Go.mh = e.mh - e.width - 11;
        No.bh = 5;
        No.mh = Go.mh - Go.width - 11;
        Vo.bh = 5;
        Vo.mh = No.mh - No.width - 11;
        const o = ao;
        o.bh = 0;
        o.mh = Di - o.width - 5;
        for (let n = 0, t = io.ew; n < t.length; n++) {
          let e = t[n];
          e.mh = Di - t.length * 107 + n * 107;
          e.bh = o.height + 110;
        }
      }
      function Mr(n) {
        Bt(n);
        if (st) {
          let n = ut;
          let t = ft;
          if (t.Qa !== -1) {
            if (k().Og(t.ck, t.ak, t.sk, t.uk) > 5) {
              let n = k().Zg(t.ck, t.ak, t.sk, t.uk);
              if (p.get(yo)) {
                p.get(yo)._h = n;
              }
              if (n !== wt && pt >= c().Lp) {
                jc(e = n);
                wt = e;
                pt = 0;
              }
              if (!vt) {
                xt(n);
              }
            }
          } else if (vt) {
            Lt(wt);
          }
          if (k().Og(n.ck, n.ak, n.sk, n.uk) > 5) {
            if (n.Qa !== -1) {
              let t = k().Zg(n.ck, n.ak, n.sk, n.uk);
              if (t !== ht && mt >= c().Lp) {
                At(t);
              }
            } else if (ht !== null) {
              ht = null;
              qc();
            }
          }
        } else {
          const n = Fi();
          if (p.get(yo)) {
            p.get(yo)._h = n;
          }
          if (n !== wt && pt >= c().Lp) {
            Ct(n);
          }
        }
        var e;
        const o = document.activeElement.type === "text" ? 0 : lt;
        if (o !== kt) {
          Yc(o);
          kt = o;
        }
      }
      function Tr(n) {
        const e = W[F().No];
        k().nk(n, e, Di - e.Qd.tk, zi - e.Qd.ek - 5, e.Qd.tk, e.Qd.ek);
        const o = ro.Ek;
        n.drawImage(o, Di - o.width - 5, zi - e.Qd.ek + 15);
        const r = ro.zk;
        n.drawImage(r, Di - r.width - 5, zi - e.Qd.ek + 69);
        const c = ro.Dk;
        n.drawImage(c, Di - c.width - 5, zi - e.Qd.ek + 122);
        const a = ro.Uk;
        n.drawImage(a, Di - a.width - 5, zi - e.Qd.ek + 186);
      }
      function Ar(n, t, e) {
        for (let n, e = 0, o = io.ew; e < o.length; e++) {
          n = o[e];
          n.lk(t);
        }
        let r = oo.fg[n];
        let a = io.ew[0];
        t.drawImage(r.xg = k().Bk(r.Sa, c().xp, Xo(), "#222222"), a.mh, a.bh - r.xg.height);
      }
      function Lr() {
        return To !== yo;
      }
      function xr(n, t) {
        const o = Lr();
        const r = ro.vk;
        if (!o) {
          r.bk = N.default.Rd("age_bar_color") || "#F2C39F";
          r.yk = N.default.Rd("age_bar_bg_color") || "#5D3A37";
          r.lk(n);
        }
        if (!o) {
          ro.Nk ||= k().Bk("AGE 0", 24, N.default.Rd("age_color") || "#fff", "#222");
          const t = ro.Nk;
          n.drawImage(t, Di * 0.5 - t.width * 0.5, r.bh - t.height);
          for (let t, e = 0, o = ro.gk; e < o.length; e++) {
            t = o[e];
            t.lk(n);
            if (t.zs === 1 && !st) {
              let o = ro.fk[e];
              let i = Z()[o].Cp;
              ro.Gk.lk(n, o, ro.pk[i], c().Ep[i], t.mh, t.bh - 150);
            }
          }
          for (let t, e = 0, o = ro.kk; e < o.length; e++) {
            if (e === 0) {
              W[F().hi] ||= k().Bk("Choose item", 40, "#fff");
              const t = W[F().hi];
              n.drawImage(t, Di * 0.5 - t.width * 0.5, 110);
            }
            t = o[e];
            t.lk(n);
            if (t.zs === 1 && !st) {
              let o = ro.wk[e];
              let i = Z()[o].Cp;
              ro.Gk.lk(n, o, ro.pk[i], c().Ep[i], t.mh, t.bh + t.height);
            }
          }
        }
        if (ao.ag) {
          ao.lk(n, oo);
          const t = W[F().Ho];
          n.drawImage(t, Di - t.width - 5, 350);
          const o = ro.Sk;
          const i = ro.Hk;
          n.drawImage(o, Di - t.width - 10 - o.width, 350 + t.height / 2 - o.height / 2);
          if (ro.na > 0) {
            n.translate(0, 50);
            let o = W[F().Pr];
            k().nk(n, o, Di - 50 - 5, 350);
            n.drawImage(i, Di - t.width - 10 - i.width, 350 + t.height / 2 - i.height / 2);
            n.translate(0, -50);
          }
        }
        so.ww(n);
        No.lk(n);
        Vo.lk(n);
        Go.lk(n);
        ao.cg.lk(n);
        Tr(n);
        to.Ug(n, t);
        if (co.mg) {
          co.Ja(t);
          const o = 0.7 + Math.min(1, k().Dp.Bp(co.mg)) / 2;
          const i = co.rg;
          const r = i.width * o || 1;
          const c = i.height * o || 1;
          n.save();
          n.globalAlpha = co.mg;
          n.drawImage(co.rg, Di * 0.5 - r / 2, 50 - c / 2, r, c);
          n.restore();
        }
        if (ut.Qa !== -1) {
          Cr(n, ut.ck, ut.ak, ut.sk, ut.uk);
        }
        if (ft.Qa !== -1) {
          Cr(n, ft.ck, ft.ak, ft.sk, ft.uk);
        }
        if (io.nw[0]) {
          Ar(io.nw[0], n);
        }
        if (jo && Bi) {
          n.drawImage(Bi, 0, 0);
        }
      }
      function Cr(n, t, e, o, r) {
        n.save();
        let a = ko / Qe;
        let s = o - t;
        let u = r - e;
        n.beginPath();
        n.arc(t * a, e * a, 90, 0, Math.PI * 2, false);
        n.closePath();
        n.fillStyle = "rgba(79, 64, 60, 0.6)";
        n.fill();
        let f = s;
        let l = u;
        let h = Math.sqrt(f ** 2 + l ** 2);
        let d = h > 90 ? h / 90 : 1;
        f /= d;
        l /= d;
        n.beginPath();
        n.arc(t * a + f, e * a + l, 45, 0, Math.PI * 2, false);
        n.closePath();
        n.fillStyle = "#fff";
        n.fill();
        n.restore();
      }
      function Er(n, t) {
        let o = W[F().Vi];
        for (let t = 0, i = m[s().un], r = i.length; t < r; t++) {
          const r = i[t];
          const a = oo.fg[r.Uh];
          const s = J()[r.gh];
          if (!(r.zs & h().Pc) && (!s.zp || r.Uh === Mo)) {
            let t = r.wh ? io.tw[r.wh] : null;
            let i = t && t.length !== 0 ? t.xg = k().Bk("[" + t.Sa + "]", c().xp, N.default.Rd("clan_tag_color") || "#96C949", "#222222") : null;
            let s = t && t.Uh === r.Uh;
            const u = a.xg ||= k().Bk(a.Sa, c().xp, Xo(), "#222222");
            let f = u.width + (i ? i.width + (s ? o.Qd.tk : 0) : 0);
            r.$d = Math.floor(r.mh / 5) !== Math.floor(r.Mh / 5) || Math.floor(r.bh / 5) !== Math.floor(r.Ah / 5) || Math.floor(r._h) !== Math.floor(r.Bh) ? 1 : 0;
            if ((!r.Vh || r.$d) && i) {
              n.drawImage(i, r.mh - f / 2, r.bh - c().Up - i.height / 2);
            }
            if (!r.Vh || r.$d) {
              n.drawImage(u, r.mh - f / 2 + (i ? i.width : 0), r.bh - c().Up - u.height / 2);
            }
            let l = 0;
            if (r.Nh > 0 && (!r.Vh || r.$d)) {
              const t = W[F().Hr][r.Nh - 1];
              l += t.Qd.tk;
              k().nk(n, t, r.mh - f / 2 + (i ? i.width : 0) + u.width, r.bh - c().Up - t.Qd.ek / 2 - 6, t.Qd.tk, t.Qd.ek);
            }
            if (s) {
              k().nk(n, o, r.mh - f / 2 + (i ? i.width : 0) + l + u.width + 4, r.bh - c().Up - o.Qd.ek - 6);
            }
            if (!r.Vh || r.$d) {
              bn(r, n, bo && bo === r.wh || Mo && Mo === r.Uh);
            }
            if (r.Vh > 0) {
              _n(r, n);
            }
          }
        }
        if (Po) {
          for (let t = 0; t < Ae.length; t++) {
            const e = m[Ae[t]];
            for (let t = 0; t < e.length; t++) {
              const o = e[t];
              if (Mo && Mo === o.Uh) {
                const t = W[F().tc];
                k().nk(n, t, o.mh - t.Qd.tk / 2, o.bh - t.Qd.ek / 2, t.Qd.tk, t.Qd.ek);
              }
            }
          }
        }
        for (let t, o = 0, i = m[s()._n], r = i.length; o < r; o++) {
          t = i[o];
          Ot[s()._n] ||= k().Bk("Cow", c().xp, Qo(), "#222222");
          const r = Ot[s()._n];
          n.drawImage(r, t.mh - r.width / 2, t.bh - c().Up - r.height / 2);
          bn(t, n, false);
        }
        for (let t, o = 0, i = m[s().Rn], r = i.length; o < r; o++) {
          t = i[o];
          Ot[s().Rn] ||= k().Bk("Duck", c().xp, Qo(), "#222222");
          const r = Ot[s().Rn];
          n.drawImage(r, t.mh - r.width / 2, t.bh - c().Up - r.height / 2);
          bn(t, n, false);
        }
        let r = null;
        let a = 0;
        let u = p.get(yo);
        for (let t, o = 0, i = m[s().Dn], f = i.length; o < f; o++) {
          t = i[o];
          if (u) {
            let n = k().Og(u.mh, u.bh, t.mh, t.bh);
            if (n < c().Sp && (!r || n < a)) {
              r = t;
              a = n;
            }
          }
          Ot[s().Dn] ||= k().Bk("Golden Cow", c().xp, Qo(), "#222222");
          const f = Ot[s().Dn];
          n.drawImage(f, t.mh - f.width / 2, t.bh - c().Up - f.height / 2);
          bn(t, n, false);
        }
        for (let t, o = 0, i = m[s().En], r = i.length; o < r; o++) {
          t = i[o];
          Ot[s().En] ||= k().Bk("Shark", c().xp, Qo(), "#222222");
          const e = Ot[s().En];
          n.drawImage(e, t.mh - e.width / 2, t.bh - c().Up - e.height / 2);
          bn(t, n, false);
        }
        for (let t, o = 0, i = m[s().Zn], r = i.length; o < r; o++) {
          t = i[o];
          Ot[s().Zn] ||= k().Bk("Crocodile", c().xp, Qo(), "#222222");
          const r = Ot[s().Zn];
          n.drawImage(r, t.mh - r.width / 2, t.bh - c().Up - r.height / 2);
          bn(t, n, false);
        }
        for (let t, o = 0, i = m[s().Bn], r = i.length; o < r; o++) {
          t = i[o];
          Ot[s().Bn] ||= k().Bk("Wolf", c().xp, Qo(), "#222222");
          const r = Ot[s().Bn];
          n.drawImage(r, t.mh - r.width / 2, t.bh - c().Up - r.height / 2);
          bn(t, n, false);
        }
        if (r) {
          Ao = r.Qa;
          W[F().Ar] ||= k().Bk("[Interact]", 24, "#fff", "#222222");
          const t = W[F().Ar];
          n.drawImage(t, r.mh - t.width / 2, r.bh - 40 - t.height / 2);
        } else {
          Ao &&= 0;
        }
        for (let t, e = 0, o = m[s().Sn], i = o.length; e < i; e++) {
          t = o[e];
          Ot[s().Sn] ||= k().Bk("Mammoth", c().xp, Qo(), "#222222");
          const i = Ot[s().Sn];
          n.drawImage(i, t.mh - i.width / 2, t.bh - c().Up - i.height / 2);
          bn(t, n, false);
        }
        for (let t, e = 0, o = m[s().Un], i = o.length; e < i; e++) {
          t = o[e];
          Ot[s().Un] ||= k().Bk("Dragon", c().xp, Qo(), "#222222");
          const i = Ot[s().Un];
          n.drawImage(i, t.mh - i.width / 2, t.bh - c().Up - i.height / 2);
          bn(t, n, false);
        }
        for (let t = 0, o = m[s().un], i = o.length; t < i; t++) {
          const i = o[t];
          const r = oo.fg[i.Uh];
          const a = J()[i.gh];
          if (Ro > (a.zp ?? false)) {
            const t = r.Hp ||= k().Bk("ID " + r.Qa, c().xp, "#00FFFF", "#000000");
            n.drawImage(t, i.mh - t.width / 2, i.bh - c().Up - 52.5);
          }
        }
      }
      function Br(n, t, e, o) {
        const a = parseFloat(N.default.Rd("grid_cell_width")) || c().Np;
        const s = parseFloat(N.default.Rd("grid_cell_height")) || c().Np;
        const u = N.default.Rd("grid_opacity");
        const f = u === null || u === "" || u === undefined ? 0.06 : parseFloat(u) || 0;
        const l = N.default.Rd("grid_color") || "#000000";
        const h = Math.floor(t / a) * a;
        const d = Math.floor(e / s) * s;
        const k = (Ui + a) / o;
        const g = (Si + s) / o;
        n.save();
        n.lineWidth = 4;
        n.globalAlpha = f;
        n.strokeStyle = l;
        n.beginPath();
        for (let t = 0; t <= k; t += a) {
          n.moveTo(h + t, d);
          n.lineTo(h + t, d + g);
        }
        for (let t = 0; t <= g; t += s) {
          n.moveTo(h, d + t);
          n.lineTo(h + k, d + t);
        }
        n.stroke();
        n.restore();
      }
      function Dr(n, t) {
        fi.Ww = eo.mh - Di * 0.5;
        fi.Ow = eo.bh - zi * 0.5;
        fi.Zw = eo.mh + Di * 0.5;
        fi.Iw = eo.bh + zi * 0.5;
        let o = $e;
        for (let t, i = 0, r = Xt().length; i < r; i++) {
          t = Xt()[i];
          if (k().Gp(o, t, fi)) {
            let i = ke(t.Vp);
            let r = !i && Oo ? de(n, t.Vp) : null;
            if (r) {
              n.fillStyle = t.bk;
              n.fillRect(o.mh, o.bh, o.w, o.td);
              n.fillStyle = r;
            } else {
              n.fillStyle = i || t.bk;
            }
            n.fillRect(o.mh, o.bh, o.w, o.td);
          }
        }
      }
      function zr(n, t) {
        if (lo.Fw) {
          lo.Pw += t;
          if (lo.Pw <= lo.transition) {
            lo.mw = k().Yh(lo.Nw, lo.Mw, lo.Pw / lo.transition);
            lo.pw = k().Yh(lo.Gw, lo.Aw, lo.Pw / lo.transition);
            lo.bw = k().Yh(lo.Vw, lo.yw, lo.Pw / lo.transition);
            lo._w = k().Yh(lo.jw, lo.Tw, lo.Pw / lo.transition);
          } else {
            lo.Fw = false;
            lo.mw = lo.Mw;
            lo.pw = lo.Aw;
            lo.bw = lo.yw;
            lo._w = lo.Tw;
          }
        }
        n.globalAlpha = 0.3;
        n.fillStyle = "red";
        let o = ho;
        let r = $e;
        o.Ww = 0;
        o.Ow = 0;
        o.Zw = c().Vg;
        o.Iw = lo.pw;
        if (k().Gp(r, o, fi)) {
          n.fillRect(r.mh, r.bh, r.w, r.td);
        }
        o.Ww = 0;
        o.Ow = 0;
        o.Zw = lo.mw;
        o.Iw = c().jg;
        if (k().Gp(r, o, fi)) {
          n.fillRect(r.mh, r.bh, r.w, r.td);
        }
        o.Ww = lo.bw;
        o.Ow = 0;
        o.Zw = c().Vg;
        o.Iw = c().jg;
        if (k().Gp(r, o, fi)) {
          n.fillRect(r.mh, r.bh, r.w, r.td);
        }
        o.Ww = 0;
        o.Ow = lo._w;
        o.Zw = c().Vg;
        o.Iw = c().jg;
        if (k().Gp(r, o, fi)) {
          n.fillRect(r.mh, r.bh, r.w, r.td);
        }
        n.globalAlpha = 1;
      }
      function Ur(n, t) {
        n.translate(Di * 0.5 - eo.mh, zi * 0.5 - eo.bh);
        Dr(n);
        if (Fo) {
          Br(n, eo.mh - Di * 0.5, eo.bh - zi * 0.5, Qe);
        }
        wn(n, t);
        vn(n);
        if (lo.vs) {
          zr(n, t);
        }
        Er(n);
        to.Ja(n, t * 1000);
      }
      function Sr(n) {
        for (let t in Pt().ke) {
          if (Pt().ke[t] === n) {
            return t;
          }
        }
      }
      let Hr = new Uint8Array(4096);
      let Nr = 0;
      function Gr(n) {
        const t = n.data;
        if (typeof t == "string") {
          const n = JSON.parse(t);
          switch (n[0]) {
            case Pt().ke.Te:
              Rr(n);
              break;
            case Pt().ke.Xe:
              qr(n);
              break;
            case Pt().ke.Je:
              Ce.send(window[re().ua("solve")](n[1]));
              break;
            case Pt().ke.we:
              Lc(n);
              break;
            case Pt().ke.Se:
              bc(n);
              break;
            case Pt().ke.be:
              vc(n);
              break;
            case Pt().ke.xe:
              $r(n);
              break;
            case Pt().ke.Ce:
              Zr();
              break;
            case Pt().ke.Le:
              gc(n);
              break;
            case Pt().ke.Me:
              ec(n);
              break;
            case Pt().ke.Be:
              Ir(n[1]);
              break;
            case Pt().ke.Ie:
              nc(n);
          }
        } else {
          let n = new Uint8Array(t);
          Nr = n.byteLength;
          if (c().Eg !== 1) {
            S(Hr, n);
          } else {
            Hr = n;
          }
          switch (Hr[0]) {
            case Pt().ke.ge:
              Tc();
              break;
            case Pt().ke._e:
              yc();
              break;
            case Pt().ke.He:
              _c();
              break;
            case Pt().ke.pe:
              Ac();
              break;
            case Pt().ke.De:
              Yr();
              break;
            case Pt().ke.ve:
              Mc();
              break;
            case Pt().ke.Ae:
              mc();
              break;
            case Pt().ke.Ve:
              pc();
              break;
            case Pt().ke.Ee:
              tc();
              break;
            case Pt().ke.Ue:
              wc();
              break;
            case Pt().ke.me:
              break;
            case Pt().ke.ye:
              ic();
              break;
            case Pt().ke.ze:
              kc();
              break;
            case Pt().ke.je:
              cc();
              break;
            case Pt().ke.Qe:
              Pr();
              break;
            case Pt().ke.Ke:
              oc();
              break;
            case Pt().ke.Pe:
              fc();
              break;
            case Pt().ke.Fe:
              rc();
              break;
            case Pt().ke.Re:
              lc();
              break;
            case Pt().ke.qe:
              hc();
              break;
            case Pt().ke.Ye:
              uc();
              break;
            case Pt().ke.We:
              sc();
              break;
            case Pt().ke.Ge:
              ac();
              break;
            case Pt().ke.Ze:
              Qr();
              break;
            case Pt().ke.Oe:
              Xr();
          }
        }
      }
      function Vr() {
        U();
      }
      function jr(n) {
        switch (n.code) {
          case Pt().Co.jp:
            alert("disconnected: Banned");
            break;
          case Pt().Co.Fp:
            alert("disconnected: Kicked");
            break;
          case Pt().Co.Pp:
            alert("disconnected: not iNITIALISED");
            break;
          case Pt().Co.Rp:
            alert("disconnected: player already exists");
            break;
          case Pt().Co.qp:
            alert("disconnected: is hacker");
            break;
          case Pt().Co.Yp:
            alert("disconnected: token invalid, try reloading?");
            break;
          case Pt().Co.Kp:
            alert("disconnected: unknown");
            break;
          case Pt().Co.Wp:
            Fr();
            break;
          case Pt().Co.Op:
            alert("Client Encryption unable to be established, try reloading?");
            break;
          case 1006:
            alert("Your internet has disconnected, you have been banned or kicked, or a error has occurred");
        }
        go = false;
        Ze = false;
      }
      function Fr() {
        lr(false);
      }
      function Pr() {
        let t = Hr[1] | Hr[2] << 8;
        const e = Ne.decode(new Uint8Array(Hr.buffer, 3, Nr - 3));
        to.Ng(t, (oo.fg[t] ? oo.fg[t].Sa : "XX") + ": " + e);
      }
      function Rr(n) {
        Mo = n[1];
        const e = n[2];
        for (let n = 0; n < e + 1; n++) {
          oo.Ig(n, "", 0);
        }
        for (let n = 0; n < 20; n++) {
          io.rw(n, "", 0);
        }
        for (let e, o = 0, i = n[3]; o < i.length; o++) {
          e = i[o];
          oo.Qg(e[0], ui ? "Sploop" + e[0] : e[1], e[2], true);
        }
        for (let t, e = 0, o = n[4]; e < o.length; e++) {
          t = o[e];
          io.aw(t[0], t[1], t[2]);
        }
        dc();
        const o = n[5];
        if (o) {
          switch (o[0]) {
            case "BR":
              {
                const [n, t, e, i, r, c, a, s, u, f, l, h, d, k, g, w] = o;
                lo.vs = true;
                lo.Fw = t;
                lo.Pw = e;
                lo.transition = i;
                lo.mw = r;
                lo.pw = c;
                lo.bw = a;
                lo._w = s;
                lo.Nw = u;
                lo.Gw = f;
                lo.Vw = l;
                lo.jw = h;
                lo.Mw = d;
                lo.Aw = k;
                lo.yw = g;
                lo.Tw = w;
                break;
              }
          }
        }
        go = true;
      }
      function qr(n) {
        switch (n[1]) {
          case "BR":
            {
              const [t, e, o, i, r, c, a, s, u, f, l, h, d, k, g, w, p] = n;
              lo.Fw = o;
              lo.Pw = i;
              lo.transition = r;
              lo.mw = c;
              lo.pw = a;
              lo.bw = s;
              lo._w = u;
              lo.Nw = f;
              lo.Gw = l;
              lo.Vw = h;
              lo.jw = d;
              lo.Mw = k;
              lo.Aw = g;
              lo.yw = w;
              lo.Tw = p;
              break;
            }
        }
      }
      function Yr() {
        const n = Hr[1] | Hr[2] << 8;
        const t = p.get(n);
        if (t) {
          t.wh = Hr[3];
          t.ph = Hr[4];
        }
      }
      function Kr() {
        if (fo) {
          if (li === 0) {
            cr(hi.pp, hi.mp, hi.port, hi.vp, hi.Sa);
          } else {
            if (!go) {
              return;
            }
            Kc(Ei.value);
            Je = 1;
          }
        }
      }
      function Wr(n) {
        Je = n;
      }
      function Or() {
        Kr();
      }
      function Zr(n) {
        //le().xs(); ADS EDIT ENDEDIT
        ro.tg();
        so.kw(eo.mh, eo.bh);
        gr();
        yo = To = 0;
        Ze = false;
        lt = 0;
        ro.wk.length = 0;
        or(true);
        ue().refresh();
      }
      function Ir(n) {
        co.Lf(n, 3);
      }
      function Jr(n, t, e) {
        switch (n) {
          case te().Dn:
          case te().Un:
          case te().Sn:
            co.Lf(oe()[n].description, 3);
            break;
          default:
            co.Lf("An event is underway!");
        }
        so.lw(new (Kt())(t / 255, e / 255));
      }
      function Xr() {
        Jr(Hr[1], Hr[2], Hr[3]);
      }
      function Qr() {
        co.Lf("Event has ended.");
        so.hw();
      }
      function $r(n) {
        ro.ng(n[1][qt().nn]);
      }
      function nc(n) {
        ro.eg(n[1]);
      }
      function tc() {
        const n = Math.max(0, Hr[1] | Hr[2] << 8 | Hr[3] << 16 | Hr[4] << 24);
        const t = Hr[5] | Hr[6] << 8 | Hr[7] << 16 | Hr[8] << 24;
        const e = Hr[9] | Hr[10] << 8 | Hr[11] << 16 | Hr[12] << 24;
        const o = Hr[13] | Hr[14] << 8 | Hr[15] << 16 | Hr[16] << 24;
        const i = Hr[17] | Hr[18] << 8 | Hr[19] << 16 | Hr[20] << 24;
        ro.Qk(n);
        ro.Xk(t, e, o, i);
      }
      function ec(n) {
        for (let t = 0; t < n[1].length; t++) {
          oo.$g(n[1][t][0], n[1][t][1]);
        }
        ao.Ja(oo, n[1]);
      }
      function oc() {
        for (let n = 1; n < Nr; n++) {
          ro.pk[n - 1] = Hr[n];
        }
      }
      function ic() {
        for (let t = 1; t < Nr; t += 5) {
          const e = Hr[t];
          const o = Hr[t + 1] | Hr[t + 2] << 8;
          const i = Hr[t + 3];
          let r = Hr[t + 4];
          const c = p.get(o);
          if (c) {
            switch (e) {
              case $t().D:
                if (c.qh && !c.Fh.value) {
                  let n = k().Zp(i);
                  c.qh.active = true;
                  c.qh.Kh = n;
                  c.Fh.Ip = c.Fh.Jp = 10;
                }
                break;
              case $t().C:
                let t = r ? Math.PI / 2 : Math.PI;
                let e = Z()[i];
                c.Fh.max = t;
                c.Fh.min = 0;
                const o = e.reload / 1000;
                c.Fh.Jp = c.Fh.max / (o * 0.25);
                c.Fh.Ip = c.Fh.max / (o * 0.75);
                c.Fh.Ja(0.01);
            }
          }
        }
      }
      function rc() {
        so.dw();
        pi.style.display = "block";
        wi.style.display = "none";
        bo = null;
        io.nw.length = 0;
        ki.innerHTML = "Clans";
        dc();
      }
      function cc() {
        pi.style.display = "none";
        wi.style.display = "block";
        let n = Hr[1];
        let t = Hr[2];
        bo = n;
        ki.innerText = io.tw[bo].Sa;
        k().Xp(bi);
        for (let n = 3; n < Nr; n++) {
          wr(Hr[n], true, t, n - 3);
        }
      }
      function ac() {
        Hc(Hr[1]);
      }
      function sc() {
        so.dw();
        for (let n = 1; n < Nr; n += 3) {
          let t = Hr[n + 0];
          let e = Hr[n + 1] / 255;
          let o = Hr[n + 2] / 255;
          if (t && t !== Mo) {
            so.gw(e, o);
          }
        }
      }
      function uc() {
        let n = Hr[1];
        k().Xp(bi);
        for (let t = 2; t < Nr; t++) {
          wr(Hr[t], true, n, t - 2);
        }
      }
      function fc() {
        let n = Hr[1];
        let t = Hr[2];
        let e = Ne.decode(new Uint8Array(Hr.buffer, 3, Nr - 3));
        io.aw(n, t, e);
        if (!n && Ho) {
          dc();
        }
      }
      function lc() {
        let n = Hr[1];
        io.cw(n);
        if (!n && Ho) {
          dc();
        }
      }
      function hc() {
        for (let n = 1; n < Nr; n++) {
          io.iw(Hr[n]);
        }
      }
      function dc() {
        k().Xp(bi);
        for (let n, t = 0, e = io.tw; t < e.length; t++) {
          n = e[t];
          if (n.active) {
            wr(t, false, false);
          }
        }
      }
      function kc() {
        for (let t = 1; t < Nr; t += 2) {
          const e = Hr[t];
          const o = Hr[t + 1];
          const i = o === 1 ? "EQUIP" : o === 2 ? "UNEQUIP" : "BUY";
          J()[e].bp = o;
          document.getElementsByClassName("hat_price_tag")[e - 1].style.display = o === 1 || o === 2 ? "none" : "block";
          document.getElementsByClassName("hat_action_button")[e - 1].innerHTML = i;
        }
      }
      function gc(n) {
        const e = p.get(n[2]);
        if (e) {
          to.Hg(e.mh, e.bh, 0.18, 800, n[1], n[3] === 0 ? N.default.Rd("damage_color") || "#fff" : N.default.Rd("heal_color") || "#8ecc51");
        }
      }
      function wc() {
        const t = Hr[1] | Hr[2] << 8;
        const e = Ne.decode(new Uint8Array(Hr.buffer, 3, Nr - 3));
        const o = p.get(t);
        if (!!o || !ui || o.Uh !== Mo && (!bo || bo !== o.wh)) {
          to.Gg(e, o);
        }
      }
      function pc() {
        let n = Hr[1] | Hr[2] << 8;
        Bi = k().Bk(n + "ms", c().xp, c().Jw, "#222222");
      }
      function mc() {
        const n = Hr[1];
        oo.Xg(n);
        ao.Ja(oo);
      }
      function vc(n) {
        oo.Qg(n[1], ui ? "Sploop" + n[1] : n[2], 0, true);
      }
      function _c() {
        ro.wk.length = 0;
        ro.ig();
        yr();
      }
      function bc(n) {
        const t = n[1];
        for (let n = 0; n < t.length; n++) {
          ro.wk.push(t[n]);
        }
        ro.ig();
        yr();
      }
      function yc() {
        if (Nr > 1) {
          ro.fk.length = 0;
          for (let t = 1; t < Nr; t++) {
            ro.fk.push(Hr[t]);
          }
          ro.Ja();
          yr();
        }
      }
      function Mc() {
        Ze = true;
        or(false);
        yo = Hr[1] | Hr[2] << 8;
        To = Hr[3] | Hr[4] << 8;
      }
      function Tc() {
        const n = +new Date();
        for (let t = 1; t < Nr; t += 19) {
          const e = Hr[t + 8];
          const o = Hr[t + 2] | Hr[t + 3] << 8;
          const i = Hr[t + 10];
          if (e & h().Rc) {
            x(o);
          } else {
            A(Hr[t], o, Hr[t + 1], Hr[t + 8], Hr[t + 4] | Hr[t + 5] << 8, Hr[t + 6] | Hr[t + 7] << 8, k().Zp(Hr[t + 9]), i, Hr[t + 11], Hr[t + 12], Hr[t + 13], Hr[t + 14], Hr[t + 15], Hr[t + 16], Hr[t + 17], Hr[t + 18], n);
          }
        }
      }
      function Ac() {
        Mo = Hr[1];
        const t = Te()(Mo, window[(0, ie.ua)("getMemTo")]());
        D(t[0], t[1], t[2], t[3]);
        Le = window["_$"]();
        const e = Xe;
        Be(new Uint8Array([Pt().$e.no, Hr[1], ...t, ...e]));
        fo = true;
      }
      function Lc(n) {
        or(false);
        Ze = true;
        yo = To = n[1];
        oo.Qg(Mo, n[2], n[3], true);
        ro.Qk(n[3]);
        ro.fk = n[4];
        let t = n[5];
        ro.Xk(t[0], t[1], t[2], t[3]);
        $r([Pt().ke.xe, n[6]]);
        if (n[7]) {
          Jr(n[7][1], n[7][2], n[7][3]);
        }
        ro.Ja();
        ro.ig();
        yr();
      }
      function xc() {}
      function Cc(n) {
        Be(new Uint8Array([Pt().$e.lo, ...Ke.encode(n)]));
      }
      function Ec(n) {
        Be(new Uint8Array([Pt().$e.xo, n]));
      }
      function Bc(n) {
        Be(new Uint8Array([Pt().$e.wo, +n]));
      }
      function Dc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Be(new Uint8Array([Pt().$e.bo, n & 255, n >> 8 & 255]));
      }
      function zc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Be(new Uint8Array([Pt().$e.ro, n & 255, n >> 8 & 255]));
      }
      function Uc() {
        Be(new Uint8Array([Pt().$e.co]));
      }
      function Sc(n) {
        Be(new Uint8Array([Pt().$e.so, n & 255, n >> 8]));
      }
      function Hc(n) {
        Be(new Uint8Array([Pt().$e.ko, n]));
      }
      function Nc(n) {
        Be(new Uint8Array([Pt().$e.uo, n]));
      }
      function Gc(n) {
        if (n != null) {
          Be(new Uint8Array([Pt().$e.io, n]));
        }
      }
      function Vc(n) {
        Be(new Uint8Array([Pt().$e.ho, n]));
      }
      function jc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Be(new Uint8Array([Pt().$e.oo, n & 255, n >> 8 & 255]));
      }
      function Fc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Be(new Uint8Array([Pt().$e.vo, n & 255, n >> 8 & 255]));
      }
      function Pc() {
        Be(new Uint8Array([Pt().$e._o]));
      }
      function Rc(n) {
        n = (n + Math.PI) * 65535 / (Math.PI * 2);
        Be(new Uint8Array([Pt().$e.po, n & 255, n >> 8 & 255]));
      }
      function qc() {
        Be(new Uint8Array([Pt().$e.mo]));
      }
      function Yc(n) {
        Be(new Uint8Array([Pt().$e.eo, n]));
      }
      function Kc(n) {
        const e = re().getData("skin");
        const o = re().getData("accessory");
        const r = re().getData("back");
        const c = [Pt().$e.ao, n, e, "FFFFFEEEEGGBBBAAA", o, undefined, undefined, r];
        const a = re().getData("accToken", "");
        const s = re().getData("accMail", "");
        if (a && s) {
          c[5] = s;
          c[6] = a;
        } else {
          c[5] = 0;
          c[6] = 0;
        }
        Be(JSON.stringify(c));
      }
      function Wc(n) {
        Be(new Uint8Array([Pt().$e.Lo, ...Ke.encode(n)]));
      }
      function Oc(n) {
        Be(new Uint8Array([Pt().$e.Ao, n]));
      }
      function Zc(n) {
        Be(new Uint8Array([Pt().$e.To, n]));
      }
      function Ic(n) {
        Be(new Uint8Array([Pt().$e.Mo, n]));
      }
      function Jc() {
        Be(new Uint8Array([Pt().$e.yo]));
      }
      function Xc(n) {
        Be(new Uint8Array([Pt().$e.fo, n]));
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
      let h = false;
      const d = "packs";
      let k = null;
      let g = Object.create(null);
      let w = false;
      let p = null;
      let m = null;
      function v(n, t) {
        if (k) {
          try {
            k.transaction(d, "readwrite").objectStore(d).put(t, n);
          } catch (n) {}
        }
      }
      function _(n) {
        if (k) {
          try {
            k.transaction(d, "readwrite").objectStore(d).delete(n);
          } catch (n) {}
        }
      }
      function b(n) {
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
      function y(n) {
        const t = n.lastIndexOf("/");
        const e = t === -1 ? n : n.slice(t + 1);
        const o = e.lastIndexOf(".");
        if (o === -1) {
          return e;
        } else {
          return e.slice(0, o);
        }
      }
      function M(n) {
        if (!Array.isArray(n) || n.length === 0) {
          return false;
        }
        const e = n[0];
        return e && typeof e == "object" && Array.isArray(e[(0, r.ua)("rules")]);
      }
      function T(n) {
        const t = Object.create(null);
        for (const e in n) {
          if (s.has(e)) {
            continue;
          }
          const o = n[e];
          if (typeof o != "string" || o.length === 0) {
            continue;
          }
          const i = b(e);
          if (i) {
            t[i] = o;
          }
          const r = y(i || e);
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
              const f = b(i[(0, r.ua)("value")] || "");
              if (f) {
                e[f] = u;
              }
              const l = y(f);
              if (l && !e[l]) {
                e[l] = u;
              }
            }
          }
        }
        return e;
      }
      function L() {
        return g;
      }
      function x() {
        f = Object.create(null);
        l = Object.create(null);
        if (!u) {
          return;
        }
        const n = L()[u];
        if (!n) {
          return;
        }
        let t;
        try {
          t = JSON.parse(n[(0, r.ua)("data")]);
        } catch (n) {
          return;
        }
        if (M(t)) {
          f = A(t);
        } else {
          f = T(t);
          for (const n in t) {
            if (typeof t[n] == "string") {
              l[n] = t[n];
            }
          }
        }
      }
      function C() {
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
                  v(t, e);
                }
              }
            }
          } catch (n) {}
          if (k) {
            try {
              window.localStorage.removeItem(c);
            } catch (n) {}
          }
        }
      }
      function E(n) {
        const e = L();
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
        x();
        return true;
      }
      (function () {
        try {
          u = window.localStorage.getItem(a) || null;
        } catch (n) {
          u = null;
        }
        x();
        new Promise(function (t) {
          let o;
          try {
            if (!window.indexedDB) {
              t(null);
              return;
            }
            o = window.indexedDB.open("sploopTexturePacks", 1);
          } catch (n) {
            t(null);
            return;
          }
          o.onupgradeneeded = function () {
            try {
              const t = o.result;
              if (!t.objectStoreNames.contains(d)) {
                t.createObjectStore(d);
              }
            } catch (n) {}
          };
          o.onsuccess = function () {
            t(o.result);
          };
          o.onerror = function () {
            t(null);
          };
        }).then(function (n) {
          k = n;
          return new Promise(function (n) {
            const o = Object.create(null);
            if (!k) {
              n(o);
              return;
            }
            let i;
            try {
              i = k.transaction(d, "readonly").objectStore(d).openCursor();
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
          C();
          w = true;
          x();
          if (p) {
            for (const n in f) {
              p(n);
            }
          }
          if (m) {
            m();
          }
        }).catch(function () {
          w = true;
        });
      })();
      const B = {
        La: function (n) {
          if (!n || typeof n != "string") {
            return n;
          }
          if (u === null && !h) {
            return n;
          }
          const t = b(n);
          return f[t] || f[y(t)] || n;
        },
        Rd: function (n) {
          const t = l[n];
          if (typeof t == "string" && t.length > 0) {
            return t;
          } else {
            return null;
          }
        },
        sp: function () {
          const t = L();
          const e = [];
          for (const o in t) {
            const i = t[o];
            let c = "";
            let a = "";
            try {
              const t = JSON.parse(i[(0, r.ua)("data")]);
              if (t && typeof t == "object") {
                const e = t[(0, r.ua)("_author")];
                if (typeof e == "string") {
                  c = e;
                }
                const o = t[(0, r.ua)("_version")];
                if (o != null) {
                  a = o + "";
                }
              }
            } catch (n) {}
            e.push({
              Qa: o,
              Sa: i && i[(0, r.ua)("name")] || o,
              up: c,
              version: a
            });
          }
          return e;
        },
        fp: function (n) {
          const t = L()[n];
          if (t && typeof t[(0, r.ua)("data")] == "string") {
            return t[(0, r.ua)("data")];
          } else {
            return null;
          }
        },
        Pd: function () {
          return u;
        },
        dp: function () {
          if (!u) {
            return null;
          }
          const t = L()[u];
          if (!t) {
            return null;
          }
          try {
            const e = JSON.parse(t[(0, r.ua)("data")]);
            if (e && typeof e == "object" && !Array.isArray(e)) {
              return e;
            } else {
              return null;
            }
          } catch (n) {
            return null;
          }
        },
        kp: E,
        wp: function (n, t) {
          let o;
          try {
            o = JSON.parse(t);
          } catch (n) {
            return null;
          }
          if (!o || typeof o != "object" && !Array.isArray(o)) {
            return null;
          }
          const c = L();
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
        gp: function (n, t, e) {
          try {
            JSON.parse(e);
          } catch (n) {
            return false;
          }
          const o = L();
          if (!o[n]) {
            return false;
          }
          const i = {};
          i[(0, r.ua)("name")] = t || o[n][(0, r.ua)("name")] || "Untitled Pack";
          i[(0, r.ua)("data")] = e;
          o[n] = i;
          v(n, i);
          if (u === n) {
            x();
          }
          return true;
        },
        lp: function (n) {
          const t = L();
          return !!t[n] && (delete t[n], _(n), u === n && E(null), true);
        },
        Qp: function () {
          for (const n in g) {
            _(n);
          }
          g = Object.create(null);
          E(null);
        },
        ap: function (n) {
          h = !!n;
        },
        cp: function (n, t) {
          if (n) {
            if (typeof t == "string" && t.length > 0) {
              l[n] = t;
            } else {
              delete l[n];
            }
          }
        },
        rp: function (n, t) {
          const e = b(n);
          if (e) {
            if (typeof t == "string" && t.length > 0) {
              f[e] = t;
            } else {
              delete f[e];
              delete f[y(e)];
            }
          }
        },
        np: function (n) {
          p = typeof n == "function" ? n : null;
          if (w && p) {
            for (const n in f) {
              p(n);
            }
          }
        },
        ep: function (n) {
          m = typeof n == "function" ? n : null;
          if (w && m) {
            m();
          }
        }
      };
      e.default = B;
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
          var k = i;
          var g = r;
          o = f(o = f(o = f(o = f(o = u(o = u(o = u(o = u(o = s(o = s(o = s(o = s(o = a(o = a(o = a(o = a(o, i = a(i, r = a(r, e = a(e, o, i, r, n[c + 0], 7, -680876936), o, i, n[c + 1], 12, -389564586), e, o, n[c + 2], 17, 606105819), r, e, n[c + 3], 22, -1044525330), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 4], 7, -176418897), o, i, n[c + 5], 12, 1200080426), e, o, n[c + 6], 17, -1473231341), r, e, n[c + 7], 22, -45705983), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 8], 7, 1770035416), o, i, n[c + 9], 12, -1958414417), e, o, n[c + 10], 17, -42063), r, e, n[c + 11], 22, -1990404162), i = a(i, r = a(r, e = a(e, o, i, r, n[c + 12], 7, 1804603682), o, i, n[c + 13], 12, -40341101), e, o, n[c + 14], 17, -1502002290), r, e, n[c + 15], 22, 1236535329), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 1], 5, -165796510), o, i, n[c + 6], 9, -1069501632), e, o, n[c + 11], 14, 643717713), r, e, n[c + 0], 20, -373897302), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 5], 5, -701558691), o, i, n[c + 10], 9, 38016083), e, o, n[c + 15], 14, -660478335), r, e, n[c + 4], 20, -405537848), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 9], 5, 568446438), o, i, n[c + 14], 9, -1019803690), e, o, n[c + 3], 14, -187363961), r, e, n[c + 8], 20, 1163531501), i = s(i, r = s(r, e = s(e, o, i, r, n[c + 13], 5, -1444681467), o, i, n[c + 2], 9, -51403784), e, o, n[c + 7], 14, 1735328473), r, e, n[c + 12], 20, -1926607734), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 5], 4, -378558), o, i, n[c + 8], 11, -2022574463), e, o, n[c + 11], 16, 1839030562), r, e, n[c + 14], 23, -35309556), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 1], 4, -1530992060), o, i, n[c + 4], 11, 1272893353), e, o, n[c + 7], 16, -155497632), r, e, n[c + 10], 23, -1094730640), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 13], 4, 681279174), o, i, n[c + 0], 11, -358537222), e, o, n[c + 3], 16, -722521979), r, e, n[c + 6], 23, 76029189), i = u(i, r = u(r, e = u(e, o, i, r, n[c + 9], 4, -640364487), o, i, n[c + 12], 11, -421815835), e, o, n[c + 15], 16, 530742520), r, e, n[c + 2], 23, -995338651), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 0], 6, -198630844), o, i, n[c + 7], 10, 1126891415), e, o, n[c + 14], 15, -1416354905), r, e, n[c + 5], 21, -57434055), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 12], 6, 1700485571), o, i, n[c + 3], 10, -1894986606), e, o, n[c + 10], 15, -1051523), r, e, n[c + 1], 21, -2054922799), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 8], 6, 1873313359), o, i, n[c + 15], 10, -30611744), e, o, n[c + 6], 15, -1560198380), r, e, n[c + 13], 21, 1309151649), i = f(i, r = f(r, e = f(e, o, i, r, n[c + 4], 6, -145523070), o, i, n[c + 11], 10, -1120210379), e, o, n[c + 2], 15, 718787259), r, e, n[c + 9], 21, -343485551);
          e = l(e, h);
          o = l(o, d);
          i = l(i, k);
          r = l(r, g);
        }
        return [e, o, i, r];
      }
      function c(n, t, e, o, i, r) {
        return l(h(l(l(t, n), l(o, r)), i), e);
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
      function h(n, t) {
        return n << t | n >>> 32 - t;
      }
      __MUTATEOO = function (n) {
        return e(i(r(o(n), n.length * 8))).toLowerCase();
      };
      try {
        n.exports = __MUTATEOO;
      } catch (n) {}
    },
    3543: function (n) {
      function o(n, t, e, o) {
        let i = new Date();
        i.setTime(i.getTime() + e * 24 * 60 * 60 * 1000);
        let r = "expires=" + i.toUTCString();
        let c = o ? ";domain=" + o : "";
        document.cookie = n + "=" + encodeURIComponent(t) + ";" + r + ";path=/" + c;
      }
      function i(n) {
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
      const r = {
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
          let t = i(n);
          if (!t) {
            try {
              t = window.localStorage.getItem(n);
            } catch (n) {}
          }
          return t || "";
        },
        setData: function (n, e, i) {
          o(n, e, 365, i);
          try {
            window.localStorage.setItem(n, e);
          } catch (n) {}
        },
        $p: function (n, e, o) {
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
        nm: function (n, t) {
          return Number(Math.round(n + "e" + t) + "e-" + t);
        },
        ga: function (n, e) {
          e ||= window.location.href;
          n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          let i = RegExp("[\\?&]" + n + "=([^&#]*)").exec(e);
          if (i == null) {
            return null;
          } else {
            return i[1];
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
        n.exports = r;
      } catch (n) {}
    },
    4733: function (n) {
      function o(n) {
        var o = Error("Cannot find module '" + n + "'");
        o.code = "MODULE_NOT_FOUND";
        throw o;
      }
      o.keys = function () {
        return [];
      };
      o.resolve = o;
      o.Qa = 4733;
      n.exports = o;
    },
    9282: function (n, e, o) {
      const r = o(3970);
      const c = o(7251);
      let a = [];
      a[r.S] = {
        Ww: 160,
        Ow: 160,
        Zw: c.Vg - 160,
        Iw: c.jg * 5 / 20,
        bk: "#ece5db",
        Vp: "snow_background_texture"
      };
      a[r.U] = {
        Ww: 160,
        Ow: c.jg * 5 / 20,
        Zw: c.Vg - 160,
        Iw: c.jg * 15 / 20,
        bk: "#788F57",
        Vp: "plains_background_texture"
      };
      a[r.H] = {
        Ww: 160,
        Ow: c.jg * 15 / 20,
        Zw: c.Vg - 160,
        Iw: c.jg * 16 / 20,
        bk: "#fcefbb",
        Vp: "beach_background_texture"
      };
      a[r.N] = {
        Ww: 160,
        Ow: c.jg * 16 / 20,
        Zw: c.Vg - 160,
        Iw: c.jg - 1000,
        bk: "#2a8b9b",
        Vp: "river_background_texture"
      };
      a[r.G] = {
        Ww: 160,
        Ow: c.jg - 1000,
        Zw: c.Vg - 160,
        Iw: c.jg - 160,
        bk: "#b38354",
        Vp: "desert_background_texture"
      };
      n.exports = a;
    },
    7251: function (n) {
      const t = {
        Eg: 1,
        ip: 1824,
        op: 1026,
        tm: 130,
        zh: 9,
        om: 1 / 3,
        version: 7,
        Lp: 1 / 6,
        Np: 80,
        im: 150,
        Vg: 10000,
        jg: 10000
      };
      t.rm = Math.PI / 2;
      t.am = 255;
      t.Jw = "#FFFFFF";
      t.xp = 28;
      t.Up = 70;
      t.sm = 60;
      t.Sp = 240;
      t.lg = 17;
      t.hg = ["#FFD700", "#C0C0C0", "#CD7F32"];
      t.dg = "#FFFFFF";
      t.um = 5;
      t.kg = "#2D3030";
      t.fm = 1 / 12;
      t.Ep = [0, 0, 0, 100, 30, 8, 2, 12, 32, 1, 2, 4];
      t.lm = 2000;
      t.hm = 5000;
      t.dm = 10000;
      t.km = false;
      n.exports = t;
    },
    3287: function (n, t, e) {
      const o = e(3950);
      const i = e(3970);
      const r = e(9055);
      const c = e(1917);
      const a = [];
      a[c.un] = {
        Xd: 35,
        gm: 100,
        wm: r.en
      };
      a[c.wn] = {
        Xd: 60,
        gm: 300,
        wm: r.en
      };
      a[c.zn] = {
        Xd: 50,
        gm: 300,
        wm: r.en
      };
      a[c.O] = {
        Xd: 40,
        gm: 300,
        wm: r.en
      };
      a[c.dn] = {
        Xd: 50,
        wm: r.en,
        pm: 1
      };
      a[c.Yn] = {
        Xd: 50,
        wm: r.en,
        pm: 5,
        vm: 20
      };
      a[c.Kn] = {
        Xd: 220,
        wm: r.V,
        pm: 5,
        vm: 1
      };
      a[c.tn] = {
        Xd: 76,
        wm: r.en,
        _m: 15
      };
      a[c.Wn] = {
        Xd: 100,
        wm: r.en,
        _m: 35
      };
      a[c.fn] = {
        Xd: 75,
        wm: r.en,
        bm: 1
      };
      a[c.Gn] = {
        Xd: 92,
        wm: r.en,
        bm: 1
      };
      a[c.Fn] = {
        Xd: 92,
        wm: r.en,
        bm: 0
      };
      a[c.Pn] = {
        Xd: 20,
        wm: r.en,
        bm: 0
      };
      a[c.Vn] = {
        Xd: 92,
        wm: r.en,
        bm: 1
      };
      a[c.jn] = {
        Xd: 58,
        wm: r.en,
        bm: 1
      };
      a[c.hn] = {
        Xd: 90,
        wm: r.en,
        ym: 1
      };
      a[c.An] = {
        Xd: 80,
        wm: r.en,
        ym: 1
      };
      a[c.Ln] = {
        Xd: 80,
        wm: r.en,
        ym: 1
      };
      a[c.xn] = {
        Xd: 60,
        wm: r.en,
        bm: 1
      };
      a[c.kn] = {
        vm: 20,
        Xd: 45,
        gm: 380,
        Mm: 20,
        wm: r.en
      };
      a[c.ln] = {
        vm: 35,
        Xd: 45,
        gm: 500,
        wm: r.en
      };
      a[c.On] = {
        vm: 45,
        Xd: 45,
        gm: 500,
        wm: r.en
      };
      a[c.Mn] = {
        vm: 10,
        Xd: 42,
        gm: 1200,
        Mm: 24,
        wm: r.en
      };
      a[c.gn] = {
        Xd: 45,
        gm: 380,
        wm: r.en
      };
      a[c.Nn] = {
        Xd: 45,
        gm: 380,
        wm: r.en,
        _m: 70,
        na: 20
      };
      a[c.Cn] = {
        Xd: 59,
        gm: 1750,
        wm: r.en
      };
      a[c.Tn] = {
        Xd: 45,
        gm: 800,
        wm: r.en
      };
      a[c.bn] = {
        Xd: 50,
        gm: 380,
        wm: r.en
      };
      a[c.Z] = {
        Xd: 40,
        gm: 500,
        wm: r.en
      };
      a[c.$] = {
        Xd: 40,
        gm: 250,
        wm: r.en
      };
      a[c._n] = {
        Xd: 90,
        gm: 380,
        wm: r.en,
        Tm: 1.6,
        Am: o.v | o.T,
        Lm: i.U
      };
      a[c.Rn] = {
        Xd: 20,
        gm: 380,
        wm: r.en,
        Tm: 1.6,
        Am: o.v | o.T,
        Lm: i.U
      };
      a[c.Dn] = {
        Xd: 90,
        gm: 1000,
        wm: r.en,
        Tm: 1.6,
        Am: o.v | o.A,
        vm: 19
      };
      a[c.En] = {
        Xd: 90,
        gm: 380,
        wm: r.en,
        Tm: 1.2,
        Am: o.v | o.L | o.A,
        vm: 14,
        Lm: i.N
      };
      a[c.Zn] = {
        Xd: 90,
        gm: 450,
        wm: r.en,
        Tm: 1.2,
        Am: o.v | o.L | o.A,
        vm: 14,
        Lm: i.N
      };
      a[c.Bn] = {
        Xd: 50,
        gm: 380,
        wm: r.en,
        Tm: 1.6,
        Am: o.v | o.A,
        vm: 14,
        Lm: i.U
      };
      a[c.Hn] = {
        Xd: 100,
        gm: 380,
        wm: r.en,
        Tm: 0.4,
        Am: o.v,
        vm: 15,
        Lm: i.U
      };
      a[c.Sn] = {
        Xd: 90,
        gm: 5000,
        wm: r.en,
        Tm: 1.6,
        Am: o.v | o.A,
        vm: 30,
        Lm: i.S
      };
      a[c.Un] = {
        Xd: 100,
        gm: 5000,
        wm: r.en,
        Tm: 1.15,
        Am: o.v | o.A,
        vm: 30,
        Lm: i.U
      };
      a[c.pn] = {
        Xd: 40,
        gm: 4,
        wm: r.en
      };
      a[c.vn] = {
        Xd: 45,
        gm: 400,
        wm: r.en
      };
      a[c.yn] = {
        Xd: 54,
        gm: 400,
        wm: r.en
      };
      a[c.qn] = {
        Xd: 35,
        gm: 150,
        wm: r.en
      };
      n.exports = a;
    },
    3424: function (n, t, e) {
      const o = e(9657);
      const i = [];
      i[o.Dn] = {
        description: "A Golden Cow has appeared!",
        duration: 240
      };
      i[o.Un] = {
        description: "A Dragon has appeared!",
        duration: 480
      };
      i[o.Sn] = {
        description: "A Mammoth has appeared!",
        duration: 480
      };
      n.exports = i;
    },
    1624: function (n, e, o) {
      const r = o(4002);
      const c = o(6597);
      const a = [];
      a[r.V] = {};
      a[r.In] = {
        ik: c.$i,
        Ok: 250,
        qd: 0,
        description: "Become a bush",
        Sa: "Bush Hat",
        zp: true
      };
      a[r.Jn] = {
        ik: c.oi,
        Ok: 5000,
        description: "Increased melee damage",
        qd: 10,
        xm: 1.25,
        Cm: 0.85,
        Sa: "Berserker Gear"
      };
      a[r.Xn] = {
        ik: c.ri,
        Ok: 3000,
        description: "Regenerate health",
        qd: 13,
        Em: 25,
        Sa: "Jungle Gear"
      };
      a[r.Qn] = {
        ik: c.ci,
        Ok: 5000,
        description: "Receive reduced damage",
        qd: 10,
        Bm: 0.75,
        Cm: 0.95,
        Sa: "Crystal Gear"
      };
      a[r.$n] = {
        ik: c.si,
        Ok: 1000,
        description: "Attackers receive damage",
        qd: 10,
        Dm: 0.45,
        Sa: "Spike Gear"
      };
      a[r.nt] = {
        ik: c.ui,
        Ok: 4000,
        description: "Gain more health",
        qd: 15,
        gm: 130,
        Sa: "Immunity Gear"
      };
      a[r.tt] = {
        ik: c.fi,
        Ok: 1500,
        description: "Move quicker",
        qd: 23,
        Cm: 1.23,
        Sa: "Boost Hat"
      };
      a[r.et] = {
        ik: c.ji,
        Ok: 150,
        description: "Apples become more succulent",
        qd: 5,
        Cm: 1.05,
        Sa: "Apple Hat"
      };
      a[r.ot] = {
        ik: c.hr,
        Ok: 4000,
        description: "Move fast in ocean",
        qd: 5,
        Cm: 0.75,
        zm: 1.5,
        Sa: "Scuba Gear"
      };
      a[r.it] = {
        ik: c.gr,
        Ok: 3500,
        description: "Become invisible when still",
        qd: 5,
        Sa: "Hood",
        zp: true
      };
      a[r.rt] = {
        ik: c.$r,
        Ok: 4000,
        description: "Destroy buildings faster",
        qd: 10,
        Sa: "Demolist",
        Cm: 0.3
      };
      a[r.at] = {
        ik: c.qr,
        Ok: 1000,
        description: "Its curse makes you kill",
        qd: 2,
        Sa: "Pumpking's Curse",
        Cm: 1.15,
        Dm: 0.3,
        zm: 0.7,
        xm: 1.15,
        gm: 120,
        Ap: true
      };
      a[r.ct] = {
        ik: c.vc,
        Ok: 700,
        description: "Move fast in the snow",
        qd: 0,
        Cm: 1,
        Um: 1.7,
        Sa: "Winter Hat"
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
        Qa: c.lt,
        wk: c.Ft,
        Sm: u.tn,
        og: a.Wo,
        ik: a.lt,
        Sa: "Tool Hammer",
        description: "Gather materials",
        range: 80,
        Cp: 0,
        Mm: 25,
        reload: 300,
        Hm: 30,
        Nm: 200,
        Zk: 0,
        rk: 0,
        Yd: -3.5,
        qd: 1
      };
      f[c.Ft] = {
        Qa: c.Ft,
        wk: c.Pt,
        Sm: u.Jc,
        og: a.Dr,
        ik: a.Ft,
        Sa: "Gold Tool Hammer",
        description: "Gather materials",
        range: 80,
        Cp: 0,
        Mm: 32,
        reload: 300,
        Hm: 30,
        Nm: 200,
        Zk: 0,
        rk: 0,
        Yd: -3.5,
        qd: 1
      };
      f[c.Pt] = {
        Qa: c.Pt,
        wk: c.Rt,
        Sm: u.Xc,
        og: a.zr,
        ik: a.Pt,
        Sa: "Diamond Tool Hammer",
        description: "Gather materials",
        range: 80,
        Cp: 0,
        Mm: 38,
        reload: 300,
        Hm: 30,
        Nm: 200,
        Zk: 0,
        rk: 0,
        Yd: -3.5,
        qd: 1
      };
      f[c.Rt] = {
        Qa: c.Rt,
        og: a.Ur,
        ik: a.Rt,
        Sa: "Ruby Tool Hammer",
        description: "Gather materials",
        range: 80,
        Cp: 0,
        Mm: 41,
        reload: 300,
        Hm: 30,
        Nm: 200,
        Zk: 0,
        rk: 0,
        Yd: -3.5,
        qd: 1
      };
      f[c.ht] = {
        Qa: c.ht,
        wk: c.ue,
        Sm: u.tn,
        Gm: s.V,
        Vm: s.j,
        og: a.Ko,
        ik: a.ht,
        Sa: "Stone Sword",
        description: "Sharp and pointy",
        range: 135,
        Nm: 250,
        Cp: 0,
        Mm: 35,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: -8,
        qd: -4
      };
      f[c.ue] = {
        Qa: c.ue,
        wk: c.fe,
        Sm: u.Jc,
        Gm: s.V,
        Vm: s.j,
        og: a.ue,
        ik: a.ue,
        Sa: "Gold Sword",
        description: "Sharp and pointy",
        range: 135,
        Nm: 250,
        Cp: 0,
        Mm: 38,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: -8,
        qd: -4
      };
      f[c.fe] = {
        Qa: c.fe,
        wk: c.le,
        Sm: u.Xc,
        Gm: s.V,
        Vm: s.j,
        og: a.fe,
        ik: a.fe,
        Sa: "Diamond Sword",
        description: "Sharp and pointy",
        range: 135,
        Nm: 250,
        Cp: 0,
        Mm: 42,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: -8,
        qd: -4
      };
      f[c.le] = {
        Qa: c.le,
        Gm: s.V,
        Vm: s.j,
        og: a.le,
        ik: a.le,
        Sa: "Ruby Sword",
        description: "Sharp and pointy",
        range: 135,
        Nm: 250,
        Cp: 0,
        Mm: 46,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: -8,
        qd: -4
      };
      f[c.Zt] = {
        Qa: c.Zt,
        Gm: s.V,
        Vm: s.J,
        og: a.uc,
        ik: a.sc,
        Sa: "Crystal Dagger",
        description: "A stubbier sword",
        range: 80,
        Nm: 100,
        Cp: 0,
        Mm: 34,
        reload: 150,
        jm: 1.08,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 20
      };
      f[c.Ot] = {
        Qa: c.Ot,
        Gm: s.V,
        Vm: s.J,
        og: a.Zr,
        ik: a.Qr,
        Sa: "Ruby Dagger",
        description: "A stubbier sword",
        range: 80,
        Nm: 100,
        Cp: 0,
        Mm: 34,
        reload: 150,
        jm: 1.08,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 20
      };
      f[c.Wt] = {
        Qa: c.Wt,
        wk: c.Ot,
        Sm: u.Xc,
        Gm: s.V,
        Vm: s.J,
        og: a.Or,
        ik: a.Xr,
        Sa: "Diamond Dagger",
        description: "A stubbier sword",
        range: 80,
        Nm: 100,
        Cp: 0,
        Mm: 32,
        reload: 150,
        jm: 1.07,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 20
      };
      f[c.Kt] = {
        wk: c.Wt,
        Sm: u.Jc,
        Qa: c.Kt,
        Gm: s.V,
        Vm: s.J,
        og: a.Wr,
        ik: a.Jr,
        Sa: "Gold Dagger",
        description: "A stubbier sword",
        range: 80,
        Nm: 100,
        Cp: 0,
        Mm: 30,
        reload: 150,
        jm: 1.06,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 20
      };
      f[c.Yt] = {
        wk: c.Kt,
        Sm: u.tn,
        Qa: c.Yt,
        Gm: s.V,
        Vm: s.J,
        og: a.Kr,
        ik: a.Ir,
        Sa: "Stone Dagger",
        description: "A stubbier sword",
        range: 80,
        Nm: 100,
        Cp: 0,
        Mm: 28,
        reload: 150,
        jm: 1.05,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 20
      };
      f[c.bt] = {
        Qa: c.bt,
        wk: c.Dt,
        Sm: u.tn,
        Gm: s.j,
        Vm: s.j,
        og: a.yi,
        ik: a.bt,
        Sa: "Katana",
        description: "Excellent melee weapon",
        range: 140,
        Nm: 150,
        Cp: 0,
        Mm: 40,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: 1,
        qd: 3
      };
      f[c.Dt] = {
        Qa: c.Dt,
        wk: c.Bt,
        Sm: u.Jc,
        Gm: s.j,
        Vm: s.j,
        og: a.br,
        ik: a.Dt,
        Sa: "Gold Katana",
        description: "Excellent melee weapon",
        range: 140,
        Nm: 150,
        Cp: 0,
        Mm: 43,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: 1,
        qd: 3
      };
      f[c.Bt] = {
        Qa: c.Bt,
        wk: c.St,
        Sm: u.Xc,
        Gm: s.j,
        Vm: s.j,
        og: a._r,
        ik: a.Bt,
        Sa: "Diamond Katana",
        description: "Excellent melee weapon",
        range: 140,
        Nm: 150,
        Cp: 0,
        Mm: 46.5,
        reload: 300,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: 1,
        qd: 3
      };
      f[c.St] = {
        Qa: c.St,
        Gm: s.j,
        Vm: s.j,
        og: a.Lr,
        ik: a.St,
        Sa: "Chillrend",
        description: "A powerful force flows through this blade.",
        range: 140,
        Nm: 150,
        Cp: 0,
        Mm: 48.5,
        reload: 300,
        jm: 0.9,
        Zk: 0,
        rk: 0,
        Yd: 1,
        qd: 3
      };
      f[c.Jt] = {
        Qa: c.Jt,
        Gm: s.j,
        Vm: s.j,
        og: a.Fc,
        ik: a.Jt,
        Sa: "Daedric Scythe",
        description: "Whispers fill the air",
        range: 160,
        Nm: 150,
        Cp: 0,
        Mm: 52,
        reload: 450,
        jm: 0.85,
        Zk: 0,
        rk: 0,
        Yd: -5,
        qd: 20
      };
      f[c.q] = {
        Qa: c.q,
        wk: c.Ht,
        Sm: u.tn,
        Gm: s.V,
        Vm: s.q,
        og: a.di,
        ik: a.q,
        Sa: "Stick",
        description: "Gathers resources quickly",
        range: 100,
        Cp: 0,
        Mm: 1,
        reload: 400,
        Zk: 0,
        Nm: 60,
        rk: 0,
        Yd: 4,
        qd: 0,
        Fm: 7,
        Pm: 7,
        Rm: 7,
        qm: 4
      };
      f[c.Ht] = {
        Qa: c.Ht,
        wk: c.Nt,
        Sm: u.Jc,
        Gm: s.V,
        Vm: s.q,
        og: a.Cr,
        ik: a.Ht,
        Sa: "Gold Stick",
        description: "Gathers resources quickly",
        range: 100,
        Cp: 0,
        Mm: 1,
        reload: 400,
        Zk: 0,
        Nm: 60,
        rk: 0,
        Yd: 4,
        qd: 0,
        Fm: 8,
        Pm: 8,
        Rm: 8,
        qm: 5
      };
      f[c.Nt] = {
        Qa: c.Nt,
        wk: c.Gt,
        Sm: u.Xc,
        Gm: s.V,
        Vm: s.q,
        og: a.Vr,
        ik: a.Nt,
        Sa: "Diamond Stick",
        description: "Gathers resources quickly",
        range: 100,
        Cp: 0,
        Mm: 1,
        reload: 400,
        Zk: 0,
        Nm: 60,
        rk: 0,
        Yd: 4,
        qd: 0,
        Fm: 9,
        Pm: 9,
        Rm: 9,
        qm: 6
      };
      f[c.Gt] = {
        Qa: c.Gt,
        Gm: s.V,
        Vm: s.q,
        og: a.jr,
        ik: a.Gt,
        Sa: "Ruby Stick",
        description: "Gathers resources quickly",
        range: 100,
        Cp: 0,
        Mm: 1,
        reload: 400,
        Zk: 0,
        Nm: 60,
        rk: 0,
        Yd: 4,
        qd: 0,
        Fm: 10,
        Pm: 10,
        Rm: 10,
        qm: 7
      };
      f[c.dt] = {
        Qa: c.dt,
        wk: c.Ut,
        Sm: u.tn,
        Gm: s.V,
        Vm: s.F,
        og: a.Zo,
        ik: a.dt,
        Sa: "Stone Spear",
        description: "Long melee range",
        range: 160,
        Cp: 0,
        Mm: 49,
        jm: 0.81,
        Nm: 375,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: 2
      };
      f[c.zt] = {
        Qa: c.zt,
        wk: c.se,
        Sm: u.Xc,
        Gm: s.V,
        Vm: s.F,
        og: a.yr,
        ik: a.zt,
        Sa: "Diamond Spear",
        description: "Long melee range",
        range: 160,
        Cp: 0,
        Mm: 53,
        jm: 0.81,
        Nm: 375,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: 2
      };
      f[c.se] = {
        Qa: c.se,
        Gm: s.V,
        Vm: s.F,
        og: a.Uc,
        ik: a.se,
        Sa: "Ruby Spear",
        description: "Long melee range",
        range: 160,
        Cp: 0,
        Mm: 56,
        jm: 0.81,
        Nm: 375,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: 2
      };
      f[c.Ut] = {
        Qa: c.Ut,
        wk: c.zt,
        Sm: u.Jc,
        Gm: s.V,
        Vm: s.F,
        og: a.Mr,
        ik: a.Ut,
        Sa: "Gold Spear",
        description: "Long melee range",
        range: 160,
        Cp: 0,
        Mm: 51,
        jm: 0.81,
        Nm: 375,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: 2
      };
      f[c.Tt] = {
        Qa: c.Tt,
        wk: c.jt,
        Sm: u.tn,
        Gm: s.F,
        Vm: s.F,
        og: a.Ki,
        ik: a.Tt,
        Sa: "Naginata",
        description: "Long melee range",
        range: 165,
        Cp: 0,
        Mm: 52,
        jm: 0.81,
        Nm: 400,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: -4
      };
      f[c.jt] = {
        Qa: c.jt,
        wk: c.Vt,
        Sm: u.Jc,
        Gm: s.F,
        Vm: s.F,
        og: a.Br,
        ik: a.jt,
        Sa: "Gold Naginata",
        description: "Long melee range",
        range: 165,
        Cp: 0,
        Mm: 54,
        jm: 0.81,
        Nm: 400,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: -4
      };
      f[c.Vt] = {
        Qa: c.Vt,
        wk: c.ae,
        Sm: u.Xc,
        Gm: s.F,
        Vm: s.F,
        og: a.Er,
        ik: a.Vt,
        Sa: "Diamond Naginata",
        description: "Long melee range",
        range: 165,
        Cp: 0,
        Mm: 56,
        jm: 0.81,
        Nm: 400,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: -4
      };
      f[c.ae] = {
        Qa: c.ae,
        Gm: s.F,
        Vm: s.F,
        og: a.zc,
        ik: a.ae,
        Sa: "Ruby Naginata",
        description: "Long melee range",
        range: 165,
        Cp: 0,
        Mm: 59,
        jm: 0.81,
        Nm: 400,
        reload: 700,
        Zk: 0,
        rk: 0,
        Yd: 0,
        qd: -4
      };
      f[c.I] = {
        Qa: c.I,
        wk: c.ie,
        Sm: u.tn,
        Gm: s.V,
        Vm: s.I,
        og: a.wr,
        ik: a.I,
        Sa: "Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Cp: 0,
        Mm: 28,
        jm: 0.92,
        Nm: 870,
        reload: 600,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 2
      };
      f[c.ie] = {
        Qa: c.ie,
        wk: c.re,
        Sm: u.Jc,
        Vm: s.I,
        og: a.xc,
        ik: a.Lc,
        Sa: "Golden Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Cp: 0,
        Mm: 28,
        jm: 0.92,
        Nm: 970,
        reload: 600,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 2
      };
      f[c.re] = {
        Qa: c.re,
        wk: c.ce,
        Sm: u.Xc,
        Vm: s.I,
        og: a.Ec,
        ik: a.Cc,
        Sa: "Diamond Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Cp: 0,
        Mm: 28,
        jm: 0.92,
        Nm: 1070,
        reload: 600,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 2
      };
      f[c.ce] = {
        Qa: c.ce,
        Vm: s.I,
        og: a.Dc,
        ik: a.Bc,
        Sa: "Ruby Bat",
        description: "Hit enemies for a home run",
        range: 115,
        Cp: 0,
        Mm: 28,
        jm: 0.92,
        Nm: 1170,
        reload: 600,
        Zk: 0,
        rk: 0,
        Yd: 10,
        qd: 2
      };
      f[c.It] = {
        Qa: c.It,
        wk: c.Jt,
        Sm: u.Jc,
        Gm: s.V,
        Vm: s.V,
        og: a.jc,
        ik: a.It,
        Sa: "Secret Item",
        description: "Dont leak how to get it :)",
        range: 115,
        Cp: 0,
        Mm: 28,
        jm: 0.92,
        Nm: 1570,
        reload: 1250,
        Zk: 0,
        rk: 0,
        Yd: 40,
        qd: 40
      };
      f[c._t] = {
        Qa: c._t,
        wk: c.te,
        Sm: u.tn,
        Gm: s.V,
        Vm: s.V,
        og: a.vi,
        ik: a._t,
        Sa: "Hammer",
        description: "Breaks structures faster",
        range: 80,
        Cp: 1,
        Mm: 12,
        Hm: 76,
        jm: 0.89,
        Nm: 200,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 5,
        qd: 2
      };
      f[c.te] = {
        Qa: c.te,
        wk: c.ee,
        Sm: u.Jc,
        og: a.bc,
        ik: a._c,
        Sa: "Golden Hammer",
        description: "Breaks structures faster",
        range: 80,
        Cp: 1,
        Mm: 15,
        Hm: 79,
        jm: 0.89,
        Nm: 200,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 5,
        qd: 2
      };
      f[c.ee] = {
        Qa: c.ee,
        wk: c.oe,
        Sm: u.Xc,
        og: a.Mc,
        ik: a.yc,
        Sa: "Diamond Hammer",
        description: "Breaks structures faster",
        range: 80,
        Cp: 1,
        Mm: 18,
        Hm: 82,
        jm: 0.89,
        Nm: 200,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 5,
        qd: 2
      };
      f[c.oe] = {
        Qa: c.oe,
        og: a.Ac,
        ik: a.Tc,
        Sa: "Ruby Hammer",
        description: "Breaks structures faster",
        range: 80,
        Cp: 1,
        Mm: 21,
        Hm: 85,
        jm: 0.89,
        Nm: 200,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 5,
        qd: 2
      };
      f[c.kt] = {
        Qa: c.kt,
        wk: c.xt,
        Sm: u.tn,
        Gm: s.V,
        Vm: s.K,
        og: a.Io,
        ik: a.Xo,
        Sa: "Stone Axe",
        description: "Gathers materials faster",
        range: 90,
        Cp: 0,
        Mm: 30,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: -2,
        qd: 2,
        Fm: 2,
        Pm: 2,
        Rm: 2,
        qm: 2
      };
      f[c.xt] = {
        Qa: c.xt,
        wk: c.Lt,
        Sm: u.Jc,
        Gm: s.V,
        Vm: s.K,
        og: a.mr,
        ik: a.xt,
        Sa: "Gold Axe",
        description: "Gathers materials faster",
        range: 90,
        Cp: 0,
        Mm: 33,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: -2,
        qd: 2,
        Fm: 2,
        Pm: 2,
        Rm: 2,
        qm: 2
      };
      f[c.Lt] = {
        Qa: c.Lt,
        wk: c.he,
        Sm: u.Xc,
        Gm: s.V,
        Vm: s.K,
        og: a.pr,
        ik: a.Lt,
        Sa: "Diamond Axe",
        description: "Gathers materials faster",
        range: 90,
        Cp: 0,
        Mm: 36,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: -2,
        qd: 2,
        Fm: 2,
        Pm: 2,
        Rm: 2,
        qm: 2
      };
      f[c.he] = {
        Qa: c.he,
        Gm: s.V,
        Vm: s.K,
        og: a.Vc,
        ik: a.he,
        Sa: "Diamond Axe",
        description: "Gathers materials faster",
        range: 90,
        Cp: 0,
        Mm: 39,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: -2,
        qd: 2,
        Fm: 2,
        Pm: 2,
        Rm: 2,
        qm: 2
      };
      f[c.At] = {
        Qa: c.At,
        wk: c.Et,
        Sm: u.tn,
        Gm: s.K,
        Vm: s.K,
        og: a.ar,
        ik: a.At,
        Sa: "Great Axe",
        description: "More powerful axe.",
        range: 94,
        Cp: 0,
        Mm: 38,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 4,
        qd: 2,
        Fm: 4,
        Pm: 4,
        Rm: 4,
        qm: 2
      };
      f[c.Et] = {
        Qa: c.Et,
        wk: c.Ct,
        Sm: u.Jc,
        Gm: s.K,
        Vm: s.K,
        og: a.Tr,
        ik: a.Et,
        Sa: "Gold Great Axe",
        description: "More powerful axe.",
        range: 94,
        Cp: 0,
        Mm: 42,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 4,
        qd: 2,
        Fm: 4,
        Pm: 4,
        Rm: 4,
        qm: 2
      };
      f[c.Ct] = {
        Qa: c.Ct,
        wk: c.de,
        Sm: u.Xc,
        Gm: s.K,
        Vm: s.K,
        og: a.vr,
        ik: a.Ct,
        Sa: "Diamond Great Axe",
        description: "More powerful axe.",
        range: 94,
        Cp: 0,
        Mm: 46,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 4,
        qd: 2,
        Fm: 4,
        Pm: 4,
        Rm: 4,
        qm: 2
      };
      f[c.de] = {
        Qa: c.de,
        Gm: s.K,
        Vm: s.K,
        og: a.Gc,
        ik: a.de,
        Sa: "Ruby Great Axe",
        description: "More powerful axe.",
        range: 94,
        Cp: 0,
        Mm: 50,
        Nm: 250,
        reload: 400,
        Zk: 0,
        rk: 0,
        Yd: 4,
        qd: 2,
        Fm: 4,
        Pm: 4,
        Rm: 4,
        qm: 2
      };
      f[c.P] = {
        Qa: c.P,
        Ok: [0, 0, 10, 0],
        Gm: s.R,
        Ym: s.j,
        Vm: s.P,
        og: a.Oo,
        ik: a.P,
        Sa: "Stone Musket",
        description: "Deal Long Range Damage",
        range: 1000,
        Cp: 1,
        Mm: 49,
        reload: 1500,
        Km: a.mn,
        vg: 2100,
        Zk: 1,
        rk: 1,
        jm: 0.63,
        Yd: 0,
        qd: 0
      };
      f[c.R] = {
        Qa: c.R,
        Ok: [0, 4, 0, 0],
        Gm: s.V,
        Vm: s.R,
        og: a.Si,
        ik: a.R,
        Sa: "Bow",
        description: "Deal Long Range Damage",
        range: 800,
        Cp: 1,
        Mm: 25,
        reload: 600,
        Km: a.Hi,
        vg: 1700,
        Zk: 1,
        rk: 1,
        jm: 0.75,
        Yd: 0,
        qd: 35
      };
      f[c.qt] = {
        Qa: c.qt,
        Ok: [80, 80, 80, 80],
        Gm: s.V,
        Vm: s.W,
        og: a.gc,
        ik: a.qt,
        Sa: "Pearl",
        description: "Teleport on impact",
        range: 800,
        Cp: 1,
        Mm: 10,
        reload: 7500,
        Km: a.qt,
        vg: 1500,
        Zk: 1,
        rk: 1,
        jm: 0.5,
        Yd: 0,
        qd: 35
      };
      f[c.Mt] = {
        Qa: c.Mt,
        Ok: [0, 10, 0, 0],
        Gm: s.R,
        Vm: s.R | s.q | s.K,
        og: a.Gi,
        ik: a.Mt,
        Sa: "XBow",
        description: "Rapid fire bow",
        range: 800,
        Cp: 1,
        Mm: 27,
        reload: 235,
        Km: a.Hi,
        vg: 1700,
        Zk: 1,
        rk: 1,
        jm: 0.5,
        Yd: 0,
        qd: 30
      };
      f[c.gt] = {
        Qa: c.gt,
        Ok: [0, 10, 0, 0],
        og: a.Jo,
        ik: a.Oi,
        Sa: "Wood Wall",
        description: "A sturdy wall",
        Cp: 3,
        Zk: 2,
        Wm: 5,
        Yd: 0,
        qd: 15,
        Om: r.gn,
        rk: 2
      };
      f[c.qn] = {
        Qa: c.qn,
        Ok: [0, 50, 50, 0],
        Gm: s.K | s.q | s.I,
        Vm: s.V,
        og: a.kc,
        ik: a.qn,
        Sa: "Teleporter",
        description: "Teleports to location on map",
        Cp: 9,
        Zk: 2,
        Wm: 5,
        Yd: 0,
        qd: 15,
        Om: r.qn,
        rk: 2
      };
      f[c.Cn] = {
        Qa: c.Cn,
        Ok: [0, 0, 35, 10],
        Gm: s.V,
        Vm: s.V,
        og: a.Wi,
        ik: a.Ii,
        Sa: "Castle Wall",
        description: "A very sturdy wall",
        Cp: 3,
        Zk: 2,
        Wm: 8,
        Yd: 0,
        qd: 13,
        Om: r.Cn,
        rk: 2
      };
      f[c.Tn] = {
        Qa: c.Tn,
        Ok: [0, 200, 150, 10],
        Gm: s.V,
        Vm: s.V,
        og: a.Ei,
        ik: a.Li,
        Sa: "Turret",
        description: "Defence for your base",
        Cp: 10,
        Zk: 2,
        Wm: 6,
        Yd: 0,
        qd: 25,
        Om: r.Tn,
        rk: 2
      };
      f[c.bn] = {
        Qa: c.bn,
        Gm: s.V,
        Vm: s.V,
        Ok: [0, 200, 200, 200],
        og: a._i,
        ik: a.cr,
        Sa: "Cosy Bed",
        description: "Respawn at the bed",
        Cp: 9,
        Zk: 2,
        Wm: 8,
        Yd: 0,
        qd: 25,
        Om: r.bn,
        rk: 2
      };
      f[c.vn] = {
        Qa: c.vn,
        Ok: [0, 50, 10, 0],
        og: a.gi,
        ik: a.mi,
        Sa: "Windmill",
        description: "Generates score over time",
        Cp: 5,
        Zk: 2,
        Wm: -5,
        Yd: 0,
        qd: 38,
        Om: r.vn,
        rk: 2
      };
      f[c.yn] = {
        Qa: c.yn,
        Ok: [0, 100, 50, 0],
        Gm: s.V,
        Vm: s.V,
        og: a.gi,
        ik: a.mi,
        Sa: "Powermill",
        description: "Generates more score over time",
        Cp: 5,
        Zk: 2,
        Wm: 5,
        Yd: 0,
        qd: 38,
        Om: r.yn,
        rk: 2
      };
      f[c.kn] = {
        Qa: c.kn,
        Ok: [0, 20, 5, 0],
        og: a.$o,
        ik: a.Zi,
        Sa: "Spike",
        description: "Sharp defence",
        Cp: 4,
        Zk: 2,
        Wm: 2,
        Yd: 0,
        qd: 15,
        Om: r.kn,
        rk: 2
      };
      f[c.ln] = {
        Qa: c.ln,
        Gm: s.V,
        Vm: s.V,
        Ok: [0, 30, 10, 0],
        og: a.Ai,
        ik: a.er,
        Sa: "Hard Spike",
        description: "Sharper defence",
        Cp: 4,
        Zk: 2,
        Wm: 2,
        Yd: 0,
        qd: 15,
        Om: r.ln,
        rk: 2
      };
      f[c.On] = {
        Qa: c.On,
        Gm: s.O,
        Vm: s.V,
        Ok: [0, 40, 20, 10],
        og: a.mc,
        ik: a.wc,
        Sa: "Ice Spike",
        description: "Even Sharper defence",
        Cp: 4,
        Zk: 2,
        Wm: 2,
        Yd: 0,
        qd: 15,
        Om: r.On,
        rk: 2
      };
      f[c.Ln] = {
        Qa: c.Ln,
        Gm: s.V,
        Vm: s.V,
        Ok: [0, 200, 0, 0],
        og: a.Bi,
        ik: a.nr,
        Sa: "Cherry wood farm",
        description: "Used for decoration and wood",
        Cp: 6,
        Zk: 2,
        Wm: 3,
        Yd: 0,
        qd: 47,
        Om: r.Ln,
        rk: 2
      };
      f[c.An] = {
        Qa: c.An,
        Gm: s.V,
        Vm: s.V,
        Ok: [0, 200, 0, 0],
        og: a.Di,
        ik: a.tr,
        Sa: "Wood farm",
        description: "Used for decoration and wood",
        Cp: 6,
        Zk: 2,
        Wm: 3,
        Yd: 0,
        qd: 47,
        Om: r.An,
        rk: 2
      };
      f[c.xn] = {
        Qa: c.xn,
        Gm: s.V,
        Vm: s.V,
        Ok: [0, 0, 200, 0],
        og: a.zi,
        ik: a.Qi,
        Sa: "Stone farm",
        description: "Used for decoration and stone",
        Cp: 6,
        Zk: 2,
        Wm: 3,
        Yd: 0,
        qd: 20,
        Om: r.xn,
        rk: 2
      };
      f[c.yt] = {
        Qa: c.yt,
        Gm: s.V,
        Vm: s.V,
        Ok: [200, 0, 0, 0],
        og: a.Ui,
        ik: a.$i,
        Sa: "Berry farm",
        description: "Used for decoration and berries",
        Cp: 6,
        Zk: 2,
        Wm: 3,
        Yd: 0,
        qd: 17,
        Om: r.dn,
        rk: 2
      };
      f[c.Mn] = {
        Qa: c.Mn,
        Ok: [0, 30, 30, 0],
        Gm: s.K | s.q,
        Vm: s.V,
        og: a.Mi,
        ik: a.ir,
        Sa: "Castle Spike",
        description: "Great for bases",
        Cp: 4,
        Zk: 2,
        Wm: -8,
        Yd: 0,
        qd: 14,
        Om: r.Mn,
        rk: 2
      };
      f[c.O] = {
        Qa: c.O,
        Ok: [0, 5, 20, 0],
        Gm: s.V,
        Vm: s.O,
        og: a.Qo,
        ik: a.Ji,
        Sa: "Boost",
        description: "Provides a thrust",
        Cp: 7,
        Zk: 2,
        Wm: -5,
        Yd: 0,
        qd: 3,
        Om: r.O,
        rk: 2
      };
      f[c.Z] = {
        Qa: c.Z,
        Ok: [0, 30, 30, 0],
        Gm: s.V,
        Vm: s.Z,
        og: a.ti,
        ik: a.Xi,
        Sa: "Trap",
        description: "Snared enemies are stuck",
        Cp: 7,
        Zk: 2,
        Wm: 2,
        Yd: 0,
        qd: 26,
        Om: r.Z,
        rk: 2
      };
      f[c.$] = {
        Qa: c.$,
        Ok: [25, 80, 50, 0],
        Zm: 4,
        Gm: s.V,
        Vm: s.$,
        og: a.ac,
        ik: a.Fd,
        Sa: "Heal Pad",
        description: "Allies around you are healed",
        Cp: 11,
        Zk: 2,
        Wm: 2,
        Yd: 0,
        qd: 26,
        Om: r.$,
        rk: 2,
        Im: 10,
        reload: 500,
        range: 300
      };
      f[c.wn] = {
        Qa: c.wn,
        Ok: [0, 20, 0, 0],
        Gm: s.V,
        Vm: s.wn,
        og: a.ni,
        ik: a.rr,
        Sa: "Platform",
        description: "Shoot over structures",
        Cp: 8,
        Zk: 2,
        Wm: -2,
        Yd: 0,
        qd: 8,
        Om: r.wn,
        rk: 2
      };
      f[c.zn] = {
        Qa: c.zn,
        Ok: [0, 20, 0, 0],
        Gm: s.V,
        Vm: s.wn,
        og: a.Fr,
        ik: a.zn,
        Sa: "Roof",
        description: "Take cover from projectiles",
        Cp: 8,
        Zk: 2,
        Wm: 0,
        Yd: 0,
        qd: 15,
        Om: r.zn,
        rk: 2
      };
      f[c.wt] = {
        Qa: c.wt,
        Ok: [10, 0, 0, 0],
        og: a.ii,
        ik: a.wt,
        Sa: "Apple",
        description: "Heals you",
        Cp: 2,
        Zk: 3,
        Im: 20,
        Yd: 0,
        qd: 22,
        rk: 2
      };
      f[c.vt] = {
        Qa: c.vt,
        Ok: [15, 0, 0, 0],
        Gm: s.V,
        Vm: s.Y,
        og: a.li,
        ik: a.vt,
        Sa: "Cookie",
        description: "Heals you",
        Cp: 2,
        Zk: 3,
        Im: 35,
        Yd: 0,
        qd: 22,
        rk: 2
      };
      f[c.W] = {
        Qa: c.W,
        Gm: s.V,
        Vm: s.W,
        og: a.ai,
        ik: a.W,
        Sa: "Shield",
        description: "Reduces damage",
        Cp: 1,
        Zk: 0,
        jm: 0.7,
        Jm: 0.75,
        range: 55,
        Nm: 350,
        Mm: 15,
        Hm: 40,
        reload: 500,
        Yd: -15,
        qd: 10,
        rk: 3
      };
      f[c.ne] = {
        Qa: c.ne,
        Gm: s.V,
        Vm: s.X,
        og: a.cc,
        ik: a.dc,
        Sa: "Ruby Healing Staff",
        description: "Make peace, not war",
        range: 140,
        Nm: 100,
        Cp: 0,
        Mm: 30,
        Im: 30,
        reload: 500,
        Zk: 0,
        rk: 0,
        Yd: -30,
        qd: 0
      };
      f[c.$t] = {
        wk: c.ne,
        Sm: u.Xc,
        Qa: c.$t,
        Gm: s.V,
        Vm: s.X,
        og: a.rc,
        ik: a.hc,
        Sa: "Diamond Healing Staff",
        description: "Make peace, not war",
        range: 140,
        Nm: 100,
        Cp: 0,
        Mm: 27,
        Im: 27,
        reload: 500,
        Zk: 0,
        rk: 0,
        Yd: -30,
        qd: 0
      };
      f[c.Qt] = {
        wk: c.$t,
        Sm: u.Jc,
        Qa: c.Qt,
        Gm: s.V,
        Vm: s.X,
        og: a.ic,
        ik: a.lc,
        Sa: "Gold Healing Staff",
        description: "Make peace, not war",
        range: 140,
        Nm: 100,
        Cp: 0,
        Mm: 24,
        Im: 24,
        reload: 500,
        Zk: 0,
        rk: 0,
        Yd: -30,
        qd: 0
      };
      f[c.Xt] = {
        wk: c.Qt,
        Sm: u.tn,
        Qa: c.Xt,
        Gm: s.V,
        Vm: s.X,
        og: a.oc,
        ik: a.fc,
        Sa: "Healing Staff",
        description: "Make peace, not war",
        range: 140,
        Nm: 100,
        Cp: 0,
        Mm: 21,
        Im: 21,
        reload: 500,
        Zk: 0,
        rk: 0,
        Yd: -30,
        qd: 0
      };
      n.exports = f;
    },
    9435: function (n, t, e) {
      const o = e(3255);
      const i = e(6597);
      const r = [];
      r[o.Bo] = {
        ik: i.Bo,
        mg: 500,
        _h: 0,
        mg: 1,
        Xm: 150,
        Qm: 2
      };
      r[o.Eo] = {
        ik: i.Eo,
        mg: 500,
        _h: 0,
        mg: 1,
        Xm: 150,
        Qm: 2
      };
      r[o.Do] = {
        ik: i.Do,
        mg: 500,
        _h: 0,
        mg: 1,
        Xm: 150,
        Qm: 2
      };
      r[o.tn] = {
        ik: i.Ro,
        mg: 500,
        _h: 0,
        mg: 1,
        Xm: 100,
        Qm: 2
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
        this.mh = n || 0;
        this.bh = t || 0;
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
      const i = o(9303);
      const r = o(3235);
      const c = o(9869);
      const a = o(1318);
      const s = o(6217);
      const u = o(1552);
      n.exports = function (n, e) {
        e = e || 0;
        const f = (n = n || "").length % 16;
        const l = n.length - f;
        let h = [0, e];
        let d = [0, e];
        let k = [0, 0];
        let g = [0, 0];
        const w = [2277735313, 289559509];
        const p = [1291169091, 658871167];
        let m;
        for (m = 0; m < l; m += 16) {
          k = [n.charCodeAt(m + 4) & 255 | (n.charCodeAt(m + 5) & 255) << 8 | (n.charCodeAt(m + 6) & 255) << 16 | (n.charCodeAt(m + 7) & 255) << 24, n.charCodeAt(m) & 255 | (n.charCodeAt(m + 1) & 255) << 8 | (n.charCodeAt(m + 2) & 255) << 16 | (n.charCodeAt(m + 3) & 255) << 24];
          g = [n.charCodeAt(m + 12) & 255 | (n.charCodeAt(m + 13) & 255) << 8 | (n.charCodeAt(m + 14) & 255) << 16 | (n.charCodeAt(m + 15) & 255) << 24, n.charCodeAt(m + 8) & 255 | (n.charCodeAt(m + 9) & 255) << 8 | (n.charCodeAt(m + 10) & 255) << 16 | (n.charCodeAt(m + 11) & 255) << 24];
          k = r(k, w);
          k = c(k, 31);
          k = r(k, p);
          h = s(h, k);
          h = c(h, 27);
          h = i(h, d);
          h = i(r(h, [0, 5]), [0, 1390208809]);
          g = r(g, p);
          g = c(g, 33);
          g = r(g, w);
          d = s(d, g);
          d = c(d, 31);
          d = i(d, h);
          d = i(r(d, [0, 5]), [0, 944331445]);
        }
        k = [0, 0];
        g = [0, 0];
        switch (f) {
          case 15:
            g = s(g, a([0, n.charCodeAt(m + 14)], 48));
          case 14:
            g = s(g, a([0, n.charCodeAt(m + 13)], 40));
          case 13:
            g = s(g, a([0, n.charCodeAt(m + 12)], 32));
          case 12:
            g = s(g, a([0, n.charCodeAt(m + 11)], 24));
          case 11:
            g = s(g, a([0, n.charCodeAt(m + 10)], 16));
          case 10:
            g = s(g, a([0, n.charCodeAt(m + 9)], 8));
          case 9:
            g = s(g, [0, n.charCodeAt(m + 8)]);
            g = r(g, p);
            g = c(g, 33);
            g = r(g, w);
            d = s(d, g);
          case 8:
            k = s(k, a([0, n.charCodeAt(m + 7)], 56));
          case 7:
            k = s(k, a([0, n.charCodeAt(m + 6)], 48));
          case 6:
            k = s(k, a([0, n.charCodeAt(m + 5)], 40));
          case 5:
            k = s(k, a([0, n.charCodeAt(m + 4)], 32));
          case 4:
            k = s(k, a([0, n.charCodeAt(m + 3)], 24));
          case 3:
            k = s(k, a([0, n.charCodeAt(m + 2)], 16));
          case 2:
            k = s(k, a([0, n.charCodeAt(m + 1)], 8));
          case 1:
            k = s(k, [0, n.charCodeAt(m)]);
            k = r(k, w);
            k = c(k, 31);
            k = r(k, p);
            h = s(h, k);
        }
        h = s(h, [0, n.length]);
        d = s(d, [0, n.length]);
        h = i(h, d);
        d = i(d, h);
        h = u(h);
        d = u(d);
        h = i(h, d);
        d = i(d, h);
        return ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[1] >>> 0).toString(16)).slice(-8);
      };
    },
    9882: function (n) {
      n.exports = function () {
        this.wa = function (n, t, e, o) {
          this.$m = n;
          this.nv = t;
          this.tv = e;
          this.ev = o;
        };
        this.ov = function (n) {
          let t = n.length;
          for (let e = 0; e < t; e++) {
            n[e] = n[e] ^ this.$m;
            this.$m = (this.ev * this.$m + this.tv + this.nv) % this.tv;
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
        for (var e = 0, o = n.length ^ 1779033703; e < n.length; e++) {
          o = (o = Math.imul(o ^ n.charCodeAt(e), 3432918353)) << 13 | o >>> 19;
        }
        return function () {
          o = Math.imul(o ^ o >>> 16, 2246822507);
          o = Math.imul(o ^ o >>> 13, 3266489909);
          return (o ^= o >>> 16) >>> 0;
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
      function h(n) {
        if (!l) {
          l = true;
          try {
            let n = o(5108);
            if (n && n.default) {
              n = n.default;
            }
            if (n && typeof n.La == "function") {
              f = n;
            }
          } catch (n) {}
        }
        if (f) {
          return f.La(n);
        } else {
          return n;
        }
      }
      n.exports = {
        iv: (n, t) => n.mh < t.mh + t.w && n.mh + n.w > t.mh && n.bh < t.bh + t.td && n.bh + n.td > t.bh,
        Og: function (n, t, e, o) {
          return Math.sqrt((t - o) ** 2 + (n - e) ** 2);
        },
        Zg: function (n, t, e, o) {
          return Math.atan2(o - t, e - n);
        },
        rv: function (n, t) {
          var e = Math.PI * 2;
          var o = (t - n) % e;
          return o * 2 % e - o;
        },
        cv: function (n) {
          return n[Math.floor(Math.random() * n.length)];
        },
        av(n, t, e, o, i, r, c) {
          var a = [i - n, r - t];
          var s = [e - n, o - t];
          var u = this.sv(s, s);
          var f = this.sv(a, s) / u;
          var l = [s[0] * (f = (f = f < 0 ? 0 : f) > 1 ? 1 : f) + n - i, s[1] * f + t - r];
          return this.sv(l, l) <= c * c;
        },
        sv: (n, t) => n[0] * t[0] + n[1] * t[1],
        uv: function (n, t, e, o) {
          return n * e + t * o;
        },
        sv: (n, t) => n[0] * t[0] + n[1] * t[1],
        Eh: function (n, t, e) {
          return n + this.rv(n, t) * e;
        },
        Yh: function (n, t, e) {
          return n * (1 - e) + t * e;
        },
        fv: (n, t, e) => n >= e.Ww && n <= e.Zw && t >= e.Ow && t <= e.Iw,
        dk: (n, t, e, o, i, r) => n >= e && n <= e + i && t >= o && t <= o + r,
        lv: (n, t, e) => n < t ? t : n > e ? e : n,
        hv: (n, t) => Math.floor(Math.random() * (t - n + 1)) + n,
        Ph: function (n, t, e, o, i, r) {
          this.dir = n;
          this.value = t;
          this.max = e;
          this.min = o;
          this.Jp = i;
          this.Ip = r;
          this.Ja = function (n) {
            if (this.dir) {
              var t = this.value + n * this.Jp;
              if (t > this.max) {
                t = this.max;
                this.dir = false;
              }
              this.value = t;
            } else {
              if ((t = this.value - n * this.Ip) < this.min) {
                t = this.min;
                this.dir = true;
              }
              this.value = t;
            }
          };
          return false;
        },
        Dp: {
          dv: n => n,
          kv: n => n * n,
          gv: n => n * (2 - n),
          wv: n => n < 0.5 ? n * 2 * n : (4 - n * 2) * n - 1,
          pv: n => n * n * n,
          mv: n => --n * n * n + 1,
          vv: n => n < 0.5 ? n * 4 * n * n : (n - 1) * (n * 2 - 2) * (n * 2 - 2) + 1,
          _v: n => n * n * n * n,
          bv: n => 1 - --n * n * n * n,
          yv: n => n < 0.5 ? n * 8 * n * n * n : 1 - --n * 8 * n * n * n,
          Mv: n => n * n * n * n * n,
          Tv: n => 1 + --n * n * n * n * n,
          Bp: n => n < 0.5 ? n * 16 * n * n * n * n : 1 + --n * 16 * n * n * n * n,
          Av: n => -Math.pow(2, (n -= 1) * 10) * Math.sin(Math.PI * 2 * (n - 0.1) / 0.4),
          Lv: n => -Math.pow(2, n * 10) * Math.sin(Math.PI * 2 * (n - 0.1) / 0.4) + 1,
          xv: n => Math.sin(n),
          Cv: n => n * -15 * (n - 1.3)
        },
        Ak: (n, t, e, o, r, c) => {
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
        Ev: n => Math.floor((n + Math.PI) / 6.283185307179586 * 255) & 255,
        Zp: n => n / 255 * 6.283185307179586 - Math.PI,
        Bv(n) {
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
        Dv: function (n) {
          return [n & 255, n >> 8 & 255];
        },
        Tk: function (n, t, e, o) {
          const c = document.createElement("canvas");
          c.width = n;
          c.height = t;
          const a = c.getContext("2d");
          a.beginPath();
          a.fillStyle = o;
          this.Ak(a, 0, 0, n, t, e);
          a.fill();
          return c;
        },
        pg: n => n > 9999999 ? Math.floor(n / 1000000) + "M" : n > 999999 ? Math.floor(n / 1000000 * 100) / 100 + "M" : n > 99999 ? (Math.floor(n / 1000) + "K").replace(".0", "") : n > 9999 ? (Math.floor(n / 1000 * 10) / 10 + "K").replace(".0", "") : n > 0 ? Math.floor(n) : n + "",
        Xw: function (n) {
          if (n = typeof n == "string" ? n.trim() : "") {
            if (/\s/.test(n) && !/["']/.test(n)) {
              n = "\"" + n + "\"";
            }
          } else {
            n = "Baloo Paaji";
          }
          a = n;
        },
        Sg: function () {
          return a;
        },
        Qw: function (n) {
          s = typeof n == "string" && n.charAt(0) === "#" ? n : "";
        },
        $w: function (n) {
          u = typeof n == "number" && isFinite(n) && n >= 0 ? n : 7;
        },
        zv: function (n, t, e, o, r, c, f, l, h) {
          const k = n.getContext("2d");
          c = c ? c * 1 : 0;
          var g = Math.floor(e * 1);
          k.font = e * 1 + "px " + a;
          l *= 1;
          var w = f ? l * 2 : 0;
          h = h ? Math.min(k.measureText(t).width + 2 + w, h) : k.measureText(t).width + 2 + w + 10;
          g = (g + c) * 1 + w + 10;
          h = Math.ceil(h);
          g = Math.ceil(g);
          n.width = h;
          n.height = g;
          if (f) {
            k.fillStyle = f;
            this.Ak(k, 0, 0, h, g, l * 2);
            k.fill();
            k.translate(l, l);
          }
          k.textBaseline = "middle";
          k.font = e * 1 + "px " + a;
          k.fillStyle = o;
          const p = s || r;
          k.lineWidth = u;
          k.lineJoin = "round";
          if (p) {
            k.strokeStyle = p;
            k.strokeText(t, 5, (g - w) / 2, h);
          }
          k.fillText(t, 5, (g - w) / 2, h);
          return n;
        },
        Wk: function (n, t, e, o, i, r, c, a, s) {
          return this.zv(n, t, e, o, i, r, c, a, s);
        },
        Bk: function (n, t, e, o, i, r, c, a) {
          const s = document.createElement("canvas");
          return this.zv(s, n, t, e, o, i, r, c, a);
        },
        $k: n => Math.log(1 + n) ** 2.4 / 13,
        Xp(n) {
          while (n.firstChild) {
            n.removeChild(n.lastChild);
          }
        },
        yp(n) {
          const e = document.createElement(n.tag || "div");
          if (n.src) {
            e.src = n.src;
          }
          if (n.Tp) {
            e.innerHTML = n.Tp;
          }
          if (n.Mp) {
            e.className = n.Mp;
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
        Uv: n => true,
        Sv: function (n) {
          return {
            src: n,
            Qd: {
              Od: r.st
            }
          };
        },
        Hv: function () {
          this.Od = r.ut;
          this.tk = this.width / 2;
          this.ek = this.height / 2;
        },
        Nv: function () {
          this.Od = r.st;
        },
        Gv: function (n, t) {
          if (t === undefined || t.Od !== r.ft) {
            (t = new Image()).Od = r.ft;
            t.onload = this.Hv;
            t.onerror = this.Nv;
            t.src = h(n);
          }
          return t;
        },
        Uw: () => new URL(window.location).searchParams.get("game"),
        Sw(n) {},
        Ld: function (n, t) {
          let o = this.Sv(n);
          c.push(o);
          if (t) {
            o.Qd = this.Gv(o.src, o.Qd);
          }
          return o;
        },
        tp: function (n) {
          if (!n) {
            return;
          }
          const e = this;
          for (let o = 0; o < c.length; o++) {
            const i = c[o];
            if (!i || typeof i.src != "string" || i.src.indexOf(n) === -1) {
              continue;
            }
            if (!i.Qd || i.Qd.Od !== r.ut) {
              continue;
            }
            const a = new Image();
            a.Od = r.ft;
            a.onerror = e.Nv;
            a.onload = function () {
              e.Hv.call(a);
              i.Qd = a;
            };
            a.src = h(i.src);
          }
        },
        hp: function () {
          const t = this;
          for (let e = 0; e < c.length; e++) {
            const o = c[e];
            if (!o || typeof o.src != "string") {
              continue;
            }
            if (!o.Qd || o.Qd.Od !== r.ut) {
              continue;
            }
            const i = new Image();
            i.Od = r.ft;
            i.onerror = t.Nv;
            i.onload = function () {
              t.Hv.call(i);
              o.Qd = i;
            };
            i.src = h(o.src);
          }
        },
        nk: function (n, t, e, o, c, a) {
          const u = t.Qd;
          if (u.Od === r.ut) {
            n.drawImage(u, e, o, c || u.width, a || u.height);
          } else {
            t.Qd = this.Gv(t.src, t.Qd);
          }
        },
        Vv: function (n, t) {
          return n.Ww < t.Zw && n.Zw > t.Ww && n.Ow < t.Iw && n.Iw > t.Ow;
        },
        Gp: function (n, t, e) {
          return !!this.Vv(e, t) && (n.mh = Math.max(t.Ww, e.Ww), n.bh = Math.max(t.Ow, e.Ow), n.w = Math.min(e.Zw, t.Zw) - n.mh, n.td = Math.min(e.Iw, t.Iw) - n.bh, true);
        },
        jv(n, t) {
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
  a.d = function (n, e) {
    for (var i in e) {
      if (a.Xh(e, i) && !a.Xh(n, i)) {
        Object.defineProperty(n, i, {
          Pv: true,
          get: e[i]
        });
      }
    }
  };
  a.Xh = function (n, t) {
    return Object.prototype.hasOwnProperty.call(n, t);
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
